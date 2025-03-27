import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqData = [
  {
    category: "BẮP NƯỚC",
    questions: [
      { question: "Có bao nhiêu loại kích cỡ bắp và nước?", answer: "Tại MVB Cinema bạn có thể lựa chọn bắp và nước với các kích cỡ sau: \n -3 kích cỡ nước: vừa 16oz, lớn 22oz & siêu lớn  32oz ,\n -2 kích cỡ bắp: vừa 32oz và lớn 44oz" },
      { question: "Có những loại combo bắp, nước nào?", answer: "Có combo nhỏ, vừa, lớn và combo gia đình." },
      { question: "Có những vị nước và bắp gì tại MVB Cinema?", answer: "Có bắp caramel, bắp phô mai và nhiều loại nước: có 4 vị Coca, Fanta, Sprite & Zero. \nNgoài ra bạn có thể mua các loại nước khác như Dasani, Nutri Boost, Teppi, Coca Light. \nBắp: có 4 vị bắp Mặn, Ngọt, Phô mai & Caramel." },
      { question: "Làm sao để nâng cấp kích thước bắp và nước?", answer: "Khi nâng cấp bắp, nước lên kích thước lớn hơn trong các gói combo, \nbạn chỉ phải trả thêm một khoản phí rất nhỏ: thêm 3000đ để nâng cấp nước và 5000đ để nâng cấp bắp." },
      { question: "Làm sao để đổi vị bắp?", answer: "Tại MVB Cinema, bạn chỉ cần thêm 15.000đ để đổi sang vị phô mai & caramel." }
    ]
  },
  {
    category: "PHIM",
    questions: [
      { question: "Có bao nhiêu phân loại phim và ký hiệu?", answer: "Căn cứ Thông tư số 12/2015/TT-BVHTTDL của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch có hiệu lực thi hành từ ngày 01/01/2017, Tiêu chí phân loại phim theo lứa tuổi được quy định như sau: \n - P: Phim được phép phổ biến rộng rãi đến mọi đối tượng \n - C13: Phim cấm phổ biến đến khán giả dưới 13 tuổi \n - C16: Phim cấm phổ biến đến khán giả dưới 16 tuổi \n - C18: Phim cấm phổ biến đến khán giả dưới 18 tuổi.  \n Khách hàng vui lòng chứng thực được độ tuổi phù hợp với phim được phân loại như trên. MVB Cinema có quyền từ chối việc bán vé hoặc vào phòng chiếu nếu khách hàng không tuân thủ đúng theo quy định." }
    ]
  },
  {
    category: "QUY ĐỊNH",
    questions: [
      { question: "Đồ ăn, thức uống từ bên ngoài có được phép mang vào MVB Cinema không?", answer: "Không, bạn không được mang thức ăn từ bên ngoài vào rạp." }
    ]
  },
  {
    category: "THẺ THÀNH VIÊN",
    questions: [
      { question: "Có những hạng mức thẻ và quyền lợi nào tại MVB Cinema?", answer: "Có các hạng thẻ như Silver, Gold và Platinum với nhiều ưu đãi khác nhau." },
      { question: "Làm cách nào để đăng kí Thẻ thành viên MVB Cinema?", answer: "Bạn có thể đăng ký trực tuyến hoặc tại quầy vé." },
      { question: "Thời hạn sử dụng của Thẻ thành viên MVB Cinema?", answer: "Thẻ có giá trị trong vòng một năm kể từ ngày đăng ký." },
      { question: "Tôi phải làm gì khi bị mất thẻ?", answer: "Bạn cần báo ngay cho quầy dịch vụ khách hàng để cấp lại thẻ mới." },
      { question: "Tôi phải làm gì khi đủ điều kiện nâng hạng thẻ?", answer: "Bạn sẽ được nâng hạng tự động khi đạt đủ điều kiện tích lũy điểm." }
    ]
  },
  {
    category: "TICKET VOUCHER",
    questions: [
      { question: "Làm cách nào để sử dụng Ticket voucher tại MVB Cinema?", answer: "Mang Ticket Voucher đến trực tiếp tại quầy Ticket Box để đổi vé tương ứng với quy định của từng loại." },
      { question: "Ticket voucher là gì?", answer: "Ticket voucher là phiếu giảm giá dùng để đổi vé xem phim." }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-white text-black p-6">
      {/* Hiển thị tiêu đề rõ ràng hơn */}
      <h1 className="mt-40 text-4xl font-bold text-red-600 mb-8 text-center uppercase tracking-wide">
        Câu Hỏi Thường Gặp
      </h1>

      <div className="max-w-4xl mx-auto">
        {faqData.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-6">
            <h2 className="text-2xl font-semibold text-red-500 mb-4 ">{section.category}</h2>
            {section.questions.map((item, idx) => {
              const isOpen = openIndex === `${sectionIdx}-${idx}`;
              return (
                <div
                  key={idx}
                  className="mb-3 border border-red-600 rounded-lg shadow-md transition-all duration-300 whitespace-pre-line"
                >
                  <button
                    onClick={() => toggleFAQ(`${sectionIdx}-${idx}`)}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 text-black transition-all duration-200"
                  >
                    <span className="text-lg font-medium">{item.question}</span>
                    <FiChevronDown
                      className={`transition-transform text-red-600 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-gray-50 text-gray-800"
                  >
                    {isOpen && <p className="text-gray-700">{item.answer}</p>}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
