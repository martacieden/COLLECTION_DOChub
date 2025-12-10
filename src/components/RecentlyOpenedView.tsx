import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { FilterBar } from './FilterBar';
import { BulkActionsBar } from './BulkActionsBar';
import { DocumentCard } from './DocumentCard';
import { FileText } from 'lucide-react';
import svgPaths from "../imports/svg-ylbe71kelt";

interface Document {
  id: string;
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
  collectionIds?: string[];
}

interface Collection {
  id: string;
  title: string;
  icon?: string;
}

interface RecentlyOpenedViewProps {
  documents?: Document[];
  pinnedDocumentIds?: Set<string>;
  onPinToggle?: (docId: string) => void;
  collections?: Collection[];
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
    id: 'DOC-001',
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
    id: 'DOC-002',
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
    id: 'DOC-003',
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
    id: 'DOC-004',
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
    id: 'DOC-005',
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
    id: 'DOC-006',
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
    id: 'DOC-007',
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
    id: 'DOC-008',
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
  documents = mockDocuments,
  pinnedDocumentIds,
  onPinToggle,
  collections = []
}: RecentlyOpenedViewProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
    }
  };

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => {
    if (filterQuery.trim() === '') return true;
    const query = filterQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query) ||
           (doc.description?.toLowerCase().includes(query)) ||
           doc.type.toLowerCase().includes(query) ||
           (doc.attachedTo?.some(item => item.toLowerCase().includes(query))) ||
           (doc.sharedWith?.some(item => item.toLowerCase().includes(query))) ||
           (doc.uploadedBy?.toLowerCase().includes(query)) ||
           (doc.organization?.toLowerCase().includes(query)) ||
           (doc.signatureStatus?.toLowerCase().includes(query)) ||
           (doc.lastOpened?.toLowerCase().includes(query));
  });

  const handlePinToggle = () => {
    if (onPinToggle) {
      // Toggle pin status for all selected documents
      selectedDocuments.forEach(docId => {
        onPinToggle(docId);
      });
      // Clear selection after pinning/unpinning
      setSelectedDocuments([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
      {/* Documents Table with Scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 flex flex-col relative">
        {/* Filter Bar */}
        <FilterBar
          filterQuery={filterQuery}
          onFilterChange={setFilterQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Bulk Actions Bar */}
        {selectedDocuments.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedDocuments.length}
            onClearSelection={() => setSelectedDocuments([])}
            onPinToggle={handlePinToggle}
            hasQuickFilters={false}
            onMove={() => {}}
            onRename={() => {}}
            onDownload={() => {}}
          />
        )}

        {/* Documents Content */}
        <div className="pb-[16px] pt-[16px] min-w-0 flex flex-col">
          {filteredDocuments.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[28px] grid place-items-center mb-[16px]">
                <FileText className="size-[16px]" />
              </div>
              <div className="text-[#60646c]">
                <h2 className="text-[16px] font-medium mb-[4px]">No documents to show</h2>
                <p className="text-[13px] leading-[20px]">Upload a document to get started</p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] p-[24px]">
              {filteredDocuments.map((doc) => {
                // Знайти колекції, до яких належить документ
                const docCollections = collections.filter(col => 
                  doc.collectionIds?.includes(col.id)
                );
                
                return (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    isSelected={selectedDocuments.includes(doc.id)}
                    onSelect={handleSelectDocument}
                    isPinned={pinnedDocumentIds?.has(doc.id) || false}
                    collections={docCollections}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex-1 min-w-0 overflow-x-auto overflow-y-auto">
              <div className="px-[24px]">
                <table className="caption-bottom text-sm w-full" style={{ minWidth: 'max-content' }}>
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors">
                      <th className="h-10 px-2 text-left align-middle w-[40px] min-w-[40px]">
                        <Checkbox
                          checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[150px]">Name</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[180px]">Description</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[70px]">Type</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Last opened</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Uploaded on</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[140px]">Signature status</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b transition-colors hover:bg-[#f9fafb] cursor-pointer">
                        <td className="p-2 align-middle" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => handleSelectDocument(doc.id)}
                          />
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          <div className="flex items-center gap-[8px]">
                            <FileIcon type={doc.type} />
                            <span className="text-[13px] text-[#1c2024]">{doc.name}</span>
                          </div>
                        </td>
                        <td className="p-2 align-middle">
                          <span className="text-[13px] text-[#60646c] truncate block max-w-[220px]">{doc.description || '-'}</span>
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          <span className="text-[13px] text-[#1c2024]">{doc.type}</span>
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          <span className="text-[13px] text-[#1c2024]">{doc.lastOpened || '-'}</span>
                        </td>
                        <td className="p-2 align-middle whitespace-nowrap">
                          <span className="text-[13px] text-[#1c2024]">{doc.uploadedOn || '-'}</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

