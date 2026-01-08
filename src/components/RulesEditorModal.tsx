import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Trash2, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { generateCollectionRules, enhanceCollectionText, type CollectionRule } from '../services/aiRulesGenerator';

interface Organization {
  id: string;
  name: string;
  initials: string;
}

interface Document {
  id: string;
  organization?: string;
  category?: string;
  tags?: string[];
  name?: string;
  description?: string;
  type?: string; // File format: PDF, DOCX, XLSX
  vendor?: string;
  uploadedOn?: string;
}

interface RulesEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rules: CollectionRule[], description?: string, name?: string, icon?: string) => void;
  initialRules: CollectionRule[];
  initialDescription?: string;
  initialName?: string;
  initialIcon?: string;
  matchedDocumentsCount?: number;
  onFindMatchingDocuments?: (rules: CollectionRule[]) => number; // Функція для пошуку відповідних документів
  organizations?: Organization[]; // Список організацій для випадаючих списків
  documents?: Document[]; // Документи для отримання унікальних значень
}

// Популярні емодзі для колекцій
const emojiCategories = [
  {
    name: 'Documents',
    emojis: ['📁', '📄', '📝', '📋', '📊', '📈', '📉', '📑', '📃', '📜']
  },
  {
    name: 'Business',
    emojis: ['💼', '💵', '💰', '💳', '📧', '📞', '🏢', '🏭', '🏪', '🏬']
  },
  {
    name: 'Legal',
    emojis: ['⚖️', '📜', '📋', '✍️', '🔒', '🛡️', '📌', '📍', '✅', '❌']
  },
  {
    name: 'Projects',
    emojis: ['🏗️', '🔨', '🛠️', '⚙️', '🔧', '📐', '📏', '🏠', '🏘️', '🏙️']
  },
  {
    name: 'Finance',
    emojis: ['💰', '💸', '💴', '💶', '💷', '💳', '📊', '📈', '💹', '💱']
  },
  {
    name: 'Other',
    emojis: ['⭐', '🔥', '💡', '🎯', '🚀', '📦', '🎁', '🏆', '🎖️', '🌟']
  }
];

const ruleTypeOptions = [
  { value: 'document_type', label: 'Document category' },
  { value: 'tags', label: 'Tags' },
  { value: 'client', label: 'Client' },
  { value: 'date_range', label: 'Date range' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'file_type', label: 'File format' },
  { value: 'organization', label: 'Organization' },
];

const operatorOptions = [
  { value: 'is', label: 'is' },
  { value: 'contains', label: 'contains' },
  { value: 'equals', label: 'equals' },
  { value: 'not', label: 'is not' },
];

export function RulesEditorModal({
  isOpen,
  onClose,
  onSave,
  initialRules,
  initialDescription = '',
  initialName = '',
  initialIcon = '📁',
  matchedDocumentsCount = 0,
  onFindMatchingDocuments,
  organizations = [],
  documents = []
}: RulesEditorModalProps) {
  const [collectionName, setCollectionName] = useState<string>('');
  const [collectionIcon, setCollectionIcon] = useState<string>('📁');
  const [description, setDescription] = useState<string>('');
  const [rules, setRules] = useState<CollectionRule[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchedDocCount, setMatchedDocCount] = useState(0);
  const [nameError, setNameError] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const [aiReasoning, setAiReasoning] = useState<string | undefined>();

  // Extract emoji from icon string
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  const getEmojiFromIcon = (icon?: string): string => {
    if (!icon) return '📁';
    const match = icon.trim().match(emojiRegex);
    return match ? match[0] : '📁';
  };

  // Отримуємо список організацій для випадаючих списків
  // ВАЖЛИВО: useMemo має бути перед будь-якими умовними виходами (Rules of Hooks)
  const organizationOptions = useMemo(() => {
    const orgsFromList = (organizations || []).map(org => org.name);
    const orgsFromDocs = [...new Set((documents || []).map(d => d.organization).filter(Boolean))];
    const allOrgs = [...new Set([...orgsFromList, ...orgsFromDocs])].sort();
    return allOrgs;
  }, [organizations, documents]);

  // Отримуємо список категорій документів (з усіх документів)
  const categoryOptions = useMemo(() => {
    const categories = [...new Set((documents || []).map(d => d.category).filter(Boolean))].sort();
    return categories;
  }, [documents]);

  // Отримуємо список тегів (з усіх документів)
  const tagOptions = useMemo(() => {
    const allTags = (documents || []).flatMap(d => d.tags || []).filter(Boolean);
    const uniqueTags = [...new Set(allTags)].sort();
    return uniqueTags;
  }, [documents]);

  // Отримуємо список форматів файлів (з усіх документів)
  const fileTypeOptions = useMemo(() => {
    const fileTypes = [...new Set((documents || []).map(d => d.type).filter(Boolean))].sort();
    return fileTypes;
  }, [documents]);

  // Отримуємо список вендорів (з усіх документів)
  const vendorOptions = useMemo(() => {
    const vendors = [...new Set((documents || []).map(d => d.vendor).filter(Boolean))].sort();
    return vendors;
  }, [documents]);

  useEffect(() => {
    if (isOpen) {
      // Функція для парсингу складних значень типу "Project = Oak Street"
      const parseRuleValue = (value: string, currentType: string, currentOperator: string) => {
        let parsedType = currentType;
        let parsedOperator = currentOperator;
        let parsedValue = value || '';
        
        // Парсимо формат "Project = Oak Street" або "Category is any of C"
        if (value.includes(' = ')) {
          const parts = value.split(' = ');
          const leftPart = parts[0]?.trim() || '';
          parsedValue = parts[1]?.trim() || '';
          parsedOperator = 'equals';
          
          // Визначаємо тип на основі лівої частини
          if (leftPart.toLowerCase().includes('project') || leftPart.toLowerCase().includes('category')) {
            parsedType = 'document_type';
          } else if (leftPart.toLowerCase().includes('client') || leftPart.toLowerCase().includes('organization')) {
            parsedType = leftPart.toLowerCase().includes('client') ? 'client' : 'organization';
          } else if (leftPart.toLowerCase().includes('vendor')) {
            parsedType = 'vendor';
          } else if (leftPart.toLowerCase().includes('tag')) {
            parsedType = 'tags';
          }
        } else if (value.includes(' is any of ')) {
          const parts = value.split(' is any of ');
          const leftPart = parts[0]?.trim() || '';
          parsedValue = parts[1]?.trim() || '';
          parsedOperator = 'contains';
          
          // Визначаємо тип на основі лівої частини
          if (leftPart.toLowerCase().includes('category') || leftPart.toLowerCase().includes('project')) {
            parsedType = 'document_type';
          } else if (leftPart.toLowerCase().includes('client') || leftPart.toLowerCase().includes('organization')) {
            parsedType = leftPart.toLowerCase().includes('client') ? 'client' : 'organization';
          } else if (leftPart.toLowerCase().includes('vendor')) {
            parsedType = 'vendor';
          } else if (leftPart.toLowerCase().includes('tag')) {
            parsedType = 'tags';
          }
        } else if (value.includes(' contains ')) {
          const parts = value.split(' contains ');
          parsedValue = parts[1]?.trim() || parts[0]?.trim() || '';
          parsedOperator = 'contains';
        }
        
        // Видаляємо лапки, якщо вони є
        parsedValue = parsedValue.replace(/^["']|["']$/g, '').trim();
        
        return { parsedType, parsedOperator, parsedValue };
      };

      // Очищаємо та нормалізуємо значення правил
      const rulesToSet = initialRules.length > 0 ? initialRules.map(rule => {
        let cleanValue = rule.value || '';
        let finalType = rule.type;
        let finalOperator = rule.operator;
        
        // Парсимо складні значення типу "Project = Oak Street"
        if (cleanValue.includes(' = ') || cleanValue.includes(' is any of ') || cleanValue.includes(' contains ')) {
          const parsed = parseRuleValue(cleanValue, rule.type, rule.operator);
          finalType = parsed.parsedType;
          finalOperator = parsed.parsedOperator;
          cleanValue = parsed.parsedValue;
        }
        
        // Перевіряємо, чи значення відповідає опціям у списку (для select полів)
        let finalValue = cleanValue;
        if (finalType === 'vendor' && vendorOptions.length > 0) {
          if (!vendorOptions.includes(cleanValue)) {
            finalValue = vendorOptions[0];
          }
        } else if ((finalType === 'client' || finalType === 'organization') && organizationOptions.length > 0) {
          if (!organizationOptions.includes(cleanValue)) {
            finalValue = organizationOptions[0];
          }
        } else if (finalType === 'document_type' && categoryOptions.length > 0) {
          if (!categoryOptions.includes(cleanValue)) {
            finalValue = categoryOptions[0];
          }
        } else if (finalType === 'tags' && tagOptions.length > 0) {
          if (!tagOptions.includes(cleanValue)) {
            finalValue = tagOptions[0];
          }
        } else if (finalType === 'file_type' && fileTypeOptions.length > 0) {
          if (!fileTypeOptions.includes(cleanValue)) {
            finalValue = fileTypeOptions[0];
          }
        }
        
        return {
          ...rule,
          type: finalType,
          operator: finalOperator,
          value: finalValue,
          label: ruleTypeOptions.find(opt => opt.value === finalType)?.label || rule.label
        };
      }) : [];
      
      setRules(rulesToSet);
      setDescription(initialDescription || '');
      setCollectionName(initialName || '');
      setCollectionIcon(getEmojiFromIcon(initialIcon));
      setNameError('');
      setIsEmojiPickerOpen(false);
      
      // Знаходимо реальну кількість відповідних документів
      if (onFindMatchingDocuments && rulesToSet.length > 0) {
        const realCount = onFindMatchingDocuments(rulesToSet);
        setMatchedDocCount(realCount);
      } else {
        setMatchedDocCount(matchedDocumentsCount);
      }
    }
  }, [isOpen, initialRules, initialDescription, initialName, initialIcon, matchedDocumentsCount, onFindMatchingDocuments, vendorOptions, organizationOptions, categoryOptions, tagOptions, fileTypeOptions]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };

    if (isEmojiPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmojiPickerOpen]);

  if (!isOpen) return null;

  const updateRuleType = (ruleId: string, newType: CollectionRule['type']) => {
    setRules(prev => {
      const updated = prev.map(rule => {
        if (rule.id === ruleId) {
          let newValue = '';
          
          // Автоматично встановлюємо значення на основі типу
          if (newType === 'vendor') {
            // Встановлюємо першого вендора зі списку
            newValue = vendorOptions.length > 0 ? vendorOptions[0] : '';
          } else if (newType === 'client' || newType === 'organization') {
            // Встановлюємо першу організацію зі списку
            newValue = organizationOptions.length > 0 ? organizationOptions[0] : '';
          } else if (newType === 'document_type') {
            // Встановлюємо першу категорію зі списку
            newValue = categoryOptions.length > 0 ? categoryOptions[0] : '';
          } else if (newType === 'tags') {
            // Встановлюємо перший тег зі списку
            newValue = tagOptions.length > 0 ? tagOptions[0] : '';
          } else if (newType === 'file_type') {
            // Встановлюємо перший формат файлу зі списку
            newValue = fileTypeOptions.length > 0 ? fileTypeOptions[0] : '';
          }
          
          return {
              ...rule, 
              type: newType,
            label: ruleTypeOptions.find(opt => opt.value === newType)?.label || rule.label,
            value: newValue
          };
            } 
        return rule;
      });
      
      // Оновлюємо кількість відповідних документів при зміні типу
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      return updated;
    });
  };

  const updateRuleOperator = (ruleId: string, newOperator: CollectionRule['operator']) => {
    setRules(prev => {
      const updated = prev.map(rule =>
        rule.id === ruleId ? { ...rule, operator: newOperator } : rule
      );
      
      // Оновлюємо кількість відповідних документів при зміні оператора
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      return updated;
    });
  };

  const updateRuleValue = (ruleId: string, newValue: string) => {
    setRules(prev => {
      const updated = prev.map(rule =>
        rule.id === ruleId ? { ...rule, value: newValue } : rule
      );
      
      // Оновлюємо кількість відповідних документів при зміні значення
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      return updated;
    });
  };

  const toggleRuleEnabled = (ruleId: string) => {
    setRules(prev => {
      const updated = prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      );
      
      // Оновлюємо кількість відповідних документів при зміні правил
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      return updated;
    });
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => {
      const updated = prev.filter(rule => rule.id !== ruleId);
      
      // Оновлюємо кількість відповідних документів при видаленні правила
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      // Якщо видалено всі правила, показуємо попередження
      if (updated.length === 0 && prev.length > 0) {
        toast.warning(
          <div className="flex flex-col gap-[4px]">
            <div className="text-[13px] text-[#1c2024] font-medium">
              All rules removed
            </div>
            <div className="text-[12px] text-[#60646c]">
              This collection will no longer be Auto-sync enabled. Documents will need to be added manually.
            </div>
          </div>,
          { duration: 5000 }
        );
      }
      
      return updated;
    });
  };

  const addNewRule = () => {
    const newRule: CollectionRule = {
      id: `rule-${Date.now()}-${Math.random()}`,
      type: 'document_type',
      label: 'Document category',
      value: '',
      operator: 'is',
      enabled: true,
    };
    setRules(prev => {
      const updated = [...prev, newRule];
      
      // Оновлюємо кількість відповідних документів при додаванні правила
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(updated);
        setMatchedDocCount(realCount);
      }
      
      return updated;
    });
  };

  // Генеруємо AI правила на основі опису
  const handleGenerateRules = async () => {
    const fullDescription = description.trim() 
      ? `${collectionName.trim()} ${description.trim()}`.trim()
      : collectionName.trim();

    if (!fullDescription) {
      toast.error('Please enter a collection name or description first');
      return;
    }

    setIsGenerating(true);
    setAiReasoning(undefined);

    try {
      const result = await generateCollectionRules({
        description: fullDescription,
      });

      setRules(result.rules);
      setAiReasoning(result.reasoning);
      
      // Calculate matched documents
      if (onFindMatchingDocuments) {
        const realCount = onFindMatchingDocuments(result.rules);
        setMatchedDocCount(realCount);
      } else {
        const enabledRules = result.rules.filter(r => r.enabled && r.value?.trim());
        if (enabledRules.length > 0 && documents.length > 0) {
          // Simple matching logic
          const count = documents.filter(doc => {
            return enabledRules.every(rule => {
              const ruleValue = rule.value.toLowerCase();
              if (rule.type === 'document_type') {
                return (doc.category || '').toLowerCase().includes(ruleValue);
              }
              if (rule.type === 'tags') {
                return (doc.tags || []).some(tag => tag.toLowerCase().includes(ruleValue));
              }
              if (rule.type === 'client') {
                return (doc.organization || '').toLowerCase().includes(ruleValue);
              }
              return false;
            });
          }).length;
          setMatchedDocCount(count);
        } else {
          setMatchedDocCount(0);
        }
      }

      toast.success(`AI generated ${result.rules.length} rules`);
    } catch (error) {
      console.error('[RulesEditorModal] AI generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to generate rules: ${errorMessage}`);
    } finally {
    setIsGenerating(false);
    }
  };

  const handleSave = () => {
    // Валідація назви (якщо передано)
    if (initialName !== undefined && !collectionName.trim()) {
      setNameError('Collection name is required');
      return;
    }

    // Перевірка: якщо всі правила видалені, колекція більше не буде Auto-sync enabled
    if (rules.length === 0) {
      toast.warning(
        <div className="flex flex-col gap-[4px]">
          <div className="text-[13px] text-[#1c2024] font-medium">
            All rules removed
          </div>
          <div className="text-[12px] text-[#60646c]">
            This collection will no longer be Auto-sync enabled. Documents will need to be added manually.
          </div>
        </div>,
        { duration: 5000 }
      );
      // Все одно зберігаємо (колекція стає manual)
      onSave(rules, description, collectionName.trim() || undefined, collectionIcon);
      return;
    }
    
    // Валідація: перевірка, що хоча б одне правило увімкнено
    const enabledRules = rules.filter(r => r.enabled);
    if (enabledRules.length === 0) {
      toast.error('At least one rule must be enabled');
      return;
    }

    // Валідація: перевірка, що всі увімкнені правила мають значення
    const invalidRules = enabledRules.filter(r => !r.value.trim());
    if (invalidRules.length > 0) {
      toast.error('All enabled rules must have a value');
      return;
    }

    onSave(rules, description, collectionName.trim() || undefined, collectionIcon);
  };

  const handleEmojiSelect = (emoji: string) => {
    setCollectionIcon(emoji);
    setIsEmojiPickerOpen(false);
  };

  const enabledRulesCount = rules.filter(r => r.enabled).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-[24px]" style={{ isolation: 'isolate' }}>
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh] relative z-[100]" style={{ isolation: 'isolate' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Collection Rules</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[24px] space-y-[24px]">
          {/* Title Field (only if initialName is provided) */}
          {initialName !== undefined && (
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[8px] mb-[8px]">
                <label className="block text-[13px] text-[#1c2024]">
                  Title <span className="text-[#d4183d]">*</span>
                </label>
              </div>
              <div className="flex items-center gap-[8px]">
                {/* Emoji Picker Button */}
                <div className="relative" ref={emojiPickerRef}>
                  <button
                    ref={emojiButtonRef}
                    type="button"
                    onClick={() => {
                      if (emojiButtonRef.current) {
                        const rect = emojiButtonRef.current.getBoundingClientRect();
                        setDropdownPosition({
                          top: rect.bottom + 4,
                          left: rect.left
                        });
                      }
                      setIsEmojiPickerOpen(!isEmojiPickerOpen);
                    }}
                    className="size-[40px] flex items-center justify-center border border-[#e0e1e6] rounded-[8px] bg-white hover:bg-[#f9fafb] transition-colors flex-shrink-0"
                  >
                    <span className="text-[20px]">{collectionIcon}</span>
                  </button>

                  {/* Emoji Picker Dropdown */}
                  {isEmojiPickerOpen && typeof window !== 'undefined' && createPortal(
                    <div 
                      className="absolute top-[44px] left-0 z-[100] bg-white border border-[#e8e8ec] rounded-[8px] shadow-lg p-[16px] w-[300px] max-h-[400px] overflow-y-auto"
                      style={{ 
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        boxSizing: 'content-box',
                        pointerEvents: 'auto'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-[16px]">
                        {emojiCategories.map((category) => (
                          <div key={category.name}>
                            <h4 className="text-[11px] font-semibold text-[#8b8d98] uppercase tracking-wider mb-[8px]">
                              {category.name}
                            </h4>
                            <div className="grid grid-cols-6 gap-[6px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
                              {category.emojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleEmojiSelect(emoji)}
                                  className={`flex items-center justify-center rounded-[8px] text-[24px] hover:bg-[#f0f0f3] transition-colors ${
                                    collectionIcon === emoji ? 'bg-[#f0f7ff] border-2 border-[#005be2]' : ''
                                  }`}
                                  style={{ width: '100%', aspectRatio: '1' }}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </div>

                <input
                  type="text"
                  value={collectionName}
                  onChange={(e) => {
                    setCollectionName(e.target.value);
                    setNameError('');
                  }}
                  placeholder="Collection title"
                  className={`flex-1 h-[40px] px-[12px] border ${nameError ? 'border-[#d4183d]' : 'border-[#e0e1e6]'} rounded-[8px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#005be2]`}
                />
              </div>
              {nameError && (
                <p className="text-[11px] text-[#d4183d] mt-[4px]">{nameError}</p>
              )}
            </div>
          )}

          {/* Description Field */}
          <div className="space-y-[8px]">
            <div className="flex items-center justify-between mb-[8px]">
              <label className="block text-[13px] text-[#1c2024]">
                Description
              </label>
              {(collectionName.trim() || description.trim()) && (
                <button
                  onClick={async () => {
                    const fullText = collectionName.trim() 
                      ? `${collectionName.trim()} ${description.trim()}`.trim()
                      : description.trim();
                    
                    if (!fullText) {
                      toast.error('Please enter a collection name or description first');
                      return;
                    }

                    setIsGenerating(true);
                    try {
                      const result = await enhanceCollectionText({ text: fullText });
                      if (result.title && collectionName.trim()) {
                        setCollectionName(result.title);
                      }
                      if (result.description) {
                        setDescription(result.description);
                      }
                      toast.success('Description enhanced successfully');
                    } catch (error) {
                      console.error('[RulesEditorModal] Enhancement error:', error);
                      toast.error('Failed to enhance description');
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating}
                  className="flex items-center gap-[6px] h-[28px] px-[10px] text-[12px] text-[#005be2] hover:bg-[#f0f7ff] rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="size-[14px]" />
                  <span>Re-enhance</span>
                </button>
              )}
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this collection contains..."
              className="w-full min-h-[100px] p-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2]"
            />
          </div>

          {/* Filtering Rules Section */}
          <div className="space-y-[12px]">
            <div>
              <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                Filtering Rules (optional)
              </label>
              <p className="text-[11px] text-[#60646c] mb-[8px]">
                Rules determine which documents are automatically included in this collection. Leave empty to create a manual collection.
              </p>
            </div>

            {/* Rules Editor Block */}
            <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden bg-white">
              {/* Header з кнопками */}
              <div className="flex items-center justify-between px-[16px] py-[8px] border-b border-[#e8e8ec] bg-[#f9fafb]">
                <div className="flex items-center gap-[8px]">
                  <p className="text-[13px] text-[#1c2024] font-medium">Rules</p>
                  {rules.length > 0 && (
                    <span className="px-[8px] py-[2px] rounded-[6px] bg-[#f0f7ff] border border-[#005be2] text-[11px] text-[#005be2]">
                      {enabledRulesCount} active
                    </span>
                  )}
                  {matchedDocCount > 0 && (
                    <span className="text-[11px] text-[#60646c]">
                      • {matchedDocCount} {matchedDocCount === 1 ? 'document' : 'documents'} will be added
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-[8px]">
              <button
                onClick={handleGenerateRules}
                    disabled={isGenerating || (!collectionName.trim() && !description.trim())}
                    className="flex items-center gap-[6px] h-[32px] px-[12px] bg-gradient-to-r from-[#005be2] to-[#0047b3] text-white rounded-[6px] text-[12px] hover:from-[#004fc4] hover:to-[#003d99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGenerating ? (
                  <>
                        <Loader2 className="size-[14px] animate-spin" />
                        <span>Generating...</span>
                  </>
                ) : (
                  <>
                        <Sparkles className="size-[14px]" />
                        <span>Generate with AI</span>
                  </>
                )}
              </button>
                  <button
                    onClick={addNewRule}
                    className="flex items-center gap-[6px] h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[12px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors"
                  >
                    <Plus className="size-[14px]" />
                    <span>Add rule</span>
                  </button>
                </div>
                      </div>

              {/* AI Reasoning (якщо є) */}
              {aiReasoning && (
                <div className="border-b border-[#e8e8ec] px-[16px] py-[12px] bg-[#f5f3ff]">
                  <p className="text-[11px] text-[#7c3aed]">
                    <span className="font-medium">AI reasoning:</span> {aiReasoning}
                  </p>
                        </div>
                      )}
                      
              {/* Rules List */}
              <div className="px-[16px] py-[8px] bg-[#f9fafb] space-y-[12px]">
                        {rules.length > 0 ? (
                  <div className="space-y-0">
                    {rules.map((rule) => (
                            <div
                              key={rule.id}
                        className={`flex items-center gap-[8px] pt-0 pb-0 mb-[8px] transition-all ${
                                rule.enabled
                                  ? 'opacity-100'
                                  : 'opacity-60'
                              }`}
                        style={{ width: '500px' }}
                            >
                        {/* Select filter dropdown */}
                              <select
                                value={rule.type}
                                onChange={(e) => updateRuleType(rule.id, e.target.value as CollectionRule['type'])}
                          className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1 min-w-[140px]"
                              >
                                {ruleTypeOptions.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>

                        {/* Operator dropdown */}
                              <select
                                value={rule.operator}
                                onChange={(e) => updateRuleOperator(rule.id, e.target.value as CollectionRule['operator'])}
                          className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1 min-w-[120px]"
                              >
                                {operatorOptions.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>

                              {/* Value Input/Select */}
                        {rule.type === 'vendor' ? (
                          <select
                            value={rule.value}
                            onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                            style={{ minWidth: 0 }}
                          >
                            <option value="">Select vendor...</option>
                            {vendorOptions.map(vendor => (
                              <option key={vendor} value={vendor}>{vendor}</option>
                            ))}
                          </select>
                        ) : rule.type === 'client' || rule.type === 'organization' ? (
                                <select
                                  value={rule.value}
                                  onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                                  className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                                  style={{ minWidth: 0 }}
                                >
                            <option value="">Select {rule.type === 'client' ? 'client' : 'organization'}...</option>
                                  {organizationOptions.map(org => (
                                    <option key={org} value={org}>{org}</option>
                                  ))}
                                </select>
                              ) : rule.type === 'document_type' ? (
                                <select
                                  value={rule.value}
                                  onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                                  className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                                  style={{ minWidth: 0 }}
                                >
                                  <option value="">Select category...</option>
                                  {categoryOptions.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                  ))}
                                </select>
                              ) : rule.type === 'tags' ? (
                                <select
                                  value={rule.value}
                                  onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                                  className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                                  style={{ minWidth: 0 }}
                                >
                                  <option value="">Select tag...</option>
                                  {tagOptions.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                  ))}
                                </select>
                        ) : rule.type === 'file_type' ? (
                          <select
                            value={rule.value}
                            onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                            style={{ minWidth: 0 }}
                          >
                            <option value="">Select file format...</option>
                            {fileTypeOptions.map(fileType => (
                              <option key={fileType} value={fileType}>{fileType}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={rule.value}
                                  onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                            placeholder={rule.type === 'date_range' ? 'Date range (e.g., 2024)' : 'Value'}
                                  className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                                  style={{ minWidth: 0 }}
                                />
                              )}

                        {/* Delete button */}
                              <button
                                onClick={() => deleteRule(rule.id)}
                                className="size-[40px] flex items-center justify-center rounded-[8px] border border-[#e0e1e6] hover:bg-[#fee7e9] transition-colors flex-shrink-0"
                              >
                                <Trash2 className="size-[16px] text-[#60646c]" />
                              </button>
                            </div>
                    ))}
                  </div>
                        ) : (
                          <div className="text-center py-[12px]">
                            <p className="text-[11px] text-[#60646c]">
                              No rules yet. Add rules manually or generate them with AI.
                            </p>
                          </div>
                        )}
                      </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec]">
          <button
            onClick={onClose}
            className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3]"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

