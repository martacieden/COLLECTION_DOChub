import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Loader2, ChevronDown, Plus, Trash2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { generateCollectionRules, enhanceCollectionText, generateCollectionFromDocuments, type CollectionRule } from '../services/aiRulesGenerator';

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
  // Новий флоу стани
  const [inputText, setInputText] = useState(''); // Початковий великий інпут
  const [collectionName, setCollectionName] = useState(''); // Title (після enhancement або без нього)
  const [description, setDescription] = useState(''); // Description (після enhancement)
  const [isEnhanced, setIsEnhanced] = useState(false); // Чи пройшло enhancement
  const [isEnhancing, setIsEnhancing] = useState(false); // Чи зараз обробляється enhancement
  
  // Існуючі стани
  const [generatedRules, setGeneratedRules] = useState<CollectionRule[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRulesBlock, setShowRulesBlock] = useState(false);
  const [isRulesExpanded, setIsRulesExpanded] = useState(true); // За замовчуванням розгорнуто
  const [matchedDocCount, setMatchedDocCount] = useState(0);
  const [nameError, setNameError] = useState('');
  const [aiReasoning, setAiReasoning] = useState<string | undefined>();
  const [isAutoGenerated, setIsAutoGenerated] = useState(false); // Чи було автоматично згенеровано
  const hasAutoGeneratedRef = useRef(false); // Ref для відстеження автоматичної генерації

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

  // Enhancement: розділення тексту на Title і Description через AI
  // Якщо є selectedDocuments, використовуємо їх для генерації
  const handleEnhanceText = async () => {
    setIsEnhancing(true);
    setIsGenerating(true);
    setNameError('');

    try {
      // Якщо є вибрані документи, використовуємо їх для генерації
      if (selectedDocuments.length > 0) {
        console.log('[NewCollectionModal] Re-enhancing from selected documents:', selectedDocuments.length);
        
        const result = await generateCollectionFromDocuments({
          documents: selectedDocuments
        });

        console.log('[NewCollectionModal] Re-enhancement successful');
        console.log('[NewCollectionModal] Title:', result.title);
        console.log('[NewCollectionModal] Description:', result.description);
        console.log('[NewCollectionModal] Rules:', result.rules.length);

        setCollectionName(result.title);
        setDescription(result.description);
        setGeneratedRules(result.rules);
        setIsEnhanced(true);
        setIsAutoGenerated(true);
        setAiReasoning(result.reasoning);
        setShowRulesBlock(true);
        setIsRulesExpanded(true);

        // Calculate matched document count
        const realMatchedCount = allDocuments.filter(doc => 
          matchDocumentToRules(doc, result.rules)
        ).length;
        setMatchedDocCount(realMatchedCount);

        toast.success('Collection re-enhanced successfully');
      } else {
        // Для Re-enhance використовуємо поточні значення title + description
        // Для першого enhancement використовуємо inputText
        let textToEnhance = '';
        
        if (isEnhanced) {
          // Re-enhance: використовуємо поточні значення
          textToEnhance = [collectionName.trim(), description.trim()].filter(Boolean).join(' ').trim();
        } else {
          // Перший enhancement: використовуємо inputText
          textToEnhance = inputText.trim();
        }
        
        if (!textToEnhance) {
          toast.error('Please enter some text first');
          return;
        }

        console.log('[NewCollectionModal] Starting text enhancement');
        console.log('[NewCollectionModal] Text to enhance:', textToEnhance);
        const result = await enhanceCollectionText(textToEnhance);

        console.log('[NewCollectionModal] Enhancement successful');
        console.log('[NewCollectionModal] Title:', result.title);
        console.log('[NewCollectionModal] Description:', result.description);

        setCollectionName(result.title);
        setDescription(result.description);
        setIsEnhanced(true);
        
        // Оновлюємо inputText для збереження контексту (якщо це перший enhancement)
        if (!inputText.trim()) {
          setInputText(textToEnhance);
        }

        toast.success('Text enhanced successfully');
      }
    } catch (error) {
      console.error('[NewCollectionModal] Enhancement error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to enhance: ${errorMessage}`);
    } finally {
      setIsEnhancing(false);
      setIsGenerating(false);
    }
  };

  // Генерація rules на основі name + description (або inputText якщо не enhanced)
  const handleGenerateRulesFromName = async () => {
    // Якщо enhanced - використовуємо collectionName + description
    // Якщо не enhanced - використовуємо inputText
    let fullDescription = '';
    
    if (isEnhanced) {
      fullDescription = description.trim() 
        ? `${collectionName.trim()} ${description.trim()}`.trim()
        : collectionName.trim();
    } else {
      fullDescription = inputText.trim();
    }

    if (!fullDescription) {
      return;
    }

    setIsGenerating(true);
    setAiReasoning(undefined);

    console.log('[NewCollectionModal] Starting AI rule generation');
    console.log('[NewCollectionModal] Collection name:', collectionName);
    console.log('[NewCollectionModal] Description:', description);

    try {
      const context = getDocumentContext();
      console.log('[NewCollectionModal] Document context:', context);

      const result = await generateCollectionRules({
        description: fullDescription,
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

  // Автоматична генерація на основі вибраних документів при відкритті модального вікна
  useEffect(() => {
    if (isOpen && selectedDocuments.length > 0 && !hasAutoGeneratedRef.current) {
      const autoGenerateFromDocuments = async () => {
        setIsEnhancing(true);
        setIsGenerating(true);
        setIsAutoGenerated(true);
        hasAutoGeneratedRef.current = true;

        try {
          console.log('[NewCollectionModal] Auto-generating from selected documents:', selectedDocuments.length);
          
          const result = await generateCollectionFromDocuments({
            documents: selectedDocuments
          });

          console.log('[NewCollectionModal] Auto-generation successful');
          console.log('[NewCollectionModal] Title:', result.title);
          console.log('[NewCollectionModal] Description:', result.description);
          console.log('[NewCollectionModal] Rules:', result.rules.length);

          setCollectionName(result.title);
          setDescription(result.description);
          setGeneratedRules(result.rules);
          setIsEnhanced(true);
          setAiReasoning(result.reasoning);
          setShowRulesBlock(true);
          setIsRulesExpanded(true);

          // Calculate matched document count
          const realMatchedCount = allDocuments.filter(doc => 
            matchDocumentToRules(doc, result.rules)
          ).length;
          setMatchedDocCount(realMatchedCount);

          toast.success(`AI analyzed ${selectedDocuments.length} documents and generated collection suggestions`);
        } catch (error) {
          console.error('[NewCollectionModal] Auto-generation error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          toast.error(`Failed to auto-generate: ${errorMessage}`);
          setIsAutoGenerated(false);
        } finally {
          setIsEnhancing(false);
          setIsGenerating(false);
        }
      };

      autoGenerateFromDocuments();
    }

    // Reset ref when modal closes
    if (!isOpen) {
      hasAutoGeneratedRef.current = false;
      setIsAutoGenerated(false);
    }
  }, [isOpen, selectedDocuments, allDocuments]);

  // Автоматична генерація правил після enhancement (якщо не було автоматичної генерації)
  useEffect(() => {
    if (isEnhanced && collectionName.trim() && generatedRules.length === 0 && !isGenerating && !isEnhancing && !isAutoGenerated) {
      // Автоматично генеруємо rules після enhancement
      handleGenerateRulesFromName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnhanced, collectionName, description, isAutoGenerated]);

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
    let finalName = '';
    let finalDescription = '';

    if (isEnhanced) {
      // Якщо пройшло enhancement - використовуємо title і description
      finalName = collectionName.trim();
      finalDescription = description.trim();
    } else {
      // Якщо НЕ пройшло enhancement - весь текст стає title, description пустий
      finalName = inputText.trim();
      finalDescription = '';
    }

    // Validate name
    if (!finalName) {
      setNameError('Collection name is required');
      return;
    }

    onCreateCollection(finalName, finalDescription, generatedRules);
    handleClose();
  };

  const handleClose = () => {
    // Reset всіх станів
    setInputText('');
    setCollectionName('');
    setDescription('');
    setIsEnhanced(false);
    setIsEnhancing(false);
    setIsAutoGenerated(false);
    setGeneratedRules([]);
    setIsGenerating(false);
    setShowRulesBlock(false);
    setIsRulesExpanded(true);
    setMatchedDocCount(0);
    setNameError('');
    setAiReasoning(undefined);
    hasAutoGeneratedRef.current = false;
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
          {/* Loading State - Enhancement in progress */}
          {isEnhancing ? (
            <div className="flex flex-col items-center justify-center py-[48px] space-y-[16px]">
              <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e8f0ff] rounded-[12px] p-[32px] w-full">
                <div className="flex flex-col items-center space-y-[12px]">
                  <Loader2 className="size-[32px] text-[#005be2] animate-spin" />
                  <div className="text-center space-y-[4px]">
                    <p className="text-[16px] font-semibold text-[#1c2024]">Enhancing your collection...</p>
                    <p className="text-[13px] text-[#60646c]">AI is generating a clear name and improving your description</p>
                  </div>
                </div>
              </div>
            </div>
          ) : isEnhanced ? (
            /* After Enhancement - Show Title and Description fields */
            <div className="space-y-[24px]">
              {/* Title Field */}
              <div className="space-y-[8px]">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <label className="block text-[13px] text-[#1c2024]">
                    Title <span className="text-[#d4183d]">*</span>
                  </label>
                  {isAutoGenerated && (
                    <span className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f4f3ff] text-[#8b5cf6] rounded-[4px] text-[10px] font-medium">
                      <Sparkles className="size-[10px]" />
                      AI-generated
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={collectionName}
                  onChange={(e) => {
                    setCollectionName(e.target.value);
                    setNameError('');
                    setIsAutoGenerated(false); // Користувач редагує, позначаємо як не AI-генерований
                  }}
                  placeholder="Collection title"
                  className={`w-full h-[40px] px-[12px] border ${nameError ? 'border-[#d4183d]' : 'border-[#e0e1e6]'} rounded-[8px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#005be2]`}
                />
                {nameError && (
                  <p className="text-[11px] text-[#d4183d] mt-[4px]">{nameError}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-[8px]">
                <div className="flex items-center justify-between mb-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <label className="block text-[13px] text-[#1c2024]">
                      Description
                    </label>
                    {isAutoGenerated && (
                      <span className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f4f3ff] text-[#8b5cf6] rounded-[4px] text-[10px] font-medium">
                        <Sparkles className="size-[10px]" />
                        AI-generated
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleEnhanceText}
                    disabled={isEnhancing || isGenerating}
                    className="flex items-center gap-[6px] h-[28px] px-[10px] text-[12px] text-[#005be2] hover:bg-[#f0f7ff] rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="size-[14px]" />
                    <span>Re-enhance</span>
                  </button>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setIsAutoGenerated(false); // Користувач редагує, позначаємо як не AI-генерований
                  }}
                  placeholder="Describe what this collection contains..."
                  className="w-full min-h-[100px] p-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2]"
                />
              </div>
            </div>
          ) : (
            /* Initial State - Large textarea with Enhance button */
            <div className="space-y-[16px]">
              <div className="space-y-[12px]">
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setNameError('');
                  }}
                  placeholder="Describe what collection you want to create..."
                  className="w-full min-h-[120px] p-[16px] border border-[#e0e1e6] rounded-[8px] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2]"
                />
                {nameError && (
                  <p className="text-[11px] text-[#d4183d]">{nameError}</p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleEnhanceText}
                  disabled={!inputText.trim() || isEnhancing}
                  className="flex items-center gap-[8px] h-[40px] px-[12px] bg-gradient-to-r from-[#005be2] to-[#0047b3] text-white rounded-[8px] text-[12px] font-medium hover:from-[#004fc4] hover:to-[#003d99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Sparkles className="size-[16px]" />
                  <span>Enhance with AI</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 - Rules Editor (опціональний крок) - показуємо тільки після натискання "Enhance with AI" */}
          {isEnhanced && (
          <div className="space-y-[12px]">
            <div>
              <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                Filtering Rules (optional)
              </label>
              <p className="text-[11px] text-[#60646c] mb-[8px]">
                Rules determine which documents are automatically included in this collection. <span className="font-semibold">All documents that meet these criteria will be automatically added to the collection.</span> Leave empty to create a manual collection.
              </p>
            </div>

            {/* Rules Editor Block - завжди показуємо */}
            <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden bg-white">
              {/* Header з кнопками */}
              <div className="flex items-center justify-between px-[16px] py-[8px] border-b border-[#e8e8ec] bg-[#f9fafb]">
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
                    disabled={isGenerating || (!collectionName.trim() && !inputText.trim())}
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
                {generatedRules.length > 0 ? (
                  <div className="space-y-0">
                    {generatedRules.map((rule) => {
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
          )}
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
            disabled={!inputText.trim() && !collectionName.trim()}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}
