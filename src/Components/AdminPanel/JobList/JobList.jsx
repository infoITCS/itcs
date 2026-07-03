import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../config/api';
import { getAuthHeaders } from '../../../config/authHeaders';
import './JobList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faTrash, faClipboardList, faCircleMinus } from '@fortawesome/free-solid-svg-icons';


const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [loading, setLoading] = useState(false)

  const departments = ['All', 'Engineering', 'Design', 'Security', 'Product', 'Sales', 'Marketing', 'HR']

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(apiUrl('/api/jobsAdd'));
      setJobs(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error loading jobs:', err)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      await axios.delete(apiUrl(`/api/jobsAdd/${jobId}`), {
        headers: getAuthHeaders(),
      });
      setJobs(prev => prev.filter(job => job._id !== jobId))
    } catch (err) {
      console.error('Error deleting job:', err)
      alert('Failed to delete job')
    }
  }

  const filteredJobs = selectedDepartment === 'All'
    ? jobs
    : jobs.filter(job => job.department === selectedDepartment)


  return (
    <div className="job-list">
      <div className="job-list-header">
        <div>
          <h1>Job List</h1>
          <p>Manage all posted job positions</p>
        </div>
        <div className="job-count">
          <span>{jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'}</span>
        </div>
      </div>

      <div className="department-filter">
        {departments.map(dept => (
          <button key={dept} className={`filter-btn ${selectedDepartment === dept ? 'active' : ''}`} onClick={() => setSelectedDepartment(dept)}>
            {dept}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state"><p>Loading jobs...</p></div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><FontAwesomeIcon icon={faClipboardList} size="2x" /></div>
          <h3>No jobs found</h3>
          <p>{selectedDepartment === 'All' ? 'Get started by posting your first job!' : `No jobs found in ${selectedDepartment} department.`}</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <div className="job-meta">
                  <span className="department-tag">{job.department}</span>
                  <span className="type-tag">{job.type}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(job._id)} title="Delete job"><FontAwesomeIcon icon={faCircleMinus} color="#ffffff"/></button>
              </div>
              <h3>{job.title}</h3>
              <div className="job-details">
               <div className="detail"><FontAwesomeIcon className="icon" icon={faMapMarkerAlt} /> {job.location}</div>
                <div className="detail"><FontAwesomeIcon className="icon" icon={faClock} /> {job.experience}</div>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="job-footer">
                <span className="job-date">Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
