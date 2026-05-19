import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import axios from 'axios'
import { apiUrl } from '../../../config/api'
import './AdminBlogDetail.scss'

const AdminCustomBlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(apiUrl('/api/custom-blogs/all'), {
          headers: { Authorization: `Bearer ${token}` }
        })
        const posts = res.data || []
        const found = posts.find(
          (item) => item._id === id || String(item.id) === String(id)
        )
        setBlog(found || null)
      } catch (err) {
        console.error('Error fetching custom blog:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  const handleReturn = () => {
    navigate('/admin/blogs')
  }

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Custom blog not found.</p>

  const title = blog.title || blog.headline || 'Untitled Custom Blog'
  const author =
    blog.author || blog.displayAuthor || blog.username || blog.user?.username || 'Unknown'
  const body = blog.content || blog.body || blog.description || '<p>No content available.</p>'
  const image = blog.featuredImage || blog.cover_image || blog.social_image || blog.image

  return (
    <div className="blog-detail">
      {image && (
        <img src={image} alt={title} className="detail-cover" />
      )}
      <h1>{title}</h1>
      <p className="author-name">Author: {author}</p>
      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
      />
      <div className="return-button-wrapper">
        <button className="return-btn" onClick={handleReturn}>
          ← Return to Blog Approval
        </button>
      </div>
    </div>
  )
}

export default AdminCustomBlogDetail
