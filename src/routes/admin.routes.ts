import express from "express";
import {
  getAllLetterApply,
} from "../controller/admin.controller";
import permissionTeacher from "../middleware/teacher.ts/permissionTeacher";
import validateResource from "../middleware/validateResource";
import { requestParamsSchema } from "../schema/shared.schema";

const router = express.Router();


router.get(
  "/api/admin/allLetter",
  [permissionTeacher],
  getAllLetterApply
);

export default router;