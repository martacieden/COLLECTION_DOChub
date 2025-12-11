import { useState, useEffect } from 'react';
import { FileText, MoreVertical, Info } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { getOrganizationAvatar } from '../utils/organizationUtils';

interface Document {
  name: string;
  description: string;
  type: string;
  attachedTo: string[];
  shared: string[];
  icon: string;
  status?: string;
  uploadedBy?: string;
  uploadedOn?: string;
  organization?: string;
}

interface AllColumnsTableProps {
  documents?: Document[];
}

// File type icon component
function FileTypeIcon({ type }: { type: string }) {
  const ext = type.toLowerCase();
  
  const getIconStyles = () => {
    // Table - .csv, .xls, .xlsm, .xlsx
    if (['csv', 'xls', 'xlsm', 'xlsx'].includes(ext)) {
      return { bg: 'bg-[#E6F6EB]', color: 'text-[#218358]' };
    }
    
    // Document - .doc, .docm, .docx, .dotm, .txt, .pdf
    if (['doc', 'docm', 'docx', 'dotm', 'txt', 'pdf'].includes(ext)) {
      return { bg: 'bg-[#EBF3FF]', color: 'text-[#1150B9]' };
    }
    
    // Image
    if (['bmp', 'gif', 'hdr', 'jpeg', 'jpg', 'png', 'tiff', 'webp'].includes(ext)) {
      return { bg: 'bg-[#FEE7E9]', color: 'text-[#CE2C31]' };
    }
    
    // Audio
    if (['m4p', 'mp2', 'mp3'].includes(ext)) {
      return { bg: 'bg-[#FEE7E9]', color: 'text-[#CE2C31]' };
    }
    
    // Video
    if (['m4v', 'mov', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'qt', 'webm', 'wmv'].includes(ext)) {
      return { bg: 'bg-[#FEE7E6]', color: 'text-[#CE2C31]' };
    }
    
    // Default
    return { bg: 'bg-[#F5F5F7]', color: 'text-[#60646C]' };
  };

  const styles = getIconStyles();
  
  return (
    <div className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center ${styles.bg}`}>
      <FileText className={`w-[14px] h-[14px] ${styles.color}`} />
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;

  const getStatusStyles = () => {
    switch (status) {
      case 'Waiting for Signature':
      case 'Pending':
        return 'bg-[#FFF8ED] text-[#B45309]';
      case 'Signed':
        return 'bg-[#ECFDF5] text-[#059669]';
      case 'Approved':
        return 'bg-[#ECFDF5] text-[#059669]';
      case 'In Review':
        return 'bg-[#EFF6FF] text-[#1E40AF]';
      case 'Paid':
        return 'bg-[#ECFDF5] text-[#059669]';
      case 'Pending Payment':
        return 'bg-[#FFF8ED] text-[#B45309]';
      case 'Partially executed':
        return 'bg-[#EEF2FF] text-[#4F46E5]';
      case 'Active':
        return 'bg-[#EFF6FF] text-[#1E40AF]';
      default:
        return 'bg-[#F9FAFB] text-[#6B7280]';
    }
  };

  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium whitespace-nowrap ${getStatusStyles()}`}>
      {status}
    </span>
  );
}

export function AllColumnsTable({ documents = [] }: AllColumnsTableProps) {
  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  const [recentlyAddedIndices, setRecentlyAddedIndices] = useState(new Set<number>());
  const [documentsLength, setDocumentsLength] = useState(documents.length);
  const [columnWidths, setColumnWidths] = useState<{ [key: number]: number }>({
    0: 56,   // Checkbox
    1: 280,  // Name
    2: 240,  // Description
    3: 120,  // Type
    4: 240,  // Attached to
    5: 140,  // Shared with
    6: 160,  // Uploaded by
    7: 140,  // Uploaded on
    8: 180,  // Organization
    9: 160,  // Signature status
    10: 56,  // Actions
  });
  const [resizingColumn, setResizingColumn] = useState<number | null>(null);

  // Track newly added documents
  useEffect(() => {
    if (documents.length > documentsLength) {
      // New documents were added
      const newIndices = new Set<number>();
      const numNewDocs = documents.length - documentsLength;
      
      // Highlight newly added documents (at the beginning)
      for (let i = 0; i < numNewDocs; i++) {
        newIndices.add(i);
      }
      
      setRecentlyAddedIndices(newIndices);
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setRecentlyAddedIndices(new Set());
      }, 3000);
    }
    
    setDocumentsLength(documents.length);
  }, [documents.length]);

  const toggleRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === documents.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(documents.map((_, i) => i)));
    }
  };

  // Handle column resizing
  const handleMouseDown = (columnIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    setResizingColumn(columnIndex);
    const startX = e.pageX;
    const startWidth = columnWidths[columnIndex] || 200;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.pageX - startX;
      const newWidth = Math.max(80, startWidth + diff);
      setColumnWidths(prev => ({
        ...prev,
        [columnIndex]: newWidth
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Calculate total table width from column widths
  const totalWidth = Object.values(columnWidths).reduce((sum, width) => sum + width, 0);

  return (
    <div className="min-w-max">
      <table className="border-collapse" style={{ tableLayout: 'fixed', width: `${totalWidth}px`, minWidth: `${totalWidth}px` }}>
          <thead className="bg-[#fcfcfd] sticky top-0 z-10">
            <tr className="border-b border-[#e8e8ec]">
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[0]}px`, minWidth: '56px' }}
              >
                <Checkbox
                  checked={documents.length > 0 && selectedRows.size === documents.length}
                  onCheckedChange={toggleAll}
                />
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(0, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[1]}px`, minWidth: '280px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Name</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(1, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[2]}px`, minWidth: '240px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Description</span>
                  <button className="p-[4px]">
                    <Info className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(2, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[3]}px`, minWidth: '120px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Type</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(3, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[4]}px`, minWidth: '240px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Attached to</span>
                  <button className="p-[4px]">
                    <Info className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(4, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[5]}px`, minWidth: '140px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Shared with</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(5, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[6]}px`, minWidth: '160px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Uploaded by</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(6, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[7]}px`, minWidth: '140px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Uploaded on</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(7, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[8]}px`, minWidth: '180px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Organization</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(8, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] text-left relative" 
                style={{ width: `${columnWidths[9]}px`, minWidth: '160px' }}
              >
                <div className="flex items-center gap-[16px]">
                  <span className="text-[13px] text-[#80838d] font-medium">Signature status</span>
                  <button className="p-[4px]">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </div>
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(9, e)}
                />
              </th>
              <th 
                className="px-[16px] py-[8px] relative" 
                style={{ width: `${columnWidths[10]}px`, minWidth: '56px' }}
              >
                <div
                  className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#005be2] opacity-0 hover:opacity-100 transition-opacity"
                  onMouseDown={(e) => handleMouseDown(10, e)}
                />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {documents.map((doc, index) => (
              <tr 
                key={index} 
                className={`border-b border-[#e8e8ec] hover:bg-[#f9fafb] transition-all duration-300 ${
                  recentlyAddedIndices.has(index) ? 'bg-[#f0f7ff] animate-[fadeIn_0.5s_ease-in]' : ''
                }`}
              >
                <td className="px-[16px] py-[8px]">
                  <Checkbox
                    checked={selectedRows.has(index)}
                    onCheckedChange={() => toggleRow(index)}
                  />
                </td>
                <td className="px-[16px] py-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <FileTypeIcon type={doc.type} />
                    <span className="text-[13px] text-[#1c2024] truncate max-w-[240px]">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="px-[16px] py-[8px]">
                  <span className="text-[13px] text-[#60646c] truncate max-w-[220px] block">
                    {doc.description}
                  </span>
                </td>
                <td className="px-[16px] py-[8px]">
                  <span className="text-[13px] text-[#1c2024]">{doc.type}</span>
                </td>
                <td className="px-[16px] py-[8px]">
                  <div className="flex flex-wrap gap-[4px]">
                    {doc.attachedTo.slice(0, 2).map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[12px] text-[#1c2024]"
                      >
                        <FileText className="w-[12px] h-[12px] text-[#60646c]" />
                        {item}
                      </span>
                    ))}
                    {doc.attachedTo.length > 2 && (
                      <span className="inline-flex items-center px-[6px] py-[2px] rounded-[4px] bg-white border border-[#e0e1e6] text-[12px] text-[#60646c]">
                        +{doc.attachedTo.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-[16px] py-[8px]">
                  <div className="flex -space-x-[6px]">
                    {doc.shared.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className="w-[24px] h-[24px] rounded-full bg-[#e0e1e6] border-2 border-white flex items-center justify-center text-[10px] text-[#60646c]"
                      >
                        {['J', 'M', 'S'][i]}
                      </div>
                    ))}
                    {doc.shared.length > 3 && (
                      <div className="w-[24px] h-[24px] rounded-full bg-[#f0f0f3] border-2 border-white flex items-center justify-center text-[10px] text-[#60646c]">
                        +{doc.shared.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-[16px] py-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#dbeafe] flex items-center justify-center text-[10px] text-[#1e40af]">
                      {doc.uploadedBy?.split(' ').map(n => n[0]).join('') || 'JZ'}
                    </div>
                    <span className="text-[13px] text-[#1c2024]">{doc.uploadedBy || 'Joan Zhao'}</span>
                  </div>
                </td>
                <td className="px-[16px] py-[8px]">
                  <span className="text-[13px] text-[#1c2024]">{doc.uploadedOn || 'Sep 3, 2025'}</span>
                </td>
                <td className="px-[16px] py-[8px]">
                  <div className="flex items-center gap-[8px]">
                    {(() => {
                      const orgName = doc.organization || 'Summation Partners';
                      const orgAvatar = getOrganizationAvatar(orgName);
                      return (
                        <>
                          <div 
                            className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-medium"
                            style={{ backgroundColor: orgAvatar.color }}
                          >
                            {orgAvatar.initial}
                          </div>
                          <span className="text-[13px] text-[#1c2024]">{orgName}</span>
                        </>
                      );
                    })()}
                  </div>
                </td>
                <td className="px-[16px] py-[8px]">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="px-[16px] py-[8px]">
                  <button className="p-[4px] hover:bg-[#f0f0f3] rounded-[4px] transition-colors">
                    <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}