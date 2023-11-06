import { StatusLetter } from "@/models/Letter";
import { Options } from "../models/SelectOption";

export const Genders: Options = [
  { label: "Nam", value: "nam" },
  { label: "Nữ", value: "nữ" },
];

export const Majors: Options = [
  { label: "An toàn thông tin", value: "An toàn thông tin" },
  { label: "Công nghệ thông tin", value: "Công nghệ thông tin" },
  { label: "Điện tử viễn thông", value: "Điện tử viễn thông" },
];

export const TuitionType: Options = [
  { label: "Không miễn giảm", value: "Không miễn giảm" },
  { label: "Giảm học phí", value: "Giảm học phí" },
  { label: "Miễn học phí", value: "Miễn học phí" },
];

export const TuitionObj: Options = [
  { label: "Mồ côi", value: "Mồ côi" },
  { label: "Không mồ côi", value: "Không mồ côi" },
];

export const BelongingSubject: Options = [
  { label: "Mồ côi", value: "Mồ côi" },
  { label: "Không mồ côi", value: "Không mồ côi" },
];

export const Bank: Options = [
  { label: "MB BANK", value: "MB" },
  { label: "VIETINBANK", value: "VIETINBANK" },
  { label: "BIDV", value: "BIDV" },
  { label: "AGRIBANK", value: "AGRIBANK" },
  { label: "VIETCOMBANK", value: "VIETCOMBANK" },
  { label: "VPBANK", value: "VPBANK" },
  { label: "EXIMBANK", value: "EXIMBANK" },
  { label: "SHB", value: "SHB" },
  { label: "TPBANK", value: "TPBANK" },
  { label: "TECHCOMBANK", value: "TECHCOMBANK" },
  { label: "MARITIME BANK", value: "MARITIME BANK" },
  { label: "LIEN VIET POST BANK", value: "LIEN VIET POST BANK" },
  { label: "DONG A BANK", value: "DONG A BANK" },
  { label: "SAI GON BANK", value: "SAI GON BANK" },
  { label: "BAC A BANK", value: "BAC A BANK" },
  { label: "ACB", value: "ACB" },
];

export const StatusLetterOptions: Options = [
  { label: "Chờ duyệt", value: StatusLetter.PENDING },
  { label: "Đã duyệt", value: StatusLetter.SUCCESS },
  { label: "Đã hủy", value: StatusLetter.REJECT },
];
