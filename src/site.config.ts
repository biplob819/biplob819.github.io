// Everything about the person lives here; projects live in src/content/projects.
// Lines marked CONFIRM need Biplob's sign-off before the site goes public.

export const CV_DOC_ID = '1i7LYGpB_8UCOrdSHJMWcfm_YO8hm5RlPnD0lUqvrHPs'; // the live master CV: edits here show up in the site's download

export const site = {
  name: 'Biplob Chakraborty',
  url: 'https://biplob819.github.io',
  roles: ['Lead Product Manager, Data and AI/ML', 'Builder', 'India International, Modern Pentathlon'],
  // One sentence of identity, one of proof. Numbers come from the CV.
  lede: 'Product manager who ships. Pentathlete for India.',
  proof: [
    "I'm Lead PM, Data and AI/ML (Agentic Analytics) at Mindbody. I shipped its first agentic product and led ML products that contributed to $103M+ in incremental ARR.",
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
  // Every "Send feedback" button opens a short form. With a Formspree form ID set, the form
  // posts straight to his inbox (https://formspree.io → New form → copy the ID after /f/).
  // With formspree empty, the button opens the visitor's email app instead. The address
  // is kept in two parts and joined in the browser, so it isn't sitting in the HTML.
  feedback: { user: 'biplob.serene', domain: 'gmail.com', formspree: '' },
  ledger: [
    { value: '11+', label: 'years in product' },
    { value: '$103M+', label: 'incremental ARR my ML products contributed to' },
    { value: '77%', label: 'of chats completed weekly on Mindbody\'s first agentic product' },
    { value: '$100k', label: 'Fivetran renewal saved by my multi-agent data dictionary' },
  ],
};

// Products shipped inside a day job: no public repo, so they live here, tagged BUILT like the CV.
export const atWork = {
  company: 'Mindbody',
  title: 'Lead PM, Data and AI/ML (Agentic Analytics)',
  period: 'May 2023 to now',
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
      text: 'An internal marketplace that organises skills and plugins for teams across the opcos within Playlist.',
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
  // Career, newest first. Logos are the organisations' own icons, saved in public/logos.
  experience: [
    { company: 'Mindbody', logo: '/logos/mindbody.svg', roles: [
      { title: 'Lead Product Manager, Data and AI/ML (Agentic Analytics)', period: 'Mar 2026 to now' },
      { title: 'Senior Product Manager, Data (Analytics and AI/ML)', period: 'May 2023 to Mar 2026' },
    ] },
    { company: 'PeopleStrong', logo: '/logos/peoplestrong.svg', roles: [{ title: 'Product Manager, Payroll (Global)', period: '2021 to 2023' }] },
    { company: 'BrighterGoal', roles: [{ title: 'Product Manager, SMB creator and e-commerce', period: '2017 to 2021' }] },
    { company: 'Shomart', roles: [{ title: 'Technical Co-founder', period: '2014 to 2017', note: '0 to 1 marketplace, ₹84K MRR' }] },
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
  { name: 'PhD Scholar, AI & Cognitive Neuroscience', place: 'IIT Kharagpur', period: '2024 to 2028', logo: '/logos/iit-kharagpur.svg' },
  { name: 'Professional Certificate, Project Management', place: 'IIM Rohtak', period: '2017 to 2018', logo: '/logos/iim-rohtak.png' },
  { name: 'BE (Honours), Girijananda Chowdhury Institute', place: 'Gauhati University', period: '2016', logo: '/logos/gauhati-university.png' },
];

// Teaching. Student count from Biplob (17 Nov 2026); course facts from the public course page.
export const teaching = {
  course: 'Building AI Products, Systems & Services',
  program: 'Executive Post Graduate Certificate, IIT Kharagpur with upGrad',
  role: 'Co-Instructor with Prof. Mrigank Sharad, IIT Kharagpur',
  url: 'https://www.upgrad.com/executive-post-graduate-certificate-in-building-ai-products-services/',
  students: '187',
  studentsLabel: 'students in the first cohort',
  facts: [
    '24 weeks of live online classes for product managers, founders and operators',
    'Nine modules: AI-native product design with LLMs, RAG and agents; evaluating AI with metrics and red teaming; AI economics and go-to-market',
    'Each learner builds one AI product end to end and defends it before an IIT Kharagpur faculty panel',
  ],
  images: [
    { src: '/images/upgrad-hero.jpg', alt: 'The course page: IIT Kharagpur Executive Post Graduate Certificate in Building AI Products, Systems & Services, 6 months, 100% live online', width: 1250, height: 470 },
    { src: '/images/upgrad-curriculum.jpg', alt: 'Course overview: 24 weeks, 9 modules, 1 AI product, from AI opportunity to deployment', width: 640, height: 420 },
  ],
};

export const now = [
  'Co-Instructor on Building AI Products, Systems & Services at IIT Kharagpur with upGrad: 187 students in the first cohort.',
  'Shipping Kova, an AI-native HR platform for US small businesses.',
  'Getting Insightsflow, embedded analytics for SaaS teams, ready to launch.',
  'Finishing eight public AI builds, each scored with EvalKit.',
  'Released the Build Harness as open source: the Claude Code harness behind Kova, Insightsflow and every project here.',
  'PhD research at IIT Kharagpur, and training.',
];
