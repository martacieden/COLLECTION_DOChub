import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface CollectionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    id: string;
    title: string;
    description?: string;
    icon?: string;
  };
  onRename: (collectionId: string, newName: string) => void;
  onDelete: (collectionId: string) => void;
  onIconChange?: (collectionId: string, newIcon: string) => void;
}

// Популярні емодзі для колекцій
const emojiCategories = [
  {
    name: 'Documents',
    emojis: ['📁', '📄', '📝', '📋', '📊', '📈', '📉', '📑', '📃', '📜']
  },
  {
    name: 'Business',
    emojis: ['💼', '💵', '💰', '💳', '📧', '📞', '🏢', '🏭', '🏪', '🏬']
  },
  {
    name: 'Legal',
    emojis: ['⚖️', '📜', '📋', '✍️', '🔒', '🛡️', '📌', '📍', '✅', '❌']
  },
  {
    name: 'Projects',
    emojis: ['🏗️', '🔨', '🛠️', '⚙️', '🔧', '📐', '📏', '🏠', '🏘️', '🏙️']
  },
  {
    name: 'Finance',
    emojis: ['💰', '💸', '💴', '💶', '💷', '💳', '📊', '📈', '💹', '💱']
  },
  {
    name: 'Other',
    emojis: ['⭐', '🔥', '💡', '🎯', '🚀', '📦', '🎁', '🏆', '🎖️', '🌟']
  }
];

export function CollectionSettingsModal({
  isOpen,
  onClose,
  collection,
  onRename,
  onDelete,
  onIconChange
}: CollectionSettingsModalProps) {
  const [collectionName, setCollectionName] = useState(collection.title);
  const [collectionIcon, setCollectionIcon] = useState(collection.icon || '📁');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [nameError, setNameError] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Extract emoji from icon string
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  const getEmojiFromIcon = (icon?: string): string => {
    if (!icon) return '📁';
    const match = icon.trim().match(emojiRegex);
    return match ? match[0] : '📁';
  };

  useEffect(() => {
    if (isOpen) {
      setCollectionName(collection.title);
      setCollectionIcon(getEmojiFromIcon(collection.icon));
      setShowDeleteConfirm(false);
      setNameError('');
      setIsEmojiPickerOpen(false);
    }
  }, [isOpen, collection.title, collection.icon]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };

    if (isEmojiPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmojiPickerOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Валідація назви
    if (!collectionName.trim()) {
      setNameError('Collection name is required');
      return;
    }

    let hasChanges = false;

    // Перевіряємо, чи змінилася назва
    if (collectionName.trim() !== collection.title) {
      onRename(collection.id, collectionName.trim());
      hasChanges = true;
    }

    // Перевіряємо, чи змінилася іконка
    if (onIconChange && collectionIcon !== getEmojiFromIcon(collection.icon)) {
      onIconChange(collection.id, collectionIcon);
      hasChanges = true;
    }

    if (hasChanges) {
      toast.success('Collection updated successfully');
    }
    
    onClose();
  };

  const handleEmojiSelect = (emoji: string) => {
    setCollectionIcon(emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleDelete = () => {
    onDelete(collection.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl" style={{ width: '400px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Collection Settings</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
          <div className="space-y-[24px]">
            {/* Collection Name */}
            <div>
              <label className="block text-[13px] text-[#1c2024] mb-[8px]">
                Collection Name
              </label>
              <div className="flex items-center gap-[8px]">
                {/* Emoji Picker Button */}
                <div className="relative" ref={emojiPickerRef}>
                  <button
                    type="button"
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    className="size-[40px] flex items-center justify-center border border-[#e0e1e6] rounded-[8px] bg-white hover:bg-[#f9fafb] transition-colors flex-shrink-0"
                  >
                    <span className="text-[20px]">{collectionIcon}</span>
                  </button>

                  {/* Emoji Picker Dropdown */}
                  {isEmojiPickerOpen && (
                    <div className="absolute top-[44px] left-0 z-[100] bg-white border border-[#e8e8ec] rounded-[8px] shadow-lg p-[16px] w-[360px] max-h-[400px] overflow-y-auto">
                      <div className="space-y-[16px]">
                        {emojiCategories.map((category) => (
                          <div key={category.name}>
                            <h4 className="text-[11px] font-semibold text-[#8b8d98] uppercase tracking-wider mb-[8px]">
                              {category.name}
                            </h4>
                            <div className="grid grid-cols-8 gap-[6px]">
                              {category.emojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleEmojiSelect(emoji)}
                                  className={`size-[36px] flex items-center justify-center rounded-[8px] text-[24px] hover:bg-[#f0f0f3] transition-colors ${
                                    collectionIcon === emoji ? 'bg-[#f0f7ff] border-2 border-[#005be2]' : ''
                                  }`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Name Input */}
                <input
                  type="text"
                  value={collectionName}
                  onChange={(e) => {
                    setCollectionName(e.target.value);
                    setNameError('');
                  }}
                  placeholder="Enter collection name"
                  className={`flex-1 h-[40px] px-[12px] border ${nameError ? 'border-[#d4183d]' : 'border-[#e0e1e6]'} rounded-[8px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#005be2]`}
                />
              </div>
              {nameError && (
                <p className="text-[11px] text-[#d4183d] mt-[4px]">{nameError}</p>
              )}
            </div>

            {/* Delete Section */}
            <div className="border-t border-[#e8e8ec] pt-[24px]">
              <div className="mb-[16px]">
                <p className="text-[11px] text-[#60646c]">
                  Once you delete a collection, there is no going back. Please be certain.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors flex items-center gap-[8px]"
                >
                  <Trash2 className="size-[16px]" />
                  <span>Delete Collection</span>
                </button>
              ) : (
                <div className="space-y-[12px]">
                  <div className="p-[16px] bg-[#fef2f2] border border-[#fee2e2] rounded-[8px]">
                    <div className="flex items-start gap-[12px]">
                      <div className="bg-[#fee2e2] size-[32px] rounded-[8px] flex items-center justify-center flex-shrink-0">
                        <Trash2 className="size-[16px] text-[#ef4444]" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-[#1c2024] mb-[4px]">Delete Collection</h4>
                        <p className="text-[11px] text-[#60646c]">
                          Once you delete a collection, there is no going back. Please be certain.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <button
                      onClick={handleDelete}
                      className="h-[36px] px-[16px] border border-[#ef4444] rounded-[6px] text-[13px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors flex items-center gap-[8px]"
                    >
                      <Trash2 className="size-[16px]" />
                      <span>Delete Collection</span>
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec]">
          <button
            onClick={onClose}
            className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

