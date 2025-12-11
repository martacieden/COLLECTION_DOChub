import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CollectionRule {
  id: string;
  type: 'document_type' | 'tags' | 'client' | 'keywords' | 'date_range' | 'vendor';
  label: string;
  value: string;
  operator: 'is' | 'contains' | 'equals' | 'not';
  enabled: boolean;
}

interface RulesEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rules: CollectionRule[]) => void;
  initialRules: CollectionRule[];
  matchedDocumentsCount?: number;
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
  matchedDocumentsCount = 0
}: RulesEditorModalProps) {
  const [rules, setRules] = useState<CollectionRule[]>([]);

  useEffect(() => {
    if (isOpen) {
      setRules(initialRules.length > 0 ? [...initialRules] : []);
    }
  }, [isOpen, initialRules]);

  if (!isOpen) return null;

  const enabledRulesCount = rules.filter(r => r.enabled).length;

  const updateRuleType = (ruleId: string, newType: CollectionRule['type']) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId 
          ? { 
              ...rule, 
              type: newType,
              label: ruleTypeOptions.find(opt => opt.value === newType)?.label || rule.label
            } 
          : rule
      )
    );
  };

  const updateRuleOperator = (ruleId: string, newOperator: CollectionRule['operator']) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, operator: newOperator } : rule
      )
    );
  };

  const updateRuleValue = (ruleId: string, newValue: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, value: newValue } : rule
      )
    );
  };

  const toggleRuleEnabled = (ruleId: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const deleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
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
    setRules(prev => [...prev, newRule]);
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

    onSave(rules);
    toast.success(`Rules saved successfully`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[700px] max-h-[80vh]">
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
          <div className="space-y-[16px]">
            {/* Conditional Rules Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] text-[#8b8d98] uppercase tracking-wider font-medium">
                CONDITIONAL RULES
              </h3>
              <button
                onClick={addNewRule}
                className="text-[13px] text-[#005be2] hover:underline flex items-center gap-[4px]"
              >
                <Plus className="size-[14px]" />
                <span>Add rule</span>
              </button>
            </div>

            {/* Rules List */}
            <div className="space-y-[8px]">
              {rules.length === 0 ? (
                <div className="text-center py-[24px] text-[#60646c] text-[13px]">
                  No rules defined. Click "Add rule" to create one.
                </div>
              ) : (
                rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-[#f9fafb] border border-[#e8e8ec] rounded-[8px] p-[12px] flex items-center gap-[8px]"
                  >
                    {/* Type Dropdown */}
                    <select
                      value={rule.type}
                      onChange={(e) => updateRuleType(rule.id, e.target.value as CollectionRule['type'])}
                      className="h-[32px] px-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-shrink-0"
                      style={{ minWidth: '140px' }}
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
                      className="h-[32px] px-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-shrink-0"
                      style={{ minWidth: '100px' }}
                    >
                      {operatorOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Value Input */}
                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                      placeholder="Enter value..."
                      className="flex-1 h-[32px] px-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2]"
                    />

                    {/* Enabled Toggle */}
                    <label className="flex items-center gap-[6px] cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={() => toggleRuleEnabled(rule.id)}
                        className="size-[16px] rounded border-[#e0e1e6] text-[#005be2] focus:ring-[#005be2] cursor-pointer"
                      />
                      <span className="text-[12px] text-[#60646c]">Enabled</span>
                    </label>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#fee7e9] transition-colors flex-shrink-0"
                    >
                      <Trash2 className="size-[16px] text-[#d4183d]" />
                    </button>
                  </div>
                ))
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

