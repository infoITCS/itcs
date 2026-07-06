import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import QuillEditor from '../../Common/QuillEditor';
import 'react-quill-new/dist/quill.snow.css';
import { apiUrl } from '../../../config/api';
import { getAuthHeaders } from '../../../config/authHeaders';
import './AddCustomBlog.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudUploadAlt, faNewspaper, faSave, faCheckCircle,
  faTimesCircle, faLink, faEye, faChartLine, faClock,
  faFileAlt, faTag, faUserEdit, faUndo, faImage,
  faStar, faPenFancy, faTrashAlt, faSearch,
  faPlusCircle, faListUl, faThLarge, faFilter,
  faGlobe, faHourglassHalf, faBan, faSortAmountDown,
  faExternalLinkAlt, faEdit, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const AddCustomBlog = () => {
  const initialFormState = {
    title: '', slug: '', content: '', author: '', excerpt: '',
    tags: '', featuredImage: '', metaTitle: '', metaDescription: '', metaKeywords: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [autoSlug, setAutoSlug] = useState(true);
  const [activeSection, setActiveSection] = useState('content');
  const [dashboardTab, setDashboardTab] = useState('create');
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [deleting, setDeleting] = useState(null);
  const contentRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  useEffect(() => {
    if (autoSlug) {
      const generatedSlug = formData.title
        .toLowerCase().trim()
        .replace(/[^\w ]+/g, '').replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, autoSlug]);

  const stripHtml = (html) => {
    // Replace closing tags of block elements with a space to prevent text merging
    const spacedHtml = html.replace(/<\/h[1-6]>|<\/p>|<\/div>|<\/li>|<br\s*\/?>/gi, '$& ');
    const doc = new DOMParser().parseFromString(spacedHtml, 'text/html');
    return doc.body.textContent || '';
  };

  const wordCount = formData.content ? stripHtml(formData.content).split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const seoScore = [
    formData.metaTitle.length > 10 && formData.metaTitle.length <= 60,
    formData.metaDescription.length > 50 && formData.metaDescription.length <= 160,
    formData.slug.length > 0,
    formData.tags.split(',').filter(Boolean).length >= 3,
    formData.featuredImage || imagePreview,
    wordCount >= 300
  ].filter(Boolean).length;
  const seoPercent = Math.round((seoScore / 6) * 100);

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(b => b.status === 'published' || b.status === 'approved').length;
  const pendingBlogs = blogs.filter(b => b.status === 'pending').length;
  const draftedBlogs = blogs.filter(b => b.status === 'draft' || !b.status).length;

  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(apiUrl('/api/custom-blogs/all'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch {
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dashboardTab === 'manage') fetchBlogs();
  }, [dashboardTab, fetchBlogs]);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchTerm ||
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const max_width = 1200;
          const max_height = 800;

          if (width > height) {
            if (width > max_width) {
              height = Math.round((height * max_width) / width);
              width = max_width;
            }
          } else {
            if (height > max_height) {
              width = Math.round((width * max_height) / height);
              height = max_height;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 70% quality to ensure small size (< 500KB)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show loading indicator or directly compress
      const compressed = await compressImage(file);
      setImageFile(file);
      setImagePreview(compressed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage({ type: 'error', text: 'Authentication token not found. Please log in again.' });
      setLoading(false);
      return;
    }

    try {
      let imageUrl = formData.featuredImage;
      if (imagePreview) {
        imageUrl = imagePreview; // Save image as Base64 string directly
      }

      const plainTextContent = stripHtml(formData.content);
      let excerpt = formData.excerpt.trim();
      
      if (!excerpt) {
        // Find a word boundary within 150 chars
        const limit = 150;
        if (plainTextContent.length > limit) {
          const lastSpace = plainTextContent.lastIndexOf(' ', limit);
          excerpt = plainTextContent.substring(0, lastSpace > 0 ? lastSpace : limit) + '...';
        } else {
          excerpt = plainTextContent;
        }
      }

      const blogData = {
        ...formData,
        featuredImage: imageUrl,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        excerpt: excerpt
      };

      if (editingId) {
        await axios.put(apiUrl(`/api/custom-blogs/${editingId}`), blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Blog updated successfully!' });
      } else {
        await axios.post(apiUrl('/api/custom-blogs'), blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Blog submitted for approval!' });
      }

      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      setAutoSlug(true);
      fetchBlogs();
    } catch (err) {
      console.error('Publish error:', err);
      const isConnectionError = err.code === 'ERR_NETWORK' || err.message.includes('Network Error');
      let serverMsg = err.response?.data?.message || err.response?.data?.error || '';
      
      // Fix React Error #31: Prevent serverMsg from being an object
      if (typeof serverMsg === 'object') {
        serverMsg = serverMsg.message || serverMsg.code || JSON.stringify(serverMsg);
      }
      
      if (err.response?.status === 413) {
        serverMsg = "Image is still too large. Please upload a smaller image.";
      }

      setMessage({
        type: 'error',
        text: isConnectionError
          ? 'Backend Server is Offline! Please start your Node.js server.'
          : (serverMsg || `Server error (${err.response?.status || 'no response'})`)
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setAutoSlug(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      content: blog.content || '',
      author: blog.author || '',
      excerpt: blog.excerpt || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      featuredImage: blog.featuredImage || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });
    setImagePreview(blog.featuredImage || null);
    setDashboardTab('create');
    setAutoSlug(false);
    window.scrollTo(0, 0);
  };

  const handleView = (blog) => {
    window.open(`/${blog.slug}`, '_blank');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog permanently?')) return;
    setDeleting(id);
    try {
      await axios.delete(apiUrl(`/api/custom-blogs/${id}`), {
        headers: getAuthHeaders(),
      });
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch {
      alert('Failed to delete blog.');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'published' || status === 'approved') return { label: 'Published', icon: faGlobe, cls: 'status-published' };
    if (status === 'pending') return { label: 'Pending', icon: faHourglassHalf, cls: 'status-pending' };
    if (status === 'rejected') return { label: 'Rejected', icon: faBan, cls: 'status-rejected' };
    return { label: 'Draft', icon: faPenFancy, cls: 'status-draft' };
  };

  const sections = [
    { id: 'content', label: 'Content', icon: faNewspaper },
    { id: 'seo', label: 'SEO', icon: faChartLine },
    { id: 'settings', label: 'Settings', icon: faEye },
  ];

  return (
    <div className="blog-dashboard">
      <div className="dashboard-topbar">
        <div className="topbar-left">
          <div className="topbar-icon">
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <div>
            <h2>Blog Dashboard</h2>
            <p>Create, manage, and publish content</p>
          </div>
        </div>
        <div className="topbar-actions">
          <button
            className={`tab-switch ${dashboardTab === 'create' ? 'active' : ''}`}
            onClick={() => setDashboardTab('create')}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Create
          </button>
          <button
            className={`tab-switch ${dashboardTab === 'manage' ? 'active' : ''}`}
            onClick={() => setDashboardTab('manage')}
          >
            <FontAwesomeIcon icon={faListUl} /> Manage ({totalBlogs})
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`alert-toast ${message.type}`}>
          <FontAwesomeIcon icon={message.type === 'success' ? faCheckCircle : faTimesCircle} />
          <span>{message.text}</span>
          <button className="alert-close" onClick={() => setMessage({ type: '', text: '' })}>&times;</button>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card stat-total">
          <div className="stat-icon"><FontAwesomeIcon icon={faNewspaper} /></div>
          <div className="stat-info"><span className="stat-num">{totalBlogs}</span><span className="stat-label">Total Blogs</span></div>
        </div>
        <div className="stat-card stat-published">
          <div className="stat-icon"><FontAwesomeIcon icon={faGlobe} /></div>
          <div className="stat-info"><span className="stat-num">{publishedBlogs}</span><span className="stat-label">Published</span></div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-icon"><FontAwesomeIcon icon={faHourglassHalf} /></div>
          <div className="stat-info"><span className="stat-num">{pendingBlogs}</span><span className="stat-label">Pending</span></div>
        </div>
        <div className="stat-card stat-draft">
          <div className="stat-icon"><FontAwesomeIcon icon={faPenFancy} /></div>
          <div className="stat-info"><span className="stat-num">{draftedBlogs}</span><span className="stat-label">Drafts</span></div>
        </div>
      </div>

      {dashboardTab === 'create' && (
        <>
          <div className="mobile-tabs">
            {sections.map(s => (
              <button key={s.id} className={`tab-btn ${activeSection === s.id ? 'active' : ''}`} onClick={() => setActiveSection(s.id)}>
                <FontAwesomeIcon icon={s.icon} /> {s.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="blog-form-grid">
            <div className={`form-main-content ${activeSection !== 'content' ? 'hidden-mobile' : ''}`}>
              <div className="glass-card">
                <div className="card-heading"><FontAwesomeIcon icon={faNewspaper} /><h3>Article Content</h3></div>

                <div className="form-group input-highlight">
                  <label>Blog Title <span className="label-required">*</span></label>
                  <input type="text" name="title" placeholder="e.g., The Future of Cloud Computing in 2025" value={formData.title} onChange={handleChange} required />
                  <div className="input-progress" style={{ width: `${Math.min(100, (formData.title.length / 100) * 100)}%` }} />
                </div>

                <div className="form-group slug-group">
                  <label>
                    <span><FontAwesomeIcon icon={faLink} /> URL Slug</span>
                    <button type="button" className={`slug-toggle ${autoSlug ? 'active' : ''}`} onClick={() => setAutoSlug(!autoSlug)}>
                      {autoSlug ? 'Auto' : 'Manual'}
                    </button>
                  </label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} disabled={autoSlug} placeholder="seo-friendly-url" />
                </div>

                <div className="form-group">
                  <label><span>Blog Content</span><span className="char-count">{wordCount} words · {readingTime} min read</span></label>
                  <div ref={contentRef}>
                    <QuillEditor theme="snow" value={formData.content} onChange={handleContentChange} modules={modules} placeholder="Start writing your amazing story..." />
                  </div>
                </div>

                <div className="form-group">
                  <label>Excerpt</label>
                  <textarea name="excerpt" rows="3" value={formData.excerpt} onChange={handleChange} placeholder="Brief summary (auto-generated from content if left empty)" />
                </div>
              </div>
            </div>

            <div className="form-sidebar">
              <div className={`glass-card ${activeSection !== 'seo' ? 'hidden-mobile' : ''}`}>
                <div className="card-heading"><FontAwesomeIcon icon={faChartLine} /><h3>SEO Analysis</h3></div>

                <div className="seo-meter">
                  <div className="meter-bar"><div className="meter-fill" style={{ width: `${seoPercent}%` }} /></div>
                  <div className="meter-score">
                    <span className={`score-value ${seoPercent >= 66 ? 'high' : seoPercent >= 33 ? 'mid' : 'low'}`}>{seoPercent}%</span>
                    <span className="score-label">SEO Readiness</span>
                  </div>
                  <ul className="seo-checklist">
                    {[
                      ['Meta title (10-60 chars)', formData.metaTitle.length > 10 && formData.metaTitle.length <= 60],
                      ['Meta description (50-160 chars)', formData.metaDescription.length > 50 && formData.metaDescription.length <= 160],
                      ['URL slug set', formData.slug.length > 0],
                      ['At least 3 tags', formData.tags.split(',').filter(Boolean).length >= 3],
                      ['Featured image', !!(formData.featuredImage || imagePreview)],
                      ['300+ words', wordCount >= 300],
                    ].map(([label, done], i) => (
                      <li key={i} className={done ? 'done' : ''}>{label}</li>
                    ))}
                  </ul>
                </div>

                <div className="form-group">
                  <label className="flex-label">Meta Title <span className={`counter ${formData.metaTitle.length > 50 ? 'warning' : ''}`}>{formData.metaTitle.length}/60</span></label>
                  <input type="text" name="metaTitle" maxLength="60" value={formData.metaTitle} onChange={handleChange} placeholder="Search engine title..." />
                </div>
                <div className="form-group">
                  <label className="flex-label">Meta Description <span className={`counter ${formData.metaDescription.length > 150 ? 'warning' : ''}`}>{formData.metaDescription.length}/160</span></label>
                  <textarea name="metaDescription" rows="4" maxLength="160" value={formData.metaDescription} onChange={handleChange} placeholder="Brief summary for search results..." />
                </div>
                <div className="form-group">
                  <label>Keywords <span className="label-hint">(comma separated)</span></label>
                  <input type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} placeholder="cloud, itcs, technology" />
                </div>
              </div>

              <div className={`glass-card ${activeSection !== 'settings' ? 'hidden-mobile' : ''}`}>
                <div className="card-heading"><FontAwesomeIcon icon={faEye} /><h3>Publish Settings</h3></div>

                <div className="form-group">
                  <label>Featured Image</label>
                  <div className={`image-upload-box ${imagePreview ? 'has-preview' : ''}`}>
                    <input type="file" id="blog-img" onChange={handleImageChange} hidden accept="image/*" />
                    <label htmlFor="blog-img" className="upload-label">
                      {imagePreview ? (
                        <><img src={imagePreview} alt="Preview" className="preview-img" /><span className="change-img"><FontAwesomeIcon icon={faImage} /> Change Image</span></>
                      ) : (
                        <><div className="upload-icon-wrap"><FontAwesomeIcon icon={faCloudUploadAlt} /></div><span className="upload-text">Upload Featured Image</span><span className="upload-hint">PNG, JPG, WebP • 1200x630</span></>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label><FontAwesomeIcon icon={faUserEdit} /> Author <span className="label-required">*</span></label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Writer's name" required />
                </div>

                <div className="form-group">
                  <label><FontAwesomeIcon icon={faTag} /> Tags</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Tech, News" />
                </div>

                <div className="form-actions">
                  <button type="submit" className="publish-btn" disabled={loading}>
                    {loading ? <><span className="spinner" /> Publishing...</> : <><FontAwesomeIcon icon={faSave} /> Publish Blog</>}
                  </button>
                  <button type="button" className="reset-btn" onClick={resetForm}><FontAwesomeIcon icon={faUndo} /> Reset</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      {dashboardTab === 'manage' && (
        <div className="manage-section">
          <div className="manage-toolbar">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search by title or author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="toolbar-right">
              <div className="filter-group">
                <FontAwesomeIcon icon={faFilter} />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="view-toggle">
                <button className={`${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><FontAwesomeIcon icon={faThLarge} /></button>
                <button className={`${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><FontAwesomeIcon icon={faListUl} /></button>
              </div>
            </div>
          </div>

          {blogsLoading ? (
            <div className="skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="skeleton-card"><div className="skeleton-img" /><div className="skeleton-line w-70" /><div className="skeleton-line w-50" /><div className="skeleton-line w-40" /></div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FontAwesomeIcon icon={faNewspaper} /></div>
              <h3>{searchTerm || statusFilter !== 'all' ? 'No matching blogs' : 'No blogs yet'}</h3>
              <p>{searchTerm || statusFilter !== 'all' ? 'Try a different search or filter.' : 'Create your first blog post to get started.'}</p>
              {!searchTerm && statusFilter === 'all' && (
                <button className="empty-cta" onClick={() => setDashboardTab('create')}><FontAwesomeIcon icon={faPlusCircle} /> Create Blog</button>
              )}
            </div>
          ) : (
            <div className={`blog-grid-view ${viewMode}`}>
              {filteredBlogs.map(blog => {
                const badge = getStatusBadge(blog.status);
                return (
                  <div key={blog._id} className="blog-card-dash">
                    <div className="card-dash-img">
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} />
                      ) : (
                        <div className="dash-img-placeholder"><FontAwesomeIcon icon={faImage} /></div>
                      )}
                      <span className={`status-badge ${badge.cls}`}><FontAwesomeIcon icon={badge.icon} /> {badge.label}</span>
                    </div>
                    <div className="card-dash-body">
                      <h4>{blog.title || 'Untitled'}</h4>
                      <div className="card-dash-meta">
                        <span><FontAwesomeIcon icon={faUserEdit} /> {blog.author || 'Unknown'}</span>
                        {blog.publishDate && <span><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(blog.publishDate).toLocaleDateString()}</span>}
                      </div>
                      <p className="card-dash-excerpt">
                        {(blog.excerpt || blog.metaDescription || 'No description.').replace(/([?!:])([a-zA-Z])/g, '$1 $2')}
                      </p>
                      <div className="card-dash-tags">
                        {(blog.tags || []).slice(0, 3).map((t, i) => <span key={i} className="dash-tag">#{t}</span>)}
                      </div>
                    </div>
                    <div className="card-dash-actions">
                      <button className="action-btn action-view" title="View" onClick={() => handleView(blog)}><FontAwesomeIcon icon={faExternalLinkAlt} /></button>
                      <button className="action-btn action-edit" title="Edit" onClick={() => handleEdit(blog)}><FontAwesomeIcon icon={faEdit} /></button>
                      <button className={`action-btn action-delete ${deleting === blog._id ? 'loading' : ''}`} title="Delete" onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id}>
                        <FontAwesomeIcon icon={deleting === blog._id ? faClock : faTrashAlt} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddCustomBlog;
