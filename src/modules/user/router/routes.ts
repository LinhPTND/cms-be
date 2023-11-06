import AdminRoutePaths from "@/modules/admin/router/paths";
import AuthRoutePaths from "@/modules/auth/router/paths";
import TeacherRoutePaths from "@/modules/teacher/router/paths";
import UserRoutePaths from "@/modules/user/router/paths";
import { DashboardOutlined, ProjectOutlined } from "@ant-design/icons-vue";
import { RouteRecordRaw } from "vue-router";
import { useAuth } from "./../../../stores/auth";

const route: RouteRecordRaw = {
  path: UserRoutePaths.Index,
  component: () => import("@/layouts/MainLayout/Index.vue"),
  beforeEnter: async (to, from, next) => {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn) {
      next({ name: "LOGIN" });
    } else if (user?.type !== "user") {
      if (user?.type === "admin") {
        next(AdminRoutePaths.Index);
      } else if (user?.type === "teacher") {
        next(TeacherRoutePaths.Index);
      } else next(AuthRoutePaths.Index);
    } else next();
  },
  children: [
    {
      path: UserRoutePaths.Index,
      component: () => import("@/modules/user/views/UserIndex.vue"),
      meta: {
        title: "Thông tin chung",
        showChildrenInMenu: true,
        icon: DashboardOutlined,
      },
    },
    {
      path: UserRoutePaths.Letter,
      component: () => import("@/shared/PageParent.vue"),
      meta: {
        title: "Hệ thống đơn từ",
        showChildrenInMenu: true,
        collapse: true,
        icon: ProjectOutlined,
      },
      children: [
        {
          path: UserRoutePaths.ConfirmStudying,
          component: () => import("@/modules/user/views/ConfirmStudying.vue"),
          meta: {
            title: "Xác nhận đang theo học",
          },
        },
        {
          path: UserRoutePaths.EnjoyPolicy,
          component: () => import("@/modules/user/views/EnjoyPolicy.vue"),
          meta: {
            title: "Hưởng chế độ chính sách",
          },
        },
        {
          path: UserRoutePaths.BankLoan,
          component: () => import("@/modules/user/views/BankLoan.vue"),
          meta: {
            title: "Vay vốn ngân hàng",
          },
        },
        {
          path: UserRoutePaths.ChangeCourse,
          component: () => import("@/modules/user/views/ChangeCourse.vue"),
          meta: {
            title: "Đơn đăng ký thay đổi học phần",
          },
        },
        {
          path: UserRoutePaths.CancellationCourse,
          component: () =>
            import("@/modules/user/views/CancellationCourse.vue"),
          meta: {
            title: "Đơn hủy học phần",
          },
        },
        {
          path: UserRoutePaths.RenewStudentCard,
          component: () => import("@/modules/user/views/RenewStudentCard.vue"),
          meta: {
            title: "Đơn xin cấp lại thẻ sinh viên",
          },
        },
        {
          path: UserRoutePaths.ReIssuanceTranscripts,
          component: () =>
            import("@/modules/user/views/ReIssuanceTranscripts.vue"),
          meta: {
            title: "Đơn đề nghị giải quyết công việc",
          },
        },
        {
          path: UserRoutePaths.LeaveAbsenceLessWeek,
          component: () =>
            import("@/modules/user/views/LeaveAbsenceLessWeek.vue"),
          meta: {
            title: "Đơn xin nghỉ học có thời hạn (dưới 7 ngày)",
          },
        },
        {
          path: UserRoutePaths.LeaveAbsenceMoreWeek,
          component: () =>
            import("@/modules/user/views/LeaveAbsenceMoreWeek.vue"),
          meta: {
            title: "Đơn xin nghỉ học có thời hạn (trên 7 ngày)",
          },
        },
        {
          path: UserRoutePaths.ReservationAcademicResult,
          component: () =>
            import("@/modules/user/views/ReservationAcademicResult.vue"),
          meta: {
            title: "Đơn xin bảo lưu kết quả học tập",
          },
        },
        {
          path: UserRoutePaths.ContinueStudying,
          component: () => import("@/modules/user/views/ContinueStudying.vue"),
          meta: {
            title: "Đơn xin tiếp tục học",
          },
        },
        {
          path: UserRoutePaths.ResignationStudying,
          component: () =>
            import("@/modules/user/views/ResignationStudying.vue"),
          meta: {
            title: "Đơn xin thôi học",
          },
        },
        {
          path: UserRoutePaths.PaymentGraduationPersonal,
          component: () =>
            import("@/modules/user/views/PaymentGraduationPersonal.vue"),
          meta: {
            title: "Phiếu thanh toán ra trường (cá nhân)",
          },
        },
        {
          path: UserRoutePaths.PaymentGraduationCollective,
          component: () =>
            import("@/modules/user/views/PaymentGraduationCollective.vue"),
          meta: {
            title: "Phiếu thanh toán ra trường (tập thể)",
          },
        },
      ],
    },
  ],
};

export default route;
