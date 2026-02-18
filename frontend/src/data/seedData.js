// LeadLens Seed Data — Mock data for prototype

export const ANONYMITY_THRESHOLD = 5;

export const domains = [
  { id: 'd1', name: 'Engineering', description: 'Core platform engineering, infrastructure, and developer tools. Responsible for building and maintaining the technical backbone of our products.', icon: 'code', color: 'chart-1' },
  { id: 'd2', name: 'Product Management', description: 'Product strategy, roadmap planning, and user experience. Drives product vision and ensures alignment with customer needs.', icon: 'layout', color: 'chart-2' },
  { id: 'd3', name: 'Design', description: 'User experience design, visual design, and design systems. Creates intuitive and beautiful experiences for our users.', icon: 'palette', color: 'chart-3' },
  { id: 'd4', name: 'Marketing', description: 'Brand strategy, growth marketing, and content. Builds awareness and drives engagement across all channels.', icon: 'megaphone', color: 'chart-4' },
  { id: 'd5', name: 'Data Science', description: 'Analytics, machine learning, and data infrastructure. Transforms data into actionable insights and intelligent features.', icon: 'brain', color: 'chart-5' },
];

export const managers = [
  { id: 'm1', name: 'Sarah Chen', title: 'VP Engineering', domainId: 'd1', avatar: 'SC' },
  { id: 'm2', name: 'James Rodriguez', title: 'Engineering Manager', domainId: 'd1', avatar: 'JR' },
  { id: 'm3', name: 'Priya Sharma', title: 'Director of Product', domainId: 'd2', avatar: 'PS' },
  { id: 'm4', name: 'Michael Okafor', title: 'Senior PM', domainId: 'd2', avatar: 'MO' },
  { id: 'm5', name: 'Emily Nakamura', title: 'Head of Design', domainId: 'd3', avatar: 'EN' },
  { id: 'm6', name: 'David Kim', title: 'UX Lead', domainId: 'd3', avatar: 'DK' },
  { id: 'm7', name: 'Lisa Thompson', title: 'CMO', domainId: 'd4', avatar: 'LT' },
  { id: 'm8', name: 'Alex Petrov', title: 'Growth Lead', domainId: 'd4', avatar: 'AP' },
  { id: 'm9', name: 'Rachel Green', title: 'Head of Data', domainId: 'd5', avatar: 'RG' },
  { id: 'm10', name: 'Tom Williams', title: 'ML Engineering Manager', domainId: 'd5', avatar: 'TW' },
];

export const projects = [
  { id: 'p1', name: 'Platform v3.0', description: 'Next-generation platform rebuild with microservices architecture', domainId: 'd1', managerId: 'm1', status: 'active' },
  { id: 'p2', name: 'DevOps Pipeline', description: 'CI/CD infrastructure modernization and automation', domainId: 'd1', managerId: 'm2', status: 'active' },
  { id: 'p3', name: 'Customer Portal', description: 'Self-service customer portal with analytics dashboard', domainId: 'd2', managerId: 'm3', status: 'active' },
  { id: 'p4', name: 'Mobile App v2', description: 'Complete mobile app redesign with offline-first approach', domainId: 'd2', managerId: 'm4', status: 'active' },
  { id: 'p5', name: 'Design System 2.0', description: 'Unified component library and design tokens', domainId: 'd3', managerId: 'm5', status: 'active' },
  { id: 'p6', name: 'User Research', description: 'Ongoing user research program and usability testing', domainId: 'd3', managerId: 'm6', status: 'active' },
  { id: 'p7', name: 'Brand Refresh', description: 'Company-wide brand identity refresh and guidelines', domainId: 'd4', managerId: 'm7', status: 'active' },
  { id: 'p8', name: 'Growth Engine', description: 'Data-driven growth experiments and optimization', domainId: 'd4', managerId: 'm8', status: 'active' },
  { id: 'p9', name: 'ML Pipeline', description: 'Production ML model training and deployment infrastructure', domainId: 'd5', managerId: 'm9', status: 'active' },
  { id: 'p10', name: 'Analytics Platform', description: 'Real-time analytics and business intelligence tools', domainId: 'd5', managerId: 'm10', status: 'active' },
];

const ratingCategories = [
  'communication', 'clarity', 'support', 'fairness', 'technicalGuidance'
];

const positiveComments = [
  'Great at communicating project goals and priorities clearly.',
  'Always available for one-on-ones and gives actionable feedback.',
  'Creates a psychologically safe environment for the team.',
  'Excellent at breaking down complex problems into manageable tasks.',
  'Very supportive of professional growth and learning opportunities.',
  'Does a great job balancing team workload and preventing burnout.',
  'Transparent about company direction and how our work fits in.',
  'Consistently recognizes and celebrates team achievements.',
  'Open to new ideas and encourages innovation.',
  'Handles conflicts fairly and with empathy.',
  'Strong technical knowledge that helps guide architectural decisions.',
  'Regularly shares context from leadership meetings.',
];

const improvementComments = [
  'Could provide more frequent feedback on individual performance.',
  'Sometimes decisions feel rushed without enough team input.',
  'Would benefit from more structured sprint planning sessions.',
  'Could improve delegation — sometimes takes on too much personally.',
  'More transparency around promotion criteria would be helpful.',
  'Would appreciate more technical deep-dives and knowledge sharing.',
  'Could set clearer expectations for deliverables and timelines.',
  'Sometimes hard to schedule time for career development discussions.',
  'Could improve at giving constructive criticism in a timely manner.',
  'Would benefit from establishing clearer team processes.',
];

const suggestionComments = [
  'Regular team retrospectives would help us continuously improve.',
  'A mentorship program would be valuable for junior team members.',
  'Consider implementing weekly office hours for open questions.',
  'Cross-team collaboration sessions could reduce silos.',
  'A quarterly skills assessment framework would help track growth.',
  'More investment in automated testing would improve quality.',
  'Consider rotating project leads to develop leadership skills.',
  'A team wiki or knowledge base would help with onboarding.',
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
    const domainProjects = projects.filter(p => p.domainId === manager.domainId);
    const count = randomInt(8, 22);
    
    for (let i = 0; i < count; i++) {
      feedback.push({
        id: `f${id++}`,
        domainId: manager.domainId,
        projectId: domainProjects.length > 0 ? randomChoice(domainProjects).id : null,
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
      'Consistent feedback highlights her ability to translate complex technical concepts for stakeholders.',
      'Team members appreciate her commitment to maintaining high engineering standards while fostering innovation.',
    ],
    strengths: [
      'Exceptional at setting clear technical direction and architectural standards',
      'Creates an inclusive and psychologically safe team environment',
      'Effective at mentoring senior engineers into leadership roles',
      'Strong cross-functional collaboration with Product and Design teams',
    ],
    improvementAreas: [
      'Could provide more frequent 1:1 feedback to direct reports',
      'Some team members feel decisions are sometimes made without sufficient input',
      'Delegation of operational tasks could be improved to focus on strategic work',
    ],
    recommendedActions: [
      'Establish bi-weekly skip-level meetings with team members',
      'Create a decision framework that outlines when team input is required',
      'Delegate routine operational decisions to senior engineers',
      'Set up monthly tech talks for knowledge sharing',
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
      'Priya is recognized for her strong product vision and ability to align teams around shared goals.',
      'Feedback consistently highlights her data-driven approach to decision-making.',
      'Team members value her advocacy for customer needs in product discussions.',
    ],
    strengths: [
      'Excellent product instincts backed by thorough research and data analysis',
      'Strong stakeholder management skills across all organizational levels',
      'Effective at creating clear product roadmaps and communicating priorities',
      'Advocates strongly for customer needs and user experience',
    ],
    improvementAreas: [
      'Could improve at saying no to scope creep and maintaining focus',
      'Technical estimation accuracy could be improved with more engineering collaboration',
      'Some feedback suggests meetings could be more structured with clearer agendas',
    ],
    recommendedActions: [
      'Implement a formal scope change management process',
      'Schedule regular estimation workshops with engineering leads',
      'Adopt a structured meeting format with pre-read materials',
      'Create a product decision log for transparency',
    ],
    plan30_60_90: {
      days30: 'Establish meeting guidelines and agenda templates. Begin joint estimation sessions with engineering. Document current scope management practices.',
      days60: 'Implement scope change request process. Launch a product decisions wiki. Conduct mid-cycle feedback check-in with the team.',
      days90: 'Review effectiveness of new processes. Establish quarterly product strategy reviews. Create cross-functional alignment workshops.',
    },
    risks: [
      'Upcoming product launches may compete with development plan priorities',
      'Scope management changes may face initial resistance',
    ],
    confidence: 'High — based on 12 anonymous responses with clear patterns',
  },
};

// Default AI summary for managers without specific ones
export const defaultAiSummary = {
  developmentSummary: [
    'This manager shows solid fundamentals in team leadership and communication.',
    'Feedback indicates a consistent effort to support team members professional growth.',
    'Areas of strength and development are well-balanced, suggesting a growth-oriented leader.',
  ],
  strengths: [
    'Good communication with team members on project goals',
    'Supportive of individual growth and learning opportunities',
    'Fair and balanced in workload distribution',
    'Responsive to team feedback and concerns',
  ],
  improvementAreas: [
    'Could provide more structured and actionable performance feedback',
    'Time management for 1:1s could be more consistent',
    'Cross-team collaboration could be strengthened',
  ],
  recommendedActions: [
    'Establish regular feedback cadence with structured templates',
    'Block dedicated time for 1:1 meetings weekly',
    'Initiate cross-team knowledge sharing sessions',
    'Create personal development plans with each team member',
  ],
  plan30_60_90: {
    days30: 'Set up consistent 1:1 schedule. Begin using structured feedback templates. Schedule cross-team introductions.',
    days60: 'Launch individual development plans. Start monthly team retrospectives. Implement meeting effectiveness improvements.',
    days90: 'Review progress on development plans. Assess team satisfaction improvements. Establish ongoing leadership development goals.',
  },
  risks: [
    'Implementation consistency may vary with project deadlines',
    'Team dynamics may require adapted approaches over time',
  ],
  confidence: 'Moderate — based on available anonymous responses',
};

export const users = [
  { id: 'u1', email: 'admin@leadlens.io', name: 'Admin User', role: 'leadership', avatar: 'AU' },
  { id: 'u2', email: 'employee@leadlens.io', name: 'Jane Employee', role: 'employee', avatar: 'JE' },
  { id: 'u3', email: 'john@leadlens.io', name: 'John Smith', role: 'employee', avatar: 'JS' },
  { id: 'u4', email: 'maria@leadlens.io', name: 'Maria Garcia', role: 'employee', avatar: 'MG' },
  { id: 'u5', email: 'admin2@leadlens.io', name: 'Director Alex', role: 'leadership', avatar: 'DA' },
];
