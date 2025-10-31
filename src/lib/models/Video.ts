import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  author: IUser['_id'];
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
