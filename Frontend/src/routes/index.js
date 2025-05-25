import HomePage from "../pages/HomePage";
import MyTicketPage from "../pages/MyTicketPage";
import ViewAllFilm from "../pages/ViewAllFilm";
import BookingDetail from "../pages/BookingDetail";
import PaymentPage from "../pages/PaymentPage";
import PaymentOtp from "../pages/PaymentOtp";
import PaymentSuccess from "../pages/PaymentSuccess";
import BookingFilmPage from "../pages/BookingFilmPage";
import SeatSelectPage from "../pages/SeatSelectPage";
import TheaterPage from "../pages/Theater";
import PromotionsPage from "../pages/PromotionsPage";
import AIRecommendedFilms from "../pages/AIRecommendedFilms";
import PromotionDetail from "../pages/PromotionDetailPage";
import NewsDetail from "../pages/NewsDetail";
import MemberPage from "../pages/MemberPage";
import NewsPage from "../pages/NewsPage";
import AdminLogin from "../components/Admin/AdmLogin";
import AddMovieAdm from "../pages/AddMovieAdm";
import TicketUpHisPage from "../pages/TicketUpHisPage";
import OderFlimAdm from "../pages/OderFlimAdm";
import ManagementUserAdm from "../pages/ManagementUserAdm";
import ReportsAdm from "../pages/ReportsAdm";
import TheatersAdm from "../pages/TheatersAdm";
import MovieSchedule from "../pages/MovieSchedule";
import NotFoundPage from "../pages/NotFoundPage";
import UnderConstruction from "../pages/UnderConstructionPage";
import MyProfilePage from "../pages/MyProfilePage";
import DetalFilmPage from "../pages/DetalFilmPage";
import LoginPage from "../pages/LoginPage";
import RegistrationForm from "../pages/RegistrationForm";
import ForgotPassword from "../pages/ForgotPassword";
import NewsManagement from "../pages/NewsManagement";
import PromotionManagement from "../pages/PromotionManagement";
import OAuthSuccess from "../components/CallBackComponent/OAuthSuccess";
import SeatsManagement from "../pages/SeatsManagement";
import CommentManagement from "../pages/CommentManagement";
import SeatTypeManagement from "../pages/SeatTypeManagement";
import ShowtimeManage from "../pages/ShowtimeManage";
import ManagerPayment from "../pages/ManagerPayment";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/oauth-success",
    page: OAuthSuccess,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/under-construction",
    page: UnderConstruction,
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
    path: "/theaters",
    page: TheaterPage,
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
  {
    path: "profile",
    page: MyProfilePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/detail-film/:id",
    page: DetalFilmPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "members",
    page: MemberPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "news",
    page: NewsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "movie-recommendation",
    page: AIRecommendedFilms,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/promotions/:id",
    page: PromotionDetail,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/news/:id",
    page: NewsDetail,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/registration",
    page: RegistrationForm,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/forgotpassword",
    page: ForgotPassword,
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
  // order
  {
    path: "/oderflimadm",
    page: OderFlimAdm,
    isShowHeader: false,
    isShowFooter: false,
  },
  // new
  {
    path: "/newsmanageadm",
    page: NewsManagement,
    isShowHeader: false,
    isShowFooter: false,
  },
  // discount
  {
    path: "/promotionmanagement",
    page: PromotionManagement,
    isShowHeader: false,
    isShowFooter: false,
  },
  // Oders Flim Admin
  {
    path: "/oderflimadm",
    page: OderFlimAdm,
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
  {
    path: "/seat-management",
    page: SeatsManagement,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/price-management",
    page: SeatTypeManagement,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/comment-management",
    page: CommentManagement,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/showtimeAdm",
    page: ShowtimeManage,
    isShowHeader: false,
    isShowFooter: false,
  },
    {
    path: "/managerPaymentAdm",
    page: ManagerPayment,
    isShowHeader: false,
    isShowFooter: false,
  },
];
/////////////////////////////////////////////
