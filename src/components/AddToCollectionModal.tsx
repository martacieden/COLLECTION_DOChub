import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';

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
  onAddToCollection: (collectionIds: string[], documentIds: string[]) => void;
}

export function AddToCollectionModal({
  isOpen,
  onClose,
  collections,
  selectedDocumentIds,
  onAddToCollection
}: AddToCollectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCollection = (collectionId: string) => {
    setSelectedCollectionIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  const handleAdd = () => {
    if (selectedCollectionIds.size === 0) {
      toast.error('Please select at least one collection');
      return;
    }

    const collectionIdsArray = Array.from(selectedCollectionIds);
    onAddToCollection(collectionIdsArray, selectedDocumentIds);
    
    const collectionsCount = collectionIdsArray.length;
    const documentsCount = selectedDocumentIds.length;
    toast.success(
      `Added ${documentsCount} ${documentsCount === 1 ? 'document' : 'documents'} to ${collectionsCount} ${collectionsCount === 1 ? 'collection' : 'collections'}`
    );
    
    onClose();
    setSearchQuery('');
    setSelectedCollectionIds(new Set());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-[640px] max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Add to Collection</h2>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCollectionIds(new Set());
              onClose();
            }}
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
                {filteredCollections.map((collection) => {
                  const isSelected = selectedCollectionIds.has(collection.id);
                  return (
                    <button
                      key={collection.id}
                      onClick={() => handleToggleCollection(collection.id)}
                      className={`w-full flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] text-left transition-colors ${
                        isSelected
                          ? 'bg-[#ebf3ff] border border-[#005be2]'
                          : 'hover:bg-[#f9fafb] border border-transparent'
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleToggleCollection(collection.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      />
                      <div className="bg-[#f0f0f3] size-[32px] rounded-[6px] flex items-center justify-center text-[16px] flex-shrink-0">
                        {collection.icon || '📁'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#1c2024] truncate">
                          {collection.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec]">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCollectionIds(new Set());
                onClose();
              }}
              className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedCollectionIds.size === 0}
              className="h-[36px] px-[16px] rounded-[6px] text-[13px] bg-[#005be2] text-white hover:bg-[#0047b3] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to {selectedCollectionIds.size > 0 ? `${selectedCollectionIds.size} ` : ''}Collection{selectedCollectionIds.size !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

