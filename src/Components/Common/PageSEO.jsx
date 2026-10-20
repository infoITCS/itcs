import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../config/seoMeta";
import { siteSchema, breadcrumbSchema } from "../../config/structuredData";
import { buildCrumbs } from "../../config/breadcrumbs";

/**
 * Sets unique document title + meta description (and social tags) per page.
 *
 * `schema` is an optional Schema.org object; it is emitted as JSON-LD next to
 * the site-wide Organization/WebSite graph. Breadcrumbs are derived from the
 * path automatically, so deep pages get BreadcrumbList markup for free.
 */
const PageSEO = ({
  title,
  description,
  path = "",
  noindex = false,
  image,
  type = "website",
  schema,
  breadcrumbName,
  withBreadcrumbs = true,
}) => {
  const fullTitle = title?.includes("ITCS") ? title : `${title} | ITCS`;
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : path ? `/${path}` : "/"}`;
  // Fall back to the site logo rather than the 32px favicon so link previews
  // are not a blurry square.
  const ogImage = image || `${SITE_URL}/apple-touch-icon.png`;
  const crumbs = withBreadcrumbs && path && path !== "/" ? buildCrumbs(path, { lastName: breadcrumbName }) : null;

  return (
    <Helmet>
      <title data-rh="true">{fullTitle}</title>
      {description && <meta data-rh="true" name="description" content={description} />}
      <link data-rh="true" rel="canonical" href={canonical} />
      <meta
        data-rh="true"
        name="robots"
        content={
          noindex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta data-rh="true" property="og:type" content={type} />
      <meta data-rh="true" property="og:site_name" content="ITCS" />
      <meta data-rh="true" property="og:locale" content="en_PK" />
      <meta data-rh="true" property="og:title" content={fullTitle} />
      {description && <meta data-rh="true" property="og:description" content={description} />}
      <meta data-rh="true" property="og:url" content={canonical} />
      <meta data-rh="true" property="og:image" content={ogImage} />
      <meta data-rh="true" property="og:image:alt" content={fullTitle} />
      <meta data-rh="true" name="twitter:card" content="summary_large_image" />
      <meta data-rh="true" name="twitter:title" content={fullTitle} />
      {description && <meta data-rh="true" name="twitter:description" content={description} />}
      <meta data-rh="true" name="twitter:image" content={ogImage} />
      <script type="application/ld+json">{JSON.stringify(siteSchema())}</script>
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      {crumbs && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(crumbs))}</script>}
    </Helmet>
  );
};

export default PageSEO;
