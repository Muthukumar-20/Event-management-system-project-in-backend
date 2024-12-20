import multer from "multer";
import cloudinary from "./Cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Events",
        allowedFormats: ["jpg", "png", "jpeg"],
    },
})

const upload = multer({ storage: storage });

export default upload;
