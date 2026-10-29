import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.itcs.com.pk';
const API_BASE = 'https://www.itcs.com.pk/api';

const STATIC_PATHS = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/cloud', changefreq: 'weekly', priority: '0.9' },
  { path: '/cloud/design', changefreq: 'monthly', priority: '0.8' },
  { path: '/cloud/migration', changefreq: 'monthly', priority: '0.8' },
  { path: '/cloud/security', changefreq: 'monthly', priority: '0.8' },
  { path: '/cybersecurity', changefreq: 'weekly', priority: '0.9' },
  { path: '/cybersecurity/assessment', changefreq: 'monthly', priority: '0.8' },
  { path: '/consulting', changefreq: 'monthly', priority: '0.8' },
  { path: '/enterprise-solutions', changefreq: 'monthly', priority: '0.8' },
  { path: '/it-services', changefreq: 'monthly', priority: '0.8' },
  { path: '/network-solutions', changefreq: 'monthly', priority: '0.8' },
  { path: '/network-solutions/design', changefreq: 'monthly', priority: '0.7' },
  { path: '/network-solutions/security', changefreq: 'monthly', priority: '0.7' },
  { path: '/network-solutions/support', changefreq: 'monthly', priority: '0.7' },
  { path: '/web-development', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/ai-workforce', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/ai-business-process', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/security', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/cloud-ai-platforms', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/surface', changefreq: 'weekly', priority: '0.9' },
  { path: '/microsoft/enterprise-ai-services', changefreq: 'weekly', priority: '0.9' },
  { path: '/mission-vision', changefreq: 'monthly', priority: '0.7' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/careers', changefreq: 'weekly', priority: '0.7' },
  { path: '/apply', changefreq: 'weekly', priority: '0.7' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
];

const xmlEscape = (str) =>
  String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const toDateOnly = (val) => {
  if (!val) return new Date().toISOString().slice(0, 10);
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
};

async function generate() {
  console.log('Generating sitemap...');

  const entries = new Map();

  STATIC_PATHS.forEach((p) => {
    entries.set(p.path, {
      loc: `${BASE_URL}${p.path === '/' ? '/' : p.path}`,
      lastmod: new Date().toISOString().slice(0, 10),
      changefreq: p.changefreq,
      priority: p.priority,
    });
  });

  // Fetch blogs
  try {
    const res = await axios.get(`${API_BASE}/custom-blogs/published`, { timeout: 15000 });
    const blogs = Array.isArray(res.data) ? res.data : [];
    console.log(`Fetched ${blogs.length} published blogs from API.`);
    blogs.forEach((b) => {
      if (!b?.slug) return;
      const cleanSlug = String(b.slug).replace(/^\/+/, '');
      const path = `/${cleanSlug}`;
      entries.set(path, {
        loc: `${BASE_URL}${path}`,
        lastmod: toDateOnly(b.updatedAt || b.publishDate || b.createdAt),
        changefreq: 'monthly',
        priority: '0.7',
      });
    });

    // Extract all unique blog tags
    const toUrlSlug = (val) =>
      String(val || '')
        .toLowerCase()
        .trim()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const tagSet = new Set();
    blogs.forEach((b) => {
      if (Array.isArray(b.tags)) {
        b.tags.forEach((t) => {
          const tagSlug = toUrlSlug(t);
          if (tagSlug) tagSet.add(tagSlug);
        });
      }
    });

    console.log(`Extracted ${tagSet.size} unique tags from blogs.`);
    tagSet.forEach((tagSlug) => {
      const path = `/tag/${tagSlug}`;
      entries.set(path, {
        loc: `${BASE_URL}${path}`,
        lastmod: new Date().toISOString().slice(0, 10),
        changefreq: 'weekly',
        priority: '0.6',
      });
    });
  } catch (err) {
    console.warn('Could not fetch blogs from live API:', err.message);
  }

  // Fetch jobs
  try {
    const res = await axios.get(`${API_BASE}/jobsAdd`, { timeout: 15000 });
    const jobs = Array.isArray(res.data) ? res.data : [];
    console.log(`Fetched ${jobs.length} jobs from API.`);
    jobs.forEach((j) => {
      const slug = j?.slug;
      if (!slug) return;
      const cleanSlug = String(slug).replace(/^\/+/, '');
      const path = `/careers/${cleanSlug}`;
      entries.set(path, {
        loc: `${BASE_URL}${path}`,
        lastmod: toDateOnly(j.updatedAt || j.createdAt),
        changefreq: 'weekly',
        priority: '0.6',
      });
    });
  } catch (err) {
    console.warn('Could not fetch jobs from live API:', err.message);
  }

  const urlElements = Array.from(entries.values()).map((e) => {
    return [
      '  <url>',
      `    <loc>${xmlEscape(e.loc)}</loc>`,
      `    <lastmod>${xmlEscape(e.lastmod)}</lastmod>`,
      `    <changefreq>${xmlEscape(e.changefreq)}</changefreq>`,
      `    <priority>${xmlEscape(e.priority)}</priority>`,
      '  </url>',
    ].join('\n');
  });

  const xmlContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlElements.join('\n'),
    '</urlset>\n',
  ].join('\n');

  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xmlContent, 'utf8');
  console.log(`Successfully written ${entries.size} URLs to ${publicSitemapPath}`);

  // Also if dist exists, update dist/sitemap.xml
  const distSitemapPath = path.join(__dirname, '../dist/sitemap.xml');
  if (fs.existsSync(path.join(__dirname, '../dist'))) {
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf8');
    console.log(`Successfully written ${entries.size} URLs to ${distSitemapPath}`);
  }

  // Ping Google to notify about updated sitemap
  try {
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`;
    await axios.get(googlePingUrl);
    console.log('Google sitemap ping successful');
  } catch (pingErr) {
    console.warn('Failed to ping Google sitemap:', pingErr.message);
  }

}

generate();
