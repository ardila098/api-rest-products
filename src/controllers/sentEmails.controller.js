const nodeMailer = require("nodemailer");

export const sentEmails = async (req, res) => {
  console.log(req);

  console.log("correo full");

  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
      user: "ardilajr098@gmail.com",
      pass: "dodnrtogblrgizij",
      // pass: "eodkxkcgxsailwki",
    },
  });

  let mail = {
    from: "",
    to: req.email,
    subjet: "client verona",
    Text: "Verificacion de compra verona",
    html: `
    <div>
         <div>  <span>   name :  ${req.description}</span>    </div>
            
              </div>
              `,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log("error sending email", error);
      res.status(500).json({ error: error.message });
    } else {
      console.log("error sent");
      res.status(200).json({
        message: "email send",
      });
    }
  });
};
