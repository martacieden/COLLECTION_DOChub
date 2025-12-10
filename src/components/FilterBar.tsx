import { SlidersHorizontal, Sparkles, List } from 'lucide-react';

interface FilterBarProps {
  filterQuery: string;
  onFilterChange: (query: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  visibleColumnsCount?: number;
}

export function FilterBar({
  filterQuery,
  onFilterChange,
  viewMode,
  onViewModeChange,
  visibleColumnsCount
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-[#e8e8ec] px-[24px] py-[12px] bg-white flex-shrink-0 min-w-0 w-full max-w-full">
      <div className="flex items-center justify-between gap-[8px] min-w-0">
        <div className="flex items-center gap-[8px] min-w-0">
          {/* Filters Button */}
          <button className="h-[32px] px-[8px] flex items-center gap-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] bg-white">
            <SlidersHorizontal className="size-[16px] text-[#60646c]" />
            <span className="text-[12px] font-semibold">Filters</span>
          </button>

          {/* Search Input */}
          <div className="relative" style={{ width: '256px' }}>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => onFilterChange(e.target.value)}
              placeholder='Filter documents (e.g., "signed last month")...'
              className="w-full h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
            />
          </div>

          {/* Apply Button */}
          <button className="h-[32px] px-[12px] flex items-center gap-[4px] bg-[#f0f0f3] rounded-[6px] text-[13px] text-[#b9bbc6] hover:bg-[#e0e1e6]">
            <Sparkles className="size-[16px]" />
            <span className="text-[13px] font-semibold">Apply</span>
          </button>

          {/* Column Count */}
          {viewMode === 'table' && visibleColumnsCount && (
            <span className="text-[13px] text-[#60646c] whitespace-nowrap">
              {visibleColumnsCount}/{visibleColumnsCount} columns
            </span>
          )}
        </div>

        {/* View Switcher (Grid Icon first) - Right side */}
        <div className="flex items-center border border-[#e0e1e6] rounded-[6px] flex-shrink-0">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`h-[32px] w-[32px] flex items-center justify-center rounded-l-[6px] transition-colors ${
              viewMode === 'grid' 
                ? 'bg-[#f0f0f3] text-[#1c2024]' 
                : 'text-[#60646c] hover:bg-[#f9fafb]'
            }`}
          >
            <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`h-[32px] w-[32px] flex items-center justify-center rounded-r-[6px] transition-colors ${
              viewMode === 'table' 
                ? 'bg-[#f0f0f3] text-[#1c2024]' 
                : 'text-[#60646c] hover:bg-[#f9fafb]'
            }`}
          >
            <List className="size-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

