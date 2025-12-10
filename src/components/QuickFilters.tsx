import React from 'react';
import { CheckCircle2, Clock, Upload, Users, Calendar, AlertCircle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadedOn?: string;
  uploadedBy?: string;
  signatureStatus?: string;
  sharedWith?: string[];
  lastUpdate?: string;
}

interface QuickFiltersProps {
  documents: Document[];
  activeFilter: string | null;
  onFilterClick: (filterId: string | null) => void;
  currentUser?: string;
}

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

export function QuickFilters({ documents, activeFilter, onFilterClick, currentUser = 'Joan Zhao' }: QuickFiltersProps) {
  // Функція для перевірки, чи документ підписаний
  const isSigned = (doc: Document): boolean => {
    const status = doc.signatureStatus?.toLowerCase() || '';
    return status.includes('signed') || status.includes('executed');
  };

  // Функція для перевірки, чи документ очікує підпис
  const isPendingSignature = (doc: Document): boolean => {
    const status = doc.signatureStatus?.toLowerCase() || '';
    return status.includes('pending') || status.includes('review') || !status || status === '';
  };

  // Функція для перевірки, чи документ завантажений поточним користувачем
  const isUploadedByMe = (doc: Document): boolean => {
    return doc.uploadedBy?.toLowerCase() === currentUser.toLowerCase();
  };

  // Функція для перевірки, чи документ поділений з поточним користувачем
  const isSharedWithMe = (doc: Document): boolean => {
    return doc.sharedWith?.some(user => user.toLowerCase() === currentUser.toLowerCase()) || false;
  };

  // Функція для перевірки, чи документ завантажений за останні 7 днів
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

  // Функція для перевірки, чи документ спливає цього місяця
  const isExpiringThisMonth = (doc: Document): boolean => {
    // Перевіряємо lastUpdate або uploadedOn як дату закінчення (mock data)
    // У реальному додатку це буде поле expirationDate
    if (!doc.lastUpdate) return false;
    try {
      const docDate = new Date(doc.lastUpdate);
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return docDate.getMonth() === currentMonth && docDate.getFullYear() === currentYear;
    } catch {
      return false;
    }
  };

  // Підрахунок документів для кожного фільтру
  const signedCount = documents.filter(isSigned).length;
  const pendingCount = documents.filter(isPendingSignature).length;
  const uploadedByMeCount = documents.filter(isUploadedByMe).length;
  const sharedWithMeCount = documents.filter(isSharedWithMe).length;
  const recentUploadsCount = documents.filter(isRecentUpload).length;
  const expiringThisMonthCount = documents.filter(isExpiringThisMonth).length;

  const filters: QuickFilter[] = [
    { 
      id: 'expiring-this-month', 
      label: 'Expiring This Month', 
      icon: <AlertCircle className="size-[14px]" />,
      count: expiringThisMonthCount 
    },
    { 
      id: 'signed', 
      label: 'Signed', 
      icon: <CheckCircle2 className="size-[14px]" />,
      count: signedCount 
    },
    { 
      id: 'pending-signature', 
      label: 'Pending signature', 
      icon: <Clock className="size-[14px]" />,
      count: pendingCount 
    },
    { 
      id: 'uploaded-by-me', 
      label: 'Uploaded by me', 
      icon: <Upload className="size-[14px]" />,
      count: uploadedByMeCount 
    },
    { 
      id: 'shared-with-me', 
      label: 'Shared with me', 
      icon: <Users className="size-[14px]" />,
      count: sharedWithMeCount 
    },
    { 
      id: 'recent-uploads', 
      label: 'Recent uploads', 
      icon: <Calendar className="size-[14px]" />,
      count: recentUploadsCount 
    },
  ];

  return (
    <div className="sticky top-[56px] z-[19] border-b border-[#e8e8ec] px-[24px] py-[12px] bg-white flex-shrink-0">
      <div className="flex items-center gap-[8px] flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterClick(activeFilter === filter.id ? null : filter.id)}
            className={`px-[12px] py-[6px] rounded-[6px] text-[13px] font-normal transition-colors border flex items-center gap-[6px] ${
              activeFilter === filter.id
                ? 'bg-[#005be2] text-white border-[#005be2]'
                : 'bg-white text-[#1c2024] border-[#e0e1e6] hover:bg-[#f9fafb]'
            }`}
          >
            {filter.icon}
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className={`text-[12px] ${
                activeFilter === filter.id ? 'text-white/90' : 'text-[#60646c]'
              }`}>
                ({filter.count})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

