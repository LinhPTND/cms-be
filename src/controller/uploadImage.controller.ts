// src/controllers/imageController.ts
import { Request, Response } from 'express';
import * as imageService from '../service/upload.service';

async function uploadImage(req: any, res: any): Promise<void> {
  try {
    console.log(req);
    // @ts-ignore
    console.log(req.file);
    // await imageService.saveImage(originalName, buffer, mimetype);

    res.send('Upload thành công!');
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
}

export { uploadImage };
