import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { apiUrl } from '../../config/api';
import { getAuthHeaders } from '../../config/authHeaders';

const coverCache = new Map();

export const primeBlogCovers = (covers = {}) => {
  Object.entries(covers).forEach(([id, src]) => {
    if (src) coverCache.set(id, src);
  });
};

const BlogCoverImage = ({
  blogId,
  title = '',
  featuredImage = null,
  hasCover = false,
  className = '',
  imgClassName = '',
  placeholderClassName = '',
  wrapClassName = '',
}) => {
  const containerRef = useRef(null);
  const [src, setSrc] = useState(() => featuredImage || coverCache.get(String(blogId)) || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (featuredImage) {
      coverCache.set(String(blogId), featuredImage);
      setSrc(featuredImage);
    }
  }, [blogId, featuredImage]);

  useEffect(() => {
    if (src || !hasCover) return undefined;

    const cached = coverCache.get(String(blogId));
    if (cached) {
      setSrc(cached);
      return undefined;
    }

    const el = containerRef.current;
    if (!el) return undefined;

    const loadCover = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl(`/api/custom-blogs/${blogId}/cover`), {
          headers: getAuthHeaders(),
        });
        const image = res.data?.featuredImage;
        if (image) {
          coverCache.set(String(blogId), image);
          setSrc(image);
        }
      } catch {
        // keep placeholder
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadCover();
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [blogId, hasCover, src]);

  const showPlaceholder = !src;

  return (
    <div ref={containerRef} className={`${wrapClassName} ${className}`.trim()}>
      {showPlaceholder ? (
        <div className={placeholderClassName || 'blog-cover-placeholder'}>
          <FontAwesomeIcon icon={faImage} />
          {loading && <span className="cover-loading-dot" />}
        </div>
      ) : (
        <img src={src} alt={title} className={imgClassName} loading="lazy" />
      )}
    </div>
  );
};

export default BlogCoverImage;
