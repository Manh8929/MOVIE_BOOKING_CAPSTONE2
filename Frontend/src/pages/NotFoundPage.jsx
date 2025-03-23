import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center relative overflow-hidden p-4">
      {/* Floating Pills */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-8 h-16 rounded-full rotate-45 ${
            i % 2 === 0 ? "bg-teal-300/20" : "bg-blue-500/20"
          } animate-floating`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${8 + i}s`,
            animationDelay: `${i * 0.5}s`,
          }}
        ></div>
      ))}

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Main Pills */}
        <div className="relative h-48 mb-10">
          <div
            className={`absolute left-1/4 -translate-x-1/2 transition-transform duration-1000 ${
              bounce ? "translate-y-2" : "-translate-y-2"
            }`}
          >
            <div className="w-24 h-48 bg-blue-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-white/30 h-1/2 rounded-t-full"></div>
            </div>
          </div>

          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-transform duration-1000 ${
              !bounce ? "translate-y-2" : "-translate-y-2"
            } delay-100`}
          >
            <div className="w-24 h-48 bg-teal-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-white/30 h-1/2 rounded-t-full"></div>
            </div>
          </div>

          <div
            className={`absolute left-3/4 -translate-x-1/2 transition-transform duration-1000 ${
              bounce ? "translate-y-2" : "-translate-y-2"
            } delay-200`}
          >
            <div className="w-24 h-48 bg-blue-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-white/30 h-1/2 rounded-t-full"></div>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Oops!</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-8">
          The page you're looking for seems to have been misplaced. Don't worry,
          our medical team is on the case!
        </p>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition"
        >
          <FaArrowLeft size={20} className="mr-3" />
          Go Back
        </button>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes floating {
          0% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
          100% { transform: translateY(0) rotate(45deg); }
        }
        .animate-floating {
          animation: floating linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
