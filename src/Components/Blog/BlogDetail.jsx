import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { apiUrl } from "../../config/api";
import { getBlogPostUrl, getTagUrl, getAuthorUrl, isDevToBlogId } from "../../utils/blogUrls";
import { formatPublishedBlog, normalizeBlogHtml } from "../../utils/blogFormat";
import PageSEO from "../Common/PageSEO";
import { blogSeoFromArticle, SEO_META } from "../../config/seoMeta";
import "./Blog.scss";
import "./BlogDetail.scss";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BlogDetail = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const postKey = slug || id;
  const [article, setArticle] = useState(null);
  const [customAuthor, setCustomAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const isCustomBlog = Boolean(slug) || (Boolean(id) && !isDevToBlogId(id));

  const cleanContent = (html) => {
    if (!html) return "";
    const stripWrapStyles = (node) => {
      if (node.style) {
        node.style.removeProperty("word-break");
        node.style.removeProperty("overflow-wrap");
        node.style.removeProperty("word-wrap");
        node.style.removeProperty("white-space");
        node.style.removeProperty("hyphens");
      }
    };
    DOMPurify.addHook("afterSanitizeAttributes", stripWrapStyles);
    const clean = DOMPurify.sanitize(normalizeBlogHtml(html));
    DOMPurify.removeHook("afterSanitizeAttributes");
    return clean;
  };

  useEffect(() => {
    if (!postKey) return;

    if (isCustomBlog) {
      fetchCustomBlog(postKey);
    } else {
      fetchDevToArticle(id);
    }
    fetchRelatedPosts();
  }, [id, slug, postKey, isCustomBlog]);

  const fetchRelatedPosts = async () => {
    try {
      const organization = "itcs11";
      const [devRes, approvedRes, customRes] = await Promise.all([
        fetch(`https://dev.to/api/organizations/${organization}/articles?per_page=50&_=${Date.now()}`),
        axios.get(apiUrl("/api/blogs/approved-ids")),
        axios.get(apiUrl("/api/custom-blogs/published"))
      ]);

      const devBlogs = await devRes.json();
      const approvedData = approvedRes.data;
      const customBlogs = customRes.data;
      const approvedIds = approvedData.map(item => item.devId);

      const allPosts = [
        ...devBlogs.filter(b => approvedIds.includes(b.id)).map(b => ({
          id: b.id,
          title: b.title,
          cover_image: b.cover_image || b.social_image,
          displayAuthor: b.user?.username || "Unknown",
          reading_time_minutes: b.reading_time_minutes || 1,
          isCustom: false,
          slug: b.id
        })),
        ...customBlogs.map(formatPublishedBlog).map(b => ({
          id: b.id,
          title: b.title,
          cover_image: b.cover_image,
          displayAuthor: b.displayAuthor,
          reading_time_minutes: b.reading_time_minutes,
          isCustom: true,
          slug: b.slug,
        })),
      ];

      const currentId = postKey;
      const filtered = allPosts.filter(p => String(p.id) !== String(currentId) && String(p.slug) !== String(currentId));
      
      // Shuffle and take 6
      setRelatedPosts(filtered.sort(() => 0.5 - Math.random()).slice(0, 6));
    } catch (err) {
      console.error("Error fetching related posts:", err);
    }
  };

  const fetchCustomBlog = async (blogSlug) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(apiUrl(`/api/custom-blogs/slug/${blogSlug}`));

      if (!res.data || !res.data.title) {
        setError("Blog post not found");
        setArticle(null);
        return;
      }

      const blog = res.data;
      setArticle({
        title: blog.title,
        body_html: blog.content,
        cover_image: blog.featuredImage,
        social_image: blog.ogImage,
        publishDate: blog.publishDate,
        reading_time_minutes: Math.ceil((blog.content || "").split(" ").length / 200),
        user: { name: blog.author },
        tag_list: blog.tags || [],
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription || blog.excerpt,
        description: blog.excerpt || blog.metaDescription,
        slug: blog.slug,
      });

      if (blog.author) setCustomAuthor(blog.author);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load blog post");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDevToArticle = async (articleId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://dev.to/api/articles/${articleId}`);
      const data = await res.json();

      if (!res.ok || data.error || !data.title) {
        setError(data.error || "Blog post not found");
        setArticle(null);
        return;
      }

      setArticle(data);

      const customRes = await fetch(apiUrl("/api/blogs/approved-ids"));
      const customData = await customRes.json();
      const match = customData.find((blog) => blog.devId === Number(articleId));
      if (match && match.customAuthor) setCustomAuthor(match.customAuthor);
    } catch (err) {
      setError("Failed to load blog post");
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail skeleton-wrapper">
        <PageSEO title={SEO_META.blog.title} description={SEO_META.blog.description} path={SEO_META.blog.path} />
        <div className="skeleton-cover"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-meta"></div>
        <div className="skeleton-body">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line w-70"></div>
          <br/>
          <div className="skeleton-line"></div>
          <div className="skeleton-line w-50"></div>
        </div>
      </div>
    );
  }
  
  if (error) return (
    <div className="blog-detail-error">
      <PageSEO title="Blog Not Found | ITCS" description={SEO_META.blog.description} path="/blog" noindex />
      <h2>Oops!</h2><p>{error}</p><Link to="/blog" className="back-btn">Go Back</Link>
    </div>
  );
  if (!article) return (
    <div className="blog-detail-not-found">
      <PageSEO title="Blog Not Found | ITCS" description={SEO_META.blog.description} path="/blog" noindex />
      <h2>Blog not found</h2><Link to="/blog" className="back-btn">Go Back</Link>
    </div>
  );

  const displayAuthor = customAuthor || article.user?.name || article.user?.username || "Unknown Author";
  const articleTags = (article.tag_list || article.tags || []).filter(Boolean);
  const postPath = getBlogPostUrl(article.slug ? { ...article, isCustom: true } : { ...article, id: postKey, isCustom: isCustomBlog });
  const seo = blogSeoFromArticle(article, postPath);

  return (
    <div className="blog-detail">
      <PageSEO
        title={seo.title}
        description={seo.description}
        path={seo.path}
        image={seo.image}
      />
      {article.cover_image && (
        <img src={article.cover_image} alt={article.title} className="detail-cover" />
      )}

      <h1 className="center-title">{article.title}</h1>

      <div className="blog-meta-modern center-meta">
        <div className="meta-item">
          <span className="meta-label">Author</span>
          <Link to={getAuthorUrl(displayAuthor)} className="meta-value author-link">
            {displayAuthor}
          </Link>
        </div>
        <div className="meta-divider"></div>
        <div className="meta-item">
          <span className="meta-label">Published on</span>
          <span className="meta-value">
            {article.readable_publish_date || 
             (article.publishDate ? new Date(article.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : 
             article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recently")}
          </span>
        </div>
        <div className="meta-divider"></div>
        <div className="meta-item">
          <span className="meta-label">Reading Time</span>
          <span className="meta-value">{article.reading_time_minutes || 1} min read</span>
        </div>
      </div>

      <div className="blog-body">
        {article.body_html ? (
          <div dangerouslySetInnerHTML={{ __html: cleanContent(article.body_html) }} />
        ) : (
          <p>No content available</p>
        )}

        {articleTags.length > 0 && (
          <div className="blog-detail-tags">
            <h3 className="tags-heading">Tags</h3>
            <div className="tags-list">
              {articleTags.map((tag) => (
                <Link
                  key={tag}
                  to={getTagUrl(tag)}
                  className="detail-tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="related-blogs-section">
            <h2 className="section-title">Related Articles</h2>
            
            <div className="carousel-container">
              {/* Custom Navigation Arrows outside Swiper */}
              <div className="swiper-nav-prev"></div>
              <div className="swiper-nav-next"></div>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  prevEl: '.swiper-nav-prev',
                  nextEl: '.swiper-nav-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="related-swiper"
              >
                {relatedPosts.map(post => (
                  <SwiperSlide key={post.id}>
                    <Link to={getBlogPostUrl(post)} className="modern-related-card">
                      <div className="card-img-wrap">
                        <img 
                          src={post.cover_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop"} 
                          alt={post.title} 
                        />
                        <div className="card-overlay"><span>Read Article</span></div>
                      </div>
                      <div className="card-content">
                        <h3>{post.title}</h3>
                        <div className="card-footer">
                          <span
                            className="related-author-link"
                            role="link"
                            tabIndex={0}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(getAuthorUrl(post.displayAuthor));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(getAuthorUrl(post.displayAuthor));
                              }
                            }}
                          >
                            {post.displayAuthor}
                          </span>
                          <div className="dot"></div>
                          <span>{post.reading_time_minutes || 1} min read</span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
