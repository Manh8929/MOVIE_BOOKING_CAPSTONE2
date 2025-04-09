import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Đăng nhập OAuth thành công! Token:", token);

      toast.success("Đăng nhập thành công bằng!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000); // Đợi toast xong rồi mới chuyển
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
