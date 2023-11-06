import { createRoutePath } from "@/core/utilities";

const AdminRoutePaths = createRoutePath({
  Index: "admin",
  User: "manage-user",
  Teacher: "manage-teacher",
} as const);

export default AdminRoutePaths;
