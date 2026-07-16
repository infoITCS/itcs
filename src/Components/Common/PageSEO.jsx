import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../config/seoMeta";

/**
 * Sets unique document title + meta description (and basic social tags) per page.
 */
const PageSEO = ({
  title,
  description,
  path = "",
  noindex = false,
  image,
}) => {
  const fullTitle = title?.includes("ITCS") ? title : `${title} | ITCS`;
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : path ? `/${path}` : "/"}`;
  const ogImage = image || `${SITE_URL}/favicon.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ITCS" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageSEO;
