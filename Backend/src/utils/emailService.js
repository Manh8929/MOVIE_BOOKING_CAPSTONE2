import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {User} from "../models"
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (userEmail, resetToken) => {
  const user = await User.findOne({ where: { email: userEmail } });
  if (!user) throw { message: "Email không tồn tại", statusCode: 404 };

  const resetLink = `${process.env.CLIENT_URL}/reset-pass?token=${resetToken}`;

  const templatePath = path.join(process.cwd(), "src/views", "resetPasswordEmail.ejs");

  const html = await ejs.renderFile(templatePath, {
    full_name: user.full_name || "bạn",
    resetLink,
  });

  const mailOptions = {
    from: `"Cinema App" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Yêu cầu đặt lại mật khẩu",
    html,
  };

  await transporter.sendMail(mailOptions);

  return { message: "Reset token đã được gửi đến email của bạn" };
};


export const sendWelcomeEmail = async (email, fullName) => {
  const templatePath = path.join(__dirname, "../views/welcomeEmail.ejs");
  const htmlContent = await ejs.renderFile(templatePath, { fullName });

  const mailOptions = {
    from: `"Cinema App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Chào mừng bạn đến với Cinema App 🎬",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};