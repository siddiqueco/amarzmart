import nodemailer from "nodemailer";

const mail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amarzshop21@gmail.com",
      pass: "siddique12345",
    },
  });

  var mailOptions = {
    from: "andutundu33@gmail.com",
    to: "chutmadar411@gmail.com",
    subject: "Account Create",
    text: "Hello from Amarshop",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      if(error){
        res.status(404).json({error})
      }
    } else {
      res.status(201).json({message:'Email sent'})
    }
  });
};

export { mail };
