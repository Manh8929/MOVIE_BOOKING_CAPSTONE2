// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import { useEffect, useState } from "react";

// import {
//   getAllTheaters,
//   createTheater,
//   deleteTheater,
// } from "../services/adminService";
// import SidebarAdm from "../components/Admin/SidebarAdm";

// const Theaters = () => {
//   const [theaters, setTheaters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false); 

//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [totalScreens, setTotalScreens] = useState(0);
//   const [contact, setContact] = useState("");

//   const fetchTheaters = async () => {
//     try {
//       const data = await getAllTheaters();
//       const theatersArray = Array.isArray(data) ? data : data.theaters || [];
//       setTheaters(theatersArray);
//     } catch (error) {
//       console.error("Không thể tải danh sách rạp:", error);
//       setTheaters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTheaters();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !location || totalScreens <= 0 || !contact) {
//       toast.error("Vui lòng điền đầy đủ thông tin!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const newTheater = {
//         name,
//         location,
//         total_screens: totalScreens,
//         contact,
//       };
//       const response = await createTheater(newTheater);
//       toast.success("Tạo rạp thành công!");
//       setTheaters((prev) => [...prev, response]);
//       setName("");
//       setLocation("");
//       setTotalScreens(0);
//       setContact("");
//       setShowForm(false); 
//     } catch (error) {
//       toast.error("Đã có lỗi xảy ra khi tạo rạp!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteTheater = async (id) => {
//     if (confirm("Bạn có chắc chắn muốn xóa rạp này không?")) {
//       try {
//         await deleteTheater(id);
//         setTheaters((prev) => prev.filter((t) => t.theater_id !== id));
//         toast.success("Xóa thành công");
//       } catch (error) {
//         toast.error("Lỗi khi xóa rạp:", error);
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen">
// <<<<<<< Updated upstream
//       <ToastContainer />
//       <SidebarAdm />
// =======
//       {/* Sidebar */}
//       <SidebarAdm /> {/* Đặt Sidebar bên trái trang */}
    
// >>>>>>> Stashed changes
//       <div className="flex-1 p-6 bg-gray-50">
//         {/* Header */}
//         <header className="mb-6 flex justify-start items-center">
//           <div className="flex items-center ml-6">
//             <span className="ml-3 text-xl font-semibold">Quản lý rạp chiếu phim</span>
//           </div>
//         </header>

// <<<<<<< Updated upstream
// =======
//         {/* Đường kẻ phân cách */}
//         <div className="border-t border-gray-300 mb-6"></div>
//         {/* Nút thêm mới */}
// >>>>>>> Stashed changes
//         <div className="mb-4 text-right">
//           <button
//             onClick={() => setShowForm(!showForm)} 
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
//           >
//             + Thêm Rạp Chiếu
//           </button>
//         </div>

//         {showForm && (
//           <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Thêm Rạp Chiếu</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Tên Rạp
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 p-2 w-full border border-gray-300 rounded"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Địa điểm
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 p-2 w-full border border-gray-300 rounded"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Tổng số phòng chiếu
//                 </label>
//                 <input
//                   type="number"
//                   className="mt-1 p-2 w-full border border-gray-300 rounded"
//                   value={totalScreens}
//                   onChange={(e) => setTotalScreens(Number(e.target.value))}
//                   min="1"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Số điện thoại liên hệ
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 p-2 w-full border border-gray-300 rounded"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full p-2 bg-blue-600 text-white rounded-lg ${
//                   loading && "opacity-50 cursor-not-allowed"
//                 }`}
//                 disabled={loading}
//               >
//                 {loading ? "Đang tạo..." : "Tạo Rạp Chiếu"}
//               </button>
//             </form>
//           </div>
//         )}

//         {loading ? (
//           <p>Đang tải...</p>
//         ) : theaters.length === 0 ? (
//           <p className="text-gray-500">Chưa có rạp nào</p>
//         ) : (
//           theaters.map((theater) => (
//             <div
//             key={theater.id}
//             className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center space-x-3">
//                 <button className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none">
//                   Xem chi tiết
//                 </button>
//                 <h2 className="text-xl font-semibold text-gray-800">{theater.name}</h2>
//               </div>
//               <div className="space-x-3">
//                 <button className="text-green-500 hover:text-green-700 hover:underline focus:outline-none">
//                   + Thêm Phòng
//                 </button>
//                 <button className="text-yellow-500 hover:text-yellow-700 hover:underline focus:outline-none">
//                   Sửa
//                 </button>
//                 <button
//                   className="text-red-500 hover:text-red-700 hover:underline focus:outline-none"
//                   onClick={() => handleDeleteTheater(theater.theater_id)}
//                 >
//                   Xóa
//                 </button>
//               </div>
//             </div>
          
//             <div className="flex items-center justify-between text-sm text-gray-500">
//               <p className="italic">Tổng số phòng chiếu: {theater.total_screens}</p>
//             </div>
//           </div>          
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Theaters;
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import {
  getAllTheaters,
  createTheater,
  deleteTheater,
} from "../services/adminService";
import SidebarAdm from "../components/Admin/SidebarAdm";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [totalScreens, setTotalScreens] = useState(0);
  const [contact, setContact] = useState("");

  const fetchTheaters = async () => {
    try {
      const data = await getAllTheaters();
      const theatersArray = Array.isArray(data) ? data : data.theaters || [];
      setTheaters(theatersArray);
    } catch (error) {
      console.error("Không thể tải danh sách rạp:", error);
      setTheaters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || totalScreens <= 0 || !contact) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      const newTheater = {
        name,
        location,
        total_screens: totalScreens,
        contact,
      };
      const response = await createTheater(newTheater);
      toast.success("Tạo rạp thành công!");
      setTheaters((prev) => [...prev, response]);
      setName("");
      setLocation("");
      setTotalScreens(0);
      setContact("");
      setShowForm(false);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tạo rạp!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTheater = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa rạp này không?")) {
      try {
        await deleteTheater(id);
        setTheaters((prev) => prev.filter((t) => t.theater_id !== id));
        toast.success("Xóa thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa rạp:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <SidebarAdm />
      <div className="flex-1 p-6 bg-gray-50">
        <header className="mb-6 flex justify-start items-center">
          <div className="flex items-center ml-6">
            <span className="ml-3 text-xl font-semibold">Quản lý rạp chiếu phim</span>
          </div>
        </header>

        <div className="border-t border-gray-300 mb-6"></div>

        <div className="mb-4 text-right">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Thêm Rạp Chiếu
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Thêm Rạp Chiếu</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên Rạp</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tổng số phòng chiếu</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={totalScreens}
                  onChange={(e) => setTotalScreens(Number(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Số điện thoại liên hệ</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full p-2 bg-blue-600 text-white rounded-lg ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              >
                {loading ? "Đang tạo..." : "Tạo Rạp Chiếu"}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Đang tải...</p>
        ) : theaters.length === 0 ? (
          <p className="text-gray-500">Chưa có rạp nào</p>
        ) : (
          theaters.map((theater) => (
            <div
              key={theater.id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-300 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <button className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none">
                    Xem chi tiết
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">{theater.name}</h2>
                </div>
                <div className="space-x-3">
                  <button className="text-green-500 hover:text-green-700 hover:underline focus:outline-none">
                    + Thêm Phòng
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700 hover:underline focus:outline-none">
                    Sửa
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 hover:underline focus:outline-none"
                    onClick={() => handleDeleteTheater(theater.theater_id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <p className="italic">Tổng số phòng chiếu: {theater.total_screens}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Theaters;
