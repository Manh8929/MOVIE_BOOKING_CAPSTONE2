import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";
import EditProfileForm from "../components/ProfileComponent/EditProfileForm";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    avatar: "",
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user",user);
    if (user) {
      setProfile(user);
      setFormData(user);
    }
  }, []);

  const handleEditClick = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="mt-[80px] min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#4f111e] text-white p-8">
      <h1 className="font-bold text-center text-3xl md:text-4xl mb-10">
        Hồ Sơ Cá Nhân
      </h1>

      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center md:col-span-1">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#dc143c] shadow-lg">
            <img
              src="data:image/jpeg;base64,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"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">{profile.name}</h2>
          <button
            className="mt-6 bg-[#dc143c] hover:bg-[#b0102e] transition px-6 py-2 rounded-full flex items-center gap-2"
            onClick={handleEditClick}
          >
            <FaEdit /> Chỉnh sửa
          </button>
        </div>

        {/* Thông tin cá nhân */}
        <div className="md:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin liên hệ */}
            <div className="bg-gray-700 p-6 rounded-xl shadow hover:scale-[1.02] transition">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <FaEnvelope /> {profile.email}
                </p>
                <p className="flex items-center gap-3">
                  <FaPhone /> {profile.phone}
                </p>
                <p className="flex items-center gap-3">
                  <FaMapMarkerAlt /> {profile.address}
                </p>
              </div>
            </div>

            {/* Thông tin đặt vé */}
            <div className="bg-gray-700 p-6 rounded-xl shadow hover:scale-[1.02] transition">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
                Thông tin đặt vé
              </h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <FaTicketAlt /> Tổng vé đã đặt:{" "}
                  <span className="ml-2 font-semibold">15 vé</span>
                </p>
                <p>
                  Thành viên từ: <span className="font-semibold">2022</span>
                </p>
              </div>
            </div>
          </div>

          {/* Lịch sử đặt vé */}
          <div className="bg-gray-700 p-6 rounded-xl shadow hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Lịch sử đặt vé
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-600">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="p-3">Tên phim</th>
                    <th className="p-3">Suất chiếu</th>
                    <th className="p-3">Ghế</th>
                    <th className="p-3">Ngày đặt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-600 hover:bg-gray-600">
                    <td className="p-3">Dune: Part Two</td>
                    <td className="p-3">20:00 - 15/03/2025</td>
                    <td className="p-3">A5, A6</td>
                    <td className="p-3">12/03/2025</td>
                  </tr>
                  <tr className="border-t border-gray-600 hover:bg-gray-600">
                    <td className="p-3">Kungfu Panda 4</td>
                    <td className="p-3">18:30 - 10/03/2025</td>
                    <td className="p-3">B7, B8</td>
                    <td className="p-3">08/03/2025</td>
                  </tr>
                  <tr className="border-t border-gray-600 hover:bg-gray-600">
                    <td className="p-3">Godzilla x Kong</td>
                    <td className="p-3">21:00 - 05/03/2025</td>
                    <td className="p-3">C3, C4</td>
                    <td className="p-3">03/03/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Form chỉnh sửa */}
      {isEditing && (
        <EditProfileForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyProfilePage;
