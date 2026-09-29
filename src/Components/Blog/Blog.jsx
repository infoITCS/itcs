import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/api";
import { getAuthorUrl, getBlogPostUrl, getTagUrl, toUrlSlug } from "../../utils/blogUrls";
import { formatPublishedBlog, sortBlogsByDate } from "../../utils/blogFormat";
import BlogFilter from "./BlogFilter";
import PageSEO from "../Common/PageSEO";
import { SEO_META, blogFilterSeo } from "../../config/seoMeta";
import "./Blog.scss";

const SORTS = {
  newest: (a, b) => new Date(b.updatedAt || b.published_at) - new Date(a.updatedAt || a.published_at),
  oldest: (a, b) => new Date(a.updatedAt || a.published_at) - new Date(b.updatedAt || b.published_at),
  az: (a, b) => String(a.title).localeCompare(String(b.title)),
  za: (a, b) => String(b.title).localeCompare(String(a.title)),
  quickest: (a, b) => (a.reading_time_minutes || 0) - (b.reading_time_minutes || 0),
};

const RANGES = { week: 7, month: 30, quarter: 90, year: 365 };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { tagSlug: tagSlugParam, authorSlug: authorSlugParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const postsPerPage = 9;

  const legacyTag = searchParams.get("tag")?.trim() || "";
  const activeTagSlug = tagSlugParam || (legacyTag ? toUrlSlug(legacyTag) : "");
  const activeAuthorSlug = authorSlugParam || "";

  // Panel-level filters live in the query string so a filtered view is
  // shareable and survives a refresh / back button.
  const filters = {
    q: searchParams.get("q") || "",
    range: searchParams.get("range") || "",
    sort: searchParams.get("sort") || "newest",
  };

  const applyFilters = (patch) => {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams(searchParams);
    params.delete("tag"); // legacy param, superseded by /tag/:slug
    const set = (key, value) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };
    set("q", next.q);
    set("range", next.range);
    set("sort", next.sort === "newest" ? "" : next.sort);
    setSearchParams(params, { replace: true });
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const customRes = await axios.get(apiUrl("/api/custom-blogs/published")).catch(() => ({ data: [] }));
        const formatted = sortBlogsByDate(
          (customRes.data || []).map(formatPublishedBlog)
        );
        setPosts(formatted);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTagSlug, activeAuthorSlug, filters.q, filters.range, filters.sort]);

  if (!tagSlugParam && legacyTag) {
    return <Navigate to={`/tag/${toUrlSlug(legacyTag)}`} replace />;
  }

  const displayTag =
    posts
      .flatMap((post) => post.tag_list || [])
      .find((tag) => toUrlSlug(tag) === activeTagSlug) ||
    legacyTag ||
    activeTagSlug.replace(/-/g, " ");

  const displayAuthor =
    posts
      .map((post) => post.displayAuthor)
      .find((author) => toUrlSlug(author) === activeAuthorSlug) ||
    activeAuthorSlug.replace(/-/g, " ");

  const filteredPosts = posts.filter((post) => {
    if (activeTagSlug && !post.tag_list?.some((tag) => toUrlSlug(tag) === activeTagSlug)) return false;
    if (activeAuthorSlug && toUrlSlug(post.displayAuthor) !== activeAuthorSlug) return false;

    if (filters.range) {
      const days = RANGES[filters.range];
      const stamp = new Date(post.updatedAt || post.published_at).getTime();
      if (Number.isNaN(stamp) || stamp < Date.now() - days * 24 * 60 * 60 * 1000) return false;
    }

    const words = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length) {
      const haystack = [post.title, post.description, post.displayAuthor, ...(post.tag_list || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!words.every((word) => haystack.includes(word))) return false;
    }

    return true;
  });

  const sortedPosts = [...filteredPosts].sort(SORTS[filters.sort] || SORTS.newest);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // A shrink in results can leave the viewer stranded on a dead page.
  useEffect(() => {
    if (!loading && totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [loading, totalPages, currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const seo = activeTagSlug
    ? blogFilterSeo({ tag: activeTagSlug, tagLabel: displayTag })
    : activeAuthorSlug
      ? blogFilterSeo({ authorSlug: activeAuthorSlug, authorLabel: displayAuthor })
      : SEO_META.blog;

  const formatDate = (dateStr, isCustom = false) => {
    if (!dateStr) return "";
    if (typeof dateStr === "string" && !isCustom && isNaN(Date.parse(dateStr))) {
      return dateStr;
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const handleAuthorClick = (e, author) => {
    e.preventDefault();
    e.stopPropagation();
    if (author) navigate(getAuthorUrl(author));
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    if (tag) navigate(getTagUrl(tag));
  };

  const SkeletonCard = () => (
    <div className="blog-card skeleton-card">
      <div className="blog-cover-wrap skeleton-shimmer" style={{ height: "200px" }}></div>
      <div className="blog-card__content">
        <div className="skeleton-shimmer" style={{ height: "24px", width: "85%", marginBottom: "12px", borderRadius: "6px" }}></div>
        <div className="skeleton-shimmer" style={{ height: "14px", width: "60%", marginBottom: "16px", borderRadius: "4px" }}></div>
        <div className="skeleton-shimmer" style={{ height: "14px", width: "100%", marginBottom: "8px", borderRadius: "4px" }}></div>
        <div className="skeleton-shimmer" style={{ height: "14px", width: "90%", marginBottom: "8px", borderRadius: "4px" }}></div>
        <div className="skeleton-shimmer" style={{ height: "14px", width: "40%", borderRadius: "4px" }}></div>
      </div>
    </div>
  );

  const pageTitle = activeTagSlug
    ? `Blogs tagged “${displayTag}”`
    : activeAuthorSlug
      ? `Posts by ${displayAuthor}`
      : "Our Blogs";

  return (
    <div className="blog-public-container">
      <PageSEO
        title={seo.title}
        description={seo.description}
        path={seo.path}
        noindex={seo.noindex}
      />
      <h1 className="blog-public-title">{pageTitle}</h1>

      <BlogFilter
        posts={posts}
        filters={{ ...filters, total: sortedPosts.length }}
        onChange={applyFilters}
        onReset={resetFilters}
        loading={loading}
      />

      {(activeTagSlug || activeAuthorSlug) && (
        <div className="tag-filter-banner">
          {activeTagSlug && <span className="active-tag-chip">#{displayTag}</span>}
          {activeAuthorSlug && <span className="active-tag-chip">{displayAuthor}</span>}
          <Link to="/blog" className="clear-tag-filter">View all blogs</Link>
        </div>
      )}

      {loading ? (
        <div className="blog-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, idx) => (
                <Link key={post.id} to={getBlogPostUrl(post)} className="blog-card">
                  {(post.cover_image || post.social_image) && (
                    <div className="blog-cover-wrap">
                      <img
                        src={post.cover_image || post.social_image}
                        alt={post.title}
                        className="blog-cover"
                        // The first card is the LCP element; lazy-loading it
                        // was actively delaying the largest paint.
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        fetchPriority={idx === 0 ? 'high' : 'auto'}
                        decoding="async"
                      />
                    </div>
                  )}

                  <div className="blog-card__content">
                    <h3>{post.title}</h3>

                    <p className="meta">
                      <span
                        className="meta-author"
                        onClick={(e) => handleAuthorClick(e, post.displayAuthor)}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleAuthorClick(e, post.displayAuthor);
                        }}
                      >
                        {post.displayAuthor}
                      </span>
                      {" • "}
                      {formatDate(post.displayDate, post.isCustom)} • {post.reading_time_minutes} min read
                    </p>

                    <p className="description">{post.description}</p>

                    <div className="tags-small">
                      {post.tag_list?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="tag-link"
                          onClick={(e) => handleTagClick(e, tag)}
                          role="link"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleTagClick(e, tag);
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="read-more">Read more</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-posts">
                {activeTagSlug
                  ? `No blogs found for the tag “${displayTag}”.`
                  : activeAuthorSlug
                    ? `No blogs found for author “${displayAuthor}”.`
                    : "No blogs found."}
              </p>            )}
          </div>

          {totalPages > 1 && (
            <div className="modern-pagination">
              <button className="pagination-arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
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
                    pages.push(
                      <button key={1} className="page-number" onClick={() => paginate(1)}>
                        1
                      </button>
                    );
                    if (start > 2) pages.push(<span key="start-ellipsis" className="page-ellipsis">&hellip;</span>);
                  }

                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => paginate(i)}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (end < totalPages) {
                    if (end < totalPages - 1) pages.push(<span key="end-ellipsis" className="page-ellipsis">&hellip;</span>);
                    pages.push(
                      <button key={totalPages} className="page-number" onClick={() => paginate(totalPages)}>
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}
              </div>

              <button className="pagination-arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
