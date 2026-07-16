# ITCS SEO Meta Titles & Descriptions

Reference for unique **meta titles** and **meta descriptions** on every public page of [www.itcs.com.pk](https://www.itcs.com.pk).

---

## How it works

| Piece | Path | Role |
|--------|------|------|
| Meta copy (source of truth) | `src/config/seoMeta.js` | All static titles & descriptions |
| Helmet wrapper | `src/Components/Common/PageSEO.jsx` | Sets `<title>`, description, canonical, Open Graph, Twitter |
| App provider | `src/main.jsx` | Wraps the app in `HelmetProvider` |
| Default HTML fallback | `index.html` | Base title/description before React hydrates |

**To change any static page’s SEO copy:** edit only `src/config/seoMeta.js`. Page components read from `SEO_META` — you do not need to edit each page for text updates.

Each page also gets:

- `rel="canonical"`
- Open Graph (`og:title`, `og:description`, `og:url`, `og:image`)
- Twitter card tags
- `robots` (`index, follow` by default; `noindex` where noted)

---

## Static pages

| URL | Page | Meta title | Meta description |
|-----|------|------------|------------------|
| `/` | Home | ITCS \| IT Solutions, Cloud & Cybersecurity in Pakistan | ITCS delivers enterprise IT solutions across Pakistan — cloud, cybersecurity, networking, consulting, and managed services that help businesses modernize and grow. |
| `/services` | Services hub | IT Services & Technology Solutions \| ITCS | Explore ITCS end-to-end IT services: cloud, cybersecurity, network solutions, IT consulting, enterprise systems, web development, and managed support. |
| `/cloud` | Cloud | Cloud Solutions & Managed Cloud Services \| ITCS | Design, migrate, and secure your cloud with ITCS. Azure, AWS, and GCP expertise for scalable infrastructure and reliable managed cloud services in Pakistan. |
| `/cloud/design` | Cloud Design | Cloud Architecture & Design Services \| ITCS | Cloud architecture and design built for performance, cost efficiency, and security. ITCS designs scalable multi-cloud and hybrid environments for enterprises. |
| `/cloud/migration` | Cloud Migration | Cloud Migration Services \| ITCS Pakistan | Move workloads to the cloud with minimal downtime. ITCS cloud migration experts plan, execute, and optimize enterprise migrations to Azure, AWS, and GCP. |
| `/cloud/security` | Cloud Security | Cloud Security Solutions \| ITCS | Protect cloud workloads with ITCS cloud security services — identity, encryption, monitoring, compliance, and continuous threat defense for Azure, AWS, and GCP. |
| `/cybersecurity` | Cybersecurity | Cybersecurity Services & Threat Protection \| ITCS | Defend your business with ITCS cybersecurity: assessments, monitoring, endpoint protection, and incident response tailored for Pakistani enterprises. |
| `/cybersecurity/assessment` | Security Assessment | Security Assessment & Vulnerability Testing \| ITCS | Identify gaps before attackers do. ITCS security assessments cover vulnerability analysis, risk reviews, and actionable remediation roadmaps. |
| `/consulting` | Consulting | IT Consulting Services \| ITCS Pakistan | Strategic IT consulting from ITCS — technology roadmaps, digital transformation, infrastructure planning, and advisory for growing organizations in Pakistan. |
| `/enterprise-solutions` | Enterprise | Enterprise IT Solutions \| ITCS | Enterprise-grade IT solutions from ITCS: systems integration, modernization, collaboration platforms, and scalable technology for large organizations. |
| `/it-services` | IT Services | Managed IT Services & Support \| ITCS | Reliable managed IT services from ITCS — help desk, infrastructure support, monitoring, and proactive maintenance so your teams stay productive. |
| `/network-solutions` | Network | Network Solutions & Infrastructure \| ITCS | Design, secure, and support enterprise networks with ITCS. LAN/WAN, wireless, SD-WAN, and resilient connectivity built for modern workplaces. |
| `/network-solutions/design` | Network Design | Network Design & Architecture \| ITCS | ITCS network design services deliver high-availability, scalable architectures for offices, campuses, and multi-site enterprises across Pakistan. |
| `/network-solutions/security` | Network Security | Network Security Solutions \| ITCS | Secure your network perimeter and internal traffic with ITCS — firewalls, segmentation, VPNs, intrusion prevention, and continuous monitoring. |
| `/network-solutions/support` | Network Support | Network Support & Managed Services \| ITCS | Keep networks running with ITCS managed network support — monitoring, troubleshooting, upgrades, and SLAs tailored to your infrastructure. |
| `/web-development` | Web Development | Web Development & Digital Solutions \| ITCS | Custom websites, web apps, and e-commerce by ITCS. Modern, SEO-friendly, and mobile-responsive development for businesses that need to grow online. |
| `/mission-vision` | Vision & Mission | Our Vision & Mission \| ITCS | Discover ITCS vision and mission — empowering businesses through innovative technology, trusted partnerships, and excellence in IT services across Pakistan. |
| `/about-us` | About Us | About ITCS \| Technology Partner in Pakistan | Learn about ITCS — a Pakistan-based technology company delivering cloud, cybersecurity, networking, and consulting with a focus on people and results. |
| `/contact` | Contact | Contact ITCS \| Get in Touch | Contact ITCS for IT solutions, demos, and support. Reach our Karachi team by phone, email, or the online form — we respond quickly to business inquiries. |
| `/careers` | Careers | Careers at ITCS \| Jobs & Openings | Join ITCS. Explore open roles in technology, sales, and operations. Build your career with a growing IT solutions company in Pakistan. |
| `/apply` | Apply Job | Apply for a Job at ITCS | Submit your application to join ITCS. Share your experience and resume for open technology and professional roles across our teams. **(noindex)** |
| `/privacy-policy` | Privacy Policy | Privacy Policy \| ITCS | Read the ITCS privacy policy to understand how we collect, use, and protect personal information when you use our website and services. |
| `/blog` | Blog index | ITCS Blog \| Insights on Cloud, Security & IT | Articles and insights from ITCS on cloud computing, cybersecurity, networking, digital transformation, and practical technology guidance for businesses. |
| *(404)* | Not Found | Page Not Found \| ITCS | The page you requested could not be found. Return to the ITCS homepage to explore our IT services, blog, and company information. **(noindex)** |

---

## Dynamic pages

These titles/descriptions are generated at runtime.

| URL pattern | Type | Meta title pattern | Meta description pattern | Notes |
|-------------|------|--------------------|--------------------------|--------|
| `/{blog-slug}` | Blog post | CMS `metaTitle`, or `{Post Title} \| ITCS Blog` | CMS `metaDescription` / excerpt (max 160 chars), or auto fallback from title | Set fields in Admin → Add/Edit Custom Blog |
| `/careers/{job-slug}` | Job detail | `{Job Title} \| Careers at ITCS` | `Apply for {Job Title} [in {location}] at ITCS…` | Built via `jobSeoFromJob()` |
| `/tag/{tag}` | Tag filter | `{Tag} Articles \| ITCS Blog` | Browse posts tagged “{Tag}”… | **noindex** (thin listing) |
| `/author/{author}` | Author filter | `Posts by {Author} \| ITCS Blog` | Read articles by {Author}… | **noindex** (thin listing) |

### Blog CMS fields (admin)

When publishing a custom blog, fill:

- **Meta Title** (recommended 10–60 characters)
- **Meta Description** (recommended 50–160 characters)

These are applied on the public post page via `blogSeoFromArticle()` in `seoMeta.js`.

---

## Length guidelines

| Field | Ideal | Soft max |
|-------|--------|----------|
| Meta title | ≤ 60 characters | ≤ 70 |
| Meta description | 120–155 characters | ≤ 160 |

Google may truncate longer titles/descriptions in search results.

---

## Adding SEO to a new page

1. Add an entry to `SEO_META` in `src/config/seoMeta.js` (`path`, `title`, `description`).
2. In the page component:

```jsx
import PageSEO from "../Common/PageSEO";
import { SEO_META } from "../../config/seoMeta";

const seo = SEO_META.yourKey;

return (
  <>
    <PageSEO title={seo.title} description={seo.description} path={seo.path} />
    {/* page content */}
  </>
);
```

3. Update this README with the new URL row.

For `noindex` pages:

```jsx
<PageSEO title={...} description={...} path={...} noindex />
```

---

## Related SEO files

| File | Purpose |
|------|---------|
| `public/sitemap.xml` | XML sitemap (expand with all public URLs for Google) |
| `public/robots.txt` | Crawler rules + sitemap URL |
| `src/config/seoMeta.js` | Titles, descriptions, helpers |
| `src/Components/Common/PageSEO.jsx` | Helmet / head tags |

---

## Site origin

Canonical and social URLs use:

```text
https://www.itcs.com.pk
```

Defined as `SITE_URL` in `src/config/seoMeta.js`.
