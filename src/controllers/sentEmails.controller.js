import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  console.log(data)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Verificación de compra Verona",
    text: data.description,
    html: `<div><h1>Verificación de compra Verona</h1><p>${data.description}</p></div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};