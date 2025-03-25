import React from "react";

const EditProfileForm = ({ formData, setFormData, onClose, onSave }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Chỉnh sửa thông tin
        </h2>
        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            placeholder="Họ và tên"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white outline-none"
            placeholder="Email"
          />
          <input
            name="phone"
            value={formData.phone}
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
            onClick={onSave}
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
