import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./HomeBlog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const customRes = await axios.get(apiUrl("/api/custom-blogs/published")).catch(() => ({ data: [] }));
        const customBlogs = customRes.data || [];

        const formatted = (customBlogs || []).map(blog => {
          let description = blog.excerpt || blog.metaDescription || "";
          let title = blog.title || "";
          title = title.replace(/([?!:])([a-zA-Z])/g, '$1 $2');
          description = description.replace(/([?!:])([a-zA-Z])/g, '$1 $2');

          return {
            id: blog._id,
            title: title,
            description: description,
            cover_image: blog.featuredImage,
            social_image: blog.ogImage,
            user: { username: blog.author, name: blog.author },
            published_at: blog.publishDate,
            readable_publish_date: new Date(blog.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            reading_time_minutes: Math.ceil((blog.content || '').split(' ').length / 200),
            tag_list: blog.tags || [],
            displayAuthor: blog.author,
            displayDate: blog.publishDate,
            isCustom: true,
            slug: blog.slug,
            updatedAt: blog.updatedAt
          };
        });

        formatted.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.published_at);
          const dateB = new Date(b.updatedAt || b.published_at);
          return dateB - dateA;
        });

        setPosts(formatted);

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
            <article key={post.id} className="blog-card">
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

                <Link to={post.isCustom ? `/custom-blog/${post.slug}` : `/blog/${post.id}`} className="read-more">
                  Read more
                </Link>
              </div>
            </article>
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
