import { useState, useEffect, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt?: Date;
}

interface AIBannerSuggestion {
  type: 'add-to-collection' | 'create-collection' | 'duplicates' | 'smart-tagging' | 'needs-signature';
  title: string;
  description: string;
  collectionName?: string;
  documentCount?: number;
  documents?: Document[];
}

interface Collection {
  id: string;
  title: string;
}

interface AIAssistantBannerProps {
  uploadedDocuments: Document[];
  collections?: Collection[];
  onAddToCollection?: (collectionName: string, documents: Document[]) => void;
  onCreateCollection?: (collectionName: string, documents: Document[]) => void;
  onViewDetails?: (suggestion: AIBannerSuggestion) => void;
  onDismiss?: () => void;
}

// Функція для аналізу документів та визначення типу пропозиції
function analyzeDocuments(documents: Document[], collections: Collection[] = []): AIBannerSuggestion | null {
  if (documents.length === 0) return null;

  // Групування документів за типами
  const typeGroups: Record<string, Document[]> = {};
  documents.forEach(doc => {
    const type = doc.type.toLowerCase();
    if (!typeGroups[type]) {
      typeGroups[type] = [];
    }
    typeGroups[type].push(doc);
  });

  // Перевірка на Invoice документи (пріоритет)
  const invoiceKeywords = ['invoice', 'інвойс', 'bill', 'рахунок', 'billing', 'invoice #'];
  const invoiceDocs = documents.filter(doc => 
    invoiceKeywords.some(keyword => doc.name.toLowerCase().includes(keyword))
  );
  
  if (invoiceDocs.length >= 1) {
    // Перевіряємо, чи є вже існуюча Invoice collection
    const invoiceCollectionKeywords = ['invoice', 'інвойс', 'financial - invoices', 'invoices'];
    const existingInvoiceCollection = collections.find(col => 
      invoiceCollectionKeywords.some(keyword => col.title.toLowerCase().includes(keyword))
    );
    
    if (existingInvoiceCollection) {
      return {
        type: 'add-to-collection',
        title: 'Add invoices to collection',
        description: `I found ${invoiceDocs.length} invoice ${invoiceDocs.length === 1 ? 'document' : 'documents'}. Would you like to add ${invoiceDocs.length === 1 ? 'it' : 'them'} to your "${existingInvoiceCollection.title}" collection?`,
        collectionName: existingInvoiceCollection.title,
        documentCount: invoiceDocs.length,
        documents: invoiceDocs
      };
    } else {
      return {
        type: 'create-collection',
        title: 'Create invoice collection',
        description: `I found ${invoiceDocs.length} invoice ${invoiceDocs.length === 1 ? 'document' : 'documents'}. Would you like to create an Invoice collection to organize ${invoiceDocs.length === 1 ? 'it' : 'them'}?`,
        collectionName: 'Financial - Invoices',
        documentCount: invoiceDocs.length,
        documents: invoiceDocs
      };
    }
  }

  // Перевірка на страхові документи
  const insuranceKeywords = ['insurance', 'policy', 'coverage', 'claim'];
  const insuranceDocs = documents.filter(doc => 
    insuranceKeywords.some(keyword => doc.name.toLowerCase().includes(keyword))
  );
  
  if (insuranceDocs.length >= 3) {
    return {
      type: 'add-to-collection',
      title: 'Organize your documents into collections',
      description: `I noticed you uploaded ${insuranceDocs.length} insurance documents. Would you like me to add them to your Insurance collection?`,
      collectionName: 'Insurance',
      documentCount: insuranceDocs.length,
      documents: insuranceDocs
    };
  }

  // Перевірка на податкові документи
  const taxKeywords = ['tax', 'irs', 'w-2', '1099', 'return'];
  const taxDocs = documents.filter(doc => 
    taxKeywords.some(keyword => doc.name.toLowerCase().includes(keyword))
  );
  
  if (taxDocs.length >= 3) {
    return {
      type: 'create-collection',
      title: 'Create a new collection',
      description: `These ${taxDocs.length} tax documents don't match any existing collections. Should I create a new 'Tax Documents 2024' collection?`,
      collectionName: 'Tax Documents 2024',
      documentCount: taxDocs.length,
      documents: taxDocs
    };
  }

  // Перевірка на контракти (потребують підпису)
  const contractKeywords = ['contract', 'agreement', 'lease', 'terms'];
  const contractDocs = documents.filter(doc => 
    contractKeywords.some(keyword => doc.name.toLowerCase().includes(keyword))
  );
  
  if (contractDocs.length >= 2) {
    return {
      type: 'needs-signature',
      title: 'Documents need signature',
      description: `${contractDocs.length} of the uploaded contracts are missing signatures. Send them for e-signature?`,
      documentCount: contractDocs.length,
      documents: contractDocs
    };
  }

  // Перевірка на дублікати (спрощена версія - за іменами)
  const nameCounts: Record<string, number> = {};
  documents.forEach(doc => {
    const normalizedName = doc.name.toLowerCase().trim();
    nameCounts[normalizedName] = (nameCounts[normalizedName] || 0) + 1;
  });
  
  const duplicates = Object.entries(nameCounts).filter(([_, count]) => count > 1);
  if (duplicates.length > 0) {
    return {
      type: 'duplicates',
      title: 'Duplicate documents detected',
      description: `I found ${duplicates.length} documents that appear to be duplicates of existing files. Would you like to review them?`,
      documentCount: duplicates.length
    };
  }

  // За замовчуванням - smart tagging з контекстом про колекції
  if (documents.length >= 3) {
    return {
      type: 'smart-tagging',
      title: 'Organize your documents',
      description: `I found ${documents.length} documents that could be organized into a collection. I can automatically tag them and help you create a collection to keep them organized.`,
      documentCount: documents.length,
      documents: documents
    };
  }

  return null;
}

export function AIAssistantBanner({ 
  uploadedDocuments, 
  collections = [],
  onAddToCollection,
  onCreateCollection,
  onViewDetails,
  onDismiss
}: AIAssistantBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [suggestion, setSuggestion] = useState<AIBannerSuggestion | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onDismiss?.();
    }, 300);
  }, [onDismiss]);

  useEffect(() => {
    if (uploadedDocuments.length === 0) {
      setIsVisible(false);
      setSuggestion(null);
      return;
    }

    // Аналізуємо документи
    const analyzedSuggestion = analyzeDocuments(uploadedDocuments, collections);
    
    if (!analyzedSuggestion) {
      setIsVisible(false);
      setSuggestion(null);
      return;
    }

    setSuggestion(analyzedSuggestion);

    // Показуємо через 2 секунди після завантаження (швидше)
    const delay = 2000;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [uploadedDocuments, collections]);

  // Автоматичне закриття через 12 секунд після появи
  useEffect(() => {
    if (!isVisible) return;

    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 12000);

    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, [isVisible, handleClose]);

  const handlePrimaryAction = () => {
    if (!suggestion) return;

    switch (suggestion.type) {
      case 'add-to-collection':
        if (suggestion.collectionName && suggestion.documents) {
          onAddToCollection?.(suggestion.collectionName, suggestion.documents);
        }
        break;
      case 'create-collection':
        if (suggestion.collectionName && suggestion.documents) {
          onCreateCollection?.(suggestion.collectionName, suggestion.documents);
        }
        break;
      case 'needs-signature':
        // Handle signature action
        break;
      case 'smart-tagging':
        // Handle tagging action
        break;
      case 'duplicates':
        // Handle duplicates review
        break;
    }
    handleClose();
  };

  if (!isVisible || !suggestion) return null;

  const getPrimaryButtonText = () => {
    switch (suggestion.type) {
      case 'add-to-collection':
        return 'Add to Collection';
      case 'create-collection':
        return 'Create Collection';
      case 'needs-signature':
        return 'Send for Signature';
      case 'smart-tagging':
        return 'Apply Smart Tags';
      case 'duplicates':
        return 'Review Duplicates';
      default:
        return 'Apply';
    }
  };

  return (
    <div 
      className={`fixed bottom-[88px] right-[24px] w-[320px] bg-white rounded-[8px] shadow-lg border border-[#e8e8ec] z-50 transition-all duration-300 ${
        isClosing ? 'translate-x-[100%] opacity-0' : 'translate-x-0 opacity-100'
      }`}
      style={{
        animation: isVisible && !isClosing ? 'slideInRight 0.3s ease-out' : 'none',
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
        position: 'fixed',
        bottom: '88px', // Над кнопкою Ask Fojo (24px + 48px висота кнопки + 16px відступ)
        right: '24px',
        width: '320px'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-[6px] px-[24px] py-[8px] border-b border-[#e8e8ec]">
        <div className="size-[24px] rounded-[6px] bg-[#f5f3ff] flex items-center justify-center flex-shrink-0">
          <Sparkles className="size-[14px] text-[#7c3aed]" />
        </div>
        <h4 className="text-[12px] font-medium text-[#1c2024] flex-1">AI Assistant Suggestion</h4>
        <button 
          onClick={handleClose}
          className="size-[18px] rounded-[4px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
        >
          <X className="size-[12px] text-[#60646c]" />
        </button>
      </div>

      {/* Content */}
      <div className="px-[24px] py-[8px]">
        <p className="text-[13px] font-medium text-[#1c2024] mb-[3px]">
          {suggestion.title}
        </p>
        <p className="text-[12px] text-[#60646c] leading-[1.4]">
          {suggestion.description}
        </p>
      </div>

      {/* Actions */}
      <div className="px-[24px] pb-[16px]">
        <button 
          onClick={() => onViewDetails?.(suggestion)}
          className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[12px] font-medium text-[#1c2024] hover:bg-[#f9fafb] transition-colors"
        >
          View Details
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

