import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/api";
import "./Blog.scss";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const customRes = await axios.get(apiUrl("/api/custom-blogs/published")).catch(() => ({ data: [] }));
        const customBlogs = customRes.data || [];

        const formatted = (customBlogs || []).map(blog => {
          let description = blog.excerpt || blog.metaDescription || "";
          description = description.replace(/([?!:])([a-zA-Z])/g, '$1 $2');

          return {
            id: blog._id,
            title: blog.title,
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

        const allTags = formatted.flatMap(blog => blog.tag_list || []);
        const uniqueTags = Array.from(new Set(allTags)).sort();
        setTags(["all", ...uniqueTags]);

      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = activeTag === "all"
    ? posts
    : posts.filter(post => post.tag_list?.includes(activeTag));

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to format date like "September 23, 2025"
  const formatDate = (dateStr, isCustom = false) => {
    if (!dateStr) return '';
    // If it's already a formatted string (for Dev.to), return as is
    if (typeof dateStr === 'string' && !isCustom && isNaN(Date.parse(dateStr))) {
      return dateStr;
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="blog-card skeleton-card">
      <div className="blog-cover-wrap skeleton-shimmer" style={{height: '200px'}}></div>
      <div className="blog-card__content">
        <div className="skeleton-shimmer" style={{height: '24px', width: '85%', marginBottom: '12px', borderRadius: '6px'}}></div>
        <div className="skeleton-shimmer" style={{height: '14px', width: '60%', marginBottom: '16px', borderRadius: '4px'}}></div>
        <div className="skeleton-shimmer" style={{height: '14px', width: '100%', marginBottom: '8px', borderRadius: '4px'}}></div>
        <div className="skeleton-shimmer" style={{height: '14px', width: '90%', marginBottom: '8px', borderRadius: '4px'}}></div>
        <div className="skeleton-shimmer" style={{height: '14px', width: '40%', borderRadius: '4px'}}></div>
      </div>
    </div>
  );

  return (
    <div className="blog-public-container">
      <h2 className="blog-public-title">Our Blogs</h2>

      {loading ? (
        <div className="blog-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {currentPosts.length > 0 ? (
              currentPosts.map(post => (
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
                      {post.displayAuthor} • {formatDate(post.displayDate, post.isCustom)} • {post.reading_time_minutes} min read
                    </p>

                    <p className="description">{post.description}</p>

                    <div className="tags-small">
                      {post.tag_list?.slice(0, 3).map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>

                    <Link to={post.isCustom ? `/custom-blog/${post.slug}` : `/blog/${post.id}`} className="read-more">
                      Read more
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p className="no-posts">No blogs found for this tag.</p>
            )}
          </div>

          {/* Modern Pagination UI */}
          {totalPages > 1 && (
            <div className="modern-pagination">
              <button className="pagination-arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                &larr; Prev
              </button>

              <div className="page-numbers">
                {(() => {
                  const pages = [];
                  const maxVisible = 3;
                  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                  let end = Math.min(totalPages, start + maxVisible - 1);
                  if (end - start + 1 < maxVisible) {
                    start = Math.max(1, end - maxVisible + 1);
                  }

                  if (start > 1) {
                    pages.push(<button key={1} className="page-number" onClick={() => paginate(1)}>1</button>);
                    if (start > 2) pages.push(<span key="start-ellipsis" className="page-ellipsis">&hellip;</span>);
                  }

                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => paginate(i)}
                      >{i}</button>
                    );
                  }

                  if (end < totalPages) {
                    if (end < totalPages - 1) pages.push(<span key="end-ellipsis" className="page-ellipsis">&hellip;</span>);
                    pages.push(<button key={totalPages} className="page-number" onClick={() => paginate(totalPages)}>{totalPages}</button>);
                  }

                  return pages;
                })()}
              </div>

              <button className="pagination-arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
