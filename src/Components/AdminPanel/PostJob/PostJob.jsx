import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config/api';
import { getAuthHeaders } from '../../../config/authHeaders';
import './PostJob.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faListUl, 
  faBriefcase, 
  faLocationDot, 
  faBuilding, 
  faClock, 
  faTrashCan,
  faPenToSquare,
  faCheckCircle,
  faCircleInfo,
  faLayerGroup,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

const emptyForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  experience: '',
  aboutRole: '',
  responsibilities: '',
  qualifications: ''
};

const PostJob = () => {
  const [activeSubTab, setActiveSubTab] = useState('post');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const [formData, setFormData] = useState(emptyForm);

  const departments = ['Engineering', 'Design', 'Security', 'Product', 'Sales', 'Marketing', 'HR', 'Support'];

  useEffect(() => {
    if (activeSubTab === 'list') {
      fetchJobs();
    }
  }, [activeSubTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl('/api/jobsAdd'));
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(apiUrl(`/api/jobsAdd/${editingId}`), formData, {
          headers: getAuthHeaders(),
        });
        setMessage({
          type: 'success',
          text: `Job "${formData.title}" updated successfully.`,
        });
      } else {
        await axios.post(apiUrl('/api/jobsAdd'), formData, {
          headers: getAuthHeaders(),
        });
        setMessage({
          type: 'success',
          text: `Job "${formData.title}" published successfully.`,
        });
      }

      resetForm();
      setTimeout(() => setActiveSubTab('list'), 1000);
    } catch (err) {
      console.error('Submission error:', err);
      const serverMsg = err.response?.data?.message;
      setMessage({
        type: 'error',
        text: serverMsg || (editingId ? 'Failed to update job position.' : 'Failed to publish job position. Please check your connection.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Full-time',
      experience: job.experience || '',
      aboutRole: job.aboutRole || job.description || '',
      responsibilities: job.responsibilities || '',
      qualifications: job.qualifications || '',
    });
    setMessage({ type: '', text: '' });
    setActiveSubTab('post');
  };

  const handleCancelEdit = () => {
    resetForm();
    setMessage({ type: '', text: '' });
  };

  const openDeletePopup = (job) => {
    setJobToDelete(job);
    setMessage({ type: '', text: '' });
  };

  const closeDeletePopup = () => {
    if (deleting) return;
    setJobToDelete(null);
  };

  const confirmDelete = async () => {
    if (!jobToDelete?._id) return;
    setDeleting(true);
    try {
      await axios.delete(apiUrl(`/api/jobsAdd/${jobToDelete._id}`), {
        headers: getAuthHeaders(),
      });
      setJobs((prev) => prev.filter((job) => job._id !== jobToDelete._id));
      if (editingId === jobToDelete._id) resetForm();
      setMessage({ type: 'success', text: `"${jobToDelete.title}" deleted successfully.` });
      setJobToDelete(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete position.' });
    } finally {
      setDeleting(false);
    }
  };

  const openNewPosition = () => {
    resetForm();
    setMessage({ type: '', text: '' });
    setActiveSubTab('post');
  };

  return (
    <div className="job-portal-unified">
      <div className="portal-header">
        <div className="header-info">
          <h1>Job Management Portal</h1>
          <p>Create, edit, and manage active positions within ITCS</p>
        </div>
        
        <div className="portal-tabs">
          <button 
            className={`tab-btn ${activeSubTab === 'post' ? 'active' : ''}`}
            onClick={openNewPosition}
          >
            <FontAwesomeIcon icon={editingId ? faPenToSquare : faPlus} />
            {editingId ? 'Edit Position' : 'New Position'}
          </button>
          <button 
            className={`tab-btn ${activeSubTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('list')}
          >
            <FontAwesomeIcon icon={faListUl} /> Active Jobs
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`portal-alert ${message.type}`}>
          <FontAwesomeIcon icon={message.type === 'success' ? faCheckCircle : faCircleInfo} />
          {message.text}
        </div>
      )}

      <div className="portal-content">
        {activeSubTab === 'post' ? (
          <form className="modern-job-form" onSubmit={handleSubmit}>
            {editingId && (
              <div className="editing-banner">
                <span>Editing existing position</span>
                <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>
                  <FontAwesomeIcon icon={faXmark} /> Cancel edit
                </button>
              </div>
            )}

            <div className="form-section">
              <h3 className="section-title"><FontAwesomeIcon icon={faBriefcase} /> Position Details</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>Job Title</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faBriefcase} className="field-icon" />
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Software Engineer" required />
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Department</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faBuilding} className="field-icon" />
                    <select name="department" value={formData.department} onChange={handleChange} required>
                      <option value="">Select Department</option>
                      {!departments.includes(formData.department) && formData.department && (
                        <option value={formData.department}>{formData.department}</option>
                      )}
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Location</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLocationDot} className="field-icon" />
                    <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Karachi, Pakistan" required />
                  </div>
                </div>

                <div className="input-group">
                  <label>Employment Type</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faClock} className="field-icon" />
                    <select name="type" value={formData.type} onChange={handleChange}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label>Required Experience</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLayerGroup} className="field-icon" />
                    <input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3-5 years in React Development" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FontAwesomeIcon icon={faCircleInfo} /> Detailed Content</h3>
              
              <div className="textarea-group">
                <label>About This Role</label>
                <textarea name="aboutRole" value={formData.aboutRole} onChange={handleChange} placeholder="Provide a high-level summary of the role..." required />
              </div>
              
              <div className="textarea-grid">
                <div className="textarea-group">
                  <label>Key Responsibilities (One per line)</label>
                  <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} placeholder="Develop new features...&#10;Collaborate with design team...&#10;Optimize application performance..." required />
                </div>
                <div className="textarea-group">
                  <label>Qualifications & Skills (One per line)</label>
                  <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="BS in Computer Science...&#10;Experience with Node.js...&#10;Strong communication skills..." required />
                </div>
              </div>
            </div>

            <div className="form-actions">
              {editingId && (
                <button type="button" className="cancel-portal-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
              <button type="submit" className="submit-portal-btn" disabled={loading}>
                {loading
                  ? (editingId ? 'Saving...' : 'Publishing...')
                  : (editingId ? 'Update Position' : 'Publish Position')}
              </button>
            </div>
          </form>
        ) : (
          <div className="modern-job-list">
            {loading ? (
              <div className="portal-loader">Refreshing listings...</div>
            ) : jobs.length === 0 ? (
              <div className="empty-portal">No active positions. Click "New Position" to start.</div>
            ) : (
              <div className="listings-grid">
                {jobs.map(job => (
                  <div key={job._id} className="portal-job-card">
                    <div className="card-top">
                      <div className="tags">
                        <span className="dept-tag">{job.department}</span>
                        <span className="type-tag">{job.type}</span>
                      </div>
                      <div className="card-actions">
                        <button
                          type="button"
                          className="card-edit-btn"
                          title="Edit position"
                          onClick={() => handleEdit(job)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          type="button"
                          className="card-delete-btn"
                          title="Delete position"
                          onClick={() => openDeletePopup(job)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </div>
                    
                    <h3>{job.title}</h3>
                    
                    <div className="card-meta">
                      <span><FontAwesomeIcon icon={faLocationDot} /> {job.location}</span>
                      <span><FontAwesomeIcon icon={faClock} /> {job.experience}</span>
                    </div>

                    <div className="card-excerpt">
                      {job.aboutRole?.substring(0, 120)}...
                    </div>

                    <div className="card-bottom">
                      <span className="post-date">Listed on {new Date(job.createdAt).toLocaleDateString()}</span>
                      <button type="button" className="card-edit-link" onClick={() => handleEdit(job)}>
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {jobToDelete && (
        <div
          className="job-delete-overlay"
          role="presentation"
          onClick={closeDeletePopup}
        >
          <div
            className="job-delete-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-delete-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="job-delete-close"
              onClick={closeDeletePopup}
              disabled={deleting}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="job-delete-icon">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
            <h3 id="job-delete-title">Delete this position?</h3>
            <p>
              You are about to permanently delete{' '}
              <strong>{jobToDelete.title}</strong>. This action cannot be undone.
            </p>
            <div className="job-delete-actions">
              <button
                type="button"
                className="job-delete-cancel"
                onClick={closeDeletePopup}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="job-delete-confirm"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJob;
