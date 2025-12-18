import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Check, Folder } from 'lucide-react';
import { UploadFileTable } from './UploadFileTable';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import svgPaths from '../imports/svg-tmeiqkylpl';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (files: FileInfo[], collectionIds: string[], organization: string, metadata: FileMetadata[]) => void;
  collections?: Array<{ id: string; title: string; icon?: string; rules?: any[] }>;
  getCollectionType?: (collection: { rules?: any[]; documentIds?: string[] }) => 'auto' | 'manual';
}

interface FileInfo {
  file: File;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'failed';
}

interface FileMetadata {
  fileName: string;
  title: string;
  description: string;
  tags: string[];
}

type UploadStep = 'select' | 'preview' | 'uploading';

const organizations = [
  { id: 1, name: 'Smith Family', initial: 'S', color: '#FF6B6B' },
  { id: 2, name: 'Johnson Family Trust', initial: 'J', color: '#4ECDC4' },
  { id: 3, name: "Herwitz's Family", initial: 'H', color: '#45B7D1' },
  { id: 4, name: 'Wayne Estate Management', initial: 'W', color: '#FFA07A' },
  { id: 5, name: 'The Robertson Foundation', initial: 'T', color: '#98D8C8' }
];

export function UploadModal({ isOpen, onClose, onComplete, collections = [], getCollectionType }: UploadModalProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>('select');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<Set<string>>(new Set());
  const [fileMetadata, setFileMetadata] = useState<Record<string, FileMetadata>>({});
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
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
      setSelectedCollectionIds(new Set());
      setFileMetadata({});
      setUploadedFiles([]);
      setIsCollectionsDropdownOpen(false);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      handleFilesSelected(files);
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
    
    // Ініціалізуємо метадані для кожного файлу
    const newMetadata: Record<string, FileMetadata> = {};
    files.forEach(file => {
      const fileName = file.name;
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      newMetadata[fileName] = {
        fileName: fileName,
        title: nameWithoutExt,
        description: '',
        tags: []
      };
    });
    setFileMetadata(prev => ({ ...prev, ...newMetadata }));
  };

  const handleStartUpload = () => {
    // Перевірка обов'язкового поля організації
    if (!selectedOrganization || selectedOrganization.trim() === '') {
      toast.error('Please select an organization before uploading files');
      return;
    }

    const fileInfos: FileInfo[] = selectedFiles.map(file => ({
      file,
      uploadProgress: 0,
      status: 'uploading' as const
    }));
    
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
            clearInterval(progressInterval);
            
            // Перевіряємо чи всі файли завантажені
            const allCompleted = updated.every(f => f.status === 'completed');
            if (allCompleted) {
              handleUploadComplete();
            }
          }
          return updated;
        });
      }, 300);
    });
  };

  const handleUploadComplete = () => {
    const metadataArray: FileMetadata[] = selectedFiles.map(file => {
      const meta = fileMetadata[file.name];
      if (meta) {
        return {
          fileName: meta.fileName,
          title: meta.title,
          description: meta.description,
          tags: Array.isArray(meta.tags) ? meta.tags : []
        };
      }
      return {
        fileName: file.name,
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: '',
        tags: []
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
    
    onComplete(uploadedFiles, collectionIdsArray as string[], selectedOrganization, metadataArray);
    
    // Reset state
    setCurrentStep('select');
    setSelectedFiles([]);
    setSelectedOrganization('');
    setSelectedCollectionIds(new Set());
    setFileMetadata({});
    setUploadedFiles([]);
    onClose();
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

  const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toUpperCase() || 'FILE';
  };

  // Simple file icon function
  const getFileIcon = (fileName: string) => {
    const ext = fileName.toLowerCase().split('.').pop() || '';
    if (['csv', 'xls', 'xlsm', 'xlsx'].includes(ext)) {
      return { bgColor: '#e6f6eb' };
    }
    if (['doc', 'docm', 'docx', 'dotm', 'txt', 'pdf'].includes(ext)) {
      return { bgColor: '#ebf3ff' };
    }
    if (['bmp', 'gif', 'hdr', 'jpeg', 'jpg', 'png', 'tiff', 'webp', 'svg'].includes(ext)) {
      return { bgColor: '#fee7e9' };
    }
    return { bgColor: '#f5f5f7' };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]" onClick={onClose}>
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl transition-all w-[740px] max-w-[calc(100vw-48px)] h-[650px]" onClick={(e) => e.stopPropagation()}>
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
        <div className="flex flex-1 overflow-hidden flex-col">
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Single Step: Select Files & Configure */}
            {(currentStep === 'select' || currentStep === 'preview') && (
              <div className="p-[32px]">
                {/* Organization Dropdown */}
                <div className="mb-[24px]">
                  <label className="block text-[14px] text-[#1c2024] mb-[8px]">
                    Choose organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={orgDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                      className={`w-full h-[48px] px-[16px] pr-[40px] border rounded-[8px] text-[15px] text-left appearance-none focus:outline-none focus:ring-2 focus:ring-[#005be2] bg-white ${
                        !selectedOrganization ? 'border-red-300' : 'border-[#e0e1e6]'
                      }`}
                    >
                      <span className={selectedOrganization ? 'text-[#1c2024]' : 'text-[#9ca3af]'}>
                        {selectedOrganization || 'Where should this document live?'}
                      </span>
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
                              className="size-[28px] rounded-full flex items-center justify-center text-white shrink-0"
                              style={{ backgroundColor: org.color }}
                            >
                              <span className="text-[13px]">{org.initial}</span>
                            </div>
                            <span>{org.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`border-2 border-dashed border-[#e0e1e6] rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#005be2] hover:bg-[#fafafa] transition-all ${
                    selectedFiles.length > 0 
                      ? 'p-[24px_32px] min-h-[120px]' 
                      : 'p-[100px_32px] min-h-[400px]'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <p className="text-[15px] text-[#1c2024] mb-[8px]">
                      {selectedFiles.length > 0 ? 'Drop more files here or ' : 'Drag & drop your files or '}
                      <span className="text-[#005be2] underline cursor-pointer">Browse</span>
                    </p>
                    <p className="text-[14px] text-[#9ca3af]">
                      Supports documents, images, audio, video
                      <br />
                      and more
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-[24px] border border-[#e0e1e6] rounded-[8px] overflow-hidden flex flex-col">
                    <div className="bg-[#f9fafb] border-b border-[#e0e1e6] px-[16px] py-[8px] flex-shrink-0">
                      <div className="flex items-center gap-[16px]">
                        <p className="text-[13px] font-medium text-[#80838d]">Name</p>
                        <p className="text-[13px] font-medium text-[#80838d]">Details</p>
                      </div>
                    </div>
                    <div className={`overflow-y-auto ${selectedFiles.length > 6 ? 'max-h-[240px]' : ''}`}>
                      {selectedFiles.map((file, index) => {
                        const { bgColor } = getFileIcon(file.name);
                        return (
                          <div key={index} className="border-b border-[#e0e1e6] last:border-b-0">
                            <div className="flex items-center gap-[16px] px-[16px] py-[8px]">
                              <div
                                className="size-[24px] rounded-[6px] flex items-center justify-center shrink-0 text-[10px] text-[#60646c]"
                                style={{ backgroundColor: bgColor }}
                              >
                                {getFileExtension(file.name)}
                              </div>
                              <p className="text-[13px] text-[#1c2024] flex-1 truncate">{file.name}</p>
                              <div className="flex items-center gap-[4px]">
                                <Check className="size-[16px] text-[#059669]" />
                                <span className="text-[13px] text-[#059669]">Ready</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Collections Selection */}
                {collections.length > 0 && selectedFiles.length > 0 && (
                  <div ref={collectionsDropdownRef} className="relative mt-[24px]">
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
                      className="w-full flex items-center justify-between px-[12px] py-[10px] border border-[#e0e1e6] rounded-[8px] bg-white hover:bg-[#f9fafb] transition-colors"
                    >
                      <span className="text-[13px] text-[#1c2024]">Add to collections (optional)</span>
                      <div className="flex items-center gap-[8px]">
                        {selectedCollectionIds.size > 0 && (
                          <span className="px-[6px] py-[2px] bg-[#005be2] text-white rounded-[4px] text-[11px] font-medium">
                            {selectedCollectionIds.size}
                          </span>
                        )}
                        <ChevronDown className={`size-[16px] text-[#60646c] transition-transform ${isCollectionsDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {isCollectionsDropdownOpen && typeof window !== 'undefined' && createPortal(
                      <div
                        className="fixed border border-[#e0e1e6] rounded-[8px] bg-white shadow-lg overflow-hidden flex flex-col"
                        style={{
                          top: `${dropdownPosition.top}px`,
                          left: `${dropdownPosition.left}px`,
                          width: `${dropdownPosition.width}px`,
                          height: '226px',
                          zIndex: 99999,
                          pointerEvents: 'auto'
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

                {/* Footer Note */}
                <p className="text-[14px] text-[#9ca3af] text-center mt-[24px]">
                  Files under 10MB will get descriptions automatically
                </p>
              </div>
            )}

            {/* Step 3: Uploading Files */}
            {currentStep === 'uploading' && (
              <div className="p-[32px]">
                <div className="mb-[20px]">
                  <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[8px]">Uploading documents...</h3>
                  <p className="text-[12px] text-[#60646c]">
                    {uploadedFiles.filter(f => f.status === 'completed').length} of {uploadedFiles.length} completed
                  </p>
                </div>

                {/* File List */}
                <UploadFileTable files={uploadedFiles} />
              </div>
            )}
          </div>

          {/* Footer */}
          {(currentStep === 'select' || currentStep === 'preview') && (
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec] flex-shrink-0">
              <button
                onClick={onClose}
                className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                onClick={handleStartUpload}
                disabled={!selectedOrganization || selectedOrganization.trim() === '' || selectedFiles.length === 0}
                className={`h-[36px] px-[16px] rounded-[6px] text-[13px] text-white transition-colors ${
                  !selectedOrganization || selectedOrganization.trim() === '' || selectedFiles.length === 0
                    ? 'bg-[#9ca3af] cursor-not-allowed'
                    : 'bg-[#005be2] hover:bg-[#004fc4]'
                }`}
              >
                Add
              </button>
            </div>
          )}
          
          {currentStep === 'uploading' && (
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec] flex-shrink-0">
              <button
                onClick={onClose}
                disabled={uploadedFiles.some(f => f.status === 'uploading')}
                className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadedFiles.every(f => f.status === 'completed') ? 'Close' : 'Cancel'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}