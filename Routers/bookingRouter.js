import express from "express";

import { findPostDetails, payment } from "../Controllers/bookingController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


router.post("/book", authMiddleware,payment)
router.post("/postDetails", authMiddleware,findPostDetails)


export default router;