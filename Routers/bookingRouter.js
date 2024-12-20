import express from "express";

import { bookService,findPostDetails } from "../Controllers/bookingController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


router.post("/book", authMiddleware,bookService)
router.post("/postDetails", authMiddleware,findPostDetails)


export default router;