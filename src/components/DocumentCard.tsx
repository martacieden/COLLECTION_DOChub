import { FileIcon } from './AllDocumentsTable';
import { useState } from 'react';

interface Collection {
  id: string;
  title: string;
  icon?: string;
}

interface DocumentCardProps {
  document: {
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
  };
  isSelected: boolean;
  onSelect: (docId: string) => void;
  isPinned?: boolean;
  collections?: Collection[];
  onCollectionClick?: (collection: Collection) => void;
}

export function DocumentCard({ document, isSelected, onSelect, isPinned = false, collections = [], onCollectionClick }: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="border border-[#e0e1e6] rounded-[8px] overflow-hidden hover:border-[#005be2] hover:shadow-sm transition-all cursor-pointer bg-white relative"
    >
      {/* Checkbox */}
      <div className="absolute top-[8px] right-[8px] z-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(document.id)}
          className="size-[16px] rounded border-[#e0e1e6] text-[#005be2] focus:ring-[#005be2] cursor-pointer bg-white shadow-sm"
        />
      </div>

      {/* Icon and Type Section */}
      <div className="bg-[#f5f5f7] h-[100px] flex flex-col items-center justify-center gap-[6px]">
        <FileIcon type={document.type} />
        <span className="text-[10px] text-[#8b8d98] uppercase tracking-wider">{document.type}</span>
      </div>
      
      {/* Content Section */}
      <div className="px-[16px] py-[12px]">
        <h3 className="text-[13px] text-[#1c2024] mb-[4px] line-clamp-1 font-medium">
          {document.name}
        </h3>
        <p className="text-[11px] text-[#8b8d98] line-clamp-2 mb-[8px]">
          {document.description || '-'}
        </p>
        
        {/* Collections */}
        {collections.length > 0 && (
          <div 
            className="relative mt-[8px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] bg-[#f0f0f3] border border-[#e0e1e6] text-[10px] text-[#1c2024] cursor-pointer">
              <div className="flex items-center justify-center size-[16px] flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-full" fill="none" viewBox="0 0 16 16">
                  <path d="M3.00586 12.7604C3.03391 12.8969 3.155 12.9995 3.29981 12.9996H12.7002L12.7607 12.9938C12.8777 12.9697 12.9701 12.8774 12.9941 12.7604L13 12.6998V8.29944C12.9999 8.15463 12.8973 8.03354 12.7607 8.00549L12.7002 7.99963V6.49963C13.6942 6.49974 14.4999 7.30548 14.5 8.29944V12.6998C14.4999 13.6938 13.6942 14.4995 12.7002 14.4996H3.29981C2.30585 14.4995 1.50011 13.6938 1.5 12.6998V8.29944C1.50011 7.30548 2.30585 6.49974 3.29981 6.49963V7.99963C3.13427 7.99974 3.00011 8.13391 3 8.29944V12.6998L3.00586 12.7604ZM12.7002 6.49963V7.99963H3.29981V6.49963H12.7002Z" fill="#60646C"/>
                  <path d="M10.25 0.499634C10.6642 0.499634 11 0.835421 11 1.24963C11 1.66385 10.6642 1.99963 10.25 1.99963H5.75C5.33579 1.99963 5 1.66385 5 1.24963C5 0.835421 5.33579 0.499634 5.75 0.499634H10.25Z" fill="#60646C"/>
                  <path d="M12 3.24963C12.4142 3.24963 12.75 3.58542 12.75 3.99963C12.75 4.41385 12.4142 4.74963 12 4.74963H4C3.58579 4.74963 3.25 4.41385 3.25 3.99963C3.25 3.58542 3.58579 3.24963 4 3.24963H12Z" fill="#60646C"/>
                </svg>
              </div>
              <span>{collections.length} {collections.length === 1 ? 'collection' : 'collections'}</span>
            </div>
            
            {/* Tooltip with collections list */}
            {isHovered && (
              <div className="absolute bottom-full left-0 mb-[4px] bg-white border border-[#e0e1e6] rounded-[6px] shadow-lg py-[8px] min-w-[200px] z-50">
                <div className="max-h-[200px] overflow-y-auto">
                  {collections.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => {
                        if (onCollectionClick) {
                          onCollectionClick(col);
                        }
                      }}
                      className={`px-[12px] py-[6px] flex items-center gap-[8px] ${
                        onCollectionClick ? 'hover:bg-[#f9fafb] cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center size-[16px] flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-full" fill="none" viewBox="0 0 16 16">
                          <path d="M3.00586 12.7604C3.03391 12.8969 3.155 12.9995 3.29981 12.9996H12.7002L12.7607 12.9938C12.8777 12.9697 12.9701 12.8774 12.9941 12.7604L13 12.6998V8.29944C12.9999 8.15463 12.8973 8.03354 12.7607 8.00549L12.7002 7.99963V6.49963C13.6942 6.49974 14.4999 7.30548 14.5 8.29944V12.6998C14.4999 13.6938 13.6942 14.4995 12.7002 14.4996H3.29981C2.30585 14.4995 1.50011 13.6938 1.5 12.6998V8.29944C1.50011 7.30548 2.30585 6.49974 3.29981 6.49963V7.99963C3.13427 7.99974 3.00011 8.13391 3 8.29944V12.6998L3.00586 12.7604ZM12.7002 6.49963V7.99963H3.29981V6.49963H12.7002Z" fill="#60646C"/>
                          <path d="M10.25 0.499634C10.6642 0.499634 11 0.835421 11 1.24963C11 1.66385 10.6642 1.99963 10.25 1.99963H5.75C5.33579 1.99963 5 1.66385 5 1.24963C5 0.835421 5.33579 0.499634 5.75 0.499634H10.25Z" fill="#60646C"/>
                          <path d="M12 3.24963C12.4142 3.24963 12.75 3.58542 12.75 3.99963C12.75 4.41385 12.4142 4.74963 12 4.74963H4C3.58579 4.74963 3.25 4.41385 3.25 3.99963C3.25 3.58542 3.58579 3.24963 4 3.24963H12Z" fill="#60646C"/>
                        </svg>
                      </div>
                      <span className="text-[12px] text-[#1c2024]">{col.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

