import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Trash2, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CollectionRule {
  id: string;
  type: 'document_type' | 'tags' | 'client' | 'keywords' | 'date_range' | 'vendor';
  label: string;
  value: string;
  operator: 'is' | 'contains' | 'equals' | 'not';
  enabled: boolean;
}

interface Organization {
  id: string;
  name: string;
  initials: string;
}

interface Document {
  id: string;
  organization?: string;
}

interface RulesEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rules: CollectionRule[], description?: string) => void;
  initialRules: CollectionRule[];
  initialDescription?: string;
  matchedDocumentsCount?: number;
  onFindMatchingDocuments?: (rules: CollectionRule[]) => number; // Функція для пошуку відповідних документів
  organizations?: Organization[]; // Список організацій для випадаючих списків
  documents?: Document[]; // Документи для отримання унікальних значень
}

const ruleTypeOptions = [
  { value: 'document_type', label: 'Document type' },
  { value: 'tags', label: 'Tags' },
  { value: 'client', label: 'Client' },
  { value: 'keywords', label: 'Keywords' },
  { value: 'date_range', label: 'Date range' },
  { value: 'vendor', label: 'Vendor' },
];

const operatorOptions = [
  { value: 'is', label: 'is' },
  { value: 'contains', label: 'contains' },
  { value: 'equals', label: 'equals' },
  { value: 'not', label: 'not' },
];

export function RulesEditorModal({
  isOpen,
  onClose,
  onSave,
  initialRules,
  initialDescription = '',
  matchedDocumentsCount = 0,
  onFindMatchingDocuments,
  organizations = [],
  documents = []
}: RulesEditorModalProps) {
  const [rules, setRules] = useState<CollectionRule[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRulesBlock, setShowRulesBlock] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [matchedDocCount, setMatchedDocCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const rulesToSet = initialRules.length > 0 ? [...initialRules] : [];
      setRules(rulesToSet);
      setDescription(initialDescription || '');
      setShowRulesBlock(initialRules.length > 0);
      setIsRulesExpanded(initialRules.length > 0);
      
      // Знаходимо реальну кількість відповідних документів
      if (onFindMatchingDocuments && rulesToSet.length > 0) {
        const realCount = onFindMatchingDocuments(rulesToSet);
        setMatchedDocCount(realCount);
      } else {
        setMatchedDocCount(matchedDocumentsCount);
      }
    }
  }, [isOpen, initialRules, initialDescription, matchedDocumentsCount, onFindMatchingDocuments]);

  // Отримуємо список організацій для випадаючих списків
  // ВАЖЛИВО: useMemo має бути перед будь-якими умовними виходами (Rules of Hooks)
  const organizationOptions = useMemo(() => {
    const orgsFromList = (organizations || []).map(org => org.name);
    const orgsFromDocs = [...new Set((documents || []).map(d => d.organization).filter(Boolean))];
    const allOrgs = [...new Set([...orgsFromList, ...orgsFromDocs])].sort();
    return allOrgs;
  }, [organizations, documents]);

  if (!isOpen) return null;

  const enabledRulesCount = rules.filter(r => r.enabled).length;

  const updateRuleType = (ruleId: string, newType: CollectionRule['type']) => {
    setRules(prev => {
      const updated = prev.map(rule =>
        rule.id === ruleId 
          ? { 
              ...rule, 
              type: newType,
              label: ruleTypeOptions.find(opt => opt.value === newType)?.label || rule.label
            } 
          : rule
      );
      
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
      
      return updated;
    });
  };

  const addNewRule = () => {
    const newRule: CollectionRule = {
      id: `rule-${Date.now()}-${Math.random()}`,
      type: 'document_type',
      label: 'Document type',
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
    if (!showRulesBlock) {
      setShowRulesBlock(true);
      setIsRulesExpanded(true);
    }
  };

  // Генеруємо AI правила на основі опису (спрощена версія з NewCollectionModal)
  const handleGenerateRules = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description first');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate smart rules based on description
    const generatedRules: CollectionRule[] = [];
    const descLower = description.toLowerCase();

    // Document type detection - покращена логіка для Invoice
    if (descLower.includes('invoice') || descLower.includes('invoices') || descLower.includes('payment') || descLower.includes('billing')) {
      generatedRules.push({
        id: `rule-type-${Date.now()}-1`,
        type: 'document_type',
        label: 'Document type',
        value: 'Invoice',
        operator: 'is',
        enabled: true,
      });
    }
    if (descLower.includes('contract') || descLower.includes('agreement')) {
      generatedRules.push({
        id: `rule-type-${Date.now()}-2`,
        type: 'document_type',
        label: 'Document type',
        value: 'Contract',
        operator: 'is',
        enabled: true,
      });
    }
    if (descLower.includes('tax') || descLower.includes('filing')) {
      generatedRules.push({
        id: `rule-type-${Date.now()}-3`,
        type: 'document_type',
        label: 'Document type',
        value: 'Tax Document',
        operator: 'is',
        enabled: true,
      });
    }

    // Tags detection
    if (descLower.includes('household') || descLower.includes('payment')) {
      generatedRules.push({
        id: `rule-tags-${Date.now()}-1`,
        type: 'tags',
        label: 'Tags',
        value: 'Household, Payments',
        operator: 'contains',
        enabled: true,
      });
    }
    if (descLower.includes('property') || descLower.includes('real estate')) {
      generatedRules.push({
        id: `rule-tags-${Date.now()}-2`,
        type: 'tags',
        label: 'Tags',
        value: 'Property, Real Estate',
        operator: 'contains',
        enabled: true,
      });
    }

    // Client detection
    const clientMatch = description.match(/(?:client|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
    if (clientMatch) {
      generatedRules.push({
        id: `rule-client-${Date.now()}`,
        type: 'client',
        label: 'Client',
        value: clientMatch[1],
        operator: 'is',
        enabled: true,
      });
    }

    // Date range detection
    const yearMatch = description.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      generatedRules.push({
        id: `rule-date-${Date.now()}`,
        type: 'date_range',
        label: 'Date range',
        value: yearMatch[1],
        operator: 'is',
        enabled: true,
      });
    }

    // Keywords detection
    if (descLower.includes('tax') || descLower.includes('filing')) {
      generatedRules.push({
        id: `rule-keywords-${Date.now()}`,
        type: 'keywords',
        label: 'Keywords',
        value: '"tax", "filing"',
        operator: 'contains',
        enabled: true,
      });
    }

    setRules(generatedRules);
    setIsGenerating(false);

    // Знаходимо реальну кількість відповідних документів
    if (onFindMatchingDocuments) {
      const realCount = onFindMatchingDocuments(generatedRules);
      setMatchedDocCount(realCount);
    } else {
      // Якщо функція не передана, використовуємо симуляцію
      const enabledCount = generatedRules.filter(r => r.enabled).length;
      setMatchedDocCount(Math.floor(Math.random() * 50) + enabledCount * 10);
    }
    
    // Show the mini-block with collapsed rules
    setShowRulesBlock(true);
    setIsRulesExpanded(true);

    toast.success('AI rules generated successfully');
  };

  const handleSave = () => {
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

    onSave(rules, description);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-[24px]" style={{ isolation: 'isolate' }}>
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh] relative z-[100]" style={{ isolation: 'isolate' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <div className="flex items-center gap-[12px]">
            <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] size-[32px] rounded-[8px] flex items-center justify-center">
              <Sparkles className="size-[16px] text-[#7c3aed]" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#1c2024]">AI-Generated Rules</h2>
              <div className="flex items-center gap-[8px] mt-[4px]">
                <span className="px-[6px] py-[2px] bg-[#ebf3ff] text-[#005be2] rounded-[4px] text-[11px] font-medium">
                  {enabledRulesCount} active
                </span>
                {matchedDocumentsCount > 0 && (
                  <span className="text-[12px] text-[#60646c]">
                    {matchedDocumentsCount} documents matched
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
          <div className="space-y-[24px]">
            {/* Description Section */}
            <div className="space-y-[12px]">
              <div>
                <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                  Description & AI Rules
                </label>
                <p className="text-[11px] text-[#60646c] mb-[8px]">
                  Describe your collection and let AI suggest filtering rules.
                </p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. All documents related to our Malibu property&#10;Invoices from all household vendors for 2023–2024&#10;Documents related to tax filings for Client A"
                  className="w-full min-h-[100px] p-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2]"
                />
              </div>

              {/* Generate Rules Button */}
              <button
                onClick={handleGenerateRules}
                disabled={isGenerating || !description.trim()}
                className="flex items-center gap-[8px] h-[36px] px-[16px] bg-gradient-to-r from-[#005be2] to-[#0047b3] text-white rounded-[8px] text-[13px] hover:from-[#004fc4] hover:to-[#003d99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="size-[16px] animate-spin" />
                    <span>Analyzing your description...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-[16px]" />
                    <span>Generate rules</span>
                  </>
                )}
              </button>

              {/* Generated Rules Mini-Block */}
              {showRulesBlock && rules.length > 0 && (
                <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden bg-white">
                  {/* Summary Header - Always Visible */}
                  <button
                    onClick={() => setIsRulesExpanded(!isRulesExpanded)}
                    className="w-full flex items-center justify-between p-[16px] hover:bg-[#f9fafb] transition-colors"
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="text-left">
                        <div className="flex items-center gap-[8px]">
                          <p className="text-[13px] text-[#1c2024]">AI-Generated Rules</p>
                          <span className="px-[8px] py-[2px] rounded-[6px] bg-[#f0f7ff] border border-[#005be2] text-[11px] text-[#005be2]">
                            {enabledRulesCount} active
                          </span>
                        </div>
                        <p className="text-[11px] text-[#60646c] mt-[2px]">
                          {matchedDocCount} documents matched
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`size-[20px] text-[#60646c] transition-transform ${isRulesExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expandable Rules List */}
                  {isRulesExpanded && (
                    <div className="border-t border-[#e8e8ec] p-[16px] bg-[#f9fafb] space-y-[12px]">
                      <div className="flex items-center justify-between mb-[8px]">
                        <p className="text-[11px] text-[#60646c] uppercase tracking-wider">Conditional Rules</p>
                        <button 
                          onClick={addNewRule}
                          className="flex items-center gap-[4px] text-[11px] text-[#005be2] hover:underline"
                        >
                          <Plus className="size-[12px]" />
                          <span>Add rule</span>
                        </button>
                      </div>

                      <div className="space-y-[8px]">
                        {rules.map((rule) => (
                          <div
                            key={rule.id}
                            className={`flex items-center gap-[12px] transition-all ${
                              rule.enabled
                                ? 'opacity-100'
                                : 'opacity-60'
                            }`}
                          >
                            {/* Type Dropdown */}
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

                            {/* Operator Dropdown */}
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
                            {rule.type === 'vendor' || rule.type === 'client' ? (
                              <select
                                value={rule.value}
                                onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                                className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                              >
                                <option value="">Select {rule.type === 'vendor' ? 'organization' : 'client'}...</option>
                                {organizationOptions.map(org => (
                                  <option key={org} value={org}>{org}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={rule.value}
                                onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                                placeholder="Value"
                                className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                              />
                            )}

                            {/* Delete Button */}
                            <button
                              onClick={() => deleteRule(rule.id)}
                              className="size-[40px] flex items-center justify-center rounded-[8px] border border-[#e0e1e6] hover:bg-[#fee7e9] transition-colors flex-shrink-0"
                            >
                              <Trash2 className="size-[16px] text-[#60646c]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
            Apply Rules
          </button>
        </div>
      </div>
    </div>
  );
}

