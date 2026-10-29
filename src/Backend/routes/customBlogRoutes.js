import express from 'express';
import { exec } from 'child_process';
const router = express.Router();

// GET: /api/custom-blogs/published
// This route fixes the 404 error for HomeBlog.jsx and Blog.jsx on the frontend
router.get('/published', async (req, res) => {
    try {
        // Write your database query here (e.g., Blog.find({ status: 'published' }))
        // We return an empty array; Axios does not treat a 200 response with an empty array as an error
        const blogs = []; // Yahan database logic add karein baad mein
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching blogs", error: error.message });
    }
});

// POST: /api/custom-blogs
// This route handles data submitted from AddCustomBlog.jsx
router.post('/', async (req, res) => {
    try {
        const blogData = req.body;
        console.log("Saving Blog:", blogData);
        
        // Database save logic will be added here
        res.status(201).json({ message: "Blog published successfully!", data: blogData });
        // Regenerate sitemap after new blog creation
        exec('node scripts/generate-sitemap.js', (err, stdout, stderr) => {
          if (err) console.error('Sitemap regeneration failed:', err);
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to save blog", error: error.message });
    }
});

export default router;