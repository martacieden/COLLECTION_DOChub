import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import svgPaths from "../imports/svg-ylbe71kelt";

interface Document {
  name: string;
  description?: string;
  type: string;
  attachedTo?: string[];
  sharedWith?: string[];
  uploadedBy?: string;
  uploadedOn?: string;
  organization?: string;
  signatureStatus?: string;
  lastOpened?: string;
}

interface RecentlyOpenedViewProps {
  documents?: Document[];
}

// FileIcon component
function FileIcon({ type }: { type: string }) {
  const ext = type.toLowerCase();
  
  const getIconType = () => {
    if (['csv', 'xls', 'xlsm', 'xlsx'].includes(ext)) return 'table';
    if (['doc', 'docm', 'docx', 'dotm', 'txt', 'pdf'].includes(ext)) return 'document';
    if (['bmp', 'gif', 'hdr', 'jpeg', 'jpg', 'png', 'tiff', 'webp'].includes(ext)) return 'image';
    if (['m4p', 'mp2', 'mp3'].includes(ext)) return 'audio';
    if (['m4v', 'mov', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'qt', 'webm', 'wmv'].includes(ext)) return 'video';
    if (['potx', 'ppt', 'pptx'].includes(ext)) return 'presentation';
    if (['eml', 'msg'].includes(ext)) return 'mail';
    return 'other';
  };

  const iconType = getIconType();

  const getIconConfig = () => {
    switch (iconType) {
      case 'table':
        return {
          bgColor: 'bg-[#E6F6EB]',
          color: 'text-[#218358]',
          svg: <path clipRule="evenodd" d={svgPaths.p153eb300} fill="currentColor" fillRule="evenodd" />
        };
      case 'document':
        return {
          bgColor: 'bg-[#EBF3FF]',
          color: 'text-[#1150B9]',
          svg: <path clipRule="evenodd" d={svgPaths.p2019600} fill="currentColor" fillRule="evenodd" />
        };
      case 'image':
        return {
          bgColor: 'bg-[#FEE7E9]',
          color: 'text-[#CE2C31]',
          svg: (
            <>
              <path clipRule="evenodd" d={svgPaths.p196ac680} fill="currentColor" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p21b2080} fill="currentColor" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pe048200} fill="currentColor" fillRule="evenodd" />
            </>
          )
        };
      case 'audio':
        return {
          bgColor: 'bg-[#FEE7E9]',
          color: 'text-[#CE2C31]',
          svg: (
            <>
              <path d={svgPaths.p2d891172} fill="currentColor" />
              <path d={svgPaths.p236c8380} fill="currentColor" />
            </>
          )
        };
      case 'video':
        return {
          bgColor: 'bg-[#FEE7E6]',
          color: 'text-[#CE2C31]',
          svg: <path clipRule="evenodd" d={svgPaths.p196ac680} fill="currentColor" fillRule="evenodd" />
        };
      case 'presentation':
        return {
          bgColor: 'bg-[#FEF0E6]',
          color: 'text-[#D24726]',
          svg: <path clipRule="evenodd" d={svgPaths.p2019600} fill="currentColor" fillRule="evenodd" />
        };
      case 'mail':
        return {
          bgColor: 'bg-[#F5F5F7]',
          color: 'text-[#60646C]',
          svg: <path clipRule="evenodd" d={svgPaths.p2019600} fill="currentColor" fillRule="evenodd" />
        };
      default:
        return {
          bgColor: 'bg-[#F5F5F7]',
          color: 'text-[#60646C]',
          svg: <path clipRule="evenodd" d={svgPaths.p2019600} fill="currentColor" fillRule="evenodd" />
        };
    }
  };

  const config = getIconConfig();

  return (
    <div className={`size-[24px] flex flex-col items-center justify-center rounded-[6px] ${config.bgColor}`}>
      <svg className={`size-[16px] ${config.color}`} fill="none" viewBox="0 0 16 16">
        {config.svg}
      </svg>
    </div>
  );
}

// Mock documents data
const mockDocuments: Document[] = [
  {
    name: 'Oak Street - Revised Blueprints v3.2',
    description: 'Architectural plans for main floor renovation...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Architecture & Design'],
    sharedWith: ['Joan Zhao'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 28, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Approved',
    lastOpened: '2 hours ago'
  },
  {
    name: 'Building Permit - Oak Street Property',
    description: 'Approved building permit for structural changes...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation'],
    sharedWith: ['Joan Zhao'],
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Nov 25, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Signed',
    lastOpened: '5 hours ago'
  },
  {
    name: 'General Contractor Agreement - Studio XYZ',
    description: 'Executed contract with Studio XYZ for design...',
    type: 'DOCX',
    attachedTo: ['Oak Street Renovation', 'Executed Contracts'],
    sharedWith: ['Sarah Miller'],
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Dec 1, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Waiting for Signature',
    lastOpened: '1 day ago'
  },
  {
    name: 'Invoice #1247 - Electrical Work Phase 1',
    description: 'Payment invoice for electrical system upgrade...',
    type: 'XLSX',
    attachedTo: ['Oak Street Renovation', 'Financial - Invoices'],
    sharedWith: ['David Park'],
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 20, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Paid',
    lastOpened: '2 days ago'
  },
  {
    name: 'Change Order CO-003 - Kitchen Layout',
    description: 'Scope modification for kitchen design changes...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Change Orders'],
    sharedWith: ['Joan Zhao'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Dec 2, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Waiting for Signature',
    lastOpened: '3 days ago'
  },
  {
    name: 'Lien Waiver - ABC Plumbing Inc',
    description: 'Unconditional lien waiver for completed plumbing...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Lien Waivers'],
    sharedWith: ['Michael Chen'],
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Dec 3, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Waiting for Signature',
    lastOpened: '4 days ago'
  },
  {
    name: 'Certificate of Occupancy - Final',
    description: 'Final CO approval for renovated property...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation'],
    sharedWith: ['Joan Zhao'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Dec 5, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Approved',
    lastOpened: '1 week ago'
  },
  {
    name: 'Maple Ave - Site Survey Report',
    description: 'Topographical survey for new construction site...',
    type: 'PDF',
    attachedTo: ['Maple Ave Development', 'Architecture & Design'],
    sharedWith: ['John Doe'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 18, 2024',
    organization: 'Summation Partners',
    signatureStatus: 'Approved',
    lastOpened: '1 week ago'
  }
];

export function RecentlyOpenedView({ 
  documents = mockDocuments
}: RecentlyOpenedViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // For now, show all documents (filtering will be handled by Filters button later)
  const filteredDocuments = documents;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Filter Bar */}
      <div className="border-b border-[#e8e8ec] bg-white min-w-0 w-full max-w-full">
        <div className="px-[64px] py-[12px] min-w-0">
          <div className="flex items-center justify-between min-w-0">
            {/* Filters Button */}
            <button className="h-[32px] px-[8px] flex items-center gap-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] bg-white">
              <SlidersHorizontal className="size-[16px] text-[#60646c]" />
              <span className="text-[12px] font-semibold">Filters</span>
            </button>

            {/* View Toggle */}
            <div className="flex items-center border border-[#e0e1e6] rounded-[6px]">
              <button
                onClick={() => setViewMode('list')}
                className={`h-[32px] w-[32px] flex items-center justify-center rounded-l-[6px] transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#f0f0f3] text-[#1c2024]'
                    : 'text-[#60646c] hover:bg-[#f9fafb]'
                }`}
              >
                <List className="size-[16px]" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`h-[32px] w-[32px] flex items-center justify-center rounded-r-[6px] transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#f0f0f3] text-[#1c2024]'
                    : 'text-[#60646c] hover:bg-[#f9fafb]'
                }`}
              >
                <Grid3x3 className="size-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto px-[64px] py-[16px]">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
            {filteredDocuments.map((doc, index) => (
              <div
                key={index}
                className="border border-[#e0e1e6] rounded-[8px] overflow-hidden hover:border-[#005be2] hover:shadow-sm transition-all cursor-pointer bg-white"
              >
                {/* Icon and Type Section */}
                <div className="bg-[#f5f5f7] h-[100px] flex flex-col items-center justify-center gap-[6px]">
                  <FileIcon type={doc.type} />
                  <span className="text-[10px] text-[#8b8d98] uppercase tracking-wider">{doc.type}</span>
                </div>
                
                {/* Content Section */}
                <div className="p-[12px]">
                  <h3 className="text-[13px] text-[#1c2024] mb-[4px] line-clamp-1 font-medium">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-[#8b8d98] line-clamp-2">
                    {doc.description || '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors">
                  <th className="h-10 px-2 text-left align-middle w-[40px]">
                    <Checkbox />
                  </th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Name</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Description</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Type</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Last opened</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Uploaded on</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Signature status</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredDocuments.map((doc, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-[#f9fafb] cursor-pointer">
                    <td className="p-2 align-middle">
                      <Checkbox />
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-[8px]">
                        <FileIcon type={doc.type} />
                        <span className="text-[13px] text-[#1c2024]">{doc.name}</span>
                      </div>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-[13px] text-[#60646c]">{doc.description || '-'}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-[13px] text-[#1c2024]">{doc.type}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-[13px] text-[#60646c]">{doc.lastOpened || '-'}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-[13px] text-[#60646c]">{doc.uploadedOn || '-'}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {doc.signatureStatus && (
                        <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium whitespace-nowrap ${
                          doc.signatureStatus.toLowerCase().includes('signed') || doc.signatureStatus.toLowerCase().includes('approved') || doc.signatureStatus.toLowerCase().includes('paid')
                            ? 'bg-[#ECFDF5] text-[#059669]'
                            : doc.signatureStatus.toLowerCase().includes('pending') || doc.signatureStatus.toLowerCase().includes('waiting')
                            ? 'bg-[#FFF8ED] text-[#B45309]'
                            : 'bg-[#F5F5F7] text-[#60646c]'
                        }`}>
                          {doc.signatureStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

