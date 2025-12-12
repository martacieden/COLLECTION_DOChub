# ⚡ Quick Wins для покращення тестування

## 🎯 Топ-5 покращень для тестового скрипту (1-2 години роботи)

### 1. Додати колонку Organization (Vendor) в AllDocumentsTable ✅

**Файл:** `src/components/AllDocumentsTable.tsx`

**Важливо:** Vendor = Organization. Вендори - це інші організації.

**Що зробити:**
- Додати колонку "Organization" або "Vendor/Organization" в таблицю
- Використовувати існуюче поле `organization` з документа

**Код:**
```typescript
// Поле organization вже є в інтерфейсі Document (рядок 20)

// В місці рендерингу таблиці (знайти де рендеряться колонки)
const hasOrgData = documents?.some(doc => doc.organization);

// Додати умовну колонку
{hasOrgData && (
  <th className="...">
    Vendor / Organization
  </th>
)}
{hasOrgData && (
  <td className="...">
    {document.organization || '—'}
  </td>
)}
```

---

### 2. AI-підказка "Create All Invoices Collection" ✅

**Файл:** `src/App.tsx` (CollectionsView компонент)

**Що зробити:**
- Перевіряти чи є invoice документи
- Показувати banner/button з пропозицією створити колекцію

**Код:**
```typescript
// В CollectionsView, додати перевірку
const hasInvoices = documents?.some(doc => 
  doc.type?.toLowerCase().includes('invoice') || 
  doc.name.toLowerCase().includes('invoice')
);

// Показувати кнопку Quick Create
{hasInvoices && !collections?.some(c => c.title.toLowerCase().includes('invoice')) && (
  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
    <p className="text-sm text-gray-700 mb-2">
      💡 I noticed you have invoice documents. Create a collection that automatically collects all invoices?
    </p>
    <button
      onClick={() => {
        onCreateCollection?.(
          "All Invoices",
          "Automatically collects all invoice documents",
          [{
            id: `rule-${Date.now()}`,
            type: 'document_type',
            label: 'Document Type',
            value: 'Invoice',
            operator: 'is',
            enabled: true
          }]
        );
      }}
      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      Create "All Invoices" Collection
    </button>
  </div>
)}
```

---

### 3. Показати список matching documents в RulesEditorModal ✅

**Файл:** `src/components/RulesEditorModal.tsx`

**Що зробити:**
- Використати існуючу функцію `onFindMatchingDocuments`
- Додати кнопку "Show matching documents"
- Показувати список перших 10 документів

**Код:**
```typescript
// Додати state для preview
const [showPreview, setShowPreview] = useState(false);
const [previewDocuments, setPreviewDocuments] = useState<Document[]>([]);

// Функція для отримання matching documents
const handlePreviewMatching = () => {
  if (!onFindMatchingDocuments) return;
  
  // Отримати всі документи з App (потрібно передати через props)
  // Тимчасово: показати кількість
  const count = onFindMatchingDocuments(rules);
  setMatchedDocCount(count);
  setShowPreview(true);
};

// В UI додати кнопку
<button
  onClick={handlePreviewMatching}
  className="text-sm text-blue-600 hover:text-blue-800"
>
  Preview {matchedDocCount} matching documents
</button>
```

**Примітка:** Потрібно передати `documents` через props в `RulesEditorModal` для повного preview.

---

### 4. Organization (Vendor) Selector зі списком організацій ✅

**Файл:** `src/components/RulesEditorModal.tsx`

**Важливо:** Vendor = Organization. Використовуємо список organizations з системи.

**Що зробити:**
- Коли тип правила = 'vendor', показати dropdown зі списком organizations
- Дозволити вибрати зі списку або ввести нову

**Код:**
```typescript
// Додати prop для передачі organizations
interface RulesEditorModalProps {
  // ... існуючі props
  organizations?: Organization[]; // Додати
}

// В компоненті використовуємо organizations
const orgList = organizations || [];

// Також можна отримати унікальні з документів
const uniqueOrgsFromDocs = useMemo(() => {
  if (!allDocuments) return [];
  return [...new Set(allDocuments.map(d => d.organization).filter(Boolean))].sort();
}, [allDocuments]);

// Об'єднуємо обидва списки
const allOrganizations = [...new Set([...orgList.map(o => o.name), ...uniqueOrgsFromDocs])].sort();

// В рендері правила vendor
{rule.type === 'vendor' && (
  <>
    <select
      value={rule.value}
      onChange={(e) => updateRuleValue(rule.id, e.target.value)}
      className="..."
    >
      <option value="">Select organization...</option>
      {allOrganizations.map(org => (
        <option key={org} value={org}>{org}</option>
      ))}
    </select>
    <input
      type="text"
      value={rule.value}
      onChange={(e) => updateRuleValue(rule.id, e.target.value)}
      placeholder="Or type organization name..."
      className="..."
    />
  </>
)}
```

**Простіший варіант:** Просто додати `datalist` для автокомпліту:
```html
<input
  list="org-list"
  value={rule.value}
  onChange={(e) => updateRuleValue(rule.id, e.target.value)}
  placeholder="Type to search organizations..."
/>
<datalist id="org-list">
  {allOrganizations.map(org => (
    <option key={org} value={org} />
  ))}
</datalist>
```

**КРИТИЧНО:** Також потрібно оновити логіку матчингу в `matchDocumentToRules`, щоб правило `vendor` шукало в `document.organization`:
```typescript
case 'vendor':
  const vendorName = rule.value.toLowerCase();
  // Шукати в organization, а не в vendor
  const docOrg = (document.organization || '').toLowerCase();
  // ... решта логіки
```

---

### 5. Badge "Auto-added" на документах ✅

**Файл:** `src/components/DocumentCard.tsx` або `CollectionDetailView.tsx`

**Що зробити:**
- Перевірити чи документ був доданий через autoSync
- Показати badge з поясненням

**Код:**
```typescript
// В CollectionDetailView або DocumentCard
const isAutoAdded = useMemo(() => {
  if (!collection?.autoSync || !collection?.rules) return false;
  // Перевірити чи документ відповідає правилам
  return matchDocumentToRules(document, collection.rules);
}, [document, collection]);

// В рендері
{isAutoAdded && (
  <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
    <Sparkles className="w-3 h-3" />
    Auto-added
  </div>
)}
```

---

## 📋 Чеклист реалізації

- [ ] 1. Додати vendor колонку в AllDocumentsTable
- [ ] 2. Додати AI-підказку для створення "All Invoices"
- [ ] 3. Додати preview matching documents (базовий варіант - показувати кількість)
- [ ] 4. Додати datalist для vendor autocomplete
- [ ] 5. Додати badge "Auto-added" на документи

---

## 🚀 Порядок виконання (рекомендований)

1. **Перший:** Vendor колонка (найпросте, найважливіше для тесту)
2. **Другий:** AI-підказка (дуже допомагає в Task 2-3)
3. **Третій:** Vendor selector (полегшує Task 4)
4. **Четвертий:** Auto-added badge (допомагає в Task 5)
5. **П'ятий:** Preview matching (nice to have)

---

## ⚠️ Примітки

- Всі ці зміни можна зробити без зміни бекенду
- Використовувати існуючі дані з mockDocuments
- Не потрібно додавати нові залежності
- Можна робити поступово, кожна зміна незалежна

---

*Оновлено: 2025-01-XX*

