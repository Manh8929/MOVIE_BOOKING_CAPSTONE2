const express = require("express");
const router = express.Router();
const { analyzeUserMessage } = require("../services/chatbotService");

router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Thiếu nội dung" });

    const result = await analyzeUserMessage(message);  // <--- sửa dòng này
    res.json(result);
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Xử lý thất bại" });
  }
});

module.exports = router;
