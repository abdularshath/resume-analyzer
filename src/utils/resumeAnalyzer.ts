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
}

const strengthsPool = [
  "Strong technical skills",
  "Relevant experience", 
  "Clear formatting",
  "Quantified achievements",
  "Good educational background",
  "Leadership experience",
  "Project management skills",
  "Problem-solving abilities",
  "Communication skills",
  "Industry certifications"
];

const improvementsPool = [
  "Add more soft skills",
  "Include certifications", 
  "Enhance project descriptions",
  "Add quantifiable metrics",
  "Include volunteer experience",
  "Expand on achievements",
  "Add technical skills section",
  "Include portfolio links",
  "Add language proficiencies",
  "Include professional references"
];

const skillsPool = [
  { name: "JavaScript", levels: [70, 85, 90] },
  { name: "Python", levels: [60, 75, 85] },
  { name: "React", levels: [65, 80, 92] },
  { name: "Project Management", levels: [50, 65, 80] },
  { name: "Communication", levels: [60, 75, 85] },
  { name: "Leadership", levels: [45, 60, 75] },
  { name: "Data Analysis", levels: [55, 70, 88] },
  { name: "Machine Learning", levels: [40, 65, 82] },
  { name: "SQL", levels: [65, 80, 90] },
  { name: "Cloud Computing", levels: [50, 70, 85] }
];

const careerPathsPool = [
  {
    title: "Senior Frontend Developer",
    matches: [85, 92, 88],
    description: "Perfect fit based on your React and JavaScript expertise",
    requirements: ["Advanced React", "TypeScript", "Testing"],
    growth: "High demand, $95k-$130k"
  },
  {
    title: "Full Stack Developer", 
    matches: [70, 78, 82],
    description: "Great opportunity to expand backend skills",
    requirements: ["Node.js", "Database Design", "APIs"],
    growth: "Excellent growth, $85k-$120k"
  },
  {
    title: "Technical Lead",
    matches: [60, 65, 72],
    description: "Leadership role leveraging technical background",
    requirements: ["Team Leadership", "Architecture", "Mentoring"],
    growth: "Leadership track, $110k-$150k"
  },
  {
    title: "Data Scientist",
    matches: [55, 70, 85],
    description: "Analyze data to drive business decisions",
    requirements: ["Python", "Statistics", "Machine Learning"],
    growth: "Growing field, $90k-$140k"
  },
  {
    title: "Product Manager",
    matches: [50, 65, 75],
    description: "Bridge technical and business requirements",
    requirements: ["Product Strategy", "User Research", "Analytics"],
    growth: "Strategic role, $100k-$150k"
  }
];

// Generate analysis based on file characteristics
export const generateAnalysis = (file: File): AnalysisData => {
  // Use file properties to create variation
  const fileHash = file.name.length + file.size + file.lastModified;
  const randomSeed = fileHash % 1000;
  
  // Create consistent but varied results based on file
  const scoreVariation = (randomSeed % 30) + 70; // 70-99 range
  const strengthCount = (randomSeed % 3) + 4; // 4-6 strengths
  const improvementCount = (randomSeed % 3) + 3; // 3-5 improvements
  
  // Select random items based on file hash
  const selectedStrengths = shuffleArray([...strengthsPool], randomSeed).slice(0, strengthCount);
  const selectedImprovements = shuffleArray([...improvementsPool], randomSeed).slice(0, improvementCount);
  
  // Generate skills with variation
  const selectedSkills = shuffleArray([...skillsPool], randomSeed).slice(0, 5).map(skill => ({
    name: skill.name,
    level: skill.levels[randomSeed % skill.levels.length]
  }));
  
  // Generate career paths
  const selectedPaths = shuffleArray([...careerPathsPool], randomSeed).slice(0, 3).map(path => ({
    title: path.title,
    match: path.matches[randomSeed % path.matches.length],
    description: path.description,
    requirements: path.requirements,
    growth: path.growth
  }));
  
  return {
    overallScore: scoreVariation,
    strengths: selectedStrengths,
    improvements: selectedImprovements,
    skills: selectedSkills,
    careerPaths: selectedPaths
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

// Generate PDF report content
export const generateReportPDF = (analysisData: AnalysisData, fileName: string): string => {
  const reportContent = `
AI RESUME ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}
File: ${fileName}

OVERALL SCORE: ${analysisData.overallScore}%

STRENGTHS:
${analysisData.strengths.map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${analysisData.improvements.map(i => `• ${i}`).join('\n')}

SKILLS ANALYSIS:
${analysisData.skills.map(s => `• ${s.name}: ${s.level}%`).join('\n')}

RECOMMENDED CAREER PATHS:
${analysisData.careerPaths.map(p => `
${p.title} (${p.match}% match)
${p.description}
Required Skills: ${p.requirements.join(', ')}
Growth Outlook: ${p.growth}
`).join('\n')}

This report was generated by AI Resume Analyzer.
For best results, consider implementing the suggested improvements.
  `.trim();
  
  return reportContent;
};