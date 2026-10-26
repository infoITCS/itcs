import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/api";
import { getBlogPostUrl } from "../../utils/blogUrls";
import { formatPublishedBlog } from "../../utils/blogFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faShieldHalved,
  faNetworkWired,
  faServer,
  faBrain,
  faComments,
  faArrowRight,
  faBookOpen,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import "./RelatedServicesAndInsights.scss";

// Core enterprise services matrix for strategic cross-linking
const ALL_SERVICES = [
  {
    path: "/cloud",
    title: "Cloud Solutions",
    subtitle: "Enterprise AWS, Azure & GCP",
    desc: "Cloud architecture, zero-downtime migration, and 24/7 managed cloud infrastructure in Pakistan.",
    icon: faCloud,
    tag: "Cloud",
  },
  {
    path: "/cloud/migration",
    title: "Cloud Migration",
    subtitle: "Zero-Downtime Workload Shift",
    desc: "Seamless database and server migration to Azure, AWS, and GCP with guaranteed data integrity.",
    icon: faCloud,
    tag: "Cloud",
  },
  {
    path: "/cybersecurity",
    title: "Cybersecurity Defense",
    subtitle: "24/7 SOC & Threat Defense",
    desc: "Proactive threat monitoring, endpoint security, and compliance tailored for Pakistani enterprises.",
    icon: faShieldHalved,
    tag: "Security",
  },
  {
    path: "/cybersecurity/assessment",
    title: "Security Assessment",
    subtitle: "Vulnerability & Pen Testing",
    desc: "Identify security gaps before attackers do with deep vulnerability audits and remediation.",
    icon: faShieldHalved,
    tag: "Security",
  },
  {
    path: "/network-solutions",
    title: "Network Solutions",
    subtitle: "High-Speed SD-WAN & LAN",
    desc: "Resilient LAN/WAN design, enterprise SD-WAN, and high-availability connectivity with 99.9% uptime.",
    icon: faNetworkWired,
    tag: "Network",
  },
  {
    path: "/it-services",
    title: "Managed IT Services",
    subtitle: "24/7 Enterprise IT Support",
    desc: "End-to-end IT helpdesk, infrastructure monitoring, SLA guarantees, and workstation maintenance.",
    icon: faServer,
    tag: "IT Services",
  },
  {
    path: "/consulting",
    title: "IT Consulting",
    subtitle: "Digital Transformation Advisory",
    desc: "Strategic IT roadmaps, system modernization, and digital transformation for enterprise growth.",
    icon: faComments,
    tag: "Consulting",
  },
  {
    path: "/ai",
    title: "Enterprise AI & Copilot",
    subtitle: "GenAI Readiness & Automation",
    desc: "Microsoft 365 Copilot deployment, private LLMs, and enterprise AI workflow automation.",
    icon: faBrain,
    tag: "AI",
  },
];

// Curated high-equity fallback articles for immediate bot crawlability
const STATIC_FALLBACK_ARTICLES = [
  {
    slug: "microsoft-365-copilot-guide-pakistan",
    title: "Microsoft 365 Copilot: The Complete Enterprise Adoption Guide",
    excerpt: "Discover how Pakistani organizations are boosting employee productivity with AI-driven Copilot automation.",
    author: "ITCS Cloud Team",
    reading_time_minutes: 6,
    tags: ["Microsoft 365", "AI"],
  },
  {
    slug: "zero-trust-cybersecurity-architecture-guide",
    title: "Implementing Zero Trust Cybersecurity for Enterprise Networks",
    excerpt: "Why traditional perimeter defense is obsolete and how to deploy Zero Trust architecture effectively.",
    author: "ITCS Security Operations",
    reading_time_minutes: 8,
    tags: ["Cybersecurity", "Zero Trust"],
  },
  {
    slug: "cloud-migration-strategies-aws-azure",
    title: "Enterprise Cloud Migration: AWS vs Azure vs GCP in Pakistan",
    excerpt: "Comparative analysis of cloud performance, regional data latencies, and total cost of ownership.",
    author: "ITCS Infrastructure Team",
    reading_time_minutes: 7,
    tags: ["Cloud", "AWS", "Azure"],
  },
];

const POPULAR_TAGS = [
  { name: "Cloud Computing", slug: "cloud" },
  { name: "Cybersecurity", slug: "cybersecurity" },
  { name: "Microsoft 365", slug: "microsoft-365" },
  { name: "Enterprise AI", slug: "artificial-intelligence" },
  { name: "Network Infrastructure", slug: "networking" },
  { name: "Managed IT", slug: "it-services" },
];

/**
 * Dynamic Internal Linking & Crawl-Depth Optimization Component.
 * Injects keyword-rich cross-links across Services, Blog Posts, and Categories.
 */
const RelatedServicesAndInsights = ({
  currentPath = "",
  heading = "Explore Related Enterprise Solutions & Insights",
  subheading = "Deepen your infrastructure, security, and digital capabilities with ITCS technical expertise.",
  showServices = true,
  showArticles = true,
  showTags = true,
}) => {
  const [recentArticles, setRecentArticles] = useState(STATIC_FALLBACK_ARTICLES);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestArticles = async () => {
      try {
        const res = await axios.get(apiUrl("/api/custom-blogs/published"), {
          timeout: 5000,
        });

        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          const formatted = res.data
            .slice(0, 3)
            .map(formatPublishedBlog)
            .map((b) => ({
              id: b.id,
              slug: b.slug,
              title: b.title,
              excerpt: b.metaDescription || b.excerpt || "Read technical insights on cloud and cybersecurity from ITCS.",
              author: b.displayAuthor || "ITCS Specialist",
              reading_time_minutes: b.reading_time_minutes || 5,
              tags: b.tags || ["Enterprise IT"],
            }));

          setRecentArticles(formatted);
        }
      } catch {
        // Retain STATIC_FALLBACK_ARTICLES so crawlers and users always have links
      }
    };

    if (showArticles) {
      fetchLatestArticles();
    }

    return () => {
      isMounted = false;
    };
  }, [showArticles]);

  // Filter out the current active page so we only provide new, cross-page links
  const relatedServices = ALL_SERVICES.filter(
    (s) => s.path !== currentPath && s.path !== `${currentPath}/`
  ).slice(0, 4);

  return (
    <section className="itcs-internal-linking-section" aria-label="Related ITCS Solutions and Insights">
      <div className="internal-linking-container">
        <header className="internal-linking-header">
          <span className="section-eyebrow">Enterprise Ecosystem</span>
          <h2 className="section-title">{heading}</h2>
          <p className="section-subheading">{subheading}</p>
        </header>

        {showServices && (
          <div className="services-crosslink-block">
            <div className="block-header">
              <h3>
                <FontAwesomeIcon icon={faServer} className="header-icon" /> Recommended Enterprise Services
              </h3>
              <Link to="/services" className="view-all-link">
                All Services <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="services-grid-internal">
              {relatedServices.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="service-link-card"
                  title={`Learn more about ${service.title}`}
                >
                  <div className="card-top">
                    <div className="service-icon-box">
                      <FontAwesomeIcon icon={service.icon} />
                    </div>
                    <span className="service-tag">{service.tag}</span>
                  </div>
                  <h4 className="service-card-title">{service.title}</h4>
                  <p className="service-card-subtitle">{service.subtitle}</p>
                  <p className="service-card-desc">{service.desc}</p>
                  <span className="card-cta">
                    Explore Solution <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {showArticles && (
          <div className="articles-crosslink-block">
            <div className="block-header">
              <h3>
                <FontAwesomeIcon icon={faBookOpen} className="header-icon" /> Latest Technical Insights &amp; Guides
              </h3>
              <Link to="/blog" className="view-all-link">
                Read All Insights <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="articles-grid-internal">
              {recentArticles.map((article) => {
                const articleUrl = getBlogPostUrl({ slug: article.slug, isCustom: true });
                return (
                  <article key={article.slug} className="article-link-card">
                    <Link to={articleUrl} className="article-card-anchor" title={article.title}>
                      <div className="article-meta-row">
                        <span className="article-author">{article.author}</span>
                        <span className="meta-dot">·</span>
                        <span className="article-read-time">{article.reading_time_minutes} min read</span>
                      </div>
                      <h4 className="article-card-title">{article.title}</h4>
                      <p className="article-card-excerpt">{article.excerpt}</p>
                      <span className="article-read-link">
                        Read Full Article <FontAwesomeIcon icon={faArrowRight} className="cta-arrow" />
                      </span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {showTags && (
          <div className="taxonomy-crosslink-block">
            <div className="taxonomy-label">
              <FontAwesomeIcon icon={faTags} className="tag-icon" />
              <span>Explore by Subject Area:</span>
            </div>
            <nav className="popular-tags-list" aria-label="Popular Topic Categories">
              {POPULAR_TAGS.map((tag) => (
                <Link
                  key={tag.slug}
                  to={`/tag/${tag.slug}`}
                  className="popular-tag-chip"
                  title={`View all articles tagged ${tag.name}`}
                >
                  #{tag.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedServicesAndInsights;
