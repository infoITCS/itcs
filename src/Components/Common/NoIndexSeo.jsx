import { Helmet } from "react-helmet-async";

/**
 * Routes that must never appear in search results. Kept as a prefix list so
 * nested admin screens (e.g. /admin/blog/edit/123) are covered automatically.
 */
const PRIVATE_PREFIXES = [
  "/admin",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/apply",
  "/careers/",
  "/tag/",
  "/author/",
];

const isPrivate = (pathname) =>
  PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p));

const PAGE_LABEL = {
  login: "Sign In",
  signup: "Sign Up",
  "forgot-password": "Forgot Password",
  "reset-password": "Reset Password",
  apply: "Job Application",
  admin: "Admin Portal",
};

/**
 * Guarantees a noindex directive and a unique title on utility/private routes
 * that do not render their own <PageSEO>. Without this they inherit the
 * homepage title and description and get indexed as thin duplicates.
 */
const NoIndexSeo = ({ pathname }) => {
  if (!isPrivate(pathname)) return null;

  const root = "/" + pathname.split("/").filter(Boolean)[0];
  const label = PAGE_LABEL[root.replace("/", "")] || "Private";
  const title = pathname.startsWith("/tag/") || pathname.startsWith("/author/")
    ? "ITCS Blog"
    : `${label} | ITCS`;

  const description =
    root === "/admin"
      ? "Private administration area for the ITCS content management system."
      : root === "/apply"
        ? "Private job application portal for ITCS candidates."
        : "Sign in to the ITCS client and team portal.";

  return (
    <Helmet>
      <title data-rh="true">{title}</title>
      <meta data-rh="true" name="robots" content="noindex, nofollow" />
      <meta data-rh="true" name="googlebot" content="noindex, nofollow" />
      <meta data-rh="true" name="description" content={description} />
      <link data-rh="true" rel="canonical" href={`https://www.itcs.com.pk${pathname}`} />
    </Helmet>
  );
};

export default NoIndexSeo;
