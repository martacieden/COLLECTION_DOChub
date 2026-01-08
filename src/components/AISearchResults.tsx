import React, { useMemo } from 'react';
import { FileText, Plus, Filter, Download, Share2, Sparkles, TrendingUp, Calendar, DollarSign, Building2, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type?: string;
  category?: string;
  organization?: string;
  uploadedOn?: string;
  createdOn?: string;
  signatureStatus?: string;
  amount?: number;
  currency?: string;
  vendor?: string;
  client?: string;
}

interface AISearchResultsProps {
  query: string;
  documents: Document[];
  onViewDocuments?: () => void;
  onCreateCollection?: () => void;
  onCreateDocument?: () => void;
  onApplyFilters?: () => void;
  onExport?: () => void;
  onShare?: () => void;
  onGenerateInsights?: () => void;
}

// Функція для розпізнавання наміру користувача
function detectIntent(query: string): {
  intent: 'search' | 'create' | 'manage' | 'analyze';
  documentType?: string;
  isInvoice?: boolean;
} {
  const lowerQuery = query.toLowerCase();
  
  // Перевірка на створення
  const createKeywords = ['create', 'створи', 'make', 'зроби', 'new', 'новий', 'add', 'додай'];
  const isCreate = createKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Перевірка на аналіз
  const analyzeKeywords = ['analyze', 'аналіз', 'summary', 'підсумок', 'report', 'звіт', 'insights', 'аналітика'];
  const isAnalyze = analyzeKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Перевірка на управління
  const manageKeywords = ['organize', 'організуй', 'manage', 'керуй', 'group', 'групуй'];
  const isManage = manageKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Перевірка на інвойси
  const invoiceKeywords = ['invoice', 'інвойс', 'invoices', 'інвойси', 'bill', 'рахунок'];
  const isInvoice = invoiceKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Визначення типу документа
  const documentTypes = ['invoice', 'contract', 'permit', 'waiver', 'lien', 'change order'];
  let documentType: string | undefined;
  for (const type of documentTypes) {
    if (lowerQuery.includes(type)) {
      documentType = type;
      break;
    }
  }
  
  if (isCreate) {
    return { intent: 'create', documentType, isInvoice: isInvoice || documentType === 'invoice' };
  }
  if (isAnalyze) {
    return { intent: 'analyze', documentType, isInvoice: isInvoice || documentType === 'invoice' };
  }
  if (isManage) {
    return { intent: 'manage', documentType, isInvoice: isInvoice || documentType === 'invoice' };
  }
  
  return { intent: 'search', documentType, isInvoice: isInvoice || documentType === 'invoice' };
}

// Функція для обчислення метаданих документів
function calculateMetadata(documents: Document[]) {
  if (documents.length === 0) {
    return null;
  }
  
  // Дати
  const dates = documents
    .map(doc => {
      const dateStr = doc.uploadedOn || doc.createdOn;
      if (!dateStr) return null;
      // Парсимо дату (може бути в різних форматах)
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? null : date;
    })
    .filter(Boolean) as Date[];
  
  const dateRange = dates.length > 0 ? {
    min: new Date(Math.min(...dates.map(d => d.getTime()))),
    max: new Date(Math.max(...dates.map(d => d.getTime())))
  } : null;
  
  // Організації/Vendors
  const organizations = documents
    .map(doc => doc.organization || doc.vendor || doc.client)
    .filter(Boolean) as string[];
  const uniqueOrgs = [...new Set(organizations)];
  const topOrgs = uniqueOrgs.slice(0, 3);
  
  // Суми (якщо є)
  const amounts = documents
    .map(doc => doc.amount)
    .filter((amount): amount is number => typeof amount === 'number' && amount > 0);
  const totalAmount = amounts.length > 0 ? amounts.reduce((sum, amt) => sum + amt, 0) : null;
  const currency = documents.find(doc => doc.currency)?.currency || 'USD';
  
  // Статуси
  const statuses = documents
    .map(doc => doc.signatureStatus)
    .filter(Boolean) as string[];
  const statusCounts = statuses.reduce((acc, status) => {
    const normalized = status.toLowerCase();
    if (normalized.includes('paid') || normalized.includes('signed')) {
      acc.completed = (acc.completed || 0) + 1;
    } else if (normalized.includes('pending')) {
      acc.pending = (acc.pending || 0) + 1;
    } else {
      acc.other = (acc.other || 0) + 1;
    }
    return acc;
  }, {} as { completed?: number; pending?: number; other?: number });
  
  return {
    count: documents.length,
    dateRange,
    topOrgs,
    totalAmount,
    currency,
    statusCounts
  };
}

export function AISearchResults({
  query,
  documents,
  onViewDocuments,
  onCreateCollection,
  onCreateDocument,
  onApplyFilters,
  onExport,
  onShare,
  onGenerateInsights
}: AISearchResultsProps) {
  const intent = useMemo(() => detectIntent(query), [query]);
  const metadata = useMemo(() => calculateMetadata(documents), [documents]);
  
  if (documents.length === 0) {
    return (
      <div className="px-[24px] py-[32px] text-center">
        <div className="bg-[#f0f0f3] text-[#60646c] rounded-[8px] size-[48px] flex items-center justify-center mx-auto mb-[16px]">
          <FileText className="size-[20px]" />
        </div>
        <h3 className="text-[16px] font-medium text-[#1c2024] mb-[4px]">No documents found</h3>
        <p className="text-[13px] text-[#60646c]">Try a different search query</p>
      </div>
    );
  }
  
  // Форматування діапазону дат
  const formatDateRange = () => {
    if (!metadata?.dateRange) return null;
    const { min, max } = metadata.dateRange;
    const formatMonth = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
    const formatYear = (date: Date) => date.getFullYear();
    
    if (formatYear(min) === formatYear(max)) {
      return `${formatMonth(min)}–${formatMonth(max)} ${formatYear(min)}`;
    }
    return `${formatMonth(min)} ${formatYear(min)}–${formatMonth(max)} ${formatYear(max)}`;
  };
  
  // Форматування суми
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  return (
    <div className="px-[24px] py-[32px]">
      {/* Summary Block */}
      <div className="bg-white border border-[#e8e8ec] rounded-[12px] p-[24px] mb-[24px]">
        <div className="flex items-start gap-[16px] mb-[20px]">
          <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] size-[40px] rounded-[8px] flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-[20px] text-[#7c3aed]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-semibold text-[#1c2024] mb-[8px]">
              We found {metadata?.count || documents.length} {intent.isInvoice ? 'invoice' : intent.documentType || 'document'}{documents.length !== 1 ? 's' : ''}
            </h3>
            
            {/* Metadata Insights */}
            <div className="space-y-[8px]">
              {metadata?.dateRange && (
                <div className="flex items-center gap-[8px] text-[13px] text-[#60646c]">
                  <Calendar className="size-[14px]" />
                  <span>{formatDateRange()}</span>
                </div>
              )}
              
              {metadata?.topOrgs && metadata.topOrgs.length > 0 && (
                <div className="flex items-center gap-[8px] text-[13px] text-[#60646c]">
                  <Building2 className="size-[14px]" />
                  <span>
                    {metadata.topOrgs.length === 1 
                      ? `From ${metadata.topOrgs[0]}`
                      : `From ${metadata.topOrgs.length} ${intent.isInvoice ? 'vendors' : 'organizations'}`}
                  </span>
                </div>
              )}
              
              {metadata?.totalAmount && (
                <div className="flex items-center gap-[8px] text-[13px] text-[#60646c]">
                  <DollarSign className="size-[14px]" />
                  <span>Total: {formatAmount(metadata.totalAmount, metadata.currency)}</span>
                </div>
              )}
              
              {metadata?.statusCounts && (
                <div className="flex items-center gap-[12px] text-[13px] text-[#60646c]">
                  {metadata.statusCounts.completed && (
                    <div className="flex items-center gap-[4px]">
                      <CheckCircle2 className="size-[14px] text-[#059669]" />
                      <span>{metadata.statusCounts.completed} completed</span>
                    </div>
                  )}
                  {metadata.statusCounts.pending && (
                    <div className="flex items-center gap-[4px]">
                      <Clock className="size-[14px] text-[#B45309]" />
                      <span>{metadata.statusCounts.pending} pending</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Primary Actions */}
        <div className="mb-[16px]">
          <p className="text-[13px] text-[#60646c] mb-[12px]">What would you like to do next?</p>
          <div className="flex flex-wrap gap-[8px]">
            {onCreateCollection && (
              <button
                onClick={onCreateCollection}
                className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3] flex items-center gap-[6px] transition-colors"
              >
                <FileText className="size-[16px]" />
                <span>Create a collection from these {intent.isInvoice ? 'invoices' : 'documents'}</span>
              </button>
            )}
            
            {intent.intent === 'create' && onCreateDocument && (
              <button
                onClick={onCreateDocument}
                className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3] flex items-center gap-[6px] transition-colors"
              >
                <Plus className="size-[16px]" />
                <span>Create a new {intent.isInvoice ? 'invoice' : 'document'}</span>
              </button>
            )}
            
            {onViewDocuments && (
              <button
                onClick={onViewDocuments}
                className="h-[36px] px-[16px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px] transition-colors"
              >
                <FileText className="size-[16px]" />
                <span>View documents</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-[8px]">
          {onGenerateInsights && (
            <button
              onClick={onGenerateInsights}
              className="h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[12px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px] transition-colors"
            >
              <TrendingUp className="size-[14px]" />
              <span>See summary analytics</span>
            </button>
          )}
          
          {onApplyFilters && (
            <button
              onClick={onApplyFilters}
              className="h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[12px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px] transition-colors"
            >
              <Filter className="size-[14px]" />
              <span>Apply filters</span>
            </button>
          )}
          
          {onExport && (
            <button
              onClick={onExport}
              className="h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[12px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px] transition-colors"
            >
              <Download className="size-[14px]" />
              <span>Export ({intent.isInvoice ? 'PDF / CSV' : 'PDF'})</span>
            </button>
          )}
          
          {onShare && (
            <button
              onClick={onShare}
              className="h-[32px] px-[12px] border border-[#e0e1e6] rounded-[6px] text-[12px] text-[#1c2024] hover:bg-[#f9fafb] flex items-center gap-[6px] transition-colors"
            >
              <Share2 className="size-[14px]" />
              <span>Share as a collection</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}









