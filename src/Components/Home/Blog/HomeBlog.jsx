import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { getBlogPostUrl } from "../../../utils/blogUrls";
import { formatPublishedBlog, sortBlogsByDate } from "../../../utils/blogFormat";
import "./HomeBlog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const customRes = await axios.get(apiUrl("/api/custom-blogs/published")).catch(() => ({ data: [] }));
        setPosts(sortBlogsByDate((customRes.data || []).map(formatPublishedBlog)));

      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home-blog-section">
      <h2 className="blog-public-title">Our Blogs</h2>

      {loading && <p className="loading-text">Loading approved blogs...</p>}

      <div className="blog-grid">
        {posts.length > 0 ? (
          posts.slice(0, 3).map(post => (
            <Link key={post.id} to={getBlogPostUrl(post)} className="blog-card">
              {(post.cover_image || post.social_image) && (
                <div className="blog-cover-wrap">
                  <img
                    src={post.cover_image || post.social_image}
                    alt={post.title}
                    className="blog-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="blog-card__content">
                <h3>{post.title}</h3>

                <p className="meta">
                  {post.displayAuthor} • {post.readable_publish_date} • {post.reading_time_minutes} min read
                </p>

                <p className="description">{post.description}</p>

                <span className="read-more">Read more</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-posts">
            {loading ? "Loading..." : "No blogs found."}
          </p>
        )}
      </div>
    </div>
  );
}
