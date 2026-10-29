import { formatSalary, hasSalary } from "../utils/jobFormat";

/** Canonical site origin used for OG / canonical URLs */
export const SITE_URL = "https://www.itcs.com.pk";

/**
 * Social-preview images must be absolute URLs — Facebook, X and LinkedIn all
 * ignore relative paths and data: URIs. CMS image fields come back as
 * "/uploads/..." (or a legacy data: URI), so normalise them here.
 */
export const toAbsoluteUrl = (value) => {
  if (!value || typeof value !== "string") return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("data:")) return null; // not usable as an og:image
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

/**
 * Unique Meta Title + Meta Description for every public page.
 * Titles stay under ~60 chars where practical; descriptions ~120–160 chars.
 * PageSEO appends " | ITCS" only when the title does not already contain "ITCS".
 */
export const SEO_META = {
  home: {
    path: "/",
    title: "ITCS | Leading Enterprise IT Solutions, Cloud & Cybersecurity in Pakistan",
    description:
      "Accelerate business growth with ITCS. Enterprise cloud migration, 24/7 cybersecurity defense, managed IT & high-speed network infrastructure across Pakistan. Consult our experts today!",
  },
  services: {
    path: "/services",
    title: "Enterprise IT Services & Technology Solutions in Pakistan | ITCS",
    description:
      "Explore ITCS end-to-end technology solutions: AWS/Azure Cloud, 24/7 Managed Cybersecurity, Network Architecture, IT Consulting & Enterprise AI in Pakistan. Discover our services.",
  },
  cloud: {
    path: "/cloud",
    title: "Managed Cloud Solutions & Cloud Architecture in Pakistan | ITCS",
    description:
      "Scale faster with certified Azure, AWS & GCP cloud architects in Pakistan. Enterprise cloud design, zero-downtime migration & 24/7 managed support. Request a free consultation!",
  },
  cloudDesign: {
    path: "/cloud/design",
    title: "Enterprise Cloud Architecture & Hybrid Design Services | ITCS",
    description:
      "Cost-efficient, high-availability multi-cloud architecture by certified engineers. Scalable hybrid & public cloud design for Pakistani enterprises. Get an architecture review.",
  },
  cloudMigration: {
    path: "/cloud/migration",
    title: "Zero-Downtime Cloud Migration Services in Pakistan | ITCS",
    description:
      "Seamless workload migration to AWS, Azure, & GCP with guaranteed zero data loss. Proven migration roadmaps & post-migration optimization. Talk to our migration specialists.",
  },
  cloudSecurity: {
    path: "/cloud/security",
    title: "Advanced Cloud Security Solutions & Threat Defense | ITCS",
    description:
      "Safeguard cloud workloads with multi-layer IAM, encryption, continuous compliance & real-time threat monitoring for Azure, AWS, and GCP. Secure your cloud today.",
  },
  cybersecurity: {
    path: "/cybersecurity",
    title: "Top Cybersecurity Services & 24/7 SOC Threat Defense in Pakistan | ITCS",
    description:
      "Protect critical business assets from ransomware and cyber threats. 24/7 SOC monitoring, endpoint defense, vulnerability assessments & incident response. Get protected now!",
  },
  securityAssessment: {
    path: "/cybersecurity/assessment",
    title: "Cybersecurity Vulnerability Assessment & Penetration Testing | ITCS",
    description:
      "Identify vulnerabilities before hackers do. Deep penetration testing, risk audits & actionable compliance roadmaps for businesses in Pakistan. Book an assessment.",
  },
  consulting: {
    path: "/consulting",
    title: "Strategic IT Consulting & Digital Transformation in Pakistan | ITCS",
    description:
      "Align technology with business growth. IT roadmap planning, digital transformation advisory & infrastructure modernization for enterprise leaders. Speak with a consultant.",
  },
  enterprise: {
    path: "/enterprise-solutions",
    title: "Enterprise IT Solutions & Systems Integration in Pakistan | ITCS",
    description:
      "Enterprise-grade IT systems integration, ERP/CRM modernization, unified communications & scalable infrastructure designed for mission-critical operations. Learn more.",
  },
  itServices: {
    path: "/it-services",
    title: "24/7 Managed IT Services & Proactive Enterprise Support | ITCS",
    description:
      "Minimize downtime with reliable managed IT services in Pakistan. Proactive monitoring, 24/7 IT helpdesk, workstation support & SLA guarantees. Contact us today.",
  },
  network: {
    path: "/network-solutions",
    title: "Enterprise Network Solutions & High-Speed SD-WAN in Pakistan | ITCS",
    description:
      "Build resilient, secure corporate networks. Enterprise SD-WAN, LAN/WAN infrastructure, campus wireless & 99.9% uptime connectivity. Upgrade your network today.",
  },
  networkDesign: {
    path: "/network-solutions/design",
    title: "High-Availability Network Design & Architecture Services | ITCS",
    description:
      "Custom network architecture designed for campuses, data centers & multi-branch enterprises across Pakistan. Low-latency, scalable routing & switching by ITCS experts.",
  },
  networkSecurity: {
    path: "/network-solutions/security",
    title: "Next-Gen Network Security & Firewall Solutions in Pakistan | ITCS",
    description:
      "Fortify internal and perimeter networks. Next-gen firewalls (Fortinet, Sophos), micro-segmentation, zero-trust VPNs & real-time intrusion prevention. Secure your network.",
  },
  networkSupport: {
    path: "/network-solutions/support",
    title: "Proactive Network Support & 24/7 Managed Infrastructure | ITCS",
    description:
      "Keep mission-critical networks running smoothly. 24/7 proactive monitoring, rapid incident troubleshooting, firmware lifecycle management & strict SLAs from ITCS.",
  },
  webDevelopment: {
    path: "/web-development",
    title: "Custom Web Development & Modern Enterprise Web Apps | ITCS",
    description:
      "High-performance custom web applications, enterprise portals & e-commerce solutions built with modern React, Node, and secure cloud backends. Build your web app with ITCS.",
  },
  ai: {
    path: "/ai",
    title: "Enterprise AI Solutions, Copilot & Generative AI in Pakistan | ITCS",
    description:
      "Deploy secure enterprise AI, Microsoft 365 Copilot, and custom GenAI automation. Strategy, governance, deployment & hands-on team enablement. Start your AI journey.",
  },
  missionVision: {
    path: "/mission-vision",
    title: "Our Vision & Mission | Empowering Digital Excellence | ITCS",
    description:
      "Discover the ITCS mission: empowering organizations across Pakistan and globally through innovative technology, trusted partnerships, and world-class IT execution.",
  },
  about: {
    path: "/about-us",
    title: "About ITCS | Trusted Enterprise Technology Partner in Pakistan",
    description:
      "Meet ITCS — Pakistan's premier IT solutions provider delivering enterprise cloud, cybersecurity, networking, and digital transformation for over two decades.",
  },
  contact: {
    path: "/contact",
    title: "Contact ITCS | Schedule a Free IT & Cloud Consultation",
    description:
      "Get in touch with ITCS experts in Karachi, Lahore, and Islamabad for IT solutions, security audits, cloud consulting, or enterprise support. Quick response guaranteed.",
  },
  careers: {
    path: "/careers",
    title: "Careers at ITCS | Join Our High-Impact Technology Team in Pakistan",
    description:
      "Explore exciting career opportunities in cloud engineering, cybersecurity, sales, and software development at ITCS. Shape the future of technology with us.",
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
  microsoftHub: {
    path: "/microsoft",
    title: "Microsoft Solutions & Enterprise AI | ITCS Certified Partner",
    description:
      "Explore ITCS Microsoft and enterprise AI solutions: AI Workforce, AI Business Process, Security, Cloud & AI Platforms, Surface, and Enterprise AI Services & Licensing.",
  },
  microsoftAiWorkforce: {
    path: "/microsoft/ai-workforce",
    title: "Microsoft 365 Copilot & AI Workforce | ITCS",
    description:
      "Adopt Microsoft 365 Copilot with ITCS. AI Workforce solutions for secure productivity, Copilot Studio, and enterprise rollout across Pakistan.",
  },
  microsoftAiBusinessProcess: {
    path: "/microsoft/ai-business-process",
    title: "AI Business Process with Power Platform | ITCS",
    description:
      "Automate business processes with Microsoft Power Platform and Dynamics 365. ITCS delivers AI-powered workflows and apps for enterprises in Pakistan.",
  },
  microsoftSecurity: {
    path: "/microsoft/security",
    title: "Microsoft Security & Zero Trust | ITCS",
    description:
      "Deploy Microsoft Defender, Entra ID, Sentinel, and Purview with ITCS. Enterprise security and Zero Trust solutions for organizations in Pakistan.",
  },
  microsoftCloudAiPlatforms: {
    path: "/microsoft/cloud-ai-platforms",
    title: "Azure Cloud & AI Platforms | ITCS",
    description:
      "Design and run Microsoft Azure Cloud & AI Platforms with ITCS — landing zones, Azure OpenAI, Fabric, and secure hybrid cloud for Pakistan enterprises.",
  },
  microsoftSurface: {
    path: "/microsoft/surface",
    title: "Microsoft Surface for Business | ITCS",
    description:
      "Deploy Microsoft Surface devices with ITCS — Surface Laptop, Pro, Hub, and accessories with Autopilot, Intune, and Microsoft 365 readiness in Pakistan.",
  },
  enterpriseAiServices: {
    path: "/microsoft/enterprise-ai-services",
    title: "Enterprise AI Services & Licensing | ITCS",
    description:
      "Enterprise AI licensing for Microsoft Copilot, Claude, ChatGPT and Cursor, plus Power BI, governance, automation and training from ITCS Pakistan.",
  },
  notFound: {
    path: "",
    title: "Page Not Found | ITCS",
    description:
      "The page you requested could not be found. Return to the ITCS homepage to explore our IT services, blog, and company information.",
    noindex: true,
  },
};

const stripHtml = (html) =>
  String(html || "")
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Build meta for a published blog post (CMS fields preferred with high-CTR fallback). */
export const blogSeoFromArticle = (article, path = "") => {
  const rawTitle = article?.metaTitle || article?.title;
  const title = rawTitle
    ? rawTitle.includes("ITCS") ? rawTitle : `${rawTitle} | ITCS Insights`
    : "Technology Insights & Engineering Articles | ITCS";

  const rawDesc =
    article?.metaDescription ||
    article?.description ||
    article?.excerpt ||
    (article?.title
      ? `Discover actionable strategies, technical architecture, and best practices in “${article.title}” from enterprise specialists at ITCS.`
      : SEO_META.blog.description);

  const cleanDesc = stripHtml(rawDesc);
  const truncatedDesc =
    cleanDesc.length > 158
      ? `${cleanDesc.slice(0, 155).trim()}...`
      : cleanDesc;

  return {
    title,
    description: truncatedDesc,
    path,
    image: toAbsoluteUrl(article?.cover_image || article?.social_image || article?.ogImage),
  };
};

/** Build meta for a job detail page. */
export const jobSeoFromJob = (job) => {
  const title = job?.title
    ? `${job.title} | Careers at ITCS`
    : SEO_META.careers.title;
  const location = job?.location ? ` in ${job.location}` : "";
  const salary = hasSalary(job) ? ` Salary: ${formatSalary(job)}.` : "";
  const description = job?.title
    ? `Apply for ${job.title}${location} at ITCS. View responsibilities, requirements, and apply online to join our technology team.${salary}`
    : SEO_META.careers.description;
  return {
    title,
    description: description.slice(0, 160),
    path: job ? `/careers/${job.slug || job._id}` : "/careers",
  };
};

/** Meta for tag / author filtered blog views. */
const toTitleCase = (str) =>
  String(str || "")
    .replace(/-/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

export const blogFilterSeo = ({ tag, tagLabel, authorSlug, authorLabel }) => {
  if (tag) {
    const rawLabel = tagLabel || tag.replace(/-/g, " ");
    const pretty = toTitleCase(rawLabel);
    return {
      title: `${pretty} Articles, Guides & Insights | ITCS Blog`,
      description: `Explore practical tutorials, enterprise architecture guides, and technical insights on ${pretty} from certified engineers at ITCS Pakistan.`,
      path: `/tag/${tag}`,
      noindex: false,
    };
  }
  if (authorSlug) {
    const label = authorLabel || authorSlug.replace(/-/g, " ");
    return {
      title: `Articles by ${label} | ITCS Expert Authors`,
      description: `Read technical articles and strategic IT commentary by ${label} on cloud architecture, cybersecurity, and digital infrastructure at ITCS.`,
      path: `/author/${authorSlug}`,
      noindex: false,
    };
  }
  return SEO_META.blog;
};
