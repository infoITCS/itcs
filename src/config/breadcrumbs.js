/**
 * Human labels for breadcrumb generation, keyed by path segment.
 * Only real sections of the site appear here; dynamic segments (blog slugs,
 * job ids) are supplied by the caller instead.
 */

const SEGMENT_LABELS = {
  services: "Services",
  cloud: "Cloud",
  design: "Cloud Design",
  migration: "Cloud Migration",
  security: "Security",
  cybersecurity: "Cybersecurity",
  assessment: "Security Assessment",
  consulting: "IT Consulting",
  "enterprise-solutions": "Enterprise Solutions",
  "it-services": "IT Services",
  "network-solutions": "Network Solutions",
  "network-security": "Network Security",
  "network-support": "Network Support",
  "web-development": "Web Development",
  ai: "AI Services",
  microsoft: "Microsoft Solutions",
  "ai-workforce": "AI Workforce",
  "ai-business-process": "AI Business Process",
  "cloud-ai-platforms": "Cloud & AI Platforms",
  surface: "Microsoft Surface",
  "enterprise-ai-services": "Enterprise AI Services",
  "mission-vision": "Vision & Mission",
  "about-us": "About Us",
  contact: "Contact",
  careers: "Careers",
  "privacy-policy": "Privacy Policy",
  blog: "Blog",
};

/**
 * Turns a path into breadcrumb trail entries: [{name, path}].
 * `rootName` labels the homepage. The last crumb is always the current page.
 */
export const buildCrumbs = (path, { rootName = "Home", lastName } = {}) => {
  const clean = (path || "/").split("?")[0].replace(/\/+$/, "");
  if (!clean || clean === "") return [{ name: rootName, path: "/" }];

  const segments = clean.split("/").filter(Boolean);
  const crumbs = [{ name: rootName, path: "/" }];

  segments.forEach((seg, i) => {
    const isLast = i === segments.length - 1;
    const label =
      isLast && lastName
        ? lastName
        : SEGMENT_LABELS[seg] ||
          seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ name: label, path: "/" + segments.slice(0, i + 1).join("/") });
  });

  return crumbs;
};
