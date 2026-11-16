// Everything about the person lives here; projects live in src/content/projects.
// Lines marked CONFIRM need Biplob's sign-off before the site goes public.

export const CV_DOC_ID = '1V6tCHFobjcv-I7X0Erp6cCz3Co2VWco0MQKucX1e5jM';

export const site = {
  name: 'Biplob Chakraborty',
  url: 'https://biplob819.github.io',
  roles: ['Product Manager', 'Builder', 'India International, Modern Pentathlon'],
  // One sentence of identity, one of proof. Numbers come from the CV.
  lede: 'Product manager who ships. Pentathlete for India.',
  proof: [
    "I'm Lead Product Manager, Data (Agentic Analytics and ML) at Mindbody. I shipped its first agentic product and led ML products that contributed to $103M+ in incremental ARR.",
    "I'm also building Kova (kovahr.com) and Insightsflow (insightsflow.live) end to end, and I'm a PhD scholar in AI at IIT Kharagpur.",
    'I represent India in modern pentathlon.',
  ],
  location: 'Guwahati, India',
  links: {
    linkedin: 'https://www.linkedin.com/in/biplob-chakraborty/',
    github: 'https://github.com/biplob819',
    // Public PDF export of the master CV Google Doc, so the download is always current.
    // `portfolio cv` also saves a copy to public/cv.pdf; switch to '/cv.pdf' to serve that instead.
    cv: `https://docs.google.com/document/d/${CV_DOC_ID}/export?format=pdf`,
    email: '', // CONFIRM: leave empty to hide, or set a public address
  },
  ledger: [
    { value: '11+', label: 'years in product' },
    { value: '$103M+', label: 'incremental ARR my ML products contributed to' },
    { value: '77%', label: 'of chats completed weekly on Mindbody\'s first agentic product' },
    { value: '5,600+', label: 'commits on Kova, built with my own harness' },
  ],
};

// Products shipped inside a day job: no public repo, so they live here, tagged BUILT like the CV.
export const atWork = {
  company: 'Mindbody',
  title: 'Lead Product Manager, Data (Agentic Analytics and ML)',
  period: '2023 to now',
  // Source: LinkedIn profile export, 16 Nov 2026 (private/linkedin-profile.md).
  items: [
    {
      name: 'Agentic AI Analytics',
      text: "Mindbody's first agentic product: custom filtering and actions with suggestions, inside the analytics experience.",
      metric: '77%+', metricLabel: 'of conversations completed successfully, every week',
    },
    {
      name: 'Multi-agent Data Dictionary',
      text: 'Agents index production warehouse schemas with human-in-the-loop evals and few-shot learning, powering internal Snowflake MCP and Cortex agents.',
      metric: '+60%', metricLabel: 'data analysis accuracy; 40% faster time-to-model; $100k Fivetran renewal saved',
    },
    {
      name: 'Classification Engine',
      text: 'Built inside Snowflake (Cortex, dbt, Streamlit): evidence-backed, confidence-scored labels from a versioned, human-reviewed rulebook, gated by automated tests and evals, for Product and GTM teams.',
      metric: '43,000', metricLabel: 'calls tagged a month',
    },
    {
      name: 'Internal Anthropic marketplace MCP',
      text: 'An internal marketplace that organises MCP apps and plugins for teams across the company.',
      metric: '1,000+', metricLabel: 'apps available to internal teams',
    },
    {
      name: 'Agentic KPI and dashboard generation',
      text: 'An LLM workflow and rules engine that turns a metric request into a governed dashboard.',
      metric: '92%', metricLabel: 'less build time: from 2 days to 1 hour',
    },
    {
      name: 'Competitor Intelligence',
      text: 'Classification models that surface competitive insights for executives across platforms.',
      metric: '80%', metricLabel: 'cross-organisation adoption',
    },
  ],
  earlier: [
    { company: 'Mindbody', title: 'Senior Product Manager, Data (Analytics and AI/ML)', period: 'May 2023 to Mar 2026' },
    { company: 'PeopleStrong', title: 'Product Manager, Payroll (Global)', period: '2021 to 2023' },
    { company: 'BrighterGoal', title: 'Product Manager, SMB creator and e-commerce', period: '2017 to 2021' },
    { company: 'Shomart', title: 'Technical Co-founder', period: '2014 to 2017', note: '0 to 1 marketplace, ₹84K MRR' },
  ],
};

export const sport = {
  headline: 'Modern pentathlon, for India',
  facts: [
    'Represented India at the UIPM World Championships in China, racing the 400m and 3km.',
    'Triathlete.',
    'Training toward the 2027 Asian Championships, with LA28 as the long goal.',
  ],
  events: ['Fencing', 'Swimming', 'Obstacle', 'Shooting', 'Running'],
  link: 'Five disciplines in one day, scored as one number. It is the best training I know for product work: switch contexts fast, keep a plan under fatigue, and let the scoreboard decide.',
};

export const education = [
  { name: 'PhD Scholar, AI & Cognitive Neuroscience', place: 'IIT Kharagpur', period: '2024 to 2028' },
  { name: 'Professional Certificate, Project Management', place: 'IIM Rohtak', period: '2017 to 2018' },
  { name: 'BE (Honours)', place: 'Girijananda Chowdhury Institute (Gauhati University)', period: '2016' },
];

export const now = [
  'Shipping Kova, an AI-native HR platform for US small businesses.',
  'Getting Insightsflow, embedded analytics for SaaS teams, ready to launch.',
  'Finishing eight public AI builds, each scored with EvalKit.',
  'Released the Build Harness as open source: the Claude Code harness behind Kova, Insightsflow and every project here.',
  'PhD research at IIT Kharagpur, and training.',
];
