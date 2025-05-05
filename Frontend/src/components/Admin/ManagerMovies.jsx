import { useState, useEffect } from "react";
import {
  createAdminMovie,
  updateAdminMovie,
} from "../../services/adminService";
import { toast } from "react-toastify";

const isValidDate = (dateStr) => {
  const [dd, mm, yyyy] = dateStr.split("/");
  const d = new Date(`${yyyy}-${mm}-${dd}`);
  return (
    d &&
    d.getDate() === parseInt(dd) &&
    d.getMonth() + 1 === parseInt(mm) &&
    d.getFullYear() === parseInt(yyyy)
  );
};

const ManagerMovies = ({ onClose, movie }) => {
  const [form, setForm] = useState({
    title: "",
    genre: [],
    description: "",
    detailed_description: "",
    duration: 120,
    release_date: "",
    status: "upcoming",
    poster_url: "",
    trailer_url: "",
    banner_url: "",
    avatar_url: "",
    rating: 0,
    average_rating: null,
    director: "",
    actors: "",
    language: "",
  });

  useEffect(() => {
    if (movie) {
      const dateObj = new Date(movie.release_date);
      const formattedDate = `${dateObj
        .getDate()
        .toString()
        .padStart(2, "0")}/${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${dateObj.getFullYear()}`;

      setForm({
        ...movie,
        genre: movie.genre?.split(",") || [],
        release_date: formattedDate,
        rating: movie.rating || 0,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in form) {
      if (key === "rating" && !movie) continue;
      if (
        (!form[key] &&
          ![
            "poster_url",
            "banner_url",
            "avatar_url",
            "rating",
            "average_rating",
          ].includes(key)) ||
        (["poster_url", "banner_url", "avatar_url"].includes(key) && !form[key])
      ) {
        toast.error(`${key} không được để trống!`);
        return;
      }
    }

    if (form.genre.length === 0) {
      toast.error("Vui lòng chọn ít nhất một thể loại!");
      return;
    }

    if (!isValidDate(form.release_date)) {
      toast.error("Ngày phát hành không hợp lệ! (Định dạng dd/mm/yyyy)");
      return;
    }

    const [dd, mm, yyyy] = form.release_date.split("/");
    const releaseDate = new Date(`${yyyy}-${mm}-${dd}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bỏ phần giờ để so sánh chính xác ngày

    if (
      (form.status === "now_showing" || form.status === "upcoming") &&
      releaseDate < today
    ) {
      toast.error(
        "Ngày phát hành phải hôm nay hoặc sau hôm nay cho phim đang/sắp chiếu."
      );
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        if (key === "release_date") {
          const formattedDate = form[key].split("/").reverse().join("-");
          formData.append(key, formattedDate);
        } else {
          formData.append(key, form[key]);
        }
      }
    }

    try {
      if (movie) {
        await updateAdminMovie(movie.movie_id, formData);
        toast.success("Cập nhật phim thành công!");
      } else {
        formData.delete("rating");
        await createAdminMovie(formData);
        toast.success("Phim đã được tạo thành công!");
      }
      onClose();
    } catch (error) {
      toast.error(
        `${movie ? "Cập nhật" : "Tạo"} phim thất bại. Lý do: ${error.message}`
      );
      console.error(error);
    }
  };

  const genresList = [
    "Hành động",
    "Kinh dị",
    "Tình cảm",
    "Hài",
    "Phiêu lưu",
    "Hoạt hình",
    "Tài liệu",
    "Tâm lý",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-4 text-lg text-gray-600"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">
          {movie ? "Chỉnh sửa phim" : "Tạo phim mới"}
        </h2>

        {Object.entries({
          title: "Tiêu đề",
          genre: "Thể loại",
          description: "Mô tả",
          detailed_description: "Mô tả chi tiết",
          duration: "Thời lượng (phút)",
          release_date: "Ngày phát hành (dd/mm/yyyy)",
          status: "Trạng thái",
          poster_url: "Poster",
          trailer_url: "Trailer URL",
          banner_url: "Banner",
          avatar_url: "Ảnh đại diện",
          director: "Đạo diễn",
          actors: "Diễn viên",
          language: "Ngôn ngữ",
        }).map(([key, label]) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-gray-700 mb-1">
              {label}
            </label>

            {key === "status" ? (
              <select
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="upcoming">Sắp chiếu</option>
                <option value="now_showing">Đang chiếu</option>
                <option value="ended">Đã chiếu</option>
              </select>
            ) : key === "release_date" ? (
              <input
                id={key}
                name={key}
                type="text"
                placeholder="dd/mm/yyyy"
                value={form[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            ) : ["poster_url", "banner_url", "avatar_url"].includes(key) ? (
              <input
                id={key}
                name={key}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            ) : key === "language" ? (
              <select
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              >
                <option value="">-- Chọn ngôn ngữ --</option>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Tiếng Anh (có Việt sub)">
                  Tiếng Anh (có Việt sub)
                </option>
                <option value="Tiếng Trung (có Việt sub)">
                  Tiếng Trung (có Việt sub)
                </option>
                <option value="Tiếng Hàn (có Việt sub)">
                  Tiếng Hàn (có Việt sub)
                </option>
                <option value="Tiếng Nhật (có Việt sub)">
                  Tiếng Nhật (có Việt sub)
                </option>
                <option value="Tiếng Pháp (có Việt sub)">
                  Tiếng Pháp (có Việt sub)
                </option>
                <option value="other">Khác...</option>
              </select>
            ) : key === "genre" ? (
              <div className="grid grid-cols-2 gap-2">
                {genresList.map((genreOption) => (
                  <label
                    key={genreOption}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={genreOption}
                      checked={form.genre.includes(genreOption)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setForm((prev) => ({
                          ...prev,
                          genre: checked
                            ? [...prev.genre, value]
                            : prev.genre.filter((g) => g !== value),
                        }));
                      }}
                    />
                    <span>{genreOption}</span>
                  </label>
                ))}
              </div>
            ) : key === "rating" && !movie ? null : (
              <input
                id={key}
                name={key}
                type={key === "rating" ? "number" : "text"}
                step={key === "rating" ? "0.1" : undefined}
                min={key === "rating" ? "0" : undefined}
                max={key === "rating" ? "10" : undefined}
                value={form[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            )}
            {key === "language" && form.language === "other" && (
              <input
                type="text"
                name="language"
                placeholder="Nhập ngôn ngữ khác..."
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            className="bg-[#131c28] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1a2636]"
          >
            {movie ? "Cập nhật" : "Lưu"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerMovies;
