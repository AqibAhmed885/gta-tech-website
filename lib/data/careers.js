// Sample careers data
const positions = [
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    team: 'Product',
    summary: 'Build delightful, accessible UI features with React, Next.js and design systems.',
    description: `We are looking for a Frontend Engineer who can turn product requirements into elegant, accessible user interfaces. You will be responsible for building and maintaining component libraries, implementing responsive layouts, and collaborating closely with product and design teams to ship high-quality user experiences. You will also improve performance, write unit and integration tests, and participate in design reviews to ensure consistent UX across our products. Familiarity with testing tools, bundling, and performance optimization is expected.`,
    responsibilities: [
      'Design and implement user-facing features using React and Next.js',
      'Collaborate with designers to translate interactions into reusable components',
      'Write tests and participate in code reviews'
    ],
    qualifications: [
      '3+ years building production React apps',
      'Good understanding of HTML, CSS, and accessibility',
      'Experience with TypeScript is a plus'
    ]
  },
  {
    slug: 'backend-engineer',
    title: 'Backend Engineer',
    location: 'Remote',
    type: 'Full-time',
    team: 'Platform',
    summary: 'Build reliable APIs, services, and data pipelines that scale.',
    description: `As a Backend Engineer you will design and implement robust, scalable backend systems and APIs. Work across data processing, storage, and system integrations to ensure reliability and maintainability. You'll be expected to define service contracts, optimize data flows, mentor teammates on backend best practices and help improve observability and deployment practices. Experience building production services, working with databases, queuing systems, and monitoring solutions is required.`,
    responsibilities: [
      'Design and implement robust APIs',
      'Work on data processing and ETL pipelines',
      'Improve observability and reliability across services'
    ],
    qualifications: [
      'Experience with Node.js or Go',
      'Familiarity with containerization and cloud platforms',
      'Strong testing and monitoring practices'
    ]
  },
  {
    slug: 'product-marketer',
    title: 'Product Marketer',
    location: 'Remote',
    type: 'Full-time',
    team: 'Marketing',
    summary: 'Define positioning, go-to-market strategy, and demand generation to grow product adoption and retention.',
    description: `The Product Marketer role is responsible for translating product features into compelling messaging and GTM plans. You’ll work cross-functionally to craft product positioning, run campaign experiments, build sales enablement materials, and measure effectiveness through acquisition and retention metrics. A data-informed mindset, strong storytelling skills, and experience with B2B SaaS buying journeys will help you succeed in this role.`,
    responsibilities: [
      'Develop positioning, messaging, and value propositions for new features and products',
      'Plan and execute multi-channel campaigns (email, content, events, partnerships)',
      'Collaborate with product and sales to align roadmap and GTM activities',
      'Measure acquisition, conversion, and retention metrics and iterate on tactics',
      'Create customer-facing content (case studies, demos, product pages, blog posts)'
    ],
    qualifications: [
      '3+ years in product marketing or growth marketing (B2B SaaS preferred)',
      'Experience running acquisition and retention campaigns',
      'Strong analytical skills and comfort with A/B testing and analytics tools',
      'Excellent written and verbal communication skills'
    ]
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    team: 'Design',
    summary: 'Design beautiful, usable interfaces and product experiences that scale across platforms and devices.',
    description: `We are looking for a UI/UX Designer to own research, interaction design, and visual polish across our products. You will lead user interviews, design wireframes and prototypes, and create component-ready visual assets for engineering. You should be comfortable advocating for accessibility, working within a design system, and validating ideas through usability testing and iterating on outcomes based on user feedback.`,
    responsibilities: [
      'Lead user research, wireframing, and prototyping for web and mobile experiences',
      'Create high-fidelity visual designs and component-ready UI assets',
      'Collaborate with engineers to implement accessible, responsive UI',
      'Contribute to and evolve the design system and interaction patterns',
      'Participate in user testing and iterate on designs based on feedback'
    ],
    qualifications: [
      '3+ years designing product interfaces with a strong portfolio',
      'Expertise in Figma (or similar) and prototyping tools',
      'Solid understanding of interaction design, accessibility, and responsive layout',
      'Ability to communicate design decisions and collaborate cross-functionally'
    ]
  }
];

export default positions;
export { positions };