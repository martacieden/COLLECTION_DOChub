import svgPaths from "./svg-nnto65vzvl";
import imgAvatar from "figma:asset/f7cb35abe7bdaadf04ffa58ea3796f1e3bfede4b.png";
import imgAvatar1 from "figma:asset/c2daac23d4fe980ae02eddc792b0ac0fbffe6714.png";
import imgAvatar2 from "figma:asset/c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png";
import imgAvatar3 from "figma:asset/dff1d7255654f23e342cabe6f9ffcbfc8188a4c3.png";
import imgAvatar4 from "figma:asset/6891b163706b318f4281f7751f15952875b3da85.png";
import imgAvatar5 from "figma:asset/2780e16db1a4a364d3d872737f7fe9563d7abb29.png";
import imgAvatar6 from "figma:asset/248e51d98c071d09cefd9d4449f99bd2dc3797f1.png";
import imgAvatar7 from "figma:asset/a6f45edf729c01b38b6e0c782fd82a58f2e95b6d.png";
import imgAvatar8 from "figma:asset/5110f5bab87e6b74e007e876c21a6d772d9800f5.png";

function Checkbox() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[20px]" data-name="checkbox">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function CheckboxContainer() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="checkbox-container">
      <Checkbox />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Checkbox">
      <CheckboxContainer />
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[4px] py-[16px] relative w-full">
          <Checkbox1 />
        </div>
      </div>
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[20px]" data-name="checkbox">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function CheckboxContainer1() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="checkbox-container">
      <Checkbox2 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Checkbox">
      <CheckboxContainer1 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[4px] py-[16px] relative w-full">
          <Checkbox3 />
        </div>
      </div>
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[20px]" data-name="checkbox">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function CheckboxContainer2() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0" data-name="checkbox-container">
      <Checkbox4 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Checkbox">
      <CheckboxContainer2 />
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[4px] py-[16px] relative w-full">
          <Checkbox5 />
        </div>
      </div>
    </div>
  );
}

function Columns() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0 z-[11]" data-name="Columns">
      <TableHeaderCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableHeaderCell1 />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </div>
  );
}

function ExpandIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Expand Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Expand Icon">
          <path clipRule="evenodd" d={svgPaths.p96ff4f0} fill="var(--fill-0, #FCFDFE)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex h-[36px] items-center justify-end pl-[8px] pr-0 py-[8px] relative w-full">
          <ExpandIcon />
        </div>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex h-[36px] items-center justify-end pl-[8px] pr-0 py-[8px] w-full" />
      </div>
    </div>
  );
}

function Columns1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0 z-10" data-name="Columns">
      <TableCell1 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
      <TableCell2 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Name</p>
      </div>
    </div>
  );
}

function DotsVertical() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical />
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

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader />
          <Actions />
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

function Avatar() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Table />
    </div>
  );
}

function IconButton1() {
  return <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start shrink-0" data-name="Icon button" />;
}

function TableCell3() {
  return (
    <div className="basis-0 bg-white grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex h-[36px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <IconButton1 />
        </div>
      </div>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-0 py-[8px] relative w-full">
          <Avatar />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Trust Agreementе_2025</p>
          <TableCell3 />
        </div>
      </div>
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
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

function TableCell5() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center pl-[16px] pr-0 py-[8px] relative w-full">
          <Avatar1 />
          <div className="basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">
            <p className="[white-space-collapse:collapse] mb-0 overflow-ellipsis overflow-hidden">Property Insurance 2025 updated version ready for review</p>
            <p className="[white-space-collapse:collapse] overflow-ellipsis overflow-hidden">&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileText1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
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

function TableCell6() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar2 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Property_Management_Agreement_TreeCutting_Co.pdf</p>
        </div>
      </div>
    </div>
  );
}

function FileText2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText2 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar3 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Will Amendment for the Smith Family</p>
        </div>
      </div>
    </div>
  );
}

function Table1() {
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

function Avatar4() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Table1 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar4 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">IRA Consent Document for Shareholders</p>
        </div>
      </div>
    </div>
  );
}

function FileText3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText3 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar5 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">LLC Articles of Incorporation</p>
        </div>
      </div>
    </div>
  );
}

function Table2() {
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

function Avatar6() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Table2 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar6 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Commercial Property Deed</p>
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

function Avatar7() {
  return (
    <div className="bg-[#feebec] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Photo />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar7 />
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

function Avatar8() {
  return (
    <div className="bg-[#feebec] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Music />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar8 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Employment Agreement for the Martinez Family</p>
        </div>
      </div>
    </div>
  );
}

function FileText4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar9() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText4 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar9 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Lease Contract for Lakeview Apartment</p>
        </div>
      </div>
    </div>
  );
}

function FileText5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar10() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText5 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar10 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">EcoEnergy Proposal Document</p>
        </div>
      </div>
    </div>
  );
}

function FileText6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file-text">
          <g id="shape">
            <path clipRule="evenodd" d={svgPaths.p2f32d000} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2019600} fill="var(--fill-0, #1150B9)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Avatar11() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <FileText6 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar11 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Automobile Insurance Claim Form</p>
        </div>
      </div>
    </div>
  );
}

function Video() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="video">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="video">
          <path d={svgPaths.p18ea9d80} fill="var(--fill-0, #CE2C31)" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar12() {
  return (
    <div className="bg-[#feebec] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Video />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar12 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Confidentiality Agreement</p>
        </div>
      </div>
    </div>
  );
}

function PresentationAnalytics() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="presentation-analytics">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="presentation-analytics">
          <path d={svgPaths.p24d72700} fill="var(--fill-0, #CC4E00)" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar13() {
  return (
    <div className="bg-[#ffefd6] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <PresentationAnalytics />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar13 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Investment Summary Presentation</p>
        </div>
      </div>
    </div>
  );
}

function Table3() {
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

function Avatar14() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <Table3 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar14 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Life Insurance Application Form</p>
        </div>
      </div>
    </div>
  );
}

function File() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="file">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="file">
          <path d={svgPaths.p15aec80} fill="var(--fill-0, #60646C)" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Avatar15() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <File />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar15 />
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Medium',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Annual Partnership Contract</p>
        </div>
      </div>
    </div>
  );
}

function Columns2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[340px] z-[9]" data-name="Columns">
      <TableHeaderCell2 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell9 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Description</p>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Info icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Info icon">
          <path clipRule="evenodd" d={svgPaths.p33cfc800} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ColumnHeader() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Column header">
      <TableHeader1 />
      <InfoIcon />
    </div>
  );
}

function DotsVertical1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical1 />
    </div>
  );
}

function IconButton2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer1 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton2 />
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <ColumnHeader />
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Legal document outlining terms of property trust.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Coverage details and terms for insured property.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Service contract for property maintenance and care.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Updated instructions modifying existing family will.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Shareholder consent related to retirement account terms.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Founding legal document for limited liability company.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Legal proof of ownership for business property.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Updated coverage details for renewed home insurance.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Work terms and conditions for hired personnel.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Rental terms and tenant obligations for apartment.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Energy efficiency and sustainability project proposal.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Claim submission form for vehicle-related damages.</p>
        </div>
      </div>
    </div>
  );
}

function InfoCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="info-circle">
          <path clipRule="evenodd" d={svgPaths.p33cfc800} fill="var(--fill-0, #8B8D98)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#8b8d98] text-[13px] text-nowrap whitespace-pre">Unable to generate</p>
          <InfoCircle />
        </div>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Overview of portfolio performance and key metrics.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Application details for obtaining life insurance coverage.</p>
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <p className="[white-space-collapse:collapse] basis-0 font-['Inter:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap">Agreement defining yearly terms of business partnership.</p>
        </div>
      </div>
    </div>
  );
}

function Columns3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[240px] z-[8]" data-name="Columns">
      <TableHeaderCell3 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell25 />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Type</p>
      </div>
    </div>
  );
}

function DotsVertical2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical2 />
    </div>
  );
}

function IconButton3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer2 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton3 />
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader2 />
          <Actions2 />
        </div>
      </div>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Table</p>
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Document</p>
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Table</p>
        </div>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Image</p>
        </div>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Audio</p>
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Video</p>
        </div>
      </div>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Presentation</p>
        </div>
      </div>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Other</p>
        </div>
      </div>
    </div>
  );
}

function Columns4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 z-[7]" data-name="Columns">
      <TableHeaderCell4 />
      <TableCell36 />
      <TableCell37 />
      <TableCell37 />
      <TableCell37 />
      <TableCell38 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell37 />
      <TableCell37 />
      <TableCell37 />
      <TableCell41 />
      <TableCell42 />
      <TableCell38 />
      <TableCell43 />
      <TableCell37 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Attached to</p>
      </div>
    </div>
  );
}

function DotsVertical3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical3 />
    </div>
  );
}

function IconButton4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer3 />
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton4 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader3 />
          <Actions3 />
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

function Badge() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <FileStack />
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#60646c] text-[13px] text-center text-nowrap whitespace-pre">Object record OBJ-31</p>
    </div>
  );
}

function Table4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="table">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="table">
          <path clipRule="evenodd" d={svgPaths.p159fc8f0} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Table4 />
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-center text-nowrap whitespace-pre">Home Insurance</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge />
          <Badge1 />
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

function Badge2() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">{`Trust Amendment `}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-center text-nowrap whitespace-pre">+3</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge2 />
          <Badge3 />
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

function Badge4() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ListDetails />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Vendor Contract Approval - Tree Cutting</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge4 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight1() {
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

function Badge5() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight1 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">{`Estate Planning Update Q1 2025 `}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell47() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge5 />
        </div>
      </div>
    </div>
  );
}

function ListDetails1() {
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

function Badge6() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ListDetails1 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Lakeview Lease Renewal Process</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge6 />
        </div>
      </div>
    </div>
  );
}

function ListDetails2() {
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

function Badge7() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ListDetails2 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Review EcoEnergy Investment Proposal</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge7 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight2() {
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

function Badge8() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight2 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">IRA Distribution Authorization</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function News() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="news">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="news">
          <path clipRule="evenodd" d={svgPaths.p29c02c00} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <News />
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-center text-nowrap whitespace-pre">{`Coverage `}</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge8 />
          <Badge9 />
        </div>
      </div>
    </div>
  );
}

function ListDetails3() {
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

function Badge10() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ListDetails3 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">New Entity Formation Documentation</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell51() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge10 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight3() {
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

function Badge11() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight3 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Commercial Property Purchase - Downtown</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell52() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge11 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight4() {
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

function Badge12() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight4 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Insurance Policy Renewal 2025</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge12 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight5() {
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

function Badge13() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight5 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Hire Property Manager - Martinez</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell54() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge13 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight6() {
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

function Badge14() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight6 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Vehicle Damage Claim - Oklahoma</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge14 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight7() {
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

function Badge15() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight7 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">NDA with Tree Cutting Company</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge15 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight8() {
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

function Badge16() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight8 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Q4 2024 Investment Review</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell57() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge16 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight9() {
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

function Badge17() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight9 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Insurance Coverage Plan</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge17 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight10() {
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

function Badge18() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight10 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Life Insurance Application</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge18 />
        </div>
      </div>
    </div>
  );
}

function ArrowRampRight11() {
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

function Badge19() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[6px] shrink-0" data-name="Badge">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip px-[6px] py-[2px] relative rounded-[inherit]">
        <ArrowRampRight11 />
        <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Renew Partnership Agreement 2025</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Badge19 />
        </div>
      </div>
    </div>
  );
}

function Columns5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[344px] z-[6]" data-name="Columns">
      <TableHeaderCell5 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Shared with</p>
      </div>
    </div>
  );
}

function DotsVertical4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical4 />
    </div>
  );
}

function IconButton5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer4 />
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton5 />
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader4 />
          <Actions4 />
        </div>
      </div>
    </div>
  );
}

function Avatar16() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgAvatar} />
    </div>
  );
}

function UserVoted() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar16 />
    </div>
  );
}

function Avatar17() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted1() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar17 />
    </div>
  );
}

function Avatar18() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">+4</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted />
      <UserVoted1 />
      <Avatar18 />
    </div>
  );
}

function TableCell61() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks />
        </div>
      </div>
    </div>
  );
}

function Avatar19() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[147.49%] left-0 max-w-none top-0 w-full" src={imgAvatar3} />
      </div>
    </div>
  );
}

function UserVoted2() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar19 />
    </div>
  );
}

function Avatar20() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar4} />
        <div className="absolute bg-[#aa9c75] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar5} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted3() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar20 />
    </div>
  );
}

function Avatar21() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">ET</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks1() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted2 />
      <UserVoted3 />
      <Avatar21 />
    </div>
  );
}

function TableCell62() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks1 />
        </div>
      </div>
    </div>
  );
}

function Avatar22() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[147.49%] left-0 max-w-none top-0 w-full" src={imgAvatar3} />
      </div>
    </div>
  );
}

function UserVoted4() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar22 />
    </div>
  );
}

function Avatar23() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted5() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar23 />
    </div>
  );
}

function Avatar24() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">ET</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks2() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted4 />
      <UserVoted5 />
      <Avatar24 />
    </div>
  );
}

function TableCell63() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks2 />
        </div>
      </div>
    </div>
  );
}

function Avatar25() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgAvatar} />
    </div>
  );
}

function UserVoted6() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar25 />
    </div>
  );
}

function Avatar26() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted7() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar26 />
    </div>
  );
}

function Avatar27() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">+3</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks3() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted6 />
      <UserVoted7 />
      <Avatar27 />
    </div>
  );
}

function TableCell64() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks3 />
        </div>
      </div>
    </div>
  );
}

function Avatar28() {
  return (
    <div className="mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={imgAvatar} />
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">JF</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[1000px]" />
    </div>
  );
}

function Avatar29() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted8() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar29 />
    </div>
  );
}

function Avatar30() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">+2</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks4() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <Avatar28 />
      <UserVoted8 />
      <Avatar30 />
    </div>
  );
}

function TableCell65() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks4 />
        </div>
      </div>
    </div>
  );
}

function Avatar31() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted9() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar31 />
    </div>
  );
}

function UserStacks5() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted9 />
    </div>
  );
}

function TableCell66() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks5 />
        </div>
      </div>
    </div>
  );
}

function Avatar32() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[147.49%] left-0 max-w-none top-0 w-full" src={imgAvatar3} />
      </div>
    </div>
  );
}

function UserVoted10() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar32 />
    </div>
  );
}

function Avatar33() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted11() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar33 />
    </div>
  );
}

function Avatar34() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">+1</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[1001px]" />
    </div>
  );
}

function UserStacks6() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted10 />
      <UserVoted11 />
      <Avatar34 />
    </div>
  );
}

function TableCell67() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks6 />
        </div>
      </div>
    </div>
  );
}

function Avatar35() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">JF</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[1000px]" />
    </div>
  );
}

function Avatar36() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted12() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar36 />
    </div>
  );
}

function UserStacks7() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <Avatar35 />
      <UserVoted12 />
    </div>
  );
}

function TableCell68() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks7 />
        </div>
      </div>
    </div>
  );
}

function Avatar37() {
  return (
    <div className="mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[999px] size-full" src={imgAvatar} />
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">JF</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[1000px]" />
    </div>
  );
}

function Avatar38() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted13() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar38 />
    </div>
  );
}

function UserStacks8() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <Avatar37 />
      <UserVoted13 />
    </div>
  );
}

function TableCell69() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks8 />
        </div>
      </div>
    </div>
  );
}

function Avatar39() {
  return (
    <div className="bg-[#f0f0f3] mr-[-4px] relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">JS</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[1000px]" />
    </div>
  );
}

function Avatar40() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted14() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar40 />
    </div>
  );
}

function UserStacks9() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <Avatar39 />
      <UserVoted14 />
    </div>
  );
}

function TableCell70() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks9 />
        </div>
      </div>
    </div>
  );
}

function Avatar41() {
  return (
    <div className="absolute left-0 rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[9999px] size-full" src={imgAvatar} />
    </div>
  );
}

function UserVoted15() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar41 />
    </div>
  );
}

function Avatar42() {
  return (
    <div className="absolute left-0 pointer-events-none rounded-[9999px] size-[24px] top-0" data-name="avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function UserVoted16() {
  return (
    <div className="mr-[-4px] relative shrink-0 size-[24px]" data-name="user voted">
      <Avatar42 />
    </div>
  );
}

function Avatar43() {
  return (
    <div className="mr-[-4px] pointer-events-none relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[999px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[999px] size-full" src={imgAvatar4} />
        <div className="absolute bg-[#aa9c75] inset-0 rounded-[999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[999px] size-full" src={imgAvatar5} />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] rounded-[1000px]" />
    </div>
  );
}

function UserStacks10() {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[4px] py-0 relative shrink-0" data-name="user stacks">
      <UserVoted15 />
      <UserVoted16 />
      <Avatar43 />
    </div>
  );
}

function TableCell71() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <UserStacks10 />
        </div>
      </div>
    </div>
  );
}

function Columns6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[141px] z-[5]" data-name="Columns">
      <TableHeaderCell6 />
      {[...Array(3).keys()].map((_, i) => (
        <TableCell61 key={i} />
      ))}
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
      <TableCell71 />
      <TableCell68 />
      <TableCell65 />
      <TableCell69 />
      <TableCell68 />
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Uploaded by</p>
      </div>
    </div>
  );
}

function DotsVertical5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical5 />
    </div>
  );
}

function IconButton6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer5 />
    </div>
  );
}

function Actions5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton6 />
    </div>
  );
}

function TableHeaderCell7() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader5 />
          <Actions5 />
        </div>
      </div>
    </div>
  );
}

function Avatar44() {
  return (
    <div className="pointer-events-none relative rounded-[999px] shrink-0 size-[24px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[999px] size-full" src={imgAvatar6} />
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[1001px]" />
    </div>
  );
}

function TableCell72() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar44 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">John Smith</p>
        </div>
      </div>
    </div>
  );
}

function Avatar45() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">EB</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell73() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar45 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Ember Bett</p>
        </div>
      </div>
    </div>
  );
}

function Avatar46() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar4} />
        <div className="absolute bg-[#aa9c75] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar5} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function TableCell74() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar46 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">James Levin</p>
        </div>
      </div>
    </div>
  );
}

function Avatar47() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-[-5.18%] max-w-none size-[106.84%] top-[0.19%]" src={imgAvatar7} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function TableCell75() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar47 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jane Smith</p>
        </div>
      </div>
    </div>
  );
}

function Avatar48() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">ZM</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell76() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar48 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Zane Mango</p>
        </div>
      </div>
    </div>
  );
}

function Avatar49() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">JM</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell77() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar49 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Justin Madsen</p>
        </div>
      </div>
    </div>
  );
}

function Avatar50() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar} />
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function TableCell78() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar50 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">John Carter</p>
        </div>
      </div>
    </div>
  );
}

function Avatar51() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar8} />
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function TableCell79() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar51 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Wilson Kenter</p>
        </div>
      </div>
    </div>
  );
}

function Avatar52() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">CB</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell80() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar52 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Charlie Botosh</p>
        </div>
      </div>
    </div>
  );
}

function Avatar53() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">GS</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell81() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar53 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Gustavo Shultz</p>
        </div>
      </div>
    </div>
  );
}

function Avatar54() {
  return (
    <div className="bg-[#f0f0f3] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-[24px]">
        <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">LF</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
    </div>
  );
}

function TableCell82() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar54 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Leo Franci</p>
        </div>
      </div>
    </div>
  );
}

function Avatar55() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[24px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[9999px]">
        <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
          <img alt="" className="absolute h-[142.86%] left-0 max-w-none top-[-13.39%] w-full" src={imgAvatar1} />
        </div>
        <div className="absolute bg-[#bea887] inset-0 rounded-[9999px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[9999px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
    </div>
  );
}

function TableCell83() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar55 />
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Adel Philips</p>
        </div>
      </div>
    </div>
  );
}

function Columns7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[174px] z-[4]" data-name="Columns">
      <TableHeaderCell7 />
      <TableCell72 />
      <TableCell73 />
      <TableCell74 />
      <TableCell75 />
      <TableCell75 />
      <TableCell76 />
      <TableCell77 />
      <TableCell78 />
      <TableCell79 />
      <TableCell74 />
      <TableCell80 />
      <TableCell81 />
      <TableCell78 />
      <TableCell75 />
      <TableCell82 />
      <TableCell83 />
      <TableCell75 />
    </div>
  );
}

function DotsVertical6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical6 />
    </div>
  );
}

function IconButton7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer6 />
    </div>
  );
}

function Actions6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton7 />
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Uploaded on</p>
      </div>
    </div>
  );
}

function TableHeaderCell8() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <Actions6 />
          <TableHeader6 />
        </div>
      </div>
    </div>
  );
}

function TableCell84() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Sep 3, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell85() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Sep 1, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell86() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Aug 24, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell87() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Aug 3, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell88() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jul 22, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell89() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jun 18, 2025</p>
        </div>
      </div>
    </div>
  );
}

function TableCell90() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Dec 30, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell91() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Dec 4, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell92() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Nov 12, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell93() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Sep 3, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell94() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Sep 1, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell95() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Aug 24, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell96() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Aug 3, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell97() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jul 22, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell98() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jun 4, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell99() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">Jun 1, 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell100() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] text-nowrap whitespace-pre">May 5, 2024</p>
        </div>
      </div>
    </div>
  );
}

function Columns8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[153px] z-[3]" data-name="Columns">
      <TableHeaderCell8 />
      <TableCell84 />
      <TableCell85 />
      <TableCell86 />
      <TableCell87 />
      <TableCell88 />
      <TableCell89 />
      <TableCell90 />
      <TableCell91 />
      <TableCell92 />
      <TableCell93 />
      <TableCell94 />
      <TableCell95 />
      <TableCell96 />
      <TableCell97 />
      <TableCell98 />
      <TableCell99 />
      <TableCell100 />
    </div>
  );
}

function TableHeader7() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Organization</p>
      </div>
    </div>
  );
}

function DotsVertical7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical7 />
    </div>
  );
}

function IconButton8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer7 />
    </div>
  );
}

function Actions7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton8 />
    </div>
  );
}

function TableHeaderCell9() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader7 />
          <Actions7 />
        </div>
      </div>
    </div>
  );
}

function Avatar56() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">H</p>
    </div>
  );
}

function TableCell101() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar56 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] w-[129px]">Heritage Foundation</p>
        </div>
      </div>
    </div>
  );
}

function Avatar57() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">W</p>
    </div>
  );
}

function TableCell102() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar57 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] w-[129px]">{`Wilson Family `}</p>
        </div>
      </div>
    </div>
  );
}

function Avatar58() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">R</p>
    </div>
  );
}

function TableCell103() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar58 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] w-[129px]">Riverside T.C.</p>
        </div>
      </div>
    </div>
  );
}

function Avatar59() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">M</p>
    </div>
  );
}

function TableCell104() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar59 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] w-[129px]">Martinez Estate</p>
        </div>
      </div>
    </div>
  );
}

function Avatar60() {
  return (
    <div className="bg-[#f0f0f3] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="Avatar">
      <p className="font-['Inter:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#60646c] text-[10px] text-center text-nowrap tracking-[0.04px] whitespace-pre">A</p>
    </div>
  );
}

function TableCell105() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative w-full">
          <Avatar60 />
          <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[13px] w-[129px]">Anderson Group</p>
        </div>
      </div>
    </div>
  );
}

function Columns9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[208px] z-[2]" data-name="Columns">
      <TableHeaderCell9 />
      <TableCell101 />
      <TableCell102 />
      <TableCell103 />
      <TableCell104 />
      <TableCell105 />
      <TableCell105 />
      <TableCell101 />
      <TableCell101 />
      <TableCell102 />
      <TableCell102 />
      <TableCell105 />
      <TableCell103 />
      <TableCell103 />
      <TableCell104 />
      <TableCell105 />
      <TableCell105 />
      <TableCell105 />
    </div>
  );
}

function TableHeader8() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Table header">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#80838d] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Signature status</p>
      </div>
    </div>
  );
}

function DotsVertical8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="dots-vertical">
          <path clipRule="evenodd" d={svgPaths.p151bba80} fill="var(--fill-0, #60646C)" fillRule="evenodd" id="shape" />
        </g>
      </svg>
    </div>
  );
}

function ContentContainer8() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[24px]" data-name="content-container">
      <DotsVertical8 />
    </div>
  );
}

function IconButton9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="Icon button">
      <ContentContainer8 />
    </div>
  );
}

function Actions8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <IconButton9 />
    </div>
  );
}

function TableHeaderCell10() {
  return (
    <div className="bg-[#fcfcfd] h-[36px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] h-[36px] items-center p-[16px] relative w-full">
          <div className="absolute bg-[#e8e8ec] h-[14px] right-0 top-[11px] w-[2px]" data-name="pseudo" />
          <TableHeader8 />
          <Actions8 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase() {
  return (
    <div className="bg-[#e6f6eb] content-stretch flex h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#218358] text-[13px] text-center text-nowrap whitespace-pre">Signed</p>
    </div>
  );
}

function Badge20() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Badge">
      <BadgeBase />
    </div>
  );
}

function TableCell106() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[32px] py-[8px] relative w-full">
          <Badge20 />
        </div>
      </div>
    </div>
  );
}

function BadgeBase1() {
  return (
    <div className="bg-[#ffefd6] content-stretch flex h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#cc4e00] text-[13px] text-center text-nowrap whitespace-pre">Pending</p>
    </div>
  );
}

function Badge21() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Badge">
      <BadgeBase1 />
    </div>
  );
}

function TableCell107() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[32px] py-[8px] relative w-full">
          <Badge21 />
        </div>
      </div>
    </div>
  );
}

function TableCell108() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[36px] w-full" />
      </div>
    </div>
  );
}

function BadgeBase2() {
  return (
    <div className="bg-[#ebf3ff] content-stretch flex h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[6px] shrink-0" data-name="_Badge base">
      <p className="font-['Inter:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#1150b9] text-[13px] text-center text-nowrap whitespace-pre">Partially executed</p>
    </div>
  );
}

function Badge22() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-center relative rounded-[6px] shrink-0" data-name="Badge">
      <BadgeBase2 />
    </div>
  );
}

function TableCell109() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[36px] items-center pl-[16px] pr-[32px] py-[8px] relative w-full">
          <Badge22 />
        </div>
      </div>
    </div>
  );
}

function Columns10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[177px] z-[1]" data-name="Columns">
      <TableHeaderCell10 />
      <TableCell106 />
      <TableCell107 />
      <TableCell106 />
      <TableCell108 />
      <TableCell106 />
      <TableCell108 />
      <TableCell107 />
      <TableCell108 />
      <TableCell109 />
      <TableCell106 />
      <TableCell108 />
      <TableCell108 />
      <TableCell108 />
      <TableCell106 />
      <TableCell106 />
      <TableCell108 />
      <TableCell109 />
    </div>
  );
}

function AllColumns() {
  return (
    <div className="basis-0 bg-white content-stretch flex grow isolate items-start mb-[-1px] min-h-px min-w-px relative shrink-0 w-full" data-name="All columns">
      <Columns />
      <Columns1 />
      <Columns2 />
      <Columns3 />
      <Columns4 />
      <Columns5 />
      <Columns6 />
      <Columns7 />
      <Columns8 />
      <Columns9 />
      <Columns10 />
    </div>
  );
}

function Bottom() {
  return (
    <div className="bg-white mb-[-1px] relative shrink-0 w-full" data-name="Bottom">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex font-['Inter:Medium',sans-serif] gap-[16px] items-center leading-[0] not-italic pl-[16px] pr-[24px] py-[8px] relative text-[#60646c] text-[13px] text-nowrap w-full whitespace-pre">
          <p className="leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0">
            <span>{`Rows: `}</span>
            <span className="text-[#1c2024]">17</span>
          </p>
          <p className="leading-[20px] overflow-ellipsis overflow-hidden relative shrink-0">
            <span>{`Filtered: `}</span>
            <span className="text-[#1c2024]">0</span>
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e8e8ec] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Table5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px pt-0 px-0 relative size-full" data-name="Table">
      <AllColumns />
      <Bottom />
    </div>
  );
}