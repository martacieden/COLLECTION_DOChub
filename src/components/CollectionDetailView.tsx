import { useState } from 'react';
import { Settings, Share, Users, FileText, Plus, ChevronDown, ChevronUp, Search, SlidersHorizontal, Grid3x3, List, TrendingUp, ArrowLeft, Upload, Sparkles, ChevronRight, MoreVertical, Loader2 } from 'lucide-react';
import imgAvatar from "figma:asset/faff2adb1cb08272d6a4e4d91304adea83279eb7.png";
import imgAvatar1 from "figma:asset/248e51d98c071d09cefd9d4449f99bd2dc3797f1.png";
import { CollectionDocumentsTable } from './CollectionDocumentsTable';
import svgPaths from "../imports/svg-ylbe71kelt";
import { Checkbox } from './ui/checkbox';

interface CollectionDetailViewProps {
  collection: {
    id: string;
    title: string;
    count: number;
    type: string;
    description?: string;
    icon: string;
    createdBy?: string;
    createdOn?: string;
    organization?: string;
    sharedWith?: string[];
    rules?: string[];
    autoSync?: boolean;
  };
  onBack?: () => void;
  onAddDocument?: () => void;
}

// FileIcon component - same as in App.tsx
function FileIcon({ type }: { type: string }) {
  const ext = type.toLowerCase();
  
  const getIconType = () => {
    // Table - .csv, .xls, .xlsm, .xlsx
    if (['csv', 'xls', 'xlsm', 'xlsx'].includes(ext)) {
      return 'table';
    }
    
    // Document - .doc, .docm, .docx, .dotm, .txt, .pdf
    if (['doc', 'docm', 'docx', 'dotm', 'txt', 'pdf'].includes(ext)) {
      return 'document';
    }
    
    // Image - .bmp, .gif, .hdr, .jpeg, .jpg, .png, .tiff, .webp
    if (['bmp', 'gif', 'hdr', 'jpeg', 'jpg', 'png', 'tiff', 'webp'].includes(ext)) {
      return 'image';
    }
    
    // Audio - .m4p, .mp2, .mp3
    if (['m4p', 'mp2', 'mp3'].includes(ext)) {
      return 'audio';
    }
    
    // Video - .m4v, .mov, .mp4, .mpe, .mpeg, .mpg, .mpv, .qt, .webm, .wmv
    if (['m4v', 'mov', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'qt', 'webm', 'wmv'].includes(ext)) {
      return 'video';
    }
    
    // Presentation - .potx, .ppt, .pptx
    if (['potx', 'ppt', 'pptx'].includes(ext)) {
      return 'presentation';
    }
    
    // Mail - .eml, .msg
    if (['eml', 'msg'].includes(ext)) {
      return 'mail';
    }
    
    // Other - default
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
          bgColor: 'bg-[#FEEBEC]',
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
      default: // other
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

// Mock documents for the collection - organization will be set based on collection
const baseMockCollectionDocuments = [
  {
    id: 'DOC-001',
    name: 'Building Permit - Oak Street Property',
    description: 'Approved building permit for structural changes and renovations',
    location: 'Oak Street Renovation',
    category: 'Permits & Approvals',
    attachedTo: ['Oak Street Renovation', 'Object record OBJ-31'],
    sharedWith: ['Joan Zhao', 'Sarah Miller'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 15, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Signed',
    createdBy: 'Joan Zhao',
    createdOn: '2024-11-15',
    lastUpdate: '2024-11-28',
    type: 'PDF',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-002',
    name: 'General Contractor Agreement - Studio XYZ',
    description: 'Executed contract with Studio XYZ for design and construction services',
    location: 'Oak Street Renovation',
    category: 'Executed Contracts',
    attachedTo: ['Oak Street Renovation', 'Executed Contracts'],
    sharedWith: ['Sarah Miller'],
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Dec 1, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Pending signature',
    createdBy: 'Sarah Miller',
    createdOn: '2024-12-01',
    lastUpdate: '2024-12-01',
    type: 'DOCX',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-003',
    name: 'Invoice #1247 - Electrical Work Phase 1',
    description: 'Payment invoice for electrical system upgrade and installation',
    location: 'Oak Street Renovation',
    category: 'Financial - Invoices',
    attachedTo: ['Oak Street Renovation', 'Financial - Invoices'],
    sharedWith: ['David Park', 'Joan Zhao'],
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 20, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Paid',
    createdBy: 'David Park',
    createdOn: '2024-11-20',
    lastUpdate: '2024-11-22',
    type: 'XLSX',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2h8v1H4V5zm0 2h8v1H4V7zm0 2h5v1H4V9z" fill="#16A34A" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-004',
    name: 'Change Order CO-003 - Kitchen Layout',
    description: 'Scope modification for kitchen design changes and layout adjustments',
    location: 'Oak Street Renovation',
    category: 'Change Orders',
    attachedTo: ['Oak Street Renovation', 'Change Orders'],
    sharedWith: ['Joan Zhao', 'Sarah Miller'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Dec 2, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Pending signature',
    createdBy: 'Joan Zhao',
    createdOn: '2024-12-02',
    lastUpdate: '2024-12-02',
    type: 'PDF',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-005',
    name: 'Lien Waiver - ABC Plumbing Inc',
    description: 'Unconditional lien waiver for completed plumbing work and materials',
    location: 'Oak Street Renovation',
    category: 'Lien Waivers',
    attachedTo: ['Oak Street Renovation', 'Lien Waivers'],
    sharedWith: ['Michael Chen'],
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Dec 3, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Pending signature',
    createdBy: 'Michael Chen',
    createdOn: '2024-12-03',
    lastUpdate: '2024-12-03',
    type: 'PDF',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-006',
    name: 'Maple Ave - Site Survey Report',
    description: 'Comprehensive site survey and analysis for development planning',
    location: 'Maple Ave Development',
    category: 'Architecture & Design',
    attachedTo: ['Maple Ave Development', 'Architecture & Design'],
    sharedWith: ['Joan Zhao', 'David Park'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 18, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Signed',
    createdBy: 'Joan Zhao',
    createdOn: '2024-11-15',
    lastUpdate: '2024-11-18',
    type: 'PDF',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-007',
    name: 'Invoice #892 - Foundation Work',
    description: 'Invoice for foundation construction work and materials',
    location: 'Maple Ave Development',
    category: 'Financial - Invoices',
    attachedTo: ['Maple Ave Development', 'Financial - Invoices'],
    sharedWith: ['David Park', 'Joan Zhao'],
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 20, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Paid',
    createdBy: 'David Park',
    createdOn: '2024-11-18',
    lastUpdate: '2024-11-20',
    type: 'XLSX',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2h8v1H4V5zm0 2h8v1H4V7zm0 2h5v1H4V9z" fill="#16A34A" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-008',
    name: 'Pine Street - HVAC Contract - Signed',
    description: 'Executed HVAC installation and maintenance contract',
    location: 'Pine Street Retrofit',
    category: 'Executed Contracts',
    attachedTo: ['Pine Street Retrofit', 'Executed Contracts'],
    sharedWith: ['Sarah Miller'],
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Nov 12, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Signed',
    createdBy: 'Sarah Miller',
    createdOn: '2024-11-10',
    lastUpdate: '2024-11-12',
    type: 'DOCX',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'DOC-009',
    name: 'Environmental Impact Assessment - Pine St',
    description: 'Environmental impact assessment and regulatory compliance documentation',
    location: 'Pine Street Retrofit',
    category: 'Permits & Approvals',
    attachedTo: ['Pine Street Retrofit', 'Permits & Approvals'],
    sharedWith: ['Joan Zhao', 'Michael Chen'],
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 8, 2024',
    organization: '', // Will be set from collection
    signatureStatus: 'Signed',
    createdBy: 'Joan Zhao',
    createdOn: '2024-11-05',
    lastUpdate: '2024-11-08',
    type: 'PDF',
    icon: (
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d="M3 2a1 1 0 011-1h5.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0113 4.414V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2zm2 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 9z" fill="#1150B9" fillRule="evenodd" />
      </svg>
    ),
    avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDgzNzYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

// Collection Detail Header Component
export function CollectionDetailHeader({ collection, onBack, onAddDocument }: CollectionDetailViewProps) {
  return (
    <div className="border-b border-[#e8e8ec] px-[64px] py-[16px] bg-white flex-shrink-0">
      <div>
        {/* Title Row */}
        <div className="flex items-start justify-between mb-[8px]">
          <div className="flex items-start gap-[12px]">
            {/* Back Button */}
            {onBack && (
              <button 
                onClick={onBack}
                className="h-[36px] w-[36px] border border-[#e0e1e6] rounded-[6px] flex items-center justify-center hover:bg-[#f9fafb] mt-[2px]"
              >
                <ArrowLeft className="size-[16px] text-[#60646c]" />
              </button>
            )}
            
            <div>
              <div className="flex items-center gap-[12px] mb-[4px]">
                <h1 className="text-[#1c2024] tracking-[-0.08px]">{collection.title}</h1>
                {collection.organization && (
                  <div className="flex items-center gap-[8px]">
                    <div className="size-[20px] rounded-full bg-[#e0e1e6] flex items-center justify-center text-[10px] text-[#60646c] font-medium">
                      {collection.organization[0]}
                    </div>
                    <span className="text-[12px] text-[#80838d]">{collection.organization}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-[8px] text-[13px] text-[#60646c]">
                <span>{Math.min(collection.count, 7)} items</span>
                <span>·</span>
                <span>Created by {collection.createdBy || 'AI Assistant'}</span>
                <span>·</span>
                <span>{collection.createdOn || '13/10/2025'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-[8px]">
            <button className="h-[36px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]">
              <Settings className="size-[16px] text-[#60646c]" />
              <span>Settings</span>
            </button>
            
            <button className="h-[36px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]">
              <Share className="size-[16px] text-[#60646c]" />
              <span>Share</span>
            </button>

            <button className="h-[36px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px]">
              <FileText className="size-[16px] text-[#60646c]" />
              <span>Filters</span>
            </button>

            <button 
              onClick={onAddDocument}
              className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3] flex items-center gap-[6px]"
            >
              <Upload className="size-[16px]" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollectionDetailView({ collection, onBack, onAddDocument }: CollectionDetailViewProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Set organization from collection to all documents
  const collectionOrganization = collection.organization || 'Summation Partners';
  const mockCollectionDocuments = baseMockCollectionDocuments.map(doc => ({
    ...doc,
    organization: collectionOrganization
  }));

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === mockCollectionDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(mockCollectionDocuments.map(d => d.id));
    }
  };

  // Handle AI rules generation
  const handleGenerateRules = async () => {
    if (!aiDescription.trim()) return;

    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real app, this would call an API to generate rules
    // For now, we'll just show a success message
    // The rules would be added to collection.rules
  };

  // Filter documents based on search query
  const filteredDocuments = mockCollectionDocuments.filter(doc => {
    if (filterQuery.trim() === '') return true;
    const query = filterQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query) ||
           doc.location.toLowerCase().includes(query) ||
           doc.category.toLowerCase().includes(query) ||
           doc.type.toLowerCase().includes(query);
  });

  // Count visible columns in table view
  const visibleColumnsCount = 11; // Checkbox + Name + Description + Type + Attached to + Shared with + Uploaded by + Uploaded on + Organization + Signature status + Actions

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0 h-full">

      {/* Details Section */}
      <div className="border-b border-[#e8e8ec] px-[64px] py-[16px] flex-shrink-0">
        <button
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-[13px] font-medium text-[#1c2024]">Details</h2>
          {isDetailsExpanded ? (
            <ChevronDown className="size-[16px] text-[#60646c]" />
          ) : (
            <ChevronRight className="size-[16px] text-[#60646c]" />
          )}
        </button>
        
        {isDetailsExpanded && (
          <div className="mt-[24px] space-y-[24px]">
            {/* Description */}
            <div>
              <div className="text-[11px] text-[#8b8d98] mb-[4px] uppercase tracking-wider">Description</div>
              <p className="text-[13px] text-[#1c2024]">
                {collection.description || 'Premium assets worth over $1M with high ratings and active status. This smart collection automatically includes properties, aviation, and maritime assets that meet our premium criteria.'}
              </p>
            </div>

            {/* Filter Criteria */}
            {collection.rules && collection.rules.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-[8px]">
                  <div className="text-[11px] text-[#8b8d98] uppercase tracking-wider">Filters</div>
                  <button className="text-[13px] text-[#005be2] hover:underline flex items-center gap-[4px]">
                    <span>Customize</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {collection.rules.map((rule, index) => (
                    <div
                      key={index}
                      className="px-[12px] py-[6px] bg-[#f0f0f3] rounded-[6px] text-[13px] text-[#1c2024]"
                    >
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[11px] text-[#8b8d98] mb-[8px] uppercase tracking-wider">Filters</div>
                <div className="space-y-[12px]">
                  <div>
                    <p className="text-[13px] text-[#1c2024] mb-[8px]">
                      Describe your collection and let AI suggest filtering rules.
                    </p>
                    <textarea
                      value={aiDescription}
                      onChange={(e) => setAiDescription(e.target.value)}
                      placeholder="e.g. All documents related to our Malibu property&#10;Invoices from all household vendors for 2023–2024&#10;Documents related to tax filings for Client A"
                      className="w-full min-h-[100px] p-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2]"
                    />
                  </div>
                  <button
                    onClick={handleGenerateRules}
                    disabled={isGenerating || !aiDescription.trim()}
                    className="flex items-center gap-[8px] h-[36px] px-[16px] bg-gradient-to-r from-[#005be2] to-[#0047b3] text-white rounded-[8px] text-[13px] hover:from-[#004fc4] hover:to-[#003d99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="size-[16px] animate-spin" />
                        <span>Analyzing your description...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-[16px]" />
                        <span>Generate rules</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Auto-sync Notice */}
            {collection.autoSync && (
              <div className="flex items-center gap-[6px] text-[11px] text-[#60646c]">
                <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                  <path d="M6 1v2M6 9v2M1 6h2M9 6h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Auto-sync enabled - collection updates automatically when rules change</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="border-b border-[#e8e8ec] px-[64px] py-[12px] bg-white flex-shrink-0 min-w-0 w-full max-w-full">
        <div className="flex items-center gap-[8px] min-w-0">
          {/* View Switcher (Grid Icon first) */}
          <div className="flex items-center border border-[#e0e1e6] rounded-[6px]">
            <button
              onClick={() => setViewMode('grid')}
              className={`h-[32px] w-[32px] flex items-center justify-center rounded-l-[6px] transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#f0f0f3] text-[#1c2024]' 
                  : 'text-[#60646c] hover:bg-[#f9fafb]'
              }`}
            >
              <Grid3x3 className="size-[16px]" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`h-[32px] w-[32px] flex items-center justify-center rounded-r-[6px] transition-colors ${
                viewMode === 'table' 
                  ? 'bg-[#f0f0f3] text-[#1c2024]' 
                  : 'text-[#60646c] hover:bg-[#f9fafb]'
              }`}
            >
              <List className="size-[16px]" />
            </button>
          </div>

          {/* Filters Button */}
          <button className="h-[32px] px-[8px] flex items-center gap-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] bg-white">
            <SlidersHorizontal className="size-[16px] text-[#60646c]" />
            <span className="text-[12px] font-semibold">Filters</span>
          </button>

          {/* Search Input */}
          <div className="relative" style={{ width: '256px' }}>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder='Filter documents (e.g., "signed last month")...'
              className="w-full h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
            />
          </div>

          {/* Apply Button */}
          <button className="h-[32px] px-[12px] flex items-center gap-[4px] bg-[#f0f0f3] rounded-[6px] text-[13px] text-[#b9bbc6] hover:bg-[#e0e1e6]">
            <Sparkles className="size-[16px]" />
            <span className="text-[13px] font-semibold">Apply</span>
          </button>

          {/* Column Count */}
          {viewMode === 'table' && (
            <span className="text-[13px] text-[#60646c] whitespace-nowrap">
              {visibleColumnsCount}/{visibleColumnsCount} columns
            </span>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="flex-1 overflow-hidden pb-[16px] min-w-0 flex flex-col" style={{ paddingTop: viewMode === 'grid' ? '24px' : '0' }}>
        {/* Bulk Actions Bar */}
        {selectedDocuments.length > 0 && (
          <div className="mb-[16px] px-[24px]">
            <div className="bg-[#f0f0f3] border border-[#e0e1e6] rounded-[8px] px-[24px] py-[12px] flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <span className="text-[13px] text-[#1c2024]">{selectedDocuments.length} selected</span>
                <button 
                  onClick={() => setSelectedDocuments([])}
                  className="text-[13px] text-[#60646c] hover:text-[#1c2024]"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center gap-[8px]">
                <button className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]">
                  Remove from collection
                </button>
                <button className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]">
                  Move
                </button>
                <button 
                  disabled={selectedDocuments.length > 1}
                  className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Rename
                </button>
                <button className="h-[32px] px-[12px] border border-[#e0e1e6] bg-white rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'table' ? (
          filteredDocuments.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ paddingTop: '36px' }}>
              <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[28px] grid place-items-center mb-[16px]">
                <FileText className="size-[16px]" />
              </div>
              <div className="text-[#60646c]">
                <h2 className="text-[16px] font-medium mb-[4px]">No documents to show</h2>
                <p className="text-[13px] leading-[20px]">Upload a document to get started</p>
              </div>
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
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[240px]">Description</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[80px]">Type</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[240px]">Attached to</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[140px]">Shared with</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[160px]">Uploaded by</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[140px]">Uploaded on</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[180px]">Organization</th>
                    <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[160px]">Signature status</th>
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
                      <span className="text-[13px] text-[#1c2024]">{doc.uploadedOn || new Date(doc.lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[20px] h-[20px] rounded-[4px] bg-[#f0f0f3] flex items-center justify-center text-[10px] text-[#60646c] font-medium">
                          {doc.organization?.[0] || 'S'}
                        </div>
                        <span className="text-[13px] text-[#1c2024]">{doc.organization || 'Summation Partners'}</span>
                      </div>
                    </td>
                    <td className="p-2 align-middle whitespace-nowrap">
                      <StatusBadge status={doc.signatureStatus} />
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
          )
        ) : (
          filteredDocuments.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-[24px] pt-[24px]" style={{ paddingTop: '36px' }}>
              <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[28px] grid place-items-center mb-[16px]">
                <FileText className="size-[16px]" />
              </div>
              <div className="text-[#60646c]">
                <h2 className="text-[16px] font-medium mb-[4px]">No documents to show</h2>
                <p className="text-[13px] leading-[20px]">Upload a document to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] px-[24px]">
              {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="border border-[#e0e1e6] rounded-[8px] overflow-hidden hover:border-[#005be2] hover:shadow-sm transition-all cursor-pointer bg-white relative"
              >
                {/* Checkbox */}
                <div className="absolute top-[8px] right-[8px] z-10" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleSelectDocument(doc.id)}
                    className="size-[16px] rounded border-[#e0e1e6] text-[#005be2] focus:ring-[#005be2] cursor-pointer bg-white shadow-sm"
                  />
                </div>

                {/* Icon and Type Section */}
                <div className="bg-[#f5f5f7] h-[100px] flex flex-col items-center justify-center gap-[6px]">
                  <FileIcon type={doc.type} />
                  <span className="text-[10px] text-[#8b8d98] uppercase tracking-wider">{doc.type}</span>
                </div>
                
                {/* Content Section */}
                <div className="p-[12px]">
                  <h3 className="text-[13px] text-[#1c2024] mb-[4px] line-clamp-1">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-[#8b8d98] line-clamp-2">
                    {doc.category}...
                  </p>
                </div>
              </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}