import HomePage from "../pages/HomePage";
import ViewAllFilm from "../pages/ViewAllFilm";
import MyTicketPage from "../pages/MyTicketPage";
import AdminLogin from "../components/Admin/AdmLogin";
import AddMovieAdm from "../pages/AddMovieAdm";
import TicketUpHisPage from "../pages/TicketUpHisPage";
import OderFlimAdm from "../pages/OderFlimAdm";
import ManagementUserAdm from "../pages/ManagementUserAdm";
import ReportsAdm from "../pages/ReportsAdm";
import TheatersAdm from "../pages/TheatersAdm";



export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
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

