import React, { useState } from 'react';
import { DocumentCard } from './DocumentCard';
import { FileText } from 'lucide-react';
import { FilterBar } from './FilterBar';
import { BulkActionsBar } from './BulkActionsBar';

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
  collectionIds?: string[];
}

interface Collection {
  id: string;
  title: string;
  icon?: string;
}

interface PinnedViewProps {
  documents?: Document[];
  pinnedDocumentIds?: Set<string>;
  onPinToggle?: (docId: string) => void;
  collections?: Collection[];
}

export function PinnedView({ documents = [], pinnedDocumentIds, onPinToggle, collections = [] }: PinnedViewProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
    }
  };

  // Filter documents to show only pinned ones
  const pinnedDocuments = documents.filter(doc => pinnedDocumentIds?.has(doc.id));

  // Filter documents based on search query
  const filteredDocuments = pinnedDocuments.filter(doc => {
    if (filterQuery.trim() === '') return true;
    const query = filterQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query) ||
           (doc.description?.toLowerCase().includes(query)) ||
           doc.type.toLowerCase().includes(query) ||
           (doc.attachedTo?.some(item => item.toLowerCase().includes(query))) ||
           (doc.sharedWith?.some(item => item.toLowerCase().includes(query))) ||
           (doc.uploadedBy?.toLowerCase().includes(query)) ||
           (doc.organization?.toLowerCase().includes(query)) ||
           (doc.signatureStatus?.toLowerCase().includes(query));
  });

  const handlePinToggle = () => {
    if (onPinToggle) {
      // Toggle pin status for all selected documents
      selectedDocuments.forEach(docId => {
        onPinToggle(docId);
      });
      // Clear selection after pinning/unpinning
      setSelectedDocuments([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
      {/* Documents Table with Scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 flex flex-col relative">
        {/* Filter Bar */}
        <FilterBar
          filterQuery={filterQuery}
          onFilterChange={setFilterQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Bulk Actions Bar */}
        {selectedDocuments.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedDocuments.length}
            onClearSelection={() => setSelectedDocuments([])}
            onPinToggle={handlePinToggle}
            isUnpinMode
            hasQuickFilters={false}
            onMove={() => {}}
            onRename={() => {}}
            onDownload={() => {}}
          />
        )}

        {/* Documents Content */}
        <div className="pb-[16px] pt-[16px] min-w-0 flex flex-col">
          {filteredDocuments.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[28px] grid place-items-center mb-[16px]">
                <FileText className="size-[16px]" />
              </div>
              <div className="text-[#60646c]">
                <h2 className="text-[16px] font-medium mb-[4px]">No pinned documents</h2>
                <p className="text-[13px] leading-[20px]">Pin documents to keep them easily accessible</p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] p-[24px]">
              {filteredDocuments.map((doc) => {
                // Знайти колекції, до яких належить документ
                const docCollections = collections.filter(col => 
                  doc.collectionIds?.includes(col.id)
                );
                
                return (
                  <DocumentCard
                    {...{ key: doc.id }}
                    document={doc}
                    isSelected={selectedDocuments.includes(doc.id)}
                    onSelect={handleSelectDocument}
                    isPinned={true}
                    collections={docCollections}
                  />
                );
              })}
            </div>
          ) : (
            <div className="px-[24px]">
              <div className="text-[13px] text-[#60646c] mb-[8px]">
                Table view is not implemented yet for pinned documents
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

