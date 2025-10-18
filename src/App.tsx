import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronDown,
  User,
  GraduationCap,
  Code,
  Award,
  Send,
  Calendar,
  Building,
  Zap,
  Terminal,
  Cpu
} from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import CursorTrail from './components/CursorTrail';

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github: string;
  demo: string;
};

// Typing Animation Component
const TypedText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((current) => (current + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className="glow-text">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Animated Section Component
const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Disaster Tweet Classifier",
      description: "A machine learning model to classify tweets as disaster-related or not, using NLP techniques for text analysis.",
      technologies: ["Python", "NLP", "Machine Learning"],
      category: "AI/ML",
      image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "Age & Gender Detection",
      description: "This project uses deep learning to classify age and gender from images, leveraging CNNs and OpenCV for accuracy.",
      technologies: ["Python", "Computer Vision", "Deep Learning"],
      category: "Computer Vision",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Customer Churn Prediction",
      description: "Uses machine learning to predict which customers are likely to leave a company, helping businesses take action to retain them.",
      technologies: ["Jupyter Notebook", "Python", "ML"],
      category: "Data Science",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "Stock Price Predictor",
      description: "Predicts stock prices using machine learning models like Random Forest and LSTM with a Streamlit web app interface.",
      technologies: ["Python", "Streamlit", "LSTM"],
      category: "Finance",
      image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "Image Enhancement Toolkit",
      description: "A PyQt6 and OpenCV-based desktop application for basic image processing with interactive controls.",
      technologies: ["Python", "PyQt6", "OpenCV"],
      category: "Desktop App",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    },
    {
      id: 6,
      title: "Intrusion Detection System",
      description: "Uses machine learning with scikit-learn to detect network intrusions, featuring a Flask-based web interface.",
      technologies: ["Python", "Flask", "HTML", "CSS"],
      category: "Cybersecurity",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      github: "#",
      demo: "#"
    }
  ];

  const experiences = [
    {
      company: "Webstack Academy",
      position: "MERN Stack Developer Intern",
      duration: "September 2025 - Present",
      type: "Virtual",
      description: "Developing full-stack applications using the MERN stack, ensuring scalability and optimization through team collaboration.",
      skills: ["MongoDB", "Express.js", "React", "Node.js"]
    },
    {
      company: "Edunet Foundation",
      position: "AI & DA Intern",
      duration: "June 2025 - July 2025",
      type: "Virtual",
      description: "Supported by Shell India. Developed and implemented ML models for garbage classification, contributing to practical solutions in environmental sustainability.",
      skills: ["Machine Learning", "Data Analysis", "Python"]
    },
    {
      company: "Codec Technologies",
      position: "AI Intern",
      duration: "April 2025 - May 2025",
      type: "Virtual",
      description: "Engineered AI models and streamlined research documentation to enhance project outcomes.",
      skills: ["AI Development", "Research", "Documentation"]
    }
  ];

  const skills = [
    { category: "Programming Languages", items: ["Python", "C Language", "Java", "Dart", "PHP"], icon: <Terminal className="w-6 h-6" /> },
    { category: "Libraries/Frameworks", items: ["Django", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Flask", "scikit-learn", "Flutter"], icon: <Code className="w-6 h-6" /> },
    { category: "Tools/Platforms", items: ["Git", "VS Code", "Excel", "Power BI", "Tableau", "Jupyter Notebook", "Anaconda"], icon: <Cpu className="w-6 h-6" /> },
    { category: "Databases", items: ["SQL", "MongoDB"], icon: <Zap className="w-6 h-6" /> }
  ];

  const education = [
    {
      institution: "Srinivas Institute Of Technology",
      degree: "B.E Artificial Intelligence And Machine Learning",
      duration: "September 2022 - 2026",
      location: "Mangalore, India",
      status: "Pursuing"
    },
    {
      institution: "NHSS Vakayad",
      degree: "Bio Science Pre-University",
      duration: "June 2020 - March 2022",
      location: "Kozhikode, India",
      percentage: "85%"
    },
    {
      institution: "GHSS Naduvannur",
      degree: "Secondary School",
      duration: "June 2019 - March 2020",
      location: "Kozhikode, India",
      percentage: "95%"
    }
  ];

  const certifications = [
    "Introduction to Generative AI - Google Cloud",
    "Explore Machine Learning using Python - Infosys Springboard",
    "Machine Learning for All - Coursera",
    "Artificial Intelligence - Certiport, Pearson",
    "Fundamentals of Cybersecurity - Zscaler Training",
    "Machine Learning Foundation Certification - Infosys SpringBoard",
    "Neo4j Certified Professional"
  ];

  return (
    <div className="min-h-screen bg-cyber-darker relative cyber-grid">
      <AnimatedBackground />
      <CursorTrail />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue via-cyber-indigo to-cyber-purple z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-blue/20 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-cyber-blue glow-text">{'<Anirudh_S />'}</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                      activeSection === item.toLowerCase()
                        ? 'text-cyber-blue'
                        : 'text-gray-300 hover:text-cyber-blue'
                    }`}
                  >
                    {item}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-indigo transform origin-left transition-transform duration-300 ${
                      activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-cyber-blue hover:text-cyber-indigo transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-cyber-dark/95 border-t border-cyber-blue/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10 w-full text-left transition-colors duration-200 rounded"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-cyber-dark to-cyber-indigo/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyber-blue text-lg font-mono"
                >
                  {'> Hello World_'}
                </motion.div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight">
                  I'm <span className="glitch text-cyber-blue" data-text="Anirudh S">Anirudh S</span>
                </h1>
                <div className="text-xl sm:text-2xl text-gray-300 font-light h-16">
                  <TypedText texts={[
                    'AI & ML Engineering Student',
                    'Full Stack Developer',
                    'Data Science Enthusiast',
                    'Problem Solver'
                  ]} />
                </div>
                <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                  Passionate about artificial intelligence and its potential to shape the future. 
                  I continuously explore emerging technologies and innovate to solve real-world problems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-cyber-blue to-cyber-indigo text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ChevronDown size={20} className="animate-bounce" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-indigo to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/sudoanirudh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-cyber-blue/50 text-cyber-blue px-8 py-3 rounded-lg font-medium hover:bg-cyber-blue/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Linkedin size={20} />
                  LinkedIn Profile
                </motion.a>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-cyber-blue" />
                  <span>Kozhikode, Kerala, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-cyber-blue" />
                  <span>anirudhsudheer@gmail.com</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-cyber-blue/20 to-cyber-indigo/20 rounded-full flex items-center justify-center relative glow-box animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-indigo opacity-20 blur-2xl animate-pulse" />
                <User size={120} className="text-cyber-blue relative z-10" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-cyber-dark/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center border-2 border-cyber-blue/30"
              >
                <Code size={32} className="text-cyber-blue" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyber-dark/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center border-2 border-cyber-indigo/30"
              >
                <Award size={24} className="text-cyber-indigo" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-cyber-dark/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 glitch" data-text="About Me">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
                I'm a dedicated AI & ML engineering student with a strong foundation in Python and C programming.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  My passion for AI and its potential to shape the future drives me to continuously explore 
                  emerging technologies and innovate. I'm eager to apply my skills and knowledge to solve 
                  real-world problems and contribute to the advancement of artificial intelligence.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' }}
                    className="text-center p-6 bg-cyber-dark/50 backdrop-blur rounded-lg border border-cyber-blue/20 gradient-border"
                  >
                    <div className="text-3xl font-bold text-cyber-blue mb-2 glow-text">6+</div>
                    <div className="text-gray-400">Projects Completed</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)' }}
                    className="text-center p-6 bg-cyber-dark/50 backdrop-blur rounded-lg border border-cyber-indigo/20 gradient-border"
                  >
                    <div className="text-3xl font-bold text-cyber-indigo mb-2 glow-text">3</div>
                    <div className="text-gray-400">Internships</div>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                    <Zap className="text-cyber-blue" />
                    Recent Achievements
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Participating in GSSoC\'25 as a Contributor',
                      'Neo4j Certified Professional',
                      'Participated in National Level Hackathon'
                    ].map((achievement, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-2 h-2 bg-cyber-blue rounded-full group-hover:animate-pulse" />
                        <span className="text-gray-300 group-hover:text-cyber-blue transition-colors">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                  <Award className="text-cyber-blue" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.slice(0, 5).map((cert, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10, boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
                      className="flex items-center gap-3 p-3 bg-cyber-dark/50 backdrop-blur rounded-lg border border-cyber-blue/10"
                    >
                      <Award size={20} className="text-cyber-blue flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{cert}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-cyber-blue hover:text-cyber-indigo font-medium flex items-center gap-2 transition-colors"
                >
                  View All Certifications 
                  <ChevronDown size={16} className="rotate-[-90deg]" />
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Professional Experience</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 mt-4">My journey in AI, ML, and software development</p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index}>
                <motion.div 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
                  className="bg-cyber-dark/50 backdrop-blur rounded-xl border border-cyber-blue/20 p-8 transition-all duration-300 gradient-border"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-indigo/20 rounded-lg flex items-center justify-center border border-cyber-blue/30">
                        <Building size={24} className="text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-100">{exp.position}</h3>
                        <p className="text-cyber-blue font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-cyber-blue" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                      <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-full text-sm">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <motion.span 
                        key={skillIndex}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-cyber-blue/10 to-cyber-indigo/10 text-cyber-blue border border-cyber-blue/30 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-cyber-dark/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 mt-4">Showcasing my work in AI, ML, and software development</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index) => (
              <AnimatedSection key={project.id}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)' }}
                  className="bg-cyber-dark/50 backdrop-blur rounded-xl border border-cyber-blue/20 overflow-hidden cursor-pointer group gradient-border h-full flex flex-col"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-cyber-blue/90 backdrop-blur text-white rounded-full text-xs font-medium border border-cyber-blue">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2 group-hover:text-cyber-blue transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-cyber-indigo/10 text-cyber-indigo border border-cyber-indigo/30 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <button className="text-cyber-blue hover:text-cyber-indigo font-medium text-sm flex items-center gap-1 transition-colors">
                        View Details
                        <ExternalLink size={14} />
                      </button>
                      <div className="flex items-center gap-2">
                        <motion.a 
                          whileHover={{ scale: 1.2, color: '#00d4ff' }}
                          href={project.github} 
                          className="text-gray-400 hover:text-cyber-blue transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.2, color: '#00d4ff' }}
                          href={project.demo} 
                          className="text-gray-400 hover:text-cyber-blue transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Skills & Technologies</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 mt-4">Technologies I work with</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <AnimatedSection key={index}>
                <motion.div 
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)' }}
                  className="bg-cyber-dark/50 backdrop-blur rounded-xl border border-cyber-blue/20 p-6 gradient-border h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-cyber-blue">{skillGroup.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-100">{skillGroup.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ delay: skillIndex * 0.1, duration: 0.5 }}
                        className="relative"
                      >
                        <div className="flex items-center gap-3 group">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full group-hover:animate-pulse" />
                          <span className="text-gray-300 text-sm group-hover:text-cyber-blue transition-colors">{skill}</span>
                        </div>
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: Math.random() * 0.3 + 0.7 }}
                          transition={{ delay: skillIndex * 0.1 + 0.2, duration: 0.5 }}
                          className="h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo rounded-full mt-1 origin-left"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-cyber-dark/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Education</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 mt-4">My academic journey</p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <AnimatedSection key={index}>
                <motion.div 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
                  className="bg-cyber-dark/50 backdrop-blur rounded-xl border border-cyber-blue/20 p-8 gradient-border"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-indigo/20 rounded-lg flex items-center justify-center border border-cyber-blue/30">
                        <GraduationCap size={24} className="text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-100">{edu.degree}</h3>
                        <p className="text-cyber-blue font-medium">{edu.institution}</p>
                        <p className="text-gray-400 text-sm">{edu.location}</p>
                      </div>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-gray-400 text-sm mb-2">{edu.duration}</p>
                      {edu.percentage && (
                        <p className="text-cyber-blue font-semibold text-lg">{edu.percentage}</p>
                      )}
                      {edu.status && (
                        <span className="inline-block px-3 py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-full text-sm font-medium mt-2">
                          {edu.status}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo mx-auto" />
              <p className="text-lg text-gray-400 mt-4">Let's discuss opportunities and collaborations</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <Mail size={20} />, label: 'Email', value: 'anirudhsudheer@gmail.com' },
                      { icon: <Phone size={20} />, label: 'Phone', value: '+91 95391 02851' },
                      { icon: <MapPin size={20} />, label: 'Location', value: 'Kozhikode, Kerala, India' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 10, boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
                        className="flex items-center gap-4 p-4 bg-cyber-dark/50 backdrop-blur rounded-lg border border-cyber-blue/20"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue/20 to-cyber-indigo/20 rounded-lg flex items-center justify-center border border-cyber-blue/30">
                          <div className="text-cyber-blue">{item.icon}</div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-100">{item.label}</p>
                          <p className="text-gray-400 text-sm">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-6">Connect With Me</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/sudoanirudh/', color: 'from-blue-500 to-blue-600' },
                      { icon: <Github size={20} />, href: '#', color: 'from-gray-600 to-gray-700' },
                      { icon: <Mail size={20} />, href: 'mailto:anirudhsudheer@gmail.com', color: 'from-cyber-blue to-cyber-indigo' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div 
                whileHover={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
                className="bg-cyber-dark/50 backdrop-blur rounded-xl border border-cyber-blue/20 p-8 gradient-border"
              >
                <form className="space-y-6">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" }
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent transition-all duration-200 text-gray-100 placeholder-gray-500"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent transition-all duration-200 resize-none text-gray-100 placeholder-gray-500"
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyber-blue to-cyber-indigo text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Send size={20} />
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-indigo to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </form>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyber-dark/50 border-t border-cyber-blue/20 text-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 glow-text">{'<Anirudh_S />'}</h3>
            <p className="text-gray-400 mb-6">AI & ML Engineering Student</p>
            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/sudoanirudh/' },
                { icon: <Github size={24} />, href: '#' },
                { icon: <Mail size={24} />, href: 'mailto:anirudhsudheer@gmail.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyber-blue transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="border-t border-cyber-blue/20 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 Anirudh S. All rights reserved. Built with React, TypeScript & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-cyber-dark border-2 border-cyber-blue/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto gradient-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-cyber-dark/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-cyber-blue/20 transition-colors duration-200 border border-cyber-blue/30"
              >
                <X size={20} className="text-cyber-blue" />
              </motion.button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-100">{selectedProject.title}</h3>
                <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                  <Code size={20} className="text-cyber-blue" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <motion.span 
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-gradient-to-r from-cyber-blue/10 to-cyber-indigo/10 text-cyber-blue border border-cyber-blue/30 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedProject.github}
                  className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedProject.demo}
                  className="flex-1 bg-gradient-to-r from-cyber-blue to-cyber-indigo text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
