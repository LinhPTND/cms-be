import adminLocales from "@/modules/teacher/locales";
import TeacherRoutePaths from "@/modules/teacher/router/paths";
import route from "@/modules/teacher/router/routes";

const module: AppModule = {
  name: "Teacher",
  router: {
    path: TeacherRoutePaths,
    route,
  },
  locales: adminLocales,
  order: 4,
};

export default module;
