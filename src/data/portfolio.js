// All portfolio content lives here, so text, links and projects can be
// updated without touching the components.

import afterhour from '../assets/projects/afterhour.jpg';
import chalet from '../assets/projects/chalet.jpg';
import progress from '../assets/projects/progress.jpg';
import note from '../assets/projects/note.jpg';
import form from '../assets/projects/form.jpg';
import tracker from '../assets/projects/tracker.jpg';
import taskinator from '../assets/projects/taskinator.jpg';
import landingpage from '../assets/projects/landingpage.jpg';
import linehop from '../assets/projects/linehop.png';
import fitness from '../assets/projects/fitness.png';

const GH = 'https://github.com/jhwang2525';

export const profile = {
  name: 'Jun Hwang',
  role: 'Shopify Developer & Front-End Engineer',
  location: 'Los Angeles, CA',
  email: 'jhwang2525@gmail.com',
  github: GH,
  linkedin: 'https://www.linkedin.com/in/jun-hwang-834951207/',
  headline: 'I build Shopify storefronts that sell.',
  intro:
    "I'm a Los Angeles based Shopify developer and front-end engineer. I build custom Liquid themes, wholesale and B2B storefronts, and fast, conversion-focused UI for fashion and lifestyle brands.",
};

export const stats = [
  { value: '8+', label: 'Live Shopify stores built & maintained' },
  { value: '2020', label: 'Building e-commerce since' },
  { value: 'UCLA', label: 'Full-Stack Web Development' },
];

export const about = [
  "I started on the business side of e-commerce, watching analytics, running promotions and figuring out why shoppers didn't convert. That curiosity pulled me into code: I completed UCLA's Full-Stack Web Development program and Google's UX Design Specialization, and I've been building storefronts ever since.",
  "Today I run a small Shopify development practice. I work directly with brand owners on everything from new theme builds on Horizon and Dawn to wholesale pricing, B2B checkout flows, custom sections and performance fixes. I care about clean, maintainable code that the client's team can still edit in the theme editor.",
];

export const skills = [
  {
    group: 'Shopify',
    items: ['Liquid', 'Online Store 2.0', 'Horizon & Dawn', 'Custom sections', 'Metafields', 'B2B & wholesale', 'Section Rendering API', 'Theme app integrations'],
  },
  {
    group: 'Front-End',
    items: ['JavaScript (ES6+)', 'React', 'React Native', 'jQuery', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap', 'Responsive design'],
  },
  {
    group: 'Back-End',
    items: ['Node.js', 'Express', 'MySQL & Sequelize', 'MongoDB & Mongoose', 'GraphQL & Apollo', 'REST APIs'],
  },
  {
    group: 'Design & Tools',
    items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Git & GitHub', 'PageSpeed Insights'],
  },
];

export const experience = [
  {
    title: 'Shopify Developer',
    company: 'Waycap Inc. · Los Angeles, CA',
    period: 'Contract',
    points: [
      'Design, build and maintain the Waycaps Shopify stores, focused on usability and conversion.',
      'Built retail, wholesale and B2B cart experiences with account-based pricing, tax-exempt checkout and company catalogs.',
      'Shipped custom Liquid sections, a hat design configurator, a free sample program and a trade-show digital catalog.',
      'Provide ongoing maintenance, SEO and performance improvements to keep the sites fast and secure.',
    ],
  },
  {
    title: 'Retail E-Commerce Developer & Online Marketing',
    company: 'Chalet et Ceci · Freelance / Remote',
    period: '2023 – Present',
    points: [
      'Migrated the store from Wix to Shopify, improving site functionality and the shopping experience.',
      'Designed and developed a customized, mobile-first Shopify theme with better product presentation and navigation.',
      'Implemented SEO strategies that grew organic traffic and search rankings.',
      'Ran online marketing campaigns across social media and digital ads to drive engagement and sales.',
    ],
  },
  {
    title: 'Retail E-Commerce Developer',
    company: 'Afterhour · Los Angeles, CA',
    period: '2020 – Present',
    points: [
      'Built mobile-first, responsive storefront pages and optimized them for speed and scalability.',
      'Developed JavaScript features that improved the shopping experience and conversion rate.',
      'Implemented SEO best practices and used traffic analytics to grow organic traffic and revenue.',
      'Ran new-season photoshoots, the import process and pre-orders, and launched an additional sales channel.',
    ],
  },
];

export const education = [
  { title: 'Full Stack Web Development', org: 'University of California, Los Angeles', year: '2021' },
  { title: 'Google UX Design Specialization', org: 'Google / Coursera', year: '2023' },
  { title: 'AWS Cloud Practitioner', org: 'Amazon Web Services', year: 'In progress' },
];

// Other Shopify stores (smaller list under the featured client work)
export const moreStores = [
  { name: 'Hatzun', theme: 'Dawn', url: 'https://www.hatzun.com' },
  { name: 'EDU Arts District', theme: 'Symmetry', url: 'https://www.edu-artsdistrict.com' },
  { name: 'Azrapaw', theme: 'Minion', url: 'https://www.azrapaws.com' },
  { name: 'Afterhour Korea', theme: 'Dawn', url: 'https://www.afhr.co.kr' },
];

// Featured client work. Add a screenshot by importing it above and setting `image`.
export const clientWork = [
  {
    name: 'Waycaps',
    type: 'Envy theme · Wholesale & B2B',
    url: 'https://www.waycaps.com',
    code: `${GH}/shopify-waycap-theme`,
    accent: 'from-[#3bba9c] to-[#2b6f8f]',
    summary:
      'Headwear brand selling to both retail shoppers and wholesale buyers. I build and maintain the store, including its Mexico storefront.',
    highlights: [
      'Retail, wholesale and B2B cart with account-based checkout and tax handling',
      'Custom hat design configurator page',
      'Free sample program using hidden cart attributes',
      'Digital trade-show catalog powered by live Shopify product data',
    ],
    tags: ['Liquid', 'JavaScript', 'Shopify B2B', 'Cart API'],
  },
  {
    name: 'AGA Nature',
    type: 'New build on Horizon',
    url: 'https://aganature.com',
    code: `${GH}/Aga-Nature-Develop`,
    accent: 'from-[#8F533F] to-[#c9a27e]',
    summary:
      'Natural dye marketplace and studio. Built from scratch on Shopify Horizon with an editorial, content-first design system.',
    highlights: [
      'Editorial section library: Our Story, Process, Materials, Color Lore and more',
      'Multi-step natural dye request form built on Shopify contact forms',
      '"Load more" product grids and quick add using the Section Rendering API',
      'Brand-matched email notification templates',
    ],
    tags: ['Horizon', 'Liquid', 'CSS variables', 'Section Rendering API'],
  },
  {
    name: 'Chalet et Ceci',
    type: 'Dawn customization',
    url: 'https://www.shopchaletetceci.com',
    code: `${GH}/shopify-chalet-theme`,
    image: chalet,
    summary:
      'Women\'s clothing brand, made in the USA. Ongoing theme development, store fixes and seasonal campaigns.',
    highlights: [
      'Custom collection slider and accordion sections',
      'Store locator and swatch app integrations',
      'Holiday HTML email campaigns',
    ],
    tags: ['Dawn', 'Liquid', 'Email'],
  },
  {
    name: 'Afterhour Clothing',
    type: 'Dawn customization',
    url: 'https://afterhourclothing.com/collections/new-arrivals',
    code: `${GH}/shopify-afterhour-theme`,
    image: afterhour,
    summary:
      'Streetwear label. Customized the Dawn theme with custom fonts, image sections and localization.',
    highlights: ['Custom font loading and image mask sections', 'Language and currency localization'],
    tags: ['Dawn', 'Liquid', 'CSS'],
  },
];

export const projectFilters = ['All', 'Shopify', 'Full-Stack', 'Front-End'];

export const projects = [
  {
    name: 'LaunchAI',
    category: 'Full-Stack',
    status: 'In progress',
    description:
      'SaaS for launching a fashion collection on Shopify in minutes: AI-generated product content, marketing assets and a review step before publishing. System design and architecture.',
    tags: ['Next.js', 'Shopify OAuth', 'AI pipeline', 'System design'],
    code: `${GH}/LaunchAI`,
  },
  {
    name: 'ASI Show Digital Catalog',
    category: 'Shopify',
    description:
      'Mobile-friendly product catalog for a trade show, shared by QR code and kept in sync with live Shopify product data.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Shopify JSON'],
    code: `${GH}/ASI-Catalog`,
  },
  {
    name: 'Book Search Engine',
    category: 'Full-Stack',
    description:
      'Google Books search app where users sign up, log in and save books to their account. Refactored from REST to a GraphQL API.',
    tags: ['MongoDB', 'Express', 'GraphQL', 'Apollo', 'JWT'],
    code: `${GH}/book-search-engine`,
  },
  {
    name: 'Tech Blog',
    category: 'Full-Stack',
    description:
      'CMS-style blog where developers publish posts and comment on each other\'s work, with session-based authentication.',
    tags: ['Node.js', 'Express', 'Handlebars', 'Sequelize', 'MVC'],
    code: `${GH}/tech-blog`,
  },
  {
    name: 'E-Commerce Back End',
    category: 'Full-Stack',
    description: 'REST API for an online store with categories, products and tags, built on an ORM-mapped MySQL database.',
    tags: ['Express', 'Sequelize', 'MySQL', 'REST'],
    code: `${GH}/ecom-backend`,
  },
  {
    name: 'Social Network API',
    category: 'Full-Stack',
    description: 'NoSQL API for a social network: users, thoughts, reactions and friend lists.',
    tags: ['Express', 'MongoDB', 'Mongoose'],
    code: `${GH}/social-network-api`,
  },
  {
    name: 'Budget Tracker',
    category: 'Full-Stack',
    image: tracker,
    description: 'Track deposits and expenses with a running balance and a chart of spending over time.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Chart.js'],
    code: `${GH}/budget-tracker`,
  },
  {
    name: 'Note Taker',
    category: 'Full-Stack',
    image: note,
    description: 'Express app for writing, saving and deleting notes, backed by a JSON file API.',
    tags: ['Node.js', 'Express', 'REST'],
    code: `${GH}/note-taker`,
  },
  {
    name: 'Weather Dashboard',
    category: 'Front-End',
    description: 'Search any city for current conditions and a 5-day forecast, with saved search history.',
    tags: ['JavaScript', 'OpenWeather API', 'localStorage'],
    demo: 'https://jhwang2525.github.io/weather-dashboard/',
    code: `${GH}/weather-dashboard`,
  },
  {
    name: 'Taskinator',
    category: 'Front-End',
    image: taskinator,
    description: 'Task list organizer with to-do, in-progress and completed columns, saved in the browser.',
    tags: ['JavaScript', 'DOM', 'localStorage'],
    demo: 'https://jhwang2525.github.io/taskinator/',
    code: `${GH}/taskinator`,
  },
  {
    name: 'Split Landing Page',
    category: 'Front-End',
    image: landingpage,
    description: 'Two-sided landing page where the hovered side expands to reveal its content.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://jhwang2525.github.io/split-landing-page/',
    code: `${GH}/split-landing-page`,
  },
  {
    name: 'Progress Steps',
    category: 'Front-End',
    image: progress,
    description: 'Step indicator UI component that guides users through a multi-step process.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://jhwang2525.github.io/progress-steps/',
    code: `${GH}/progress-steps`,
  },
  {
    name: 'Input Form',
    category: 'Front-End',
    image: form,
    description: 'Login form with animated, letter-by-letter floating labels.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://jhwang2525.github.io/input-form/',
    code: `${GH}/input-form`,
  },
];

export const uxDesigns = [
  {
    name: 'LineHop',
    image: linehop,
    type: 'Mobile app · UX case study',
    description:
      'Restaurant reservation app for both diners and owners. Diners find open tables and last-minute cancellations nearby; the flow was kept simple enough for people who rarely use smartphone apps.',
    tags: ['Figma', 'User research', 'Wireframes', 'Prototype'],
  },
  {
    name: 'Personal Training App',
    image: fitness,
    type: 'Mobile app · UX design',
    description:
      'App that matches people with a personal coach and lets them train from anywhere. Designed the onboarding and coach-matching flow with a clear, motivating visual style.',
    tags: ['Figma', 'Mobile UI', 'Onboarding flow'],
  },
];
