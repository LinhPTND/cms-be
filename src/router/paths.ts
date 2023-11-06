import { createRoutePath } from "@/core/utilities";

const DefaultRoutePaths = createRoutePath({
  Index: "",
} as const);

const AppRoutePaths = {
  ...DefaultRoutePaths,
} as unknown as RoutePaths & typeof DefaultRoutePaths;

export default AppRoutePaths;
