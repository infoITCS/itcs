/**
 * Content + SEO for Microsoft Solution Areas.
 * These pages are intentionally separate from the main ITCS site chrome.
 */

export const MS_SOLUTIONS_HUB = {
  path: '/microsoft',
  title: 'Microsoft Solutions & Enterprise AI | ITCS Certified Partner',
  description:
    'Explore ITCS Microsoft and enterprise AI solutions: AI Workforce, AI Business Process, Security, Cloud & AI Platforms, Surface, and Enterprise AI Services & Licensing.',
}

export const MS_SOLUTIONS = {
  'ai-workforce': {
    slug: 'ai-workforce',
    path: '/microsoft/ai-workforce',
    navLabel: 'AI Workforce',
    accent: '#0078D4',
    serviceBrand: 'Microsoft 365 Copilot',
    serviceLogoKey: 'copilot',
    h1: 'AI Workforce Solutions with Microsoft 365 Copilot',
    eyebrow: 'Microsoft Solution Area · AI Workforce',
    lead:
      'Empower every employee with secure, enterprise-ready AI. ITCS helps Pakistani organizations adopt Microsoft 365 Copilot so teams work faster, decide smarter, and stay compliant.',
    primaryCta: { label: 'Request a Copilot Demo', href: '/contact?intent=ai-workforce' },
    secondaryCta: { label: 'Talk to an Expert', href: '/contact?intent=ai-workforce' },
    intentBlock: {
      title: 'Ready to transform how your workforce works?',
      body: 'Whether you need a Copilot readiness assessment, licensing guidance, or a full rollout with change management — ITCS delivers end-to-end Microsoft AI Workforce adoption.',
    },
    primaryKeyword: 'Microsoft 365 Copilot Pakistan',
    secondaryKeywords: [
      'AI workforce solutions',
      'Microsoft Copilot for Microsoft 365',
      'Copilot Studio',
      'enterprise AI productivity',
      'ITCS Microsoft partner',
    ],
    metaTitle: 'Microsoft 365 Copilot & AI Workforce | ITCS',
    metaDescription:
      'Adopt Microsoft 365 Copilot with ITCS. AI Workforce solutions for secure productivity, Copilot Studio, and enterprise rollout across Pakistan.',
    headings: {
      h2Products: 'Microsoft products & services for AI Workforce',
      h2Benefits: 'Why organizations choose ITCS for Copilot',
      h2How: 'How we implement AI Workforce solutions',
      h2Faq: 'AI Workforce FAQs',
    },
    benefits: [
      {
        title: 'Secure by design',
        text: 'Copilot respects your Microsoft 365 permissions, sensitivity labels, and data boundaries — ITCS configures governance from day one.',
      },
      {
        title: 'Measurable productivity',
        text: 'From meeting summaries to document drafting, we align Copilot use cases to roles so ROI is clear for leadership.',
      },
      {
        title: 'Change that sticks',
        text: 'Training, champions programs, and adoption playbooks help your workforce actually use AI — not just license it.',
      },
    ],
    steps: [
      { title: 'Readiness & licensing', text: 'Assess Microsoft 365 tenancy, identity, data quality, and Copilot license strategy.' },
      { title: 'Secure enablement', text: 'Configure Purview, Entra, and sharing policies so Copilot stays within your compliance guardrails.' },
      { title: 'Pilot & scale', text: 'Run role-based pilots, measure outcomes, then scale with Copilot Studio agents where needed.' },
      { title: 'Adoption & support', text: 'Ongoing training, prompt libraries, and managed support from ITCS.' },
    ],
    products: [
      { name: 'Microsoft 365 Copilot', desc: 'AI assistant embedded in Word, Excel, PowerPoint, Outlook, and Teams.' },
      { name: 'Copilot Studio', desc: 'Build custom copilots and agents grounded in your business data.' },
      { name: 'Microsoft Teams', desc: 'Meetings, chat, and collaboration amplified by Copilot summaries and actions.' },
      { name: 'SharePoint & OneDrive', desc: 'Knowledge foundation Copilot uses under your existing access controls.' },
      { name: 'Microsoft Viva', desc: 'Employee experience insights that complement AI-driven ways of working.' },
      { name: 'Microsoft Graph', desc: 'Connects Copilot to organizational context across Microsoft 365.' },
    ],
    faqs: [
      {
        q: 'What is Microsoft AI Workforce?',
        a: 'AI Workforce focuses on helping employees work with AI tools like Microsoft 365 Copilot — securely, productively, and at scale.',
      },
      {
        q: 'Do we need Microsoft 365 E3/E5 to use Copilot?',
        a: 'Copilot requires eligible Microsoft 365 licenses plus Copilot add-on licensing. ITCS helps you map the right SKU mix for your tenants.',
      },
    ],
    related: ['ai-business-process', 'cloud-ai-platforms', 'security'],
  },

  'ai-business-process': {
    slug: 'ai-business-process',
    path: '/microsoft/ai-business-process',
    navLabel: 'AI Business Process',
    accent: '#107C10',
    serviceBrand: 'Power Platform & Dynamics 365',
    serviceLogoKey: 'powerplatform',
    h1: 'AI Business Process Automation with Microsoft',
    eyebrow: 'Microsoft Solution Area · AI Business Process',
    lead:
      'Reinvent operations with AI-powered workflows. ITCS designs and delivers Microsoft Power Platform and Dynamics 365 solutions that automate processes, reduce manual work, and put AI where your business runs.',
    primaryCta: { label: 'Start a Process Assessment', href: '/contact?intent=ai-business-process' },
    secondaryCta: { label: 'Book a Consultation', href: '/contact?intent=ai-business-process' },
    intentBlock: {
      title: 'Turn repetitive work into intelligent automation',
      body: 'From approvals and invoice processing to customer journeys in Dynamics 365 — tell us your bottleneck and we will map a Microsoft AI Business Process solution.',
    },
    primaryKeyword: 'Microsoft Power Platform automation Pakistan',
    secondaryKeywords: [
      'AI business process',
      'Power Automate',
      'Dynamics 365 Copilot',
      'Power Apps',
      'intelligent automation Microsoft',
    ],
    metaTitle: 'AI Business Process with Power Platform | ITCS',
    metaDescription:
      'Automate business processes with Microsoft Power Platform and Dynamics 365. ITCS delivers AI-powered workflows and apps for enterprises in Pakistan.',
    headings: {
      h2Products: 'Microsoft products for AI Business Process',
      h2Benefits: 'Business outcomes you can expect',
      h2How: 'Our delivery approach',
      h2Faq: 'AI Business Process FAQs',
    },
    benefits: [
      {
        title: 'Faster cycle times',
        text: 'Replace email-and-spreadsheet processes with Power Automate flows and AI Builder document intelligence.',
      },
      {
        title: 'Apps your teams own',
        text: 'Low-code Power Apps let business units iterate quickly while ITCS keeps architecture and ALM healthy.',
      },
      {
        title: 'CRM & ERP with Copilot',
        text: 'Dynamics 365 Copilot assists sellers, service agents, and finance teams with grounded recommendations.',
      },
    ],
    steps: [
      { title: 'Process discovery', text: 'Identify high-volume, high-pain workflows ready for automation or AI assist.' },
      { title: 'Solution blueprint', text: 'Select Power Platform, Dynamics 365, and Azure AI components with clear KPIs.' },
      { title: 'Build & integrate', text: 'Develop apps, flows, and copilots connected to Dataverse, SAP, or line-of-business systems.' },
      { title: 'Govern & improve', text: 'Center of Excellence patterns, monitoring, and continuous optimization with ITCS.' },
    ],
    products: [
      { name: 'Power Automate', desc: 'Cloud and desktop flows that orchestrate approvals, integrations, and RPA.' },
      { name: 'Power Apps', desc: 'Canvas and model-driven apps for custom business applications.' },
      { name: 'AI Builder', desc: 'Prebuilt and custom AI models for forms, invoices, and prediction scenarios.' },
      { name: 'Dynamics 365', desc: 'Sales, Customer Service, Finance, and Supply Chain with Copilot capabilities.' },
      { name: 'Power BI', desc: 'Analytics that close the loop between process automation and business insight.' },
      { name: 'Dataverse', desc: 'Secure data platform underpinning Power Platform and Dynamics solutions.' },
    ],
    faqs: [
      {
        q: 'What falls under Microsoft AI Business Process?',
        a: 'It covers intelligent automation across Power Platform, Dynamics 365, and related AI services that improve how work gets done end-to-end.',
      },
      {
        q: 'Can ITCS integrate with our existing ERP?',
        a: 'Yes. We commonly integrate Power Platform and Dynamics with SAP, Oracle, and custom APIs using connectors and Azure services.',
      },
    ],
    related: ['ai-workforce', 'cloud-ai-platforms', 'security'],
  },

  security: {
    slug: 'security',
    path: '/microsoft/security',
    navLabel: 'Security',
    accent: '#D83B01',
    serviceBrand: 'Microsoft Security',
    serviceLogoKey: 'security',
    h1: 'Microsoft Security Solutions for Modern Enterprises',
    eyebrow: 'Microsoft Solution Area · Security',
    lead:
      'Defend identity, endpoints, cloud, and data with Microsoft Security. ITCS implements Defender, Entra, Sentinel, and Purview so your organization stays resilient against evolving threats.',
    primaryCta: { label: 'Request a Security Review', href: '/contact?intent=microsoft-security' },
    secondaryCta: { label: 'Speak with Security Experts', href: '/contact?intent=microsoft-security' },
    intentBlock: {
      title: 'Strengthen your Zero Trust posture',
      body: 'Get a Microsoft Security assessment from ITCS — identify gaps in identity, endpoints, SIEM, and data protection, then prioritize a remediation roadmap.',
    },
    primaryKeyword: 'Microsoft Security solutions Pakistan',
    secondaryKeywords: [
      'Microsoft Defender',
      'Microsoft Sentinel',
      'Entra ID',
      'Zero Trust Microsoft',
      'Microsoft Purview',
    ],
    metaTitle: 'Microsoft Security & Zero Trust | ITCS',
    metaDescription:
      'Deploy Microsoft Defender, Entra ID, Sentinel, and Purview with ITCS. Enterprise security and Zero Trust solutions for organizations in Pakistan.',
    headings: {
      h2Products: 'Microsoft Security products we implement',
      h2Benefits: 'Why Microsoft Security with ITCS',
      h2How: 'How we harden your environment',
      h2Faq: 'Microsoft Security FAQs',
    },
    benefits: [
      {
        title: 'Unified threat protection',
        text: 'Correlate signals across email, endpoints, identities, and cloud apps with Microsoft Defender XDR.',
      },
      {
        title: 'Identity-first Zero Trust',
        text: 'Entra ID, Conditional Access, and Privileged Identity Management reduce credential-based risk.',
      },
      {
        title: 'Compliance-ready data controls',
        text: 'Purview sensitivity labels, DLP, and eDiscovery support regulatory and customer trust requirements.',
      },
    ],
    steps: [
      { title: 'Security baseline', text: 'Assess Microsoft 365 and Azure security score, identity posture, and logging gaps.' },
      { title: 'Architecture & licensing', text: 'Align Defender, Entra, Sentinel, and Purview SKUs to risk and budget.' },
      { title: 'Deploy & tune', text: 'Roll out protections, connect data sources, and reduce false positives with ITCS analysts.' },
      { title: 'Operate & respond', text: 'Managed detection patterns, playbooks, and incident response readiness.' },
    ],
    products: [
      { name: 'Microsoft Defender XDR', desc: 'Coordinated protection across endpoints, email, identities, and cloud apps.' },
      { name: 'Microsoft Defender for Endpoint', desc: 'EDR/XDR for Windows, macOS, Linux, iOS, and Android.' },
      { name: 'Microsoft Entra ID', desc: 'Identity, Conditional Access, MFA, and workload identities.' },
      { name: 'Microsoft Sentinel', desc: 'Cloud-native SIEM and SOAR for detection and response.' },
      { name: 'Microsoft Purview', desc: 'Data governance, DLP, retention, and insider risk management.' },
      { name: 'Microsoft Intune', desc: 'Endpoint management and compliance for Zero Trust device trust.' },
    ],
    faqs: [
      {
        q: 'Is Microsoft Security only for Microsoft 365?',
        a: 'No. While it integrates deeply with Microsoft 365, Defender, Sentinel, and Entra also protect hybrid and multi-cloud environments.',
      },
      {
        q: 'Can ITCS help with SOC and Sentinel?',
        a: 'Yes. We design Sentinel workspaces, connect sources, build analytics rules, and support operational runbooks.',
      },
    ],
    related: ['cloud-ai-platforms', 'ai-workforce', 'surface'],
  },

  'cloud-ai-platforms': {
    slug: 'cloud-ai-platforms',
    path: '/microsoft/cloud-ai-platforms',
    navLabel: 'Cloud & AI Platforms',
    accent: '#00BCF2',
    serviceBrand: 'Microsoft Azure',
    serviceLogoKey: 'azure',
    h1: 'Microsoft Cloud & AI Platforms on Azure',
    eyebrow: 'Microsoft Solution Area · Cloud & AI Platforms',
    lead:
      'Build, modernize, and scale on Microsoft Azure. ITCS delivers cloud foundations, Azure AI, data platforms, and hybrid architectures that power your next generation of applications.',
    primaryCta: { label: 'Plan Your Azure Roadmap', href: '/contact?intent=cloud-ai-platforms' },
    secondaryCta: { label: 'Get Cloud Advisory', href: '/contact?intent=cloud-ai-platforms' },
    intentBlock: {
      title: 'Migrate, modernize, or build AI on Azure',
      body: 'Share your workload goals — landing zone, migration, Azure OpenAI, or Microsoft Fabric — and ITCS will propose a practical Cloud & AI Platforms plan.',
    },
    primaryKeyword: 'Microsoft Azure AI platforms Pakistan',
    secondaryKeywords: [
      'Azure OpenAI',
      'Microsoft Fabric',
      'Azure cloud migration',
      'Cloud and AI platforms',
      'Azure landing zone',
    ],
    metaTitle: 'Azure Cloud & AI Platforms | ITCS',
    metaDescription:
      'Design and run Microsoft Azure Cloud & AI Platforms with ITCS — landing zones, Azure OpenAI, Fabric, and secure hybrid cloud for Pakistan enterprises.',
    headings: {
      h2Products: 'Microsoft Cloud & AI platform services',
      h2Benefits: 'Platform advantages with ITCS',
      h2How: 'How we deliver Azure platforms',
      h2Faq: 'Cloud & AI Platforms FAQs',
    },
    benefits: [
      {
        title: 'Enterprise landing zones',
        text: 'Secure, governed Azure foundations with identity, networking, and policy as code.',
      },
      {
        title: 'AI that is production-ready',
        text: 'Azure OpenAI and AI Foundry patterns with private networking, content safety, and cost controls.',
      },
      {
        title: 'Data that fuels decisions',
        text: 'Microsoft Fabric and Azure data services unify analytics for business and AI workloads.',
      },
    ],
    steps: [
      { title: 'Cloud strategy', text: 'Define workloads, compliance needs, and target Azure architecture.' },
      { title: 'Foundation build', text: 'Landing zones, connectivity, monitoring, and FinOps baselines.' },
      { title: 'Migrate & modernize', text: 'Move apps and data; containerize or refactor where value is highest.' },
      { title: 'AI & data enablement', text: 'Stand up Azure AI, Fabric, and MLOps with ITCS governance.' },
    ],
    products: [
      { name: 'Microsoft Azure', desc: 'Compute, networking, storage, and global cloud infrastructure.' },
      { name: 'Azure OpenAI Service', desc: 'Enterprise access to advanced language models with Azure controls.' },
      { name: 'Azure AI Foundry', desc: 'Build and orchestrate AI applications and agents at scale.' },
      { name: 'Microsoft Fabric', desc: 'Unified analytics platform for lakehouse, warehouse, and real-time data.' },
      { name: 'Azure Arc', desc: 'Extend Azure management and services to hybrid and multi-cloud.' },
      { name: 'Azure Kubernetes Service', desc: 'Managed Kubernetes for cloud-native modernization.' },
    ],
    faqs: [
      {
        q: 'What is the Cloud & AI Platforms solution area?',
        a: 'It covers Azure infrastructure, platform services, data analytics, and AI services that form the technical backbone for digital transformation.',
      },
      {
        q: 'Does ITCS support hybrid cloud?',
        a: 'Yes. We implement Azure Arc, hybrid networking, and identity patterns for on-premises and multi-cloud estates.',
      },
    ],
    related: ['ai-workforce', 'ai-business-process', 'security'],
  },

  surface: {
    slug: 'surface',
    path: '/microsoft/surface',
    navLabel: 'Surface',
    accent: '#5C2D91',
    serviceBrand: 'Microsoft Surface',
    serviceLogoKey: 'surface',
    h1: 'Microsoft Surface Devices for Modern Work',
    eyebrow: 'Microsoft Solution Area · Surface',
    lead:
      'Equip your workforce with Microsoft Surface — secure, manageable, and built for Microsoft 365. ITCS helps you select, deploy, and support Surface devices that match how your teams work.',
    primaryCta: { label: 'Request a Surface Quote', href: '/contact?intent=surface' },
    secondaryCta: { label: 'Schedule a Device Workshop', href: '/contact?intent=surface' },
    intentBlock: {
      title: 'Standardize on Surface with confidence',
      body: 'From executive Surface Laptop fleets to Surface Hub collaboration rooms — ITCS handles device selection, Autopilot enrollment, and lifecycle support.',
    },
    primaryKeyword: 'Microsoft Surface devices Pakistan',
    secondaryKeywords: [
      'Surface Laptop for business',
      'Surface Pro enterprise',
      'Surface Hub',
      'Windows Autopilot Surface',
      'ITCS Surface partner',
    ],
    metaTitle: 'Microsoft Surface for Business | ITCS',
    metaDescription:
      'Deploy Microsoft Surface devices with ITCS — Surface Laptop, Pro, Hub, and accessories with Autopilot, Intune, and Microsoft 365 readiness in Pakistan.',
    headings: {
      h2Products: 'Microsoft Surface products & services',
      h2Benefits: 'Why Surface for enterprise',
      h2How: 'How ITCS deploys Surface',
      h2Faq: 'Surface FAQs',
    },
    benefits: [
      {
        title: 'Built for Microsoft 365',
        text: 'Surface hardware is optimized for Teams, Copilot experiences, and all-day productivity.',
      },
      {
        title: 'Secure & manageable',
        text: 'Hardware-backed security, Windows Hello, and Intune/Autopilot simplify zero-touch provisioning.',
      },
      {
        title: 'One partner for devices & cloud',
        text: 'ITCS aligns Surface choices with your identity, security, and Copilot roadmap — not just hardware SKUs.',
      },
    ],
    steps: [
      { title: 'Workforce profiling', text: 'Match roles to Surface form factors — Laptop, Pro, Studio, or Hub.' },
      { title: 'Pilot hardware', text: 'Validate performance, accessories, and docking for real work scenarios.' },
      { title: 'Autopilot & Intune', text: 'Zero-touch enrollment, compliance policies, and app deployment.' },
      { title: 'Lifecycle support', text: 'Warranty coordination, refresh planning, and user enablement with ITCS.' },
    ],
    products: [
      { name: 'Surface Laptop', desc: 'Premium Windows laptops for knowledge workers and leaders.' },
      { name: 'Surface Pro', desc: 'Versatile 2-in-1 devices for field and hybrid work.' },
      { name: 'Surface Studio', desc: 'Creative workstation experiences for design and engineering teams.' },
      { name: 'Surface Hub', desc: 'Interactive collaboration displays for meeting rooms and Teams.' },
      { name: 'Surface Go / accessories', desc: 'Compact devices, pens, keyboards, and docks for complete kits.' },
      { name: 'Windows Autopilot + Intune', desc: 'Cloud provisioning and ongoing device management.' },
    ],
    faqs: [
      {
        q: 'Can Surface devices be managed with Intune?',
        a: 'Yes. Surface for Business deployments commonly use Windows Autopilot and Microsoft Intune for zero-touch setup and compliance.',
      },
      {
        q: 'Does ITCS help with Surface + Copilot readiness?',
        a: 'Absolutely. We align device specs, Windows versions, and Microsoft 365 configuration so Copilot experiences perform well.',
      },
    ],
    related: ['ai-workforce', 'security', 'cloud-ai-platforms'],
  },

  'enterprise-ai-services': {
    slug: 'enterprise-ai-services',
    path: '/microsoft/enterprise-ai-services',
    navLabel: 'Enterprise AI',
    accent: '#5B2C6F',
    serviceBrand: 'Enterprise AI Services',
    serviceLogoKey: 'enterpriseai',
    h1: 'Enterprise AI Services & Licensing for Secure Business Transformation',
    eyebrow: 'ITCS · Enterprise AI Services & Licensing',
    lead:
      'Give your leadership team a clear path from AI ambition to governed execution. ITCS helps CTOs, IT Directors, and operations leaders procure enterprise AI licenses — Microsoft Copilot, Claude, ChatGPT, Cursor, and others on requirement — implement Microsoft AI solutions, automate workflows, and protect corporate data with measurable adoption.',
    primaryCta: {
      label: 'Book an AI Strategy Call',
      href: '/contact?intent=enterprise-ai-services',
    },
    secondaryCta: {
      label: 'Request Licensing Quote',
      href: '/contact?intent=enterprise-ai-licensing',
    },
    intentBlock: {
      title: 'Ready to adopt AI without the risk?',
      body:
        'Whether you need official Copilot, Claude, or ChatGPT seats, Cursor for developers, additional AI tools on requirement, a Power Automate automation program, or governance that keeps your data out of public model training — ITCS is your enterprise AI partner from procurement to production.',
    },
    primaryKeyword: 'enterprise AI services Pakistan',
    secondaryKeywords: [
      'enterprise AI licensing',
      'Microsoft Copilot enterprise',
      'Claude Enterprise licensing',
      'ChatGPT Enterprise licensing',
      'Cursor AI code editor enterprise',
      'Power Automate AI Builder',
      'AI governance and data security',
      'AI readiness assessment',
    ],
    metaTitle: 'Enterprise AI Services & Licensing | ITCS',
    metaDescription:
      'Enterprise AI licensing for Microsoft Copilot, Claude, ChatGPT, Cursor, GitHub Copilot & more — plus Power BI, Power Automate, governance, automation, and training from ITCS Pakistan.',
    headings: {
      h2Products: 'Enterprise AI services & platforms we deliver',
      h2Benefits: 'Why executives choose ITCS for enterprise AI',
      h2How: 'How we take you from assessment to scaled adoption',
      h2Faq: 'Enterprise AI Services FAQs',
    },
    benefits: [
      {
        title: 'Licensing without procurement chaos',
        text: 'Centralized quoting, official seats, and consolidated billing for Microsoft Copilot, Claude Enterprise, ChatGPT Enterprise, Cursor, GitHub Copilot, and other approved AI tools on requirement — with one accountable partner.',
      },
      {
        title: 'AI that respects your data boundaries',
        text: 'We design zero-retention and isolation controls so corporate content is not used to train public LLMs, with governance your security and legal teams can defend.',
      },
      {
        title: 'Adoption that protects your ROI',
        text: 'Prompt workshops, Copilot onboarding, and Cursor enablement for developers ensure licenses are used — and business outcomes are visible to the C-suite.',
      },
    ],
    steps: [
      {
        title: 'AI readiness & ROI mapping',
        text: 'Audit infrastructure, identity, data quality, and use cases. Map expected value before you buy seats or build automations.',
      },
      {
        title: 'Secure licensing & governance',
        text: 'Procure the right SKUs, configure data isolation and retention policies, and align procurement, security, and IT ownership.',
      },
      {
        title: 'Implement & automate',
        text: 'Deploy Microsoft AI (Power BI, Power Automate, AI Builder), custom LLM wrappers, and agents for HR, finance, and IT support.',
      },
      {
        title: 'Train, measure, scale',
        text: 'Run adoption programs, track utilization, refine workflows, and expand licenses only where ROI is proven.',
      },
    ],
    products: [
      {
        name: 'Enterprise AI Licensing & Procurement',
        desc: 'Official seats for Microsoft Copilot (Microsoft 365, Sales, Security), Anthropic Claude Enterprise, OpenAI ChatGPT Enterprise / Team, Cursor, GitHub Copilot Business, Google Gemini for Workspace, Perplexity Enterprise, and other specialized AI tools on requirement — with centralized billing and ongoing support.',
      },
      {
        name: 'Microsoft Copilot Licensing',
        desc: 'Microsoft 365 Copilot, Copilot for Sales, and Copilot for Security — official enterprise seats with tenant readiness and rollout support.',
      },
      {
        name: 'Claude & ChatGPT Enterprise',
        desc: 'Anthropic Claude Enterprise and OpenAI ChatGPT Enterprise / Team procurement with governed workspace setup and data protection alignment.',
      },
      {
        name: 'Developer AI Tools',
        desc: 'Cursor and GitHub Copilot Business licensing with secure onboarding and developer adoption programs.',
      },
      {
        name: 'Additional AI Tools on Requirement',
        desc: 'Google Gemini for Workspace, Perplexity Enterprise, and other approved AI platforms sourced based on your security, compliance, and team requirements.',
      },
      {
        name: 'Microsoft AI Solutions',
        desc: 'Deep implementation of Power BI with AI-assisted predictive analytics and Power Automate with AI Builder for intelligent document processing and process automation.',
      },
      {
        name: 'AI Strategy & Readiness Assessments',
        desc: 'Infrastructure audits, ROI mapping, and data readiness evaluations so leadership invests in the right tools at the right time — before costly missteps.',
      },
      {
        name: 'Enterprise Data Security & AI Governance',
        desc: 'Data isolation, zero-retention policy setup, access controls, and contractual/technical safeguards so corporate data is never used to train public LLM models.',
      },
      {
        name: 'Custom AI Workflow Automation',
        desc: 'Intelligent workflows with Power Automate, custom LLM wrappers, and AI agents purpose-built for HR, finance, operations, and IT support.',
      },
      {
        name: 'Employee Adoption & Training',
        desc: 'Prompt engineering workshops, Copilot team onboarding, and developer enablement for Cursor — designed for high utilization and lasting behavior change.',
      },
      {
        name: 'AI Web & App Development Platforms',
        desc: 'Design and build AI-powered websites, portals, and mobile apps with LLM integrations, chat assistants, intelligent search, and data-grounded experiences.',
      },
    ],
    faqs: [
      {
        q: 'Which enterprise AI licenses can ITCS help procure?',
        a: 'We support enterprise procurement and centralized billing for Microsoft Copilot (Microsoft 365, Sales, and Security), Anthropic Claude Enterprise, OpenAI ChatGPT Enterprise / Team, Cursor, GitHub Copilot Business, Google Gemini for Workspace, Perplexity Enterprise, and other approved specialized AI tools on requirement based on your security and compliance needs.',
      },
      {
        q: 'How do you keep our data from training public AI models?',
        a: 'We configure enterprise plans and governance controls focused on data isolation and zero-retention where available, align tenant and vendor settings with your policies, and document the safeguards your security and legal stakeholders need for executive approval.',
      },
      {
        q: 'Do we need an assessment before buying Copilot or Claude seats?',
        a: 'Recommended. An AI readiness assessment clarifies identity, data quality, licensing fit, and high-ROI use cases — so you avoid shelfware and accelerate value after purchase.',
      },
      {
        q: 'Can you automate finance, HR, and IT support processes?',
        a: 'Yes. We build Power Automate and AI Builder solutions, plus custom LLM-assisted workflows and agents, for document-heavy and ticket-driven processes across HR, finance, and IT support.',
      },
    ],
    related: ['ai-workforce', 'ai-business-process', 'security', 'cloud-ai-platforms'],
  },
}

export const MS_SOLUTION_LIST = Object.values(MS_SOLUTIONS)
