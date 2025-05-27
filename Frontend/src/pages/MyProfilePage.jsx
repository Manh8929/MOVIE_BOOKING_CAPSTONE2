import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { getUserPayments } from "../services/userService";
import EditProfileForm from "../components/ProfileComponent/EditProfileForm";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [payments, setPayments] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [memberSince, setMemberSince] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    avatar: "",
  });

  const [formData, setFormData] = useState(profile);
  console.log("formData", formData);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user", user);
    if (user) {
      setProfile(user);
      setFormData(user);
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setProfile(user);
    }
  }, [formData]);

  const handleEditClick = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem("currentUser", JSON.stringify(formData)); // Save the updated data into localStorage
    setIsEditing(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");
    if (user) {
      const userId = user.user_id;

      const memberYear = new Date(user.updatedAt).getFullYear();
      setMemberSince(memberYear);

      getUserPayments(userId, token)
        .then((data) => {
          setPayments(data);

          // Tính tổng vé
          const total = data.reduce((sum, payment) => {
            return sum + (payment.Booking ? 1 : 0);
          }, 0);
          setTotalTickets(total);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy lịch sử thanh toán:", error);
        });
    }
  }, []);

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
              src={
                profile.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">{profile.full_name}</h2>
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
                  <FaPhone /> {profile.phone_number}
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
                  <span className="ml-2 font-semibold">{totalTickets} vé</span>
                </p>
                <p>
                  Thành viên từ:{" "}
                  <span className="font-semibold">{memberSince}</span>
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
                  {payments.map((payment) => {
                    const { payment_id, payment_time, Booking } = payment;
                    const movieTitle =
                      Booking?.Showtime?.Movie?.title || "Không rõ";
                    const showTime = Booking?.Showtime?.show_time;
                    const seats = Booking?.BookingSeats.map(
                      (bs) => bs.Seat?.seat_number
                    ).join(", ");

                    const formattedShowtime = new Date(showTime).toLocaleString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    );

                    const formattedBookingTime = new Date(
                      payment_time
                    ).toLocaleDateString("vi-VN");

                    return (
                      <tr
                        key={payment_id}
                        className="border-t border-gray-600 hover:bg-gray-600"
                      >
                        <td className="p-3">{movieTitle}</td>
                        <td className="p-3">{formattedShowtime}</td>
                        <td className="p-3">{seats}</td>
                        <td className="p-3">{formattedBookingTime}</td>
                      </tr>
                    );
                  })}
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
