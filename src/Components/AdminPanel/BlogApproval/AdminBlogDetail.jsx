import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { apiUrl } from '../../../config/api'
import './AdminBlogDetail.scss'

const AdminBlogDetail = ({ setActiveTab }) => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [customAuthor, setCustomAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  
  const passedCustomAuthor = location.state?.customAuthor

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://dev.to/api/articles/${id}`)
        const data = await res.json()
        setArticle(data)
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])
  useEffect(() => {
    const fetchCustomAuthor = async () => {
      if (passedCustomAuthor) {
        setCustomAuthor(passedCustomAuthor)
        return
      }
      try {
        const res = await fetch(apiUrl('/api/blogs/approved-ids'))
        const data = await res.json()
        const match = data.find(blog => blog.devId === Number(id))
        if (match && match.customAuthor) setCustomAuthor(match.customAuthor)
      } catch (err) {
        console.error('Error fetching custom author:', err)
      }
    }
    fetchCustomAuthor()
  }, [id, passedCustomAuthor])

  const handleReturn = () => {
    if (setActiveTab) setActiveTab('blog-approval')
    navigate('/admin/blogs')
  }

  if (loading) return <p>Loading...</p>
  if (!article) return <p>Article not found.</p>

  const displayAuthor = customAuthor || article.user?.name || article.user?.username || 'Unknown'

  return (
    <div className="blog-detail">
      {article.cover_image && (
        <img src={article.cover_image} alt={article.title} className="detail-cover" />
      )}
      <h1>{article.title}</h1>
      <p className="author-name">Author: {displayAuthor}</p>
      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body_html) }}
      />
      <div className="return-button-wrapper">
        <button className="return-btn" onClick={handleReturn}>
          ← Return to Blog Approval
        </button>
      </div>
    </div>
  )
}

export default AdminBlogDetail
