import express from "express";
import mongoose from "mongoose";
import BlogStatus from "../models/blog.js";
import CustomBlog from "../models/customBlog.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ==================== CUSTOM BLOG ROUTES ====================

// POST / - Create a new custom blog (always saved as pending)
router.post('/', async (req, res) => {
  try {
    let { title, slug, content, author, excerpt, tags, featuredImage, metaTitle, metaDescription, metaKeywords } = req.body;
    
    let ownerId = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ownerId = decoded.id;
      } catch (err) {}
    }

    // Make slug unique by appending a counter if duplicate exists
    if (slug) {
      let existing = await CustomBlog.findOne({ slug });
      if (existing) {
        let counter = 1;
        while (await CustomBlog.findOne({ slug: `${slug}-${counter}` })) {
          counter++;
        }
        slug = `${slug}-${counter}`;
      }
    }

    const blog = new CustomBlog({
      title, slug, content, author, excerpt,
      tags: Array.isArray(tags) ? tags : [],
      featuredImage, metaTitle, metaDescription, metaKeywords,
      status: 'pending',
      ownerId,
      publishDate: new Date()
    });
    const saved = await blog.save();
    res.status(201).json({ message: "Blog submitted for approval!", data: saved });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: "Failed to save blog", error: error.message });
  }
});

// GET /all - Get all custom blogs (admin management)
router.get('/all', async (req, res) => {
  try {
    let query = {};
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // If user is author and NOT admin, show only their own blogs
      if (user.role === 'author' && !user.isAdmin) {
        query = { ownerId: user._id };
      }
      // If admin, query remains {} so they see all blogs
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const blogs = await CustomBlog.find(query).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching blogs", error: error.message });
  }
});

// GET /published - Get only published custom blogs (public website)
router.get('/published', async (req, res) => {
  try {
    const blogs = await CustomBlog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching blogs", error: error.message });
  }
});

// GET /slug/:slug - Get a single custom blog by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await CustomBlog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /:id - Delete a custom blog
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const deleted = await CustomBlog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// ==================== DEV.TO BLOG STATUS ROUTES ====================

// GET /statuses - Get all Dev.to blog statuses
router.get("/statuses", async (req, res) => {
  try {
    const statuses = await BlogStatus.find({});
    res.json(statuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
});

// Get approved blog IDs (for Dev.to blogs)
router.get("/approved-ids", async (req, res) => {
  try {
    const approvedBlogs = await BlogStatus.find({ status: "approved" }).select(
      "devId customAuthor customDate createdAt"
    );
    res.json(approvedBlogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch approved IDs" });
  }
});

// PATCH /:id/status - Update status (handles BOTH Dev.to numeric IDs and custom blog ObjectIds)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, customAuthor, customDate } = req.body;
    const idParam = req.params.id;

    // Check if this is a numeric Dev.to ID
    const numId = Number(idParam);
    if (!isNaN(numId)) {
      // --- Dev.to blog status update ---
      const updateFields = {};
      if (status !== undefined) {
        if (!["approved", "rejected"].includes(status)) {
          return res.status(400).json({ error: "Invalid status" });
        }
        updateFields.status = status;
      }
      if (customAuthor !== undefined) updateFields.customAuthor = customAuthor;
      if (customDate !== undefined) updateFields.customDate = customDate;

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
      }

      const updated = await BlogStatus.findOneAndUpdate(
        { devId: numId },
        { $set: updateFields },
        { upsert: true, new: true }
      );
      return res.json(updated);
    }

    // --- Custom blog status update ---
    if (!mongoose.Types.ObjectId.isValid(idParam)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const allowedStatuses = ['pending', 'published', 'rejected'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await CustomBlog.findByIdAndUpdate(
      idParam,
      { $set: { status } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Blog not found" });
    res.json(updated);

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
});

export default router;
