import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    city: '',
    district: '',
    address: '',
    email: '',
    idNumber: '',
    gender: 'male', // Default value
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Xử lý gửi dữ liệu đến server ở đây
  };

  return (
    <div className="mt-[80px] min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-red-600 p-4">
      <div className="bg-white rounded-md shadow-md p-8 w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ Tên */}
            <div>
              <label htmlFor="fullName" className="block text-red-800 font-medium mb-1">Họ Tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nhập Họ Tên Ở Đây"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Giới Tính */}
            <div>
              <label className="block text-red-800 font-medium mb-1">Giới Tính</label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="male">Nam</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <label htmlFor="female">Nữ</label>
                </div>
              </div>
            </div>

            {/* Ngày Sinh */}
            <div>
              <label htmlFor="birthDate" className="block text-red-800 font-medium mb-1">Ngày Sinh</label>
              <input
                type="text"
                id="birthDate"
                name="birthDate"
                placeholder="Chọn Ngày Sinh Của Bạn"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            {/* Số CMND */}
            <div>
              <label htmlFor="idNumber" className="block text-red-800 font-medium mb-1">Số CMND</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder="Nhập Số CMND Ở Đây"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>

            {/* Số Điện Thoại */}
            <div>
              <label htmlFor="phoneNumber" className="block text-red-800 font-medium mb-1">Số Điện Thoại</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  +84
                </div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Nhập Số Điện Thoại Ở Đây"
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-red-800 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập Email Ở Đây"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Mật Khẩu */}
            <div>
              <label htmlFor="password" className="block text-red-800 font-medium mb-1">Mật Khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập Mật Khẩu Ở Đây"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Xác Nhận Mật Khẩu */}
            <div>
              <label htmlFor="confirmPassword" className="block text-red-800 font-medium mb-1">Xác Nhận Mật Khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập Lại Mật Khẩu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Thành Phố */}
            <div>
              <label htmlFor="city" className="block text-red-800 font-medium mb-1">Thành Phố</label>
              <select
                id="city"
                name="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Chọn Thành Phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
                {/* Thêm các thành phố khác ở đây */}
              </select>
            </div>

            {/* Quận/Huyện */}
            <div>
              <label htmlFor="district" className="block text-red-800 font-medium mb-1">Quận/Huyện</label>
              <select
                id="district"
                name="district"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="">Chọn Quận/Huyện</option>
                {/* Các option quận/huyện sẽ được cập nhật dựa theo thành phố đã chọn */}
              </select>
            </div>

            {/* Địa Chỉ */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-red-800 font-medium mb-1">Địa Chỉ</label>
              <textarea
                id="address"
                name="address"
                placeholder="Nhập Địa Chỉ Ở Đây"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Điều khoản */}
          <div className="mt-6 flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              className="mt-1"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-sm">
              Tôi đã đọc, hiểu và đồng ý với <span className="text-red-500">các điều khoản</span>.
            </label>
          </div>

          {/* Captcha */}
          <div className="mt-4">
            <label className="block text-red-800 font-medium mb-1">Captcha</label>
            <div className="border border-gray-200 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="captcha"
                    className="mr-2"
                  />
                  <label htmlFor="captcha" className="text-sm">Tôi không phải là người máy</label>
                </div>
                <div className="text-xs text-gray-400">reCAPTCHA</div>
              </div>
            </div>
          </div>

          {/* Nút Đăng Ký */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-8 rounded-md transition duration-300"
            >
              ĐĂNG KÝ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;