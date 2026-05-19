import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./BlogApproval.scss";

export default function BlogApproval() {
  const [devBlogs, setDevBlogs] = useState([]);
  const [customBlogs, setCustomBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [statuses, setStatuses] = useState({});
  const [authors, setAuthors] = useState({});
  const [dates, setDates] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  const organization = "itcs11";

  // Fetch all Dev.to blogs
  const fetchAllDevBlogs = async () => {
    let allBlogs = [];
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://dev.to/api/organizations/${organization}/articles?per_page=100&page=${page}`
      );
      if (!res.ok) {
        if (res.status === 429) {
          console.warn('Dev.to API rate limited, skipping dev blogs');
          return allBlogs;
        }
        break;
      }
      const data = await res.json();
      if (!data || data.length === 0) break;
      allBlogs = [...allBlogs, ...data];
      page++;
    }
    return allBlogs;
  };

  // Sort blogs by date
  const sortBlogsByDate = (blogsList, dateMap) => {
    return [...blogsList].sort((a, b) => {
      const dateA = dateMap[a.id || a._id] ? new Date(dateMap[a.id || a._id]) : new Date(a.published_at || a.publishDate || a.created_at);
      const dateB = dateMap[b.id || b._id] ? new Date(dateMap[b.id || b._id]) : new Date(b.published_at || b.publishDate || b.created_at);
      return dateB - dateA;
    });
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Fetch each source independently so one failure doesn't kill everything
      let devBlogsData = [];
      let customBlogsRes = { data: [] };
      let statusRes = { data: [] };

      try { devBlogsData = await fetchAllDevBlogs(); } catch (e) { console.warn("Dev.to fetch failed:", e.message); }
      try { customBlogsRes = await axios.get(apiUrl("/api/custom-blogs/all"), { headers: { Authorization: `Bearer ${token}` } }); } catch (e) { console.warn("Custom blogs fetch failed:", e.message); }
      try { statusRes = await axios.get(apiUrl("/api/blogs/statuses")); } catch (e) { console.warn("Statuses fetch failed:", e.message); }

      // Process Dev.to blogs statuses
      const statusMap = {};
      const authorMap = {};
      const dateMap = {};

      if (statusRes.data && Array.isArray(statusRes.data)) {
        statusRes.data.forEach(b => {
          statusMap[b.devId] = b.status;
          authorMap[b.devId] = b.customAuthor || "";
          dateMap[b.devId] = b.customDate || "";
        });
      }

      // Filter visible Dev.to blogs (pending or approved, not rejected)
      let visibleDevBlogs = [];
      if (devBlogsData && Array.isArray(devBlogsData)) {
        visibleDevBlogs = devBlogsData.filter(blog => statusMap[blog.id] !== "rejected");
        visibleDevBlogs = visibleDevBlogs.map(blog => ({
          ...blog,
          type: 'devto',
          displayAuthor: authorMap[blog.id] || blog.user?.username || "Unknown",
          displayDate: dateMap[blog.id] || blog.readable_publish_date
        }));
      }

      // Process custom blogs (pending or published, not rejected)
      let visibleCustomBlogs = [];
      if (customBlogsRes.data && Array.isArray(customBlogsRes.data)) {
        visibleCustomBlogs = customBlogsRes.data
          .filter(blog => blog.status !== 'rejected')
          .map(blog => {
            let description = blog.excerpt || blog.metaDescription || "";
            // Fix for text that has no space after punctuation (e.g. "Question?Answer")
            if (typeof description === 'string') {
              description = description.replace(/([?!:])([a-zA-Z])/g, '$1 $2');
            }

            return {
              ...blog,
              type: 'custom',
              id: blog._id,
              title: blog.title,
              description: description,
              cover_image: blog.featuredImage,
              user: { username: blog.author },
              published_at: blog.publishDate,
              readable_publish_date: new Date(blog.publishDate).toLocaleDateString(),
              tag_list: blog.tags || [],
              displayAuthor: blog.author,
              displayDate: new Date(blog.publishDate).toLocaleDateString()
            };
          });
      }

      setStatuses(statusMap);
      setAuthors(authorMap);
      setDates(dateMap);
      setDevBlogs(visibleDevBlogs);
      setCustomBlogs(visibleCustomBlogs);

    } catch (err) {
      console.error("Fetch blogs error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Dev.to blog status
  const updateDevToStatus = async (devId, status) => {
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { status });
      setStatuses(prev => ({ ...prev, [devId]: status }));
      if (status === "rejected") {
        setDevBlogs(prev => prev.filter(blog => blog.id !== devId));
      }
    } catch {
      alert("Failed to update status.");
    }
  };

  const updateCustomBlogStatus = async (id, status) => {
    try {
      await axios.patch(apiUrl(`/api/custom-blogs/${id}/status`), { status });
      if (status === 'rejected') {
        setCustomBlogs(prev => prev.filter(blog => blog._id !== id && blog.id !== id));
      } else {
        setCustomBlogs(prev => prev.map(blog => 
          (blog._id === id || blog.id === id) ? { ...blog, status } : blog
        ));
      }
    } catch {
      alert("Failed to update custom blog status.");
    }
  };

  // Update author for Dev.to blogs
  const updateAuthor = async (devId, author) => {
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { customAuthor: author });
      setAuthors(prev => ({ ...prev, [devId]: author }));
    } catch {
      alert("Failed to update author.");
    }
  };

  // Update date for Dev.to blogs
  const updateDate = async (devId, customDate) => {
    if (!customDate) return alert("Date cannot be empty.");
    try {
      await axios.patch(apiUrl(`/api/blogs/${devId}/status`), { customDate });
      setDates(prev => {
        const newDates = { ...prev, [devId]: customDate };
        setDevBlogs(prevBlogs => sortBlogsByDate(prevBlogs, newDates));
        return newDates;
      });
    } catch {
      alert("Failed to update date.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Combine and filter blogs based on active tab
  const getAllBlogs = () => {
    let allBlogs = [];
    if (activeTab === 'all' || activeTab === 'devto') {
      allBlogs = [...allBlogs, ...devBlogs];
    }
    if (activeTab === 'all' || activeTab === 'custom') {
      allBlogs = [...allBlogs, ...customBlogs];
    }
    return sortBlogsByDate(allBlogs, dates);
  };

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const allBlogs = getAllBlogs();
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

      <div className="approval-tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All ({devBlogs.length + customBlogs.length})
        </button>
        <button
          className={activeTab === 'devto' ? 'active' : ''}
          onClick={() => setActiveTab('devto')}
        >
          Dev.to ({devBlogs.length})
        </button>
        <button
          className={activeTab === 'custom' ? 'active' : ''}
          onClick={() => setActiveTab('custom')}
        >
          Custom ({customBlogs.length})
        </button>
      </div>

      {loading && <p className="loading-text">Loading blogs...</p>}

      <div className="blog-grid">
        {currentBlogs.map(blog => (
          <article key={blog.id || blog._id} className={`blog-card ${blog.type}`}>
            <div className="blog-type-badge">
              {blog.type === 'custom' ? 'Custom' : 'Dev.to'}
            </div>

            {(blog.cover_image || blog.social_image) && (
              <div className="blog-cover-wrap">
                <img
                  src={blog.cover_image || blog.social_image}
                  alt={blog.title}
                  className="blog-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="blog-card__content">
              <h3>{blog.title}</h3>
              <p className="meta">
                Author: {blog.displayAuthor || blog.user?.username || "Unknown"} •{" "}
                {blog.displayDate
                  ? new Date(blog.displayDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : blog.readable_publish_date} • {blog.reading_time_minutes || Math.ceil((blog.content || '').split(' ').length / 200)} min read
              </p>
              <p className="description">{blog.description}</p>
              <div className="tags-small">
                {blog.tag_list?.slice(0, 3).map(tag => <span key={tag}>#{tag}</span>)}
              </div>

              {blog.type === 'devto' ? (
                <Link
                  to={`/admin/blog/${blog.id}`}
                  state={{ customAuthor: authors[blog.id] || "" }}
                  className="read-more"
                >
                  Read More
                </Link>
              ) : (
                <Link
                  to={`/admin/custom-blog/${blog.id || blog._id}`}
                  className="read-more"
                >
                  Read More
                </Link>
              )}
            </div>

            {blog.type === 'devto' ? (
              <div className="blog-card__footer">
                <div className="author-edit">
                  <input
                    type="text"
                    placeholder="Edit author name"
                    value={authors[blog.id] || ""}
                    onChange={e => setAuthors(prev => ({ ...prev, [blog.id]: e.target.value }))}
                  />
                  <button onClick={() => updateAuthor(blog.id, authors[blog.id] || "")}>Save Author</button>
                </div>

                <div className="date-edit">
                  <input
                    type="date"
                    value={dates[blog.id] || ""}
                    onChange={e => setDates(prev => ({ ...prev, [blog.id]: e.target.value }))}
                  />
                  <button onClick={() => updateDate(blog.id, dates[blog.id] || "")}>Save Date</button>
                </div>

                <div className="approval-buttons">
                  <button
                    className="approve-btn"
                    disabled={statuses[blog.id] === "approved"}
                    onClick={() => updateDevToStatus(blog.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    disabled={statuses[blog.id] === "rejected"}
                    onClick={() => updateDevToStatus(blog.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <div className="blog-card__footer">
                <div className="approval-buttons">
                  <button
                    className="approve-btn"
                    disabled={blog.status === "published"}
                    onClick={() => updateCustomBlogStatus(blog.id || blog._id, "published")}
                  >
                    {blog.status === 'published' ? 'Published' : 'Approve & Publish'}
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => updateCustomBlogStatus(blog.id || blog._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {!loading && allBlogs.length === 0 && <p className="no-blogs">No blogs pending approval.</p>}

      {/* Modern Pagination UI */}
      {totalPages > 1 && (
        <div className="modern-pagination">
          <button 
            className="pagination-arrow" 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
          
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            className="pagination-arrow" 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
