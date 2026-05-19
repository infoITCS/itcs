import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import PostJob from './PostJob/PostJob';
import JobList from './JobList/JobList';
import BlogApproval from './BlogApproval/BlogApproval';
import AddCustomBlog from './AddCustomBlog/AddCustomBlog';
import './AdminPanel.scss';
import axios from 'axios';
import { apiUrl } from '../../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAddressCard, 
  faList, 
  faBlog, 
  faArrowRightFromBracket, 
  faUsers,
  faPenFancy,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('add-blog');
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('author');
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const { instance } = useMsal();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    // Don't redirect here - AdminRoute handles authentication
  }, []);

  const handleLogout = () => {
    // Clear all localStorage immediately
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    
    // Clear MSAL cache silently (no popup for better UX)
    instance.clearCache();
    
    // Navigate to login immediately with replace to prevent back navigation
    navigate('/login', { replace: true });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        apiUrl('/api/admin/add-user'),
        {
          fullName,
          username,
          email,
          password,
          role: newUserRole,
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`   // Fixed: proper backticks
          }
        }
      );
      
      setMessage(res.data.message || 'Admin added successfully!');
      setFullName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding admin');
    }
  };

  const isAuthor = currentUser?.role === 'author';

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          {currentUser && (
            <p className="admin-username">Welcome, {currentUser.fullName || currentUser.username || 'Admin'}</p>
          )}
        </div>

        <nav className="sidebar-nav">
          {!isAuthor && (
            <button
              className={`nav-item ${activeTab === 'job-management' ? 'active' : ''}`}
              onClick={() => setActiveTab('job-management')}
            >
              <span className="nav-icon"><FontAwesomeIcon icon={faAddressCard} /></span>
              <span className="nav-text">Job Management</span>
            </button>
          )}

          {!isAuthor && (
            <button
              className={`nav-item ${activeTab === 'blog-approval' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog-approval')}
            >
              <span className="nav-icon"><FontAwesomeIcon icon={faBlog} /></span>
              <span className="nav-text">Blog Approval</span>
            </button>
          )}

          <button
            className={`nav-item ${activeTab === 'add-blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-blog')}
          >
            <span className="nav-icon"><FontAwesomeIcon icon={faPenFancy} /></span>
            <span className="nav-text">Create Blog</span>
          </button>

          {!isAuthor && (
            <button
              className={`nav-item ${activeTab === 'add-admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-admin')}
            >
              <span className="nav-icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="nav-text">Add User</span>
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="back-btn" onClick={() => navigate('/')}>
            <span className="nav-icon"><FontAwesomeIcon icon={faArrowLeft} /></span>
            <span className="nav-text">Back to Website</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon"><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'job-management' && <PostJob />}
        {activeTab === 'blog-approval' && <BlogApproval />}
        {activeTab === 'add-blog' && <AddCustomBlog />}
        
        {activeTab === 'add-admin' && (
          <div className="add-admin-form">
            <h3>Add New User</h3>
            
            {message && (
              <div className={`alert ${message.toLowerCase().includes('error') || message.toLowerCase().includes('fail') ? 'alert-error' : 'alert-success'}`}>
                {message}
              </div>
            )}

            <div className="post-job-card">
              <form onSubmit={handleAddAdmin}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="role-select"
                    >
                      <option value="author">Author</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit">Add {newUserRole === 'admin' ? 'Admin' : 'Author'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
