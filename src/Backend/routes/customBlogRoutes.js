import express from 'express';
const router = express.Router();

// GET: /api/custom-blogs/published
// Yeh route frontend ke HomeBlog.jsx aur Blog.jsx ke 404 error ko fix karega
router.get('/published', async (req, res) => {
    try {
        // Yahan aap Database query likhenge (e.g., Blog.find({ status: 'published' }))
        // Hum empty array bhej rahe hain magar empty array response status 200 ke saath Axios error nahi deta
        const blogs = []; // Yahan database logic add karein baad mein
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching blogs", error: error.message });
    }
});

// POST: /api/custom-blogs
// Yeh route AddCustomBlog.jsx se aane wale data ko handle karega
router.post('/', async (req, res) => {
    try {
        const blogData = req.body;
        console.log("Saving Blog:", blogData);
        
        // Yahan database mein save karne ki logic aayegi
        res.status(201).json({ message: "Blog published successfully!", data: blogData });
    } catch (error) {
        res.status(500).json({ message: "Failed to save blog", error: error.message });
    }
});

export default router;