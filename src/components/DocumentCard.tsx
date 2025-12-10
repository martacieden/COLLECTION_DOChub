import { FileIcon } from './AllDocumentsTable';
import svgPaths from "../imports/svg-ylbe71kelt";

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
}

export function DocumentCard({ document, isSelected, onSelect, isPinned = false, collections = [] }: DocumentCardProps) {
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
      <div className="px-[24px] py-[12px]">
        <h3 className="text-[13px] text-[#1c2024] mb-[4px] line-clamp-1 font-medium">
          {document.name}
        </h3>
        <p className="text-[11px] text-[#8b8d98] line-clamp-2 mb-[8px]">
          {document.description || '-'}
        </p>
        
        {/* Collections */}
        {collections.length > 0 && (
          <div className="flex flex-wrap gap-[4px] mt-[8px]">
            {collections.slice(0, 2).map((col) => (
              <span
                key={col.id}
                className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] bg-[#f0f0f3] border border-[#e0e1e6] text-[10px] text-[#1c2024]"
              >
                {col.icon && <span className="text-[10px]">{col.icon}</span>}
                <span className="truncate max-w-[80px]">{col.title}</span>
              </span>
            ))}
            {collections.length > 2 && (
              <span className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[10px] text-[#60646c]">
                +{collections.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

