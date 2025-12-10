import { FileIcon } from './AllDocumentsTable';
import svgPaths from "../imports/svg-ylbe71kelt";

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
}

export function DocumentCard({ document, isSelected, onSelect, isPinned = false }: DocumentCardProps) {
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
      <div className="p-[12px]">
        <h3 className="text-[13px] text-[#1c2024] mb-[4px] line-clamp-1 font-medium">
          {document.name}
        </h3>
        <p className="text-[11px] text-[#8b8d98] line-clamp-2">
          {document.description || '-'}
        </p>
      </div>
    </div>
  );
}

