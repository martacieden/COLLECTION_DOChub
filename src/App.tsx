import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search, SlidersHorizontal, Upload, MoreVertical, Info, Sparkles, List, FileText, SearchIcon, TrendingUp, Archive, Send, PanelLeft, Paperclip, Mic, Pencil, Eye, Share2, Trash2 } from 'lucide-react';
import { Checkbox } from './components/ui/checkbox';
import svgPaths from "./imports/svg-ylbe71kelt";
import svgAudioPaths from "./imports/svg-sp6lr7not4";
// @ts-ignore
import imgAvatar from "./assets/faff2adb1cb08272d6a4e4d91304adea83279eb7.png";
// @ts-ignore
import imgAvatar1 from "./assets/248e51d98c071d09cefd9d4449f99bd2dc3797f1.png";
import { UploadModal } from './components/UploadModal';
import { NewCollectionModal } from './components/NewCollectionModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { CollectionDetailView, CollectionDetailHeader } from './components/CollectionDetailView';
import { PageHeader } from './components/PageHeader';
import { AllDocumentsTable } from './components/AllDocumentsTable';
import { RecentlyOpenedView } from './components/RecentlyOpenedView';
import { AIAssistantBanner } from './components/AIAssistantBanner';
import { SummaryBox } from './components/SummaryBox';
import { PinnedView } from './components/PinnedView';

// ========================================
// TYPES
// ========================================

type ViewMode = 'collections' | 'all-documents' | 'recent' | 'pinned' | 'collection-detail';

interface CollectionRule {
  id: string;
  type: 'document_type' | 'tags' | 'client' | 'keywords' | 'date_range' | 'vendor';
  label: string;
  value: string;
  operator: 'is' | 'contains' | 'equals' | 'not';
  enabled: boolean;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  count: number;
  type: string;
  icon: string;
  createdBy: string;
  createdOn: string;
  organization?: string;
  sharedWith?: string[];
  rules?: CollectionRule[];
  autoSync?: boolean;
  documentIds?: string[]; // IDs документів, які явно додані до колекції
}

interface Document {
  id: string;
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
  collectionIds?: string[]; // IDs колекцій, до яких належить документ
  tags?: string[];
  signatureStatus?: string;
  category?: string;
}

interface ContextSuggestion {
  id: string;
  text: string;
  icon: 'search' | 'summarize' | 'extract' | 'analyze';
  context: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  resultBlocks?: ResultBlock[];
}

interface ResultBlock {
  type: 'document-cards' | 'metadata' | 'search-results' | 'summary';
  data: any;
}

interface Organization {
  id: string;
  name: string;
  initials: string;
}

const organizations: Organization[] = [
  { id: 'all', name: 'All organizations', initials: '' },
  { id: 'smith', name: 'Smith Family Office', initials: 'S' },
  { id: 'johnson', name: 'Johnson Family Trust', initials: 'J' },
  { id: 'herwitz', name: "Herwitz's Family", initials: 'H' },
  { id: 'wayne', name: 'Wayne Estate Management', initials: 'W' },
  { id: 'robertson', name: 'The Robertson Foundation', initials: 'T' }
];

// ========================================
// GLOBAL SIDEBAR (Left Navigation)
// ========================================

function Logo() {
  return (
    <div className="h-[48px] relative shrink-0 w-[40px]" data-name="logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 48">
        <g id="logo">
          <path d={svgPaths.p35017480} fill="var(--fill-0, black)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3b029b00} fill="var(--fill-0, #2977EA)" fillOpacity="0.33" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p32f61c00} fill="var(--fill-0, #2977EA)" fillOpacity="0.66" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p17b5a100} fill="var(--fill-0, #2977EA)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function SidebarMenuItem({ icon, label, isActive = false }: { icon: string; label: string; isActive?: boolean }) {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <div className={`content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[32px] ${isActive ? 'bg-[#ebf3ff]' : ''}`}>
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths[icon as keyof typeof svgPaths]} fill={isActive ? "var(--fill-0, #005BE2)" : "var(--fill-0, #60646C)"} fillRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-nowrap tracking-[0.04px]">
            <p className={`leading-[12px] whitespace-pre ${isActive ? 'text-[#1c2024]' : 'text-[#60646c]'}`}>{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalSidebar() {
  return (
    <div className="bg-[#fcfcfd] border-r border-[#e8e8ec] box-border flex flex-col gap-[16px] h-screen items-center px-0 py-[12px] w-[72px] fixed left-0 top-0">
      <Logo />
      <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0 w-full">
        <SidebarMenuItem icon="p22bd3e80" label="Home" />
        <SidebarMenuItem icon="p3e7fbe80" label="Clients" />
        <SidebarMenuItem icon="p29cdf980" label="Decisions" />
        <SidebarMenuItem icon="p3177ad70" label="Tasks" />
        <SidebarMenuItem icon="p18dfc700" label="Objects" />
        <SidebarMenuItem icon="p2019600" label="Documents" isActive={true} />
        <SidebarMenuItem icon="p2b3bb000" label="Budgets" />
        <SidebarMenuItem icon="p2e576200" label="More" />
      </div>
      <SidebarMenuItem icon="p3cb13a00" label="Help" />
    </div>
  );
}

// ========================================
// MAIN WORKSPACE HEADER
// ========================================

function WorkspaceHeader({ onShowAIFilter, viewMode, selectedCollection, onUploadClick }: { onShowAIFilter?: () => void; viewMode?: string; selectedCollection?: any; onUploadClick?: () => void }) {
  return (
    <div className="bg-white border-b border-[#e8e8ec] flex-shrink-0 min-w-0 w-full max-w-full overflow-hidden">
      {/* Top bar with global search */}
      <div className={`h-[48px] flex items-center justify-between px-[16px] border-b border-[#e8e8ec] min-w-0 ${selectedCollection ? 'hidden' : ''}`}>
        <div className="flex items-center gap-[8px] flex-1 max-w-[320px]">
          <div className="relative flex-1">
            <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.p1b2b6900} fill="#60646C" fillRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full h-[32px] pl-[36px] pr-[60px] rounded-[6px] border border-[#e0e1e6] text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
            />
            <div className="absolute right-[8px] top-1/2 -translate-y-1/2 bg-[#f0f0f3] px-[6px] py-[2px] rounded-[6px]">
              <span className="text-[13px] text-[#60646c] font-medium">⌘K</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-[24px]">
          <button className="relative size-[24px] flex items-center justify-center">
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path clipRule="evenodd" d={svgPaths.p2c602f00} fill="#60646C" fillRule="evenodd" />
            </svg>
          </button>
          <div className="relative size-[32px] rounded-full overflow-hidden">
            <img src={imgAvatar1} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Page header with title and banner */}
      {!selectedCollection && (
        <PageHeader 
          title="Documents"
          onShowAIFilter={onShowAIFilter}
          onUploadClick={onUploadClick}
        />
      )}
    </div>
  );
}

// ========================================
// DOCUMENTS TABLE
// ========================================

const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    name: 'Oak Street - Revised Blueprints v3.2',
    description: 'Architectural plans for main floor renovation...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Architecture & Design'],
    shared: ['user1'],
    icon: 'pdf',
    status: 'Approved',
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 28, 2024',
    organization: 'Summation Partners',
    collectionIds: ['1'], // Oak Street Renovation
    tags: ['Construction', 'Architecture', 'Oak Street']
  },
  {
    id: 'DOC-002',
    name: 'Building Permit - Oak Street Property',
    description: 'Approved building permit for structural changes...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Permits & Approvals'],
    shared: ['user2'],
    icon: 'pdf',
    status: 'Signed',
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Nov 25, 2024',
    organization: 'Smith Family Office',
    collectionIds: ['1', '3'], // Oak Street Renovation, Permits & Approvals
    tags: ['Permits', 'Oak Street', 'Approved'],
    signatureStatus: 'Signed'
  },
  {
    id: 'DOC-003',
    name: 'General Contractor Agreement - Studio XYZ',
    description: 'Executed contract with Studio XYZ for design...',
    type: 'DOCX',
    attachedTo: ['Oak Street Renovation', 'Executed Contracts'],
    shared: ['user3'],
    icon: 'word',
    status: 'Signed',
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Dec 1, 2024',
    organization: 'Johnson Family Trust',
    collectionIds: ['1', '2'], // Oak Street Renovation, Executed Contracts
    tags: ['Contract', 'Executed', 'Oak Street'],
    signatureStatus: 'Signed'
  },
  {
    id: 'doc-2',
    name: 'Invoice #1247 - Electrical Work Phase 1',
    description: 'Payment invoice for electrical system upgrade...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Financial - Invoices'],
    shared: ['user4'],
    icon: 'pdf',
    status: 'Paid',
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 20, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-3',
    name: 'Change Order CO-003 - Kitchen Layout',
    description: 'Scope modification for kitchen design changes...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Change Orders'],
    shared: ['user5'],
    icon: 'pdf',
    status: 'Waiting for Signature',
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Dec 2, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-4',
    name: 'Lien Waiver - ABC Plumbing Inc',
    description: 'Unconditional lien waiver for completed plumbing...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Lien Waivers'],
    shared: ['user6'],
    icon: 'pdf',
    status: 'Waiting for Signature',
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Dec 3, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-5',
    name: 'Certificate of Occupancy - Oak Street',
    description: 'Final CO approval for renovated property...',
    type: 'PDF',
    attachedTo: ['Oak Street Renovation', 'Permits & Approvals'],
    shared: ['user7'],
    icon: 'pdf',
    status: 'In Review',
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Nov 30, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-6',
    name: 'Maple Ave - Site Survey Report',
    description: 'Topographical survey for new construction site...',
    type: 'PDF',
    attachedTo: ['Maple Ave Development', 'Architecture & Design'],
    shared: ['user8'],
    icon: 'pdf',
    status: 'Approved',
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 15, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-7',
    name: 'Invoice #892 - Foundation Work - Maple Ave',
    description: 'Payment request for foundation and grading...',
    type: 'XLSX',
    attachedTo: ['Maple Ave Development', 'Financial - Invoices'],
    shared: ['user9'],
    icon: 'excel',
    status: 'Pending Payment',
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 18, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-8',
    name: 'Lien Waiver - Premier Concrete LLC',
    description: 'Conditional lien waiver upon payment...',
    type: 'PDF',
    attachedTo: ['Maple Ave Development', 'Lien Waivers'],
    shared: ['user10'],
    icon: 'pdf',
    status: 'Waiting for Signature',
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Dec 2, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-9',
    name: 'Pine Street - HVAC Contract - Signed',
    description: 'Executed agreement for HVAC installation...',
    type: 'DOCX',
    attachedTo: ['Pine Street Retrofit', 'Executed Contracts'],
    shared: ['user11'],
    icon: 'word',
    status: 'Signed',
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Nov 10, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-10',
    name: 'Environmental Impact Assessment - Pine St',
    description: 'EPA compliance report for retrofit project...',
    type: 'PDF',
    attachedTo: ['Pine Street Retrofit', 'Permits & Approvals'],
    shared: ['user12'],
    icon: 'pdf',
    status: 'Approved',
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Nov 5, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-11',
    name: 'Change Order CO-011 - Window Specifications',
    description: 'Material upgrade for energy-efficient windows...',
    type: 'PDF',
    attachedTo: ['Pine Street Retrofit', 'Change Orders'],
    shared: ['user13'],
    icon: 'pdf',
    status: 'Waiting for Signature',
    uploadedBy: 'David Park',
    uploadedOn: 'Dec 1, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-12',
    name: 'Invoice #3341 - Roofing Materials',
    description: 'Material costs for commercial roofing system...',
    type: 'PDF',
    attachedTo: ['Pine Street Retrofit', 'Financial - Invoices'],
    shared: ['user14'],
    icon: 'pdf',
    status: 'Paid',
    uploadedBy: 'Michael Chen',
    uploadedOn: 'Oct 30, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-13',
    name: 'Lien Waiver - Summit Roofing Co',
    description: 'Final unconditional lien waiver...',
    type: 'PDF',
    attachedTo: ['Pine Street Retrofit', 'Lien Waivers'],
    shared: ['user15'],
    icon: 'pdf',
    status: 'Signed',
    uploadedBy: 'Sarah Miller',
    uploadedOn: 'Nov 2, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-14',
    name: 'Insurance Certificate - Builder\'s Risk',
    description: 'Builder\'s risk insurance policy for active projects...',
    type: 'PDF',
    attachedTo: ['All Projects', 'Insurance & Bonds'],
    shared: ['user16'],
    icon: 'pdf',
    status: 'Active',
    uploadedBy: 'Joan Zhao',
    uploadedOn: 'Oct 15, 2024',
    organization: 'Summation Partners'
  },
  {
    id: 'doc-15',
    name: 'Payment Application #5 - Oak Street',
    description: 'AIA G702/G703 payment application...',
    type: 'XLSX',
    attachedTo: ['Oak Street Renovation', 'Financial - Invoices'],
    shared: ['user17'],
    icon: 'excel',
    status: 'In Review',
    uploadedBy: 'David Park',
    uploadedOn: 'Nov 29, 2024',
    organization: 'Summation Partners'
  }
];

// Mock collections data - винесено на рівень модуля для використання в App()
const allCollections = [
  { id: '1', title: 'Oak Street Renovation', count: 42, type: 'construction', description: 'All documents related to the Oak Street property renovation project including blueprints, permits, contracts, and vendor documents.', icon: '🏗️', createdOn: '13/10/2025', createdBy: 'Joan Zhao', sharedWith: ['Michael Kim', 'Alex Smith', 'Sarah Johnson'], rules: ['Category is any of Construction, Permits, Contracts', 'Project = Oak Street', 'Status is any of Active, In Progress'], autoSync: true, organization: 'Smith Family Office' },
  { id: '2', title: 'Executed Contracts', count: 28, type: 'legal', description: 'Signed and executed contractual agreements across all projects and vendors.', icon: '📝', createdOn: '15/09/2025', createdBy: 'Joan Zhao', sharedWith: ['Michael Kim', 'Legal Team'], rules: ['Document Type = Contract', 'Status = Signed'], autoSync: true, organization: 'Johnson Family Trust' },
  { id: '3', title: 'Permits & Approvals', count: 15, type: 'legal', description: 'Building permits, zoning approvals, and regulatory documentation.', icon: '✅', createdOn: '20/08/2025', createdBy: 'Michael Kim', sharedWith: ['Joan Zhao', 'Alex Smith'], rules: ['Category = Permits', 'Status is any of Approved, Active'], autoSync: true, organization: 'Smith Family Office' },
  { id: '4', title: 'Financial - Invoices', count: 67, type: 'financial', description: 'Payment invoices and billing documents from all vendors and contractors.', icon: '💰', createdOn: '10/07/2025', createdBy: 'Joan Zhao', sharedWith: ['Finance Team', 'Michael Kim'], rules: ['Document Type = Invoice', 'Date is within last 12 months'], autoSync: true, organization: "Herwitz's Family" },
  { id: '5', title: 'Change Orders', count: 19, type: 'construction', description: 'Project modification requests and approved change orders.', icon: '🔄', createdOn: '05/06/2025', createdBy: 'Alex Smith', sharedWith: ['Joan Zhao', 'Michael Kim'], rules: ['Document Type = Change Order', 'Project = Oak Street'], autoSync: true, organization: 'Wayne Estate Management' },
  { id: '6', title: 'Lien Waivers', count: 12, type: 'legal', description: 'Lien waiver documentation from contractors and subcontractors.', icon: '📋', createdOn: '25/05/2025', createdBy: 'Michael Kim', sharedWith: ['Joan Zhao', 'Legal Team'], rules: ['Document Type = Lien Waiver'], autoSync: false, organization: 'The Robertson Foundation' },
  { id: '7', title: 'Insurance Documents', count: 23, type: 'legal', description: 'Insurance policies, certificates, and liability documentation.', icon: '🛡️', createdOn: '18/04/2025', createdBy: 'Joan Zhao', sharedWith: ['Insurance Team', 'Michael Kim'], rules: ['Category = Insurance', 'Date is within last 24 months'], autoSync: true, organization: 'Smith Family Office' },
  { id: '8', title: 'Safety Inspections', count: 31, type: 'construction', description: 'Safety inspection reports and compliance documentation.', icon: '⚠️', createdOn: '12/03/2025', createdBy: 'Alex Smith', sharedWith: ['Joan Zhao', 'Safety Team'], rules: ['Document Type = Inspection', 'Category = Safety'], autoSync: true, organization: 'Johnson Family Trust' },
  { id: '9', title: 'Vendor Contracts', count: 38, type: 'legal', description: 'Agreements with suppliers, contractors, and service providers.', icon: '🤝', createdOn: '08/02/2025', createdBy: 'Joan Zhao', sharedWith: ['Procurement Team', 'Legal Team'], rules: ['Document Type = Contract', 'Party Type = Vendor'], autoSync: true, organization: 'Smith Family Office' },
  { id: '10', title: 'Property Appraisals', count: 8, type: 'financial', description: 'Property valuation reports and appraisal documents.', icon: '💎', createdOn: '22/01/2025', createdBy: 'Michael Kim', sharedWith: ['Joan Zhao', 'Finance Team'], rules: ['Document Type = Appraisal'], autoSync: false, organization: "Herwitz's Family" },
  { id: '11', title: 'Meeting Minutes', count: 45, type: 'general', description: 'Project meeting notes, action items, and decision logs.', icon: '📅', createdOn: '15/12/2024', createdBy: 'Joan Zhao', sharedWith: ['All Team Members'], rules: ['Document Type = Meeting Minutes', 'Date is within last 6 months'], autoSync: true, organization: 'Wayne Estate Management' },
  { id: '12', title: 'Site Photos', count: 156, type: 'construction', description: 'Construction progress photos and site documentation imagery.', icon: '📸', createdOn: '03/11/2024', createdBy: 'Alex Smith', sharedWith: ['Joan Zhao', 'Project Team'], rules: ['File Type = Image', 'Project = Oak Street'], autoSync: true, organization: 'The Robertson Foundation' },
  { id: '13', title: 'Equipment Rentals', count: 14, type: 'financial', description: 'Equipment rental agreements and related invoices.', icon: '🚜', createdOn: '28/10/2024', createdBy: 'Joan Zhao', sharedWith: ['Operations Team'], rules: ['Category = Equipment', 'Document Type is any of Contract, Invoice'], autoSync: false, organization: 'Smith Family Office' },
  { id: '14', title: 'Warranty Documents', count: 22, type: 'general', description: 'Product warranties and manufacturer guarantees.', icon: '🔧', createdOn: '19/09/2024', createdBy: 'Michael Kim', sharedWith: ['Joan Zhao', 'Maintenance Team'], rules: ['Document Type = Warranty'], autoSync: true, organization: 'Johnson Family Trust' },
  { id: '15', title: 'As-Built Drawings', count: 34, type: 'construction', description: 'Final construction drawings reflecting actual built conditions.', icon: '📐', createdOn: '07/08/2024', createdBy: 'Alex Smith', sharedWith: ['Joan Zhao', 'Engineering Team'], rules: ['Document Type = Drawing', 'Status = As-Built'], autoSync: true, organization: 'Smith Family Office' },
  { id: '16', title: 'Punch Lists', count: 11, type: 'construction', description: 'Outstanding items and completion checklists.', icon: '✓', createdOn: '25/07/2024', createdBy: 'Joan Zhao', sharedWith: ['Project Team'], rules: ['Document Type = Punch List'], autoSync: false, organization: "Herwitz's Family" },
  { id: '17', title: 'Payment Applications', count: 29, type: 'financial', description: 'Contractor payment requests and progress billing.', icon: '💵', createdOn: '14/06/2024', createdBy: 'Joan Zhao', sharedWith: ['Finance Team', 'Michael Kim'], rules: ['Document Type = Payment Application', 'Project = Oak Street'], autoSync: true, organization: 'Wayne Estate Management' },
  { id: '18', title: 'Material Orders', count: 53, type: 'construction', description: 'Purchase orders and material delivery documentation.', icon: '📦', createdOn: '02/05/2024', createdBy: 'Alex Smith', sharedWith: ['Joan Zhao', 'Procurement Team'], rules: ['Document Type = Purchase Order', 'Category = Materials'], autoSync: true, organization: 'The Robertson Foundation' },
];

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;

  const getStatusStyles = () => {
    switch (status) {
      case 'Waiting for Signature':
        return 'bg-[#fff7ed] border-[#fed7aa] text-[#c2410c]';
      case 'Signed':
        return 'bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]';
      case 'Approved':
        return 'bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]';
      case 'In Review':
        return 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]';
      case 'Paid':
        return 'bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]';
      case 'Pending Payment':
        return 'bg-[#fefce8] border-[#fde047] text-[#ca8a04]';
      case 'Active':
        return 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]';
      default:
        return 'bg-[#f9fafb] border-[#e5e7eb] text-[#6b7280]';
    }
  };

  return (
    <div className={`inline-flex items-center px-[8px] py-[2px] rounded-[6px] border ${getStatusStyles()}`}>
      <span className="text-[12px] font-medium whitespace-nowrap">{status}</span>
    </div>
  );
}

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
              <path d={svgAudioPaths.p2d891172} fill="currentColor" />
              <path d={svgAudioPaths.p236c8380} fill="currentColor" />
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

// Simple Tooltip Component
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1c2024] text-white text-[11px] rounded whitespace-nowrap pointer-events-none z-50">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#1c2024]" />
        </div>
      )}
    </div>
  );
}

// ========================================
// CONTEXT SUGGESTIONS DROPDOWN
// ========================================

function ContextSuggestionsDropdown({ 
  suggestions, 
  onSelect,
  selectedIndex,
  inputValue 
}: { 
  suggestions: ContextSuggestion[]; 
  onSelect: (suggestion: ContextSuggestion) => void;
  selectedIndex: number;
  inputValue: string;
}) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'search':
        return <SearchIcon className="size-[16px] text-[#60646c]" />;
      case 'summarize':
        return <FileText className="size-[16px] text-[#60646c]" />;
      case 'extract':
        return <Archive className="size-[16px] text-[#60646c]" />;
      case 'analyze':
        return <TrendingUp className="size-[16px] text-[#60646c]" />;
      default:
        return <Sparkles className="size-[16px] text-[#60646c]" />;
    }
  };

  if (suggestions.length === 0 && inputValue.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-[4px] bg-white rounded-[8px] border border-[#e0e1e6] shadow-lg z-50 max-h-[400px] overflow-auto">
        <div className="p-[16px] text-center">
          <p className="text-[13px] text-[#60646c]">Type your question and press Enter</p>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-[4px] bg-white rounded-[8px] border border-[#e0e1e6] shadow-lg z-50 max-h-[400px] overflow-auto">
      <div className="p-[8px]">
        <p className="text-[11px] font-semibold text-[#8b8d98] uppercase tracking-wider px-[12px] py-[8px]">
          Suggested queries
        </p>
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            className={`w-full flex items-start gap-[12px] p-[12px] rounded-[6px] transition-colors text-left ${
              selectedIndex === index ? 'bg-[#f0f0f3]' : 'hover:bg-[#f9fafb]'
            }`}
          >
            <div className="flex-shrink-0 mt-[2px]">
              {getIcon(suggestion.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#1c2024] mb-[2px]">{suggestion.text}</p>
              <p className="text-[11px] text-[#8b8d98]">Based on: {suggestion.context}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ========================================
// RESULT BLOCKS
// ========================================

function DocumentCardBlock({ documents }: { documents: Document[] }) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  return (
    <div className="bg-white rounded-[8px] border border-[#e8e8ec] p-[16px]">
      <div className="flex items-center justify-between mb-[12px]">
        <h3 className="text-[13px] font-semibold text-[#60646c]">Documents</h3>
        
        {/* View Switcher */}
        <div className="flex items-center border border-[#e0e1e6] rounded-[6px]">
          <button
            onClick={() => setViewMode('list')}
            className={`h-[28px] w-[28px] flex items-center justify-center rounded-l-[6px] transition-colors ${
              viewMode === 'list' 
                ? 'bg-[#f0f0f3] text-[#1c2024]' 
                : 'text-[#60646c] hover:bg-[#f9fafb]'
            }`}
          >
            <List className="size-[14px]" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`h-[28px] w-[28px] flex items-center justify-center rounded-r-[6px] transition-colors ${
              viewMode === 'grid' 
                ? 'bg-[#f0f0f3] text-[#1c2024]' 
                : 'text-[#60646c] hover:bg-[#f9fafb]'
            }`}
          >
            <svg className="size-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {viewMode === 'list' ? (
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap">Description</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {documents.map((doc, index) => (
                <tr key={index} className="border-b transition-colors hover:bg-[#f9fafb] cursor-pointer">
                  <td className="p-2 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-[8px]">
                      <FileIcon type={doc.type} />
                      <span className="text-[13px] text-[#1c2024]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-2 align-middle whitespace-nowrap">
                    <span className="text-[13px] text-[#60646c]">{doc.type}</span>
                  </td>
                  <td className="p-2 align-middle">
                    <span className="text-[13px] text-[#60646c] line-clamp-1">{doc.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-[12px]">
          {documents.map((doc, index) => (
            <div 
              key={index}
              className="flex flex-col border border-[#e8e8ec] rounded-[8px] overflow-hidden hover:border-[#005be2] transition-colors cursor-pointer"
            >
              <div className="h-[100px] bg-gradient-to-br from-[#f9fafb] to-[#f0f0f3] flex items-center justify-center">
                <div className="flex flex-col items-center gap-[6px]">
                  <div className="size-[24px] flex items-center justify-center">
                    <FileIcon type={doc.type} />
                  </div>
                  <span className="text-[10px] text-[#8b8d98] uppercase tracking-wider">{doc.type}</span>
                </div>
              </div>
              <div className="p-[12px]">
                <p className="text-[13px] text-[#1c2024] line-clamp-1 mb-[4px]">{doc.name}</p>
                <p className="text-[11px] text-[#60646c] line-clamp-2">{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetadataBlock({ metadata }: { metadata: Record<string, string> }) {
  return (
    <div className="bg-white rounded-[8px] border border-[#e8e8ec] p-[16px]">
      <h3 className="text-[13px] font-semibold text-[#60646c] mb-[12px]">Extracted Metadata</h3>
      <div className="grid grid-cols-2 gap-[12px]">
        {Object.entries(metadata).map(([key, value], index) => (
          <div key={index} className="flex flex-col gap-[4px]">
            <p className="text-[11px] font-semibold text-[#8b8d98] uppercase tracking-wider">{key}</p>
            <p className="text-[13px] text-[#1c2024]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchResultBlock({ results }: { results: Document[] }) {
  return (
    <div className="bg-white rounded-[8px] border border-[#e8e8ec] p-[16px]">
      <h3 className="text-[13px] font-semibold text-[#60646c] mb-[12px]">Search Results</h3>
      <div className="space-y-[8px]">
        {results.map((doc, index) => (
          <div 
            key={index}
            className="flex items-center gap-[12px] p-[12px] border border-[#e8e8ec] rounded-[8px] hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0">
              <FileIcon type={doc.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#1c2024] truncate">{doc.name}</p>
              <p className="text-[12px] text-[#60646c] truncate">{doc.description}</p>
            </div>
            <span className="text-[12px] text-[#8b8d98] flex-shrink-0">{doc.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryBlock({ insights }: { insights: string[] }) {
  return (
    <div 
      className="flex flex-col items-start gap-[8px] self-stretch border border-[#AA99EC] rounded-[8px] p-[16px]"
      style={{ backgroundColor: '#FAF8FF' }}
    >
      <div className="flex items-center gap-[8px]">
        <Sparkles className="size-[16px] text-[#8B5CF6]" />
        <h3 className="text-[13px] font-semibold text-[#1c2024]">Key Insights</h3>
      </div>
      <ul className="space-y-[8px] w-full">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-[8px]">
            <div className="size-[6px] rounded-full bg-[#8B5CF6] mt-[6px] flex-shrink-0" />
            <p className="text-[13px] text-[#1c2024] leading-[1.6]">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ========================================
// AI CHAT MODAL (Large Modal)
// ========================================

function AIChatModal({ 
  initialQuestion, 
  onClose,
  contextType
}: { 
  initialQuestion: string; 
  onClose: () => void;
  contextType: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'user',
      content: initialQuestion
    },
    {
      role: 'assistant',
      content: 'Based on your documents in the Oak Street Renovation project, I found several relevant items. Here\'s what I discovered:',
      resultBlocks: [
        {
          type: 'summary',
          data: [
            'Found 5 lien waiver documents across active capital projects',
            'All lien waivers are properly executed and filed',
            'Documents show payments totaling $847,500 across three projects',
            'Final waivers pending for Oak Street electrical work'
          ]
        },
        {
          type: 'document-cards',
          data: mockDocuments.slice(5, 7)
        }
      ]
    }
  ]);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendFollowUp = () => {
    if (followUpQuestion.trim()) {
      const newUserMessage: ChatMessage = {
        role: 'user',
        content: followUpQuestion
      };
      
      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: 'Here\'s additional information based on your follow-up question:',
        resultBlocks: [
          {
            type: 'search-results',
            data: mockDocuments.slice(0, 3)
          }
        ]
      };

      setMessages([...messages, newUserMessage, newAssistantMessage]);
      setFollowUpQuestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendFollowUp();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[12px] shadow-xl max-w-[1200px] w-full mx-[24px] h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[#e8e8ec] px-[24px] py-[16px] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="bg-gradient-to-br from-[#ebf3ff] to-[#e5e7ff] size-[40px] rounded-[8px] flex items-center justify-center">
              <Sparkles className="size-[20px] text-[#005be2]" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#1c2024]">AI Assistant</h2>
              <p className="text-[12px] text-[#60646c]">Query based on: {contextType}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="size-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[16px] text-[#60646c]" />
          </button>
        </div>
        
        {/* Chat Content */}
        <div className="flex-1 overflow-auto px-[24px] py-[24px]">
          <div className="max-w-[900px] mx-auto space-y-[24px]">
            {messages.map((message, index) => (
              <div key={index} className="space-y-[16px]">
                {message.role === 'user' ? (
                  <div className="flex items-start gap-[12px]">
                    <div className="size-[32px] rounded-full bg-[#f0f0f3] flex items-center justify-center flex-shrink-0">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path clipRule="evenodd" d={svgPaths.p3cb13a00} fill="#60646C" fillRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#60646c] mb-[4px]">You</p>
                      <p className="text-[14px] text-[#1c2024] leading-[1.6]">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-[12px]">
                    <div className="size-[32px] rounded-full bg-[#ebf3ff] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="size-[16px] text-[#005be2]" />
                    </div>
                    <div className="flex-1 space-y-[16px]">
                      <div>
                        <p className="text-[13px] font-semibold text-[#60646c] mb-[4px]">AI Assistant</p>
                        <p className="text-[14px] text-[#1c2024] leading-[1.6]">{message.content}</p>
                      </div>
                      {message.resultBlocks?.map((block, blockIndex) => (
                        <div key={blockIndex}>
                          {block.type === 'document-cards' && <DocumentCardBlock documents={block.data} />}
                          {block.type === 'metadata' && <MetadataBlock metadata={block.data} />}
                          {block.type === 'search-results' && <SearchResultBlock results={block.data} />}
                          {block.type === 'summary' && <SummaryBlock insights={block.data} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Follow-up Input */}
        <div className="border-t border-[#e8e8ec] px-[24px] py-[16px] bg-[#f9fafb] flex-shrink-0">
          <div className="max-w-[900px] mx-auto">
            <div className="relative">
              <textarea
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow-up question..."
                rows={2}
                className="w-full px-[16px] py-[12px] pr-[48px] rounded-[8px] border border-[#e0e1e6] bg-white text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
              />
              <button 
                onClick={handleSendFollowUp}
                disabled={!followUpQuestion.trim()}
                className="absolute right-[8px] bottom-[8px] bg-[#005be2] size-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#004fc4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-[16px] text-white" />
              </button>
            </div>
            <p className="text-[11px] text-[#8b8d98] mt-[8px]">Press Enter to send, Shift + Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// AI SUGGESTION PREVIEW MODAL
// ========================================

function AISuggestionPreviewModal({ 
  suggestion, 
  onClose, 
  onAccept 
}: { 
  suggestion: AISuggestion; 
  onClose: () => void;
  onAccept: () => void;
}) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  // Mock documents for the preview
  const previewDocuments = mockDocuments.slice(0, suggestion.documentCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[12px] shadow-xl max-w-[900px] w-full mx-[24px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[#e8e8ec] px-[24px] py-[16px]">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-[12px] flex-1">
              <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] size-[40px] rounded-[8px] flex items-center justify-center flex-shrink-0">
                <Sparkles className="size-[20px] text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-[#1c2024] mb-[4px]">{suggestion.name}</h2>
                <p className="text-[13px] text-[#60646c] mb-[8px]">{suggestion.description}</p>
                <div className="flex items-center gap-[12px]">
                  <span className="text-[12px] text-[#8b8d98]">{suggestion.documentCount} documents</span>
                  <span className="text-[12px] text-[#8b8d98]">•</span>
                  <span className="text-[12px] text-[#8b8d98]">AI-generated collection</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[8px] flex-shrink-0">
              {/* View toggle buttons */}
              <div className="flex items-center gap-[4px] border border-[#e0e1e6] rounded-[6px] p-[2px]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`size-[28px] rounded-[4px] flex items-center justify-center transition-colors ${
                    viewMode === 'grid' ? 'bg-[#f0f0f3]' : 'hover:bg-[#f9fafb]'
                  }`}
                >
                  <svg className="size-[16px] text-[#60646c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M3 15h18"></path>
                    <path d="M9 3v18"></path>
                    <path d="M15 3v18"></path>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`size-[28px] rounded-[4px] flex items-center justify-center transition-colors ${
                    viewMode === 'list' ? 'bg-[#f0f0f3]' : 'hover:bg-[#f9fafb]'
                  }`}
                >
                  <List className="size-[16px] text-[#60646c]" />
                </button>
              </div>
              <button 
                onClick={onClose}
                className="size-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
              >
                <X className="size-[16px] text-[#60646c]" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto px-[24px] py-[16px]">
          {viewMode === 'list' ? (
            // List view
            <div className="space-y-[6px]">
              {previewDocuments.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-[8px] p-[8px] border border-[#e8e8ec] rounded-[6px] hover:bg-[#f9fafb] transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <FileIcon type={doc.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#1c2024] truncate">{doc.name}</p>
                    <p className="text-[11px] text-[#60646c] truncate">{doc.description}</p>
                  </div>
                  <span className="text-[11px] text-[#8b8d98] flex-shrink-0">{doc.type}</span>
                </div>
              ))}
            </div>
          ) : (
            // Grid view
            <div className="grid grid-cols-4 gap-[12px]">
              {previewDocuments.map((doc, index) => (
                <div 
                  key={index}
                  className="flex flex-col border border-[#e8e8ec] rounded-[8px] overflow-hidden hover:border-[#005be2] transition-colors cursor-pointer"
                >
                  {/* Document preview/thumbnail */}
                  <div className="aspect-[3/2] bg-gradient-to-br from-[#f9fafb] to-[#f0f0f3] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-[8px]">
                      <div className="size-[32px] flex items-center justify-center">
                        <FileIcon type={doc.type} />
                      </div>
                      <span className="text-[10px] font-semibold text-[#8b8d98] uppercase tracking-wider">{doc.type}</span>
                    </div>
                  </div>
                  {/* Document info */}
                  <div className="p-[12px]">
                    <p className="text-[13px] font-semibold text-[#1c2024] truncate mb-[4px]">{doc.name}</p>
                    <p className="text-[12px] text-[#60646c] line-clamp-2 min-h-[32px]">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-[#e8e8ec] px-[24px] py-[16px] bg-[#f9fafb]">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-[#60646c]">
              Preview of AI-suggested collection
            </p>
            <div className="flex items-center gap-[8px]">
              <button 
                onClick={onClose}
                className="h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] font-semibold text-[#1c2024] bg-white hover:bg-[#f9fafb] transition-colors"
              >
                Dismiss
              </button>
              <button 
                onClick={onAccept}
                className="h-[32px] px-[12px] bg-[#005be2] border border-[#005be2] rounded-[6px] text-[13px] font-semibold text-white hover:bg-[#004fc4] transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// MAIN CONTENT AREA
// ========================================

interface AISuggestion {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  emoji: string;
}

const mockAISuggestions: AISuggestion[] = [
  {
    id: '1',
    name: 'Architecture & Design - Oak Street',
    description: 'Detected blueprints, plans, and design documents for Oak Street Renovation project.',
    documentCount: 8,
    emoji: '📐'
  },
  {
    id: '2',
    name: 'Lien Waivers - All Projects',
    description: 'All lien waiver documents across Oak Street, Maple Ave, and Pine Street projects.',
    documentCount: 5,
    emoji: '📝'
  },
  {
    id: '3',
    name: 'Change Orders - Q1 2025',
    description: 'Scope modifications and change orders submitted in the first quarter.',
    documentCount: 7,
    emoji: '🔄'
  }
];

// Context-aware suggestions based on page
const getContextSuggestions = (inputValue: string): ContextSuggestion[] => {
  if (inputValue.length < 2) return [];
  
  const allSuggestions: ContextSuggestion[] = [
    {
      id: '1',
      text: 'Show me all lien waivers across projects',
      icon: 'search',
      context: 'Oak Street Renovation'
    },
    {
      id: '2',
      text: 'Find contracts expiring in next 90 days',
      icon: 'search',
      context: 'All Projects'
    },
    {
      id: '3',
      text: 'Summarize change orders for Oak Street',
      icon: 'summarize',
      context: 'Oak Street Renovation Project'
    },
    {
      id: '4',
      text: 'Search invoices from last month',
      icon: 'search',
      context: 'Financial Documents'
    },
    {
      id: '5',
      text: 'Extract key metadata from permits',
      icon: 'extract',
      context: 'Permits & Approvals'
    },
    {
      id: '6',
      text: 'Analyze project spending by vendor',
      icon: 'analyze',
      context: 'Oak Street Renovation'
    }
  ];
  
  return allSuggestions.filter(s => 
    s.text.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 6);
};

function AISuggestionCard({ 
  suggestion, 
  onView, 
  onAccept, 
  onDismiss 
}: { 
  suggestion: AISuggestion; 
  onView: () => void;
  onAccept: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[12px] hover:border-[#d1d5db] transition-colors cursor-pointer" onClick={onView}>
      <div className="flex items-center gap-[8px]">
        <div className="bg-[#f4f3ff] size-[24px] rounded-[6px] flex items-center justify-center flex-shrink-0 text-[14px]">
          <Sparkles className="size-[14px] text-[#8b5cf6]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[12px] font-semibold text-[#1c2024] truncate">{suggestion.name}</h3>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="size-[24px] rounded-[6px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors flex-shrink-0"
        >
          <X className="size-[14px] text-[#60646c]" />
        </button>
      </div>
    </div>
  );
}

// Different user sets for collection cards
const userSets = [
  [{ initials: 'JZ', color: 'bg-[#005be2]' }, { initials: 'MK', color: 'bg-[#10b981]' }, { initials: 'AS', color: 'bg-[#f59e0b]' }],
  [{ initials: 'JD', color: 'bg-[#8b5cf6]' }, { initials: 'HM', color: 'bg-[#ec4899]' }, { initials: 'II', color: 'bg-[#06b6d4]' }],
  [{ initials: 'AB', color: 'bg-[#f97316]' }, { initials: 'CD', color: 'bg-[#14b8a6]' }, { initials: 'EF', color: 'bg-[#6366f1]' }],
  [{ initials: 'GH', color: 'bg-[#dc2626]' }, { initials: 'KL', color: 'bg-[#059669]' }, { initials: 'MN', color: 'bg-[#7c3aed]' }],
  [{ initials: 'OP', color: 'bg-[#ea580c]' }, { initials: 'QR', color: 'bg-[#0891b2]' }, { initials: 'ST', color: 'bg-[#be185d]' }],
  [{ initials: 'UV', color: 'bg-[#0d9488]' }, { initials: 'WX', color: 'bg-[#9333ea]' }, { initials: 'YZ', color: 'bg-[#c2410c]' }],
  [{ initials: 'AA', color: 'bg-[#1e40af]' }, { initials: 'BB', color: 'bg-[#16a34a]' }, { initials: 'CC', color: 'bg-[#ca8a04]' }],
  [{ initials: 'DD', color: 'bg-[#7e22ce]' }, { initials: 'EE', color: 'bg-[#e11d48]' }, { initials: 'FF', color: 'bg-[#0284c7]' }],
];

function CollectionCard({ title, organization, onClick, collectionId, sharedWith, icon }: { title: string; organization?: string; onClick?: () => void; collectionId?: string; sharedWith?: string[]; icon?: string }) {
  // Use icon prop if provided, take only first emoji character
  // Match emoji including complex emojis (with modifiers, skin tones, etc.)
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/u;
  let emoji: string | null = null;
  if (icon) {
    const trimmed = icon.trim();
    const match = trimmed.match(emojiRegex);
    emoji = match ? match[0] : null;
  }
  // Remove emoji from title if it exists
  const displayTitle = emoji && title.includes(emoji) ? title.replace(emoji, '').trim() : title;
  
  // Get organization initials
  const org = organizations.find(o => o.name === organization);
  const orgInitials = org?.initials || organization?.[0] || 'S';
  
  // Get users from sharedWith or fallback to random users
  const getUsersFromSharedWith = (shared: string[]) => {
    return shared.slice(0, 3).map((name) => {
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      return {
        initials,
        color: 'bg-[#e0e1e6]',
        textColor: 'text-[#60646c]'
      };
    });
  };
  
  const users = sharedWith && sharedWith.length > 0 
    ? getUsersFromSharedWith(sharedWith)
    : (() => {
        const cardIndex = collectionId ? parseInt(collectionId) % userSets.length : Math.floor(Math.random() * userSets.length);
        return userSets[cardIndex].map(user => ({
          ...user,
          color: 'bg-[#e0e1e6]',
          textColor: 'text-[#60646c]'
        }));
      })();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuAction = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'rename':
        toast.info('Rename collection');
        break;
      case 'view':
        onClick?.();
        break;
      case 'share':
        toast.info('Share collection');
        break;
      case 'delete':
        toast.error('Delete collection');
        break;
    }
  };

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // Don't close menu on mouse leave if it's open
      }}
      className="bg-white border border-[#e8e8ec] rounded-[8px] p-[16px] flex flex-col gap-[12px] hover:border-[#005be2] transition-colors cursor-pointer relative"
    >
      {/* More button - shows on hover */}
      {isHovered && (
        <div className="absolute top-[8px] right-[8px] z-10" ref={menuRef}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="size-[24px] rounded-[6px] flex items-center justify-center hover:bg-[#f9fafb] transition-colors"
          >
            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
              <path clipRule="evenodd" d={svgPaths.p2e576200} fill="#60646C" fillRule="evenodd" />
            </svg>
          </button>
          
          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute top-[28px] right-0 bg-white border border-[#e8e8ec] rounded-[8px] shadow-lg min-w-[160px] py-[4px] z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction('rename');
                }}
                className="w-full px-[12px] py-[8px] flex items-center gap-[8px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors text-left"
              >
                <Pencil className="size-[14px] text-[#60646c]" />
                <span>Rename</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction('view');
                }}
                className="w-full px-[12px] py-[8px] flex items-center gap-[8px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors text-left"
              >
                <Eye className="size-[14px] text-[#60646c]" />
                <span>View</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction('share');
                }}
                className="w-full px-[12px] py-[8px] flex items-center gap-[8px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors text-left"
              >
                <Share2 className="size-[14px] text-[#60646c]" />
                <span>Share</span>
              </button>
              <div className="border-t border-[#e8e8ec] my-[4px]"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction('delete');
                }}
                className="w-full px-[12px] py-[8px] flex items-center gap-[8px] text-[13px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors text-left"
              >
                <Trash2 className="size-[14px] text-[#ef4444]" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Top row: icon + title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <div className="bg-[#f0f0f3] size-[24px] rounded-[6px] flex items-center justify-center text-[14px]">
            {emoji || (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path d="M3.00586 12.7604C3.03391 12.8969 3.155 12.9995 3.29981 12.9996H12.7002L12.7607 12.9938C12.8777 12.9697 12.9701 12.8774 12.9941 12.7604L13 12.6998V8.29944C12.9999 8.15463 12.8973 8.03354 12.7607 8.00549L12.7002 7.99963V6.49963C13.6942 6.49974 14.4999 7.30548 14.5 8.29944V12.6998C14.4999 13.6938 13.6942 14.4995 12.7002 14.4996H3.29981C2.30585 14.4995 1.50011 13.6938 1.5 12.6998V8.29944C1.50011 7.30548 2.30585 6.49974 3.29981 6.49963V7.99963C3.13427 7.99974 3.00011 8.13391 3 8.29944V12.6998L3.00586 12.7604ZM12.7002 6.49963V7.99963H3.29981V6.49963H12.7002Z" fill="#60646C"/>
                <path d="M10.25 0.499634C10.6642 0.499634 11 0.835421 11 1.24963C11 1.66385 10.6642 1.99963 10.25 1.99963H5.75C5.33579 1.99963 5 1.66385 5 1.24963C5 0.835421 5.33579 0.499634 5.75 0.499634H10.25Z" fill="#60646C"/>
                <path d="M12 3.24963C12.4142 3.24963 12.75 3.58542 12.75 3.99963C12.75 4.41385 12.4142 4.74963 12 4.74963H4C3.58579 4.74963 3.25 4.41385 3.25 3.99963C3.25 3.58542 3.58579 3.24963 4 3.24963H12Z" fill="#60646C"/>
              </svg>
            )}
          </div>
          <p className="text-[14px] font-semibold text-[#1c2024] tracking-[-0.0056px]">{displayTitle}</p>
        </div>
      </div>
      
      {/* Organization row */}
      {organization && (
        <div className="flex items-center gap-[8px]">
          <div className="size-[20px] rounded-full bg-[#e0e1e6] flex items-center justify-center text-[10px] text-[#60646c] font-medium">
            {orgInitials}
          </div>
          <span className="text-[12px] text-[#80838d]">{organization}</span>
        </div>
      )}
      
      {/* Bottom row: item count + user stack */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#80838d]">12 items</span>
        <div className="flex items-center -space-x-2">
          {users.map((user, index) => (
            <div 
              key={index}
              className={`size-[24px] rounded-full border-2 border-white ${user.color} flex items-center justify-center text-[10px] ${user.textColor || 'text-[#60646c]'}`}
            >
              {user.initials}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionsView({ onUploadClick, onNewCollectionClick, onCollectionClick, selectedOrganization, collections }: { onUploadClick?: () => void; onNewCollectionClick?: () => void; onCollectionClick?: (collection: any) => void; selectedOrganization?: string; collections?: Collection[] }) {
  const [question, setQuestion] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(mockAISuggestions);
  const [previewSuggestion, setPreviewSuggestion] = useState<AISuggestion | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [contextSuggestions, setContextSuggestions] = useState<ContextSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);


  // Використовуємо передані колекції (містять mock + новостворені) або fallback до глобальних mock даних
  // Якщо collections передано і воно не порожнє, використовуємо його, інакше fallback до глобального allCollections
  const allCollectionsData = (collections && Array.isArray(collections) && collections.length > 0) ? collections : allCollections;

  // Filter collections based on search query and organization
  const filteredCollections = allCollectionsData
    .filter(collection => {
      // Filter by organization
      if (selectedOrganization && selectedOrganization !== 'all') {
        const org = organizations.find(o => o.id === selectedOrganization);
        if (org && collection.organization !== org.name) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        return collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               collection.description.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    });

  useEffect(() => {
    if (question.length >= 2) {
      setContextSuggestions(getContextSuggestions(question));
      setShowSuggestions(true);
      setSelectedSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
      setContextSuggestions([]);
    }
  }, [question]);

  const handleSubmit = () => {
    if (question.trim()) {
      setIsModalOpen(true);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: ContextSuggestion) => {
    setQuestion(suggestion.text);
    setShowSuggestions(false);
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && contextSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => 
          prev < contextSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (contextSuggestions[selectedSuggestionIndex]) {
          handleSelectSuggestion(contextSuggestions[selectedSuggestionIndex]);
        } else {
          handleSubmit();
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleDismissSuggestion = (id: string) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  const handleAcceptSuggestion = (id: string) => {
    // In a real app, this would add the collection to the user's collections
    alert('Collection added to your collections!');
    handleDismissSuggestion(id);
  };

  const handleViewSuggestion = (suggestion: AISuggestion) => {
    setPreviewSuggestion(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 overflow-auto bg-white">
      {/* AI Section - Combined Search and Suggestions */}
      <div className="border-b border-[#e8e8ec]" style={{ backgroundColor: '#FAF8FF' }}>
        {/* Ask AI Input */}
        <div className="px-[18px] flex flex-col items-center py-[48px]">
          <div className="max-w-[720px] w-full mb-[8px]">
            <div className="relative" ref={inputRef}>
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                  <g>
                    <path d={svgPaths.p18549400} fill="#60646C" />
                    <path clipRule="evenodd" d={svgPaths.p1a6e3500} fill="#60646C" fillRule="evenodd" />
                  </g>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Try &quot;Oak Street blueprints&quot; for documents or &quot;Show me all lien waivers&quot; for AI answers"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (question.length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full h-[40px] pl-[40px] pr-[48px] rounded-[8px] border border-[#e0e1e6] bg-white text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent text-[13px]"
              />
              <button 
                onClick={handleSubmit}
                className="absolute right-[4px] top-1/2 -translate-y-1/2 bg-[#f0f0f3] size-[32px] rounded-[6px] flex items-center justify-center hover:bg-[#e0e1e6] transition-colors"
              >
                <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                  <path clipRule="evenodd" d={svgPaths.p394788d0} fill="#B9BBC6" fillRule="evenodd" />
                </svg>
              </button>
              
              {/* Context Suggestions Dropdown */}
              {showSuggestions && (
                <ContextSuggestionsDropdown
                  suggestions={contextSuggestions}
                  onSelect={handleSelectSuggestion}
                  selectedIndex={selectedSuggestionIndex}
                  inputValue={question}
                />
              )}
            </div>
          </div>
          
          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="max-w-[720px] w-full">
              <div className="grid grid-cols-2 gap-[12px]">
                {suggestions.slice(0, 2).map((suggestion) => (
                  <AISuggestionCard
                    {...{ key: suggestion.id }}
                    suggestion={suggestion}
                    onView={() => handleViewSuggestion(suggestion)}
                    onAccept={() => handleAcceptSuggestion(suggestion.id)}
                    onDismiss={() => handleDismissSuggestion(suggestion.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* AI Chat Modal */}
      {isModalOpen && (
        <AIChatModal 
          initialQuestion={question} 
          onClose={() => setIsModalOpen(false)}
          contextType="Oak Street Renovation"
        />
      )}
      
      {/* AI Suggestions Preview Modal */}
      {previewSuggestion && (
        <AISuggestionPreviewModal
          suggestion={previewSuggestion}
          onClose={() => setPreviewSuggestion(null)}
          onAccept={() => {
            handleAcceptSuggestion(previewSuggestion.id);
            setPreviewSuggestion(null);
          }}
        />
      )}
      
      {/* Collections section */}
      <div className="bg-white flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="px-[24px] py-[16px] flex items-center justify-between flex-shrink-0">
          <h2 className="text-[13px] font-semibold text-[#60646c]">Collections</h2>
          <div className="flex items-center gap-[8px]">
            {/* Filters Button */}
            <button className="h-[32px] px-[8px] flex items-center gap-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] bg-white">
              <SlidersHorizontal className="size-[16px] text-[#60646c]" />
              <span className="text-[12px] font-semibold">Filters</span>
            </button>
            
            {/* Search Input */}
            <div className="relative" style={{ width: '200px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search...'
                className="w-full h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
              />
            </div>
            
            {/* View Switcher */}
            <div className="flex items-center border border-[#e0e1e6] rounded-[6px] overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center h-[32px] w-[32px] text-[13px] font-semibold transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#f0f0f3] text-[#1c2024]' 
                    : 'bg-white text-[#60646c] hover:bg-[#f9fafb]'
                }`}
              >
                <svg className="size-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M3 9h18"></path>
                  <path d="M3 15h18"></path>
                  <path d="M9 3v18"></path>
                  <path d="M15 3v18"></path>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center justify-center h-[32px] w-[32px] text-[13px] font-semibold transition-colors border-l border-[#e0e1e6] ${
                  viewMode === 'table' 
                    ? 'bg-[#f0f0f3] text-[#1c2024]' 
                    : 'bg-white text-[#60646c] hover:bg-[#f9fafb]'
                }`}
              >
                <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d="M2 4.25C2 3.83579 2.33579 3.5 2.75 3.5H13.25C13.6642 3.5 14 3.83579 14 4.25C14 4.66421 13.6642 5 13.25 5H2.75C2.33579 5 2 4.66421 2 4.25Z" fill="currentColor"/>
                  <path d="M2 8C2 7.58579 2.33579 7.25 2.75 7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41421 13.6642 8.75 13.25 8.75H2.75C2.33579 8.75 2 8.41421 2 8Z" fill="currentColor"/>
                  <path d="M2 11.75C2 11.3358 2.33579 11 2.75 11H13.25C13.6642 11 14 11.3358 14 11.75C14 12.1642 13.6642 12.5 13.25 12.5H2.75C2.33579 12.5 2 12.1642 2 11.75Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <button 
              onClick={onNewCollectionClick}
              className="flex items-center gap-[4px] h-[32px] px-[12px] bg-[#005BE2] rounded-[6px] text-[13px] font-semibold text-white hover:bg-[#0047B3]"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                <path clipRule="evenodd" d={svgPaths.pf368500} fill="white" fillRule="evenodd" />
              </svg>
              <span>New collection</span>
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <>
            
            {/* Table View */}
            <div className="flex-1 overflow-hidden pb-[16px] min-w-0 flex flex-col">
              <div className="flex-1 min-w-0 overflow-x-auto overflow-y-auto">
                <table className="caption-bottom text-sm w-full" style={{ minWidth: 'max-content' }}>
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors">
                      <th className="h-10 px-2 text-left align-middle w-[40px] min-w-[40px]">
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => {}}
                        />
                      </th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[300px]">Description</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[130px]">Created by</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Shared with</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[100px]">Documents</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[120px]">Last modified</th>
                      <th className="h-10 px-2 text-left align-middle text-[11px] text-[#8b8d98] uppercase tracking-wider whitespace-nowrap min-w-[56px]"></th>
                </tr>
              </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                {filteredCollections.length > 0 ? (
                  filteredCollections.map((collection) => (
                    <tr 
                      key={collection.id}
                          className="border-b transition-colors hover:bg-[#f9fafb] cursor-pointer"
                      onClick={() => onCollectionClick?.(collection)}
                    >
                          <td className="p-2 align-middle" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={false}
                              onCheckedChange={() => {}}
                            />
                          </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-[8px]">
                          <span className="text-[20px]">{collection.icon}</span>
                          <span className="text-[13px] text-[#1c2024]">{collection.title}</span>
                        </div>
                      </td>
                          <td className="p-2 align-middle">
                            <span className="text-[13px] text-[#60646c] truncate block max-w-[300px]">{collection.description}</span>
                      </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            <span className="text-[13px] text-[#1c2024]">{collection.createdBy}</span>
                      </td>
                          <td className="p-2 align-middle">
                        <div className="flex items-center gap-[4px]">
                          {collection.sharedWith?.slice(0, 2).map((person, idx) => (
                            <div 
                              key={idx}
                                  className="size-[24px] rounded-full bg-[#e0e1e6] flex items-center justify-center text-[10px] text-[#60646c]"
                              title={person}
                            >
                              {person.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {collection.sharedWith && collection.sharedWith.length > 2 && (
                            <span className="text-[13px] text-[#60646c]">
                              +{collection.sharedWith.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            <span className="text-[13px] text-[#60646c]">{collection.count}</span>
                      </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                            <span className="text-[13px] text-[#60646c]">{collection.createdOn}</span>
                      </td>
                          <td className="p-2 align-middle whitespace-nowrap">
                        <button 
                              className="p-[4px] hover:bg-[#f0f0f3] rounded-[4px] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                              <MoreVertical className="w-[16px] h-[16px] text-[#60646c]" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                        <td colSpan={8} className="text-center py-[48px]">
                      <p className="text-[#60646c] text-[13px]">No collections found matching "{searchQuery}"</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            </div>
          </>
        ) : (
          // Grid/Card View
          <div className="grid gap-[16px] w-full p-[24px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {filteredCollections.length > 0 ? (
              filteredCollections.map((collection) => (
                <CollectionCard 
                  {...{ key: collection.id }}
                  title={collection.title}
                  icon={collection.icon}
                  organization={collection.organization}
                  onClick={() => onCollectionClick?.(collection)}
                  collectionId={collection.id}
                  sharedWith={collection.sharedWith}
                />
              ))
            ) : (
              <div className="text-center py-[48px]" style={{ gridColumn: '1 / -1' }}>
                <p className="text-[#60646c] text-[13px]">No collections found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MainContent({ 
  viewMode, 
  aiFilter, 
  onClearAIFilter,
  onUploadClick,
  onNewCollectionClick,
  isLeftPanelCollapsed,
  onToggleLeftPanel,
  onCollectionClick,
  selectedCollection,
  onBackFromCollection,
  documents,
  selectedOrganization,
  onOrganizationChange,
  pinnedDocumentIds,
  onPinToggle,
  collections,
  onRemoveFromCollection,
  onDelete
}: { 
  viewMode: ViewMode; 
  aiFilter?: string | null;
  onClearAIFilter?: () => void;
  onUploadClick?: () => void;
  onNewCollectionClick?: () => void;
  isLeftPanelCollapsed?: boolean;
  onToggleLeftPanel?: () => void;
  onCollectionClick?: (collection: any) => void;
  selectedCollection?: any;
  onBackFromCollection?: () => void;
  documents?: Document[];
  selectedOrganization?: string;
  onOrganizationChange?: (orgId: string) => void;
  pinnedDocumentIds?: Set<string>;
  onPinToggle?: (docId: string) => void;
  collections?: Collection[];
  onRemoveFromCollection?: (collectionId: string, documentIds: string[]) => void;
  onDelete?: (documentIds: string[]) => void;
}) {
  if (viewMode === 'collection-detail' && selectedCollection) {
    return (
      <CollectionDetailView 
        collection={selectedCollection}
        onBack={onBackFromCollection}
        onAddDocument={onUploadClick}
        onRemoveFromCollection={onRemoveFromCollection}
        documents={documents}
      />
    );
  }

  if (viewMode === 'all-documents') {
    // Отримати список колекцій для передачі
    const collectionsList = (collections || []).map(col => ({
      id: col.id,
      title: col.title,
      icon: col.icon
    }));
    
    return (
      <div className="flex-1 overflow-auto bg-white">
        <AllDocumentsTable 
        documents={documents}
          selectedOrganization={selectedOrganization}
          onOrganizationChange={onOrganizationChange}
          organizations={organizations}
          pinnedDocumentIds={pinnedDocumentIds}
          onPinToggle={onPinToggle}
          collections={collectionsList}
          onDelete={onDelete}
        />
      </div>
    );
  }

  if (viewMode === 'recent') {
    // Отримати список колекцій для передачі
    const collectionsList = (collections || []).map(col => ({
      id: col.id,
      title: col.title,
      icon: col.icon
    }));
    
    return (
      <div className="flex-1 overflow-auto bg-white">
        <RecentlyOpenedView 
          documents={documents}
          pinnedDocumentIds={pinnedDocumentIds}
          onPinToggle={onPinToggle}
          collections={collectionsList}
        />
      </div>
    );
  }

  if (viewMode === 'pinned') {
    // Отримати список колекцій для передачі
    const collectionsList = (collections || []).map(col => ({
      id: col.id,
      title: col.title,
      icon: col.icon
    }));
    
    return (
      <div className="flex-1 overflow-auto bg-white">
        <PinnedView 
          documents={documents}
          pinnedDocumentIds={pinnedDocumentIds}
          onPinToggle={onPinToggle}
          collections={collectionsList}
        />
      </div>
    );
  }

  // Передаємо колекції (завжди мають містити мінімум mock дані)
  return <CollectionsView onUploadClick={onUploadClick} onNewCollectionClick={onNewCollectionClick} onCollectionClick={onCollectionClick} selectedOrganization={selectedOrganization} collections={collections} />;
}

// ========================================
// FOJO AI ASSISTANT PANEL
// ========================================

function FojoAssistantPanel({ collection, documents }: { collection?: any; documents?: Document[] }) {
  // Generate AI summary based on collection state
  const generateSummary = (): string => {
    if (!collection) {
      return "Select a collection to see AI-generated insights and suggestions.";
    }

    const collectionDocumentIds = collection.documentIds || [];
    const collectionDocuments = documents && documents.length > 0
      ? documents.filter(doc => doc && doc.id && collectionDocumentIds.includes(doc.id))
      : [];
    
    const hasDocuments = collectionDocuments.length > 0;
    const hasRules = collection.rules && collection.rules.length > 0;
    const hasDescription = collection.description && collection.description.trim().length > 0;

    // Case A: Collection has documents
    if (hasDocuments) {
      // Analyze document patterns
      const docTypes = [...new Set(collectionDocuments.map(d => d.type))];
      const docCategories = [...new Set(collectionDocuments.map(d => d.category).filter((cat): cat is string => Boolean(cat)))];
      const docOrganizations = [...new Set(collectionDocuments.map(d => d.organization).filter(Boolean))];
      
      let summary = `This collection contains ${collectionDocuments.length} ${collectionDocuments.length === 1 ? 'document' : 'documents'}`;
      
      if (docTypes.length > 0) {
        summary += `, including ${docTypes.slice(0, 3).join(', ')}${docTypes.length > 3 ? ' and more' : ''} files`;
      }
      
      if (docCategories.length > 0) {
        summary += `. Categories: ${docCategories.slice(0, 2).join(', ')}${docCategories.length > 2 ? ' and more' : ''}`;
      }
      
      if (docOrganizations.length > 0) {
        summary += `. Related to: ${docOrganizations.slice(0, 2).join(', ')}${docOrganizations.length > 2 ? ' and more' : ''}`;
      }
      
      summary += '.';
      
      // Suggest improvements if no rules
      if (!hasRules && collectionDocuments.length >= 3) {
        summary += ' You may want to add rules to automatically include similar documents.';
      }
      
      return summary;
    }

    // Case B: Collection has rules but no documents
    if (hasRules && !hasDocuments) {
      const rulesDescription = collection.rules.slice(0, 2).join(', ');
      let summary = `This collection has automation rules configured: ${rulesDescription}`;
      if (collection.rules.length > 2) {
        summary += ` and ${collection.rules.length - 2} more`;
      }
      summary += '. Documents that match these criteria will be automatically added to this collection.';
      
      // Suggest examples
      if (collection.rules.some((r: string) => r.toLowerCase().includes('tax'))) {
        summary += ' For example, tax documents matching your criteria would appear here.';
      } else if (collection.rules.some((r: string) => r.toLowerCase().includes('contract'))) {
        summary += ' For example, contracts matching your criteria would appear here.';
      } else {
        summary += ' Start uploading or creating documents that match your rules to see them appear here.';
      }
      
      return summary;
    }

    // Case C: Collection has description but no rules and no documents
    if (hasDescription && !hasRules && !hasDocuments) {
      let summary = `Based on your description: "${collection.description.substring(0, 100)}${collection.description.length > 100 ? '...' : ''}"`;
      summary += ' You can add documents manually or set up automation rules to automatically include documents that match your criteria.';
      summary += ' Consider adding rules to make this collection automatically sync with new documents.';
      
      return summary;
    }

    // Case D: Collection has only a title
    if (!hasDescription && !hasRules && !hasDocuments) {
      return `"${collection.title}" is a new collection. Add a description to help AI understand what this collection is for, or start adding documents. You can also set up automation rules to automatically include matching documents.`;
    }

    return "Analyzing collection...";
  };

  const generateAssistantMessage = (): string => {
    if (!collection) {
      return "Select a collection to get started with AI assistance.";
    }

    const collectionDocumentIds = collection.documentIds || [];
    const collectionDocuments = documents && documents.length > 0
      ? documents.filter(doc => doc && doc.id && collectionDocumentIds.includes(doc.id))
      : [];
    
    const hasDocuments = collectionDocuments.length > 0;
    const hasRules = collection.rules && collection.rules.length > 0;
    const hasDescription = collection.description && collection.description.trim().length > 0;

    if (hasDocuments) {
      return "I've analyzed the documents in this collection. I can help you understand patterns, find relationships, and suggest improvements. What would you like to know?";
    } else if (hasRules) {
      return "This collection has automation rules set up. I can help you understand what documents would match these rules and suggest ways to refine them.";
    } else if (hasDescription) {
      return "I see you've described what this collection is for. I can help you set up rules, find relevant documents, or refine your description.";
    } else {
      return "This is a new collection. I can help you add a description, set up automation rules, or find documents to add. What would you like to do?";
    }
  };

  const summary = generateSummary();
  const assistantMessage = generateAssistantMessage();

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden" style={{ width: '400px', minWidth: '400px', maxWidth: '400px' }}>
      {/* Header */}
      <div className="border-b border-[#e8e8ec]">
        <div className="px-[16px] py-[16px]">
          <h2 className="text-[13px] font-semibold text-[#1c2024]">Fojo Assistant</h2>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Summary Section */}
        <SummaryBox 
          summary={summary}
        />

        {/* Assistant Message - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[24px] min-w-0">
          <div className="space-y-[16px] min-w-0">
            <div className="flex items-start gap-[12px] min-w-0">
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[13px] font-semibold text-[#60646c] mb-[4px]">AI Assistant</p>
                <p className="text-[14px] text-[#1c2024] leading-[1.6] break-words">
                  {assistantMessage}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-[8px]">
              <button className="w-full px-[12px] py-[8px] bg-[#f9fafb] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f0f0f3] text-left transition-colors">
                Summarize key clauses
              </button>
              <button className="w-full px-[12px] py-[8px] bg-[#f9fafb] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f0f0f3] text-left transition-colors">
                Show linked objects
              </button>
              <button className="w-full px-[12px] py-[8px] bg-[#f9fafb] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f0f0f3] text-left transition-colors">
                Who is the executor?
              </button>
            </div>
          </div>
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-[#e8e8ec] bg-[#f9fafb] flex-shrink-0">
          <div className="px-[16px] py-[16px]">
            <div className="mb-[8px]">
              <span className="inline-block px-[6px] py-[2px] bg-[#f9f9fb] border border-[#e0e1e6] rounded-[6px] text-[11px] font-medium text-[#13151b]">
                @ Add context
              </span>
            </div>
            <div className="bg-white border border-[#e8e8ec] rounded-[8px] overflow-hidden">
              <div className="px-[12px] py-[8px]">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] focus:outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center justify-between px-[8px] pb-[8px]">
                <div className="flex items-center gap-[8px]">
                  <button className="p-[4px] hover:bg-[#f9fafb] rounded-[4px] transition-colors">
                    <Paperclip className="size-[16px] text-[#60646c]" />
                  </button>
                  <button className="p-[4px] hover:bg-[#f9fafb] rounded-[4px] transition-colors">
                    <Mic className="size-[16px] text-[#60646c]" />
                  </button>
                </div>
                <button className="bg-[#f0f0f3] p-[8px] rounded-[6px] hover:bg-[#e0e1e6] transition-colors">
                  <Send className="size-[16px] text-[#b9bbc6]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// LEFT TABS PANEL
// ========================================

function LeftTabsPanel({ 
  viewMode, 
  onViewChange,
  isCollapsed,
  onToggleCollapse,
  selectedOrganization,
  onOrganizationChange,
  pinnedDocumentIds
}: { 
  viewMode: ViewMode; 
  onViewChange: (view: ViewMode) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  selectedOrganization: string;
  onOrganizationChange: (orgId: string) => void;
  pinnedDocumentIds?: Set<string>;
}) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'collections' as ViewMode, icon: 'p47bd72a', label: 'Collections', count: 18 },
    { id: 'all-documents' as ViewMode, icon: 'p153eb300', label: 'All documents', count: 41 },
    { id: 'recent' as ViewMode, icon: 'p2b2b7000', label: 'Recently opened', count: 24 },
    { id: 'pinned' as ViewMode, icon: 'p316b2c00', label: 'Pinned', count: pinnedDocumentIds?.size || 0 },
  ];

  const selectedOrg = organizations.find(o => o.id === selectedOrganization) || organizations[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`bg-white border-r border-[#e8e8ec] flex flex-col transition-all duration-300 ${isCollapsed ? 'w-[48px]' : 'w-[220px]'} ${viewMode === 'collection-detail' ? 'hidden' : ''}`}>
      {/* Top section with org selector and search */}
      {!isCollapsed && viewMode !== 'collection-detail' && (
        <div className="p-[12px] border-b border-[#e8e8ec]">
          <div className="flex items-center gap-[8px] relative" ref={dropdownRef}>
            <button 
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="flex-1 flex items-center gap-[8px] h-[32px] px-[8px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb]"
            >
              {selectedOrg.initials ? (
                <div className="size-[20px] rounded-full bg-[#e0e1e6] flex items-center justify-center text-[10px] text-[#60646c] font-medium">
                  {selectedOrg.initials}
                </div>
              ) : (
                <div className="bg-[#f0f0f3] p-[4px] rounded-[4px]">
                  <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                    <path clipRule="evenodd" d={svgPaths.p3ed9dc80} fill="#60646C" fillRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="flex-1 text-left truncate">{selectedOrg.name}</span>
              <ChevronDown className="size-[16px] text-[#60646c] flex-shrink-0" />
            </button>

            {/* Dropdown */}
            {orgDropdownOpen && (
              <div className="absolute top-[36px] left-0 right-0 bg-white border border-[#e0e1e6] rounded-[6px] shadow-lg z-50 py-[4px]">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      onOrganizationChange(org.id);
                      setOrgDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-[8px] px-[8px] py-[6px] text-[13px] hover:bg-[#f9fafb] ${
                      selectedOrganization === org.id ? 'bg-[#ebf3ff] text-[#005be2]' : 'text-[#1c2024]'
                    }`}
                  >
                    {org.initials ? (
                      <div className="size-[20px] rounded-full bg-[#e0e1e6] flex items-center justify-center text-[10px] text-[#60646c] font-medium">
                        {org.initials}
                      </div>
                    ) : (
                      <div className="bg-[#f0f0f3] p-[4px] rounded-[4px]">
                        <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                          <path clipRule="evenodd" d={svgPaths.p3ed9dc80} fill="#60646C" fillRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="flex-1 text-left truncate">{org.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation items */}
      {viewMode !== 'collection-detail' && (
        <div className="p-[12px] flex flex-col gap-[4px] flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex items-center gap-[8px] h-[32px] rounded-[6px] text-[13px] font-medium transition-colors ${
              isCollapsed ? 'justify-center px-[8px]' : 'px-[8px]'
            } ${
              viewMode === tab.id
                ? 'bg-[#ebf3ff] text-[#1c2024]' 
                : 'text-[#1c2024] hover:bg-[#f9fafb]'
            }`}
            title={isCollapsed ? tab.label : undefined}
          >
            <div className="flex items-center justify-center size-[16px] flex-shrink-0">
              {tab.icon === 'p47bd72a' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-full" fill="none" viewBox="0 0 16 16">
                  <path d="M3.00586 12.7604C3.03391 12.8969 3.155 12.9995 3.29981 12.9996H12.7002L12.7607 12.9938C12.8777 12.9697 12.9701 12.8774 12.9941 12.7604L13 12.6998V8.29944C12.9999 8.15463 12.8973 8.03354 12.7607 8.00549L12.7002 7.99963V6.49963C13.6942 6.49974 14.4999 7.30548 14.5 8.29944V12.6998C14.4999 13.6938 13.6942 14.4995 12.7002 14.4996H3.29981C2.30585 14.4995 1.50011 13.6938 1.5 12.6998V8.29944C1.50011 7.30548 2.30585 6.49974 3.29981 6.49963V7.99963C3.13427 7.99974 3.00011 8.13391 3 8.29944V12.6998L3.00586 12.7604ZM12.7002 6.49963V7.99963H3.29981V6.49963H12.7002Z" fill="#60646C"/>
                  <path d="M10.25 0.499634C10.6642 0.499634 11 0.835421 11 1.24963C11 1.66385 10.6642 1.99963 10.25 1.99963H5.75C5.33579 1.99963 5 1.66385 5 1.24963C5 0.835421 5.33579 0.499634 5.75 0.499634H10.25Z" fill="#60646C"/>
                  <path d="M12 3.24963C12.4142 3.24963 12.75 3.58542 12.75 3.99963C12.75 4.41385 12.4142 4.74963 12 4.74963H4C3.58579 4.74963 3.25 4.41385 3.25 3.99963C3.25 3.58542 3.58579 3.24963 4 3.24963H12Z" fill="#60646C"/>
                </svg>
              ) : (
                <svg className="size-full" fill="none" viewBox="0 0 16 16">
                  <path clipRule="evenodd" d={svgPaths[tab.icon as keyof typeof svgPaths]} fill="#60646C" fillRule="evenodd" />
                </svg>
              )}
            </div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left truncate">{tab.label}</span>
                <span className="text-[12px] text-[#8b8d98]">{tab.count}</span>
              </>
            )}
          </button>
        ))}
      </div>
      )}

    </div>
  );
}



// ========================================
// MAIN APP LAYOUT
// ========================================

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
}

// Функція для перевірки відповідності документу правилам колекції
function matchDocumentToRules(document: Document, rules: CollectionRule[]): boolean {
  if (!rules || rules.length === 0) return false;
  
  // Перевіряємо тільки увімкнені правила
  const enabledRules = rules.filter(rule => rule.enabled);
  if (enabledRules.length === 0) return false;
  
  // Всі увімкнені правила повинні відповідати (AND логіка)
  return enabledRules.every(rule => {
    switch (rule.type) {
      case 'document_type':
        const docType = document.type.toLowerCase();
        const ruleValue = rule.value.toLowerCase();
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return docType === ruleValue || document.name.toLowerCase().includes(ruleValue);
        }
        if (rule.operator === 'contains') {
          return docType.includes(ruleValue) || document.name.toLowerCase().includes(ruleValue);
        }
        if (rule.operator === 'not') {
          return docType !== ruleValue && !document.name.toLowerCase().includes(ruleValue);
        }
        return false;
        
      case 'tags':
        const docTags = document.tags || [];
        const ruleTags = rule.value.split(',').map(t => t.trim().toLowerCase());
        if (rule.operator === 'contains') {
          return ruleTags.some(tag => 
            docTags.some(docTag => docTag.toLowerCase().includes(tag)) ||
            document.name.toLowerCase().includes(tag) ||
            document.description?.toLowerCase().includes(tag)
          );
        }
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return ruleTags.some(tag => docTags.some(docTag => docTag.toLowerCase() === tag));
        }
        return false;
        
      case 'keywords':
        const keyword = rule.value.toLowerCase();
        const searchText = `${document.name} ${document.description || ''}`.toLowerCase();
        if (rule.operator === 'contains') {
          return searchText.includes(keyword);
        }
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return searchText === keyword || document.name.toLowerCase() === keyword;
        }
        if (rule.operator === 'not') {
          return !searchText.includes(keyword);
        }
        return false;
        
      case 'client':
        const clientName = rule.value.toLowerCase();
        const orgMatch = document.organization?.toLowerCase().includes(clientName);
        const nameMatch = document.name.toLowerCase().includes(clientName);
        const descMatch = document.description?.toLowerCase().includes(clientName);
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return orgMatch || nameMatch || descMatch;
        }
        if (rule.operator === 'contains') {
          return orgMatch || nameMatch || descMatch;
        }
        return false;
        
      case 'date_range':
        const year = rule.value;
        const docDate = document.uploadedOn || '';
        if (rule.operator === 'is' || rule.operator === 'equals') {
          return docDate.includes(year);
        }
        return false;
        
      case 'vendor':
        const vendorName = rule.value.toLowerCase();
        const vendorMatch = document.name.toLowerCase().includes(vendorName) ||
                           document.description?.toLowerCase().includes(vendorName) ||
                           document.uploadedBy?.toLowerCase().includes(vendorName);
        if (rule.operator === 'is' || rule.operator === 'equals' || rule.operator === 'contains') {
          return vendorMatch;
        }
        return false;
        
      default:
        return false;
    }
  });
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('collections');
  const [aiFilter, setAiFilter] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedOrganization, setSelectedOrganization] = useState<string>('all');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [pinnedDocumentIds, setPinnedDocumentIds] = useState<Set<string>>(new Set());
  
  // State для зберігання колекцій - збереження в localStorage
  const [collections, setCollections] = useState<Collection[]>(() => {
    // Спочатку пробуємо завантажити з localStorage
    try {
      const savedCollections = localStorage.getItem('way2b1_collections');
      if (savedCollections) {
        const parsed = JSON.parse(savedCollections);
        // Перевіряємо, чи це масив
        if (Array.isArray(parsed)) {
          // Якщо є збережені колекції, об'єднуємо з mock даними (mock не перезаписуємо)
          const mockCollections = allCollections.map(col => ({
            id: col.id,
            title: col.title,
            description: col.description || '',
            count: col.count,
            type: col.type,
            icon: col.icon,
            createdBy: col.createdBy || 'Joan Zhao',
            createdOn: col.createdOn || new Date().toLocaleDateString(),
            organization: col.organization,
            sharedWith: col.sharedWith,
            rules: col.rules ? col.rules.map((rule, idx) => ({
              id: `rule-${col.id}-${idx}`,
              type: 'keywords' as const,
              label: 'Rule',
              value: rule,
              operator: 'contains' as const,
              enabled: true
            })) : undefined,
            autoSync: col.autoSync,
            documentIds: []
          }));
          
          // Об'єднуємо: mock колекції + збережені користувацькі колекції
          const mockIds = new Set(mockCollections.map(c => c.id));
          const userCollections = parsed.filter((c: Collection) => c && c.id && !mockIds.has(c.id));
          return [...mockCollections, ...userCollections];
        } else {
          // Якщо parsed не є масивом, очищаємо localStorage і використовуємо mock дані
          try {
            localStorage.removeItem('way2b1_collections');
          } catch (e) {
            // Ignore
          }
        }
      }
    } catch (error) {
      console.error('Error loading collections from localStorage:', error);
      // Якщо помилка, очищаємо localStorage
      try {
        localStorage.removeItem('way2b1_collections');
      } catch (e) {
        // Ignore
      }
    }
    
    // Якщо немає збережених даних, ініціалізуємо з mock даних
    return allCollections.map(col => ({
      id: col.id,
      title: col.title,
      description: col.description || '',
      count: col.count,
      type: col.type,
      icon: col.icon,
      createdBy: col.createdBy || 'Joan Zhao',
      createdOn: col.createdOn || new Date().toLocaleDateString(),
      organization: col.organization,
      sharedWith: col.sharedWith,
      rules: col.rules ? col.rules.map((rule, idx) => ({
        id: `rule-${col.id}-${idx}`,
        type: 'keywords' as const,
        label: 'Rule',
        value: rule,
        operator: 'contains' as const,
        enabled: true
      })) : undefined,
      autoSync: col.autoSync,
      documentIds: []
    }));
  });

  // Функція для збереження колекцій в localStorage
  const saveCollectionsToStorage = (updatedCollections: Collection[]) => {
    try {
      // Зберігаємо тільки користувацькі колекції (не mock)
      const mockIds = new Set(allCollections.map(c => c.id));
      const userCollections = updatedCollections.filter(c => !mockIds.has(c.id));
      localStorage.setItem('way2b1_collections', JSON.stringify(userCollections));
    } catch (error) {
      console.error('Error saving collections to localStorage:', error);
    }
  };

  const handleShowAIFilter = () => {
    setAiFilter('needs-signature');
  };

  const handleClearAIFilter = () => {
    setAiFilter(null);
  };

  const handleToggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  const handleUploadComplete = (files: any[], selectedCollections: string[]) => {
    // Create new document entries from uploaded files
    const newDocuments: Document[] = files.map((fileInfo, index) => {
      const fileName = fileInfo.file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'pdf';
      const currentDate = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      const docId = `DOC-${Date.now()}-${index}`;
      
      return {
        id: docId,
        name: fileName,
        description: 'Recently uploaded document',
        type: fileExtension.toUpperCase(),
        attachedTo: selectedCollections.length > 0 ? selectedCollections : ['Uncategorized'],
        shared: ['user1'],
        icon: fileExtension,
        status: 'In Review',
        uploadedBy: 'Joan Zhao',
        uploadedOn: currentDate,
        organization: 'Summation Partners',
        collectionIds: [],
        tags: []
      };
    });

    // Автоматично додаємо документи до колекцій на основі правил
    const updatedCollections = collections.map(collection => {
      if (!collection.autoSync || !collection.rules) return collection;
      
      const matchedDocIds: string[] = [];
      newDocuments.forEach(doc => {
        if (matchDocumentToRules(doc, collection.rules!)) {
          matchedDocIds.push(doc.id!);
        }
      });
      
      if (matchedDocIds.length > 0) {
        return {
          ...collection,
          documentIds: [...(collection.documentIds || []), ...matchedDocIds],
          count: (collection.documentIds?.length || 0) + matchedDocIds.length
        };
      }
      
      return collection;
    });
    
    // Додаємо також до явно вибраних колекцій
    selectedCollections.forEach(collectionName => {
      const collection = updatedCollections.find(col => col.title === collectionName);
      if (collection) {
        const docIds = newDocuments.map(doc => doc.id!);
        const index = updatedCollections.indexOf(collection);
        updatedCollections[index] = {
          ...collection,
          documentIds: [...new Set([...(collection.documentIds || []), ...docIds])],
          count: (collection.documentIds?.length || 0) + docIds.length
        };
      }
    });
    
    // Оновлюємо collectionIds в документах
    const documentsWithCollections = newDocuments.map(doc => {
      const docCollectionIds: string[] = [];
      
      // Додаємо до явно вибраних колекцій
      selectedCollections.forEach(collectionName => {
        const collection = updatedCollections.find(col => col.title === collectionName);
        if (collection) {
          docCollectionIds.push(collection.id);
        }
      });
      
      // Додаємо до колекцій, які відповідають правилам
      updatedCollections.forEach(collection => {
        if (collection.autoSync && collection.rules && matchDocumentToRules(doc, collection.rules)) {
          if (!docCollectionIds.includes(collection.id)) {
            docCollectionIds.push(collection.id);
          }
        }
      });
      
      return {
        ...doc,
        collectionIds: docCollectionIds
      };
    });

    // Оновлюємо колекції
    setCollections(updatedCollections);
    // Зберігаємо в localStorage
    saveCollectionsToStorage(updatedCollections);
    
    // Add new documents to the beginning of the list
    setDocuments(prev => [...documentsWithCollections, ...prev]);
    
    // Store uploaded documents for AI banner
    const uploadedDocsForBanner: UploadedDocument[] = files.map((fileInfo, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: fileInfo.file.name,
      type: fileInfo.file.name.split('.').pop()?.toLowerCase() || 'pdf',
      uploadedAt: new Date()
    }));
    setUploadedDocuments(uploadedDocsForBanner);
    
    // Show success toast
    const fileCount = files.length;
    const collectionCount = collections.length;
    
    if (collectionCount > 0) {
      toast.success(
        `${fileCount} ${fileCount === 1 ? 'document' : 'documents'} added to ${collectionCount} ${collectionCount === 1 ? 'collection' : 'collections'}`
      );
    } else {
      toast.success(
        `${fileCount} ${fileCount === 1 ? 'document' : 'documents'} uploaded successfully`
      );
    }
  };

  const handlePinToggle = (docId: string) => {
    setPinnedDocumentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const handleCreateCollection = (name: string, description: string, rules: CollectionRule[]) => {
    // Створюємо нову колекцію
    const newCollection: Collection = {
      id: `col-${Date.now()}`,
      title: name,
      description: description,
      count: 0,
      type: 'custom',
      icon: '📁',
      createdBy: 'Joan Zhao',
      createdOn: new Date().toLocaleDateString(),
      organization: selectedOrganization !== 'all' 
        ? organizations.find(o => o.id === selectedOrganization)?.name 
        : undefined,
      rules: rules,
      autoSync: true,
      documentIds: []
    };
    
    // Знаходимо документи, які відповідають правилам
    const matchingDocuments = documents.filter(doc => 
      matchDocumentToRules(doc, rules)
    );
    
    // Додаємо ID документів до колекції
    newCollection.documentIds = matchingDocuments.map(doc => doc.id || '');
    newCollection.count = matchingDocuments.length;
    
    // Оновлюємо документи, додаючи collectionId
    setDocuments(prev => prev.map(doc => {
      if (matchingDocuments.some(md => md.id === doc.id)) {
        return {
          ...doc,
          collectionIds: [...(doc.collectionIds || []), newCollection.id]
        };
      }
      return doc;
    }));
    
    // Додаємо колекцію до списку
    setCollections(prev => {
      const updated = [...prev, newCollection];
      // Зберігаємо в localStorage
      saveCollectionsToStorage(updated);
      return updated;
    });
    
    toast.success(`Collection "${name}" created with ${matchingDocuments.length} documents`);
    
    // Автоматично відкриваємо створену колекцію
    setSelectedCollection(newCollection);
    setViewMode('collection-detail');
  };

  const handleCollectionClick = (collection: any) => {
    setSelectedCollection(collection);
    setViewMode('collection-detail');
  };

  const handleBackFromCollection = () => {
    setSelectedCollection(null);
    setViewMode('collections');
  };

  // Видалення документів з колекції (залишаємо їх в All Documents)
  const handleRemoveFromCollection = (collectionId: string, documentIds: string[]) => {
    // Оновлюємо документи - видаляємо collectionId з collectionIds
    setDocuments(prev => prev.map(doc => {
      if (documentIds.includes(doc.id || '')) {
        const updatedCollectionIds = (doc.collectionIds || []).filter(id => id !== collectionId);
        return {
          ...doc,
          collectionIds: updatedCollectionIds
        };
      }
      return doc;
    }));

    // Оновлюємо колекції - видаляємо documentIds та зберігаємо
    setCollections(prev => {
      const updated = prev.map(col => {
        if (col.id === collectionId) {
          const updatedDocumentIds = (col.documentIds || []).filter(id => !documentIds.includes(id));
          return {
            ...col,
            documentIds: updatedDocumentIds,
            count: updatedDocumentIds.length
          };
        }
        return col;
      });
      
      // Зберігаємо в localStorage
      saveCollectionsToStorage(updated);
      
      // Оновлюємо selectedCollection якщо це поточна колекція
      if (selectedCollection && selectedCollection.id === collectionId) {
        const updatedCollection = updated.find(col => col.id === collectionId);
        if (updatedCollection) {
          setSelectedCollection(updatedCollection);
        }
      }
      
      return updated;
    });

    toast.success(`${documentIds.length} ${documentIds.length === 1 ? 'document' : 'documents'} removed from collection`);
  };

  // Повне видалення документів (тільки на вкладці All Documents)
  const handleDeleteDocuments = (documentIds: string[]) => {
    // Видаляємо документи з All Documents (source of truth)
    setDocuments(prev => prev.filter(doc => !documentIds.includes(doc.id || '')));

    // Видаляємо з pinned
    setPinnedDocumentIds(prev => {
      const newSet = new Set(prev);
      documentIds.forEach(id => newSet.delete(id));
      return newSet;
    });

    // Видаляємо documentIds з усіх колекцій (тільки асоціації)
    setCollections(prev => {
      const updated = prev.map(col => {
        const updatedDocumentIds = (col.documentIds || []).filter(id => !documentIds.includes(id));
        return {
          ...col,
          documentIds: updatedDocumentIds,
          count: updatedDocumentIds.length
        };
      });
      
      // Зберігаємо оновлені колекції
      saveCollectionsToStorage(updated);
      
      return updated;
    });

    toast.success(`${documentIds.length} ${documentIds.length === 1 ? 'document' : 'documents'} deleted`);
  };

  return (
    <div className="h-screen w-screen bg-[#f9fafb] flex overflow-hidden">
      <GlobalSidebar />

      <div className="flex-1 ml-[72px] flex flex-col min-w-0 overflow-hidden" style={{ width: 'calc(100vw - 72px)', maxWidth: 'calc(100vw - 72px)' }}>
        <WorkspaceHeader onShowAIFilter={handleShowAIFilter} viewMode={viewMode} selectedCollection={selectedCollection} onUploadClick={() => setIsUploadModalOpen(true)} />
        
        <div className="flex-1 flex overflow-hidden min-w-0">
          <LeftTabsPanel 
            viewMode={viewMode} 
            onViewChange={setViewMode}
            isCollapsed={isLeftPanelCollapsed}
            onToggleCollapse={handleToggleLeftPanel}
            selectedOrganization={selectedOrganization}
            onOrganizationChange={setSelectedOrganization}
            pinnedDocumentIds={pinnedDocumentIds}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {viewMode === 'collection-detail' ? (
              <>
                {/* Header on full width */}
                <CollectionDetailHeader 
                  collection={selectedCollection}
                  onBack={handleBackFromCollection}
                  onAddDocument={() => setIsUploadModalOpen(true)}
                />
                {/* Content with right panel */}
                <div className="flex-1 flex overflow-hidden min-w-0">
                  <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ width: 0, flex: '1 1 0%' }}>
          <MainContent 
            viewMode={viewMode} 
            aiFilter={aiFilter} 
            onClearAIFilter={handleClearAIFilter}
            onUploadClick={() => setIsUploadModalOpen(true)}
            onNewCollectionClick={() => setIsNewCollectionModalOpen(true)}
            isLeftPanelCollapsed={isLeftPanelCollapsed}
            onToggleLeftPanel={handleToggleLeftPanel}
            onCollectionClick={handleCollectionClick}
            selectedCollection={selectedCollection}
            onBackFromCollection={handleBackFromCollection}
            documents={documents}
            selectedOrganization={selectedOrganization}
            onOrganizationChange={setSelectedOrganization}
            pinnedDocumentIds={pinnedDocumentIds}
            onPinToggle={handlePinToggle}
            collections={collections}
            onRemoveFromCollection={handleRemoveFromCollection}
            onDelete={handleDeleteDocuments}
          />
                  </div>
                  <div className="flex-shrink-0 flex-grow-0 border-l border-[#e8e8ec] overflow-hidden" style={{ width: '400px', minWidth: '400px', maxWidth: '400px' }}>
                    <FojoAssistantPanel collection={selectedCollection} documents={documents} />
                  </div>
                </div>
              </>
            ) : (
              <MainContent 
                viewMode={viewMode} 
                aiFilter={aiFilter} 
                onClearAIFilter={handleClearAIFilter}
                onUploadClick={() => setIsUploadModalOpen(true)}
                onNewCollectionClick={() => setIsNewCollectionModalOpen(true)}
                isLeftPanelCollapsed={isLeftPanelCollapsed}
                onToggleLeftPanel={handleToggleLeftPanel}
                onCollectionClick={handleCollectionClick}
                selectedCollection={selectedCollection}
                onBackFromCollection={handleBackFromCollection}
                documents={documents}
                selectedOrganization={selectedOrganization}
                onOrganizationChange={setSelectedOrganization}
                pinnedDocumentIds={pinnedDocumentIds}
                onPinToggle={handlePinToggle}
                collections={collections}
                onRemoveFromCollection={handleRemoveFromCollection}
                onDelete={handleDeleteDocuments}
              />
            )}
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onComplete={handleUploadComplete}
        collectionOrganization={selectedCollection?.organization}
      />

      {/* AI Assistant Banner */}
      <AIAssistantBanner
        uploadedDocuments={uploadedDocuments}
        onAddToCollection={(collectionName, docs) => {
          toast.success(`Added ${docs.length} documents to ${collectionName} collection`);
          setUploadedDocuments([]);
        }}
        onCreateCollection={(collectionName, docs) => {
          toast.success(`Created new collection "${collectionName}" with ${docs.length} documents`);
          setUploadedDocuments([]);
        }}
        onViewDetails={(suggestion) => {
          // Open modal with details
          console.log('View details for:', suggestion);
        }}
        onDismiss={() => {
          setUploadedDocuments([]);
        }}
      />

      <NewCollectionModal
        isOpen={isNewCollectionModalOpen}
        onClose={() => setIsNewCollectionModalOpen(false)}
        onCreateCollection={handleCreateCollection}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}
