/** Compact brand marks for Microsoft solution pages (decorative + labeled). */

export const MicrosoftLogo = ({ className = '', title = 'Microsoft' }) => (
  <svg className={className} viewBox="0 0 23 23" width="28" height="28" role="img" aria-label={title}>
    <title>{title}</title>
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
)

export const CopilotLogo = ({ className = '', title = 'Microsoft Copilot' }) => (
  <svg className={className} viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={title}>
    <title>{title}</title>
    <defs>
      <linearGradient id="copilotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A4EF" />
        <stop offset="50%" stopColor="#7B83EB" />
        <stop offset="100%" stopColor="#D83B01" />
      </linearGradient>
    </defs>
    <path
      fill="url(#copilotGrad)"
      d="M24 4c-6 0-10 4-12 9-3-1-7 1-8 5-1 5 2 9 7 10 1 6 6 12 13 12s12-6 13-12c5-1 8-5 7-10-1-4-5-6-8-5-2-5-6-9-12-9zm0 6c4 0 7 3 8 7l1 4h4c2 0 3 2 3 4s-1 3-3 3h-5l-1 5c-1 4-4 7-7 7s-6-3-7-7l-1-5h-5c-2 0-3-1-3-3s1-4 3-4h4l1-4c1-4 4-7 8-7z"
    />
  </svg>
)

export const PowerPlatformLogo = ({ className = '', title = 'Microsoft Power Platform' }) => (
  <svg className={className} viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={title}>
    <title>{title}</title>
    <circle cx="24" cy="24" r="20" fill="#742774" />
    <path fill="#fff" d="M14 30V18l10 6 10-6v12l-10 6-10-6zm10-8.5L18 18l6-3.5L30 18l-6 3.5z" />
  </svg>
)

export const SecurityLogo = ({ className = '', title = 'Microsoft Security' }) => (
  <svg className={className} viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={title}>
    <title>{title}</title>
    <path
      fill="#D83B01"
      d="M24 4L8 10v12c0 11 7 18 16 22 9-4 16-11 16-22V10L24 4zm0 6l10 4v8c0 7-4 12-10 15-6-3-10-8-10-15v-8l10-4z"
    />
    <path fill="#F25022" d="M22 28l-4-4 2-2 2 2 6-6 2 2-8 8z" />
  </svg>
)

export const AzureLogo = ({ className = '', title = 'Microsoft Azure' }) => (
  <svg className={className} viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={title}>
    <title>{title}</title>
    <path fill="#0078D4" d="M18 8L6 38h10l4-8h14l-6-14H18zm12 0l-6 14h10L44 38H28L18 8h12z" />
  </svg>
)

export const SurfaceLogo = ({ className = '', title = 'Microsoft Surface' }) => (
  <svg className={className} viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={title}>
    <title>{title}</title>
    <rect x="8" y="10" width="32" height="22" rx="2" fill="#5C2D91" />
    <rect x="11" y="13" width="26" height="16" rx="1" fill="#E8E0F5" />
    <rect x="18" y="34" width="12" height="3" rx="1" fill="#5C2D91" />
    <rect x="14" y="37" width="20" height="2" rx="1" fill="#737373" />
  </svg>
)

export const SERVICE_LOGOS = {
  copilot: CopilotLogo,
  powerplatform: PowerPlatformLogo,
  security: SecurityLogo,
  azure: AzureLogo,
  surface: SurfaceLogo,
}
