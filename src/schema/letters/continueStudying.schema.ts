import z, { number, object, string, TypeOf } from "zod";
import { regexDate } from "../../utils/regex";

export const createContinueStudyingSchema = object({
  body: object({
    msv: string({
      required_error: "Msv is required",
    }),
    name: string({
      required_error: "Name is required",
    }),
    phone: string({
      required_error: "Phone is required",
    }),
    class: string({
      required_error: "Class is required",
    }),
    majors: z.enum(
      ["An toàn thông tin", "Công nghệ thông tin", "Điện tử viễn thông"],
      {
        required_error: "Majors is required",
      }
    ),

    birthDay: string({
      required_error: "birthDay required",
    }).refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),

    gender: z.enum(["nam", "nữ"], {
      required_error: "Gender is required",
      description: "You must check gender",
    }),

    citizenId: string(),
    placeCitizenId: string(),
    dateCitizenId: string().refine((val) => regexDate.test(val), {
      message: "date is type YYYY-MM-DD",
    }),

    permanentResidence: string(),

    decisionNumber: string(),
    dateDecisionAssign: string().refine((val) => regexDate.test(val), {
      message: "date decision assign is type YYYY-MM-DD",
    }),
    startDateReservationAcademic: string().refine(
      (val) => regexDate.test(val),
      {
        message: "start date reservation academic is type YYYY-MM-DD",
      }
    ),

    timeReservationAcademic: number(),

    dateComeback: string().refine((val) => regexDate.test(val), {
      message: "date comeback is type YYYY-MM-DD",
    }),

    semester: number({
      required_error: "semester is required",
    }),
    startYear: number({
      required_error: "start year is required",
    }),

    endYear: number({
      required_error: "end year is required",
    }),

    status: z.enum(["pending", "reject", "success"], {
      required_error: "Status is required",
    }),

    approved: string({ required_error: "approved is required" }),
    user: string({ required_error: "user is required" }),
  }),
});

export type createContinueStudyingSchemaInput = TypeOf<
  typeof createContinueStudyingSchema
>["body"];
