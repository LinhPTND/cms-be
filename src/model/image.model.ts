// src/models/imageModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
  name: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

const imageSchema = new Schema<IImage>({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;
