import { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  User,
  GraduationCap,
  Code,
  Book,
  Star,
  GitFork,
  Building,
  Users
} from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  stars: number;
  forks: number;
  github: string;
  demo: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Disaster Tweet Classifier",
    description: "A machine learning model to classify tweets as disaster-related or not, using NLP techniques for text analysis.",
    technologies: ["Python", "NLP", "Machine Learning"],
    category: "AI/ML",
    stars: 12,
    forks: 5,
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Age & Gender Detection",
    description: "This project uses deep learning to classify age and gender from images, leveraging CNNs and OpenCV for accuracy.",
    technologies: ["Python", "Computer Vision", "Deep Learning"],
    category: "Computer Vision",
    stars: 25,
    forks: 8,
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "Customer Churn Prediction",
    description: "Uses machine learning to predict which customers are likely to leave a company, helping businesses take action to retain them.",
    technologies: ["Jupyter Notebook", "Python", "ML"],
    category: "Data Science",
    stars: 18,
    forks: 3,
    github: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "Stock Price Predictor",
    description: "Predicts stock prices using machine learning models like Random Forest and LSTM with a Streamlit web app interface.",
    technologies: ["Python", "Streamlit", "LSTM"],
    category: "Finance",
    stars: 30,
    forks: 12,
    github: "#",
    demo: "#"
  },
  {
    id: 5,
    title: "Image Enhancement Toolkit",
    description: "A PyQt6 and OpenCV-based desktop application for basic image processing with interactive controls.",
    technologies: ["Python", "PyQt6", "OpenCV"],
    category: "Desktop App",
    stars: 9,
    forks: 2,
    github: "#",
    demo: "#"
  },
  {
    id: 6,
    title: "Intrusion Detection System",
    description: "Uses machine learning with scikit-learn to detect network intrusions, featuring a Flask-based web interface.",
    technologies: ["Python", "Flask", "HTML", "CSS"],
    category: "Cybersecurity",
    stars: 22,
    forks: 7,
    github: "#",
    demo: "#"
  }
];

const experiences = [
  {
    company: "Webstack Academy",
    position: "MERN Stack Developer Intern",
    duration: "September 2025 - Present",
    description: "Developing full-stack applications using the MERN stack, ensuring scalability and optimization through team collaboration.",
  },
  {
    company: "Edunet Foundation",
    position: "AI & DA Intern",
    duration: "June 2025 - July 2025",
    description: "Supported by Shell India. Developed and implemented ML models for garbage classification, contributing to practical solutions in environmental sustainability.",
  },
  {
    company: "Codec Technologies",
    position: "AI Intern",
    duration: "April 2025 - May 2025",
    description: "Engineered AI models and streamlined research documentation to enhance project outcomes.",
  }
];

const education = [
  {
    institution: "Srinivas Institute Of Technology",
    degree: "B.E Artificial Intelligence And Machine Learning",
    duration: "2022 - 2026",
  },
  {
    institution: "NHSS Vakayad",
    degree: "Bio Science Pre-University",
    duration: "2020 - 2022",
  },
];

const OverviewTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Pinned Repositories</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.slice(0, 6).map((project) => (
        <div key={project.id} className="border border-gh-border rounded-lg p-4 bg-gh-dark-secondary flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <a href={project.github} className="font-bold text-gh-accent hover:underline">{project.title}</a>
              <span className="text-xs text-gh-text-secondary border border-gh-border rounded-full px-2 py-0.5">Public</span>
            </div>
            <p className="text-sm text-gh-text-secondary mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-0.5 bg-gh-accent/10 text-gh-accent rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gh-text-secondary">
            <div className="flex items-center gap-1"><Star size={16} /><span>{project.stars}</span></div>
            <div className="flex items-center gap-1"><GitFork size={16} /><span>{project.forks}</span></div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Contribution Graph</h2>
      <div className="border border-gh-border rounded-lg p-4 bg-gh-dark-secondary">
        <p className="text-gh-text-secondary text-center">Contribution graph placeholder</p>
        <div className="grid grid-cols-52 grid-rows-7 gap-1 mt-2">
          {[...Array(364)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm bg-gh-border ${
              Math.random() > 0.8 ? 'bg-gh-green/30' :
              Math.random() > 0.9 ? 'bg-gh-green/60' :
              Math.random() > 0.95 ? 'bg-gh-green' : ''
            }`}></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const RepositoriesTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Repositories</h2>
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border-b border-gh-border pb-4">
          <a href={project.github} className="text-xl font-bold text-gh-accent hover:underline">{project.title}</a>
          <p className="text-sm text-gh-text-secondary mt-1">{project.description}</p>
          <div className="flex items-center gap-4 text-xs text-gh-text-secondary mt-2">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gh-accent"></div>{project.technologies[0]}</span>
            <span className="flex items-center gap-1"><Star size={14} />{project.stars}</span>
            <span className="flex items-center gap-1"><GitFork size={14} />{project.forks}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ExperienceTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Experience</h2>
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gh-dark-secondary flex items-center justify-center"><Building size={20} /></div>
          <div>
            <h3 className="font-semibold text-white">{exp.position} at {exp.company}</h3>
            <p className="text-sm text-gh-text-secondary">{exp.duration}</p>
            <p className="mt-2 text-sm">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EducationTab = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Education</h2>
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gh-dark-secondary flex items-center justify-center"><GraduationCap size={20} /></div>
          <div>
            <h3 className="font-semibold text-white">{edu.institution}</h3>
            <p className="text-sm text-gh-text-secondary">{edu.degree}</p>
            <p className="text-sm text-gh-text-secondary">{edu.duration}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'repositories':
        return <RepositoriesTab />;
      case 'experience':
        return <ExperienceTab />;
      case 'education':
        return <EducationTab />;
      case 'overview':
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gh-dark text-gh-text font-sans">
      <header className="bg-gh-dark-secondary border-b border-gh-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Github size={32} />
          <input 
            type="text"
            placeholder="Search or jump to..."
            className="bg-gh-dark border border-gh-border rounded-md px-3 py-1 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-gh-accent"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">sudoanirudh</span>
          <div className="w-8 h-8 rounded-full bg-gh-dark-secondary border-2 border-gh-border flex items-center justify-center">
            <User size={20} />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-48 h-48 rounded-full bg-gh-dark-secondary border-2 border-gh-border mb-4 flex items-center justify-center">
              <User size={96} />
            </div>
            <h1 className="text-2xl font-bold">Anirudh S</h1>
            <p className="text-lg text-gh-text-secondary">sudoanirudh</p>
            <p className="mt-4 text-center md:text-left">AI & ML Engineering Student. Passionate about building the future, one line of code at a time.</p>
            
            <div className="flex gap-4 my-4">
              <a href="https://www.linkedin.com/in/sudoanirudh/" target="_blank" rel="noopener noreferrer" className="text-gh-text-secondary hover:text-gh-accent flex items-center gap-1 text-sm"><Users size={16} /><span>3 Followers</span></a>
              <span className="text-gh-text-secondary">·</span>
              <a href="#" className="text-gh-text-secondary hover:text-gh-accent text-sm"><span>1 Following</span></a>
            </div>
            
            <div className="space-y-2 text-sm w-full">
              <div className="flex items-center gap-2"><MapPin size={16} /><span>Kozhikode, Kerala, India</span></div>
              <div className="flex items-center gap-2"><Mail size={16} /><span>anirudhsudheer@gmail.com</span></div>
              <div className="flex items-center gap-2"><Linkedin size={16} /><a href="https://www.linkedin.com/in/sudoanirudh/" className="text-gh-accent hover:underline">LinkedIn Profile</a></div>
            </div>
            
            <button className="mt-6 w-full bg-gh-dark-secondary border border-gh-border rounded-md py-2 text-sm font-semibold hover:bg-gh-border transition-colors">
              Edit profile
            </button>
          </div>
        </aside>

        <div className="w-full md:w-3/4">
          <div className="border-b border-gh-border mb-6">
            <nav className="flex gap-4">
              <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'overview' ? 'border-gh-accent text-white' : 'border-transparent text-gh-text-secondary hover:border-gh-text-secondary'}`}>
                <Book size={16} /> Overview
              </button>
              <button onClick={() => setActiveTab('repositories')} className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'repositories' ? 'border-gh-accent text-white' : 'border-transparent text-gh-text-secondary hover:border-gh-text-secondary'}`}>
                <Code size={16} /> Repositories
              </button>
              <button onClick={() => setActiveTab('experience')} className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'experience' ? 'border-gh-accent text-white' : 'border-transparent text-gh-text-secondary hover:border-gh-text-secondary'}`}>
                <Building size={16} /> Experience
              </button>
              <button onClick={() => setActiveTab('education')} className={`flex items-center gap-2 px-4 py-2 border-b-2 ${activeTab === 'education' ? 'border-gh-accent text-white' : 'border-transparent text-gh-text-secondary hover:border-gh-text-secondary'}`}>
                <GraduationCap size={16} /> Education
              </button>
            </nav>
          </div>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
