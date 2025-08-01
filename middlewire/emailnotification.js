require('dotenv').config();
const nodemailer = require("nodemailer");

// Setup transporter with environment variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ 1. Signup Email
const sendSignupEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Account Successfully Created`,
      text: `Hello ${email},\n\nYour account has been successfully created on the Todo App.`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Signup email sent:", info.response);
  } catch (err) {
    console.error("Error in sendSignupEmail:", err);
  }
};

// ✅ 2. Password Reset Email
const sendResetPassword = async (email, resetToken) => {
  try {
    const resetUrl = `https://frontend-rouge-iota-97.vercel.app/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because a request was made to reset the password for your Todo App account.\n\n
Please click the following link to reset your password (valid for 1 hour):\n\n
${resetUrl}\n\n
If you did not request this, please ignore this email.`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (err) {
    console.error("Error in sendResetPassword:", err);
  }
};

// ✅ 3. Logged In Notification
const sendLoggedInNotification = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Login Successful`,
      text: `You have successfully logged into the Todo App.`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Login notification sent:", info.response);
  } catch (err) {
    console.error("Error in sendLoggedInNotification:", err);
  }
};

// ✅ 4. New Task Created Notification
const sendNewTaskcreatedmsg = async (email, task) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Task Added`,
      text: `A new task "${task}" has been added to your Todo App.\n\nGood luck!`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("New task creation email sent:", info.response);
  } catch (err) {
    console.error("Error in sendNewTaskcreatedmsg:", err);
  }
};

// ✅ 5. Task Completion Notification
const sendNewTaskcompletedmsg = async (email, task) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Congratulations on Completing "${task}"`,
      text: `Great job on completing your task "${task}"!\n\nWe'll notify you when new tasks are available.`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Task completion email sent:", info.response);
  } catch (err) {
    console.error("Error in sendNewTaskcompletedmsg:", err);
  }
};

// Export all mailer functions
module.exports = {
  sendSignupEmail,
  sendResetPassword,
  sendLoggedInNotification,
  sendNewTaskcreatedmsg,
  sendNewTaskcompletedmsg
};
