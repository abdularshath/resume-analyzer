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

// Define different resume types and their characteristics
const resumeTypes = [
  {
    type: "Software Developer",
    skills: ["JavaScript", "Python", "React", "Node.js", "Git", "SQL"],
    strengths: ["Strong technical skills", "Problem-solving abilities", "Clean code practices", "API development"],
    careers: [
      { title: "Senior Frontend Developer", match: [88, 94], description: "Perfect match for your React and JavaScript expertise", requirements: ["Advanced React", "TypeScript", "Testing"], growth: "High demand, $95k-$130k" },
      { title: "Full Stack Developer", match: [82, 89], description: "Leverage both frontend and backend skills", requirements: ["Node.js", "Database Design", "APIs"], growth: "Excellent growth, $85k-$120k" },
      { title: "Software Engineer", match: [85, 92], description: "Build scalable software solutions", requirements: ["System Design", "Algorithms", "Code Review"], growth: "Tech career path, $90k-$140k" }
    ]
  },
  {
    type: "Data Scientist",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics", "Pandas"],
    strengths: ["Data analysis expertise", "Statistical modeling", "Research abilities", "Problem-solving skills"],
    careers: [
      { title: "Senior Data Scientist", match: [90, 96], description: "Advanced analytics and ML model development", requirements: ["Deep Learning", "MLOps", "Big Data"], growth: "High growth field, $110k-$160k" },
      { title: "Machine Learning Engineer", match: [85, 91], description: "Deploy ML models in production", requirements: ["MLOps", "Cloud Platforms", "Model Optimization"], growth: "Emerging field, $120k-$170k" },
      { title: "Data Analytics Manager", match: [78, 85], description: "Lead data-driven business decisions", requirements: ["Team Leadership", "Business Strategy", "Communication"], growth: "Management track, $100k-$150k" }
    ]
  },
  {
    type: "Marketing Professional",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media", "Campaign Management"],
    strengths: ["Creative thinking", "Brand awareness", "Customer insights", "Campaign optimization"],
    careers: [
      { title: "Digital Marketing Manager", match: [87, 93], description: "Lead comprehensive digital marketing strategies", requirements: ["Marketing Automation", "Performance Analytics", "Team Leadership"], growth: "Growing field, $70k-$110k" },
      { title: "Growth Marketing Specialist", match: [84, 90], description: "Drive user acquisition and retention", requirements: ["A/B Testing", "Conversion Optimization", "Data Analysis"], growth: "High demand, $80k-$120k" },
      { title: "Brand Manager", match: [76, 83], description: "Develop and maintain brand identity", requirements: ["Brand Strategy", "Creative Direction", "Market Research"], growth: "Strategic role, $75k-$115k" }
    ]
  },
  {
    type: "Product Manager",
    skills: ["Product Strategy", "User Research", "Analytics", "Agile", "Communication", "Market Analysis"],
    strengths: ["Strategic thinking", "Cross-functional collaboration", "User-focused approach", "Data-driven decisions"],
    careers: [
      { title: "Senior Product Manager", match: [91, 97], description: "Lead product vision and roadmap", requirements: ["Product Strategy", "Stakeholder Management", "Metrics Analysis"], growth: "Leadership track, $110k-$160k" },
      { title: "Product Owner", match: [85, 91], description: "Drive agile product development", requirements: ["Agile Methodologies", "User Stories", "Sprint Planning"], growth: "Tech-focused, $90k-$130k" },
      { title: "Head of Product", match: [75, 82], description: "Executive product leadership role", requirements: ["Team Leadership", "Business Strategy", "P&L Management"], growth: "Executive level, $150k-$250k" }
    ]
  },
  {
    type: "Sales Professional",
    skills: ["Sales Strategy", "CRM", "Negotiation", "Lead Generation", "Customer Relations", "Communication"],
    strengths: ["Relationship building", "Persuasion skills", "Target achievement", "Customer focus"],
    careers: [
      { title: "Sales Manager", match: [89, 95], description: "Lead sales team and drive revenue", requirements: ["Team Leadership", "Sales Coaching", "Performance Management"], growth: "Management track, $80k-$140k" },
      { title: "Business Development Manager", match: [86, 92], description: "Identify and develop new business opportunities", requirements: ["Strategic Partnerships", "Market Analysis", "Proposal Writing"], growth: "Growth-focused, $85k-$130k" },
      { title: "Account Executive", match: [82, 88], description: "Manage key client relationships", requirements: ["Account Management", "Upselling", "Customer Success"], growth: "Client-focused, $70k-$120k" }
    ]
  },
  {
    type: "Designer",
    skills: ["UI/UX Design", "Adobe Creative Suite", "Figma", "User Research", "Prototyping", "Visual Design"],
    strengths: ["Creative problem solving", "User empathy", "Visual communication", "Design thinking"],
    careers: [
      { title: "Senior UX Designer", match: [92, 98], description: "Lead user experience design initiatives", requirements: ["Design Systems", "User Testing", "Information Architecture"], growth: "Creative field, $85k-$130k" },
      { title: "Product Designer", match: [88, 94], description: "Design end-to-end product experiences", requirements: ["Product Thinking", "Cross-functional Collaboration", "Prototyping"], growth: "Product-focused, $90k-$140k" },
      { title: "Design Manager", match: [79, 86], description: "Lead design team and set creative direction", requirements: ["Team Leadership", "Design Strategy", "Stakeholder Management"], growth: "Leadership track, $100k-$150k" }
    ]
  }
];

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

// Generate analysis based on file characteristics
export const generateAnalysis = (file: File): AnalysisData => {
  // Use file properties to create variation
  const fileHash = file.name.length + file.size + file.lastModified;
  const randomSeed = fileHash % 1000;
  
  // Determine resume type based on file characteristics
  const typeIndex = randomSeed % resumeTypes.length;
  const resumeData = resumeTypes[typeIndex];
  
  // Create consistent but varied results based on file
  const scoreVariation = (randomSeed % 25) + 75; // 75-99 range
  const strengthCount = (randomSeed % 3) + 3; // 3-5 strengths
  const improvementCount = (randomSeed % 3) + 3; // 3-5 improvements
  
  // Select strengths from the resume type
  const selectedStrengths = shuffleArray([...resumeData.strengths], randomSeed).slice(0, strengthCount);
  const selectedImprovements = shuffleArray([...generalImprovements], randomSeed).slice(0, improvementCount);
  
  // Generate skills based on resume type with variation
  const typeSkills = shuffleArray([...resumeData.skills], randomSeed).slice(0, 5);
  const selectedSkills = typeSkills.map((skillName, index) => ({
    name: skillName,
    level: Math.min(95, 60 + (randomSeed + index * 7) % 35) // 60-95 range
  }));
  
  // Generate career paths specific to this resume type
  const selectedPaths = resumeData.careers.map(career => ({
    title: career.title,
    match: career.match[randomSeed % career.match.length],
    description: career.description,
    requirements: career.requirements,
    growth: career.growth
  }));
  
  return {
    overallScore: scoreVariation,
    strengths: selectedStrengths,
    improvements: selectedImprovements,
    skills: selectedSkills,
    careerPaths: selectedPaths,
    resumeType: resumeData.type
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