import HomePage from "../pages/HomePage";
import ViewAllFilm from "../pages/ViewAllFilm";
import MyTicketPage from "../pages/MyTicketPage";
import BookingDetail from "../pages/BookingDetail";
import PaymentPage from "../pages/PaymentPage";
import PaymentOtp from "../pages/PaymentOtp";
import PaymentSuccess from "../pages/PaymentSuccess";
import BookingFilmPage from "../pages/BookingFilmPage";
import SeatSelectPage from "../pages/SeatSelectPage";
import PromotionsPage from "../pages/PromotionsPage";
import AdminLogin from "../components/Admin/AdmLogin";
import AddMovieAdm from "../pages/AddMovieAdm";
import TicketUpHisPage from "../pages/TicketUpHisPage";
import OderFlimAdm from "../pages/OderFlimAdm";
import ManagementUserAdm from "../pages/ManagementUserAdm";
import ReportsAdm from "../pages/ReportsAdm";
import TheatersAdm from "../pages/TheatersAdm";
import MovieSchedule from "../pages/MovieSchedule";
import NotFoundPage from "../pages/NotFoundPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/movies",
    page: ViewAllFilm,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/my-ticket",
    page: MyTicketPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/ticket-up-his",
    page: TicketUpHisPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/oderflimadm",
    page: OderFlimAdm,
    isShowHeader: false,
    isShowFooter: false,
  },

  {
    path: "/booking-detail",
    page: BookingDetail,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/payment-otp",
    page: PaymentOtp,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/payment-success",
    page: PaymentSuccess,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/booking-movie",
    page: BookingFilmPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/seat-select",
    page: SeatSelectPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/promotions",
    page: PromotionsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/schedule-movie",
    page: MovieSchedule,
    isShowHeader: true,
    isShowFooter: true,
  },

  //////////////////// ADMIN /////////////////
  // Trang đăng nhập Admin
  {
    path: "/adminlogin",
    page: AdminLogin,
    isShowHeader: false,
    isShowFooter: false,
  },
  // Add Movie Adm Admin
  {
    path: "/addmovieadm",
    page: AddMovieAdm,
    isShowHeader: false,
    isShowFooter: false,
  },

  // Adm User Management
  {
    path: "/managementuseradm",
    page: ManagementUserAdm,
    isShowHeader: false,
    isShowFooter: false,
  },
  // report adm
  {
    path: "/reportsadm",
    page: ReportsAdm,
    isShowHeader: false,
    isShowFooter: false,
  },
  // Theaters adm
  {
    path: "/theatersadm",
    page: TheatersAdm,
    isShowHeader: false,
    isShowFooter: false,
  },
];
