// src/services/imageService.ts
import Image from "../model/image.model";

async function saveImage(name: string, buffer: Buffer, contentType: string): Promise<void> {
  const newImage = new Image({
    name: name,
    image: {
      data: buffer,
      contentType: contentType,
    },
  });

  await newImage.save();
}

export { saveImage };
