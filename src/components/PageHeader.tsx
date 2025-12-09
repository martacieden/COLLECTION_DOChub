import { ChevronDown } from 'lucide-react';
import svgPaths from '../imports/svg-ylbe71kelt';

interface PageHeaderProps {
  title: string;
  onShowAIFilter?: () => void;
  onUploadClick?: () => void;
}

export function PageHeader({ title, onShowAIFilter, onUploadClick }: PageHeaderProps) {
  return (
    <div className="h-[56px] flex items-center justify-between px-[16px] border-b border-[#e8e8ec] min-w-0 w-full max-w-full overflow-hidden">
      <h1 className="text-[16px] font-medium text-[#1c2024] tracking-[-0.08px] flex-1 min-w-0 truncate">{title}</h1>
      
      <div className="flex items-center gap-[24px] flex-shrink-0">
        <button 
          onClick={onUploadClick}
          className="flex items-center gap-[4px] h-[32px] px-[16px] py-[6px] bg-[#005BE2] border border-[#005BE2] rounded-[6px] text-[13px] font-semibold text-white hover:bg-[#0047B3] transition-colors flex-shrink-0"
        >
          <span>Upload</span>
          <ChevronDown className="size-[16px]" />
        </button>
      </div>
    </div>
  );
}

