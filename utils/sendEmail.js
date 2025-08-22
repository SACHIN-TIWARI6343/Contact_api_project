import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file


export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,       // from .env
        pass: process.env.EMAIL_PASS,  // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject, 
      text,
    });

    console.log(" Email sent successfully");
  } catch (error) {
    console.error(" Email not sent:", error);
  }
};
