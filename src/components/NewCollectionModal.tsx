import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Loader2, Tag, FileText, Calendar, User, Building, ChevronRight, Search, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type?: string;
  category?: string;
  tags?: string[];
  organization?: string;
  uploadedOn?: string;
}

interface NewCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCollection: (name: string, description: string, rules: CollectionRule[]) => void;
  selectedDocuments?: Document[]; // Документи для створення колекції
  onOpenRulesEditor?: (rules: CollectionRule[], collectionName: string, description: string) => void; // Callback для відкриття RulesEditorModal
}

interface CollectionRule {
  id: string;
  type: 'document_type' | 'tags' | 'client' | 'keywords' | 'date_range' | 'vendor';
  label: string;
  value: string;
  operator: 'is' | 'contains' | 'equals' | 'not';
  enabled: boolean;
}

const ruleTypeIcons = {
  document_type: FileText,
  tags: Tag,
  client: Building,
  keywords: Search,
  date_range: Calendar,
  vendor: User,
};

const ruleTypeColors = {
  document_type: 'bg-[#EBF3FF] text-[#1150B9]',
  tags: 'bg-[#FEF0E6] text-[#D24726]',
  client: 'bg-[#E6F6EB] text-[#218358]',
  keywords: 'bg-[#FEE7E9] text-[#CE2C31]',
  date_range: 'bg-[#F3E8FF] text-[#7C3AED]',
  vendor: 'bg-[#FEF8E6] text-[#D97706]',
};

export function NewCollectionModal({ isOpen, onClose, onCreateCollection, selectedDocuments = [], onOpenRulesEditor }: NewCollectionModalProps) {
  const [collectionName, setCollectionName] = useState('');
  const [description, setDescription] = useState('');
  const [generatedRules, setGeneratedRules] = useState<CollectionRule[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRulesBlock, setShowRulesBlock] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);
  const [matchedDocCount, setMatchedDocCount] = useState(0);
  const [nameError, setNameError] = useState('');

  // Генеруємо AI suggestions на основі вибраних документів
  const generateSuggestionsFromDocuments = (docs: Document[]): CollectionRule[] => {
    if (docs.length === 0) return [];

    const rules: CollectionRule[] = [];
    
    // Аналізуємо типи документів
    const docTypes = [...new Set(docs.map(d => d.type).filter(Boolean))];
    if (docTypes.length > 0 && docTypes.length <= 3) {
      docTypes.forEach(type => {
        rules.push({
          id: `rule-type-${type}`,
          type: 'document_type',
          label: 'Document Type',
          value: type || '',
          operator: 'is',
          enabled: true
        });
      });
    }

    // Аналізуємо категорії
    const categories = [...new Set(docs.map(d => d.category).filter(Boolean))];
    if (categories.length > 0 && categories.length <= 2) {
      categories.forEach(cat => {
        rules.push({
          id: `rule-category-${cat}`,
          type: 'keywords',
          label: 'Category',
          value: cat || '',
          operator: 'contains',
          enabled: true
        });
      });
    }

    // Аналізуємо теги
    const allTags = docs.flatMap(d => d.tags || []);
    const tagCounts: Record<string, number> = {};
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    const commonTags = Object.entries(tagCounts)
      .filter(([_, count]) => count >= Math.ceil(docs.length / 2))
      .map(([tag]) => tag)
      .slice(0, 3);
    
    if (commonTags.length > 0) {
      rules.push({
        id: 'rule-tags',
        type: 'tags',
        label: 'Tags',
        value: commonTags.join(', '),
        operator: 'contains',
        enabled: true
      });
    }

    // Аналізуємо організації
    const organizations = [...new Set(docs.map(d => d.organization).filter(Boolean))];
    if (organizations.length === 1) {
      rules.push({
        id: 'rule-org',
        type: 'client',
        label: 'Organization',
        value: organizations[0] || '',
        operator: 'is',
        enabled: true
      });
    }

    return rules;
  };

  // При відкритті modal з вибраними документами, автоматично генеруємо suggestions
  useEffect(() => {
    if (isOpen && selectedDocuments.length > 0 && generatedRules.length === 0) {
      const suggestions = generateSuggestionsFromDocuments(selectedDocuments);
      if (suggestions.length > 0) {
        setGeneratedRules(suggestions);
        setShowRulesBlock(true);
        setMatchedDocCount(selectedDocuments.length);
      }
      
      // Генеруємо автоматичну назву та опис
      if (!collectionName) {
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
      
      if (!description) {
        setDescription(`Collection created from ${selectedDocuments.length} selected ${selectedDocuments.length === 1 ? 'document' : 'documents'}.`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedDocuments.length]);

  if (!isOpen) return null;

  const handleGenerateRules = async () => {
    if (!description.trim()) {
      toast.error('Please enter a description first');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if description contains "test" for testing flow
    const descLower = description.toLowerCase();
    
    // Test mode: show real rules for testing
    if (descLower.includes('test')) {
      const testRules: CollectionRule[] = [
        {
          id: 'test-1',
          type: 'document_type',
          label: 'Document type',
          value: 'Invoice',
          operator: 'is',
          enabled: true,
        },
        {
          id: 'test-2',
          type: 'tags',
          label: 'Tags',
          value: 'Property, Real Estate',
          operator: 'contains',
          enabled: true,
        },
        {
          id: 'test-3',
          type: 'client',
          label: 'Client',
          value: 'Smith Family Office',
          operator: 'is',
          enabled: true,
        },
        {
          id: 'test-4',
          type: 'date_range',
          label: 'Date range',
          value: '2024',
          operator: 'is',
          enabled: true,
        },
        {
          id: 'test-5',
          type: 'keywords',
          label: 'Contains keywords',
          value: '"renovation", "permit", "contract"',
          operator: 'contains',
          enabled: true,
        },
        {
          id: 'test-6',
          type: 'vendor',
          label: 'Vendor',
          value: 'ABC Construction',
          operator: 'is',
          enabled: false,
        },
      ];

      setGeneratedRules(testRules);
      setIsGenerating(false);
      setMatchedDocCount(42); // Realistic test count
      setShowRulesBlock(true);
      setIsRulesExpanded(true); // Auto-expand for testing
      toast.success('Test rules loaded successfully');
      return;
    }

    // Generate smart rules based on description
    const rules: CollectionRule[] = [];

    // Document type detection
    if (descLower.includes('invoice')) {
      rules.push({
        id: '1',
        type: 'document_type',
        label: 'Document type',
        value: 'Invoice',
        operator: 'is',
        enabled: true,
      });
    }
    if (descLower.includes('contract') || descLower.includes('agreement')) {
      rules.push({
        id: '2',
        type: 'document_type',
        label: 'Document type',
        value: 'Contract',
        operator: 'is',
        enabled: true,
      });
    }
    if (descLower.includes('tax') || descLower.includes('filing')) {
      rules.push({
        id: '3',
        type: 'document_type',
        label: 'Document type',
        value: 'Tax Document',
        operator: 'is',
        enabled: true,
      });
    }

    // Tags detection
    if (descLower.includes('household') || descLower.includes('vendor')) {
      rules.push({
        id: '4',
        type: 'tags',
        label: 'Tags',
        value: 'Household, Payments',
        operator: 'contains',
        enabled: true,
      });
    }
    if (descLower.includes('property') || descLower.includes('real estate')) {
      rules.push({
        id: '5',
        type: 'tags',
        label: 'Tags',
        value: 'Property, Real Estate',
        operator: 'contains',
        enabled: true,
      });
    }

    // Client detection
    if (descLower.includes('client') || descLower.includes('family')) {
      const clientMatch = description.match(/(?:client|family)\s+(\w+)/i);
      if (clientMatch) {
        rules.push({
          id: '6',
          type: 'client',
          label: 'Client',
          value: clientMatch[1],
          operator: 'is',
          enabled: true,
        });
      }
    }

    // Date range detection
    const yearMatch = description.match(/20\d{2}/);
    if (yearMatch) {
      rules.push({
        id: '7',
        type: 'date_range',
        label: 'Date range',
        value: `${yearMatch[0]}`,
        operator: 'is',
        enabled: true,
      });
    }

    // Keywords detection
    const keywords: string[] = [];
    if (descLower.includes('tax')) keywords.push('tax');
    if (descLower.includes('filing')) keywords.push('filing');
    if (descLower.includes('irs')) keywords.push('IRS');
    if (descLower.includes('permit')) keywords.push('permit');
    if (descLower.includes('renovation')) keywords.push('renovation');
    
    if (keywords.length > 0) {
      rules.push({
        id: '8',
        type: 'keywords',
        label: 'Contains keywords',
        value: keywords.map(k => `"${k}"`).join(', '),
        operator: 'contains',
        enabled: true,
      });
    }

    // Vendor detection
    if (descLower.includes('vendor') && !descLower.includes('all')) {
      const vendorMatch = description.match(/vendor[s]?\s+(\w+)/i);
      if (vendorMatch) {
        rules.push({
          id: '9',
          type: 'vendor',
          label: 'Vendor',
          value: vendorMatch[1],
          operator: 'is',
          enabled: true,
        });
      }
    }

    setGeneratedRules(rules);
    setIsGenerating(false);

    // Simulate matched document count
    const enabledCount = rules.filter(r => r.enabled).length;
    setMatchedDocCount(Math.floor(Math.random() * 50) + enabledCount * 10);
    
    // Show the mini-block with collapsed rules
    setShowRulesBlock(true);
    setIsRulesExpanded(false);

    toast.success('AI rules generated successfully');
  };

  const toggleRule = (ruleId: string) => {
    setGeneratedRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );

    // Recalculate matched docs
    const enabledCount = generatedRules.filter(r => r.enabled && r.id !== ruleId).length + 
                         (generatedRules.find(r => r.id === ruleId)?.enabled ? 0 : 1);
    setMatchedDocCount(Math.floor(Math.random() * 50) + enabledCount * 10);
  };

  const removeRule = (ruleId: string) => {
    setGeneratedRules(prev => prev.filter(rule => rule.id !== ruleId));
    
    // Recalculate matched docs
    const enabledCount = generatedRules.filter(r => r.enabled && r.id !== ruleId).length;
    setMatchedDocCount(Math.floor(Math.random() * 50) + enabledCount * 10);
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

  const handleCreate = () => {
    // Validate name
    if (!collectionName.trim()) {
      setNameError('Collection name is required');
      return;
    }

    onCreateCollection(collectionName, description, generatedRules);
    // Toast показується в handleCreateCollection в App.tsx
    handleClose();
  };

  const handleClose = () => {
    setCollectionName('');
    setDescription('');
    setGeneratedRules([]);
    setIsGenerating(false);
    setShowRulesBlock(false);
    setIsRulesExpanded(false);
    setMatchedDocCount(0);
    setNameError('');
    onClose();
  };

  const enabledRulesCount = generatedRules.filter(r => r.enabled).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[#1c2024]">New Collection</h2>
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
                Name of collection <span className="text-[#d4183d]">*</span>
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
            </div>
          </div>

          {/* STEP 2 - Description & AI Rules */}
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
            {showRulesBlock && generatedRules.length > 0 && (
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
                      <button className="flex items-center gap-[4px] text-[11px] text-[#005be2] hover:underline">
                        <Plus className="size-[12px]" />
                        <span>Add rule</span>
                      </button>
                    </div>

                    <div className="space-y-[8px]">
                      {generatedRules.map((rule) => {
                        const Icon = ruleTypeIcons[rule.type];
                        const colorClass = ruleTypeColors[rule.type];

                        return (
                          <div
                            key={rule.id}
                            className={`flex items-center gap-[12px] transition-all ${
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
                              <option value="document_type">Document type</option>
                              <option value="tags">Tags</option>
                              <option value="client">Client</option>
                              <option value="keywords">Keywords</option>
                              <option value="date_range">Date range</option>
                              <option value="vendor">Vendor</option>
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
                  </div>
                )}
              </div>
            )}
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
            disabled={!collectionName.trim()}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}