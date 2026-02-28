/* eslint-disable @next/next/no-img-element */
import megaServiceCategories from '../../../lib/data/megaServices';
import ServicesHero from './components/servicesHero';

function humanizeSlug(slug = '') {
	return slug
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase())
		.trim();
}

const featurePresets = {
	default: [
		{ title: 'Responsive Experiences', desc: 'Interfaces that adapt elegantly across mobile, tablet, and desktop.', icon: ResponsiveIcon },
		{ title: 'Custom Development', desc: 'Tailored builds aligned to your workflows, integrations, and KPIs.', icon: CodeIcon },
		{ title: 'Integration Ready', desc: 'APIs, webhooks, and data syncs to connect your stack end-to-end.', icon: IntegrationIcon },
		{ title: 'Performance & SEO', desc: 'Core Web Vitals optimization to keep pages fast and discoverable.', icon: SpeedIcon },
		{ title: 'Security & Compliance', desc: 'Best practices for auth, monitoring, and data protection.', icon: ShieldIcon },
		{ title: 'Ongoing Support', desc: 'Runbooks, alerts, and dedicated channels post-launch.', icon: SupportIcon },
	],
	web: [
		{ title: 'Responsive UI', desc: 'Component-driven layouts that stay sharp on every device.', icon: ResponsiveIcon },
		{ title: 'Headless & CMS', desc: 'Content workflows powered by headless or traditional CMS.', icon: ContentIcon },
		{ title: 'Conversion Focused', desc: 'UX patterns tuned for signups, demos, and sales.', icon: SparkIcon },
		{ title: 'Performance Budgets', desc: 'Budgets, monitoring, and caching built-in for speed.', icon: SpeedIcon },
		{ title: 'Security & Compliance', desc: 'Hardened auth, role models, and secure deployments.', icon: ShieldIcon },
		{ title: 'Analytics Ready', desc: 'Event tracking, A/B testing hooks, and dashboards.', icon: AnalyticsIcon },
	],
	app: [
		{ title: 'Cross-Platform Builds', desc: 'React Native or web to reach users on any device.', icon: ResponsiveIcon },
		{ title: 'Offline & Sync', desc: 'Reliable state, caching, and background sync for mobile.', icon: IntegrationIcon },
		{ title: 'API Architecture', desc: 'Robust APIs, auth flows, and observability baked in.', icon: CodeIcon },
		{ title: 'Quality Engineering', desc: 'Automated testing, release gating, and crash analytics.', icon: AutomationIcon },
		{ title: 'Performance', desc: 'Startup, bundle, and interaction speed tuned continuously.', icon: SpeedIcon },
		{ title: 'Security', desc: 'Secure storage, transport, and permissions by default.', icon: ShieldIcon },
	],
	design: [
		{ title: 'Research & Discovery', desc: 'Workshops, user interviews, and journey mapping.', icon: DesignIcon },
		{ title: 'Prototypes', desc: 'Interactive prototypes to validate flows early.', icon: SparkIcon },
		{ title: 'Design Systems', desc: 'Token-driven systems for consistent UI at scale.', icon: ContentIcon },
		{ title: 'Accessibility', desc: 'Inclusive experiences meeting WCAG 2.1 AA.', icon: AccessibilityIcon },
		{ title: 'Handoff Ready', desc: 'Detailed specs and assets for engineering.', icon: IntegrationIcon },
		{ title: 'Motion & Microcopy', desc: 'Delightful motion and on-brand language.', icon: ResponsiveIcon },
	],
	data: [
		{ title: 'Data Pipelines', desc: 'Ingest, transform, and deliver trusted data.', icon: IntegrationIcon },
		{ title: 'Dashboards & BI', desc: 'Self-serve insights with governed metrics.', icon: AnalyticsIcon },
		{ title: 'Data Governance', desc: 'Cataloging, lineage, and quality monitoring.', icon: ShieldIcon },
		{ title: 'ML Ops Ready', desc: 'Feature stores, model registry, and CI/CD for ML.', icon: SparkIcon },
		{ title: 'Scalable Warehousing', desc: 'Cloud warehouses tuned for performance and cost.', icon: CloudIcon },
		{ title: 'Compliance', desc: 'Policies for privacy, retention, and audits.', icon: SupportIcon },
	],
	ai: [
		{ title: 'Use-Case Design', desc: 'Identify high-value AI tasks and success metrics.', icon: SparkIcon },
		{ title: 'Model Strategy', desc: 'Select, fine-tune, or hybridize foundation models.', icon: AnalyticsIcon },
		{ title: 'Guardrails & Safety', desc: 'Policies, filters, and evaluations to reduce risk.', icon: ShieldIcon },
		{ title: 'Integrations', desc: 'APIs, RAG pipelines, and tool use wired into your stack.', icon: IntegrationIcon },
		{ title: 'Observability', desc: 'Tracing, feedback, and continuous evaluation loops.', icon: SupportIcon },
		{ title: 'Performance & Cost', desc: 'Caching, batching, and routing to stay fast and lean.', icon: SpeedIcon },
	],
	commerce: [
		{ title: 'Storefront UX', desc: 'Fast, conversion-led storefronts and landing funnels.', icon: CartIcon },
		{ title: 'Payments & Checkout', desc: 'Secure, streamlined checkout with preferred gateways.', icon: ShieldIcon },
		{ title: 'Catalog & Search', desc: 'Rich catalog management with performant search.', icon: AnalyticsIcon },
		{ title: 'Automation', desc: 'Workflows for orders, inventory, and fulfillment.', icon: AutomationIcon },
		{ title: 'Marketing Ops', desc: 'Personalization, CRM, and lifecycle campaigns.', icon: SparkIcon },
		{ title: 'Analytics', desc: 'Attribution, A/B testing, and revenue dashboards.', icon: SpeedIcon },
	],
	cloud: [
		{ title: 'Architecture', desc: 'Well-architected reviews and target state designs.', icon: CloudIcon },
		{ title: 'Migration', desc: 'Plan, migrate, and modernize with minimal downtime.', icon: IntegrationIcon },
		{ title: 'Cost Optimization', desc: 'Rightsizing, savings plans, and autoscaling policies.', icon: AnalyticsIcon },
		{ title: 'Reliability', desc: 'Resilience patterns, backups, and DR strategy.', icon: ShieldIcon },
		{ title: 'Observability', desc: 'Logging, metrics, and tracing built in.', icon: SupportIcon },
		{ title: 'Infra as Code', desc: 'Repeatable environments with Terraform/ARM.', icon: AutomationIcon },
	],
	ops: [
		{ title: 'CI/CD', desc: 'Pipelines with automated testing and policy gates.', icon: AutomationIcon },
		{ title: 'Environment Strategy', desc: 'Stable lower envs, feature flags, and rollbacks.', icon: IntegrationIcon },
		{ title: 'Quality Engineering', desc: 'Test suites, coverage dashboards, and chaos drills.', icon: ShieldIcon },
		{ title: 'Release Management', desc: 'Canary, blue-green, and safe migrations.', icon: CloudIcon },
		{ title: 'Monitoring', desc: 'SLIs/SLOs with alerting and runbooks.', icon: SupportIcon },
		{ title: 'Performance', desc: 'Load testing, profiling, and tuning.', icon: SpeedIcon },
	],
	support: [
		{ title: '24/7 Coverage', desc: 'Follow-the-sun support with clear SLAs.', icon: SupportIcon },
		{ title: 'Incident Response', desc: 'Runbooks, on-call, and post-incident reviews.', icon: ShieldIcon },
		{ title: 'Proactive Monitoring', desc: 'Health checks, uptime, and anomaly alerts.', icon: AnalyticsIcon },
		{ title: 'Patch & Upgrade', desc: 'Security updates and dependency hygiene.', icon: AutomationIcon },
		{ title: 'Capacity Planning', desc: 'Scalability reviews before peak events.', icon: CloudIcon },
		{ title: 'Reporting', desc: 'Monthly insights and optimization plans.', icon: SpeedIcon },
	],
	consulting: [
		{ title: 'Discovery & Strategy', desc: 'Workshops to align objectives, KPIs, and risks.', icon: DesignIcon },
		{ title: 'Roadmaps', desc: 'Prioritized delivery plans with budgets and timelines.', icon: IntegrationIcon },
		{ title: 'Platform Audits', desc: 'Architecture, security, and performance reviews.', icon: ShieldIcon },
		{ title: 'Change Management', desc: 'Governance, training, and adoption plans.', icon: SupportIcon },
		{ title: 'Vendor Selection', desc: 'Tooling evaluations and proof-of-value pilots.', icon: AnalyticsIcon },
		{ title: 'Enablement', desc: 'Playbooks and coaching for internal teams.', icon: SparkIcon },
	],
};

const serviceCatalog = {
	'web-development': {
		heroTitle: 'Web experiences engineered for speed, clarity, and conversion.',
		heroDescription: 'Design, build, and optimize modern web platforms that stay fast, secure, and simple to manage—whether you are launching or scaling.',
		about: [
			'We craft bespoke web products that marry thoughtful design with robust engineering. Component-driven development and clear content strategy help you launch quickly and iterate with confidence.',
			'From marketing sites to complex applications, we prioritize accessibility, performance, and maintainability—so your team can grow without friction.',
		],
		highlights: ['Security-first builds', 'Optimized for Core Web Vitals', 'Analytics-ready from day one'],
		preset: 'web',
	},
	'app-development': {
		heroTitle: 'Cross-platform applications that feel native everywhere.',
		heroDescription: 'We design and ship performant mobile and web apps with offline resilience, secure auth, and delightful UX.',
		preset: 'app',
		highlights: ['Offline-first patterns', 'Secure auth and API design', 'Release automation built-in'],
	},
	'custom-software': {
		heroTitle: 'Custom software that matches how your business truly works.',
		heroDescription: 'We translate complex workflows into intuitive tools with scalable architectures and measurable outcomes.',
		preset: 'default',
		highlights: ['Workflow automation', 'Integration-first mindset', 'Scalable and secure foundations'],
	},
	'ui-ux-design': {
		heroTitle: 'Product design that is usable, inclusive, and on-brand.',
		heroDescription: 'Research, prototype, and design systems that accelerate teams and delight customers.',
		preset: 'design',
		highlights: ['Research-driven', 'Design systems', 'Accessibility by default'],
	},
	'digital-consulting': {
		heroTitle: 'Strategic consulting to de-risk and accelerate delivery.',
		heroDescription: 'Workshops, audits, and roadmaps that align technology bets with business outcomes.',
		preset: 'consulting',
		highlights: ['Outcome-focused', 'Roadmaps and PMO support', 'Enablement and coaching'],
	},
	'digital-commerce': {
		heroTitle: 'Commerce experiences built to convert and scale.',
		heroDescription: 'High-performing storefronts, secure payments, and automation that keeps operations smooth.',
		preset: 'commerce',
		highlights: ['Conversion-led UX', 'Secure payments', 'Lifecycle automation'],
	},
	'data-modernization': {
		heroTitle: 'Modern data platforms for trusted, actionable insights.',
		heroDescription: 'Re-architect pipelines, warehouses, and governance to deliver reliable data at scale.',
		preset: 'data',
	},
	'advanced-analytics': {
		heroTitle: 'Advanced analytics that surface the signals that matter.',
		heroDescription: 'Dashboards, forecasting, and experimentation frameworks tailored to your KPIs.',
		preset: 'data',
	},
	'connected-intelligence': {
		heroTitle: 'Connected intelligence across your ecosystem.',
		heroDescription: 'Unify data, models, and event streams to make every experience smarter.',
		preset: 'ai',
	},
	'data-management': {
		heroTitle: 'Data management with governance and quality at the core.',
		heroDescription: 'Lineage, cataloging, and stewardship programs that keep data trustworthy.',
		preset: 'data',
	},
	'generative-ai': {
		heroTitle: 'Generative AI with safety, speed, and control.',
		heroDescription: 'RAG, fine-tuning, and guardrails to bring reliable AI to production workloads.',
		preset: 'ai',
	},
	'data-analytics': {
		heroTitle: 'Analytics programs that answer the right questions.',
		heroDescription: 'Model metrics that matter, automate reporting, and empower teams with self-serve BI.',
		preset: 'data',
	},
	'ecommerce-design-development': {
		heroTitle: 'Elegant e-commerce storefronts that convert.',
		heroDescription: 'UX, performance, and checkout flows crafted to reduce friction and boost revenue.',
		preset: 'commerce',
	},
	'ecommerce-maintenance': {
		heroTitle: 'Always-on care for your commerce stack.',
		heroDescription: 'Monitoring, SLA-backed support, and rapid fixes to keep revenue flowing.',
		preset: 'support',
	},
	'ecommerce-automation': {
		heroTitle: 'Automation that scales your commerce operations.',
		heroDescription: 'Integrate inventory, fulfillment, marketing, and customer data without manual toil.',
		preset: 'commerce',
	},
	'saas-solutions': {
		heroTitle: 'SaaS products built for scale and reliability.',
		heroDescription: 'Multi-tenant architectures, billing, and observability to grow with your customers.',
		preset: 'app',
	},
	'd365-erp': {
		heroTitle: 'D365 ERP implementations that stick.',
		heroDescription: 'Process mapping, integrations, and change management for successful ERP rollouts.',
		preset: 'consulting',
	},
	'd365-crm': {
		heroTitle: 'D365 CRM tailored to your revenue motions.',
		heroDescription: 'Pipelines, automations, and analytics aligned to your GTM teams.',
		preset: 'consulting',
	},
	'power-apps': {
		heroTitle: 'Power Apps that digitize and automate fast.',
		heroDescription: 'Rapid app delivery with governance, connectors, and lifecycle management.',
		preset: 'app',
	},
	'business-process-services': {
		heroTitle: 'Streamlined business processes with the right blend of people and tech.',
		heroDescription: 'Automate, measure, and improve back-office workflows end to end.',
		preset: 'consulting',
	},
	'contact-center': {
		heroTitle: 'Customer support operations that delight.',
		heroDescription: 'Omnichannel routing, knowledge bases, and QA loops to lift CSAT.',
		preset: 'support',
	},
	'digital-marketing': {
		heroTitle: 'Performance marketing with measurable ROI.',
		heroDescription: 'Campaigns, experimentation, and analytics that turn traffic into revenue.',
		preset: 'commerce',
	},
	'finance-accounting': {
		heroTitle: 'Finance and accounting ops you can trust.',
		heroDescription: 'Automation, controls, and reporting that keep books clean and timely.',
		preset: 'consulting',
	},
	'staff-augmentation': {
		heroTitle: 'Specialist teams that integrate seamlessly.',
		heroDescription: 'Trusted engineers, designers, and analysts embedded with your squads.',
		preset: 'support',
	},
	'legal-process-outsourcing': {
		heroTitle: 'LPO with rigor and confidentiality.',
		heroDescription: 'Secure workflows, quality checks, and transparent reporting for legal processes.',
		preset: 'consulting',
	},
	'ar': {
		heroTitle: 'Augmented reality that elevates experiences.',
		heroDescription: 'Immersive AR concepts, prototyping, and production-ready delivery.',
		preset: 'app',
	},
	'vr': {
		heroTitle: 'VR environments built for engagement.',
		heroDescription: 'Interactive spaces, simulations, and training built on reliable engines.',
		preset: 'app',
	},
	'blockchain': {
		heroTitle: 'Blockchain solutions with pragmatic governance.',
		heroDescription: 'Secure smart contracts, integrations, and compliance-aware deployments.',
		preset: 'default',
	},
	'web3': {
		heroTitle: 'Web3 products with user-first UX.',
		heroDescription: 'Wallet flows, NFTs, and dApps with intuitive onboarding and security.',
		preset: 'default',
	},
	'cloud-apps': {
		heroTitle: 'Cloud-native applications that scale globally.',
		heroDescription: 'Design, build, and operate cloud apps with reliability and cost efficiency.',
		preset: 'cloud',
	},
	'cloud-operations-migration': {
		heroTitle: 'Cloud migrations without the downtime.',
		heroDescription: 'Plan, migrate, and optimize workloads with observability and rollback plans.',
		preset: 'cloud',
	},
	'cloud-maintenance-integration': {
		heroTitle: 'Keep cloud estates healthy and integrated.',
		heroDescription: 'Patching, upgrades, and integration support to keep teams shipping.',
		preset: 'support',
	},
	'managed-services': {
		heroTitle: 'Managed services with clear SLAs and visibility.',
		heroDescription: 'Round-the-clock operations, incident response, and continuous optimization.',
		preset: 'support',
	},
	'devops': {
		heroTitle: 'DevOps that accelerates safe delivery.',
		heroDescription: 'CI/CD, observability, and platform engineering tailored to your teams.',
		preset: 'ops',
	},
	'qa': {
		heroTitle: 'Quality assurance that keeps releases predictable.',
		heroDescription: 'Automation, coverage metrics, and exploratory testing for confident shipping.',
		preset: 'ops',
	},
	'digital-infrastructure': {
		heroTitle: 'Digital infrastructure engineered for uptime.',
		heroDescription: 'Networks, edge, and platform services hardened for reliability and scale.',
		preset: 'cloud',
	},
};

const processSteps = [
	{ title: 'Consultation', desc: 'Align on goals, audience, and success metrics.' },
	{ title: 'Design & Prototype', desc: 'Wireframes and polished UI that reflect your brand.' },
	{ title: 'Development', desc: 'Accessible, scalable builds with best practices baked in.' },
	{ title: 'Launch & Support', desc: 'Deployment, training, and continuous improvement.' },
];

const testimonials = [
	{ quote: 'They delivered a lightning-fast experience that our team can evolve without heavy engineering lift. Engagement and conversions jumped within weeks.', name: 'Maya Thompson', role: 'CMO, Lumen Works' },
	{ quote: 'From strategy to launch, they were proactive, communicative, and deeply technical. We finally have a platform we are proud of.', name: 'Ethan Cole', role: 'Founder, Harbor Health' },
];

const servicesIndex = megaServiceCategories.flatMap((category) =>
	category.items.map((item) => ({
		...item,
		category: category.title,
		slug: item.href.split('/').pop() || '',
	}))
);

function inferPreset(slug = '', category = '') {
	const value = `${slug} ${category}`.toLowerCase();
	if (value.includes('cloud') || value.includes('infra')) return 'cloud';
	if (value.includes('data')) return 'data';
	if (value.includes('ai') || value.includes('intelligence')) return 'ai';
	if (value.includes('commerce')) return 'commerce';
	if (value.includes('devops') || value.includes('qa') || value.includes('ops')) return 'ops';
	if (value.includes('design') || value.includes('ux') || value.includes('ui')) return 'design';
	if (value.includes('consult')) return 'consulting';
	if (value.includes('support') || value.includes('managed') || value.includes('maintenance')) return 'support';
	if (value.includes('app')) return 'app';
	if (value.includes('web')) return 'web';
	return 'default';
}

function buildServiceContent(slug = '') {
	const match = servicesIndex.find((service) => service.slug === slug);
	const fallbackTitle = humanizeSlug(slug) || 'Our Services';
	const title = match?.label || fallbackTitle;
	const category = match?.category || 'Services';
	const preset = serviceCatalog[slug]?.preset || inferPreset(slug, category);
	return {
		title,
		category,
		heroTitle: serviceCatalog[slug]?.heroTitle || `${title} built for measurable outcomes.`,
		heroDescription:
			serviceCatalog[slug]?.heroDescription ||
			`End-to-end ${title.toLowerCase()} spanning discovery, build, and support so your team can focus on results.`,
		about:
			serviceCatalog[slug]?.about || [
				`We deliver ${title.toLowerCase()} with clarity from kickoff through launch, pairing product thinking with robust engineering.`,
				`${title} engagements are designed for maintainability, performance, and measurable impact, with transparent communication along the way.`,
			],
		highlights:
			serviceCatalog[slug]?.highlights || [
				'Outcome-focused delivery',
				'Governed releases and observability',
				'Security and performance baked in',
			],
		preset,
		portfolio: buildPortfolio(title),
	};
}

function buildPortfolio(title) {
	return [
		{ title: `${title} Impact 1`, desc: 'A recent launch that improved conversion and reliability for a global brand.', image: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=900&q=80' },
		{ title: `${title} Impact 2`, desc: 'Delivered integrations and automation that reduced manual work and errors.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80' },
		{ title: `${title} Impact 3`, desc: 'Scaled experiences with strong UX, observability, and uptime guarantees.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80' },
	];
}

export default function ServicePage({ params }) {
	const slug = params?.name || '';
	const content = buildServiceContent(slug);
	const features = featurePresets[content.preset] || featurePresets.default;
	const highlights = content.highlights || [];
	const aboutCopy = content.about || [];

	return (
		<main className="bg-white pt-12 text-slate-900">
			<ServicesHero content={content} highlights={highlights} />

			<section className="mx-auto max-w-[1440px] min-h-[80vh] px-6 py-16">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
					<div className="space-y-4">
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">About</p>
						<h2 className="text-3xl font-semibold text-slate-900">
							<p>{content.title}</p></h2>
						{aboutCopy.map((paragraph, idx) => (
							<p key={idx} className="text-slate-700 text-base">{paragraph}</p>
						))}
					</div>
					<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-500/10 via-white to-teal-500/10 p-1 ring-1 ring-slate-100">
						<div className="h-full rounded-[20px] bg-white shadow-xl shadow-sky-100">
							<div className="relative h-96 w-full overflow-hidden rounded-[20px]">
								<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt={`${content.title} workspace`} className="h-full w-full object-cover" />
								<div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />
							</div>
							<div className="p-6">
								<div className="flex  items-center gap-2 text-base font-semibold text-sky-700">
									<Dot />Component-driven delivery
									<Dot />Governed rollouts
								</div>
								<p className="mt-3 text-base text-slate-600">We architect for longevity with modular systems, CI/CD, and analytics hooks from day one.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-slate-50  py-16">
				<div className="mx-auto max-w-[1440px] min-h-[80vh]  px-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">Features</p>
							<h2 className="text-3xl font-semibold text-slate-900">
								<p>Everything you need to ship with confidence.</p></h2>
						</div>
						{/* <p className="max-w-xl text-slate-700">A curated set of capabilities aligned to {content.title.toLowerCase()} so your teams can focus on outcomes.</p> */}
					</div>
					<div className="mt-10 h-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map(({ title: featureTitle, desc, icon: Icon }) => (
							<div key={featureTitle} className="group flex flex-col gap-3 rounded-2xl h-72 bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
									<Icon className="h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold text-slate-900">
									<p>{featureTitle}</p></h3>
								<p className="text-base text-slate-600">{desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[1440px] min-h-[50vh] px-6 py-16">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">Process</p>
						<h2 className="text-3xl font-semibold text-slate-900">
							<p>A clear path from idea to launch.</p>
						</h2>
					</div>
					<p className="max-w-xl text-slate-700">We keep teams aligned with transparent communication, demos, and measurable milestones every step of the way.</p>
				</div>
				<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{processSteps.map((step, index) => (
						<div key={step.title} className="flex h-64 flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sm font-semibold text-sky-700">{String(index + 1).padStart(2, '0')}</div>
								<h3 className="text-lg font-semibold text-slate-900">
									<p>{step.title}</p>
								</h3>
							</div>
							<p className="mt-3 text-base text-slate-600">{step.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className="bg-slate-50 py-16">
				<div className="mx-auto max-w-[1440px] px-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">Portfolio</p>
							<h2 className="text-3xl font-semibold text-slate-900">
								<p>Recent collaborations.</p>
							</h2>
						</div>
						<p className="max-w-xl text-slate-700">A glimpse at the {content.title.toLowerCase()} wins we have delivered across industries.</p>
					</div>
					<div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{content.portfolio.map((item) => (
							<article key={item.title} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
								<div className="relative h-56 w-full overflow-hidden">
									<img src={item.image} alt={`${item.title} project screenshot`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
								</div>
								<div className="flex flex-1 flex-col gap-3 p-5">
									<h3 className="text-xl font-semibold text-slate-900">
										<p>{item.title}</p></h3>
									<p className="text-base text-slate-600">{item.desc}</p>
									<div className="mt-auto flex items-center gap-2 text-sm font-semibold text-sky-700">
										<span>View details</span>
										<span aria-hidden="true">→</span>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[1440px] px-6 py-16">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-600">Testimonials</p>
						<h2 className="text-3xl font-semibold text-slate-900">
							<p>Partners who trust us.</p>
						</h2>
					</div>
					<p className="max-w-xl text-slate-700">Collaboration, clarity, and consistency keep our clients coming back.</p>
				</div>
				<div className="mt-10 grid gap-6 md:grid-cols-2">
					{testimonials.map((item) => (
						<figure key={item.name} className="relative flex h-full flex-col min-h-[200px] justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
							<div className="flex items-start gap-3 text-sky-600">
								<QuoteIcon className="absolute right-4  opacity-30 h-44 w-44" />
								<p className="text-lg font-medium text-slate-500">“{item.quote}”</p>
							</div>
							<figcaption className="mt-4 text-sm font-semibold text-slate-800">{item.name} <span className="font-normal text-slate-600">— {item.role}</span></figcaption>
						</figure>
					))}
				</div>
			</section>

		</main>
	);
}

function Dot() {
	return <span className="inline-block h-2 w-2 rounded-full bg-sky-500" aria-hidden="true" />;
}

function ResponsiveIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
			<rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
			<path d="M7 20h10" />
			<path d="M9 16h6" />
		</svg>
	);
}

function CodeIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 18 3 12l6-6" />
			<path d="m15 6 6 6-6 6" />
		</svg>
	);
}

function CartIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="9" cy="20" r="1" />
			<circle cx="17" cy="20" r="1" />
			<path d="M3 4h2l2 12h10l2-8H6" />
		</svg>
	);
}

function ContentIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<rect x="4" y="5" width="16" height="14" rx="2" />
			<path d="M8 9h8M8 13h5" />
		</svg>
	);
}

function SpeedIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			<path d="m13.5 13.5 2.5-2.5" />
			<path d="M7 12h1" />
			<path d="M12 7v1" />
			<path d="m16.2 16.2-.7-.7" />
		</svg>
	);
}

function ShieldIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 3 5 6v6c0 5 4 7.7 7 9 3-1.3 7-4 7-9V6l-7-3Z" />
		</svg>
	);
}

function QuoteIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M10 15H6.5a2.5 2.5 0 0 1-2.5-2.5V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3.5A2.5 2.5 0 0 1 7.5 15" />
			<path d="M20 15h-3.5A2.5 2.5 0 0 1 14 12.5V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3.5A2.5 2.5 0 0 1 17.5 15" />
		</svg>
	);
}



function IntegrationIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<rect x="3" y="3" width="7" height="7" rx="1.5" />
			<rect x="14" y="3" width="7" height="7" rx="1.5" />
			<rect x="3" y="14" width="7" height="7" rx="1.5" />
			<path d="M10 7h4M7 10v4m10-4v4M10 17h4" />
		</svg>
	);
}

function CloudIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M7 18h9a4 4 0 0 0 .7-7.94A6 6 0 0 0 5.1 11.7 3.5 3.5 0 0 0 7 18Z" />
		</svg>
	);
}

function AnalyticsIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4 20h16" />
			<rect x="5" y="11" width="3" height="6" rx="1" />
			<rect x="10.5" y="7" width="3" height="10" rx="1" />
			<rect x="16" y="4" width="3" height="13" rx="1" />
		</svg>
	);
}

function AutomationIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="3" />
			<path d="M12 5V3m4.5 4.5L18 6m-9 1.5L6 6m12 6h2m-2.5 4.5L18 18m-9 0-1.5 2.5M12 21v-2M4 12h2" />
		</svg>
	);
}

function SupportIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="9" />
			<path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5m0 3h.01" />
		</svg>
	);
}

function AccessibilityIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="4" r="2" />
			<path d="M4 7h16M9 21l3-7 3 7M6 10l6 2 6-2" />
		</svg>
	);
}

function DesignIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M7 3h10l4 7-9 11L3 10Z" />
			<path d="M11 3 9 10l4 3" />
		</svg>
	);
}

function SparkIcon({ className = '' }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5Z" />
		</svg>
	);
}

