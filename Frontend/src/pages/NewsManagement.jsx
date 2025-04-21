import { useState } from 'react';
import SidebarAdm from '../components/Admin/SidebarAdm';

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([
    { id: 1, title: 'Tin tức 1', content: 'Nội dung tin tức 1', status: 'Đang hoạt động' },
    { id: 2, title: 'Tin tức 2', content: 'Nội dung tin tức 2', status: 'Bị ẩn' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState({ id: '', title: '', content: '', status: 'Đang hoạt động' });

  const handleAddNews = () => {
    const newNews = {
      id: newsList.length + 1,
      ...currentNews,
    };
    setNewsList([...newsList, newNews]);
    setCurrentNews({ title: '', content: '', status: 'Đang hoạt động' });
  };

  const handleEditNews = (news) => {
    setCurrentNews(news);
    setIsEditing(true);
  };

  const handleUpdateNews = () => {
    const updated = newsList.map((news) =>
      news.id === currentNews.id ? currentNews : news
    );
    setNewsList(updated);
    setIsEditing(false);
    setCurrentNews({ title: '', content: '', status: 'Đang hoạt động' });
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdm />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Quản Lý Tin Tức</h1>

        {/* Thêm/Sửa Tin Tức */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Sửa Tin Tức' : 'Thêm Tin Tức'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Tiêu đề</label>
            <input
              type="text"
              value={currentNews.title}
              onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nội dung</label>
            <textarea
              value={currentNews.content}
              onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trạng thái</label>
            <select
              value={currentNews.status}
              onChange={(e) => setCurrentNews({ ...currentNews, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Bị ẩn">Bị ẩn</option>
            </select>
          </div>
          <button
            onClick={isEditing ? handleUpdateNews : handleAddNews}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cập Nhật' : 'Thêm'}
          </button>
        </div>

        {/* Danh sách Tin Tức */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b border-r border-gray-300">#</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Tiêu đề</th>
              <th className="py-3 px-4 border-b border-r border-gray-300">Trạng thái</th>
              <th className="py-3 px-4 border-b border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-r border-gray-300">{news.id}</td>
                <td className="py-3 px-4 border-r border-gray-300">{news.title}</td>
                <td className="py-3 px-4 border-r border-gray-300">{news.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEditNews(news)}
                    className="text-blue-500 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteNews(news.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsManagement;
