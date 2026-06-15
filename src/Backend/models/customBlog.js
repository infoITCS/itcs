import mongoose from "mongoose";

const customBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, default: '' },
  content: { type: String, default: '' },
  author: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  tags: { type: [String], default: [] },
  featuredImage: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'published', 'rejected'], default: 'pending' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishDate: { type: Date, default: Date.now },
  source: { type: String, enum: ['custom', 'devto'], default: 'custom' },
  sourceId: { type: Number }
}, { timestamps: true });

export default mongoose.model("CustomBlog", customBlogSchema);
