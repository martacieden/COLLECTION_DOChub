import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, Link2, Info, Trash2, Users } from 'lucide-react';

// Types
interface SharedMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: 'owner' | 'full_access' | 'viewer';
  accessSource: 'direct' | 'linked_record';
  linkedRecords?: string[]; // Назви колекцій/records через які є доступ
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
  role: 'full_access' | 'viewer';
  members?: SharedMember[];
  accessSource: 'direct' | 'linked_record';
}

interface ShareCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  collection: {
    id: string;
    title: string;
    icon?: string;
    documentCount?: number;
    restrictedDocumentCount?: number;
  };
  // Callbacks
  onShare?: (email: string, role: 'full_access' | 'viewer') => void;
  onRemoveAccess?: (memberId: string) => void;
  onChangeRole?: (memberId: string, newRole: 'full_access' | 'viewer') => void;
  onToggleOrgAccess?: (enabled: boolean) => void;
  onCopyLink?: () => void;
  // Data
  members?: SharedMember[];
  teams?: Team[];
  isOrgAccessEnabled?: boolean;
}

// Mock data для демонстрації
const mockMembers: SharedMember[] = [
  {
    id: '1',
    name: 'Michael Thompson',
    email: 'mthompson@way2b1.com',
    initials: 'MT',
    role: 'owner',
    accessSource: 'direct',
  },
  {
    id: '2',
    name: 'Sarah Bell',
    email: 'bell.sarah@way2b1.com',
    initials: 'SB',
    role: 'full_access',
    accessSource: 'direct',
  },
  {
    id: '3',
    name: 'Rachel Anderson',
    email: 'randerson@way2b1.com',
    initials: 'RA',
    role: 'viewer',
    accessSource: 'direct',
  },
  {
    id: '4',
    name: 'David Chen',
    email: 'david.chen@way2b1.com',
    initials: 'DC',
    role: 'full_access',
    accessSource: 'direct',
  },
  // Linked record access
  {
    id: '5',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@way2b1.com',
    initials: 'SM',
    role: 'full_access',
    accessSource: 'linked_record',
    linkedRecords: ['Investment Portfolio'],
  },
  {
    id: '6',
    name: 'Emily Rodriguez',
    email: 'emily.r@gmail.com',
    initials: 'ER',
    role: 'full_access',
    accessSource: 'linked_record',
    linkedRecords: ['Investment Portfolio', 'Q4 Reports'],
  },
  {
    id: '7',
    name: 'Jennifer Parker',
    email: 'jparker@way2b1.com',
    initials: 'JP',
    role: 'viewer',
    accessSource: 'linked_record',
    linkedRecords: ['Investment Portfolio', 'Financial Records', 'Tax Documents'],
  },
];

const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Compliance team',
    memberCount: 3,
    role: 'full_access',
    accessSource: 'direct',
    members: [
      { id: 't1-1', name: 'Anastasia Bothman', email: 'anastasia@gmail.com', initials: 'AB', role: 'full_access', accessSource: 'direct' },
      { id: 't1-2', name: 'Allison Philips', email: 'allison@way2b1.com', initials: 'AP', role: 'full_access', accessSource: 'direct' },
      { id: 't1-3', name: 'Cheyenne Siphron', email: 'siphron@way2b1.com', initials: 'CS', role: 'full_access', accessSource: 'direct' },
    ],
  },
  {
    id: 't2',
    name: 'Accounting',
    memberCount: 15,
    role: 'viewer',
    accessSource: 'direct',
  },
];

// Avatar component
function Avatar({ initials, className = '' }: { initials: string; className?: string }) {
  // Генеруємо колір на основі ініціалів
  const colors = [
    'bg-[#e0e7ff] text-[#4f46e5]',
    'bg-[#fce7f3] text-[#db2777]',
    'bg-[#d1fae5] text-[#059669]',
    'bg-[#fef3c7] text-[#d97706]',
    'bg-[#e0e1e6] text-[#60646c]',
    'bg-[#dbeafe] text-[#2563eb]',
  ];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  
  return (
    <div className={`size-[36px] rounded-full flex items-center justify-center text-[13px] font-medium ${colors[colorIndex]} ${className}`}>
      {initials}
    </div>
  );
}

// Role dropdown component
function RoleDropdown({ 
  role, 
  onChange, 
  onRemove,
  disabled = false,
  showOwner = false 
}: { 
  role: 'owner' | 'full_access' | 'viewer'; 
  onChange?: (newRole: 'full_access' | 'viewer') => void;
  onRemove?: () => void;
  disabled?: boolean;
  showOwner?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const roleLabels = {
    owner: 'Owner',
    full_access: 'Full access',
    viewer: 'Viewer',
  };

  if (role === 'owner' || disabled) {
    return (
      <span className="text-[13px] text-[#60646c]">{roleLabels[role]}</span>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[4px] px-[8px] py-[4px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] rounded-[4px] transition-colors"
      >
        <span>{roleLabels[role]}</span>
        <ChevronDown className="size-[14px]" />
      </button>

      {isOpen && (
        <div className="absolute top-[28px] right-0 bg-white border border-[#e8e8ec] rounded-[8px] shadow-lg min-w-[240px] py-[4px] z-50">
          <button
            onClick={() => {
              onChange?.('full_access');
              setIsOpen(false);
            }}
            className={`w-full px-[12px] py-[10px] flex flex-col items-start text-left hover:bg-[#f9fafb] transition-colors ${role === 'full_access' ? 'bg-[#f0f7ff]' : ''}`}
          >
            <span className="text-[13px] text-[#1c2024] font-medium">Full access</span>
            <span className="text-[11px] text-[#60646c]">Can edit, rename, archive, and manage access</span>
          </button>
          <button
            onClick={() => {
              onChange?.('viewer');
              setIsOpen(false);
            }}
            className={`w-full px-[12px] py-[10px] flex flex-col items-start text-left hover:bg-[#f9fafb] transition-colors ${role === 'viewer' ? 'bg-[#f0f7ff]' : ''}`}
          >
            <span className="text-[13px] text-[#1c2024] font-medium">Viewer</span>
            <span className="text-[11px] text-[#60646c]">Can only view the collection</span>
          </button>
          {onRemove && (
            <>
              <div className="border-t border-[#e8e8ec] my-[4px]" />
              <button
                onClick={() => {
                  onRemove();
                  setIsOpen(false);
                }}
                className="w-full px-[12px] py-[10px] flex items-center gap-[8px] text-left hover:bg-[#fef2f2] transition-colors"
              >
                <Trash2 className="size-[14px] text-[#ef4444]" />
                <span className="text-[13px] text-[#ef4444]">Remove access</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Info tooltip for linked records
function LinkedRecordTooltip({ linkedRecords }: { linkedRecords: string[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const displayRecords = linkedRecords.slice(0, 3);
  const moreCount = linkedRecords.length - 3;

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button className="size-[16px] flex items-center justify-center">
        <Info className="size-[14px] text-[#8b8d98]" />
      </button>

      {isVisible && (
        <div 
          ref={tooltipRef}
          className="absolute bottom-[28px] right-0 bg-[#1c2024] text-white rounded-[8px] px-[12px] py-[10px] min-w-[160px] z-50 shadow-lg"
        >
          <p className="text-[12px] mb-[8px]">
            This person wasn't shared directly – they have access through linked records:
          </p>
          <ul className="space-y-[4px]">
            {displayRecords.map((record, index) => (
              <li key={index} className="text-[12px] flex items-center gap-[6px]">
                <span className="text-[#60646c]">•</span>
                <span className="text-[#3b82f6] underline cursor-pointer hover:text-[#60a5fa]">
                  {record}
                </span>
              </li>
            ))}
            {moreCount > 0 && (
              <li className="text-[12px] text-[#8b8d98]">
                +{moreCount} more records
              </li>
            )}
          </ul>
          {/* Arrow */}
          <div className="absolute bottom-[-6px] right-[12px] w-[12px] h-[12px] bg-[#1c2024] rotate-45" />
        </div>
      )}
    </div>
  );
}

// Search suggestion item
function SearchSuggestion({ 
  item, 
  type,
  onSelect 
}: { 
  item: SharedMember | Team;
  type: 'person' | 'team';
  onSelect: () => void;
}) {
  if (type === 'team') {
    const team = item as Team;
    return (
      <button
        onClick={onSelect}
        className="w-full px-[16px] py-[10px] flex items-center justify-between hover:bg-[#f9fafb] transition-colors"
      >
        <div className="flex items-center gap-[12px]">
          <div className="size-[36px] rounded-full bg-[#e0e1e6] flex items-center justify-center">
            <Users className="size-[16px] text-[#60646c]" />
          </div>
          <div className="text-left">
            <p className="text-[13px] text-[#1c2024] font-medium">{team.name}</p>
            <p className="text-[11px] text-[#60646c]">{team.memberCount} members</p>
          </div>
        </div>
        <span className="text-[12px] text-[#60646c]">Full access</span>
      </button>
    );
  }

  const person = item as SharedMember;
  return (
    <button
      onClick={onSelect}
      className="w-full px-[16px] py-[10px] flex items-center justify-between hover:bg-[#f9fafb] transition-colors"
    >
      <div className="flex items-center gap-[12px]">
        <Avatar initials={person.initials} />
        <div className="text-left">
          <p className="text-[13px] text-[#1c2024] font-medium">{person.name}</p>
          <p className="text-[11px] text-[#60646c]">{person.email}</p>
        </div>
      </div>
      {person.role !== 'owner' && (
        <span className="text-[12px] text-[#60646c]">
          {person.role === 'full_access' ? 'Full access' : 'Viewer'}
        </span>
      )}
    </button>
  );
}

export function ShareCollectionModal({
  isOpen,
  onClose,
  collection,
  onShare,
  onRemoveAccess,
  onChangeRole,
  onToggleOrgAccess,
  onCopyLink,
  members = mockMembers,
  teams = mockTeams,
  isOrgAccessEnabled = false,
}: ShareCollectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'teams'>('all');
  const [isLinkedRecordsExpanded, setIsLinkedRecordsExpanded] = useState(false);
  const [isTeamsLinkedExpanded, setIsTeamsLinkedExpanded] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [orgAccessEnabled, setOrgAccessEnabled] = useState(isOrgAccessEnabled);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setActiveTab('all');
      setShowSearchResults(false);
      setExpandedTeams([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter members
  const directAccessMembers = members.filter(m => m.accessSource === 'direct');
  const linkedAccessMembers = members.filter(m => m.accessSource === 'linked_record');
  
  const directAccessTeams = teams.filter(t => t.accessSource === 'direct');
  const linkedAccessTeams = teams.filter(t => t.accessSource === 'linked_record');

  const totalCount = directAccessMembers.length + linkedAccessMembers.length;
  const teamsCount = teams.length;

  // Search results
  const searchResults = searchQuery.trim() 
    ? {
        teams: teams.filter(t => 
          t.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        people: members.filter(m => 
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }
    : null;

  const toggleTeamExpanded = (teamId: string) => {
    setExpandedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleShare = () => {
    if (searchQuery.trim()) {
      onShare?.(searchQuery.trim(), 'viewer');
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleOrgToggle = () => {
    const newValue = !orgAccessEnabled;
    setOrgAccessEnabled(newValue);
    onToggleOrgAccess?.(newValue);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]" onClick={onClose}>
      <div 
        className="bg-white rounded-[12px] overflow-hidden flex flex-col shadow-2xl w-full max-w-[600px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-[#e8e8ec]">
          <div className="flex items-center gap-[12px]">
            <span className="text-[20px]">{collection.icon || '📁'}</span>
            <div>
              <h2 className="text-[16px] font-semibold text-[#1c2024]">Share collection</h2>
              <p className="text-[13px] text-[#60646c] truncate max-w-[300px]">{collection.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb] transition-colors"
          >
            <X className="size-[20px] text-[#60646c]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search Input */}
          <div className="px-[24px] pt-[20px] pb-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => setShowSearchResults(searchQuery.trim().length > 0)}
                  placeholder="Share with others by name or email"
                  className="w-full h-[40px] px-[12px] border border-[#e0e1e6] rounded-[8px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent"
                />
                
                {/* Search Dropdown */}
                {showSearchResults && searchResults && (searchResults.teams.length > 0 || searchResults.people.length > 0) && (
                  <div className="absolute top-[44px] left-0 right-0 bg-white border border-[#e8e8ec] rounded-[8px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                    {searchResults.teams.length > 0 && (
                      <div>
                        <p className="px-[16px] py-[8px] text-[11px] font-semibold text-[#8b8d98] uppercase">Teams</p>
                        {searchResults.teams.map(team => (
                          <SearchSuggestion 
                            key={team.id} 
                            item={team} 
                            type="team"
                            onSelect={() => {
                              setSearchQuery('');
                              setShowSearchResults(false);
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {searchResults.people.length > 0 && (
                      <div>
                        <p className="px-[16px] py-[8px] text-[11px] font-semibold text-[#8b8d98] uppercase">People</p>
                        {searchResults.people.map(person => (
                          <SearchSuggestion 
                            key={person.id} 
                            item={person} 
                            type="person"
                            onSelect={() => {
                              setSearchQuery('');
                              setShowSearchResults(false);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={handleShare}
                disabled={!searchQuery.trim()}
                style={{ paddingLeft: '20px', paddingRight: '20px' }}
                className="h-[40px] bg-[#005be2] rounded-[8px] text-[13px] text-white font-medium hover:bg-[#0047b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                Share
              </button>
            </div>
          </div>

          {/* Organization Access Toggle */}
          <div className="px-[24px] pb-[16px] mt-[16px]">
            <div 
              className="flex items-center justify-between p-[16px] bg-[#f9fafb] rounded-[8px] cursor-pointer hover:bg-[#f0f0f3] transition-colors mt-[12px]"
              onClick={handleOrgToggle}
            >
              <div className="flex items-center gap-[12px]">
                <div className="size-[36px] rounded-full bg-[#e0e1e6] flex items-center justify-center">
                  <Users className="size-[16px] text-[#60646c]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#1c2024] font-medium">Share with everyone in organization</p>
                  <p className="text-[11px] text-[#60646c]">All members will get viewer access</p>
                </div>
              </div>
              {/* Toggle Switch */}
              <div className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${orgAccessEnabled ? 'bg-[#005be2]' : 'bg-[#d1d5db]'}`}>
                <div className={`w-[20px] h-[20px] bg-white rounded-full shadow transition-transform ${orgAccessEnabled ? 'translate-x-[20px]' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-[24px] border-b border-[#e8e8ec]">
            <div className="flex gap-[24px] py-[12px]">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-[12px] pb-[12px] text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === 'all' 
                    ? 'text-[#1c2024] border-[#1c2024]' 
                    : 'text-[#60646c] border-transparent hover:text-[#1c2024]'
                }`}
              >
                All <span className="text-[#8b8d98]">{totalCount}</span>
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-[12px] pb-[12px] text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === 'teams' 
                    ? 'text-[#1c2024] border-[#1c2024]' 
                    : 'text-[#60646c] border-transparent hover:text-[#1c2024]'
                }`}
              >
                Teams <span className="text-[#8b8d98]">{teamsCount}</span>
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="px-[24px] py-[16px]">
            {activeTab === 'all' ? (
              <>
                {/* Direct Access Section */}
                <div className="mb-[16px]">
                  <p className="text-[11px] font-semibold text-[#8b8d98] uppercase mb-[12px]">
                    People with direct access
                  </p>
                  <div className="space-y-[4px]">
                    {directAccessMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between py-[8px]">
                        <div className="flex items-center gap-[12px]">
                          <Avatar initials={member.initials} />
                          <div>
                            <p className="text-[13px] text-[#1c2024] font-medium">{member.name}</p>
                            <p className="text-[11px] text-[#60646c]">{member.email}</p>
                          </div>
                        </div>
                        <RoleDropdown 
                          role={member.role}
                          onChange={(newRole) => onChangeRole?.(member.id, newRole)}
                          onRemove={member.role !== 'owner' ? () => onRemoveAccess?.(member.id) : undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linked Records Access Section */}
                {linkedAccessMembers.length > 0 && (
                  <div>
                    <button
                      onClick={() => setIsLinkedRecordsExpanded(!isLinkedRecordsExpanded)}
                      className="flex items-center gap-[8px] text-[11px] font-semibold text-[#8b8d98] uppercase mb-[12px] hover:text-[#60646c] transition-colors"
                    >
                      {isLinkedRecordsExpanded ? (
                        <ChevronDown className="size-[14px]" />
                      ) : (
                        <ChevronRight className="size-[14px]" />
                      )}
                      People with access where collection is attached ({linkedAccessMembers.length})
                    </button>
                    
                    {isLinkedRecordsExpanded && (
                      <div className="space-y-[4px]">
                        {linkedAccessMembers.map(member => (
                          <div key={member.id} className="flex items-center justify-between py-[8px]">
                            <div className="flex items-center gap-[12px]">
                              <Avatar initials={member.initials} />
                              <div>
                                <p className="text-[13px] text-[#1c2024] font-medium">{member.name}</p>
                                <p className="text-[11px] text-[#60646c]">{member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-[8px] mt-[4px] mb-[4px]">
                              <span className="text-[13px] text-[#60646c]">
                                {member.role === 'full_access' ? 'Full access' : 'Viewer'}
                              </span>
                              {member.linkedRecords && (
                                <LinkedRecordTooltip linkedRecords={member.linkedRecords} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Teams Tab */
              <>
                {/* Direct Access Teams */}
                {directAccessTeams.length > 0 ? (
                  <div className="mb-[16px]">
                    <p className="text-[11px] font-semibold text-[#8b8d98] uppercase mb-[12px]">
                      Teams with direct access
                    </p>
                    <div className="space-y-[4px]">
                      {directAccessTeams.map(team => (
                        <div key={team.id}>
                          <div className="flex items-center justify-between py-[8px]">
                            <div className="flex items-center gap-[12px]">
                              <button
                                onClick={() => toggleTeamExpanded(team.id)}
                                className="size-[36px] rounded-full bg-[#e0e1e6] flex items-center justify-center hover:bg-[#d1d5db] transition-colors"
                              >
                                {expandedTeams.includes(team.id) ? (
                                  <ChevronDown className="size-[16px] text-[#60646c]" />
                                ) : (
                                  <ChevronRight className="size-[16px] text-[#60646c]" />
                                )}
                              </button>
                              <div>
                                <p className="text-[13px] text-[#1c2024] font-medium">{team.name}</p>
                                <p className="text-[11px] text-[#60646c]">{team.memberCount} members</p>
                              </div>
                            </div>
                            <RoleDropdown 
                              role={team.role}
                              onChange={(newRole) => {/* TODO: handle team role change */}}
                              onRemove={() => {/* TODO: handle team remove */}}
                            />
                          </div>
                          
                          {/* Expanded team members */}
                          {expandedTeams.includes(team.id) && team.members && (
                            <div className="ml-[48px] border-l border-[#e8e8ec] pl-[16px] space-y-[4px]">
                              {team.members.map(member => (
                                <div key={member.id} className="flex items-center gap-[12px] py-[8px]">
                                  <Avatar initials={member.initials} className="size-[28px] text-[11px]" />
                                  <div>
                                    <p className="text-[13px] text-[#1c2024]">{member.name}</p>
                                    <p className="text-[11px] text-[#60646c]">{member.email}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Empty state for teams */
                  <div className="flex flex-col items-center justify-center py-[48px] text-center">
                    <div className="size-[48px] rounded-full bg-[#f0f0f3] flex items-center justify-center mb-[16px]">
                      <Users className="size-[24px] text-[#8b8d98]" />
                    </div>
                    <p className="text-[13px] text-[#60646c] font-medium mb-[4px]">No teams found</p>
                    <p className="text-[11px] text-[#8b8d98]">Share access for collaboration</p>
                  </div>
                )}

                {/* Linked Access Teams */}
                {linkedAccessTeams.length > 0 && (
                  <div>
                    <button
                      onClick={() => setIsTeamsLinkedExpanded(!isTeamsLinkedExpanded)}
                      className="flex items-center gap-[8px] text-[11px] font-semibold text-[#8b8d98] uppercase mb-[12px] hover:text-[#60646c] transition-colors"
                    >
                      {isTeamsLinkedExpanded ? (
                        <ChevronDown className="size-[14px]" />
                      ) : (
                        <ChevronRight className="size-[14px]" />
                      )}
                      Teams with access where collection is attached
                    </button>
                    
                    {isTeamsLinkedExpanded && (
                      <div className="space-y-[4px]">
                        {linkedAccessTeams.map(team => (
                          <div key={team.id} className="flex items-center justify-between py-[8px]">
                            <div className="flex items-center gap-[12px]">
                              <div className="size-[36px] rounded-full bg-[#e0e1e6] flex items-center justify-center">
                                <Users className="size-[16px] text-[#60646c]" />
                              </div>
                              <div>
                                <p className="text-[13px] text-[#1c2024] font-medium">{team.name}</p>
                                <p className="text-[11px] text-[#60646c]">{team.memberCount} members</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                              <span className="text-[13px] text-[#60646c]">
                                {team.role === 'full_access' ? 'Full access' : 'Viewer'}
                              </span>
                              <Info className="size-[14px] text-[#8b8d98]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Document Info Banner (for collections) */}
          {collection.documentCount !== undefined && collection.documentCount > 0 && (
            <div className="mx-[24px] mb-[16px] p-[12px] bg-[#f0f7ff] border border-[#bfdbfe] rounded-[8px]">
              <p className="text-[12px] text-[#1e40af]">
                📄 This collection contains <span className="font-semibold">{collection.documentCount} documents</span>
                {collection.restrictedDocumentCount !== undefined && collection.restrictedDocumentCount > 0 && (
                  <>
                    {'. '}
                    <span className="text-[#dc2626]">
                      {collection.restrictedDocumentCount} are restricted and require separate access.
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-[24px] py-[16px] border-t border-[#e8e8ec]">
          <button
            onClick={() => {
              onCopyLink?.();
              // Could show toast here
            }}
            style={{ paddingLeft: '16px', paddingRight: '16px' }}
            className="flex items-center gap-[8px] h-[36px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] rounded-[6px] transition-colors shrink-0"
          >
            <Link2 className="size-[16px] text-[#60646c]" />
            <span>Copy link</span>
          </button>
          <button
            onClick={onClose}
            style={{ paddingLeft: '20px', paddingRight: '20px' }}
            className="h-[36px] border border-[#e0e1e6] rounded-[6px] text-[13px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors ml-[12px] shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
