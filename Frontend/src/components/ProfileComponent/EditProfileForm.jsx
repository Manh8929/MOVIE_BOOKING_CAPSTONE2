import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import * as userService from "../../services/userService";

const EditProfileForm = ({ formData, setFormData, onClose }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.full_name || !formData.phone_number) {
      setError("Họ và tên và số điện thoại là bắt buộc.");
      return;
    }

    const dataToSend = {
      full_name: formData.full_name,
      phone_number: formData.phone_number || "",
      address: formData.address || "",
      avatar: formData.avatar || "https://example.com/avatar.jpg",
      // dob: formData.dob || "",
      // gender: formData.gender || "male",
    };

    setError("");
    setLoading(true);

    try {
      if (!token) {
        throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
      }
      await userService.updateUserProfile(token, dataToSend);
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("currentUser")),
        ...dataToSend,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setFormData(updatedUser);
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Đã xảy ra lỗi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-xl shadow-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Chỉnh sửa thông tin
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {loading && (
          <div className="text-white text-center">Đang cập nhật...</div>
        )}
        <div className="space-y-4 flex flex-col items-center">
          {formData.avatar ? (
            <div className="relative mb-4">
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
              />
              <label className="absolute bottom-0 right-0 mb-1 mr-1 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <FaCamera className="text-white bg-gray-800 rounded-full p-1" />
              </label>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <FaCamera className="text-white" />
              </label>
            </div>
          )}
          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            placeholder="Họ và tên"
          />
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            placeholder="Số điện thoại"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            placeholder="Địa chỉ"
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#dc143c] hover:bg-[#b0102e] rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
