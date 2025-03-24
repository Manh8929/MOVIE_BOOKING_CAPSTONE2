import React, { useState, useEffect } from "react";
import { BiSend, BiMessageRoundedDots, BiX } from "react-icons/bi";

const ChatBoxComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
    ]);
    const [input, setInput] = useState("");

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

    const generateBotReply = (userMessage) => {
        const lowerCaseMsg = userMessage.toLowerCase();
        if (lowerCaseMsg.includes("xin chào") || lowerCaseMsg.includes("hello")) {
            return "Chào bạn! Tôi có thể giúp gì?";
        } else {
            return "Đừng hỏi tôi, tôi không biết ^^";
        }
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage = { sender: "user", text: input };
            const botReply = { sender: "bot", text: generateBotReply(input) };

            setMessages([...messages, userMessage, botReply]);
            setInput("");
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 
                  animate-bounce"
                >
                    <BiMessageRoundedDots size={20} />
                    Chat
                </button>
            ) : (
                <div className="w-80 bg-white shadow-lg rounded-xl border border-gray-200">
                    <div className="bg-red-600 text-white p-3 flex justify-between items-center rounded-t-xl">
                        <span>MVB Cinema</span>
                        <button onClick={() => setIsOpen(false)}>
                            <BiX size={20} />
                        </button>
                    </div>

                    <div className="p-3 h-60 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg ${msg.sender === "user"
                                        ? "bg-blue-500 text-white self-end ml-auto"
                                        : "bg-gray-200 text-black"
                                    } w-fit max-w-[70%]`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="p-3 flex border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border p-2 rounded-lg focus:outline-none"
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-red-600 text-white p-2 ml-2 rounded-lg"
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
