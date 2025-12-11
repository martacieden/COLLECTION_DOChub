import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { UploadFileTable } from './UploadFileTable';
import { toast } from 'sonner';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (files: FileInfo[], collections: string[]) => void;
  collectionOrganization?: string;
}

interface FileInfo {
  file: File;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'failed';
}

type UploadStep = 'select' | 'uploading';

const organizations = [
  { id: 1, name: 'Smith Family Office', initial: 'S', color: '#FF6B6B' },
  { id: 2, name: 'Johnson Family Trust', initial: 'J', color: '#4ECDC4' },
  { id: 3, name: "Herwitz's Family", initial: 'H', color: '#45B7D1' },
  { id: 4, name: 'Wayne Estate Management', initial: 'W', color: '#FFA07A' },
  { id: 5, name: 'The Robertson Foundation', initial: 'T', color: '#98D8C8' }
];

export function UploadModal({ isOpen, onClose, onComplete, collectionOrganization }: UploadModalProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>('select');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isOrgDropdownOpenUploading, setIsOrgDropdownOpenUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const orgDropdownUploadingRef = useRef<HTMLDivElement>(null);

  // Auto-select organization from collection when modal opens
  useEffect(() => {
    if (isOpen && collectionOrganization) {
      // Check if the organization exists in the list
      const orgExists = organizations.find(org => org.name === collectionOrganization);
      if (orgExists) {
        setSelectedOrganization(collectionOrganization);
      }
    } else if (isOpen && !collectionOrganization) {
      // Reset to empty when opening without collection
      setSelectedOrganization('');
    }
  }, [isOpen, collectionOrganization]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(event.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
      if (orgDropdownUploadingRef.current && !orgDropdownUploadingRef.current.contains(event.target as Node)) {
        setIsOrgDropdownOpenUploading(false);
      }
    };

    if (isOrgDropdownOpen || isOrgDropdownOpenUploading) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOrgDropdownOpen, isOrgDropdownOpenUploading]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const fileInfos: FileInfo[] = files.map(file => ({
      file,
      uploadProgress: 0,
      status: 'uploading' as const
    }));
    
    setUploadedFiles(prev => [...prev, ...fileInfos]);
    setCurrentStep('uploading');

    // Simulate upload progress
    fileInfos.forEach((fileInfo, startIndex) => {
      const index = uploadedFiles.length + startIndex;
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => {
          const updated = [...prev];
          if (updated[index] && updated[index].uploadProgress < 100) {
            updated[index].uploadProgress += 20;
          } else if (updated[index]) {
            updated[index].status = 'completed';
            clearInterval(progressInterval);
          }
          return updated;
        });
      }, 300);
    });
  };

  const handleComplete = () => {
    if (uploadedFiles.length > 0) {
      const fileCount = uploadedFiles.length;
      
      // Show upload success toast
      toast.success(
        `${fileCount} ${fileCount === 1 ? 'document' : 'documents'} uploaded successfully`
      );
      
      onComplete(uploadedFiles, []);
      // Reset state
      setCurrentStep('select');
      setUploadedFiles([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <div className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl transition-all h-[650px] w-[850px] max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <h2 className="text-[#1c2024]">Upload documents</h2>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col w-full">

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Step 1: Select Files */}
            {currentStep === 'select' && (
              <div className="p-[32px]">
                {/* Organization Dropdown */}
                <div className="mb-[24px]">
                  <label className="block text-[14px] text-[#1c2024] mb-[8px]">
                    Choose organization <span className="text-[#d4183d]">*</span>
                  </label>
                  <div className="relative" ref={orgDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                      className="w-full h-[48px] px-[16px] pr-[40px] border border-[#e0e1e6] rounded-[8px] text-[15px] text-left appearance-none focus:outline-none focus:ring-2 focus:ring-[#005be2] bg-white"
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
                  className="border-2 border-dashed border-[#e0e1e6] rounded-[12px] p-[80px_32px] flex flex-col items-center justify-center cursor-pointer hover:border-[#005be2] hover:bg-[#fafafa] transition-all min-h-[300px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <p className="text-[15px] text-[#1c2024] mb-[8px]">
                      Drag & drop your files or{' '}
                      <span className="text-[#005be2] underline cursor-pointer">Browse</span>
                    </p>
                    <p className="text-[14px] text-[#9ca3af]">
                      Supports documents, images, audio, video and more
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

                {/* Footer Note */}
                <p className="text-[14px] text-[#9ca3af] text-center mt-[24px]">
                  Files under 10MB will get descriptions automatically
                </p>
              </div>
            )}

            {/* Step 2: Uploading Files */}
            {currentStep === 'uploading' && (
              <div className="p-[24px]">
                {/* Organization Info */}
                <div className="mb-[20px]">
                  <label className="block text-[14px] text-[#1c2024] mb-[8px]">
                    Choose organization <span className="text-[#d4183d]\">*</span>
                  </label>
                  <div className="relative" ref={orgDropdownUploadingRef}>
                    <button
                      type="button"
                      onClick={() => setIsOrgDropdownOpenUploading(!isOrgDropdownOpenUploading)}
                      className="w-full h-[48px] px-[16px] pr-[40px] border border-[#e0e1e6] rounded-[8px] text-[15px] text-left appearance-none focus:outline-none focus:ring-2 focus:ring-[#005be2] bg-white"
                    >
                      <span className={selectedOrganization ? 'text-[#1c2024]' : 'text-[#9ca3af]'}>
                        {selectedOrganization || 'Where should this document live?'}
                      </span>
                    </button>
                    <ChevronDown className="size-[20px] text-[#9ca3af] absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    {/* Dropdown Menu */}
                    {isOrgDropdownOpenUploading && (
                      <div className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#e0e1e6] rounded-[8px] shadow-lg z-50 py-[8px] max-h-[300px] overflow-y-auto">
                        {organizations.map(org => (
                          <button
                            key={org.id}
                            type="button"
                            onClick={() => {
                              setSelectedOrganization(org.name);
                              setIsOrgDropdownOpenUploading(false);
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

                {/* Drop Zone - Compact */}
                <div 
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#e0e1e6] rounded-[8px] p-[20px] text-center mb-[20px] cursor-pointer hover:border-[#005be2] hover:bg-[#fafafa] transition-all"
                >
                  <p className="text-[14px] text-[#9ca3af]">
                    Drop more files here or{' '}
                    <span className="text-[#005be2] underline cursor-pointer">Browse</span>
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* File List */}
                <UploadFileTable files={uploadedFiles} />
              </div>
            )}
          </div>

          {/* Footer - Show when files are uploaded */}
          {currentStep === 'uploading' && (
            <div className="flex items-center justify-end gap-[12px] px-[24px] py-[16px] border-t border-[#e8e8ec]">
              <button
                onClick={onClose}
                className="h-[36px] px-[16px] rounded-[6px] text-[13px] border border-[#e0e1e6] text-[#1c2024] hover:bg-[#f9fafb]"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                className="h-[36px] px-[16px] rounded-[6px] text-[13px] bg-[#005be2] text-white hover:bg-[#004fc4]"
              >
                Add
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}