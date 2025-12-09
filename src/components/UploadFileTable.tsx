import svgPaths from "../imports/svg-tmeiqkylpl";
import { MoreVertical } from 'lucide-react';

interface FileInfo {
  file: File;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'failed';
}

interface UploadFileTableProps {
  files: FileInfo[];
}

// Icon Components from Figma
function FileTextIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function TableIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="table">
          <path clipRule="evenodd" d={svgPaths.p159fc8f0} fill="var(--fill-0, #218358)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function PhotoIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="photo">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p196ac680} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p21b2080} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe048200} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MusicIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="music">
          <g id="shape">
            <path d={svgPaths.p2d891172} fill="var(--fill-0, #CE2C31)" />
            <path d={svgPaths.p236c8380} fill="var(--fill-0, #CE2C31)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function LoadingIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_3112)">
          <g id="Vector"></g>
          <path d={svgPaths.p11639d00} id="Vector_2" stroke="var(--stroke-0, #1150B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_18_3112">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check">
          <path clipRule="evenodd" d={svgPaths.p3f7d5d00} fill="var(--fill-0, #218358)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function DotsIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots">
          <path clipRule="evenodd" d={svgPaths.p2e576200} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

// Determine icon and background based on file type
function getFileIcon(fileName: string) {
  const ext = fileName.toLowerCase().split('.').pop() || '';
  
  // Table (green) - .csv, .xls, .xlsm, .xlsx
  if (['csv', 'xls', 'xlsm', 'xlsx'].includes(ext)) {
    return {
      icon: <TableIcon />,
      bgColor: '#e6f6eb',
    };
  }
  
  // Document (blue) - .doc, .docm, .docx, .dotm, .txt, .pdf
  if (['doc', 'docm', 'docx', 'dotm', 'txt', 'pdf'].includes(ext)) {
    return {
      icon: <FileTextIcon />,
      bgColor: '#ebf3ff',
    };
  }
  
  // Image (red/pink) - .bmp, .gif, .hdr, .jpeg, .jpg, .png, .tiff, .webp
  if (['bmp', 'gif', 'hdr', 'jpeg', 'jpg', 'png', 'tiff', 'webp'].includes(ext)) {
    return {
      icon: <PhotoIcon />,
      bgColor: '#fee7e9',
    };
  }
  
  // Audio (red) - .m4p, .mp2, .mp3
  if (['m4p', 'mp2', 'mp3'].includes(ext)) {
    return {
      icon: <MusicIcon />,
      bgColor: '#fee7e9',
    };
  }
  
  // Video (orange/red) - .m4v, .mov, .mp4, .mpe, .mpeg, .mpg, .mpv, .qt, .webm, .wmv
  if (['m4v', 'mov', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'qt', 'webm', 'wmv'].includes(ext)) {
    return {
      icon: <PhotoIcon />,
      bgColor: '#fee7e6',
    };
  }
  
  // Presentation (orange) - .potx, .ppt, .pptx
  if (['potx', 'ppt', 'pptx'].includes(ext)) {
    return {
      icon: <FileTextIcon />,
      bgColor: '#fef0e6',
    };
  }
  
  // Mail (gray) - .eml, .msg
  if (['eml', 'msg'].includes(ext)) {
    return {
      icon: <FileTextIcon />,
      bgColor: '#f5f5f7',
    };
  }
  
  // Other (gray) - default
  return {
    icon: <FileTextIcon />,
    bgColor: '#f5f5f7',
  };
}

export function UploadFileTable({ files }: UploadFileTableProps) {
  return (
    <div className="content-stretch flex isolate items-start overflow-clip relative shrink-0 w-full">
      {/* Name Column */}
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 z-[3]">
        {/* Header */}
        <div className="bg-white h-[36px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center pl-[8px] pr-[16px] py-[16px] relative w-full">
              <div className="absolute bg-[#e8e8ec] h-[14px] right-[-0.5px] top-[11px] w-[2px]" />
              <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap whitespace-pre">Name</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        {files.map((fileInfo, index) => {
          const { icon, bgColor } = getFileIcon(fileInfo.file.name);
          
          return (
            <div key={index} className="bg-white h-[36px] relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
                  <div
                    className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]"
                    style={{ backgroundColor: bgColor }}
                  >
                    {icon}
                  </div>
                  <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">
                    {fileInfo.file.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Column */}
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 z-[2]">
        {/* Header */}
        <div className="bg-white h-[36px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
              <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
                <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap whitespace-pre">Details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        {files.map((fileInfo, index) => {
          if (fileInfo.status === 'uploading') {
            return (
              <div key={index} className="h-[36px] relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                      <LoadingIcon />
                      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#60646c] text-[13px] text-nowrap whitespace-pre">Uploading...</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (fileInfo.status === 'failed') {
            return (
              <div key={index} className="h-[36px] relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-center flex flex-wrap gap-[8px] h-[36px] items-center justify-between px-[16px] py-[8px] relative w-full">
                    <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#ce2c31] text-[13px] text-nowrap whitespace-pre">Upload failed, try again</p>
                  </div>
                </div>
              </div>
            );
          } else {
            // completed
            return (
              <div key={index} className="bg-white h-[36px] relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[32px] py-[8px] relative w-full">
                    <CheckIcon />
                    <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#60646c] text-[13px] text-nowrap whitespace-pre">Uploaded</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Menu Column */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[40px] z-[1]">
        {/* Header */}
        <div className="bg-white h-[36px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center justify-center pl-[8px] pr-[24px] py-[12px] w-full" />
          </div>
        </div>

        {/* Rows */}
        {files.map((_, index) => (
          <div key={index} className="bg-white h-[36px] relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
                <button className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0">
                  <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]">
                    <DotsIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
