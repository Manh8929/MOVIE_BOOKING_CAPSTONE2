import { useState } from "react";

const EditMovie = ({ onClose }) => {
  const [movieTitle, setMovieTitle] = useState("The Matrix");
  const [description, setDescription] = useState("Sample Movie");
  const [duration, setDuration] = useState({ hours: 2, minutes: 30 });
  const [showingSchedule, setShowingSchedule] = useState("28/06/2023");
  const [endDate, setEndDate] = useState("16/12/2023");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4"> {/* Giảm chiều rộng modal xuống 50% */}
        {/* Nút đóng modal */}
        <button onClick={onClose} className="absolute top-2 right-2 text-lg text-gray-600">X</button>

        <div className="mt-4">
          {/* Tiêu đề phim */}
          <div className="mb-4">
            <label htmlFor="movieTitle" className="block text-gray-700">Tiêu đề phim</label>
            <input
              id="movieTitle"
              type="text"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
            />
          </div>

          {/* Mô tả */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Mô tả</label>
            <textarea
              id="description"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Thời gian và Giá */}
          <div className="mb-4 flex items-center space-x-4">
            {/* Thời gian */}
            <div className="flex-1">
              <label htmlFor="hours" className="block text-gray-700">Thời gian</label>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  id="hours"
                  type="number"
                  min="0"
                  className="px-4 py-2 w-16 border border-gray-300 rounded-md"
                  value={duration.hours}
                  onChange={(e) => setDuration({ ...duration, hours: e.target.value })}
                />
                <span>:</span>
                <input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  className="px-4 py-2 w-20 border border-gray-300 rounded-md"
                  value={duration.minutes}
                  onChange={(e) => setDuration({ ...duration, minutes: e.target.value })}
                />
              </div>
            </div>

            {/* Giá */}
            <div className="flex-1">
              <label htmlFor="price" className="block text-gray-700">Giá (VND)</label>
              <input
                id="price"
                type="text"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="VND"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Lịch chiếu */}
          <div className="mb-4">
            <label htmlFor="showingSchedule" className="block text-gray-700">Lịch chiếu</label>
            <input
              id="showingSchedule"
              type="date"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              value={showingSchedule}
              onChange={(e) => setShowingSchedule(e.target.value)}
            />
          </div>

          {/* Ngày kết thúc */}
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700">Ngày kết thúc</label>
            <input
              id="endDate"
              type="date"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Ảnh bìa */}
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-gray-700">Ảnh bìa</label>
            
            {/* Hiển thị ảnh nếu người dùng đã tải lên */}
            {coverImage && (
              <div className="mt-4">
                <img 
                  src={URL.createObjectURL(coverImage)} 
                  alt="Ảnh bìa" 
                  className="w-32 h-32 object-cover mt-2 rounded-md border-2 border-gray-300"
                />
              </div>
            )}

            <div className="flex items-center mt-2 space-x-4">
              <button
                className="bg-[#131c28] text-white px-4 py-2 rounded-md"
                onClick={() => document.getElementById('coverImage').click()}
              >
                Tải lên
              </button>
              <input
                id="coverImage"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Lưu và Hủy */}
          <div className="flex justify-between mt-6">
            <button className="bg-[#131c28] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1a2636]">
              Lưu
            </button>
            <button className="bg-gray-300 text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-400" onClick={onClose}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
