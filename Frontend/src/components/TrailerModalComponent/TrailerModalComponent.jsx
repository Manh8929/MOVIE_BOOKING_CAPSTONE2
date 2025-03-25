import React from 'react';
import { IoMdClose } from "react-icons/io";

const TrailerModalComponent = ({ videoUrl, onClose }) => {
    if (!videoUrl) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={onClose} 
        >
            <div 
                className="relative w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-2 rounded-[50%] text-xl transition-transform transform hover:-translate-y-1 hover:opacity-70"
                    onClick={onClose}
                >
                    <IoMdClose />
                </button>
                <div className="relative pt-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={videoUrl}
                        title="Trailer"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default TrailerModalComponent;
