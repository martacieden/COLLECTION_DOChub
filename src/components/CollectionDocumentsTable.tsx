interface CollectionDocument {
  id: string;
  name: string;
  location: string;
  category: string;
  shared: string;
  createdBy: string;
  createdOn: string;
  lastUpdate: string;
  icon: React.ReactNode;
  avatar: string;
}

interface CollectionDocumentsTableProps {
  documents: CollectionDocument[];
  selectedDocuments: string[];
  onSelectDocument: (docId: string) => void;
  onSelectAll: () => void;
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px]" onClick={onChange}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute inset-0 size-full cursor-pointer opacity-0 z-10"
      />
      <div className={`bg-white relative rounded-[4px] size-[20px] ${checked ? 'bg-[#005be2]' : ''}`}>
        <div aria-hidden="true" className={`absolute border ${checked ? 'border-[#005be2]' : 'border-[#e0e1e6]'} border-solid inset-0 pointer-events-none rounded-[4px]`} />
        {checked && (
          <svg className="absolute inset-0 m-auto size-[12px]" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
}

function CheckboxContainer({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0">
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
}

function CheckboxCell({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[12px] items-start relative shrink-0">
      <CheckboxContainer checked={checked} onChange={onChange} />
    </div>
  );
}

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center pl-[16px] pr-[4px] py-[16px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

function TableCell({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <div className="h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb] cursor-pointer" onClick={onClick}>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center pl-[16px] pr-[4px] py-[16px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

function NameTableHeaderCell({ text, allSelected, onSelectAll }: { text: string; allSelected: boolean; onSelectAll: () => void }) {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center px-[16px] py-[16px] relative w-full">
          <CheckboxCell checked={allSelected} onChange={onSelectAll} />
          <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
            <div className="flex flex-col font-['Inter',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[11px] text-nowrap uppercase tracking-wider">
              <p className="leading-[20px] whitespace-pre font-medium">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextHeaderCell({ text }: { text: string }) {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center px-[16px] py-[16px] relative w-full">
          <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
            <div className="flex flex-col font-['Inter',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[11px] text-nowrap uppercase tracking-wider">
              <p className="leading-[20px] whitespace-pre font-medium">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NameTableCell({ 
  doc, 
  selected, 
  onSelect 
}: { 
  doc: CollectionDocument; 
  selected: boolean; 
  onSelect: () => void;
}) {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb] group">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <CheckboxCell checked={selected} onChange={onSelect} />
          <div className="flex items-center gap-[8px] flex-1">
            <div className="size-[24px] rounded-[6px] bg-[#f0f0f3] flex items-center justify-center shrink-0">
              {doc.icon}
            </div>
            <p className="font-['Inter',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden text-[#1c2024] text-[13px] text-nowrap font-medium">
              {doc.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextTableCell({ text, isLink }: { text: string; isLink?: boolean }) {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb]">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className={`font-['Inter',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[13px] text-nowrap whitespace-pre ${
            isLink ? 'text-[#005be2]' : 'text-[#1c2024]'
          }`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryTableCell({ category }: { category: string }) {
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'Properties':
        return 'bg-[#E7F5E9] text-[#16794C]';
      case 'Aviation':
        return 'bg-[#E0F2FE] text-[#0369A1]';
      case 'Maritime':
        return 'bg-[#DBEAFE] text-[#1E40AF]';
      default:
        return 'bg-[#f0f0f3] text-[#60646c]';
    }
  };

  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb]">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <span className={`px-[8px] py-[4px] rounded-[4px] text-[13px] font-['Inter',sans-serif] ${getCategoryStyle(category)}`}>
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}

function SharedTableCell({ shared }: { shared: string }) {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb]">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <div className="flex items-center gap-[6px]">
            <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
              <path d="M7 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#60646c"/>
            </svg>
            <span className="font-['Inter',sans-serif] leading-[20px] not-italic text-[#60646c] text-[13px]">{shared}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatedByTableCell({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full hover:bg-[#f9fafb]">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <img src={avatar} alt={name} className="size-[24px] rounded-full shrink-0" />
          <span className="font-['Inter',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden text-[#1c2024] text-[13px] text-nowrap">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CollectionDocumentsTable({
  documents,
  selectedDocuments,
  onSelectDocument,
  onSelectAll
}: CollectionDocumentsTableProps) {
  const allSelected = documents.length > 0 && selectedDocuments.length === documents.length;

  return (
    <div className="bg-white flex overflow-x-auto relative">
      {/* Name Column */}
      <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 min-w-[320px]">
        <NameTableHeaderCell text="Name ↑" allSelected={allSelected} onSelectAll={onSelectAll} />
        {documents.map((doc) => (
          <NameTableCell
            key={doc.id}
            doc={doc}
            selected={selectedDocuments.includes(doc.id)}
            onSelect={() => onSelectDocument(doc.id)}
          />
        ))}
      </div>

      {/* ID Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[120px]">
        <TextHeaderCell text="ID" />
        {documents.map((doc) => (
          <TextTableCell key={doc.id} text={doc.id} isLink />
        ))}
      </div>

      {/* Location Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[200px]">
        <TextHeaderCell text="Location" />
        {documents.map((doc) => (
          <TextTableCell key={doc.id} text={doc.location} />
        ))}
      </div>

      {/* Category Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[140px]">
        <TextHeaderCell text="Category" />
        {documents.map((doc) => (
          <CategoryTableCell key={doc.id} category={doc.category} />
        ))}
      </div>

      {/* Shared Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[120px]">
        <TextHeaderCell text="Shared" />
        {documents.map((doc) => (
          <SharedTableCell key={doc.id} shared={doc.shared} />
        ))}
      </div>

      {/* Created By Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[180px]">
        <TextHeaderCell text="Created by" />
        {documents.map((doc) => (
          <CreatedByTableCell key={doc.id} name={doc.createdBy} avatar={doc.avatar} />
        ))}
      </div>

      {/* Created On Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[140px]">
        <TextHeaderCell text="Created on" />
        {documents.map((doc) => (
          <TextTableCell key={doc.id} text={doc.createdOn} />
        ))}
      </div>

      {/* Last Update Column */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 min-w-[140px]">
        <TextHeaderCell text="Last update" />
        {documents.map((doc) => (
          <TextTableCell key={doc.id} text={doc.lastUpdate} />
        ))}
      </div>
    </div>
  );
}