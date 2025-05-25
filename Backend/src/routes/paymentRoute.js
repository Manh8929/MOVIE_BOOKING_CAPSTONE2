import express from "express";
import { createPaymentLink } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-link", createPaymentLink);

export default router;
