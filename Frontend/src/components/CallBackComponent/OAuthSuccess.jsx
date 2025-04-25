import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as userService from "../../services/userService";
import { login } from "../../redux/slices/userSlice";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Đăng nhập OAuth thành công! Token:", token);

      userService.getUserProfile(token)
      .then(user => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        dispatch(login(user)); // Cập nhật Redux store
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000); // Đợi toast xong rồi mới chuyển
      })
      .catch(err => {
        console.error("Lỗi lấy thông tin người dùng:", err);
        toast.error("Đăng nhập thất bại!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
    } else {
      toast.error("Đăng nhập thất bại!", {
        position: "top-right",
        autoClose: 3000,
      });

      console.warn("Không có token trong URL. Quay về login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <p className="text-lg text-gray-600">Đang xử lý đăng nhập...</p>
    </div>
  );
};

export default OAuthSuccess;
