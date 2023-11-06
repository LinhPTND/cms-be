import { createRoutePath } from "@/core/utilities";

const TeacherRoutePaths = createRoutePath({
  Index: "teacher",
  Info: "info",
} as const);

export default TeacherRoutePaths;
