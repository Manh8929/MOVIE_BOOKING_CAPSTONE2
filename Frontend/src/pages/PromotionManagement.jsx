import { useState } from 'react';
import SidebarAdm from '../components/Admin/SidebarAdm';

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, code: 'SALE50', description: 'Giảm 50% vé xem phim', discount: 50, status: 'Hiệu lực' },
    { id: 2, code: 'NEW20', description: 'Giảm 20% cho thành viên mới', discount: 20, status: 'Hết hạn' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPromo, setCurrentPromo] = useState({
    id: '', code: '', description: '', discount: '', status: 'Hiệu lực'
  });

  const handleAdd = () => {
    const newPromo = {
      ...currentPromo,
      id: promotions.length + 1,
    };
    setPromotions([...promotions, newPromo]);
    setCurrentPromo({ code: '', description: '', discount: '', status: 'Hiệu lực' });
  };

  const handleEdit = (promo) => {
    setIsEditing(true);
    setCurrentPromo(promo);
  };

  const handleUpdate = () => {
    setPromotions(promotions.map(p => p.id === currentPromo.id ? currentPromo : p));
    setIsEditing(false);
    setCurrentPromo({ code: '', description: '', discount: '', status: 'Hiệu lực' });
  };

  const handleDelete = (id) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  return (
    <div className="flex h-screen">
      <SidebarAdm />

      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Quản Lý Khuyến Mãi</h1>

        {/* Form */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Sửa Khuyến Mãi' : 'Thêm Khuyến Mãi'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Mã khuyến mãi</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={currentPromo.code}
                onChange={(e) => setCurrentPromo({ ...currentPromo, code: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Tỷ lệ giảm (%)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={currentPromo.discount}
                onChange={(e) => setCurrentPromo({ ...currentPromo, discount: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Mô tả</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={currentPromo.description}
                onChange={(e) => setCurrentPromo({ ...currentPromo, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Trạng thái</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={currentPromo.status}
                onChange={(e) => setCurrentPromo({ ...currentPromo, status: e.target.value })}
              >
                <option value="Hiệu lực">Hiệu lực</option>
                <option value="Hết hạn">Hết hạn</option>
              </select>
            </div>
          </div>
          <button
            onClick={isEditing ? handleUpdate : handleAdd}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>

        {/* Danh sách khuyến mãi */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b border-r border-gray-300">#</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Mã</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Mô tả</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Giảm (%)</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Trạng thái</th>
              <th className="py-3 px-4 border-b border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(p => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-r border-gray-300">{p.id}</td>
                <td className="py-3 px-4 border-r border-gray-300">{p.code}</td>
                <td className="py-3 px-4 border-r border-gray-300">{p.description}</td>
                <td className="py-3 px-4 border-r border-gray-300">{p.discount}%</td>
                <td className="py-3 px-4 border-r border-gray-300">{p.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">Sửa</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionManagement;
