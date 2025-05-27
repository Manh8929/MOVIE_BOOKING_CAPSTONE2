// import React, { useState, useEffect } from "react";
// import { BiSend, BiMessageRoundedDots, BiX } from "react-icons/bi";
// import { sendMessageToBot } from "../../services/chatbotService";

// const ChatBoxComponent = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
//     ]);
//     const [input, setInput] = useState("");

//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.keyCode === 27) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("keydown", handleKeyDown);
//         return () => {
//             document.removeEventListener("keydown", handleKeyDown);
//         };
//     }, []);

//     const handleSendMessage = async () => {
//         if (input.trim()) {
//             const userMessage = { sender: "user", text: input };
//             setMessages((prev) => [...prev, userMessage]);
//             setInput("");

//             try {
//                 const botReplyText = await sendMessageToBot(input);
//                 const botReply = { sender: "bot", text: botReplyText };
//                 setMessages((prev) => [...prev, botReply]);
//             } catch (error) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { sender: "bot", text: "Có lỗi xảy ra khi gọi API." },
//                 ]);
//             }
//         }
//     };

//     return (
//         <div className="fixed bottom-5 right-5 z-50">
//             {!isOpen ? (
//                 <button
//                     onClick={() => setIsOpen(true)}
//                     className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
//                 >
//                     <BiMessageRoundedDots size={20} />
//                     Chat
//                 </button>
//             ) : (
//                 <div className="w-80 bg-white shadow-lg rounded-xl border border-gray-200">
//                     <div className="bg-red-600 text-white p-3 flex justify-between items-center rounded-t-xl">
//                         <span>MVB Cinema</span>
//                         <button onClick={() => setIsOpen(false)}>
//                             <BiX size={20} />
//                         </button>
//                     </div>

//                     <div className="p-3 h-60 overflow-y-auto space-y-2">
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`p-2 rounded-lg ${msg.sender === "user"
//                                     ? "bg-blue-500 text-white self-end ml-auto"
//                                     : "bg-gray-200 text-black"
//                                     } w-fit max-w-[70%]`}
//                             >
//                                 {msg.text}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="p-3 flex border-t">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Nhập tin nhắn..."
//                             className="flex-1 border p-2 rounded-lg focus:outline-none"
//                             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             className="bg-red-600 text-white p-2 ml-2 rounded-lg"
//                         >
//                             <BiSend size={20} />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatBoxComponent;

// import React, { useState, useEffect } from "react";
// import { BiSend, BiMessageRoundedDots, BiX } from "react-icons/bi";
// import { sendMessageToBot } from "../../services/chatbotService";

// const ChatBoxComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
//     {
//       sender: "bot",
//       text: `
// 👋 Xin chào! Tôi là trợ lý ảo MVB. Tôi có thể giúp bạn với các chức năng sau:<br><br>
// 1️⃣ Lịch chiếu hôm nay<br>
// 2️⃣ Gợi ý theo thể loại, tâm trạng <br>
// 3️⃣ Lịch chiếu theo ngày<br>
// 4️⃣ Phim hot hôm nay<br>
// 5️⃣ Hỗ trợ / liên hệ<br><br>
// 💬 Bạn muốn hỏi gì nào?
// `
//     },

//   ]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.keyCode === 27) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const handleSendMessage = async () => {
//     if (input.trim()) {
//       const userMessage = { sender: "user", text: input };
//       setMessages((prev) => [...prev, userMessage]);
//       setInput("");

//       try {
//         const botReplyText = await sendMessageToBot(input);
//         const botReply = { sender: "bot", text: botReplyText };
//         setMessages((prev) => [...prev, botReply]);
//       } catch (error) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: "Có lỗi xảy ra khi gọi API." },
//         ]);
//       }
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       {!isOpen ? (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
//         >
//           <BiMessageRoundedDots size={20} />
//           Chat
//         </button>
//       ) : (
//         <div className="w-80 bg-white shadow-lg rounded-xl border border-gray-200">
//           <div className="bg-red-600 text-white p-3 flex justify-between items-center rounded-t-xl">
//             <span>MVB Cinema</span>
//             <button onClick={() => setIsOpen(false)}>
//               <BiX size={20} />
//             </button>
//           </div>

//           <div className="p-3 h-60 overflow-y-auto space-y-2">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg ${msg.sender === "user"
//                   ? "bg-blue-500 text-white self-end ml-auto"
//                   : "bg-gray-200 text-black"
//                   } w-fit max-w-[70%]`}
//               >
//                 {msg.sender === "bot" ? (
//                   <span dangerouslySetInnerHTML={{ __html: msg.text }} />
//                 ) : (
//                   msg.text
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="p-3 flex border-t">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Nhập tin nhắn..."
//               className="flex-1 border p-2 rounded-lg focus:outline-none"
//               onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-red-600 text-white p-2 ml-2 rounded-lg"
//             >
//               <BiSend size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBoxComponent;



import React, { useState, useEffect, useRef } from "react";
import { BiSend, BiMessageRoundedDots, BiX } from "react-icons/bi";
import { sendMessageToBot } from "../../services/chatbotService";

const ChatBoxComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `
👋 Xin chào! Tôi là trợ lý ảo MVB.<br><br>
💬 Bạn muốn hỏi gì nào?
`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customText = null) => {
    const content = customText || input.trim();
    if (!content) return;

    const userMessage = { sender: "user", text: content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botReplyText = await sendMessageToBot(content);
      const botReply = { sender: "bot", text: botReplyText };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Có lỗi xảy ra khi gọi API." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Gợi ý nút nhanh
  const renderSuggestionButtons = () => {
    const suggestions = [
      { label: "🎟️ Lịch chiếu hôm nay", payload: "lịch chiếu hôm nay" },
      { label: "🎭 Gợi ý theo thể loại/tâm trạng", payload: "gợi ý phim" },
      { label: "📅 Lịch chiếu theo ngày", payload: "ngày mai có phim gì" },
      { label: "🔥 Phim hot hôm nay", payload: "phim hot hôm nay" },
      { label: "💺 Giá ghế", payload: "giá ghế" },
      { label: "📝 Hướng dẫn đặt vé", payload: "cách đặt vé" },
      { label: "📞 Hỗ trợ / liên hệ", payload: "tôi cần hỗ trợ" },
    ];

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setMessages((prev) => [...prev, { sender: "user", text: item.payload }]);
              handleSendMessage(item.payload);
            }}
            className="text-sm bg-gray-100 hover:bg-blue-100 border border-gray-300 px-3 py-1 rounded-full"
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
        >
          <BiMessageRoundedDots size={20} />
          Chat
        </button>
      ) : (
        <div className="w-80 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col h-[500px]">
          <div className="bg-red-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <span>MVB Cinema</span>
            <button onClick={() => setIsOpen(false)}>
              <BiX size={20} />
            </button>
          </div>

          <div className="p-3 flex-1 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="/bot-avatar.png"
                    alt="Bot"
                    className="w-6 h-6 rounded-full"
                  />
                )}

                <div
                  className={`p-2 rounded-lg text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } max-w-[70%]`}
                >
                  {msg.sender === "bot" ? (
                    <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text
                  )}
                </div>

                {msg.sender === "user" && (
                  <img
                    src="/user-avatar.png"
                    alt="You"
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
            ))}

            {/* ⏳ Loading */}
            {isLoading && (
              <div className="text-sm text-gray-400 italic">Đang trả lời...</div>
            )}

            {/* 📌 Gợi ý chức năng chỉ sau lời chào */}
            {messages.length === 1 && renderSuggestionButtons()}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 flex border-t gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border p-2 rounded-lg focus:outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-red-600 text-white p-2 rounded-lg"
            >
              <BiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoxComponent;
