import nodemailer from 'nodemailer';

export const sendMail = async ({ to, title, message }) => {
  // Setup Nodemailer transport, use environment variables for credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject: title,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
