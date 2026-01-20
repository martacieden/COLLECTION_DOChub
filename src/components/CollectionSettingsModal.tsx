import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateCollectionRules, type CollectionRule } from '../services/aiRulesGenerator';

interface CollectionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    rules?: CollectionRule[] | string[];
  };
  onRename: (collectionId: string, newName: string) => void;
  onDelete: (collectionId: string) => void;
  onIconChange?: (collectionId: string, newIcon: string) => void;
  onUpdateDescription?: (collectionId: string, description: string) => void;
  onUpdateRules?: (collectionId: string, rules: CollectionRule[]) => void;
  documents?: any[];
  getRuleDescription?: (rule: CollectionRule) => string;
}

// Function to check if a document matches the rules
function matchDocumentToRules(document: any, rules: CollectionRule[]): boolean {
  if (!rules || rules.length === 0) return false;
  
  const enabledRules = rules.filter(r => r.enabled && r.value?.trim());
  if (enabledRules.length === 0) return false;
  
  return enabledRules.every(rule => {
    const ruleValue = rule.value.toLowerCase();
    
    switch (rule.type) {
      case 'document_type':
        const docType = (document.type || '').toLowerCase();
        const docName = (document.name || '').toLowerCase();
        const docCategory = (document.category || '').toLowerCase();
        if (rule.operator === 'contains') {
          return docType.includes(ruleValue) || docName.includes(ruleValue) || docCategory.includes(ruleValue);
        }
        return docType === ruleValue || docName === ruleValue || docCategory === ruleValue;
        
      case 'tags':
        const docTags = (document.tags || []).map((t: string) => t.toLowerCase());
        if (rule.operator === 'contains') {
          return docTags.some((tag: string) => tag.includes(ruleValue));
        }
        return docTags.includes(ruleValue);
        
      case 'client':
        const docOrg = (document.organization || '').toLowerCase();
        if (rule.operator === 'contains') {
          return docOrg.includes(ruleValue);
        }
        return docOrg === ruleValue;
        
      case 'keywords':
        const searchableText = [
          document.name || '',
          document.description || '',
          document.category || ''
        ].join(' ').toLowerCase();
        if (rule.operator === 'contains') {
          return searchableText.includes(ruleValue);
        }
        return searchableText === ruleValue;
        
      case 'vendor':
        const docVendor = (document.vendor || '').toLowerCase();
        const uploadedBy = (document.uploadedBy || '').toLowerCase();
        if (rule.operator === 'contains') {
          return docVendor.includes(ruleValue) || uploadedBy.includes(ruleValue);
        }
        return docVendor === ruleValue || uploadedBy === ruleValue;
        
      default:
        return false;
    }
  });
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

export function CollectionSettingsModal({
  isOpen,
  onClose,
  collection,
  onRename,
  onDelete,
  onIconChange,
  onUpdateDescription,
  onUpdateRules,
  documents = [],
  getRuleDescription
}: CollectionSettingsModalProps) {
  const [collectionName, setCollectionName] = useState(collection.title);
  const [description, setDescription] = useState(collection.description || '');
  const [collectionIcon, setCollectionIcon] = useState(collection.icon || '📁');
  const [nameError, setNameError] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  
  // Rules state
  const [rules, setRules] = useState<CollectionRule[]>(() => {
    if (collection.rules && Array.isArray(collection.rules)) {
      return collection.rules.filter((r): r is CollectionRule => typeof r === 'object');
    }
    return [];
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [matchedDocCount, setMatchedDocCount] = useState(0);
  const [aiReasoning, setAiReasoning] = useState<string | undefined>();

  // Extract emoji from icon string
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  const getEmojiFromIcon = (icon?: string): string => {
    if (!icon) return '📁';
    const match = icon.trim().match(emojiRegex);
    return match ? match[0] : '📁';
  };

  useEffect(() => {
    if (isOpen) {
      setCollectionName(collection.title);
      setDescription(collection.description || '');
      setCollectionIcon(getEmojiFromIcon(collection.icon));
      setNameError('');
      setIsEmojiPickerOpen(false);
      
      // Initialize rules
      if (collection.rules && Array.isArray(collection.rules)) {
        const validRules = collection.rules.filter((r): r is CollectionRule => typeof r === 'object');
        setRules(validRules);
      } else {
        setRules([]);
      }
    }
  }, [isOpen, collection.title, collection.description, collection.icon, collection.rules]);

  // Recalculate matched documents when rules change
  useEffect(() => {
    if (rules.length > 0 && documents.length > 0) {
      const enabledRules = rules.filter(r => r.enabled && r.value?.trim());
      if (enabledRules.length > 0) {
        const count = documents.filter(doc => matchDocumentToRules(doc, enabledRules)).length;
        setMatchedDocCount(count);
      } else {
        setMatchedDocCount(0);
      }
    } else {
      setMatchedDocCount(0);
    }
  }, [rules, documents]);

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
      const enabledRules = result.rules.filter(r => r.enabled && r.value?.trim());
      if (enabledRules.length > 0) {
        const count = documents.filter(doc => matchDocumentToRules(doc, enabledRules)).length;
        setMatchedDocCount(count);
      }

      toast.success(`AI generated ${result.rules.length} rules`);
    } catch (error) {
      console.error('[CollectionSettingsModal] AI generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to generate rules: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const removeRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const updateRuleValue = (ruleId: string, newValue: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, value: newValue } : rule
      )
    );
  };

  const updateRuleType = (ruleId: string, newType: CollectionRule['type']) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, type: newType } : rule
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

  const addNewRule = () => {
    const newRule: CollectionRule = {
      id: `rule-${Date.now()}`,
      type: 'keywords',
      label: 'Contains keywords',
      value: '',
      operator: 'contains',
      enabled: true,
    };
    setRules(prev => [...prev, newRule]);
  };

  const handleSave = () => {
    // Валідація назви
    if (!collectionName.trim()) {
      setNameError('Collection name is required');
      return;
    }

    let hasChanges = false;

    // Перевіряємо, чи змінилася назва
    if (collectionName.trim() !== collection.title) {
      onRename(collection.id, collectionName.trim());
      hasChanges = true;
    }

    // Перевіряємо, чи змінився опис
    if (onUpdateDescription && description.trim() !== (collection.description || '')) {
      onUpdateDescription(collection.id, description.trim());
      hasChanges = true;
    }

    // Перевіряємо, чи змінилися правила
    if (onUpdateRules) {
      const currentRules = collection.rules && Array.isArray(collection.rules) 
        ? collection.rules.filter((r): r is CollectionRule => typeof r === 'object')
        : [];
      
      // Порівнюємо правила (спрощена перевірка)
      const rulesChanged = JSON.stringify(rules) !== JSON.stringify(currentRules);
      if (rulesChanged) {
        onUpdateRules(collection.id, rules);
        hasChanges = true;
      }
    }

    // Перевіряємо, чи змінилася іконка
    if (onIconChange && collectionIcon !== getEmojiFromIcon(collection.icon)) {
      onIconChange(collection.id, collectionIcon);
      hasChanges = true;
    }

    if (hasChanges) {
      toast.success('Collection updated successfully');
    }
    
    onClose();
  };

  const handleEmojiSelect = (emoji: string) => {
    setCollectionIcon(emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleDelete = () => {
    onDelete(collection.id);
    onClose();
  };

  const enabledRulesCount = rules.filter(r => r.enabled).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Collection Settings</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[24px] space-y-[24px]">
          {/* Title Field */}
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

          {/* Description Field */}
          <div className="space-y-[8px]">
            <label className="block text-[13px] text-[#1c2024] mb-[8px]">
              Description
            </label>
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
                Rules determine which documents are automatically included in this collection. <span className="font-semibold">All documents that meet these criteria will be automatically added to the collection.</span> Leave empty to create a manual collection.
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
                      • {matchedDocCount} {matchedDocCount === 1 ? 'document' : 'documents'} will be matched
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-[8px]">
                  <button
                    onClick={handleGenerateRules}
                    disabled={isGenerating || !collectionName.trim()}
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
                    {rules.map((rule) => {
                      return (
                        <div
                          key={rule.id}
                          className={`flex items-center gap-[8px] pt-0 pb-0 mb-[8px] transition-all ${
                            rule.enabled
                              ? 'opacity-100'
                              : 'opacity-60'
                          }`}
                        >
                          {/* Select filter dropdown */}
                          <select
                            value={rule.type}
                            onChange={(e) => updateRuleType(rule.id, e.target.value as CollectionRule['type'])}
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1 min-w-[140px]"
                          >
                            <option value="document_type">Document category</option>
                            <option value="tags">Tags</option>
                            <option value="client">Client</option>
                            <option value="keywords">Keywords</option>
                            <option value="date_range">Date range</option>
                            <option value="vendor">Vendor</option>
                            <option value="file_type">File format</option>
                            <option value="organization">Organization</option>
                          </select>

                          {/* Operator dropdown */}
                          <select
                            value={rule.operator}
                            onChange={(e) => updateRuleOperator(rule.id, e.target.value as CollectionRule['operator'])}
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1 min-w-[120px]"
                          >
                            <option value="is">is</option>
                            <option value="contains">contains</option>
                            <option value="equals">equals</option>
                            <option value="not">is not</option>
                          </select>

                          {/* Value input */}
                          <input
                            type="text"
                            value={rule.value}
                            onChange={(e) => updateRuleValue(rule.id, e.target.value)}
                            placeholder="Value"
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1"
                          />

                          {/* Delete button */}
                          <button
                            onClick={() => removeRule(rule.id)}
                            className="size-[40px] flex items-center justify-center rounded-[8px] border border-[#e0e1e6] hover:bg-[#fee7e9] transition-colors flex-shrink-0"
                          >
                            <Trash2 className="size-[16px] text-[#60646c]" />
                          </button>
                        </div>
                      );
                    })}
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

          {/* Delete Section */}
          <div className="pt-[24px] border-t border-[#e8e8ec]">
            <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[12px]">
              Delete collection?
            </h3>
            <div className="mb-[16px]">
              <p className="text-[11px] text-[#60646c]">
                Once you delete a collection, there is no going back. Please be certain.
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors flex items-center gap-[8px]"
            >
              <Trash2 className="size-[16px]" />
              <span>Delete Collection</span>
            </button>
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
