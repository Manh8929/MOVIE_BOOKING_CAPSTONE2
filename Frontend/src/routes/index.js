import HomePage from "../pages/HomePage";
import AdminLogin from "../components/Admin/AdmLogin"; // Đảm bảo rằng đường dẫn đúng
import AddMovieAdm from "../pages/AddMovieAdm";


export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },

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
];
