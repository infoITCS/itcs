# Microsoft Solution Landing Pages — SEO Deliverables

## Scope

Five dedicated Microsoft solution-area landing pages (plus a hub), built **separate from the main ITCS website chrome** (no main Header/Footer). They use a Microsoft-aligned layout under `/microsoft/*`.

| Page | URL |
|------|-----|
| Hub | `/microsoft` |
| AI Workforce | `/microsoft/ai-workforce` |
| AI Business Process | `/microsoft/ai-business-process` |
| Security | `/microsoft/security` |
| Cloud & AI Platforms | `/microsoft/cloud-ai-platforms` |
| Surface | `/microsoft/surface` |

## Files in this folder

- `keyword-research.csv` — primary/secondary keywords and intent notes
- `SEO-Implementation-Summary.csv` — Excel-ready summary of all on-page SEO measures (open in Excel or Google Sheets)
- This document — narrative overview

## Per-page SEO implemented

### Meta & URLs

- Unique meta title and meta description per page (`PageSEO` + `seoMeta.js`)
- Canonical URLs via `https://www.itcs.com.pk` + path
- Clean, keyword-aligned URL slugs under `/microsoft/`
- Entries added to dynamic sitemap (`STATIC_SITEMAP_PATHS`)

### On-page structure

- One **H1** per page (solution-focused)
- **H2** sections: products, benefits, implementation, intent CTA, FAQs, related areas
- **H3** for each product, benefit, step, and FAQ question
- Primary + secondary keywords woven into titles, lead copy, product names, and FAQs
- Clear commercial CTAs with `?intent=` query params for Contact handoff

### Logos & accessibility

- ITCS logo, Microsoft logo, and solution-specific service mark on each page
- Alt text / `aria-label` on logo images and SVG marks

### Internal linking

- Hub links to all five pages
- Sub-nav across all Microsoft pages
- Related solution links at the bottom of each page
- Footer links among solution areas + Contact + Privacy
- Quiet link back to the main website (`/`)

### Schema markup

JSON-LD (`@graph`) on each solution page:

- `WebPage` + `Service` / `Organization`
- `BreadcrumbList`
- `FAQPage`

### Technical / UX SEO

- Separate layout reduces competing nav noise for these campaigns
- Lazy-loaded routes for page speed
- Sticky lightweight top bar + solution sub-nav
- Semantic sections, skip link, and FAQ `<details>` for usable content

## Product lists (highlighted on each page)

### AI Workforce

Microsoft 365 Copilot, Copilot Studio, Microsoft Teams, SharePoint & OneDrive, Microsoft Viva, Microsoft Graph

### AI Business Process

Power Automate, Power Apps, AI Builder, Dynamics 365, Power BI, Dataverse

### Security

Microsoft Defender XDR, Defender for Endpoint, Entra ID, Microsoft Sentinel, Microsoft Purview, Microsoft Intune

### Cloud & AI Platforms

Microsoft Azure, Azure OpenAI Service, Azure AI Foundry, Microsoft Fabric, Azure Arc, Azure Kubernetes Service

### Surface

Surface Laptop, Surface Pro, Surface Studio, Surface Hub, Surface Go / accessories, Windows Autopilot + Intune

## How to share with stakeholders

1. Open `SEO-Implementation-Summary.csv` in Excel → Save As `.xlsx` if required
2. Attach `keyword-research.csv`
3. Attach this markdown (or paste into Word)
