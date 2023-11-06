import { TypeLetter } from "@/models/Letter";
import BankLoanRepository from "@/repositories/BankLoanRepository";
import CancelCourseRepository from "@/repositories/CancelCourseRepository";
import ChangeCourseRepository from "@/repositories/ChangeCourseRepository";
import ConfirmStudyingRepository from "@/repositories/ConfirmStudyingRepository";
import ContinueStudyingRepository from "@/repositories/ContinueStudyingRepository";
import EnjoyPolicyRepository from "@/repositories/EnjoyPolicyRepository";
import LeaveAbsenceLessRepository from "@/repositories/LeaveAbsenceLessRepository";
import LeaveAbsenceMoreRepository from "@/repositories/LeaveAbsenceMoreRepository";
import LeavingSchoolRepository from "@/repositories/LeavingSchoolRepository";
import PaymentGraduationClassRepository from "@/repositories/PaymentGraduationClassRepository";
import PaymentGraduationPersonRepository from "@/repositories/PaymentGraduationPersonRepository";
import RenewStudentCardRepository from "@/repositories/RenewStudentCardRepository";
import ReservationAcademicRepository from "@/repositories/ReservationAcademicRepository";
import ResolveWorkRepository from "@/repositories/ResolveWorkRepository";
import { computed, defineAsyncComponent } from "vue";

export function useLetterFormComponent(typeLetter: TypeLetter) {
  const letterFormComponent = computed<{
    repository: any;
    component: any;
  }>(() => {
    switch (typeLetter) {
      case TypeLetter.BankLoanLetter:
        return {
          repository: BankLoanRepository,
          component: defineAsyncComponent(
            () => import("@/letters/BankLoanLetter.vue")
          ),
        };
      case TypeLetter.CancelCourseLetter:
        return {
          repository: CancelCourseRepository,
          component: defineAsyncComponent(
            () => import("@/letters/CancelCourseLetter.vue")
          ),
        };

      case TypeLetter.ChangeCourseLetter:
        return {
          repository: ChangeCourseRepository,
          component: defineAsyncComponent(
            () => import("@/letters/ChangeCourseLetter.vue")
          ),
        };

      case TypeLetter.ConfirmStudyingLetter:
        return {
          repository: ConfirmStudyingRepository,
          component: defineAsyncComponent(
            () => import("@/letters/ConfirmStudyingLetter.vue")
          ),
        };

      case TypeLetter.ContinueStudyingLetter:
        return {
          repository: ContinueStudyingRepository,
          component: defineAsyncComponent(
            () => import("@/letters/ContinueStudyingLetter.vue")
          ),
        };

      case TypeLetter.EnjoyPolicyLetter:
        return {
          repository: EnjoyPolicyRepository,
          component: defineAsyncComponent(
            () => import("@/letters/EnjoyPolicyLetter.vue")
          ),
        };

      case TypeLetter.LeaveAbsenceLessLetter:
        return {
          repository: LeaveAbsenceLessRepository,
          component: defineAsyncComponent(
            () => import("@/letters/LeaveAbsencelessLetter.vue")
          ),
        };

      case TypeLetter.LeaveAbsenceMoreLetter:
        return {
          repository: LeaveAbsenceMoreRepository,
          component: defineAsyncComponent(
            () => import("@/letters/LeaveAbsenceMoreLetter.vue")
          ),
        };

      case TypeLetter.LeavingSchool:
        return {
          repository: LeavingSchoolRepository,
          component: defineAsyncComponent(
            () => import("@/letters/ResignationStudyingLetter.vue")
          ),
        };

      case TypeLetter.PaymentCollectiveLetter:
        return {
          repository: PaymentGraduationClassRepository,
          component: defineAsyncComponent(
            () => import("@/letters/PaymentCollectiveLetter.vue")
          ),
        };

      case TypeLetter.PaymentPersonalLetter:
        return {
          repository: PaymentGraduationPersonRepository,
          component: defineAsyncComponent(
            () => import("@/letters/PaymentPersonalLetter.vue")
          ),
        };

      case TypeLetter.RenewCardLetter:
        return {
          repository: RenewStudentCardRepository,
          component: defineAsyncComponent(
            () => import("@/letters/RenewCardLetter.vue")
          ),
        };

      case TypeLetter.ReservationAcademicLetter:
        return {
          repository: ReservationAcademicRepository,
          component: defineAsyncComponent(
            () => import("@/letters/ReservationAcademicLetter.vue")
          ),
        };
      case TypeLetter.ResolveWorkLetter:
        return {
          repository: ResolveWorkRepository,
          component: defineAsyncComponent(
            () => import("@/letters/RelssuanceTranscriptsLetter.vue")
          ),
        };

      default:
        return {
          repository: undefined,
          component: undefined,
        };
    }
  });

  return letterFormComponent;
}
