import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SidebarAdm from "../components/Admin/SidebarAdm";
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/adminService";

const PromotionManagement = () => {
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
    // Danh sách các trường bắt buộc phải có giá trị (có thể điều chỉnh tùy nhu cầu)
    const requiredFields = [
      "title",
      "code",
      "discount_value",
      "min_order_value",
      "max_discount",
      "valid_from",
      "valid_to",
    ];

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
                Giá trị giảm
              </label>
              <input
                name="discount_value"
                type="number"
                placeholder="% hoặc số tiền"
                value={currentPromo.discount_value}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Loại giảm giá
              </label>
              <select
                name="discount_type"
                value={currentPromo.discount_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Phần trăm</option>
                <option value="amount">Số tiền</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Đơn hàng tối thiểu
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
                Phương thức thanh toán
              </label>
              <input
                name="applicable_payment"
                placeholder="Ví dụ: MoMo, ZaloPay"
                value={currentPromo.applicable_payment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Áp dụng cho phim
              </label>
              <input
                name="applicable_movies"
                placeholder="ID phim cách nhau bằng dấu phẩy"
                value={currentPromo.applicable_movies}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Tiêu đề</th>
                <th className="px-4 py-2 border">Mã</th>
                <th className="px-4 py-2 border">Giảm</th>
                <th className="px-4 py-2 border">Từ - Đến</th>
                <th className="px-4 py-2 border">Giới hạn</th>
                <th className="px-4 py-2 border">Trạng thái</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo, idx) => (
                <tr key={promo.promo_id}>
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{promo.title}</td>
                  <td className="px-4 py-2 border">{promo.code}</td>
                  <td className="px-4 py-2 border">
                    {promo.discount_value}
                    {promo.discount_type === "percentage" ? "%" : "₫"}
                  </td>
                  <td className="px-4 py-2 border">
                    {promo.valid_from?.slice(0, 10)} →{" "}
                    {promo.valid_to?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 border">
                    {promo.usage_limit} / mỗi người: {promo.user_limit}
                  </td>
                  <td className="px-4 py-2 border">
                    {promo.status === "active" ? (
                      <span className="text-green-600 font-semibold">
                        Hiệu lực
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Hết hạn
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
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
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromotionManagement;
