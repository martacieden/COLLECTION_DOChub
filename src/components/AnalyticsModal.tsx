import React from 'react';
import { X, TrendingUp, Calendar, DollarSign, Building2, CheckCircle2, Clock, FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type?: string;
  category?: string;
  organization?: string;
  vendor?: string;
  client?: string;
  uploadedOn?: string;
  createdOn?: string;
  signatureStatus?: string;
  amount?: number;
  currency?: string;
}

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
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
  const orgCounts = uniqueOrgs.map(org => ({
    name: org,
    count: organizations.filter(o => o === org).length
  })).sort((a, b) => b.count - a.count);
  
  // Суми
  const amounts = documents
    .map(doc => doc.amount)
    .filter((amount): amount is number => typeof amount === 'number' && amount > 0);
  const totalAmount = amounts.length > 0 ? amounts.reduce((sum, amt) => sum + amt, 0) : null;
  const avgAmount = amounts.length > 0 ? totalAmount! / amounts.length : null;
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
  
  // Типи документів
  const types = documents
    .map(doc => doc.type || 'Unknown')
    .filter(Boolean);
  const typeCounts = types.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    count: documents.length,
    dateRange,
    orgCounts,
    totalAmount,
    avgAmount,
    currency,
    statusCounts,
    typeCounts
  };
}

export function AnalyticsModal({ isOpen, onClose, documents }: AnalyticsModalProps) {
  if (!isOpen) return null;
  
  const metadata = calculateMetadata(documents);
  
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
  
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="relative bg-white rounded-[12px] shadow-xl max-w-[900px] w-full mx-[24px] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec] flex-shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="bg-gradient-to-br from-[#f5f3ff] to-[#ede9fe] size-[40px] rounded-[8px] flex items-center justify-center">
              <TrendingUp className="size-[20px] text-[#7c3aed]" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#1c2024]">Summary Analytics</h2>
              <p className="text-[13px] text-[#60646c]">{documents.length} document{documents.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-[32px] w-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[18px] text-[#60646c]" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto px-[24px] py-[24px]">
          <div className="max-w-[800px] mx-auto space-y-[24px]">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              {/* Total Documents */}
              <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[16px]">
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <FileText className="size-[16px] text-[#60646c]" />
                  <span className="text-[12px] text-[#60646c]">Total Documents</span>
                </div>
                <p className="text-[24px] font-semibold text-[#1c2024]">{metadata?.count || 0}</p>
              </div>
              
              {/* Date Range */}
              {metadata?.dateRange && (
                <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[16px]">
                  <div className="flex items-center gap-[8px] mb-[8px]">
                    <Calendar className="size-[16px] text-[#60646c]" />
                    <span className="text-[12px] text-[#60646c]">Date Range</span>
                  </div>
                  <p className="text-[16px] font-semibold text-[#1c2024]">{formatDateRange()}</p>
                </div>
              )}
              
              {/* Total Amount */}
              {metadata?.totalAmount && (
                <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[16px]">
                  <div className="flex items-center gap-[8px] mb-[8px]">
                    <DollarSign className="size-[16px] text-[#60646c]" />
                    <span className="text-[12px] text-[#60646c]">Total Amount</span>
                  </div>
                  <p className="text-[24px] font-semibold text-[#1c2024]">
                    {formatAmount(metadata.totalAmount, metadata.currency)}
                  </p>
                  {metadata.avgAmount && (
                    <p className="text-[12px] text-[#60646c] mt-[4px]">
                      Avg: {formatAmount(metadata.avgAmount, metadata.currency)}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Status Breakdown */}
            {metadata?.statusCounts && (
              <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[20px]">
                <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[16px]">Status Breakdown</h3>
                <div className="space-y-[12px]">
                  {metadata.statusCounts.completed && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <CheckCircle2 className="size-[16px] text-[#059669]" />
                        <span className="text-[13px] text-[#1c2024]">Completed</span>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[120px] h-[8px] bg-[#e8e8ec] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#059669] rounded-full"
                            style={{ width: `${(metadata.statusCounts.completed / documents.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-medium text-[#1c2024] w-[40px] text-right">
                          {metadata.statusCounts.completed}
                        </span>
                      </div>
                    </div>
                  )}
                  {metadata.statusCounts.pending && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Clock className="size-[16px] text-[#B45309]" />
                        <span className="text-[13px] text-[#1c2024]">Pending</span>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[120px] h-[8px] bg-[#e8e8ec] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#B45309] rounded-full"
                            style={{ width: `${(metadata.statusCounts.pending / documents.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-medium text-[#1c2024] w-[40px] text-right">
                          {metadata.statusCounts.pending}
                        </span>
                      </div>
                    </div>
                  )}
                  {metadata.statusCounts.other && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <FileText className="size-[16px] text-[#60646c]" />
                        <span className="text-[13px] text-[#1c2024]">Other</span>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[120px] h-[8px] bg-[#e8e8ec] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#60646c] rounded-full"
                            style={{ width: `${(metadata.statusCounts.other / documents.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-medium text-[#1c2024] w-[40px] text-right">
                          {metadata.statusCounts.other}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Top Organizations */}
            {metadata?.orgCounts && metadata.orgCounts.length > 0 && (
              <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[20px]">
                <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[16px]">Top Organizations</h3>
                <div className="space-y-[12px]">
                  {metadata.orgCounts.slice(0, 5).map((org, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Building2 className="size-[16px] text-[#60646c]" />
                        <span className="text-[13px] text-[#1c2024]">{org.name}</span>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[120px] h-[8px] bg-[#e8e8ec] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#005be2] rounded-full"
                            style={{ width: `${(org.count / documents.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[13px] font-medium text-[#1c2024] w-[40px] text-right">
                          {org.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Document Types */}
            {metadata?.typeCounts && Object.keys(metadata.typeCounts).length > 0 && (
              <div className="bg-white border border-[#e8e8ec] rounded-[8px] p-[20px]">
                <h3 className="text-[14px] font-semibold text-[#1c2024] mb-[16px]">Document Types</h3>
                <div className="space-y-[12px]">
                  {Object.entries(metadata.typeCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([type, count], index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-[13px] text-[#1c2024]">{type}</span>
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[120px] h-[8px] bg-[#e8e8ec] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#7c3aed] rounded-full"
                              style={{ width: `${(count / documents.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-[13px] font-medium text-[#1c2024] w-[40px] text-right">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-[#e8e8ec] px-[24px] py-[16px] flex-shrink-0">
          <button
            onClick={onClose}
            className="h-[36px] px-[16px] bg-[#005be2] rounded-[6px] text-[13px] text-white hover:bg-[#0047b3] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

