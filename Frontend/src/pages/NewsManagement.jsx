// import { useState, useEffect } from "react";
// import SidebarAdm from '../components/Admin/SidebarAdm';
// import { getNews } from '../services/userService';
// import { addNews } from '../services/adminService';
// import { getMovies } from '../services/userService';
// import { toast } from 'react-toastify';

// export default function NewsManagement() {
//   const [newsList, setNewsList] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     status: "Specific",
//     thumbnail: null,
//     movieId: "", // Store selected movieId when status is "General"
//   });

//   const [movies, setMovies] = useState([]); // State to store movies

//   useEffect(() => {
//     // Lấy tất cả tin tức khi component render
//     getNews()
//       .then((newsData) => setNewsList(newsData)) // Set the news data from API to state
//       .catch((error) => console.error("Error fetching news:", error));
//   }, []);  // Run this useEffect once when the component mounts

//   useEffect(() => {
//     if (formData.status === "General") {
//       getMovies()
//         .then((movies) => setMovies(movies))
//         .catch((error) => console.error("Error fetching movies:", error));
//     } else {
//       setMovies([]);
//     }
//   }, [formData.status]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAdd = async () => {
//     // Kiểm tra bắt buộc các trường nhập liệu và ảnh bìa
//     if (!formData.title.trim() || !formData.content.trim()) {
//       toast.error("Vui lòng điền đầy đủ thông tin!"); // Hiển thị thông báo lỗi nếu thiếu thông tin
//       return;
//     }

//     if (!formData.thumbnail) {
//       toast.error("Vui lòng chọn ảnh bìa!"); // Hiển thị thông báo lỗi nếu thiếu ảnh bìa
//       return;
//     }

//     const newNews = {
//       title: formData.title,
//       content: formData.content,
//       category: formData.status, // Đặt category tùy thuộc vào trạng thái
//       movie_id: formData.status === "General" ? formData.movieId : undefined, // Nếu là General, thêm movie_id
//       image_url: formData.thumbnail
//         ? URL.createObjectURL(formData.thumbnail) // Tạo URL cho ảnh thumbnail
//         : "", // Nếu không có ảnh, sử dụng chuỗi rỗng
//       published_at: new Date().toISOString(), // Sử dụng thời gian hiện tại
//     };

//     try {
//       // Gửi yêu cầu POST tới API
//       await addNews(newNews); // Gọi hàm thêm tin tức từ adminService
//       setNewsList([...newsList, newNews]); // Cập nhật danh sách tin tức
//       setFormData({
//         title: "",
//         content: "",
//         status: "Specific",
//         thumbnail: null,
//         movieId: "",
//       });
//       toast.success("Thêm tin tức thành công!"); // Hiển thị thông báo thành công
//     } catch (error) {
//       console.error("Error adding news:", error);
//       toast.error("Thêm tin tức thất bại!"); // Hiển thị thông báo thất bại nếu có lỗi
//     }
//   };

//   const handleDelete = (id) => {
//     setNewsList(newsList.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="flex min-h-screen w-full">
//       <SidebarAdm />

//       <div className="flex-1 p-6 w-full">
//         <h1 className="text-3xl font-bold mb-6">📰 Quản Lý Tin Tức</h1>

//         <div className="bg-white rounded-2xl shadow p-6 mb-[15px]">
//           <h2 className="text-xl font-semibold mb-4">Thêm Tin Tức</h2>
//           <div className="flex gap-6">
            
//             <div className="flex-1 space-y-4 border-r pr-6">
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Tiêu đề"
//                 className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 placeholder="Nội dung"
//                 rows={3}
//                 className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-[200px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
//               >
//                 <option value="Specific">Specific</option>
//                 <option value="General">General</option>
//               </select>

//               {formData.status === "General" && (
//                 <select
//                   name="movieId"
//                   value={formData.movieId}
//                   onChange={handleChange}
//                   className="w-[200px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Chọn phim</option>
//                   {movies.map((movie) => (
//                     <option key={movie.movie_id} value={movie.movie_id}>
//                       {movie.title}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             <div className="w-1/3 flex flex-col justify-between space-y-4 pl-6">
//               <div>
//                 <label className="block mb-1 font-medium">Ảnh bìa</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setFormData({ ...formData, thumbnail: e.target.files[0] })
//                   }
//                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100"
//                 />
//                 {formData.thumbnail && (
//                   <img
//                     src={URL.createObjectURL(formData.thumbnail)}
//                     alt="Preview"
//                     className="mt-3 h-24 rounded-lg object-cover"
//                   />
//                 )}
//               </div>

//               <button
//                 onClick={handleAdd}
//                 className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
//               >
//                 Thêm
//               </button>
//             </div>

//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow overflow-hidden">
//           <table className="w-full table-auto">
//             <thead className="bg-gray-100 text-gray-700 text-sm">
//               <tr>
//                 <th className="py-2 px-4 text-left w-1/12 border-r">#</th>
//                 <th className="py-2 px-4 text-left w-4/12 border-r">Tiêu đề</th>
//                 <th className="py-2 px-4 text-left w-2/12 border-r">Ảnh bìa</th>
//                 <th className="py-2 px-4 text-left w-2/12 border-r">Trạng thái</th>
//                 <th className="py-2 px-4 text-center w-3/12">Hành động</th>
//               </tr>
//             </thead>
//           </table>

//           {/* Scroll tbody */}
//           <div className="max-h-[210px] overflow-y-auto">
//             <table className="w-full table-auto">
//               <tbody className="text-sm">
//                 {newsList.map((item, index) => (
//                   <tr key={item.id} className="border-t hover:bg-gray-50">
//                     <td className="py-2 px-4 w-1/12 border-r">{index + 1}</td>
//                     <td className="py-2 px-4 w-4/12 border-r">{item.title}</td>
//                     <td className="py-2 px-4 w-2/12 border-r">
//                       {item.image_url ? (
//                         <img
//                           src={item.image_url}
//                           alt="Thumbnail"
//                           className="h-12 w-20 object-cover rounded"
//                         />
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                     <td className="py-2 px-4 w-2/12 border-r">{item.category}</td>
//                     <td className="py-2 px-4 w-3/12 text-center">
//                       <button className="text-blue-600 hover:underline">Sửa</button>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-red-500 hover:underline ml-2"
//                       >
//                         Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {newsList.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="py-5 text-center text-gray-500">
//                       Không có tin tức nào.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import SidebarAdm from '../components/Admin/SidebarAdm';
import { getNews } from '../services/userService';
import { addNews, deleteNews } from '../services/adminService';
import { getMovies } from '../services/userService';
import { toast } from 'react-toastify';

export default function NewsManagement() {
  const [newsList, setNewsList] = useState([]); 

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Specific",
    thumbnail: null,
    movieId: "", // Store selected movieId when status is "General"
  });

  const [movies, setMovies] = useState([]); // State to store movies

  useEffect(() => {
    // Lấy tất cả tin tức khi component render
    getNews()
      .then((newsData) => setNewsList(newsData)) // Set the news data from API to state
      .catch((error) => console.error("Error fetching news:", error));
  }, []);  // Run this useEffect once when the component mounts

  useEffect(() => {
    if (formData.status === "General") {
      getMovies()
        .then((movies) => setMovies(movies))
        .catch((error) => console.error("Error fetching movies:", error));
    } else {
      setMovies([]);
    }
  }, [formData.status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    // Kiểm tra bắt buộc các trường nhập liệu và ảnh bìa
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin!"); // Hiển thị thông báo lỗi nếu thiếu thông tin
      return;
    }

    if (!formData.thumbnail) {
      toast.error("Vui lòng chọn ảnh bìa!"); // Hiển thị thông báo lỗi nếu thiếu ảnh bìa
      return;
    }

    const newNews = {
      title: formData.title,
      content: formData.content,
      category: formData.status, // Đặt category tùy thuộc vào trạng thái
      movie_id: formData.status === "General" ? formData.movieId : undefined, // Nếu là General, thêm movie_id
      image_url: formData.thumbnail
        ? URL.createObjectURL(formData.thumbnail) // Tạo URL cho ảnh thumbnail
        : "", // Nếu không có ảnh, sử dụng chuỗi rỗng
      published_at: new Date().toISOString(), // Sử dụng thời gian hiện tại
    };

    try {
      // Gửi yêu cầu POST tới API
      await addNews(newNews); // Gọi hàm thêm tin tức từ adminService
      setNewsList([...newsList, newNews]); // Cập nhật danh sách tin tức
      setFormData({
        title: "",
        content: "",
        status: "Specific",
        thumbnail: null,
        movieId: "",
      });
      toast.success("Thêm tin tức thành công!"); // Hiển thị thông báo thành công
    } catch (error) {
      console.error("Error adding news:", error);
      toast.error("Thêm tin tức thất bại!"); // Hiển thị thông báo thất bại nếu có lỗi
    }
  };

  const handleDelete = async (id) => {
    // Xác nhận xóa tin tức
    const isConfirmed = window.confirm("Bạn chắc chắn muốn xóa tin tức này?");
    
    if (isConfirmed) {
      try {
        await deleteNews(id); // Gọi hàm xóa tin tức từ adminService
        setNewsList(newsList.filter((item) => item.news_id !== id)); // Xóa tin tức khỏi state
        toast.success("Tin tức đã được xóa!");  // Hiển thị thông báo thành công
      } catch (error) {
        console.error("Error deleting news:", error);
        toast.error("Xóa tin tức thất bại!");  // Hiển thị thông báo lỗi
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <SidebarAdm />

      <div className="flex-1 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">📰 Quản Lý Tin Tức</h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-[15px]">
          <h2 className="text-xl font-semibold mb-4">Thêm Tin Tức</h2>
          <div className="flex gap-6">
            <div className="flex-1 space-y-4 border-r pr-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Tiêu đề"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Nội dung"
                rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-[200px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              >
                <option value="Specific">Specific</option>
                <option value="General">General</option>
              </select>

              {formData.status === "General" && (
                <select
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleChange}
                  className="w-[200px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn phim</option>
                  {movies.map((movie) => (
                    <option key={movie.movie_id} value={movie.movie_id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="w-1/3 flex flex-col justify-between space-y-4 pl-6">
              <div>
                <label className="block mb-1 font-medium">Ảnh bìa</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.files[0] })
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {formData.thumbnail && (
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Preview"
                    className="mt-3 h-24 rounded-lg object-cover"
                  />
                )}
              </div>

              <button
                onClick={handleAdd}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-2 px-4 text-left w-1/12 border-r">#</th>
                <th className="py-2 px-4 text-left w-4/12 border-r">Tiêu đề</th>
                <th className="py-2 px-4 text-left w-2/12 border-r">Ảnh bìa</th>
                <th className="py-2 px-4 text-left w-2/12 border-r">Trạng thái</th>
                <th className="py-2 px-4 text-center w-3/12">Hành động</th>
              </tr>
            </thead>
          </table>

          {/* Scroll tbody */}
          <div className="max-h-[210px] overflow-y-auto">
            <table className="w-full table-auto">
              <tbody className="text-sm">
                {newsList.map((item, index) => (
                  <tr key={item.news_id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 w-1/12 border-r">{item.news_id}</td> {/* Hiển thị news_id */}
                    <td className="py-2 px-4 w-4/12 border-r">{item.title}</td>
                    <td className="py-2 px-4 w-2/12 border-r">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt="Thumbnail"
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 w-2/12 border-r">{item.category}</td>
                    <td className="py-2 px-4 w-3/12 text-center">
                      <button className="text-blue-600 hover:underline">Sửa</button>
                      <button
                        onClick={() => handleDelete(item.news_id)} // Gọi hàm delete với news_id
                        className="text-red-500 hover:underline ml-2"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {newsList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-5 text-center text-gray-500">
                      Không có tin tức nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
