import svgPaths from "./svg-ylbe71kelt";
import imgAvatar from "figma:asset/faff2adb1cb08272d6a4e4d91304adea83279eb7.png";
import imgAvatar1 from "figma:asset/248e51d98c071d09cefd9d4449f99bd2dc3797f1.png";

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="search">
          <path clipRule="evenodd" d={svgPaths.p1b2b6900} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function IconLeftContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip px-[4px] py-0 relative shrink-0" data-name="icon left -container">
      <Search />
    </div>
  );
}

function InputContainer() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="input-container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[4px] py-0 relative size-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#8b8d98] text-[13px]">What are you looking for?</p>
        </div>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#f0f0f3] box-border content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#60646c] text-[13px] text-center text-nowrap whitespace-pre">⌘K</p>
    </div>
  );
}

function IconRightContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip relative shrink-0" data-name="icon right-container">
      <Badge />
    </div>
  );
}

function Root() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="root">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[32px] items-center px-[4px] py-0 relative w-full">
          <IconLeftContainer />
          <InputContainer />
          <IconRightContainer />
        </div>
      </div>
    </div>
  );
}

function Search1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[320px]" data-name="Search">
      <Root />
    </div>
  );
}

function Bell() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="bell">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="bell">
          <path clipRule="evenodd" d={svgPaths.p2c602f00} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Bell />
    </div>
  );
}

function IconButton() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start left-0 top-0" data-name="Icon button">
      <ContentContainer />
    </div>
  );
}

function Notifications() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="notifications">
      <IconButton />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[32px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[200px]">
        <div className="absolute inset-0 overflow-hidden rounded-[200px]">
          <img alt="" className="absolute left-[-5.18%] max-w-none size-[106.84%] top-[0.19%]" src={imgAvatar} />
        </div>
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[200px] size-full" src={imgAvatar1} />
      </div>
    </div>
  );
}

function RighrActions() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0" data-name="Righr actions">
      <Notifications />
      <Avatar />
    </div>
  );
}

function TopHeader() {
  return (
    <div className="bg-white box-border content-stretch flex h-[48px] items-center justify-between px-[16px] py-[8px] relative shrink-0 w-[1368px]" data-name="Top Header">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Search1 />
      <RighrActions />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="title">
      <p className="font-['Inter:Medium',sans-serif] leading-[24px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[16px] text-nowrap tracking-[-0.08px] whitespace-pre">Documents</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p15a300c0} fill="var(--fill-0, #CC4E00)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0" data-name="Icon">
      <Icon />
    </div>
  );
}

function DefaultButton() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] py-[2px] relative rounded-[6px] shrink-0" data-name="Default Button">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">See details</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Actions">
      <DefaultButton />
    </div>
  );
}

function InlineBanner() {
  return (
    <div className="bg-orange-50 h-[36px] relative rounded-[8px] shrink-0" data-name="Inline banner">
      <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[inherit]">
        <Icon1 />
        <p className="font-['Inter:Regular',sans-serif] leading-[22px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[14px] text-nowrap tracking-[-0.04px] whitespace-pre">
          <span>{`5 documents `}</span>waiting for signature.
        </p>
        <Actions />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ec9455] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white box-border content-center flex flex-wrap gap-[24px] h-[56px] items-center justify-between px-[16px] py-[12px] relative shrink-0 w-[1368px]" data-name="Page header">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Title />
      <InlineBanner />
    </div>
  );
}

function UsersGroup() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="users-group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_3197)" id="users-group">
          <path clipRule="evenodd" d={svgPaths.p3ed9dc80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
        <defs>
          <clipPath id="clip0_1_3197">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#f0f0f3] box-border content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[4px] shrink-0" data-name="Avatar">
      <UsersGroup />
    </div>
  );
}

function IconLeftContainer1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip px-[4px] py-0 relative shrink-0" data-name="icon left -container">
      <Avatar1 />
    </div>
  );
}

function InputContainer1() {
  return (
    <div className="box-border content-stretch flex h-full items-center px-[4px] py-0 relative shrink-0" data-name="input-container">
      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">All organizations</p>
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

function IconRightContainer1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip px-[4px] py-0 relative shrink-0" data-name="icon right-container">
      <ChevronDown />
    </div>
  );
}

function Root1() {
  return (
    <div className="box-border content-stretch flex h-[32px] items-center px-[4px] py-0 relative rounded-[6px] shrink-0" data-name="root">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <IconLeftContainer1 />
      <InputContainer1 />
      <IconRightContainer1 />
    </div>
  );
}

function LineField() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[32px] items-start relative shrink-0" data-name="Line field">
      <Root1 />
    </div>
  );
}

function Search2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="search">
          <path clipRule="evenodd" d={svgPaths.p1b2b6900} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function DefaultButton1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[2px] relative rounded-[6px] shrink-0" data-name="Default Button">
      <Search2 />
    </div>
  );
}

function SearchOrgSelector() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Search + ORG selector">
      <div aria-hidden="true" className="absolute border-[#e8ecf1] border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[12px] py-[8px] relative w-full">
          <LineField />
          <DefaultButton1 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative size-[16px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <g id="Vector">
            <path d={svgPaths.p47bd72a} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p9be6200} fill="var(--fill-0, #60646C)" />
            <path d={svgPaths.p39fe8200} fill="var(--fill-0, #60646C)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ItemMenu() {
  return (
    <div className="bg-[#ebf3ff] h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Item Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center p-[8px] relative w-full">
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "16", "--transform-inner-height": "16" } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <Frame />
            </div>
          </div>
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[13px]">
            <p className="leading-[20px]">Collections</p>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#8b8d98] text-[12px] text-center text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClearAll() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="clear-all">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="clear-all">
          <path clipRule="evenodd" d={svgPaths.p153eb300} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ItemMenu1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Item menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center p-[8px] relative w-full">
          <ClearAll />
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">
            <p className="[white-space-collapse:collapse] leading-[20px] overflow-ellipsis overflow-hidden">All documents</p>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#8b8d98] text-[12px] text-center text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">103</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockHour() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="clock-hour-3">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="clock-hour-3">
          <path clipRule="evenodd" d={svgPaths.p2b2b7000} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ItemMenu2() {
  return (
    <div className="h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Item Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center p-[8px] relative w-full">
          <ClockHour />
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[13px]">
            <p className="leading-[20px]">Recently opened</p>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#8b8d98] text-[12px] text-center text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">24</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pin() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="pin">
          <path clipRule="evenodd" d={svgPaths.p316b2c00} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ItemMenu3() {
  return (
    <div className="h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Item Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center p-[8px] relative w-full">
          <Pin />
          <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] grow h-full justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">
            <p className="[white-space-collapse:collapse] leading-[20px] overflow-ellipsis overflow-hidden">Pinned</p>
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#8b8d98] text-[12px] text-center text-nowrap">
            <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[8px] pt-0 px-0 relative shrink-0 w-full" data-name="list">
      <ItemMenu />
      <ItemMenu1 />
      <ItemMenu2 />
      <ItemMenu3 />
    </div>
  );
}

function TopItems() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="top items">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-center px-[16px] py-0 relative size-full">
          <List />
        </div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div className="bg-white h-[796px] relative shrink-0 w-[238px]" data-name="Categories">
      <div className="content-stretch flex flex-col gap-[8px] h-[796px] items-start overflow-clip relative rounded-[inherit] w-[238px]">
        <SearchOrgSelector />
        <TopItems />
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function SearchSparkles() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search-sparkles">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="search-sparkles">
          <g id="Shape">
            <path d={svgPaths.p18549400} fill="var(--fill-0, #60646C)" />
            <path clipRule="evenodd" d={svgPaths.p1a6e3500} fill="var(--fill-0, #60646C)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconLeftContainer2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[8px] h-full items-center justify-center overflow-clip pl-[8px] pr-[4px] py-0 relative shrink-0" data-name="icon left-container">
      <SearchSparkles />
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

function ContentContainer1() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[32px]" data-name="content-container">
      <Send />
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

function InputContainer2() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="input-container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center pl-[8px] pr-[4px] py-0 relative size-full">
          <p className="basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#8b8d98] text-[13px]">Ask a question about your documents...</p>
          <IconButton1 />
        </div>
      </div>
    </div>
  );
}

function Root2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="root">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[40px] items-center pl-[4px] pr-0 py-0 relative w-full">
          <IconLeftContainer2 />
          <InputContainer2 />
        </div>
      </div>
    </div>
  );
}

function Search3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[720px]" data-name="Search">
      <Root2 />
      <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#80838d] text-[13px] w-full">{`Try "Johnson Trust PDF" for documents or "What are the distribution terms?" for AI answers`}</p>
    </div>
  );
}

function GreetingSearch() {
  return (
    <div className="bg-[#fcfcfd] box-border content-stretch flex flex-col gap-[32px] items-center justify-center px-0 py-[40px] relative shrink-0 w-[1130px]" data-name="Greeting & search">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Search3 />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="plus">
          <path clipRule="evenodd" d={svgPaths.pf368500} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function DefaultButton2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[6px] relative rounded-[6px] shrink-0" data-name="Default Button">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Plus />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">New collection</p>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path clipRule="evenodd" d={svgPaths.p3713b000} fill="var(--fill-0, white)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function DefaultButton3() {
  return (
    <div className="bg-[#005be2] box-border content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[6px] relative rounded-[6px] shrink-0" data-name="Default Button">
      <div aria-hidden="true" className="absolute border border-[#005be2] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">Upload</p>
      </div>
      <ChevronDown1 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <DefaultButton2 />
      <DefaultButton3 />
    </div>
  );
}

function UploadButton() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow h-[32px] items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Upload button">
      <Actions1 />
    </div>
  );
}

function TableNavigation() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table Navigation">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-center flex flex-wrap gap-[398px] items-center justify-between pb-[8px] pt-[16px] px-[16px] relative w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#60646c] text-[13px] text-nowrap whitespace-pre">Collections</p>
          <UploadButton />
        </div>
      </div>
    </div>
  );
}

function FolderFilled() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder filled">
          <path clipRule="evenodd" d={svgPaths.pdb5fd80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FolderFilled />
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

function ContentContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Dots />
    </div>
  );
}

function IconButton2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer2 />
    </div>
  );
}

function FolderInfo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Folder Info">
      <Avatar2 />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[14px] tracking-[-0.0056px]">Executed documents</p>
      <IconButton2 />
    </div>
  );
}

function FolderDetails() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-[356px]" data-name="Folder Details">
      <div className="box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-[356px]">
        <FolderInfo />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8e8ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FolderFilled1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder filled">
          <path clipRule="evenodd" d={svgPaths.pdb5fd80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FolderFilled1 />
    </div>
  );
}

function Dots1() {
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

function ContentContainer3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Dots1 />
    </div>
  );
}

function IconButton3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer3 />
    </div>
  );
}

function FolderInfo1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Folder Info">
      <Avatar3 />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[14px] tracking-[-0.0056px]">Trusts</p>
      <IconButton3 />
    </div>
  );
}

function FolderDetails1() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-[355px]" data-name="Folder Details">
      <div className="box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-[355px]">
        <FolderInfo1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8e8ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FolderFilled2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder filled">
          <path clipRule="evenodd" d={svgPaths.pdb5fd80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FolderFilled2 />
    </div>
  );
}

function Dots2() {
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

function ContentContainer4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Dots2 />
    </div>
  );
}

function IconButton4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer4 />
    </div>
  );
}

function FolderInfo2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Folder Info">
      <Avatar4 />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[14px] tracking-[-0.0056px]">Pending signatures</p>
      <IconButton4 />
    </div>
  );
}

function FolderDetails2() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-[355px]" data-name="Folder Details">
      <div className="box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-[355px]">
        <FolderInfo2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8e8ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FolderFilled3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="folder filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="folder filled">
          <path clipRule="evenodd" d={svgPaths.pdb5fd80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FolderFilled3 />
    </div>
  );
}

function Dots3() {
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

function ContentContainer5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <Dots3 />
    </div>
  );
}

function IconButton5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer5 />
    </div>
  );
}

function FolderInfo3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Folder Info">
      <Avatar5 />
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#1c2024] text-[14px] tracking-[-0.0056px]">Q4 Financial Reports</p>
      <IconButton5 />
    </div>
  );
}

function FolderDetails3() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-[356px]" data-name="Folder Details">
      <div className="box-border content-stretch flex flex-col gap-[8px] h-[56px] items-start overflow-clip p-[16px] relative rounded-[inherit] w-[356px]">
        <FolderInfo3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e8e8ec] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function FolderItem() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start relative shrink-0 w-full" data-name="Folder Item">
      <FolderDetails />
      <FolderDetails1 />
      <FolderDetails2 />
      <FolderDetails3 />
    </div>
  );
}

function FolderContainer() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px pb-[24px] pt-[16px] px-[16px] relative shrink-0 w-[1130px]" data-name="Folder Container">
      <FolderItem />
    </div>
  );
}

function Frame1() {
  return <div className="h-[212px] shrink-0 w-full" />;
}

function Table() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[796px] items-start min-h-px min-w-px relative shrink-0" data-name="Table">
      <GreetingSearch />
      <TableNavigation />
      <FolderContainer />
      <Frame1 />
    </div>
  );
}

function PageContent() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Page Content">
      <Categories />
      <Table />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-0 top-0 w-[1368px]" data-name="Content">
      <TopHeader />
      <PageHeader />
      <PageContent />
    </div>
  );
}

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

function Home() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="home">
          <path clipRule="evenodd" d={svgPaths.p22bd3e80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <Home />
    </div>
  );
}

function MenuItem() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon2 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="users">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="users">
          <path clipRule="evenodd" d={svgPaths.p3e7fbe80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <Users />
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon3 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-ramp-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-ramp-right">
          <path clipRule="evenodd" d={svgPaths.p29cdf980} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <ArrowRampRight />
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon4 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListDetails() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="list details">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="list details">
          <path clipRule="evenodd" d={svgPaths.p3177ad70} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <ListDetails />
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon5 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileStack() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file stack">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file stack">
          <path clipRule="evenodd" d={svgPaths.p18dfc700} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <FileStack />
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon6 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Objects</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #005BE2)" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[32px]" data-name="Icon">
      <FileText />
    </div>
  );
}

function MenuItem5() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon7 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Documents</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Budget() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="budget">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="budget">
          <path clipRule="evenodd" d={svgPaths.p2b3bb000} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <Budget />
    </div>
  );
}

function MenuItem6() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon8 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Budgets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dots4() {
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

function Icon9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <Dots4 />
    </div>
  );
}

function MenuItem7() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon9 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Menu Items">
      <MenuItem />
      <MenuItem1 />
      <MenuItem2 />
      <MenuItem3 />
      <MenuItem4 />
      <MenuItem5 />
      <MenuItem6 />
      <MenuItem7 />
    </div>
  );
}

function HelpSquareRounded() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="help-square-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="help-square-rounded">
          <path clipRule="evenodd" d={svgPaths.p3cb13a00} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[32px]" data-name="Icon">
      <HelpSquareRounded />
    </div>
  );
}

function MenuItem8() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full" data-name="Menu item">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <Icon10 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60646c] text-[10px] text-nowrap tracking-[0.04px]">
            <p className="leading-[12px] whitespace-pre">Help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidenav() {
  return (
    <div className="absolute bg-[#fcfcfd] box-border content-stretch flex flex-col gap-[16px] h-[900px] items-center left-0 px-0 py-[12px] top-0 w-[72px]" data-name="Sidenav">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Logo />
      <MenuItems />
      <MenuItem8 />
    </div>
  );
}

export default function EmptyState() {
  return (
    <div className="bg-white relative size-full" data-name="Empty state">
      <Content />
      <Sidenav />
    </div>
  );
}