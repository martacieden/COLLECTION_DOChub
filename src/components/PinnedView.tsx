import { useState } from 'react';
import { DocumentCard } from './DocumentCard';
import { FileIcon } from './AllDocumentsTable';
import { FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  description?: string;
  type: string;
  attachedTo?: string[];
  sharedWith?: string[];
  uploadedBy?: string;
  uploadedOn?: string;
  organization?: string;
  signatureStatus?: string;
}

interface PinnedViewProps {
  documents?: Document[];
  pinnedDocumentIds?: Set<string>;
  onPinToggle?: (docId: string) => void;
}

export function PinnedView({ documents = [], pinnedDocumentIds, onPinToggle }: PinnedViewProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  // Filter documents to show only pinned ones
  const pinnedDocuments = documents.filter(doc => pinnedDocumentIds?.has(doc.id));

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-[16px] min-w-0 flex flex-col">
      {pinnedDocuments.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-[24px]">
          <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[28px] grid place-items-center mb-[16px]">
            <FileText className="size-[16px]" />
          </div>
          <div className="text-[#60646c]">
            <h2 className="text-[16px] font-medium mb-[4px]">No pinned documents</h2>
            <p className="text-[13px] leading-[20px]">Pin documents to keep them easily accessible</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-[16px] px-[24px] pt-[24px] pb-[24px]">
          {pinnedDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              isSelected={selectedDocuments.includes(doc.id)}
              onSelect={handleSelectDocument}
              isPinned={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

