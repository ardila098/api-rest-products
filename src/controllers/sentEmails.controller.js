const nodeMailer = require("nodemailer");

export const sentEmails = async (data) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
      user: "ardilajr098@gmail.com",
      pass: "dodnrtogblrgizij",
    },
  });

  let mail = {
    from: "ardilajr098@gmail.com", // Añadir aquí tu dirección de correo
    to: data.email,
    subject: "Verificación de compra Verona", // Corrección aquí
    text: "Verificación de compra Verona", // Cambiar a "text" en lugar de "Text"
    html: `<div><div><span>Name: ${data.description}</span></div></div>`,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
