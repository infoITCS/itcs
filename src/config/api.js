const normalizeBaseUrl = (value) => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const isLocalhostBaseUrl = (value) => {
  if (!value) return false;

  try {
    const { hostname } = new URL(value);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
};

const configuredBaseUrl = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);
const canUseConfiguredBaseUrl =
  configuredBaseUrl &&
  !(import.meta.env.PROD && isLocalhostBaseUrl(configuredBaseUrl));

export const API_BASE_URL = canUseConfiguredBaseUrl
  ? configuredBaseUrl
  : import.meta.env.DEV
    ? ""
    : "";

export const apiUrl = (path = "") => {
  if (!path) return API_BASE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!API_BASE_URL) {
    return normalizedPath;
  }

  const baseEndsWithApi = /\/api$/i.test(API_BASE_URL);
  const pathStartsWithApi = /^\/api(?:\/|$)/i.test(normalizedPath);
  const dedupedPath =
    baseEndsWithApi && pathStartsWithApi
      ? normalizedPath.replace(/^\/api(?=\/|$)/i, "")
      : normalizedPath;

  return `${API_BASE_URL}${dedupedPath}`;
};
