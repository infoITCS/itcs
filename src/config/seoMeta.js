/** Canonical site origin used for OG / canonical URLs */
export const SITE_URL = "https://www.itcs.com.pk";

/**
 * Unique Meta Title + Meta Description for every public page.
 * Titles stay under ~60 chars where practical; descriptions ~120–160 chars.
 * PageSEO appends " | ITCS" only when the title does not already contain "ITCS".
 */
export const SEO_META = {
  home: {
    path: "/",
    title: "ITCS | IT Solutions, Cloud & Cybersecurity in Pakistan",
    description:
      "ITCS delivers enterprise IT solutions across Pakistan — cloud, cybersecurity, networking, consulting, and managed services that help businesses modernize and grow.",
  },
  services: {
    path: "/services",
    title: "IT Services & Technology Solutions | ITCS",
    description:
      "Explore ITCS end-to-end IT services: cloud, cybersecurity, network solutions, IT consulting, enterprise systems, web development, and managed support.",
  },
  cloud: {
    path: "/cloud",
    title: "Cloud Solutions & Managed Cloud Services | ITCS",
    description:
      "Design, migrate, and secure your cloud with ITCS. Azure, AWS, and GCP expertise for scalable infrastructure and reliable managed cloud services in Pakistan.",
  },
  cloudDesign: {
    path: "/cloud/design",
    title: "Cloud Architecture & Design Services | ITCS",
    description:
      "Cloud architecture and design built for performance, cost efficiency, and security. ITCS designs scalable multi-cloud and hybrid environments for enterprises.",
  },
  cloudMigration: {
    path: "/cloud/migration",
    title: "Cloud Migration Services | ITCS Pakistan",
    description:
      "Move workloads to the cloud with minimal downtime. ITCS cloud migration experts plan, execute, and optimize enterprise migrations to Azure, AWS, and GCP.",
  },
  cloudSecurity: {
    path: "/cloud/security",
    title: "Cloud Security Solutions | ITCS",
    description:
      "Protect cloud workloads with ITCS cloud security services — identity, encryption, monitoring, compliance, and continuous threat defense for Azure, AWS, and GCP.",
  },
  cybersecurity: {
    path: "/cybersecurity",
    title: "Cybersecurity Services & Threat Protection | ITCS",
    description:
      "Defend your business with ITCS cybersecurity: assessments, monitoring, endpoint protection, and incident response tailored for Pakistani enterprises.",
  },
  securityAssessment: {
    path: "/cybersecurity/assessment",
    title: "Security Assessment & Vulnerability Testing | ITCS",
    description:
      "Identify gaps before attackers do. ITCS security assessments cover vulnerability analysis, risk reviews, and actionable remediation roadmaps.",
  },
  consulting: {
    path: "/consulting",
    title: "IT Consulting Services | ITCS Pakistan",
    description:
      "Strategic IT consulting from ITCS — technology roadmaps, digital transformation, infrastructure planning, and advisory for growing organizations in Pakistan.",
  },
  enterprise: {
    path: "/enterprise-solutions",
    title: "Enterprise IT Solutions | ITCS",
    description:
      "Enterprise-grade IT solutions from ITCS: systems integration, modernization, collaboration platforms, and scalable technology for large organizations.",
  },
  itServices: {
    path: "/it-services",
    title: "Managed IT Services & Support | ITCS",
    description:
      "Reliable managed IT services from ITCS — help desk, infrastructure support, monitoring, and proactive maintenance so your teams stay productive.",
  },
  network: {
    path: "/network-solutions",
    title: "Network Solutions & Infrastructure | ITCS",
    description:
      "Design, secure, and support enterprise networks with ITCS. LAN/WAN, wireless, SD-WAN, and resilient connectivity built for modern workplaces.",
  },
  networkDesign: {
    path: "/network-solutions/design",
    title: "Network Design & Architecture | ITCS",
    description:
      "ITCS network design services deliver high-availability, scalable architectures for offices, campuses, and multi-site enterprises across Pakistan.",
  },
  networkSecurity: {
    path: "/network-solutions/security",
    title: "Network Security Solutions | ITCS",
    description:
      "Secure your network perimeter and internal traffic with ITCS — firewalls, segmentation, VPNs, intrusion prevention, and continuous monitoring.",
  },
  networkSupport: {
    path: "/network-solutions/support",
    title: "Network Support & Managed Services | ITCS",
    description:
      "Keep networks running with ITCS managed network support — monitoring, troubleshooting, upgrades, and SLAs tailored to your infrastructure.",
  },
  webDevelopment: {
    path: "/web-development",
    title: "Web Development & Digital Solutions | ITCS",
    description:
      "Custom websites, web apps, and e-commerce by ITCS. Modern, SEO-friendly, and mobile-responsive development for businesses that need to grow online.",
  },
  missionVision: {
    path: "/mission-vision",
    title: "Our Vision & Mission | ITCS",
    description:
      "Discover ITCS vision and mission — empowering businesses through innovative technology, trusted partnerships, and excellence in IT services across Pakistan.",
  },
  about: {
    path: "/about-us",
    title: "About ITCS | Technology Partner in Pakistan",
    description:
      "Learn about ITCS — a Pakistan-based technology company delivering cloud, cybersecurity, networking, and consulting with a focus on people and results.",
  },
  contact: {
    path: "/contact",
    title: "Contact ITCS | Get in Touch",
    description:
      "Contact ITCS for IT solutions, demos, and support. Reach our Karachi team by phone, email, or the online form — we respond quickly to business inquiries.",
  },
  careers: {
    path: "/careers",
    title: "Careers at ITCS | Jobs & Openings",
    description:
      "Join ITCS. Explore open roles in technology, sales, and operations. Build your career with a growing IT solutions company in Pakistan.",
  },
  apply: {
    path: "/apply",
    title: "Apply for a Job at ITCS",
    description:
      "Submit your application to join ITCS. Share your experience and resume for open technology and professional roles across our teams.",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | ITCS",
    description:
      "Read the ITCS privacy policy to understand how we collect, use, and protect personal information when you use our website and services.",
  },
  blog: {
    path: "/blog",
    title: "ITCS Blog | Insights on Cloud, Security & IT",
    description:
      "Articles and insights from ITCS on cloud computing, cybersecurity, networking, digital transformation, and practical technology guidance for businesses.",
  },
  notFound: {
    path: "",
    title: "Page Not Found | ITCS",
    description:
      "The page you requested could not be found. Return to the ITCS homepage to explore our IT services, blog, and company information.",
    noindex: true,
  },
};

/** Build meta for a published blog post (CMS fields preferred). */
export const blogSeoFromArticle = (article, path = "") => {
  const title =
    article?.metaTitle ||
    (article?.title ? `${article.title} | ITCS Blog` : "Blog Post | ITCS");
  const description =
    article?.metaDescription ||
    article?.description ||
    article?.excerpt ||
    (article?.title
      ? `Read “${article.title}” on the ITCS blog — practical technology insights for businesses.`
      : SEO_META.blog.description);
  return {
    title,
    description: String(description).slice(0, 160),
    path,
    image: article?.cover_image || article?.social_image || article?.ogImage,
  };
};

/** Build meta for a job detail page. */
export const jobSeoFromJob = (job) => {
  const title = job?.title
    ? `${job.title} | Careers at ITCS`
    : SEO_META.careers.title;
  const location = job?.location ? ` in ${job.location}` : "";
  const description = job?.title
    ? `Apply for ${job.title}${location} at ITCS. View responsibilities, requirements, and apply online to join our technology team.`
    : SEO_META.careers.description;
  return {
    title,
    description: description.slice(0, 160),
    path: job ? `/careers/${job.slug || job._id}` : "/careers",
  };
};

/** Meta for tag / author filtered blog views. */
export const blogFilterSeo = ({ tag, tagLabel, authorSlug, authorLabel }) => {
  if (tag) {
    const label = tagLabel || tag.replace(/-/g, " ");
    const pretty = label.charAt(0).toUpperCase() + label.slice(1);
    return {
      title: `${pretty} Articles | ITCS Blog`,
      description: `Browse ITCS blog posts tagged “${pretty}” — cloud, security, networking, and technology insights for businesses.`,
      path: `/tag/${tag}`,
      noindex: true,
    };
  }
  if (authorSlug) {
    const label = authorLabel || authorSlug.replace(/-/g, " ");
    return {
      title: `Posts by ${label} | ITCS Blog`,
      description: `Read articles by ${label} on the ITCS blog — insights on IT services, cloud, cybersecurity, and digital transformation.`,
      path: `/author/${authorSlug}`,
      noindex: true,
    };
  }
  return SEO_META.blog;
};
