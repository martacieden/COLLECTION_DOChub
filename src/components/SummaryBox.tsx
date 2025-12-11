import { Sparkles, Pencil } from 'lucide-react';

interface SummaryBoxProps {
  summary: string;
  onEdit?: () => void;
}

export function SummaryBox({ summary, onEdit }: SummaryBoxProps) {
  return (
    <div>
      {/* Header Bar */}
      <div className="px-[24px] py-[16px] flex items-center justify-between bg-white">
        <div className="flex items-center gap-[8px]">
          <Sparkles className="size-[16px] text-[#8B5CF6]" />
          <h3 className="text-[13px] font-semibold text-[#1c2024]">Summary</h3>
        </div>
        {onEdit && (
          <button 
            onClick={onEdit}
            className="text-[13px] text-[#005be2] hover:underline transition-colors"
          >
            Customize
          </button>
        )}
      </div>
      {/* Summary Content */}
      <div className="px-[24px] pb-[24px]">
        <div 
          className="flex flex-col items-start gap-[8px] self-stretch border border-[#AA99EC] rounded-[8px] px-[24px] py-[16px] w-full"
          style={{ backgroundColor: '#FAF8FF' }}
        >
          <p className="text-[13px] text-[#1c2024] leading-[1.5]">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

