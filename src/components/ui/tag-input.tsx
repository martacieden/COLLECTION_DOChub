import * as React from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { cn } from "./utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  aiTags?: string[];
  onAiTagConfirm?: (tag: string) => void;
  onAiTagDismiss?: (tag: string) => void;
  availableTags?: string[];
  onCreateTag?: (tag: string) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({ 
  tags, 
  onChange, 
  aiTags = [],
  onAiTagConfirm,
  onAiTagDismiss,
  availableTags = [], 
  onCreateTag,
  placeholder = "Add tags...", 
  className 
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Фільтруємо доступні теги: ті, що ще не вибрані та містять введений текст
  const filteredTags = availableTags.filter(
    (tag) => 
      !tags.includes(tag) && 
      !aiTags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Перевіряємо, чи введений текст точно співпадає з існуючим тегом
  const exactMatch = availableTags.some(
    (tag) => tag.toLowerCase() === inputValue.trim().toLowerCase()
  );

  // Чи показувати опцію "Create new"
  const showCreateOption = inputValue.trim() && !exactMatch && !tags.includes(inputValue.trim()) && !aiTags.includes(inputValue.trim());

  // Загальна кількість опцій у dropdown
  const totalOptions = filteredTags.length + (showCreateOption ? 1 : 0);

  const addTag = (tagText: string) => {
    const trimmed = tagText.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      
      // Якщо це новий тег, викликаємо onCreateTag
      if (onCreateTag && !availableTags.includes(trimmed)) {
        onCreateTag(trimmed);
      }
    }
    setInputValue("");
    setIsDropdownOpen(false);
    setHighlightedIndex(0);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleConfirmAiTag = (tag: string) => {
    if (onAiTagConfirm) {
      onAiTagConfirm(tag);
    }
  };

  const handleDismissAiTag = (tag: string) => {
    if (onAiTagDismiss) {
      onAiTagDismiss(tag);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      if (isDropdownOpen && totalOptions > 0) {
        // Якщо dropdown відкритий і є опції
        if (highlightedIndex < filteredTags.length) {
          // Вибираємо існуючий тег
          addTag(filteredTags[highlightedIndex]);
        } else if (showCreateOption) {
          // Створюємо новий тег
          addTag(inputValue.trim());
        }
      } else if (inputValue.trim()) {
        // Якщо dropdown закритий, просто додаємо введений текст
        addTag(inputValue.trim());
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isDropdownOpen && totalOptions > 0) {
        setHighlightedIndex((prev) => (prev + 1) % totalOptions);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isDropdownOpen && totalOptions > 0) {
        setHighlightedIndex((prev) => (prev - 1 + totalOptions) % totalOptions);
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setHighlightedIndex(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
    setHighlightedIndex(0);
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  // Закриваємо dropdown при кліку поза ним
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Скидаємо highlighted index при зміні фільтрованих тегів
  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [inputValue]);

  const hasAnyTags = tags.length > 0 || aiTags.length > 0;

  return (
    <div className="relative">
      <div 
        className={cn(
          "flex flex-wrap gap-[6px] px-[12px] py-[6px] border border-[#e0e1e6] rounded-[8px] bg-white min-h-[36px] focus-within:ring-2 focus-within:ring-[#005be2] focus-within:border-transparent transition-all",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* AI Suggested Tags */}
        {aiTags.map((tag) => (
          <div 
            key={`ai-${tag}`} 
            className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f3e8ff] border border-[#d8b4fe] rounded-[4px] text-[11px] text-[#7c3aed] cursor-pointer hover:bg-[#ede9fe] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleConfirmAiTag(tag);
            }}
            title="Click to confirm this AI suggestion"
          >
            <Sparkles className="size-[10px]" />
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDismissAiTag(tag);
              }}
              className="hover:text-[#ef4444] transition-colors ml-[2px]"
              title="Dismiss suggestion"
            >
              <X className="size-[10px]" />
            </button>
          </div>
        ))}

        {/* Manual/Confirmed Tags */}
        {tags.map((tag) => (
          <div 
            key={tag} 
            className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f5f7fa] border border-[#d1d5db] rounded-[4px] text-[11px] text-[#60646c]"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="hover:text-[#ef4444] transition-colors"
            >
              <X className="size-[10px]" />
            </button>
          </div>
        ))}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={!hasAnyTags ? placeholder : "Type to add..."}
          className="flex-1 bg-transparent outline-none text-[13px] min-w-[80px] h-[24px] placeholder:text-[#9ca3af]"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (filteredTags.length > 0 || showCreateOption) && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-[#e0e1e6] rounded-[8px] shadow-lg z-50 py-[4px] max-h-[120px] overflow-y-auto"
        >
          {/* Existing Tags */}
          {filteredTags.map((tag, index) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className={cn(
                "w-full px-[12px] py-[6px] text-left text-[13px] text-[#1c2024] transition-colors flex items-center gap-[8px]",
                highlightedIndex === index 
                  ? "bg-[#f0f7ff]" 
                  : "hover:bg-[#f9fafb]"
              )}
            >
              <span className="px-[6px] py-[2px] bg-[#f0f0f3] rounded-[4px] text-[11px]">
                {tag}
              </span>
            </button>
          ))}

          {/* Create New Tag Option */}
          {showCreateOption && (
            <button
              type="button"
              onClick={() => addTag(inputValue.trim())}
              className={cn(
                "w-full px-[12px] py-[6px] text-left text-[13px] transition-colors flex items-center gap-[8px]",
                highlightedIndex === filteredTags.length 
                  ? "bg-[#f0f7ff]" 
                  : "hover:bg-[#f9fafb]"
              )}
            >
              <Plus className="size-[14px] text-[#005be2]" />
              <span className="text-[#005be2]">Create</span>
              <span className="px-[6px] py-[2px] bg-[#ebf3ff] rounded-[4px] text-[11px] text-[#005be2]">
                {inputValue.trim()}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
