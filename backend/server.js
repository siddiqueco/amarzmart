import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import nodemailer from "nodemailer";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./route/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";
import userRoutes from "./route/userRoutes.js";
import orderRoutes from "./route/orderRoutes.js";
import uploadRoutes from "./route/uploadRoutes.js";
import sentMail from "./route/mailRoute.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// email code start

app.post("/", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amarzshop21@gmail.com",
      pass: "siddique12345",
    },
  });
  // const { email } = req.body;
  var mailOptions = {
    from: "amarzshop21@gmail.com",
    to: "rebelreturns11@gmail.com",
    subject: "Account create",
    text: `
            Welcome to amarshop

            your email is rebelreturns11@gmail.com
            pasword: 12345

            Thank you  fro choosing us.
        `,
  };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   });

    res.status(201).json({
      message:"Email sent successfully"
    })
});

// email code end

app.use("/api/email", sentMail);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// paypal routes
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)



const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running ON port ${PORT}`.yellow));
