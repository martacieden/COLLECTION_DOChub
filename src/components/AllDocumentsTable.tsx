import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { MoreVertical, FileText } from 'lucide-react';
import svgPaths from "../imports/svg-ylbe71kelt";
import { DocumentCard } from './DocumentCard';
import { getOrganizationAvatar } from '../utils/organizationUtils';
import { FilterBar } from './FilterBar';
import { BulkActionsBar } from './BulkActionsBar';
import { QuickFilters } from './QuickFilters';

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
  lastUpdate?: string;
  collectionIds?: string[];
}

interface Organization {
  id: string;
  name: string;
  initials: string;
}

interface Collection {
  id: string;
  title: string;
  icon?: string;
}

interface AllDocumentsTableProps {
  documents?: Document[];
  selectedOrganization?: string;
  onOrganizationChange?: (orgId: string) => void;
  organizations?: Organization[];
  pinnedDocumentIds?: Set<string>;
  onPinToggle?: (docId: string) => void;
  collections?: Collection[];
  onDelete?: (documentIds: string[]) => void;
  onAddToCollection?: (documentIds: string[]) => void;
  onCreateCollection?: (documentIds: string[]) => void;
  onCollectionClick?: (collection: Collection) => void;
}

// FileIcon component для визначення типу файлу та іконки
export function FileIcon({ type }: { type: string }) {
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

// Status badge component
function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;

  const getStatusStyles = () => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('signed') || statusLower.includes('approved') || statusLower.includes('paid')) {
      return 'bg-[#ECFDF5] text-[#059669]';
    } else if (statusLower.includes('pending') || statusLower.includes('waiting')) {
      return 'bg-[#FFF8ED] text-[#B45309]';
    } else if (statusLower.includes('partially')) {
      return 'bg-[#EEF2FF] text-[#4F46E5]';
    }
    return 'bg-[#F9FAFB] text-[#6B7280]';
  };

  // Normalize status text
  const normalizeStatus = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('signed')) return 'Signed';
    if (statusLower.includes('pending') || statusLower.includes('waiting')) return 'Pending';
    if (statusLower.includes('partially')) return 'Partially executed';
    return status;
  };

  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium whitespace-nowrap ${getStatusStyles()}`}>
      {normalizeStatus(status)}
    </span>
  );
}

// Mock documents data - всі документи з усіх колекцій (41 документ)
const organizationsList = [
  'Smith Family Office',
  'Johnson Family Trust',
  "Herwitz's Family",
  'Wayne Estate Management',
  'The Robertson Foundation',
  'Summation Partners',
];

const statuses = ['Signed', 'Pending', 'Partially executed', 'Signed', 'Pending', 'Signed'];

const generateDocument = (id: number, orgIndex: number, statusIndex: number): Document => {
  const org = organizationsList[orgIndex % organizationsList.length];
  const status = statuses[statusIndex % statuses.length];
  const types = ['PDF', 'DOCX', 'XLSX', 'PDF', 'DOCX'];
  const type = types[id % types.length];
  const uploaders = ['Joan Zhao', 'Michael Chen', 'Sarah Miller', 'David Park', 'Alex Smith', 'Michael Kim'];
  const uploader = uploaders[id % uploaders.length];
  const dates = ['Nov 15, 2024', 'Nov 18, 2024', 'Nov 20, 2024', 'Nov 22, 2024', 'Nov 25, 2024', 'Nov 28, 2024', 'Dec 1, 2024', 'Dec 2, 2024', 'Dec 3, 2024'];
  const date = dates[id % dates.length];
  
  const documentNames = [
    'Building Permit - Oak Street Property',
    'General Contractor Agreement - Studio XYZ',
    'Invoice #1247 - Electrical Work Phase 1',
    'Change Order CO-003 - Kitchen Layout',
    'Lien Waiver - ABC Plumbing Inc',
    'Maple Ave - Site Survey Report',
    'Invoice #892 - Foundation Work',
    'Pine Street - HVAC Contract - Signed',
    'Environmental Impact Assessment - Pine St',
    'Trust Agreement_2025',
    'Property Insurance 2025 updated version',
    'Oak Street - Revised Blueprints v3.2',
    'Contract Amendment - Phase 2',
    'Invoice #1250 - Plumbing Work',
    'Site Inspection Report - December',
    'Warranty Documentation - HVAC System',
    'Change Order CO-004 - Bathroom Renovation',
    'Lien Waiver - Electrical Contractor',
    'Building Code Compliance Certificate',
    'Final Payment Invoice - General Contractor',
  ];
  
  const descriptions = [
    'Approved building permit for structural changes and renovations',
    'Executed contract with Studio XYZ for design and construction services',
    'Payment invoice for electrical system upgrade and installation',
    'Scope modification for kitchen design changes and material updates',
    'Unconditional lien waiver for completed plumbing work',
    'Comprehensive site survey and analysis for development project',
    'Invoice for foundation construction work and materials',
    'Executed HVAC installation and maintenance contract',
    'Environmental assessment report for Pine Street development',
    'Legal document outlining terms and conditions of trust',
    'Coverage details and terms for property insurance policy',
    'Architectural plans for main floor renovation and expansion',
    'Contract modification for additional work scope',
    'Invoice for plumbing installation and repair services',
    'Monthly site inspection and progress documentation',
    'Manufacturer warranty and maintenance documentation',
    'Change order for bathroom renovation project',
    'Lien waiver from electrical contractor',
    'Certificate of compliance with local building codes',
    'Final payment invoice for completed general contracting work',
  ];
  
  const attachedToOptions = [
    ['Oak Street Renovation', 'Object record OBJ-31'],
    ['Oak Street Renovation', 'Executed Contracts'],
    ['Oak Street Renovation', 'Financial - Invoices'],
    ['Oak Street Renovation', 'Change Orders'],
    ['Maple Ave Development', 'Architecture & Design'],
    ['Maple Ave Development', 'Financial - Invoices'],
    ['Pine Street Project', 'Executed Contracts'],
    ['Pine Street Project', 'Permits & Approvals'],
    ['Object record OBJ-31', 'Legal Documents'],
    ['Trust Amendment', 'Object record OBJ-31', 'Insurance Documents'],
  ];
  
  const sharedWithOptions = [
    ['Joan Zhao', 'Sarah Miller'],
    ['Michael Kim', 'Legal Team'],
    ['Finance Team', 'Michael Kim'],
    ['Joan Zhao', 'Michael Kim'],
    ['Joan Zhao', 'Legal Team'],
    ['Joan Zhao', 'Alex Smith'],
    ['Joan Zhao', 'Project Team'],
    ['John Doe', 'Legal Team'],
    ['John Doe', 'Jane Smith', 'Insurance Team'],
  ];
  
  return {
    id: `DOC-${String(id).padStart(3, '0')}`,
    name: documentNames[id % documentNames.length],
    description: descriptions[id % descriptions.length],
    type,
    attachedTo: attachedToOptions[id % attachedToOptions.length],
    sharedWith: sharedWithOptions[id % sharedWithOptions.length],
    uploadedBy: uploader,
    uploadedOn: date,
    organization: org,
    signatureStatus: status,
    lastUpdate: date.replace(', ', '-').replace(' ', '-'),
  };
};

const mockDocuments: Document[] = Array.from({ length: 41 }, (_, i) => 
  generateDocument(i, Math.floor(i / 7), i)
);

const defaultOrganizations: Organization[] = [
  { id: 'all', name: 'All organizations', initials: '' },
  { id: 'smith', name: 'Smith Family Office', initials: 'S' },
  { id: 'johnson', name: 'Johnson Family Trust', initials: 'J' },
  { id: 'herwitz', name: "Herwitz's Family", initials: 'H' },
  { id: 'wayne', name: 'Wayne Estate Management', initials: 'W' },
  { id: 'robertson', name: 'The Robertson Foundation', initials: 'T' },
  { id: 'summation', name: 'Summation Partners', initials: 'S' },
];

export function AllDocumentsTable({ 
  documents = mockDocuments, 
  selectedOrganization = 'all',
  onOrganizationChange,
  organizations = defaultOrganizations,
  pinnedDocumentIds,
  onPinToggle,
  collections = [],
  onDelete,
  onAddToCollection,
  onCreateCollection,
  onCollectionClick
}: AllDocumentsTableProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

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

  // Helper functions for Quick Filters
  const currentUser = 'Joan Zhao'; // Поточний користувач

  const isSigned = (doc: Document): boolean => {
    const status = doc.signatureStatus?.toLowerCase() || '';
    return status.includes('signed') || status.includes('executed');
  };

  const isPendingSignature = (doc: Document): boolean => {
    const status = doc.signatureStatus?.toLowerCase() || '';
    return status.includes('pending') || status.includes('review') || !status || status === '';
  };

  const isUploadedByMe = (doc: Document): boolean => {
    return doc.uploadedBy?.toLowerCase() === currentUser.toLowerCase();
  };

  const isSharedWithMe = (doc: Document): boolean => {
    return doc.sharedWith?.some(user => user.toLowerCase() === currentUser.toLowerCase()) || false;
  };

  const isRecentUpload = (doc: Document): boolean => {
    if (!doc.uploadedOn) return false;
    try {
      const docDate = new Date(doc.uploadedOn);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - docDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7 && !isNaN(docDate.getTime());
    } catch {
      return false;
    }
  };

  // Filter documents based on search query, organization, and quick filter
  const filteredDocuments = documents.filter(doc => {
    // Filter by organization
    if (selectedOrganization && selectedOrganization !== 'all') {
      const org = organizations.find(o => o.id === selectedOrganization);
      if (org && doc.organization !== org.name) {
        return false;
      }
    }
    
    // Filter by active Quick Filter
    if (activeQuickFilter) {
      let matchesQuickFilter = false;
      switch (activeQuickFilter) {
        case 'signed':
          matchesQuickFilter = isSigned(doc);
          break;
        case 'pending-signature':
          matchesQuickFilter = isPendingSignature(doc);
          break;
        case 'uploaded-by-me':
          matchesQuickFilter = isUploadedByMe(doc);
          break;
        case 'shared-with-me':
          matchesQuickFilter = isSharedWithMe(doc);
          break;
        case 'recent-uploads':
          matchesQuickFilter = isRecentUpload(doc);
          break;
        default:
          matchesQuickFilter = true;
      }
      if (!matchesQuickFilter) return false;
    }
    
    // Filter by search query
    if (filterQuery.trim() === '') return true;
    const query = filterQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query) ||
           (doc.description?.toLowerCase().includes(query)) ||
           doc.type.toLowerCase().includes(query) ||
           (doc.attachedTo?.some(item => item.toLowerCase().includes(query))) ||
           (doc.sharedWith?.some(item => item.toLowerCase().includes(query))) ||
           (doc.uploadedBy?.toLowerCase().includes(query)) ||
           (doc.organization?.toLowerCase().includes(query)) ||
           (doc.signatureStatus?.toLowerCase().includes(query));
  });

  // Count visible columns in table view
  const visibleColumnsCount = 11; // Checkbox + Name + Description + Type + Attached to + Shared with + Uploaded by + Uploaded on + Organization + Signature status + Actions

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

  const handleQuickFilterClick = (filterId: string | null) => {
    setActiveQuickFilter(filterId);
    // Очистити text filter при виборі Quick Filter для кращого UX
    if (filterId) {
      setFilterQuery('');
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
          visibleColumnsCount={viewMode === 'table' ? visibleColumnsCount : undefined}
        />

        {/* Quick Filters */}
        <QuickFilters
          documents={documents}
          activeFilter={activeQuickFilter}
          onFilterClick={handleQuickFilterClick}
          currentUser={currentUser}
        />

        {/* Bulk Actions Bar */}
        {selectedDocuments.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedDocuments.length}
            onClearSelection={() => setSelectedDocuments([])}
            onPinToggle={handlePinToggle}
            hasQuickFilters={true}
            onAddToCollection={onAddToCollection ? () => onAddToCollection(selectedDocuments) : undefined}
            onCreateCollection={onCreateCollection ? () => onCreateCollection(selectedDocuments) : undefined}
            onDelete={() => {
              if (onDelete && selectedDocuments.length > 0) {
                onDelete(selectedDocuments);
                setSelectedDocuments([]);
              }
            }}
            onExport={() => {}}
            onShare={() => {}}
          />
        )}

        {/* Documents Content */}
        <div className="pb-[16px] pt-[16px] min-w-0 flex flex-col">

        {filteredDocuments.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center pt-[24px]">
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
                  onCollectionClick={onCollectionClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex-1 min-w-0 overflow-x-auto overflow-y-auto">
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
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[180px]">Attached to</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Shared with</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[130px]">Uploaded by</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Uploaded on</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[150px]">Organization</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[140px]">Signature status</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[180px]">Collections</th>
                  <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[56px]"></th>
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
                    <td className="p-2 align-middle">
                      <div className="flex flex-wrap gap-[4px]">
                        {(doc.attachedTo || []).slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[12px] text-[#1c2024]"
                          >
                            <FileText className="w-[12px] h-[12px] text-[#60646c]" />
                            {item}
                          </span>
                        ))}
                        {(doc.attachedTo || []).length > 2 && (
                          <span className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[12px] text-[#60646c]">
                            +{(doc.attachedTo || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 align-middle">
                      <div className="flex -space-x-[6px]">
                        {(doc.sharedWith || []).slice(0, 3).map((name, i) => {
                          const initials = name.split(' ').map(n => n[0]).join('');
                          return (
                            <div
                              key={i}
                              className="w-[24px] h-[24px] rounded-full bg-[#e0e1e6] border-2 border-white flex items-center justify-center text-[10px] text-[#60646c]"
                            >
                              {initials}
                            </div>
                          );
                        })}
                        {(doc.sharedWith || []).length > 3 && (
                          <div className="w-[24px] h-[24px] rounded-full bg-[#f0f0f3] border-2 border-white flex items-center justify-center text-[10px] text-[#60646c]">
                            +{(doc.sharedWith || []).length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[24px] h-[24px] rounded-full bg-[#dbeafe] flex items-center justify-center text-[10px] text-[#1e40af]">
                          {doc.uploadedBy?.split(' ').map(n => n[0]).join('') || 'JZ'}
                        </div>
                        <span className="text-[13px] text-[#1c2024]">{doc.uploadedBy || 'Joan Zhao'}</span>
                      </div>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-[13px] text-[#1c2024]">{doc.uploadedOn || new Date(doc.lastUpdate || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      {(() => {
                        const orgName = doc.organization || 'Summation Partners';
                        const orgAvatar = getOrganizationAvatar(orgName);
                        return (
                          <div className="flex items-center gap-[8px]">
                            <div 
                              className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-medium"
                              style={{ backgroundColor: orgAvatar.color }}
                            >
                              {orgAvatar.initial}
                            </div>
                            <span className="text-[13px] text-[#1c2024]">{orgName}</span>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <StatusBadge status={doc.signatureStatus} />
                    </td>
                    <td className="p-2 align-middle">
                      <div className="flex flex-wrap gap-[4px]">
                        {(() => {
                          const docCollections = collections.filter(col => 
                            doc.collectionIds?.includes(col.id)
                          );
                          
                          if (docCollections.length === 0) {
                            return <span className="text-[13px] text-[#8b8d98]">-</span>;
                          }
                          
                          return docCollections.slice(0, 2).map((col) => (
                            <span
                              key={col.id}
                              className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] bg-[#f0f0f3] border border-[#e0e1e6] text-[12px] text-[#1c2024]"
                            >
                              {col.icon && <span>{col.icon}</span>}
                              <span className="truncate max-w-[120px]">{col.title}</span>
                            </span>
                          )).concat(
                            docCollections.length > 2 ? (
                              <span
                                key="more"
                                className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[12px] text-[#60646c]"
                                title={docCollections.slice(2).map(c => c.title).join(', ')}
                              >
                                +{docCollections.length - 2}
                              </span>
                            ) : []
                          );
                        })()}
                      </div>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <button className="p-[4px] hover:bg-[#f0f0f3] rounded-[4px] transition-colors">
                        <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
