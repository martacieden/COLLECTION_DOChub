import React from 'react';
import { Pin, PinOff, Plus, Trash2, Share2, Download } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onPinToggle?: () => void;
  isUnpinMode?: boolean; // Якщо true, показує "Unpin" замість "Pin"
  hasQuickFilters?: boolean; // Якщо true, збільшує top offset для QuickFilters
  showRemoveFromCollection?: boolean; // Показувати кнопку "Remove from collection"
  onRemoveFromCollection?: () => void;
  onAddToCollection?: () => void; // Додати документи до колекції
  onCreateCollection?: () => void; // Створити колекцію з вибраних документів
  onDelete?: () => void; // Видалити документи
  onExport?: () => void; // Експортувати документи
  onShare?: () => void; // Поділитися документами
  onMove?: () => void;
  onRename?: () => void;
  onDownload?: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onPinToggle,
  isUnpinMode = false,
  hasQuickFilters = false,
  showRemoveFromCollection = false,
  onRemoveFromCollection,
  onAddToCollection,
  onCreateCollection,
  onDelete,
  onExport,
  onShare,
  onMove,
  onRename,
  onDownload
}: BulkActionsBarProps) {
  // Розрахувати top offset: FilterBar (56px) + QuickFilters (56px якщо є)
  const topOffset = hasQuickFilters ? 112 : 56;

  return (
    <div className={`sticky z-[15] px-[24px] pt-[8px] pb-[8px] bg-white`} style={{ top: `${topOffset}px` }}>
      <div className="bg-[#f0f0f3] border border-[#e0e1e6] rounded-[8px] px-[24px] py-[12px] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-[12px]">
          <span className="text-[13px] text-[#1c2024]">{selectedCount} selected</span>
          <button 
            onClick={onClearSelection}
            className="text-[13px] text-[#60646c] hover:text-[#1c2024]"
          >
            Clear selection
          </button>
        </div>
        <div className="flex items-center gap-[8px]">
          {/* 1. Pin — перша */}
          {onPinToggle && (
            <button
              onClick={onPinToggle}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              {isUnpinMode ? (
                <>
                  <PinOff className="size-[14px]" />
                  <span>Unpin</span>
                </>
              ) : (
                <>
                  <Pin className="size-[14px]" />
                  <span>Pin</span>
                </>
              )}
            </button>
          )}
          {/* 2. Download (раніше Export) — друга */}
          {onDownload && (
            <button 
              onClick={onDownload}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              <Download className="size-[14px]" />
              <span>Download</span>
            </button>
          )}
          {onExport && (
            <button 
              onClick={onExport}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              <Download className="size-[14px]" />
              <span>Download</span>
            </button>
          )}
          {/* 3. Share — третя */}
          {onShare && (
            <button 
              onClick={onShare}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              <Share2 className="size-[14px]" />
              <span>Share</span>
            </button>
          )}
          {/* 4. Delete — четверта */}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              <Trash2 className="size-[14px]" />
              <span>Delete</span>
            </button>
          )}
          {/* 5. Add to Collection — п'ята */}
          {onAddToCollection && (
            <button 
              onClick={onAddToCollection}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]"
            >
              <Plus className="size-[14px]" />
              <span>Add to Collection</span>
            </button>
          )}
          {/* 6. Create Collection — шоста */}
          {onCreateCollection && (
            <button 
              onClick={onCreateCollection}
              className="h-[32px] px-[12px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3] flex items-center gap-[6px]"
            >
              <Plus className="size-[14px]" />
              <span>Create Collection</span>
            </button>
          )}
          {/* Інші кнопки */}
          {showRemoveFromCollection && (
            <button 
              onClick={onRemoveFromCollection}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]"
            >
              Remove from collection
            </button>
          )}
          {onMove && (
            <button 
              onClick={onMove}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]"
            >
              Move
            </button>
          )}
          {onRename && (
            <button 
              onClick={onRename}
              disabled={selectedCount > 1}
              className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Rename
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
