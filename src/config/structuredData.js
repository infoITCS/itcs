/**
 * Schema.org JSON-LD builders.
 *
 * Every value here is taken from content that is actually visible on the site
 * (office addresses/phones in ContactMap.jsx, blog records from the CMS).
 * Nothing is invented, so the markup stays a true description of the page.
 */

export const SITE_URL = "https://www.itcs.com.pk";
export const SITE_NAME = "ITCS";

/** Offices exactly as listed on /contact. */
export const OFFICES = [
  {
    city: "Karachi",
    street: "6/K Block 2, P.E.C.H.S",
    phone: "+92-21-111-482-711",
  },
  {
    city: "Lahore",
    street: "Office No. 32, 1st Floor, I.T Tower, 73-E/1 Hali Rd, Block A Gulberg III",
    phone: "+92-42-378-74358",
  },
  {
    city: "Islamabad",
    street: "Office #14, Ground Floor, Malik Plaza, F-8 Markaz",
    phone: "+92-51-6145353",
  },
];

const abs = (p) => (p ? `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}` : SITE_URL + "/");

/** Absolute-URL helper for images; data: URIs are unusable in schema. */
const img = (value) => {
  if (!value || typeof value !== "string") return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("data:")) return null;
  return abs(value);
};

/** Organization + WebSite. Rendered once, site-wide. */
export const siteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/favicon.png`,
      email: "info@itcs.com.pk",
      description:
        "ITCS is a Pakistan-based IT solutions company delivering cloud, cybersecurity, networking, consulting, enterprise systems and managed services.",
      areaServed: { "@type": "Country", name: "Pakistan" },
      address: OFFICES.map((o) => ({
        "@type": "PostalAddress",
        streetAddress: o.street,
        addressLocality: o.city,
        addressCountry: "PK",
      })),
      contactPoint: OFFICES.map((o) => ({
        "@type": "ContactPoint",
        telephone: o.phone,
        contactType: "sales",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
});

/** BreadcrumbList. Pass [{name, path}] from root to the current page. */
export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

/** BlogPosting for a single article, built from its CMS record. */
export const blogPostingSchema = ({ article, path }) => {
  const image = img(article?.cover_image || article?.social_image || article?.ogImage);
  const datePublished = article?.publishDate || article?.createdAt;
  const dateModified = article?.updatedAt || datePublished;
  const authorName = article?.author || article?.authorName || article?.user?.name || article?.user?.username;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(path) },
    headline: String(article?.title || "").slice(0, 110),
    description: String(article?.excerpt || article?.description || article?.metaDescription || "").slice(0, 300),
    ...(image ? { image: [{ "@type": "ImageObject", url: image }] } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName ? { author: { "@type": "Person", name: String(authorName) } } : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
};

/** JobPosting for a single vacancy, built from its CMS record. */
export const jobPostingSchema = ({ job, path }) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job?.title || "Open role at ITCS",
  ...(job?.description ? { description: String(job.description).replace(/<[^>]*>/g, " ").slice(0, 4000) } : {}),
  datePosted: job?.createdAt || job?.datePosted,
  ...(job?.employmentType ? { employmentType: job.employmentType } : {}),
  hiringOrganization: { "@id": `${SITE_URL}/#organization` },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job?.location || "Karachi",
      addressCountry: "PK",
    },
  },
  ...(job?.url ? { url: job.url } : { url: abs(path) }),
});

/** FAQPage — only call this when the page really renders the same Q&A text. */
export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
