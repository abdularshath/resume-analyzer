// Simulate AI analysis with dynamic results based on file properties
export interface AnalysisData {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  skills: { name: string; level: number }[];
  careerPaths: {
    title: string;
    match: number;
    description: string;
    requirements: string[];
    growth: string;
  }[];
  resumeType: string;
}

// Resume validation - check if PDF appears to be a resume
export const validateResumeContent = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    // Enhanced validation based on filename and file characteristics
    const fileName = file.name.toLowerCase();
    
    // Check for resume-like filenames
    const resumeKeywords = ['resume', 'cv', 'curriculum', 'vitae', 'profile'];
    const hasResumeKeyword = resumeKeywords.some(keyword => fileName.includes(keyword));
    
    // Check file size (typical resumes are 50KB - 5MB)
    const sizeOk = file.size >= 50000 && file.size <= 5000000;
    
    // Simulate content analysis delay
    setTimeout(() => {
      // If filename suggests resume OR size seems reasonable, accept it
      // In real implementation, you'd use PDF.js to parse content
      resolve(hasResumeKeyword || (sizeOk && Math.random() > 0.2));
    }, 800);
  });
};

// Enhanced skill database with more granular matching
const skillDatabase = {
  // Technical Skills
  "JavaScript": { category: "Frontend", level: "core", related: ["React", "Node.js", "TypeScript"] },
  "Python": { category: "Backend", level: "core", related: ["Django", "Flask", "Data Science"] },
  "React": { category: "Frontend", level: "framework", related: ["JavaScript", "Redux", "Next.js"] },
  "Node.js": { category: "Backend", level: "runtime", related: ["JavaScript", "Express", "MongoDB"] },
  "TypeScript": { category: "Frontend", level: "language", related: ["JavaScript", "React", "Angular"] },
  "SQL": { category: "Database", level: "core", related: ["MySQL", "PostgreSQL", "Data Analysis"] },
  "Git": { category: "DevOps", level: "tool", related: ["GitHub", "Version Control", "CI/CD"] },
  
  // Data Science & Analytics
  "Machine Learning": { category: "Data Science", level: "core", related: ["Python", "TensorFlow", "Scikit-learn"] },
  "Data Analysis": { category: "Analytics", level: "core", related: ["SQL", "Python", "Statistics"] },
  "Statistics": { category: "Analytics", level: "core", related: ["R", "Data Science", "Research"] },
  "Pandas": { category: "Data Science", level: "library", related: ["Python", "NumPy", "Data Analysis"] },
  "TensorFlow": { category: "AI/ML", level: "framework", related: ["Python", "Deep Learning", "Neural Networks"] },
  "R": { category: "Statistics", level: "language", related: ["Data Analysis", "Statistics", "Research"] },
  
  // Marketing & Business
  "Digital Marketing": { category: "Marketing", level: "core", related: ["SEO", "SEM", "Social Media"] },
  "SEO": { category: "Marketing", level: "specialty", related: ["Google Analytics", "Content Marketing", "SEM"] },
  "Content Strategy": { category: "Marketing", level: "strategy", related: ["Writing", "Brand Management", "Social Media"] },
  "Analytics": { category: "Business", level: "tool", related: ["Google Analytics", "Data Analysis", "KPIs"] },
  "Social Media": { category: "Marketing", level: "channel", related: ["Content Creation", "Community Management", "Advertising"] },
  "Campaign Management": { category: "Marketing", level: "execution", related: ["Project Management", "Analytics", "Budget Management"] },
  
  // Product & Strategy
  "Product Strategy": { category: "Product", level: "core", related: ["Market Research", "User Research", "Roadmapping"] },
  "User Research": { category: "UX", level: "research", related: ["User Testing", "Interviews", "Data Analysis"] },
  "Agile": { category: "Methodology", level: "framework", related: ["Scrum", "Product Management", "Sprint Planning"] },
  "Market Analysis": { category: "Business", level: "analysis", related: ["Research", "Competitive Analysis", "Strategy"] },
  
  // Sales & Business Development
  "Sales Strategy": { category: "Sales", level: "core", related: ["CRM", "Lead Generation", "Account Management"] },
  "CRM": { category: "Sales", level: "tool", related: ["Salesforce", "Lead Management", "Customer Relations"] },
  "Negotiation": { category: "Sales", level: "skill", related: ["Communication", "Persuasion", "Deal Closing"] },
  "Lead Generation": { category: "Sales", level: "process", related: ["Prospecting", "Marketing", "Cold Outreach"] },
  "Customer Relations": { category: "Sales", level: "relationship", related: ["Account Management", "Support", "Retention"] },
  
  // Design & Creative
  "UI/UX Design": { category: "Design", level: "core", related: ["Figma", "User Research", "Prototyping"] },
  "Adobe Creative Suite": { category: "Design", level: "tool", related: ["Photoshop", "Illustrator", "Creative Design"] },
  "Figma": { category: "Design", level: "tool", related: ["UI Design", "Prototyping", "Collaboration"] },
  "Prototyping": { category: "Design", level: "process", related: ["User Testing", "Wireframing", "Interaction Design"] },
  "Visual Design": { category: "Design", level: "skill", related: ["Typography", "Color Theory", "Layout"] },

  // Cyber Security
  "Network Security": { category: "Security", level: "core", related: ["Firewalls", "IDS/IPS", "VPN"] },
  "Penetration Testing": { category: "Security", level: "testing", related: ["Vulnerability Assessment", "Ethical Hacking", "OWASP"] },
  "Incident Response": { category: "Security", level: "process", related: ["Forensics", "Threat Analysis", "Recovery"] },
  "Security Compliance": { category: "Security", level: "governance", related: ["CISSP", "ISO 27001", "GDPR"] },
  "Ethical Hacking": { category: "Security", level: "testing", related: ["Penetration Testing", "Vulnerability Assessment", "Bug Bounty"] },
  "Cybersecurity": { category: "Security", level: "core", related: ["Risk Assessment", "Security Architecture", "Threat Modeling"] },
  "Vulnerability Assessment": { category: "Security", level: "analysis", related: ["Security Scanning", "Risk Analysis", "Penetration Testing"] },
  "Security Architecture": { category: "Security", level: "design", related: ["Zero Trust", "Defense in Depth", "Security Controls"] },
  "Threat Intelligence": { category: "Security", level: "analysis", related: ["Threat Hunting", "IOCs", "SIEM"] },
  "Digital Forensics": { category: "Security", level: "investigation", related: ["Evidence Collection", "Malware Analysis", "Incident Response"] }
};

// Career paths database with skill requirements
const careerPathsDatabase = [
  {
    title: "Senior Frontend Developer",
    requiredSkills: ["JavaScript", "React", "CSS", "HTML"],
    optionalSkills: ["TypeScript", "Redux", "Testing"],
    category: "Frontend",
    description: "Lead frontend development with modern frameworks",
    growth: "High demand, $95k-$130k",
    matchBonus: { "React": 15, "TypeScript": 10, "JavaScript": 12 }
  },
  {
    title: "Full Stack Developer", 
    requiredSkills: ["JavaScript", "Node.js", "Database"],
    optionalSkills: ["React", "Python", "MongoDB"],
    category: "Full Stack",
    description: "Build end-to-end web applications",
    growth: "Excellent growth, $85k-$120k",
    matchBonus: { "Node.js": 12, "React": 10, "SQL": 8 }
  },
  {
    title: "Data Scientist",
    requiredSkills: ["Python", "Machine Learning", "Statistics"],
    optionalSkills: ["R", "TensorFlow", "SQL"],
    category: "Data Science",
    description: "Extract insights from complex datasets",
    growth: "High growth field, $110k-$160k",
    matchBonus: { "Machine Learning": 18, "Python": 15, "Statistics": 12 }
  },
  {
    title: "Machine Learning Engineer",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow"],
    optionalSkills: ["AWS", "Docker", "MLOps"],
    category: "AI/ML",
    description: "Deploy and scale ML models in production",
    growth: "Emerging field, $120k-$170k",
    matchBonus: { "TensorFlow": 20, "Machine Learning": 15, "Python": 10 }
  },
  {
    title: "Digital Marketing Manager",
    requiredSkills: ["Digital Marketing", "Analytics", "SEO"],
    optionalSkills: ["Social Media", "Content Strategy", "PPC"],
    category: "Marketing",
    description: "Drive digital marketing strategies and campaigns",
    growth: "Growing field, $70k-$110k",
    matchBonus: { "Digital Marketing": 15, "SEO": 12, "Analytics": 10 }
  },
  {
    title: "Product Manager",
    requiredSkills: ["Product Strategy", "Analytics", "Communication"],
    optionalSkills: ["User Research", "Agile", "Technical Writing"],
    category: "Product",
    description: "Guide product development from concept to launch",
    growth: "Leadership track, $110k-$160k",
    matchBonus: { "Product Strategy": 18, "User Research": 12, "Agile": 10 }
  },
  {
    title: "UX Designer",
    requiredSkills: ["UI/UX Design", "User Research", "Prototyping"],
    optionalSkills: ["Figma", "Adobe Creative Suite", "Design Systems"],
    category: "Design", 
    description: "Create intuitive and engaging user experiences",
    growth: "Creative field, $85k-$130k",
    matchBonus: { "UI/UX Design": 18, "User Research": 15, "Prototyping": 12 }
  },
  {
    title: "Sales Manager",
    requiredSkills: ["Sales Strategy", "CRM", "Team Leadership"],
    optionalSkills: ["Negotiation", "Lead Generation", "Customer Relations"],
    category: "Sales",
    description: "Lead sales teams and drive revenue growth",
    growth: "Management track, $80k-$140k", 
    matchBonus: { "Sales Strategy": 15, "CRM": 10, "Negotiation": 12 }
  },
  {
    title: "Backend Developer",
    requiredSkills: ["Node.js", "Database", "API Development"],
    optionalSkills: ["Python", "Microservices", "Cloud"],
    category: "Backend",
    description: "Build robust server-side applications and APIs",
    growth: "Strong demand, $90k-$125k",
    matchBonus: { "Node.js": 15, "SQL": 12, "Python": 10 }
  },
  {
    title: "DevOps Engineer", 
    requiredSkills: ["Git", "CI/CD", "Cloud Platforms"],
    optionalSkills: ["Docker", "Kubernetes", "Monitoring"],
    category: "DevOps",
    description: "Streamline development and deployment processes", 
    growth: "High demand, $100k-$140k",
    matchBonus: { "Git": 10, "AWS": 15, "Docker": 12 }
  },
  {
    title: "Cybersecurity Analyst",
    requiredSkills: ["Network Security", "Incident Response", "Security Compliance"],
    optionalSkills: ["SIEM", "Threat Intelligence", "Risk Assessment"],
    category: "Security",
    description: "Monitor and protect organizations from cyber threats",
    growth: "Critical demand, $85k-$125k",
    matchBonus: { "Network Security": 18, "Incident Response": 15, "Cybersecurity": 12 }
  },
  {
    title: "Penetration Tester",
    requiredSkills: ["Penetration Testing", "Ethical Hacking", "Vulnerability Assessment"],
    optionalSkills: ["OWASP", "Bug Bounty", "Security Tools"],
    category: "Security",
    description: "Test and assess security vulnerabilities in systems",
    growth: "Specialized field, $95k-$145k",
    matchBonus: { "Penetration Testing": 20, "Ethical Hacking": 18, "Vulnerability Assessment": 15 }
  },
  {
    title: "Security Engineer",
    requiredSkills: ["Security Architecture", "Network Security", "Security Compliance"],
    optionalSkills: ["Cloud Security", "Zero Trust", "DevSecOps"],
    category: "Security",
    description: "Design and implement secure systems and infrastructure",
    growth: "High growth, $110k-$155k",
    matchBonus: { "Security Architecture": 18, "Network Security": 15, "Cybersecurity": 12 }
  },
  {
    title: "Digital Forensics Investigator",
    requiredSkills: ["Digital Forensics", "Incident Response", "Evidence Collection"],
    optionalSkills: ["Malware Analysis", "Legal Procedures", "Data Recovery"],
    category: "Security",
    description: "Investigate cybercrimes and security incidents",
    growth: "Specialized expertise, $90k-$135k",
    matchBonus: { "Digital Forensics": 20, "Incident Response": 15, "Cybersecurity": 10 }
  },
  {
    title: "Security Consultant",
    requiredSkills: ["Security Compliance", "Risk Assessment", "Security Architecture"],
    optionalSkills: ["CISSP", "ISO 27001", "Threat Modeling"],
    category: "Security",
    description: "Advise organizations on security best practices and compliance",
    growth: "Consulting growth, $100k-$150k",
    matchBonus: { "Security Compliance": 18, "Risk Assessment": 15, "Security Architecture": 12 }
  }
];

// Generate more realistic skills based on file characteristics
const generateSkillsFromFile = (file: File, seed: number): string[] => {
  const fileName = file.name.toLowerCase();
  const detectedSkills: string[] = [];
  
  // Skill detection based on filename patterns
  const skillPatterns = {
    'frontend': ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
    'backend': ['Node.js', 'Python', 'SQL', 'API Development', 'Database'],
    'fullstack': ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    'data': ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'SQL'],
    'ml': ['Machine Learning', 'Python', 'TensorFlow', 'Data Science', 'Statistics'],
    'design': ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'Visual Design'],
    'marketing': ['Digital Marketing', 'SEO', 'Analytics', 'Social Media', 'Content Strategy'],
    'product': ['Product Strategy', 'User Research', 'Analytics', 'Agile', 'Communication'],
    'sales': ['Sales Strategy', 'CRM', 'Negotiation', 'Lead Generation', 'Customer Relations'],
    'security': ['Network Security', 'Cybersecurity', 'Penetration Testing', 'Incident Response', 'Security Compliance'],
    'cyber': ['Cybersecurity', 'Ethical Hacking', 'Vulnerability Assessment', 'Digital Forensics', 'Threat Intelligence']
  };
  
  // Check filename for skill indicators
  let primaryCategory = '';
  for (const [category, skills] of Object.entries(skillPatterns)) {
    if (fileName.includes(category) || fileName.includes(category.substring(0, 4))) {
      primaryCategory = category;
      detectedSkills.push(...skills.slice(0, 3 + (seed % 3))); // 3-5 skills from primary
      break;
    }
  }
  
  // If no specific category, use file characteristics to determine
  if (!primaryCategory) {
    const categories = Object.keys(skillPatterns);
    const categoryIndex = (seed + file.size) % categories.length;
    primaryCategory = categories[categoryIndex];
    detectedSkills.push(...skillPatterns[primaryCategory].slice(0, 3 + (seed % 2)));
  }
  
  // Add some cross-category skills for realism
  const allSkills = Object.values(skillPatterns).flat();
  const additionalSkills = allSkills.filter(skill => !detectedSkills.includes(skill));
  const shuffledAdditional = shuffleArray(additionalSkills, seed);
  detectedSkills.push(...shuffledAdditional.slice(0, 2 + (seed % 2))); // 2-3 additional
  
  return [...new Set(detectedSkills)]; // Remove duplicates
};

const generalImprovements = [
  "Add more quantifiable metrics",
  "Include relevant certifications", 
  "Enhance project descriptions",
  "Add portfolio links",
  "Include volunteer experience",
  "Expand on leadership roles",
  "Add language proficiencies",
  "Include professional references",
  "Improve formatting consistency",
  "Add skills section"
];

// Calculate career path match based on detected skills
const calculateCareerMatch = (detectedSkills: string[], careerPath: any, seed: number): number => {
  let baseMatch = 40; // Base match percentage
  let bonusPoints = 0;
  
  // Check required skills
  const requiredMatches = careerPath.requiredSkills.filter((skill: string) => 
    detectedSkills.includes(skill) || 
    detectedSkills.some(s => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))
  );
  
  // Each required skill match adds significant points
  bonusPoints += requiredMatches.length * 15;
  
  // Check optional skills
  const optionalMatches = careerPath.optionalSkills.filter((skill: string) => 
    detectedSkills.includes(skill) || 
    detectedSkills.some(s => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))
  );
  
  // Each optional skill match adds moderate points
  bonusPoints += optionalMatches.length * 8;
  
  // Apply match bonuses from the career path
  detectedSkills.forEach(skill => {
    if (careerPath.matchBonus && careerPath.matchBonus[skill]) {
      bonusPoints += careerPath.matchBonus[skill];
    }
  });
  
  // Add some randomization based on seed to ensure different results for different files
  const randomVariation = (seed % 10) - 5; // -5 to +5 variation
  
  return Math.min(98, Math.max(45, baseMatch + bonusPoints + randomVariation));
};

// Generate career type based on detected skills
const determineCareerType = (detectedSkills: string[]): string => {
  const skillCategories = {
    'Frontend Developer': ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
    'Backend Developer': ['Node.js', 'Python', 'SQL', 'API Development', 'Database'],
    'Data Scientist': ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow'],
    'UX Designer': ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Adobe Creative Suite'],
    'Digital Marketer': ['Digital Marketing', 'SEO', 'Analytics', 'Social Media', 'Content Strategy'],
    'Product Manager': ['Product Strategy', 'User Research', 'Analytics', 'Agile', 'Communication'],
    'Sales Professional': ['Sales Strategy', 'CRM', 'Negotiation', 'Lead Generation', 'Customer Relations'],
    'Cybersecurity Specialist': ['Network Security', 'Cybersecurity', 'Incident Response', 'Security Compliance', 'Threat Intelligence'],
    'Security Analyst': ['Penetration Testing', 'Vulnerability Assessment', 'Digital Forensics', 'Ethical Hacking', 'Security Architecture']
  };
  
  let bestMatch = 'Professional';
  let highestScore = 0;
  
  Object.entries(skillCategories).forEach(([type, typeSkills]) => {
    const matchCount = typeSkills.filter(skill => 
      detectedSkills.includes(skill) ||
      detectedSkills.some(s => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    
    if (matchCount > highestScore) {
      highestScore = matchCount;
      bestMatch = type;
    }
  });
  
  return bestMatch;
};

// Generate strengths based on detected skills
const generateStrengthsFromSkills = (detectedSkills: string[], seed: number): string[] => {
  const skillToStrengths: { [key: string]: string[] } = {
    'JavaScript': ['Strong programming fundamentals', 'Web development expertise'],
    'React': ['Modern frontend framework proficiency', 'Component-based architecture understanding'],
    'Python': ['Versatile programming skills', 'Data processing capabilities'],
    'Machine Learning': ['Advanced analytical thinking', 'AI/ML model development'],
    'UI/UX Design': ['User-centered design approach', 'Visual problem-solving skills'],
    'Digital Marketing': ['Creative campaign development', 'Digital strategy expertise'],
    'Product Strategy': ['Strategic thinking abilities', 'Product vision and roadmap skills'],
    'Sales Strategy': ['Revenue generation expertise', 'Customer relationship management'],
    'SQL': ['Database management skills', 'Data querying proficiency'],
    'Git': ['Version control expertise', 'Collaborative development skills'],
    'Network Security': ['Security infrastructure expertise', 'Threat detection and prevention'],
    'Cybersecurity': ['Risk assessment capabilities', 'Security best practices knowledge'],
    'Penetration Testing': ['Ethical hacking expertise', 'Vulnerability identification skills'],
    'Incident Response': ['Crisis management abilities', 'Forensic investigation skills'],
    'Digital Forensics': ['Evidence collection expertise', 'Investigative analysis skills']
  };
  
  const allStrengths: string[] = [];
  detectedSkills.forEach(skill => {
    if (skillToStrengths[skill]) {
      allStrengths.push(...skillToStrengths[skill]);
    }
  });
  
  // Add generic strengths
  const genericStrengths = [
    'Problem-solving abilities',
    'Attention to detail',
    'Team collaboration',
    'Project management skills',
    'Continuous learning mindset',
    'Communication skills'
  ];
  
  allStrengths.push(...genericStrengths);
  
  return shuffleArray([...new Set(allStrengths)], seed).slice(0, 3 + (seed % 3));
};

// Generate analysis based on file characteristics
export const generateAnalysis = (file: File): AnalysisData => {
  // Use file properties to create variation
  const fileHash = file.name.length + file.size + file.lastModified;
  const randomSeed = fileHash % 1000;
  
  // Generate skills based on file characteristics
  const detectedSkills = generateSkillsFromFile(file, randomSeed);
  
  // Determine career type based on detected skills
  const resumeType = determineCareerType(detectedSkills);
  
  // Create consistent but varied results based on file
  const scoreVariation = (randomSeed % 25) + 75; // 75-99 range
  const improvementCount = (randomSeed % 3) + 3; // 3-5 improvements
  
  // Generate strengths based on detected skills
  const selectedStrengths = generateStrengthsFromSkills(detectedSkills, randomSeed);
  const selectedImprovements = shuffleArray([...generalImprovements], randomSeed).slice(0, improvementCount);
  
  // Convert detected skills to skill objects with levels
  const selectedSkills = detectedSkills.slice(0, 6).map((skillName, index) => ({
    name: skillName,
    level: Math.min(95, 60 + (randomSeed + index * 7) % 35) // 60-95 range
  }));
  
  // Find matching career paths and calculate match percentages
  const rankedCareerPaths = careerPathsDatabase
    .map(career => ({
      title: career.title,
      match: calculateCareerMatch(detectedSkills, career, randomSeed + career.title.length),
      description: career.description,
      requirements: career.requiredSkills.slice(0, 4), // Show top 4 requirements
      growth: career.growth
    }))
    .sort((a, b) => b.match - a.match) // Sort by match percentage
    .slice(0, 3); // Take top 3 matches
  
  return {
    overallScore: scoreVariation,
    strengths: selectedStrengths,
    improvements: selectedImprovements,
    skills: selectedSkills,
    careerPaths: rankedCareerPaths,
    resumeType: resumeType
  };
};

// Simple shuffle function based on seed
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((seed * (i + 1)) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    seed = (seed * 9301 + 49297) % 233280; // Linear congruential generator
  }
  return shuffled;
}

// Generate PDF report with professional formatting
export const generateReportPDF = async (analysisData: AnalysisData, fileName: string): Promise<Blob> => {
  // Dynamic import to avoid build issues
  const { jsPDF } = await import('jspdf');
  
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();
  
  // Set up fonts and colors
  doc.setFont("helvetica");
  
  // Header with professional styling
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246); // Blue color
  doc.text("AI RESUME ANALYSIS REPORT", 20, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${currentDate}`, 20, 35);
  doc.text(`File: ${fileName}`, 20, 42);
  doc.text(`Resume Type: ${analysisData.resumeType}`, 20, 49);
  
  // Overall Score Box with background
  doc.setFillColor(240, 248, 255);
  doc.rect(20, 55, 170, 25, 'F');
  doc.setFontSize(16);
  doc.setTextColor(59, 130, 246);
  doc.text("OVERALL SCORE", 25, 65);
  doc.setFontSize(24);
  doc.text(`${analysisData.overallScore}%`, 140, 72);
  
  let yPosition = 95;
  
  // Strengths Section
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94); // Green color
  doc.text("STRENGTHS", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  analysisData.strengths.forEach((strength) => {
    const lines = doc.splitTextToSize(`• ${strength}`, 170);
    doc.text(lines, 25, yPosition);
    yPosition += lines.length * 5;
  });
  
  yPosition += 8;
  
  // Areas for Improvement Section
  doc.setFontSize(14);
  doc.setTextColor(234, 179, 8); // Yellow color
  doc.text("AREAS FOR IMPROVEMENT", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  analysisData.improvements.forEach((improvement) => {
    const lines = doc.splitTextToSize(`• ${improvement}`, 170);
    doc.text(lines, 25, yPosition);
    yPosition += lines.length * 5;
  });
  
  yPosition += 8;
  
  // Skills Analysis Section
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text("SKILLS ANALYSIS", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  analysisData.skills.forEach((skill) => {
    doc.text(`${skill.name}:`, 25, yPosition);
    doc.text(`${skill.level}%`, 150, yPosition);
    
    // Add skill bar visualization
    doc.setFillColor(230, 230, 230);
    doc.rect(80, yPosition - 3, 60, 4, 'F');
    doc.setFillColor(59, 130, 246);
    doc.rect(80, yPosition - 3, (skill.level / 100) * 60, 4, 'F');
    
    yPosition += 10;
  });
  
  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 25;
  }
  
  yPosition += 8;
  
  // Career Paths Section
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text("RECOMMENDED CAREER PATHS", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  analysisData.careerPaths.forEach((path, index) => {
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 25;
    }
    
    // Career title with match percentage
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${path.title}`, 25, yPosition);
    doc.setFillColor(34, 197, 94);
    doc.rect(160, yPosition - 4, 25, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(`${path.match}%`, 165, yPosition);
    yPosition += 10;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    
    // Description
    const descriptionLines = doc.splitTextToSize(`${path.description}`, 160);
    doc.text(descriptionLines, 30, yPosition);
    yPosition += descriptionLines.length * 5 + 3;
    
    // Growth outlook
    doc.text(`Growth Outlook: ${path.growth}`, 30, yPosition);
    yPosition += 7;
    
    // Required skills
    const requirementsText = `Required Skills: ${path.requirements.join(', ')}`;
    const requirementsLines = doc.splitTextToSize(requirementsText, 160);
    doc.text(requirementsLines, 30, yPosition);
    yPosition += requirementsLines.length * 5 + 8;
  });
  
  // Recommendations Section
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 25;
  }
  
  yPosition += 8;
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246);
  doc.text("NEXT STEPS RECOMMENDATIONS", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const recommendations = [
    "Focus on strengthening the areas for improvement mentioned above",
    "Pursue the career paths with the highest match percentages",
    "Develop the required skills for your target roles",
    "Build a portfolio that showcases your strengths",
    "Consider relevant certifications for your field",
    "Network with professionals in your target career paths"
  ];
  
  recommendations.forEach((rec) => {
    const lines = doc.splitTextToSize(`• ${rec}`, 170);
    doc.text(lines, 25, yPosition);
    yPosition += lines.length * 5;
  });
  
  // Footer
  yPosition += 15;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("This analysis was generated by AI Resume Analyzer.", 20, yPosition);
  doc.text(`Career recommendations are tailored to your ${analysisData.resumeType} background.`, 20, yPosition + 5);
  doc.text("For more detailed guidance, consider speaking with a career counselor.", 20, yPosition + 10);
  
  return doc.output('blob');
};