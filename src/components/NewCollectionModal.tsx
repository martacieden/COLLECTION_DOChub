import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateCollectionRules, type CollectionRule } from '../services/aiRulesGenerator';

interface Document {
  id: string;
  name: string;
  type?: string;
  category?: string;
  tags?: string[];
  organization?: string;
  uploadedOn?: string;
  description?: string;
  attachedTo?: string[];
}

interface NewCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCollection: (name: string, description: string, rules: CollectionRule[]) => void;
  selectedDocuments?: Document[]; // Documents for creating collection
  allDocuments?: Document[]; // All documents in the system for matching
  onOpenRulesEditor?: (rules: CollectionRule[], collectionName: string, description: string) => void;
}

// Function to check if a document matches the rules
// This mirrors the logic in App.tsx matchDocumentToRules
function matchDocumentToRules(document: Document, rules: CollectionRule[]): boolean {
  if (!rules || rules.length === 0) return false;
  
  const enabledRules = rules.filter(rule => rule.enabled && rule.value?.trim());
  if (enabledRules.length === 0) return false;
  
  // All enabled rules must match (AND logic)
  return enabledRules.every(rule => {
    const ruleValue = rule.value.toLowerCase();
    
    switch (rule.type) {
      case 'document_type': {
        // Matches: name, description, tags, category, attachedTo
        const docName = (document.name || '').toLowerCase();
        const docDesc = (document.description || '').toLowerCase();
        const docTags = (document.tags || []).map(t => t.toLowerCase());
        const docCategory = (document.category || '').toLowerCase();
        const docAttachedTo = (document.attachedTo || []).map(a => a.toLowerCase());
        
        const matchesInName = docName.includes(ruleValue);
        const matchesInDesc = docDesc.includes(ruleValue);
        const matchesInTags = docTags.some(tag => tag.includes(ruleValue));
        const matchesInCategory = docCategory.includes(ruleValue);
        const matchesInAttachedTo = docAttachedTo.some(att => att.includes(ruleValue));
        
        if (rule.operator === 'is' || rule.operator === 'equals' || rule.operator === 'contains') {
          return matchesInName || matchesInDesc || matchesInTags || matchesInCategory || matchesInAttachedTo;
        }
        if (rule.operator === 'not') {
          return !matchesInName && !matchesInDesc && !matchesInTags && !matchesInCategory && !matchesInAttachedTo;
        }
        return false;
      }
        
      case 'tags': {
        // Matches: tags array, also name and description
        const docTags = (document.tags || []).map(t => t.toLowerCase());
        const ruleTags = ruleValue.split(',').map(t => t.trim());
        
        if (rule.operator === 'contains') {
          return ruleTags.some(tag => 
            docTags.some(docTag => docTag.includes(tag)) ||
            (document.name || '').toLowerCase().includes(tag) ||
            (document.description || '').toLowerCase().includes(tag)
          );
        }
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return ruleTags.some(tag => docTags.some(docTag => docTag === tag));
        }
        return false;
      }
        
      case 'keywords': {
        // Matches: name + description
        const searchText = `${document.name || ''} ${document.description || ''}`.toLowerCase();
        if (rule.operator === 'contains') {
          return searchText.includes(ruleValue);
        }
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return searchText === ruleValue || (document.name || '').toLowerCase() === ruleValue;
        }
        if (rule.operator === 'not') {
          return !searchText.includes(ruleValue);
        }
        return false;
      }
        
      case 'client': {
        // Matches: organization, name, description
        const orgMatch = (document.organization || '').toLowerCase().includes(ruleValue);
        const nameMatch = (document.name || '').toLowerCase().includes(ruleValue);
        const descMatch = (document.description || '').toLowerCase().includes(ruleValue);
        
        if (rule.operator === 'is' || rule.operator === 'equals' || rule.operator === 'contains') {
          return orgMatch || nameMatch || descMatch;
        }
        return false;
      }
        
      case 'vendor': {
        // Matches: organization, name, description, uploadedBy
        const docOrg = (document.organization || '').toLowerCase();
        const vendorMatch = docOrg.includes(ruleValue) ||
                          (document.name || '').toLowerCase().includes(ruleValue) ||
                          (document.description || '').toLowerCase().includes(ruleValue);
        
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return docOrg === ruleValue || vendorMatch;
        }
        if (rule.operator === 'contains') {
          return vendorMatch;
        }
        if (rule.operator === 'not') {
          return !vendorMatch && docOrg !== ruleValue;
        }
        return false;
      }
        
      case 'date_range': {
        // Matches: uploadedOn
        const docDate = document.uploadedOn || '';
        if (rule.operator === 'is' || rule.operator === 'equals' || rule.operator === 'contains') {
          return docDate.toLowerCase().includes(ruleValue);
        }
        return false;
      }
        
      default:
        return false;
    }
  });
}

// Re-export CollectionRule type for use in other components
export type { CollectionRule };

export function NewCollectionModal({ isOpen, onClose, onCreateCollection, selectedDocuments = [], allDocuments = [], onOpenRulesEditor }: NewCollectionModalProps) {
  const [collectionName, setCollectionName] = useState('');
  const [generatedRules, setGeneratedRules] = useState<CollectionRule[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRulesBlock, setShowRulesBlock] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(true); // За замовчуванням розгорнуто
  const [matchedDocCount, setMatchedDocCount] = useState(0);
  const [nameError, setNameError] = useState('');
  const [aiReasoning, setAiReasoning] = useState<string | undefined>();

  // Extract context from selected documents to help AI
  const getDocumentContext = () => {
    if (selectedDocuments.length === 0) return {};
    
    const docTypes = [...new Set(selectedDocuments.map(d => d.type).filter(Boolean))] as string[];
    const tags = [...new Set(selectedDocuments.flatMap(d => d.tags || []))];
    const organizations = [...new Set(selectedDocuments.map(d => d.organization).filter(Boolean))] as string[];
    
    return {
      existingDocumentTypes: docTypes.length > 0 ? docTypes : undefined,
      existingTags: tags.length > 0 ? tags : undefined,
      existingClients: organizations.length > 0 ? organizations : undefined,
    };
  };

  // Генерація rules на основі name (використовуємо name як description)
  const handleGenerateRulesFromName = async () => {
    if (!collectionName.trim()) {
      return;
    }

    setIsGenerating(true);
    setAiReasoning(undefined);

    console.log('[NewCollectionModal] Starting AI rule generation from name');
    console.log('[NewCollectionModal] Collection name:', collectionName);

    try {
      const context = getDocumentContext();
      console.log('[NewCollectionModal] Document context:', context);

      // Використовуємо collectionName як description для AI
      const result = await generateCollectionRules({
        description: collectionName.trim(),
        ...context,
      });

      console.log('[NewCollectionModal] AI generation successful');
      console.log('[NewCollectionModal] Generated rules:', result.rules);

      setGeneratedRules(result.rules);
      
      // Calculate REAL matched document count
      const realMatchedCount = allDocuments.filter(doc => 
        matchDocumentToRules(doc, result.rules)
      ).length;
      console.log('[NewCollectionModal] Real matched documents:', realMatchedCount, 'out of', allDocuments.length);
      
      setMatchedDocCount(realMatchedCount);
      setAiReasoning(result.reasoning);
      setShowRulesBlock(true);
      setIsRulesExpanded(true);

      toast.success(`AI generated ${result.rules.length} rules`);
    } catch (error) {
      console.error('[NewCollectionModal] AI generation error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to generate rules: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Генерація rules на вимогу (кнопка)
  const handleGenerateRules = async () => {
    await handleGenerateRulesFromName();
  };

  // Auto-generate name when documents are selected
  useEffect(() => {
    if (isOpen && selectedDocuments.length > 0 && !collectionName) {
      // Generate automatic name based on selected documents
      const docTypes = [...new Set(selectedDocuments.map(d => d.type).filter(Boolean))];
      const categories = [...new Set(selectedDocuments.map(d => d.category).filter(Boolean))];
      
      if (categories.length > 0) {
        setCollectionName(`${categories[0]} Documents`);
      } else if (docTypes.length > 0) {
        setCollectionName(`${docTypes[0]} Files`);
      } else {
        setCollectionName(`Collection from ${selectedDocuments.length} documents`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedDocuments.length]);

  // Автоматично генерувати rules на основі name, якщо є selectedDocuments
  useEffect(() => {
    if (isOpen && collectionName.trim() && selectedDocuments.length > 0 && generatedRules.length === 0 && !isGenerating) {
      // Автоматично генеруємо rules на основі name та selectedDocuments
      handleGenerateRulesFromName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, collectionName, selectedDocuments.length]);

  // Recalculate matched count whenever rules change
  useEffect(() => {
    if (generatedRules.length > 0 && allDocuments.length > 0) {
      const count = allDocuments.filter(doc => matchDocumentToRules(doc, generatedRules)).length;
      setMatchedDocCount(count);
      console.log('[NewCollectionModal] Recalculated matched docs:', count);
    }
  }, [generatedRules, allDocuments]);

  if (!isOpen) return null;

  const toggleRule = (ruleId: string) => {
    setGeneratedRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const removeRule = (ruleId: string) => {
    setGeneratedRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const updateRuleValue = (ruleId: string, newValue: string) => {
    setGeneratedRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, value: newValue } : rule
      )
    );
  };

  const updateRuleType = (ruleId: string, newType: CollectionRule['type']) => {
    setGeneratedRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, type: newType } : rule
      )
    );
  };

  const updateRuleOperator = (ruleId: string, newOperator: CollectionRule['operator']) => {
    setGeneratedRules(prev =>
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
    setGeneratedRules(prev => [...prev, newRule]);
  };

  const handleCreate = () => {
    // Validate name
    if (!collectionName.trim()) {
      setNameError('Collection name is required');
      return;
    }

    // Validate rules - форсимо створення rules
    if (generatedRules.length === 0) {
      toast.error('Please generate rules first. Rules are required for smart collections.');
      return;
    }

    // Використовуємо collectionName як description
    const description = collectionName.trim();
    onCreateCollection(collectionName, description, generatedRules);
    handleClose();
  };

  const handleClose = () => {
    setCollectionName('');
    setGeneratedRules([]);
    setIsGenerating(false);
    setShowRulesBlock(false);
    setIsRulesExpanded(true);
    setMatchedDocCount(0);
    setNameError('');
    setAiReasoning(undefined);
    onClose();
  };

  const enabledRulesCount = generatedRules.filter(r => r.enabled).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">New Collection</h2>
          <button
            onClick={handleClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[24px] space-y-[24px]">
          {/* STEP 1 - Name Your Collection */}
          <div className="space-y-[12px]">
            <div>
              <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                Collection name <span className="text-[#d4183d]">*</span>
              </label>
              <input
                type="text"
                value={collectionName}
                onChange={(e) => {
                  setCollectionName(e.target.value);
                  setNameError('');
                }}
                placeholder="e.g. Tax Documents 2024, Property Agreements, Vendor Invoices"
                className={`w-full h-[40px] px-[12px] border ${nameError ? 'border-[#d4183d]' : 'border-[#e0e1e6]'} rounded-[8px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#005be2]`}
              />
              {nameError && (
                <p className="text-[11px] text-[#d4183d] mt-[4px]">{nameError}</p>
              )}
              <p className="text-[11px] text-[#60646c] mt-[4px]">
                AI will automatically generate filtering rules based on the collection name.
              </p>
            </div>
          </div>

          {/* STEP 2 - Rules Editor (основний крок, завжди видимий) */}
          <div className="space-y-[12px]">
            <div>
              <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                Filtering Rules <span className="text-[#d4183d]">*</span>
              </label>
              <p className="text-[11px] text-[#60646c] mb-[8px]">
                Rules determine which documents are automatically included in this collection.
              </p>
            </div>

            {/* Rules Editor Block - завжди показуємо */}
            <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden bg-white">
              {/* Header з кнопками */}
              <div className="flex items-center justify-between p-[16px] border-b border-[#e8e8ec] bg-[#f9fafb]">
                <div className="flex items-center gap-[8px]">
                  <p className="text-[13px] text-[#1c2024] font-medium">Rules</p>
                  {generatedRules.length > 0 && (
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
              <div className="p-[16px] bg-[#f9fafb] space-y-[12px]">
                {generatedRules.length > 0 ? (
                  <div className="space-y-[8px]">
                    {generatedRules.map((rule) => {
                      return (
                        <div
                          key={rule.id}
                          className={`flex items-center gap-[12px] transition-all ${
                            rule.enabled
                              ? 'opacity-100'
                              : 'opacity-60'
                          }`}
                        >
                          {/* Enable/Disable toggle */}
                          <button
                            onClick={() => toggleRule(rule.id)}
                            className={`size-[20px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                              rule.enabled
                                ? 'bg-[#005be2] border-[#005be2]'
                                : 'bg-white border-[#e0e1e6]'
                            }`}
                          >
                            {rule.enabled && (
                              <svg className="size-[12px] text-white" fill="none" viewBox="0 0 16 16">
                                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>

                          {/* Select filter dropdown */}
                          <select
                            value={rule.type}
                            onChange={(e) => updateRuleType(rule.id, e.target.value as CollectionRule['type'])}
                            className="h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] text-[#1c2024] bg-white focus:outline-none focus:ring-2 focus:ring-[#005be2] flex-1 min-w-[140px]"
                          >
                            <option value="document_type">Document type</option>
                            <option value="tags">Tags</option>
                            <option value="client">Client</option>
                            <option value="keywords">Keywords</option>
                            <option value="date_range">Date range</option>
                            <option value="vendor">Vendor</option>
                            <option value="file_type">File type</option>
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
                  <div className="text-center py-[24px]">
                    <p className="text-[12px] text-[#60646c] mb-[12px]">
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
            onClick={handleClose}
            className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="h-[36px] px-[16px] rounded-[6px] text-[13px] bg-[#005be2] text-white hover:bg-[#004fc4] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!collectionName.trim() || generatedRules.length === 0}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}
