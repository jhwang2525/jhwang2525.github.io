// "Ask Jun" assistant knowledge base.
// Answers are built from portfolio.js, so they stay in sync with the site.
// getReply() is async on purpose: it can later be swapped for a call to an AI endpoint.

import { profile, clientWork, moreStores, projects, skills, experience, education } from './portfolio';
import sideEye from '../assets/side-eye.jpg';

const list = (items) => items.join(', ').replace(/, ([^,]*)$/, ' and $1');

const INTENTS = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'morning', 'afternoon'],
    reply: () => ({
      text: `Hi! I'm Jun's portfolio assistant. Ask me about his Shopify work, projects, skills or how to hire him.`,
    }),
  },
  {
    id: 'about',
    keywords: ['who', 'about', 'yourself', 'jun', 'background', 'introduce', 'summary', 'tell'],
    reply: () => ({
      text: `${profile.name} is a ${profile.role} based in ${profile.location}. He builds custom Shopify themes, wholesale and B2B storefronts, and fast, conversion-focused UI for fashion and lifestyle brands.`,
      actions: [{ label: 'About section', section: 'about' }],
    }),
  },
  {
    id: 'shopify',
    keywords: ['shopify', 'store', 'stores', 'client', 'clients', 'liquid', 'ecommerce', 'e-commerce', 'theme', 'b2b', 'wholesale', 'horizon'],
    reply: () => ({
      text: `Jun builds and maintains live Shopify stores including ${list(clientWork.map((c) => c.name))}, plus ${list(
        moreStores.map((s) => s.name)
      )}. Highlights: retail/wholesale/B2B checkout for Waycaps, a from-scratch Horizon build for AGA Nature, and a Wix-to-Shopify migration for Chalet et Ceci.`,
      actions: [{ label: 'See Shopify work', section: 'work' }],
    }),
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'portfolio', 'built', 'build', 'demo', 'apps', 'app', 'github', 'code'],
    reply: () => {
      const featured = projects.filter((p) => p.featured);
      return {
        text: `Featured projects: ${featured
          .map((p) => `${p.name} (${p.tags.slice(0, 3).join(', ')})`)
          .join('; ')}. There are ${projects.length - featured.length} more on the site, from REST and GraphQL APIs to UI components.`,
        actions: [
          { label: 'View projects', section: 'projects' },
          { label: 'GitHub', href: profile.github },
        ],
      };
    },
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'stack', 'tech', 'technologies', 'language', 'languages', 'react', 'javascript', 'node', 'tools', 'know'],
    reply: () => ({
      text: skills.map((g) => `${g.group}: ${g.items.slice(0, 5).join(', ')}`).join('. ') + '.',
      actions: [{ label: 'Full skills list', section: 'about' }],
    }),
  },
  {
    id: 'experience',
    keywords: ['experience', 'work', 'job', 'jobs', 'years', 'career', 'worked', 'company', 'companies', 'role'],
    reply: () => ({
      text: `Jun has been building e-commerce since 2020. Current roles: ${experience
        .map((e) => `${e.title} at ${e.company.split(' · ')[0]} (${e.period})`)
        .join('; ')}.`,
      actions: [{ label: 'Experience', section: 'experience' }],
    }),
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'school', 'ucla', 'certificate', 'certification', 'certifications', 'aws', 'google', 'ux', 'bootcamp', 'study'],
    reply: () => ({
      text: `${list(education.map((e) => `${e.title} (${e.org}, ${e.year})`))}.`,
      actions: [{ label: 'Education', section: 'experience' }],
    }),
  },
  {
    id: 'hire',
    keywords: ['hire', 'hiring', 'available', 'availability', 'open', 'full-time', 'fulltime', 'freelance', 'contract', 'job', 'position', 'opportunity', 'recruiter'],
    reply: () => ({
      text: `Yes, Jun is ${profile.availability.toLowerCase()}. The fastest way to reach him is the contact form below, which drafts the email for you.`,
      actions: [
        { label: 'Contact Jun', section: 'contact' },
        { label: 'Download resume', resume: true },
      ],
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'reach', 'linkedin', 'talk', 'message', 'call', 'phone'],
    reply: () => ({
      text: `You can email Jun at ${profile.email} or connect on LinkedIn.`,
      actions: [
        { label: 'Email Jun', href: `mailto:${profile.email}` },
        { label: 'LinkedIn', href: profile.linkedin },
      ],
    }),
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'pdf'],
    reply: () => ({ text: `Here's Jun's latest resume.`, actions: [{ label: 'Open resume', resume: true }] }),
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'based', 'live', 'remote', 'onsite', 'relocate', 'timezone', 'la', 'angeles'],
    reply: () => ({
      text: `Jun is based in ${profile.location} (Pacific time) and works with clients remotely.`,
    }),
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'rate', 'rates', 'cost', 'budget', 'quote', 'charge', 'how much'],
    reply: () => ({
      text: `Pricing depends on scope. Use the "Start a project" form below: pick what you need, your budget and timeline, and Jun will reply with a quote.`,
      actions: [{ label: 'Start a project', section: 'contact' }],
    }),
  },
  {
    id: 'meta',
    keywords: ['ai', 'bot', 'chatbot', 'how', 'made', 'real', 'gpt', 'claude', 'assistant'],
    reply: () => ({
      text: `I'm a lightweight assistant Jun built into this React site. I answer from his portfolio data. Try the terminal too: press the ~ key.`,
    }),
  },
  {
    id: 'devmode',
    keywords: ['play', 'game', 'try', 'interactive', 'devmode', 'mission', 'missions', 'challenge', 'fun', 'bug'],
    reply: () => ({
      text: `Try Dev Mode! Three short missions where you build a product card, fix real bugs and speed up a slow store. No coding needed.`,
      actions: [{ label: 'Open Dev Mode', section: 'devmode' }],
    }),
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank', 'thx', 'cool', 'great', 'awesome', 'nice'],
    reply: () => ({ text: `You're welcome! Anything else you'd like to know about Jun?` }),
  },
];

export const SUGGESTIONS = [
  'What Shopify stores has he built?',
  'Is Jun open to full-time roles?',
  'Show me his best projects',
  "What's his tech stack?",
];

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

// Any Korean (Hangul) in the message gets the side-eye dog 👀
const HANGUL = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;

export async function getReply(message) {
  if (HANGUL.test(message)) {
    return { text: '👀', image: sideEye, imageAlt: 'Dog giving a suspicious side-eye' };
  }

  const words = normalize(message);
  const text = ` ${words.join(' ')} `;
  let best = null;
  let bestScore = 0;

  INTENTS.forEach((intent) => {
    const score = intent.keywords.reduce(
      (sum, k) => sum + (k.includes(' ') ? (text.includes(` ${k} `) ? 2 : 0) : words.includes(k) ? 1 : 0),
      0
    );
    // Greetings and thanks only win when nothing more specific matched
    const weighted = ['greeting', 'thanks', 'about'].includes(intent.id) ? score * 0.5 : score;
    if (weighted > bestScore) {
      best = intent;
      bestScore = weighted;
    }
  });

  if (!best) {
    return {
      text: `I'm not sure about that one. I can tell you about Jun's Shopify work, projects, skills, experience or how to contact him.`,
      actions: [{ label: 'Contact Jun', section: 'contact' }],
    };
  }
  return best.reply();
}
