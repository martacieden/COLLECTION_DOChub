import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Check, Folder, Tag, Sparkles, Info } from 'lucide-react';
import { UploadFileTable } from './UploadFileTable';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import { FileIcon } from './AllDocumentsTable';
import { TagInput } from './ui/tag-input';

// Функція для генерації AI тегів на основі назви файлу
function generateAiTags(fileName: string, availableTags: string[]): string[] {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '').toLowerCase();
  
  // Розбиваємо назву на слова
  const words = nameWithoutExt
    .replace(/[-_\.]/g, ' ')
    .split(' ')
    .filter(word => word.length > 2);
  
  const suggestedTags: string[] = [];
  
  // Типи документів для розпізнавання
  const documentTypes: Record<string, string[]> = {
    'contract': ['contract', 'agreement', 'terms', 'signed'],
    'invoice': ['invoice', 'bill', 'payment', 'receipt'],
    'permit': ['permit', 'approval', 'license', 'authorization'],
    'legal': ['legal', 'law', 'attorney', 'court', 'waiver', 'lien'],
    'financial': ['financial', 'budget', 'cost', 'expense', 'tax', 'accounting'],
    'insurance': ['insurance', 'policy', 'coverage', 'claim'],
    'construction': ['construction', 'building', 'renovation', 'blueprint', 'plan'],
    'trust': ['trust', 'estate', 'will', 'beneficiary'],
  };
  
  // Шукаємо типи документів у назві файлу
  for (const [tag, keywords] of Object.entries(documentTypes)) {
    if (keywords.some(keyword => nameWithoutExt.includes(keyword))) {
      if (!suggestedTags.includes(tag)) {
        suggestedTags.push(tag);
      }
    }
  }
  
  // Шукаємо співпадіння з існуючими тегами
  for (const existingTag of availableTags) {
    const tagLower = existingTag.toLowerCase();
    if (words.some(word => tagLower.includes(word) || word.includes(tagLower))) {
      if (!suggestedTags.includes(existingTag) && !suggestedTags.includes(tagLower)) {
        suggestedTags.push(existingTag);
      }
    }
  }
  
  // Обмежуємо до 3 тегів
  return suggestedTags.slice(0, 3);
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (files: FileInfo[], collectionIds: string[], organization: string, metadata: FileMetadata[]) => void;
  collections?: Array<{ id: string; title: string; icon?: string; rules?: any[] }>;
  getCollectionType?: (collection: { rules?: any[]; documentIds?: string[] }) => 'auto' | 'manual';
  currentCollection?: { id: string; title: string; icon?: string; rules?: any[] } | null;
  availableTags?: string[];
  onCreateTag?: (tag: string) => void;
}

interface FileInfo {
  file: File;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'failed';
  aiTags?: string[];
  tags?: string[];
}

interface FileMetadata {
  fileName: string;
  title: string;
  description: string;
  tags: string[];
  aiTags?: string[];
}

type UploadStep = 'select' | 'preview' | 'uploading';

const organizations = [
  { id: 1, name: 'Smith Family', initial: 'S', color: '#FF6B6B' },
  { id: 2, name: 'Johnson Family Trust', initial: 'J', color: '#4ECDC4' },
  { id: 3, name: "Herwitz's Family", initial: 'H', color: '#45B7D1' },
  { id: 4, name: 'Wayne Estate Management', initial: 'W', color: '#FFA07A' },
  { id: 5, name: 'The Robertson Foundation', initial: 'T', color: '#98D8C8' }
];

export function UploadModal({ isOpen, onClose, onComplete, collections = [], getCollectionType, currentCollection, availableTags = [], onCreateTag }: UploadModalProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>('select');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [globalTags, setGlobalTags] = useState<string[]>([]);
  const [globalAiTags, setGlobalAiTags] = useState<string[]>([]); // AI-запропоновані теги
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<Set<string>>(new Set());
  const [fileMetadata, setFileMetadata] = useState<Record<string, FileMetadata>>({});
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsButtonRef = useRef<HTMLButtonElement>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('select');
      setSelectedFiles([]);
      setSelectedOrganization('');
      setGlobalTags([]);
      setGlobalAiTags([]);
      setSelectedCollectionIds(new Set());
      setFileMetadata({});
      setUploadedFiles([]);
      setIsCollectionsDropdownOpen(false);
      setShowAdvancedOptions(false);
    }
  }, [isOpen]);

  // Add current collection to selectedCollectionIds when modal opens
  useEffect(() => {
    if (isOpen && currentCollection) {
      setSelectedCollectionIds(prev => new Set([...prev, currentCollection.id]));
    }
  }, [isOpen, currentCollection]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(event.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
      if (collectionsDropdownRef.current && !collectionsDropdownRef.current.contains(event.target as Node) && 
          collectionsButtonRef.current && !collectionsButtonRef.current.contains(event.target as Node)) {
        setIsCollectionsDropdownOpen(false);
      }
    };

    if (isOrgDropdownOpen || isCollectionsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOrgDropdownOpen, isCollectionsDropdownOpen]);

  const handleUploadComplete = useCallback((completedFiles: FileInfo[]) => {
    const metadataArray: FileMetadata[] = selectedFiles.map(file => {
      const meta = fileMetadata[file.name];
      if (meta) {
        // Об'єднуємо підтверджені теги (globalTags) з AI тегами файлу
        const confirmedTags = Array.isArray(meta.tags) ? meta.tags : [];
        // AI теги, які ще не підтверджені
        const pendingAiTags = meta.aiTags?.filter(t => !confirmedTags.includes(t)) || [];
        
        return {
          fileName: meta.fileName,
          title: meta.title,
          description: meta.description,
          tags: confirmedTags,
          aiTags: pendingAiTags
        };
      }
      return {
        fileName: file.name,
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: '',
        tags: [],
        aiTags: []
      };
    });

    const collectionIdsArray: string[] = Array.from(selectedCollectionIds) as string[];
    
    // Показуємо summary toast
    const collectionNames = collections
      .filter(col => collectionIdsArray.includes(col.id))
      .map(col => col.title);
    
    const summaryText = collectionNames.length > 0
      ? `This document will be added to: ${collectionNames.join(' / ')}`
      : 'Document will be uploaded without collections';
    
    toast.success(
      <div className="flex flex-col gap-[4px]">
        <div className="text-[13px] text-[#1c2024] font-medium">
          {selectedFiles.length} {selectedFiles.length === 1 ? 'document' : 'documents'} uploaded successfully
        </div>
        {collectionNames.length > 0 && (
          <div className="text-[12px] text-[#60646c]">
            {summaryText}
          </div>
        )}
      </div>,
      { duration: 6000 }
    );
    
    onComplete(completedFiles, collectionIdsArray as string[], selectedOrganization, metadataArray);
    
    // Reset state
    setCurrentStep('select');
    setSelectedFiles([]);
    setSelectedOrganization('');
    setGlobalTags([]);
    setSelectedCollectionIds(new Set());
    setFileMetadata({});
    setUploadedFiles([]);
    onClose();
  }, [selectedFiles, fileMetadata, selectedCollectionIds, collections, selectedOrganization, onComplete, onClose]);

  const handleStartUpload = useCallback(() => {
    // Перевірка, чи не вже йде завантаження
    if (currentStep === 'uploading') {
      return;
    }
    
    // Перевірка обов'язкового поля організації
    if (!selectedOrganization || selectedOrganization.trim() === '') {
      toast.error('Please select an organization before uploading files');
      return;
    }
    
    // Перевірка, чи є файли для завантаження
    if (selectedFiles.length === 0) {
      return;
    }

    const fileInfos: FileInfo[] = selectedFiles.map(file => {
      const meta = fileMetadata[file.name];
      return {
        file,
        uploadProgress: 0,
        status: 'uploading' as const,
        aiTags: meta?.aiTags || [],
        tags: meta?.tags || []
      };
    });
    
    setUploadedFiles(fileInfos);
    setCurrentStep('uploading');

    // Simulate upload progress
    fileInfos.forEach((fileInfo, index) => {
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => {
          const updated = [...prev];
          if (updated[index] && updated[index].uploadProgress < 100) {
            updated[index].uploadProgress += 20;
          } else if (updated[index]) {
            updated[index].status = 'completed';
            // Зберігаємо метадані при завершенні
            const file = selectedFiles[index];
            const meta = file ? fileMetadata[file.name] : null;
            if (meta) {
              updated[index].aiTags = meta.aiTags || [];
              updated[index].tags = meta.tags || [];
            }
            clearInterval(progressInterval);
            
            // Перевіряємо чи всі файли завантажені
            const allCompleted = updated.every(f => f.status === 'completed');
            if (allCompleted) {
              handleUploadComplete(updated);
            }
          }
          return updated;
        });
      }, 300);
    });
  }, [currentStep, selectedOrganization, selectedFiles, fileMetadata, handleUploadComplete]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      handleFilesSelected(files);
    }
    // Скидаємо значення input, щоб можна було вибрати ті самі файли знову
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 0) {
      handleFilesSelected(files);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    // Додаємо файли до списку (не переходимо до preview)
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Генеруємо AI теги на основі назв файлів
    const allAiTags: string[] = [];
    files.forEach(file => {
      const aiTags = generateAiTags(file.name, availableTags);
      aiTags.forEach(tag => {
        if (!allAiTags.includes(tag) && !globalTags.includes(tag) && !globalAiTags.includes(tag)) {
          allAiTags.push(tag);
        }
      });
    });
    
    // Додаємо нові AI теги до існуючих
    if (allAiTags.length > 0) {
      setGlobalAiTags(prev => {
        const newTags = allAiTags.filter(tag => !prev.includes(tag));
        return [...prev, ...newTags];
      });
    }
    
    // Ініціалізуємо метадані для кожного файлу
    const newMetadata: Record<string, FileMetadata> = {};
    files.forEach(file => {
      const fileName = file.name;
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      const fileAiTags = generateAiTags(fileName, availableTags);
      newMetadata[fileName] = {
        fileName: fileName,
        title: nameWithoutExt,
        description: '',
        tags: [...globalTags],
        aiTags: fileAiTags
      };
    });
    setFileMetadata(prev => ({ ...prev, ...newMetadata }));
  };

  const handleToggleCollection = (collectionId: string) => {
    setSelectedCollectionIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  const updateFileMetadata = (fileName: string, field: keyof FileMetadata, value: string | string[]) => {
    setFileMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  const getFileType = (fileName: string): string => {
    return fileName.split('.').pop()?.toUpperCase() || 'FILE';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]" onClick={onClose}>
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl transition-all w-[600px] max-w-[calc(100vw-48px)] h-[720px]" style={{ width: '600px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[16px] font-semibold text-[#1c2024]">Upload documents</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden flex-col min-h-0">
          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Single Step: Select Files & Configure */}
            {(currentStep === 'select' || currentStep === 'preview') && (
              <div className="px-[16px] py-[16px]">
                {/* Organization Dropdown */}
                <div className="mb-[24px]">
                  <label className="block text-[14px] text-[#1c2024] mb-[8px]">
                    Choose organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={orgDropdownRef}>
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep !== 'uploading') {
                          setIsOrgDropdownOpen(!isOrgDropdownOpen);
                        }
                      }}
                      disabled={currentStep === 'uploading'}
                      className={`w-full h-[32px] px-[16px] pr-[40px] border rounded-[8px] text-[15px] text-left appearance-none focus:outline-none focus:ring-2 focus:ring-[#005be2] bg-white flex items-center gap-[8px] ${
                        !selectedOrganization ? 'border-red-300' : 'border-[#e0e1e6]'
                      } ${currentStep === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {selectedOrganization && (() => {
                        const selectedOrg = organizations.find(org => org.name === selectedOrganization);
                        if (selectedOrg) {
                          return (
                            <>
                              <div 
                                className="size-[24px] rounded-full flex items-center justify-center text-white shrink-0"
                                style={{ backgroundColor: selectedOrg.color }}
                              >
                                <span className="text-[11px] font-medium">{selectedOrg.initial}</span>
                              </div>
                              <span className="text-[13px] text-[#1c2024]">
                                {selectedOrganization}
                              </span>
                            </>
                          );
                        }
                        return null;
                      })()}
                      {!selectedOrganization && (
                        <span className="text-[13px] text-[#9ca3af]">
                          Where should this document live?
                        </span>
                      )}
                    </button>
                    <ChevronDown className="size-[20px] text-[#9ca3af] absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    {/* Dropdown Menu */}
                    {isOrgDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#e0e1e6] rounded-[8px] shadow-lg z-50 py-[8px] max-h-[300px] overflow-y-auto">
                        {organizations.map(org => (
                          <button
                            key={org.id}
                            type="button"
                            onClick={() => {
                              setSelectedOrganization(org.name);
                              setIsOrgDropdownOpen(false);
                            }}
                            className="w-full px-[16px] py-[10px] text-left text-[15px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors flex items-center gap-[12px]"
                          >
                            <div 
                              className="size-[24px] rounded-full flex items-center justify-center text-white shrink-0"
                              style={{ backgroundColor: org.color }}
                            >
                              <span className="text-[11px]">{org.initial}</span>
                            </div>
                            <span>{org.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Warning message during upload */}
                  {currentStep === 'uploading' && (
                    <p className="text-[12px] text-[#60646c] mt-[8px]">
                      You can't change the organization during an upload.
                    </p>
                  )}
                </div>


                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`border-2 border-dashed border-[#e0e1e6] rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#005be2] hover:bg-[#fafafa] transition-all gap-[12px] ${
                    selectedFiles.length > 0 
                      ? 'py-[12px] px-[32px] min-h-[120px]' 
                      : 'p-[100px_32px] min-h-[400px]'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFiles.length === 0 && (
                    <div className="text-center">
                      <p className="text-[15px] text-[#1c2024] mb-[8px]">
                        Drag & drop your files or <span className="text-[#005be2] underline cursor-pointer">Browse</span>
                      </p>
                      <p className="text-[14px] text-[#9ca3af]">
                        Supports documents, images, audio, video
                        <br />
                        and more
                      </p>
                    </div>
                  )}
                  {selectedFiles.length > 0 && (
                    <div className="text-center">
                      <p className="text-[15px] text-[#1c2024] mb-[8px]">
                        Drag & drop more files or <span className="text-[#005be2] underline cursor-pointer">Browse</span>
                      </p>
                      <p className="text-[14px] text-[#9ca3af]">
                        Supports documents, images, audio, video
                        <br />
                        and more
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Selected Files Table */}
                {selectedFiles.length > 0 && (
                  <div className="mt-[24px] border border-[#e0e1e6] rounded-[8px] overflow-hidden">
                    <div className="overflow-y-auto max-h-[280px]">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors">
                            <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Name</th>
                            <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Type</th>
                            <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Status</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {selectedFiles.map((file, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-[#f9fafb]">
                              <td className="p-2 align-middle whitespace-nowrap">
                                <div className="flex items-center gap-[8px]">
                                  <FileIcon type={getFileType(file.name)} />
                                  <span className="text-[13px] text-[#1c2024]">{file.name}</span>
                                </div>
                              </td>
                              <td className="p-2 align-middle whitespace-nowrap">
                                <span className="text-[13px] text-[#60646c]">{getFileType(file.name)}</span>
                              </td>
                              <td className="p-2 align-middle whitespace-nowrap">
                                <div className="flex items-center gap-[4px]">
                                  <Check className="size-[16px] text-[#059669]" />
                                  <span className="text-[13px] text-[#059669]">Ready</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Advanced Options - Tags and Collections */}
                {selectedFiles.length > 0 && (
                  <div className="mt-[24px] box-content">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      className="w-full flex items-center justify-between px-[12px] py-[8px] text-[13px] text-[#60646c] hover:text-[#1c2024] hover:bg-[#f9fafb] rounded-[6px] transition-colors mb-0"
                    >
                      <span className="flex items-center gap-[8px]">
                        Advanced options (optional)
                        {/* AI suggestions indicator when collapsed */}
                        {!showAdvancedOptions && globalAiTags.length > 0 && (
                          <span className="inline-flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f3e8ff] text-[#7c3aed] rounded-[4px] text-[11px] font-medium">
                            <Sparkles className="size-[12px]" />
                            {globalAiTags.length} AI suggestion{globalAiTags.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </span>
                      <ChevronDown className={`size-[16px] transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showAdvancedOptions && (
                      <div className="mt-[16px] space-y-[24px] border-t border-[#e8e8ec] pt-[12px]">
                        {/* Tags Input */}
                        <div className="mt-[12px]">
                          <label className="block text-[12px] text-[#1c2024] mb-[8px] mt-[8px]">
                            Tags (applied to all files)
                            {globalAiTags.length > 0 && (
                              <span className="ml-[8px] text-[12px] text-[#7c3aed] font-normal">
                                ✨ AI suggested {globalAiTags.length} tag{globalAiTags.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </label>
                          <TagInput 
                            tags={globalTags}
                            aiTags={globalAiTags}
                            onChange={(newTags) => {
                              setGlobalTags(newTags);
                              // Оновлюємо теги для вже вибраних файлів
                              setSelectedFiles(current => {
                                const updatedMetadata = { ...fileMetadata };
                                current.forEach(file => {
                                  if (updatedMetadata[file.name]) {
                                    updatedMetadata[file.name].tags = [...newTags];
                                  }
                                });
                                setFileMetadata(updatedMetadata);
                                return current;
                              });
                            }}
                            onAiTagConfirm={(tag) => {
                              // Переміщуємо AI тег в manual теги
                              setGlobalAiTags(prev => prev.filter(t => t !== tag));
                              setGlobalTags(prev => [...prev, tag]);
                              // Оновлюємо метадані файлів
                              setFileMetadata(prev => {
                                const updated = { ...prev };
                                Object.keys(updated).forEach(fileName => {
                                  if (updated[fileName].aiTags) {
                                    updated[fileName].aiTags = updated[fileName].aiTags!.filter(t => t !== tag);
                                  }
                                  if (!updated[fileName].tags.includes(tag)) {
                                    updated[fileName].tags = [...updated[fileName].tags, tag];
                                  }
                                });
                                return updated;
                              });
                            }}
                            onAiTagDismiss={(tag) => {
                              // Видаляємо AI тег
                              setGlobalAiTags(prev => prev.filter(t => t !== tag));
                              // Видаляємо з метаданих файлів
                              setFileMetadata(prev => {
                                const updated = { ...prev };
                                Object.keys(updated).forEach(fileName => {
                                  if (updated[fileName].aiTags) {
                                    updated[fileName].aiTags = updated[fileName].aiTags!.filter(t => t !== tag);
                                  }
                                });
                                return updated;
                              });
                            }}
                            availableTags={availableTags}
                            onCreateTag={onCreateTag}
                            placeholder="Add tags..."
                          />
                        </div>

                        {/* Collections Selection */}
                        {collections.length > 0 && (
                          <div ref={collectionsDropdownRef} className="relative">
                            <label className="block text-[12px] text-[#1c2024] mb-[8px]">
                              Add to collections
                            </label>
                            <button
                              ref={collectionsButtonRef}
                              type="button"
                              onClick={() => {
                                if (collectionsButtonRef.current) {
                                  const rect = collectionsButtonRef.current.getBoundingClientRect();
                                  setDropdownPosition({
                                    top: rect.bottom + 4,
                                    left: rect.left,
                                    width: rect.width
                                  });
                                }
                                setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen);
                              }}
                              className="w-full flex items-center gap-[6px] px-[12px] py-[6px] border border-[#e0e1e6] rounded-[8px] bg-white hover:bg-[#f9fafb] transition-colors min-h-[36px]"
                            >
                              {/* Selected Collections inside button */}
                              {selectedCollectionIds.size > 0 ? (
                                <div className="flex-1 flex items-center gap-[6px] overflow-hidden">
                                  {(() => {
                                    const selectedArray = [...selectedCollectionIds];
                                    const maxVisible = 2;
                                    const visibleIds = selectedArray.slice(0, maxVisible);
                                    const hiddenCount = selectedArray.length - maxVisible;
                                    
                                    return (
                                      <>
                                        {visibleIds.map((collectionId) => {
                                          const collection = collections.find(col => col.id === collectionId) || 
                                                           (currentCollection?.id === collectionId ? currentCollection : null);
                                          if (!collection) return null;
                                          const collectionType = getCollectionType ? getCollectionType({ rules: collection.rules, documentIds: [] }) : 'manual';
                                          
                                          return (
                                            <div
                                              key={collectionId}
                                              className="flex items-center gap-[4px] px-[6px] py-[2px] bg-[#f5f7fa] border border-[#d1d5db] rounded-[4px] shrink-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleCollection(collectionId);
                                              }}
                                            >
                                              <span className="text-[12px]">{collection.icon || '📁'}</span>
                                              <span className="text-[11px] font-normal text-[#60646c] max-w-[100px] truncate">{collection.title}</span>
                                              {collectionType === 'auto' && (
                                                <span className="px-[3px] py-[1px] bg-[#f9fafb] text-[#9ca3af] rounded-[3px] text-[10px] font-normal">
                                                  Auto
                                                </span>
                                              )}
                                              <X className="size-[10px] text-[#9ca3af] hover:text-[#60646c]" />
                                            </div>
                                          );
                                        })}
                                        {hiddenCount > 0 && (
                                          <span className="text-[11px] text-[#60646c] shrink-0">+{hiddenCount}</span>
                                        )}
                                      </>
                                    );
                                  })()}
                                </div>
                              ) : (
                                <span className="flex-1 text-[13px] text-[#9ca3af] text-left">Select collections</span>
                              )}
                              <ChevronDown className={`size-[16px] text-[#60646c] transition-transform shrink-0 ${isCollectionsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isCollectionsDropdownOpen && typeof window !== 'undefined' && createPortal(
                              <div
                                className="border border-[#e0e1e6] rounded-[8px] bg-white shadow-lg overflow-hidden flex flex-col"
                                style={{
                                  position: 'fixed',
                                  top: `${dropdownPosition.top}px`,
                                  left: `${dropdownPosition.left}px`,
                                  width: `${dropdownPosition.width}px`,
                                  height: '226px',
                                  zIndex: 2147483647,
                                  pointerEvents: 'auto',
                                  isolation: 'isolate'
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="overflow-y-auto p-[8px] space-y-[4px]" style={{ height: '226px' }}>
                                  {collections.map((collection) => {
                                    const isSelected = selectedCollectionIds.has(collection.id);
                                    const collectionType = getCollectionType ? getCollectionType({ rules: collection.rules, documentIds: [] }) : 'manual';
                                    
                                    return (
                                      <button
                                        key={collection.id}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          handleToggleCollection(collection.id);
                                        }}
                                        onMouseDown={(e) => {
                                          e.stopPropagation();
                                        }}
                                        className={`w-full flex items-center gap-[8px] px-[8px] py-[6px] rounded-[6px] text-left transition-colors cursor-pointer ${
                                          isSelected
                                            ? 'bg-[#ebf3ff] border border-[#005be2]'
                                            : 'hover:bg-[#f9fafb] border border-transparent'
                                        }`}
                                      >
                                        <Checkbox
                                          checked={isSelected}
                                          onCheckedChange={() => handleToggleCollection(collection.id)}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <span className="text-[16px]">{collection.icon || '📁'}</span>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-[12px] font-medium text-[#1c2024] truncate">{collection.title}</p>
                                        </div>
                                        {collectionType === 'auto' && (
                                          <span className="px-[4px] py-[1px] bg-[#f9fafb] text-[#60646c] rounded-[4px] text-[10px] font-medium">
                                            Auto
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>,
                              document.body
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Uploading Files */}
            {currentStep === 'uploading' && (
              <div className="px-[16px] py-[16px]">
                <div className="mb-[20px]">
                  <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[8px]">Uploading documents...</h3>
                  <p className="text-[12px] text-[#60646c]">
                    {uploadedFiles.filter(f => f.status === 'completed').length} of {uploadedFiles.length} completed
                  </p>
                </div>

                {/* File List */}
                <UploadFileTable 
                  files={uploadedFiles.map(fileInfo => {
                    const file = selectedFiles.find(f => f.name === fileInfo.file.name);
                    const meta = file ? fileMetadata[file.name] : null;
                    return {
                      ...fileInfo,
                      aiTags: meta?.aiTags || [],
                      tags: meta?.tags || []
                    };
                  })}
                  onConfirmAiTag={(fileName, tag) => {
                    // Переміщуємо AI тег в підтверджені теги
                    setFileMetadata(prev => {
                      const updated = { ...prev };
                      if (updated[fileName]) {
                        // Видаляємо з AI тегів
                        updated[fileName].aiTags = updated[fileName].aiTags?.filter(t => t !== tag) || [];
                        // Додаємо до підтверджених тегів
                        if (!updated[fileName].tags.includes(tag)) {
                          updated[fileName].tags = [...updated[fileName].tags, tag];
                        }
                      }
                      return updated;
                    });
                    
                    // Оновлюємо глобальні теги
                    setGlobalAiTags(prev => prev.filter(t => t !== tag));
                    if (!globalTags.includes(tag)) {
                      setGlobalTags(prev => [...prev, tag]);
                    }
                  }}
                  onDismissAiTag={(fileName, tag) => {
                    // Видаляємо AI тег
                    setFileMetadata(prev => {
                      const updated = { ...prev };
                      if (updated[fileName]) {
                        updated[fileName].aiTags = updated[fileName].aiTags?.filter(t => t !== tag) || [];
                      }
                      return updated;
                    });
                    
                    // Видаляємо з глобальних AI тегів
                    setGlobalAiTags(prev => prev.filter(t => t !== tag));
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer - кнопка Add для кроку вибору файлів */}
          {(currentStep === 'select' || currentStep === 'preview') && selectedFiles.length > 0 && (
            <div className="px-[24px] py-[16px] border-t border-[#e8e8ec] flex-shrink-0">
              <div className="flex items-center justify-end gap-[12px]">
                <button
                  onClick={onClose}
                  className="h-[36px] px-[16px] rounded-[6px] text-[13px] text-[#60646c] hover:text-[#1c2024] hover:bg-[#f9fafb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartUpload}
                  disabled={!selectedOrganization || selectedOrganization.trim() === ''}
                  className={`h-[36px] px-[16px] rounded-[6px] text-[13px] font-medium transition-colors ${
                    !selectedOrganization || selectedOrganization.trim() === ''
                      ? 'bg-[#e0e1e6] text-[#9ca3af] cursor-not-allowed'
                      : 'bg-[#005be2] text-white hover:bg-[#004fc4]'
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Footer - тільки під час завантаження */}
          
          {currentStep === 'uploading' && (
            <div className="px-[24px] py-[16px] border-t border-[#e8e8ec] flex-shrink-0">
              {/* Info message */}
              <div className="flex items-center gap-[8px] mb-[12px] text-[12px] text-[#60646c]">
                <Info className="size-[16px] text-[#60646c] flex-shrink-0" />
                <span>Safe to close — uploads continue in background</span>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center justify-end gap-[12px]">
                <button
                  onClick={onClose}
                  className="h-[36px] px-[16px] rounded-[6px] text-[13px] bg-[#005be2] text-white hover:bg-[#004fc4] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}