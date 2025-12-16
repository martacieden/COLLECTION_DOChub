import { Sparkles } from 'lucide-react';

interface FojoFABProps {
  onClick?: () => void;
  isChatOpen?: boolean;
}

export function FojoFAB({ onClick, isChatOpen }: FojoFABProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 60
      }}
      className={`h-[48px] px-[12px] flex items-center gap-[10px] bg-[#005be2] text-white rounded-full shadow-lg hover:bg-[#0047b3] transition-all duration-300 ease-in-out`}
      aria-label="Ask Fojo AI"
    >
      <Sparkles className="size-[20px]" />
      <span className="text-[14px] font-semibold">Ask Fojo</span>
    </button>
  );
}
