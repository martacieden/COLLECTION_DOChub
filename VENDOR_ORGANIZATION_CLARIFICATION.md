# 🔄 Уточнення: Vendor = Organization

## Концепція

В системі **vendor (вендор) = organization (організація)**.

Вендори (постачальники інвойсів) - це інші організації, з якими працює користувач.

## Структура даних

### Document
```typescript
interface Document {
  // ... інші поля
  organization?: string; // Це і є vendor для інвойсів
  vendor?: string;       // Legacy поле, використовується organization
}
```

### CollectionRule типу 'vendor'
Правило типу `vendor` має шукати в `document.organization`, а не в `document.vendor`.

## Оновлення в коді

### ✅ Вже оновлено:
1. **matchDocumentToRules** (`src/App.tsx:3570-3586`)
   - Правило `vendor` тепер шукає в `document.organization`
   - Залишена підтримка `document.vendor` для сумісності

### 📝 Потрібно оновити:

#### 1. RulesEditorModal - вибір organization для правила vendor
```typescript
// Замість унікальних vendor з документів, використовувати список organizations
{rule.type === 'vendor' && (
  <select
    value={rule.value}
    onChange={(e) => updateRuleValue(rule.id, e.target.value)}
  >
    <option value="">Select organization...</option>
    {organizations.map(org => (
      <option key={org.id} value={org.name}>{org.name}</option>
    ))}
  </select>
)}
```

#### 2. AllDocumentsTable - відображення organization
```typescript
// Показувати organization як "Vendor / Organization"
{hasOrgData && (
  <th>Vendor / Organization</th>
)}
{hasOrgData && (
  <td>{document.organization || '—'}</td>
)}
```

#### 3. NewCollectionModal - генерація правил vendor
```typescript
// При генерації правил з опису, якщо є слово "vendor", шукати в organization
if (descLower.includes('vendor')) {
  // Використовувати organizations з документів
  const orgs = [...new Set(docs.map(d => d.organization).filter(Boolean))];
  // ...
}
```

## Тестовий скрипт - контекст

В тестовому скрипті вендори (Deloitte, AWS, Studio XYZ, тощо) - це:
- Інші організації, які надають послуги
- Вони можуть бути додані до списку `organizations` в системі
- Або можуть бути витягнуті з документів як унікальні значення `organization`

## Рекомендації

1. **UI текст:** Використовувати "Vendor / Organization" або просто "Organization" залежно від контексту
2. **Правила:** Тип правила може називатися `vendor`, але шукати в `organization`
3. **Майбутнє:** Можна перейменувати тип правила на `organization` для ясності

---

*Оновлено: 2025-01-XX*

