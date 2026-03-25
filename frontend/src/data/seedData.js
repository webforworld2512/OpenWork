// OpenWork Seed Data — Mock data for prototype

export const ANONYMITY_THRESHOLD = 5;

export const businessUnits = [
  { id: 'd1', name: 'Engineering', description: 'Core platform engineering, infrastructure, and developer tools. Responsible for building and maintaining the technical backbone of products and services.', icon: 'code', color: 'chart-1' },
  { id: 'd2', name: 'Human Resources', description: 'People operations, talent acquisition, employee engagement, and organizational development. Drives culture and supports employee growth.', icon: 'users', color: 'chart-2' },
  { id: 'd3', name: 'Accounting & Finance', description: 'Financial planning, budgeting, reporting, and compliance. Ensures fiscal responsibility and strategic financial decision-making.', icon: 'calculator', color: 'chart-3' },
  { id: 'd4', name: 'Sales', description: 'Revenue generation, client relationships, and business development. Drives growth through strategic partnerships and customer acquisition.', icon: 'handshake', color: 'chart-4' },
  { id: 'd5', name: 'Marketing', description: 'Brand strategy, growth marketing, demand generation, and content. Builds awareness and drives engagement across all channels.', icon: 'megaphone', color: 'chart-5' },
  { id: 'd6', name: 'Operations', description: 'Business operations, process optimization, supply chain, and logistics. Ensures efficient delivery of products and services.', icon: 'settings', color: 'chart-1' },
  { id: 'd7', name: 'Design', description: 'User experience design, visual design, and design systems. Creates intuitive and beautiful experiences for users and customers.', icon: 'palette', color: 'chart-2' },
  { id: 'd8', name: 'Data Science & Analytics', description: 'Analytics, machine learning, and data infrastructure. Transforms data into actionable insights and intelligent business decisions.', icon: 'brain', color: 'chart-3' },
];

export const managers = [
  { id: 'm1', name: 'Sarah Chen', title: 'VP Engineering', businessUnitId: 'd1', avatar: 'SC', email: 'sarah@openwork.io' },
  { id: 'm2', name: 'James Rodriguez', title: 'Engineering Director', businessUnitId: 'd1', avatar: 'JR', email: 'james@openwork.io' },
  { id: 'm3', name: 'Priya Sharma', title: 'HR Director', businessUnitId: 'd2', avatar: 'PS', email: 'priya@openwork.io' },
  { id: 'm4', name: 'Michael Okafor', title: 'Talent Development Lead', businessUnitId: 'd2', avatar: 'MO', email: 'michael@openwork.io' },
  { id: 'm5', name: 'Emily Nakamura', title: 'CFO', businessUnitId: 'd3', avatar: 'EN', email: 'emily@openwork.io' },
  { id: 'm6', name: 'David Kim', title: 'Finance Manager', businessUnitId: 'd3', avatar: 'DK', email: 'david@openwork.io' },
  { id: 'm7', name: 'Lisa Thompson', title: 'VP Sales', businessUnitId: 'd4', avatar: 'LT', email: 'lisa@openwork.io' },
  { id: 'm8', name: 'Alex Petrov', title: 'Sales Director', businessUnitId: 'd4', avatar: 'AP', email: 'alex@openwork.io' },
  { id: 'm9', name: 'Rachel Green', title: 'CMO', businessUnitId: 'd5', avatar: 'RG', email: 'rachel@openwork.io' },
  { id: 'm10', name: 'Tom Williams', title: 'Operations Director', businessUnitId: 'd6', avatar: 'TW', email: 'tom@openwork.io' },
  { id: 'm11', name: 'Nina Patel', title: 'Head of Design', businessUnitId: 'd7', avatar: 'NP', email: 'nina@openwork.io' },
  { id: 'm12', name: 'Carlos Rivera', title: 'Head of Data', businessUnitId: 'd8', avatar: 'CR', email: 'carlos@openwork.io' },
];

export const initiatives = [
  { id: 'p1', name: 'Digital Transformation', description: 'Company-wide digital transformation initiative encompassing process automation, cloud migration, and modern tooling adoption across all departments.', businessUnitId: 'd1', managerId: 'm1', status: 'active' },
  { id: 'p2', name: 'Cloud Infrastructure Migration', description: 'Migration of on-premise infrastructure to cloud-native architecture, improving scalability, reliability, and cost efficiency.', businessUnitId: 'd1', managerId: 'm2', status: 'active' },
  { id: 'p3', name: 'HR Process Automation', description: 'Cross-functional initiative spanning IT, HR, and Operations to automate onboarding, performance reviews, and benefits administration.', businessUnitId: 'd2', managerId: 'm3', status: 'active' },
  { id: 'p4', name: 'Employee Wellness Program', description: 'Comprehensive employee wellness and engagement initiative including mental health support, flexible work policies, and professional development.', businessUnitId: 'd2', managerId: 'm4', status: 'active' },
  { id: 'p5', name: 'Financial Systems Modernization', description: 'Upgrading financial reporting, budgeting tools, and compliance systems to meet evolving regulatory requirements.', businessUnitId: 'd3', managerId: 'm5', status: 'active' },
  { id: 'p6', name: 'Revenue Forecasting Overhaul', description: 'Implementing advanced analytics and AI-driven forecasting models to improve accuracy of quarterly and annual revenue projections.', businessUnitId: 'd3', managerId: 'm6', status: 'active' },
  { id: 'p7', name: 'Enterprise Sales Expansion', description: 'Strategic expansion into enterprise market segments with new sales processes, partnership frameworks, and account management structures.', businessUnitId: 'd4', managerId: 'm7', status: 'active' },
  { id: 'p8', name: 'Customer Success Transformation', description: 'Redesigning the customer success function to improve retention, reduce churn, and drive upsell through proactive engagement strategies.', businessUnitId: 'd4', managerId: 'm8', status: 'active' },
  { id: 'p9', name: 'Brand Refresh & Market Repositioning', description: 'Company-wide brand identity refresh, market repositioning, and integrated marketing campaign across digital and traditional channels.', businessUnitId: 'd5', managerId: 'm9', status: 'active' },
  { id: 'p10', name: 'Supply Chain Optimization', description: 'End-to-end supply chain optimization focusing on vendor management, logistics efficiency, and cost reduction across global operations.', businessUnitId: 'd6', managerId: 'm10', status: 'active' },
  { id: 'p11', name: 'Product Experience Redesign', description: 'Major redesign of the core product experience including design system, accessibility improvements, and cross-platform consistency.', businessUnitId: 'd7', managerId: 'm11', status: 'active' },
  { id: 'p12', name: 'Enterprise Analytics Platform', description: 'Building a unified data analytics platform to democratize data access and enable self-service business intelligence across the organization.', businessUnitId: 'd8', managerId: 'm12', status: 'active' },
  { id: 'p13', name: 'Cybersecurity Enhancement', description: 'Organization-wide cybersecurity initiative covering threat detection, employee training, compliance frameworks, and incident response.', businessUnitId: 'd1', managerId: 'm2', status: 'active' },
  { id: 'p14', name: 'Diversity & Inclusion Program', description: 'Cross-functional D&I initiative including hiring practices, leadership development, ERGs, and inclusive culture building.', businessUnitId: 'd2', managerId: 'm3', status: 'active' },
];

const ratingCategories = [
  'communication', 'clarity', 'support', 'fairness', 'technicalGuidance'
];

const positiveComments = [
  'Great at communicating initiative goals and priorities clearly.',
  'Always available for one-on-ones and gives actionable feedback.',
  'Creates a psychologically safe environment for the team.',
  'Excellent at breaking down complex problems into manageable tasks.',
  'Very supportive of professional growth and learning opportunities.',
  'Does a great job balancing team workload and preventing burnout.',
  'Transparent about company direction and how our work fits in.',
  'Consistently recognizes and celebrates team achievements.',
  'Open to new ideas and encourages innovation.',
  'Handles conflicts fairly and with empathy.',
  'Strong knowledge that helps guide strategic decisions.',
  'Regularly shares context from leadership meetings.',
  'Excellent at fostering collaboration across different business units.',
  'Creates a culture where diverse perspectives are valued.',
  'Very approachable and makes time for team members even during busy periods.',
];

const improvementComments = [
  'Could provide more frequent feedback on individual performance.',
  'Sometimes decisions feel rushed without enough team input.',
  'Would benefit from more structured planning sessions.',
  'Could improve delegation — sometimes takes on too much personally.',
  'More transparency around promotion criteria would be helpful.',
  'Would appreciate more deep-dives and knowledge sharing sessions.',
  'Could set clearer expectations for deliverables and timelines.',
  'Sometimes hard to schedule time for career development discussions.',
  'Could improve at giving constructive criticism in a timely manner.',
  'Would benefit from establishing clearer team processes.',
  'More consistent follow-through on action items from meetings would help.',
  'Could improve communication during organizational changes.',
];

const suggestionComments = [
  'Regular team retrospectives would help us continuously improve.',
  'A mentorship program would be valuable for team members at all levels.',
  'Consider implementing weekly office hours for open questions.',
  'Cross-team collaboration sessions could reduce silos.',
  'A quarterly skills assessment framework would help track growth.',
  'More investment in professional development budgets would be appreciated.',
  'Consider rotating initiative leads to develop leadership skills.',
  'A team wiki or knowledge base would help with onboarding.',
  'Regular lunch-and-learn sessions could boost cross-functional learning.',
  'Anonymous feedback channels beyond this tool could be valuable.',
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRatings() {
  const ratings = {};
  ratingCategories.forEach(cat => {
    ratings[cat] = randomInt(2, 5);
  });
  return ratings;
}

const months = ['2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'];

export function generateFeedback() {
  const feedback = [];
  let id = 1;
  
  managers.forEach(manager => {
    const unitInitiatives = initiatives.filter(p => p.businessUnitId === manager.businessUnitId);
    const count = randomInt(8, 22);
    
    for (let i = 0; i < count; i++) {
      feedback.push({
        id: `f${id++}`,
        businessUnitId: manager.businessUnitId,
        initiativeId: unitInitiatives.length > 0 ? randomChoice(unitInitiatives).id : null,
        managerId: manager.id,
        ratings: generateRatings(),
        positiveComment: randomChoice(positiveComments),
        improvementComment: randomChoice(improvementComments),
        suggestion: randomChoice(suggestionComments),
        submittedAt: `${randomChoice(months)}-${String(randomInt(1, 28)).padStart(2, '0')}`,
      });
    }
  });
  
  return feedback;
}

export const aiSummaries = {
  'm1': {
    developmentSummary: [
      'Sarah demonstrates strong technical leadership and strategic vision for the engineering organization.',
      'Consistent feedback highlights her ability to translate complex technical concepts for stakeholders across business units.',
      'Team members appreciate her commitment to maintaining high engineering standards while fostering innovation.',
    ],
    strengths: [
      'Exceptional at setting clear technical direction and architectural standards',
      'Creates an inclusive and psychologically safe team environment',
      'Effective at mentoring senior engineers into leadership roles',
      'Strong cross-functional collaboration with other business units',
    ],
    improvementAreas: [
      'Could provide more frequent 1:1 feedback to direct reports',
      'Some team members feel decisions are sometimes made without sufficient input',
      'Delegation of operational tasks could be improved to focus on strategic work',
    ],
    behavioralInsights: [
      'Tends to be highly detail-oriented during initiative planning phases, which team members appreciate but can slow decision velocity',
      'Communication style is most effective in structured settings; less consistent in ad-hoc conversations',
      'Strong tendency to shield team from organizational noise, which is valued but sometimes limits context sharing',
    ],
    recommendedActions: [
      'Establish bi-weekly skip-level meetings with team members',
      'Create a decision framework that outlines when team input is required',
      'Delegate routine operational decisions to senior engineers',
      'Set up monthly knowledge-sharing sessions across teams',
    ],
    learningResources: [
      { title: 'Radical Candor by Kim Scott', type: 'Book', focus: 'Feedback & Communication' },
      { title: 'Delegation Mastery Workshop', type: 'Course', focus: 'Delegation Skills' },
      { title: 'Inclusive Leadership Practices', type: 'Workshop', focus: 'Team Culture' },
      { title: 'Strategic Thinking for Tech Leaders', type: 'Program', focus: 'Strategic Leadership' },
    ],
    plan30_60_90: {
      days30: 'Implement structured 1:1 cadence with all direct reports. Establish a decision-making framework document. Begin weekly office hours for open questions.',
      days60: 'Launch a mentorship pairing program. Conduct team survey on communication preferences. Start monthly architecture review sessions.',
      days90: 'Review and adjust delegation model based on team feedback. Establish quarterly leadership development goals. Create a team health scorecard.',
    },
    risks: [
      'High workload may limit time for implementing development plan',
      'Team changes in Q2 may require adapted approach',
    ],
    confidence: 'High — based on 15 anonymous responses with consistent themes',
  },
  'm3': {
    developmentSummary: [
      'Priya is recognized for her strong people-first leadership and ability to align HR initiatives with business goals.',
      'Feedback consistently highlights her empathetic approach to employee relations and talent development.',
      'Team members value her advocacy for employee wellbeing in organizational discussions.',
    ],
    strengths: [
      'Excellent people instincts backed by thorough understanding of organizational dynamics',
      'Strong stakeholder management skills across all organizational levels',
      'Effective at creating clear HR roadmaps and communicating policy changes',
      'Advocates strongly for employee wellbeing and professional development',
    ],
    improvementAreas: [
      'Could improve at saying no to scope creep in cross-functional initiatives',
      'Timeline estimation for complex HR programs could be more realistic',
      'Some feedback suggests meetings could be more structured with clearer agendas',
    ],
    behavioralInsights: [
      'Naturally empathetic leadership style builds strong trust but can sometimes delay difficult conversations',
      'Excels in one-on-one settings; could bring the same warmth to larger group dynamics',
      'Tendency to take on emotional labor for the team, which is appreciated but may lead to burnout',
    ],
    recommendedActions: [
      'Implement a formal scope change management process for HR initiatives',
      'Schedule regular cross-functional planning workshops',
      'Adopt a structured meeting format with pre-read materials',
      'Create an HR decision log for transparency',
    ],
    learningResources: [
      { title: 'Crucial Conversations', type: 'Book', focus: 'Difficult Conversations' },
      { title: 'Program Management for HR Leaders', type: 'Course', focus: 'Initiative Management' },
      { title: 'Data-Driven HR Decisions', type: 'Workshop', focus: 'Analytics for HR' },
    ],
    plan30_60_90: {
      days30: 'Establish meeting guidelines and agenda templates. Begin joint planning sessions with cross-functional leads. Document current scope management practices.',
      days60: 'Implement scope change request process. Launch an HR decisions wiki. Conduct mid-cycle feedback check-in with the team.',
      days90: 'Review effectiveness of new processes. Establish quarterly HR strategy reviews. Create cross-functional alignment workshops.',
    },
    risks: [
      'Upcoming organizational changes may compete with development plan priorities',
      'Scope management changes may face initial resistance from stakeholders',
    ],
    confidence: 'High — based on 12 anonymous responses with clear patterns',
  },
};

// Default AI summary for managers without specific ones
export const defaultAiSummary = {
  developmentSummary: [
    'This leader shows solid fundamentals in team leadership and communication.',
    'Feedback indicates a consistent effort to support team members\' professional growth.',
    'Areas of strength and development are well-balanced, suggesting a growth-oriented leader.',
  ],
  strengths: [
    'Good communication with team members on initiative goals',
    'Supportive of individual growth and learning opportunities',
    'Fair and balanced in workload distribution',
    'Responsive to team feedback and concerns',
  ],
  improvementAreas: [
    'Could provide more structured and actionable performance feedback',
    'Time management for 1:1s could be more consistent',
    'Cross-team collaboration could be strengthened',
  ],
  behavioralInsights: [
    'Generally consistent in communication style but may vary under pressure',
    'Team members appreciate accessibility but note occasional scheduling challenges',
    'Balanced approach to risk-taking in initiative decisions',
  ],
  recommendedActions: [
    'Establish regular feedback cadence with structured templates',
    'Block dedicated time for 1:1 meetings weekly',
    'Initiate cross-team knowledge sharing sessions',
    'Create personal development plans with each team member',
  ],
  learningResources: [
    { title: 'The Making of a Manager by Julie Zhuo', type: 'Book', focus: 'Management Fundamentals' },
    { title: 'Effective 1:1 Meetings', type: 'Course', focus: 'Communication' },
    { title: 'Cross-Functional Leadership', type: 'Workshop', focus: 'Collaboration' },
  ],
  plan30_60_90: {
    days30: 'Set up consistent 1:1 schedule. Begin using structured feedback templates. Schedule cross-team introductions.',
    days60: 'Launch individual development plans. Start monthly team retrospectives. Implement meeting effectiveness improvements.',
    days90: 'Review progress on development plans. Assess team satisfaction improvements. Establish ongoing leadership development goals.',
  },
  risks: [
    'Implementation consistency may vary with initiative deadlines',
    'Team dynamics may require adapted approaches over time',
  ],
  confidence: 'Moderate — based on available anonymous responses',
};

export const users = [
  { id: 'u1', email: 'admin@openwork.io', name: 'Admin User', role: 'leadership', avatar: 'AU' },
  { id: 'u2', email: 'employee@openwork.io', name: 'Jane Employee', role: 'employee', avatar: 'JE' },
  { id: 'u3', email: 'manager@openwork.io', name: 'Sarah Chen', role: 'manager', managerId: 'm1', avatar: 'SC' },
  { id: 'u4', email: 'john@openwork.io', name: 'John Smith', role: 'employee', avatar: 'JS' },
  { id: 'u5', email: 'maria@openwork.io', name: 'Maria Garcia', role: 'employee', avatar: 'MG' },
  { id: 'u6', email: 'admin2@openwork.io', name: 'Director Alex', role: 'leadership', avatar: 'DA' },
  { id: 'u7', email: 'priya@openwork.io', name: 'Priya Sharma', role: 'manager', managerId: 'm3', avatar: 'PS' },
];
