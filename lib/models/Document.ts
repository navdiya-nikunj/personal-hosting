import mongoose, { Schema } from 'mongoose';

export interface IDocument {
  title: string;
  slug: string;
  content: string;
  created: Date;
}

const DocumentSchema = new Schema<IDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model is already defined to prevent OverwriteModelError
export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
