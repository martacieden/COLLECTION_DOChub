import svgPaths from "./svg-tmeiqkylpl";

function X() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="x">
          <path clipRule="evenodd" d={svgPaths.p14590800} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <X />
    </div>
  );
}

function IconButton() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[24px] h-[48px] items-center justify-end pl-[40px] pr-[24px] py-[12px] relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Bold',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[16px] tracking-[-0.08px]">
            <p className="leading-[24px]">Upload documents</p>
          </div>
          <IconButton />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[4px] items-center leading-[20px] not-italic relative shrink-0 text-[12px] text-nowrap w-full whitespace-pre" data-name="label">
      <p className="font-['Inter:Medium',sans-serif] relative shrink-0 text-[#1c2024]">Choose organization</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] relative shrink-0 text-[#e5484d]">*</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#f0f0f3] box-border content-stretch flex flex-col items-center justify-center overflow-clip p-[6px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Avatar">
      <p className="font-['Inter:Semi_Bold',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[8px] text-center text-nowrap tracking-[0.0032px] whitespace-pre">SF</p>
    </div>
  );
}

function IconLeftContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[4px] py-0 relative shrink-0" data-name="icon left-container">
      <Avatar />
    </div>
  );
}

function InputContainer() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="input-container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[4px] py-0 relative size-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[13px]">Smith Family</p>
        </div>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path clipRule="evenodd" d={svgPaths.p3713b000} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function IconRightContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip px-[4px] py-0 relative shrink-0" data-name="icon right-container">
      <ChevronDown />
    </div>
  );
}

function Root() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="root">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[4px] py-[8px] relative w-full">
          <IconLeftContainer />
          <InputContainer />
          <IconRightContainer />
        </div>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text field">
      <Label />
      <Root />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] items-center justify-center px-0 py-[24px] relative rounded-[8px] shrink-0 w-full" data-name="Empty state">
      <div aria-hidden="true" className="absolute border border-[#b9bbc6] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] text-center text-nowrap tracking-[-0.04px]">
        <p className="leading-[22px] whitespace-pre">Drop more files here or click to upload</p>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Name</p>
      </div>
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center pl-[8px] pr-[16px] py-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-[-0.5px] top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader />
        </div>
      </div>
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText />
    </div>
  );
}

function TableCell() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar1 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Property_Management_Agreement_TreeCutting_Co.pdf</p>
        </div>
      </div>
    </div>
  );
}

function FileText1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText1 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar2 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Will Amendment for the Smith Family</p>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="table">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="table">
          <path clipRule="evenodd" d={svgPaths.p159fc8f0} fill="var(--fill-0, #218358)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Table />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar3 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">IRA Consent Document for Shareholders</p>
        </div>
      </div>
    </div>
  );
}

function Photo() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="photo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="photo">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p196ac680} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p21b2080} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pe048200} fill="var(--fill-0, #CE2C31)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="bg-[#feebec] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Photo />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar4 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Homeowners Insurance Renewal Policy</p>
        </div>
      </div>
    </div>
  );
}

function Music() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="music">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="music">
          <g id="shape">
            <path d={svgPaths.p2d891172} fill="var(--fill-0, #CE2C31)" />
            <path d={svgPaths.p236c8380} fill="var(--fill-0, #CE2C31)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="bg-[#feebec] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Music />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar5 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Employment Agreement for the Martinez Family</p>
        </div>
      </div>
    </div>
  );
}

function FileText2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText2 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar6 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Automobile Insurance Claim Form</p>
        </div>
      </div>
    </div>
  );
}

function Columns() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-clip relative shrink-0 z-[3]" data-name="Columns">
      <TableHeaderCell />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <TableHeader1 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_3112)" id="Frame">
          <g id="Vector"></g>
          <path d={svgPaths.p11639d00} id="Vector_2" stroke="var(--stroke-0, #1150B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_18_3112">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Uploading...</p>
      </div>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-center flex flex-wrap gap-[8px] h-[36px] items-center justify-between px-[16px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ce2c31] text-[13px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">Upload failed, try again</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check">
          <path clipRule="evenodd" d={svgPaths.p3f7d5d00} fill="var(--fill-0, #218358)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-[32px] py-[8px] relative w-full">
          <Check />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[13px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">Uploaded</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check">
          <path clipRule="evenodd" d={svgPaths.p3f7d5d00} fill="var(--fill-0, #218358)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Check1 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[13px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">Uploaded</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Columns1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 z-[2]" data-name="Columns">
      <TableHeaderCell1 />
      {[...Array(2).keys()].map((_, i) => (
        <TableCell6 key={i} />
      ))}
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell9 />
      <TableCell8 />
      <TableCell9 />
      <TableCell9 />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[36px] items-center justify-center pl-[8px] pr-[24px] py-[12px] w-full" />
      </div>
    </div>
  );
}

function Dots() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots">
          <path clipRule="evenodd" d={svgPaths.p2e576200} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Dots />
    </div>
  );
}

function IconButton1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer1 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <IconButton1 />
        </div>
      </div>
    </div>
  );
}

function Columns2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[40px] z-[1]" data-name="Columns">
      <TableHeaderCell2 />
      {[...Array(9).keys()].map((_, i) => (
        <TableCell10 key={i} />
      ))}
    </div>
  );
}

function Table1() {
  return (
    <div className="basis-0 content-stretch flex grow isolate items-start min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Table">
      <Columns />
      <Columns1 />
      <Columns2 />
    </div>
  );
}

function TextContainer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="text-container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-[16px] px-[24px] relative size-full">
          <TextField />
          <EmptyState />
          <Table1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextArea() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text area">
      <TextContainer />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-left">
          <path clipRule="evenodd" d={svgPaths.p6431400} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer2() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[32px]" data-name="content-container">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-[32px]">
        <ArrowLeft />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function IconButton2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer2 />
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center p-[16px] relative w-full">
          <IconButton2 />
          <p className="font-['Inter:Semi_Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1c2024] text-[16px] text-nowrap tracking-[-0.0128px] whitespace-pre">AI assistant</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Prompts() {
  return <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px overflow-clip px-[20px] py-[24px] rounded-[12px] shrink-0 w-[400px]" data-name="Prompts" />;
}

function Badge() {
  return (
    <div className="bg-[#f9f9fb] box-border content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#13151b] text-[13px] text-center text-nowrap whitespace-pre">@ Add context</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#f9f9fb] h-[36px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[12px] pr-[24px] py-0 relative w-full">
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="relative shrink-0 w-full" data-name="Placeholder">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#8b8d98] text-[13px]">e.g., What happened last week? Show me budget allocation...</p>
        </div>
      </div>
    </div>
  );
}

function Paperclip() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="paperclip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="paperclip">
          <path clipRule="evenodd" d={svgPaths.p2139d480} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="content-container">
      <Paperclip />
    </div>
  );
}

function IconButton3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer3 />
    </div>
  );
}

function Record() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="record">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_18_3109)" id="record">
          <g id="Vector">
            <path d={svgPaths.p21383300} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p1a64a600} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p13b61200} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p3b333640} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p23ebe4a0} fill="var(--fill-0, #60646C)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_18_3109">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ContentContainer4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="content-container">
      <Record />
    </div>
  );
}

function IconButton4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer4 />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Buttons">
      <IconButton3 />
      <IconButton4 />
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="send-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="send-2">
          <path clipRule="evenodd" d={svgPaths.p394788d0} fill="var(--fill-0, #B9BBC6)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer5() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="content-container">
      <Send />
    </div>
  );
}

function IconButton5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer5 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Actions">
      <Buttons />
      <IconButton5 />
    </div>
  );
}

function TextArea1() {
  return (
    <div className="bg-white relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Text area">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          <Placeholder />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame1 />
        <TextArea1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8e8ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[16px] pt-[8px] px-[16px] relative w-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Footer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer">
      <Footer />
    </div>
  );
}

function AiAssistant() {
  return (
    <div className="bg-white h-full relative shrink-0 w-[400px]" data-name="AI assistant">
      <div className="content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[400px]">
        <Header1 />
        <Prompts />
        <Footer1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ContentArea() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="Content area">
      <TextArea />
      <AiAssistant />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full" data-name="Body">
      <Header />
      <ContentArea />
    </div>
  );
}