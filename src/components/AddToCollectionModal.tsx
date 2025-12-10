import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Collection {
  id: string;
  title: string;
  icon?: string;
}

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
  selectedDocumentIds: string[];
  onAddToCollection: (collectionId: string, documentIds: string[]) => void;
}

export function AddToCollectionModal({
  isOpen,
  onClose,
  collections,
  selectedDocumentIds,
  onAddToCollection
}: AddToCollectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (!selectedCollectionId) {
      toast.error('Please select a collection');
      return;
    }

    onAddToCollection(selectedCollectionId, selectedDocumentIds);
    toast.success(`Added ${selectedDocumentIds.length} ${selectedDocumentIds.length === 1 ? 'document' : 'documents'} to collection`);
    onClose();
    setSearchQuery('');
    setSelectedCollectionId(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-[700px] max-w-[90vw] max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Add to Collection</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Search */}
          <div className="px-[24px] pt-[16px] pb-[12px]">
            <div className="relative">
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
                <Search className="size-[16px] text-[#60646c]" />
              </div>
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-[36px] pr-[12px] rounded-[6px] border border-[#e0e1e6] text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
              />
            </div>
          </div>

          {/* Collections List */}
          <div className="flex-1 overflow-y-auto px-[24px] pb-[16px]">
            {filteredCollections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-[40px] text-center">
                <p className="text-[14px] text-[#60646c]">
                  {searchQuery ? 'No collections found' : 'No collections available'}
                </p>
              </div>
            ) : (
              <div className="space-y-[4px]">
                {filteredCollections.map((collection) => (
                  <button
                    key={collection.id}
                    onClick={() => setSelectedCollectionId(collection.id)}
                    className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] text-left transition-colors ${
                      selectedCollectionId === collection.id
                        ? 'bg-[#ebf3ff] border border-[#005be2]'
                        : 'hover:bg-[#f9fafb] border border-transparent'
                    }`}
                  >
                    <div className="bg-[#f0f0f3] size-[32px] rounded-[6px] flex items-center justify-center text-[16px] flex-shrink-0">
                      {collection.icon || '📁'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1c2024] truncate">
                        {collection.title}
                      </p>
                    </div>
                    {selectedCollectionId === collection.id && (
                      <div className="size-[16px] rounded-full bg-[#005be2] flex items-center justify-center flex-shrink-0">
                        <svg className="size-[10px] text-white" fill="none" viewBox="0 0 16 16">
                          <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec]">
            <button
              onClick={onClose}
              className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!selectedCollectionId}
              className="h-[36px] px-[16px] rounded-[6px] text-[13px] bg-[#005be2] text-white hover:bg-[#0047b3] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

