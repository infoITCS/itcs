import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config/api';
import { getAuthHeaders } from '../../../config/authHeaders';
import { splitTags, hasSalary, formatSalary, formatDeadline, htmlToText } from '../../../utils/jobFormat';
import { normalizeBlogHtml as normalizeJobHtml } from '../../../utils/blogFormat';
import QuillEditor from '../../Common/QuillEditor';
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
  faXmark,
  faMoneyBillWave,
  faUsers,
  faGraduationCap,
  faTags,
  faCalendarDay,
  faEye,
  faStar,
  faWifi,
  faFileLines
} from '@fortawesome/free-solid-svg-icons';

const jdModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    ['link'],
    ['clean'],
  ],
};

const isQuillEmpty = (html) =>
  !html || html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() === '';

const emptyForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  experience: '',
  education: '',
  openings: 1,
  shiftTiming: '',
  isRemote: false,
  isActive: true,
  featured: false,
  salaryMin: '',
  salaryMax: '',
  salaryCurrency: 'PKR',
  salaryPeriod: 'Yearly',
  applyDeadline: '',
  skills: '',
  jobDescription: '',
  keyHighlights: '',
  requirements: '',
  benefits: '',
  perks: '',
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
  const [skillInput, setSkillInput] = useState('');
  
  const [formData, setFormData] = useState(emptyForm);

  const skillChips = splitTags(formData.skills);

  useEffect(() => {
    if (activeSubTab === 'list') {
      fetchJobs();
    }
  }, [activeSubTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl('/api/jobsAdd?all=true'), {
        headers: getAuthHeaders(),
      });
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
    setSkillInput('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleQuillChange = (value) => {
    setFormData(prev => ({ ...prev, jobDescription: value }));
    setMessage({ type: '', text: '' });
  };

  const toggleBool = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
    setMessage({ type: '', text: '' });
  };

  const addSkill = (raw) => {
    const parts = String(raw || '').split(',').map(s => s.trim()).filter(Boolean);
    setSkillInput('');
    if (!parts.length) return;
    setFormData(prev => {
      const current = splitTags(prev.skills);
      parts.forEach(part => {
        if (!current.some(tag => tag.toLowerCase() === part.toLowerCase())) current.push(part);
      });
      return { ...prev, skills: current.join(', ') };
    });
    setMessage({ type: '', text: '' });
  };

  const removeSkill = (name) => {
    setFormData(prev => ({
      ...prev,
      skills: splitTags(prev.skills).filter(tag => tag !== name).join(', ')
    }));
    setMessage({ type: '', text: '' });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === 'Backspace' && !skillInput && skillChips.length) {
      removeSkill(skillChips[skillChips.length - 1]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const min = formData.salaryMin === '' ? null : Number(formData.salaryMin);
    const max = formData.salaryMax === '' ? null : Number(formData.salaryMax);
    if (min !== null && max !== null && min > max) {
      setMessage({ type: 'error', text: 'Minimum salary cannot be greater than maximum salary.' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        jobDescription: isQuillEmpty(formData.jobDescription)
          ? ''
          : normalizeJobHtml(formData.jobDescription),
      };

      if (editingId) {
        await axios.put(apiUrl(`/api/jobsAdd/${editingId}`), payload, {
          headers: getAuthHeaders(),
        });
        setMessage({
          type: 'success',
          text: `Job "${formData.title}" updated successfully.`,
        });
      } else {
        await axios.post(apiUrl('/api/jobsAdd'), payload, {
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
      education: job.education || '',
      openings: job.openings ?? 1,
      shiftTiming: job.shiftTiming || '',
      isRemote: Boolean(job.isRemote),
      isActive: job.isActive !== false,
      featured: Boolean(job.featured),
      salaryMin: job.salaryMin ?? '',
      salaryMax: job.salaryMax ?? '',
      salaryCurrency: job.salaryCurrency || 'PKR',
      salaryPeriod: job.salaryPeriod || 'Yearly',
      applyDeadline: job.applyDeadline ? String(job.applyDeadline).slice(0, 10) : '',
      skills: job.skills || '',
      jobDescription: job.jobDescription || '',
      keyHighlights: job.keyHighlights || '',
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      perks: job.perks || '',
      aboutRole: job.aboutRole || job.description || '',
      responsibilities: job.responsibilities || '',
      qualifications: job.qualifications || '',
    });
    setSkillInput('');
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
          <p>Build detailed job postings with skills, compensation, and publishing controls</p>
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
            <FontAwesomeIcon icon={faListUl} /> All Jobs
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
                    <input name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Engineering" required />
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

                <div className="input-group">
                  <label>Required Experience</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLayerGroup} className="field-icon" />
                    <input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3-5 years in React Development" required />
                  </div>
                </div>

                <div className="input-group">
                  <label>Education <span className="opt-hint">optional</span></label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faGraduationCap} className="field-icon" />
                    <input name="education" value={formData.education} onChange={handleChange} placeholder="e.g. BS in Computer Science or equivalent" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Vacancies</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faUsers} className="field-icon" />
                    <input type="number" name="openings" min="1" value={formData.openings} onChange={handleChange} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Shift / Timing <span className="opt-hint">optional</span></label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faClock} className="field-icon" />
                    <input name="shiftTiming" value={formData.shiftTiming} onChange={handleChange} placeholder="e.g. Day Shift (9AM - 6PM)" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FontAwesomeIcon icon={faMoneyBillWave} /> Compensation & Availability</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>Salary From <span className="opt-hint">optional</span></label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="field-icon" />
                    <input type="number" name="salaryMin" min="0" value={formData.salaryMin} onChange={handleChange} placeholder="e.g. 150000" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Salary To <span className="opt-hint">optional</span></label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="field-icon" />
                    <input type="number" name="salaryMax" min="0" value={formData.salaryMax} onChange={handleChange} placeholder="e.g. 250000" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Currency</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="field-icon" />
                    <select name="salaryCurrency" value={formData.salaryCurrency} onChange={handleChange}>
                      <option value="PKR">PKR - Pakistani Rupee</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="AED">AED - UAE Dirham</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Salary Period</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faClock} className="field-icon" />
                    <select name="salaryPeriod" value={formData.salaryPeriod} onChange={handleChange}>
                      <option value="Yearly">Yearly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Application Deadline <span className="opt-hint">optional</span></label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faCalendarDay} className="field-icon" />
                    <input type="date" name="applyDeadline" value={formData.applyDeadline} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="switches-row">
                <label className={`switch-row ${formData.isActive ? 'on' : ''}`}>
                  <span className="switch-info">
                    <span className="switch-title"><FontAwesomeIcon icon={faEye} /> Publish job</span>
                    <span className="switch-sub">Visible on the public careers page</span>
                  </span>
                  <span className="switch">
                    <input type="checkbox" checked={formData.isActive} onChange={() => toggleBool('isActive')} />
                    <span className="switch-slider"></span>
                  </span>
                </label>

                <label className={`switch-row ${formData.featured ? 'on' : ''}`}>
                  <span className="switch-info">
                    <span className="switch-title"><FontAwesomeIcon icon={faStar} /> Featured position</span>
                    <span className="switch-sub">Highlight this role as a priority opening</span>
                  </span>
                  <span className="switch">
                    <input type="checkbox" checked={formData.featured} onChange={() => toggleBool('featured')} />
                    <span className="switch-slider"></span>
                  </span>
                </label>

                <label className={`switch-row ${formData.isRemote ? 'on' : ''}`}>
                  <span className="switch-info">
                    <span className="switch-title"><FontAwesomeIcon icon={faWifi} /> Remote friendly</span>
                    <span className="switch-sub">Role can be performed remotely</span>
                  </span>
                  <span className="switch">
                    <input type="checkbox" checked={formData.isRemote} onChange={() => toggleBool('isRemote')} />
                    <span className="switch-slider"></span>
                  </span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FontAwesomeIcon icon={faCircleInfo} /> Detailed Content</h3>

              <div className="textarea-group">
                <label>
                  <FontAwesomeIcon icon={faStar} /> About This Role <span className="opt-hint">short intro — appears first on the public page</span>
                </label>
                <textarea name="aboutRole" value={formData.aboutRole} onChange={handleChange} placeholder="Provide a high-level summary of the role..." />
              </div>

              <div className="textarea-group jd-group">
                <label>
                  <FontAwesomeIcon icon={faFileLines} /> Job Description <span className="opt-hint">full JD — write or paste with headings &amp; lists</span>
                </label>
                <div className="jd-editor">
                  <QuillEditor
                    theme="snow"
                    value={formData.jobDescription}
                    onChange={handleQuillChange}
                    modules={jdModules}
                    placeholder="Paste or write the complete JD — Role Purpose, Key Responsibilities, Requirements, Qualifications, KPIs..."
                  />
                </div>
                <span className="field-hint">
                  Appears as the main &ldquo;Job Description&rdquo; section on the public page, right below About This Role.
                </span>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><FontAwesomeIcon icon={faTags} /> Skills & Keywords</h3>
              <div className="textarea-group">
                <label>Skills <span className="opt-hint">press Enter or comma after each skill</span></label>
                <div className={`tag-input ${skillChips.length ? 'has-chips' : ''}`}>
                  {skillChips.map(chip => (
                    <span className="tag-chip" key={chip}>
                      {chip}
                      <button type="button" onClick={() => removeSkill(chip)} aria-label={`Remove ${chip}`}>
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onBlur={() => addSkill(skillInput)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder={skillChips.length ? '' : 'React, Node.js, MongoDB, Docker...'}
                  />
                </div>
                <span className="field-hint">Shown as keyword chips on the job listing and detail page. Helps candidates scan the role quickly.</span>
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
              <div className="empty-portal">No positions yet. Click &ldquo;New Position&rdquo; to start.</div>
            ) : (
              <div className="listings-grid">
                {jobs.map(job => {
                  const jobSkills = splitTags(job.skills);
                  const excerpt = job.aboutRole || htmlToText(job.jobDescription);
                  return (
                    <div key={job._id} className="portal-job-card">
                      <div className="card-top">
                        <div className="tags">
                          <span className="dept-tag">{job.department}</span>
                          <span className="type-tag">{job.type}</span>
                          {job.isActive === false && <span className="status-tag draft">Draft</span>}
                          {job.featured && <span className="status-tag featured"><FontAwesomeIcon icon={faStar} /> Featured</span>}
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
                        {hasSalary(job) && (
                          <span><FontAwesomeIcon icon={faMoneyBillWave} /> {formatSalary(job)}</span>
                        )}
                        {Number(job.openings) > 1 && (
                          <span><FontAwesomeIcon icon={faUsers} /> {job.openings} openings</span>
                        )}
                        {job.applyDeadline && (
                          <span><FontAwesomeIcon icon={faCalendarDay} /> Closes {formatDeadline(job)}</span>
                        )}
                      </div>

                      {jobSkills.length > 0 && (
                        <div className="card-skills">
                          {jobSkills.slice(0, 5).map(skill => (
                            <span key={skill}>{skill}</span>
                          ))}
                          {jobSkills.length > 5 && <span className="more">+{jobSkills.length - 5}</span>}
                        </div>
                      )}

                      <div className="card-excerpt">
                        {excerpt ? `${excerpt.substring(0, 120)}...` : 'No summary added yet.'}
                      </div>

                      <div className="card-bottom">
                        <span className="post-date">Listed on {new Date(job.createdAt).toLocaleDateString()}</span>
                        <button type="button" className="card-edit-link" onClick={() => handleEdit(job)}>
                          Edit
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
