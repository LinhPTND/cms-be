import { TypeLetter } from "@/models/Letter";
import dayjs from "dayjs";
import { DataListLetterResponse } from "./../models/User";

export const getTableLetter = (dataLetter: DataListLetterResponse): any[] => {
  const bankLoanData = dataLetter.bankLoan.map((item) => ({
    ...item,
    nameLetter: "Vay vốn ngân hàng",
    typeLetter: TypeLetter.BankLoanLetter,
  }));
  const cancelCourseData = dataLetter.cancelCourse.map((item) => ({
    ...item,
    nameLetter: "Đơn hủy học phần",
    typeLetter: TypeLetter.CancelCourseLetter,
  }));

  const changeCourseData = dataLetter.changeCourse.map((item) => ({
    ...item,
    nameLetter: "Đơn đăng ký thay đổi học phần",
    typeLetter: TypeLetter.ChangeCourseLetter,
  }));
  const confirmStudyingData = dataLetter.confirmStudying.map((item) => ({
    ...item,
    nameLetter: "Xác nhận đang theo học",
    typeLetter: TypeLetter.ConfirmStudyingLetter,
  }));
  const enjoyPolicyData = dataLetter.enjoyPolicy.map((item) => ({
    ...item,
    nameLetter: "Hưởng chế độ chính sách",
    typeLetter: TypeLetter.EnjoyPolicyLetter,
  }));
  const leaveAbsenceLess = dataLetter.leaveAbsenceLess.map((item) => ({
    ...item,
    nameLetter: "Đơn xin nghỉ có thời hạn (dưới 7 ngày)",
    typeLetter: TypeLetter.LeaveAbsenceLessLetter,
  }));
  const leaveAbsenceMore = dataLetter.leaveAbsenceMore.map((item) => ({
    ...item,
    nameLetter: "Đơn xin nghỉ có thời hạn (trên 7 ngày)",
    typeLetter: TypeLetter.LeaveAbsenceMoreLetter,
  }));
  const leavingSchool = dataLetter.leavingSchool.map((item) => ({
    ...item,
    nameLetter: "Đơn xin thôi học",
    typeLetter: TypeLetter.LeavingSchool,
  }));
  const continueStudying = dataLetter.continueStudying.map((item) => ({
    ...item,
    nameLetter: "Đơn xin tiếp tục học",
    typeLetter: TypeLetter.ContinueStudyingLetter,
  }));
  const paymentGraduationClass = dataLetter.paymentGraduationClass.map(
    (item) => ({
      ...item,
      nameLetter: "Phiếu thanh toán ra trường tập thể",
      typeLetter: TypeLetter.PaymentCollectiveLetter,
    })
  );
  const paymentGraduationPersonal = dataLetter.paymentGraduationPerson.map(
    (item) => ({
      ...item,
      nameLetter: "Phiếu thanh toán ra trường cá nhân",
      typeLetter: TypeLetter.PaymentPersonalLetter,
    })
  );
  const renewStudentCard = dataLetter.renewStudentCard.map((item) => ({
    ...item,
    nameLetter: "Đơn xin cấp lại thẻ sinh viên",
    typeLetter: TypeLetter.RenewCardLetter,
  }));
  const reservationAcademic = dataLetter.reservationAcademic.map((item) => ({
    ...item,
    nameLetter: "Đơn xin bảo lưu kết quả học tập",
    typeLetter: TypeLetter.ReservationAcademicLetter,
  }));
  const resolveWork = dataLetter.resolveWork.map((item) => ({
    ...item,
    nameLetter: "Đơn xin giải quyết công việc",
    typeLetter: TypeLetter.ResolveWorkLetter,
  }));

  const list: any[] = [
    ...bankLoanData,
    ...cancelCourseData,
    ...changeCourseData,
    ...confirmStudyingData,
    ...enjoyPolicyData,
    ...leaveAbsenceLess,
    ...leaveAbsenceMore,
    ...leavingSchool,
    ...continueStudying,
    ...paymentGraduationClass,
    ...paymentGraduationPersonal,
    ...renewStudentCard,
    ...reservationAcademic,
    ...resolveWork,
  ];


  const listSort = list.sort(function (a, b) {
    return (dayjs(b.updatedAt) as any) - (dayjs(a.updatedAt) as any);
  });
  return listSort;
};

export const randomColor = (phone: string) => {
  const halfPhone = phone
    ? phone
        .toString()
        .slice(phone.toString().length - 2, phone.toString().length)
    : "221";
  const phoneSc = "0." + halfPhone;
  return "#" + Math.floor(parseFloat(phoneSc) * 16777215).toString(16);
};

export const getNameFace = (name: string) => {
  const arr = name.split(" ");
  return arr[arr.length - 1].charAt(0);
};
