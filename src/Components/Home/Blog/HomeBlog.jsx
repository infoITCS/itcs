import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { getBlogPostUrl, getAuthorUrl } from "../../../utils/blogUrls";
import { formatPublishedBlog, sortBlogsByDate } from "../../../utils/blogFormat";
import "./HomeBlog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // Only 3 cards are rendered below, so don't pull the whole catalogue
        // (100+ posts with inline cover images) over the network.
        const customRes = await axios
          .get(apiUrl("/api/custom-blogs/published?limit=3"))
          .catch(() => ({ data: [] }));
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
          posts.slice(0, 3).map((post) => (
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

                <div className="blog-card__meta">
                  <div className="meta-author-wrap">
                    <span className="meta-avatar">
                      {String(post.displayAuthor || "A").trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A"}
                    </span>
                    <span
                      className="meta-author"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(getAuthorUrl(post.displayAuthor));
                      }}
                    >
                      {post.displayAuthor}
                    </span>
                  </div>

                  <div className="meta-details">
                    <time>{post.readable_publish_date}</time>
                    <span className="meta-separator">•</span>
                    <span>{post.reading_time_minutes} min read</span>
                  </div>
                </div>

                <p className="description">{post.description}</p>

                <span className="read-more">Read more</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-posts">{loading ? "Loading..." : "No blogs found."}</p>
        )}
      </div>

      <Link to="/blog" className="blog-view-all">
        Explore all blogs
      </Link>
    </div>
  );
}
