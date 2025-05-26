import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SidebarAdm from "../components/Admin/SidebarAdm";
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getAdminMovies,
} from "../services/adminService";

const PromotionManagement = () => {
  const [movies, setMovies] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    title: "",
    description: "",
    code: "",
    discount_type: "percentage",
    discount_value: "",
    min_order_value: "",
    max_discount: "",
    valid_from: "",
    valid_to: "",
    applicable_movies: "",
    applicable_payment: "",
    usage_limit: "",
    user_limit: "",
    max_users: "",
    status: "active",
    image_url: null,
  });

  const validatePromo = () => {
    const requiredFields = [
      "title",
      "code",
      "discount_value",
      "min_order_value",
      "max_discount",
      "valid_from",
      "valid_to",
    ];

    const isDuplicateCode = promotions.some(
      (promo) =>
        promo.code.toLowerCase() === currentPromo.code.toLowerCase() &&
        promo.promo_id !== currentPromo.promo_id
    );

    if (isDuplicateCode) {
      toast.error("Mã khuyến mãi đã tồn tại!");
      return false;
    }

    // Validate các trường bắt buộc
    for (const field of requiredFields) {
      const value = currentPromo[field];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && isNaN(value))
      ) {
        toast.error(`Trường "${field}" không được để trống!`);
        return false;
      }
    }

    // Validate ngày tháng
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(currentPromo.valid_from);
    const end = new Date(currentPromo.valid_to);

    if (start < today) {
      toast.error("Ngày bắt đầu phải là hôm nay hoặc sau!");
      return false;
    }

    if (end < start) {
      toast.error("Ngày kết thúc không được trước ngày bắt đầu!");
      return false;
    }

    return true;
  };

  const fetchPromotions = async () => {
    try {
      const data = await getAllPromotions();
      setPromotions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPromo({ ...currentPromo, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentPromo({ ...currentPromo, image_url: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!validatePromo()) return;

    currentPromo.applicable_payment = "cash";

    const formData = new FormData();
    for (let key in currentPromo) {
      const value = currentPromo[key];
      if (
        value !== null &&
        value !== "" &&
        !(typeof value === "string" && value.trim() === "")
      ) {
        formData.append(key, value);
      }
    }

    try {
      if (isEditing) {
        await updatePromotion(currentPromo.promo_id, formData);
        toast.success("Cập nhật khuyến mãi thành công!");
      } else {
        await createPromotion(formData);
        toast.success("Tạo khuyến mãi thành công!");
      }
      fetchPromotions();
      resetForm();
    } catch (error) {
      toast.error("Lỗi khi lưu khuyến mãi. Vui lòng thử lại!");
      console.error("Lỗi khi tạo promotion:", error);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
  };

  const resetForm = () => {
    setCurrentPromo({
      title: "",
      description: "",
      code: "",
      discount_type: "percentage",
      discount_value: "",
      min_order_value: "",
      max_discount: "",
      valid_from: "",
      valid_to: "",
      applicable_movies: "",
      applicable_payment: "",
      usage_limit: "",
      user_limit: "",
      max_users: "",
      status: "active",
      image_url: null,
    });
    setIsEditing(false);
  };

  const handleEdit = (promo) => {
    setIsEditing(true);
    setCurrentPromo(promo);
  };

  const handleDelete = async (id) => {
    await deletePromotion(id);
    fetchPromotions();
  };

  useEffect(() => {
    fetchPromotions();
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAdminMovies();
      console.log("Dữ liệu phim từ API:", data);
      setMovies(data.movies);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phim:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarAdm />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Quản lý khuyến mãi</h1>

        {/* Form nhập khuyến mãi đẹp hơn */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isEditing ? "Cập nhật khuyến mãi" : "Thêm khuyến mãi"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tiêu đề
              </label>
              <input
                name="title"
                placeholder="Tiêu đề"
                value={currentPromo.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Mã khuyến mãi
              </label>
              <input
                name="code"
                placeholder="Mã KM"
                value={currentPromo.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Giá trị giảm (%)
              </label>
              <select
                name="discount_value"
                value={currentPromo.discount_value}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn giá trị %</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}%
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Giá đơn hàng tối được thiểu áp dụng
              </label>
              <input
                name="min_order_value"
                type="number"
                placeholder="VNĐ"
                value={currentPromo.min_order_value}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Giảm tối đa
              </label>
              <input
                name="max_discount"
                type="number"
                placeholder="VNĐ"
                value={currentPromo.max_discount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                name="description"
                value={currentPromo.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Ngày bắt đầu
              </label>
              <input
                name="valid_from"
                type="date"
                value={currentPromo.valid_from}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Ngày kết thúc
              </label>
              <input
                name="valid_to"
                type="date"
                value={currentPromo.valid_to}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tổng lượt dùng
              </label>
              <input
                name="usage_limit"
                type="number"
                placeholder="Tổng lượt"
                value={currentPromo.usage_limit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Số người dùng tối đa
              </label>
              <input
                name="max_users"
                type="number"
                placeholder="Số người dùng tối đa"
                value={currentPromo.max_users}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Lượt dùng mỗi người
              </label>
              <input
                name="user_limit"
                type="number"
                placeholder="Lượt mỗi người"
                value={currentPromo.user_limit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Áp dụng cho phim
              </label>
              <select
                name="applicable_movies"
                value={currentPromo.applicable_movies}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Chọn phim áp dụng --</option>
                <option value="all">Tất cả phim</option>
                {movies.map((movie) => (
                  <option key={movie.movie_id} value={movie.movie_id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium text-gray-700">
              Ảnh minh hoạ
            </label>
            <input
              name="image_url"
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            {isEditing ? "Cập nhật khuyến mãi" : "Thêm khuyến mãi"}
          </button>
        </div>

        {/* Danh sách khuyến mãi */}
        <div className="mt-8 mb-16">
          <h2 className="text-xl font-semibold mb-4">Danh sách khuyến mãi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <div
                key={promo.promo_id}
                className="bg-white rounded-xl shadow-md p-4 border"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {promo.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {promo.description}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Mã KM: <strong>{promo.code}</strong>
                </p>
                {promo.image_url && (
                  <img
                    src={
                      typeof promo.image_url === "string"
                        ? promo.image_url
                        : URL.createObjectURL(promo.image_url)
                    }
                    alt={promo.title}
                    className="w-full h-48 object-cover rounded-lg mt-2"
                  />
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="text-blue-500 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(promo.promo_id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionManagement;
