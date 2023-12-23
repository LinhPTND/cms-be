import express from 'express';
import {uploadImage} from "../controller/uploadImage.controller";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/api/upload', upload.single('image'), uploadImage);

export default router;