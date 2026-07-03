import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { getAuthHeaders } from "../../../config/authHeaders";
import "./BlogApproval.scss";

export default function BlogApproval() {
  const [customBlogs, setCustomBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [approvingIds, setApprovingIds] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `approval-toast approval-toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; padding: 12px 24px;
      border-radius: 8px; color: #fff; font-weight: 500; z-index: 9999;
      animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setFetchError("No authentication token found. Please log in again.");
        return;
      }
      const res = await axios.get(apiUrl("/api/custom-blogs/all"), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const blogs = (res.data || [])
        .filter(blog => blog.status !== 'rejected')
        .map(blog => {
          let description = blog.excerpt || blog.metaDescription || "";
          if (typeof description === 'string') {
            description = description.replace(/([?!:])([a-zA-Z])/g, '$1 $2');
          }
          return {
            ...blog,
            id: blog._id,
            description,
            cover_image: blog.featuredImage,
            user: { username: blog.author },
            published_at: blog.publishDate,
            readable_publish_date: new Date(blog.publishDate).toLocaleDateString(),
            tag_list: blog.tags || [],
            displayAuthor: blog.author,
            displayDate: new Date(blog.publishDate).toLocaleDateString()
          };
        });
      blogs.sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));
      setCustomBlogs(blogs);
    } catch (err) {
      console.error("Fetch blogs error:", err);
      const status = err?.response?.status;
      if (status === 401) {
        setFetchError("Your session has expired. Please log out and log in again.");
      } else {
        setFetchError(`Failed to load blogs (${status || 'network error'}). Check that the backend server is running.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCustomBlogStatus = async (id, status) => {
    setApprovingIds(prev => ({ ...prev, [id]: true }));
    try {
      const res = await axios.patch(apiUrl(`/api/custom-blogs/${id}/status`), { status }, {
        headers: getAuthHeaders(),
      });
      console.log('Custom blog status updated:', res.data);
      if (status === 'rejected') {
        setCustomBlogs(prev => prev.filter(blog => blog._id !== id && blog.id !== id));
      } else {
        setCustomBlogs(prev => prev.map(blog =>
          (blog._id === id || blog.id === id) ? { ...blog, status } : blog
        ));
      }
      showToast(status === "published" ? "Blog published!" : "Blog rejected");
    } catch (err) {
      console.error("Failed to update custom blog status:", err?.response?.data || err?.message || err);
      showToast(err?.response?.data?.error || "Failed to update status.", "error");
    } finally {
      setApprovingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const allBlogs = customBlogs;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-approval-container">
      <h2>Blogs for Approval</h2>

      {loading && <p className="loading-text">Loading blogs...</p>}

      {fetchError && (
        <div className="error-banner">
          <p>{fetchError}</p>
          <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>
            Go to Login
          </button>
        </div>
      )}

      <div className="blog-grid">
        {currentBlogs.map(blog => (
          <article key={blog._id} className="blog-card">
            {blog.featuredImage && (
              <div className="blog-cover-wrap">
                <img src={blog.featuredImage} alt={blog.title} className="blog-cover" loading="lazy" />
              </div>
            )}

            <div className="blog-card__content">
              <h3>{blog.title}</h3>
              <p className="meta">
                Author: {blog.author || "Unknown"} •{" "}
                {blog.publishDate
                  ? new Date(blog.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : ""} • {Math.ceil((blog.content || '').split(' ').length / 200)} min read
              </p>
              <p className="description">{blog.description}</p>
              <div className="tags-small">
                {blog.tags?.slice(0, 3).map(tag => <span key={tag}>#{tag}</span>)}
              </div>

              <Link to={`/admin/custom-blog/${blog._id}`} className="read-more">Read More</Link>
            </div>

            <div className="blog-card__footer">
              <div className="approval-buttons">
                <button
                  className="approve-btn"
                  disabled={blog.status === "published" || approvingIds[blog._id]}
                  onClick={() => updateCustomBlogStatus(blog._id, "published")}
                >
                  {approvingIds[blog._id] ? "..." : blog.status === 'published' ? 'Published' : 'Approve & Publish'}
                </button>
                <button
                  className="reject-btn"
                  disabled={approvingIds[blog._id]}
                  onClick={() => updateCustomBlogStatus(blog._id, "rejected")}
                >
                  {approvingIds[blog._id] ? "..." : "Reject"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && allBlogs.length === 0 && <p className="no-blogs">No blogs pending approval.</p>}

      {totalPages > 1 && (
        <div className="modern-pagination">
          <button className="pagination-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
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
                pages.push(<button key={1} className="page-btn" onClick={() => paginate(1)}>1</button>);
                if (start > 2) pages.push(<span key="start-ellipsis" className="page-ellipsis">&hellip;</span>);
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    className={`page-btn ${currentPage === i ? "active" : ""}`}
                    onClick={() => paginate(i)}
                  >{i}</button>
                );
              }

              if (end < totalPages) {
                if (end < totalPages - 1) pages.push(<span key="end-ellipsis" className="page-ellipsis">&hellip;</span>);
                pages.push(<button key={totalPages} className="page-btn" onClick={() => paginate(totalPages)}>{totalPages}</button>);
              }

              return pages;
            })()}
          </div>

          <button className="pagination-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
