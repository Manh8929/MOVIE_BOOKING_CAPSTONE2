import React, { useEffect, useState } from 'react';
import { getAvailableTheaters } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const Theater = () => {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const data = await getAvailableTheaters();
                setTheaters(data);
            } catch (err) {
                setError('Không thể tải danh sách rạp.');
            } finally {
                setLoading(false);
            }
        };

        fetchTheaters();
    }, []);

    const handleSelectTheater = (theater) => {
        localStorage.setItem('selectedTheaterId', theater.theater_id);
        navigate('/booking-movie');
    };

    if (loading) return <p className="text-center text-lg text-gray-500">Đang tải danh sách rạp...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="mt-[80px] mb-3 max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Chọn Rạp Chiếu</h2>
            <ul className="space-y-4">
                {theaters.map((theater) => (
                    <li
                        key={theater.theater_id}
                        onClick={() => handleSelectTheater(theater)}
                        className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition"
                    >
                        <p className="text-xl font-semibold text-gray-800">{theater.name}</p>
                        <p className="text-gray-600">{theater.location}</p>
                        <p className="text-gray-500 text-sm">Liên hệ: {theater.contact}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Theater;
