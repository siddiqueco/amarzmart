import express from "express";
import { mail } from "../controllers/sendMail.js";
const router = express.Router();


router.route("/sent").post(mail)



export default router;
