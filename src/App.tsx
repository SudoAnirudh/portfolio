import { useState, useEffect, useRef } from 'react';
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
  GraduationCap,
  Code,
  Award,
  Send,
  Calendar,
  Building,
  Terminal,
  Play,
  Filter,
  Zap,
  Brain,
  Database,
  Globe,
  Cpu,
  Sparkles
} from 'lucide-react';

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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Typing animation for hero section
  const roles = ['AI & ML Engineer', 'Data Scientist', 'Full Stack Developer', 'Problem Solver'];
  
  useEffect(() => {
    const currentRole = roles[currentTypeIndex];
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentTypeIndex((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setTypedText((prev) => prev.slice(0, -1));
      } else {
        setTypedText((prev) => currentRole.slice(0, prev.length + 1));
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTypeIndex, roles]);

  // Scroll animations observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

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
    { 
      category: "Programming Languages", 
      icon: <Code className="w-6 h-6" />,
      items: [
        { name: "Python", level: 95 },
        { name: "C Language", level: 85 },
        { name: "Java", level: 80 },
        { name: "Dart", level: 75 },
        { name: "PHP", level: 70 }
      ]
    },
    { 
      category: "AI/ML & Data Science", 
      icon: <Brain className="w-6 h-6" />,
      items: [
        { name: "Machine Learning", level: 90 },
        { name: "Deep Learning", level: 85 },
        { name: "Computer Vision", level: 80 },
        { name: "NLP", level: 85 },
        { name: "Data Analysis", level: 90 }
      ]
    },
    { 
      category: "Libraries/Frameworks", 
      icon: <Zap className="w-6 h-6" />,
      items: [
        { name: "Django", level: 85 },
        { name: "Flask", level: 90 },
        { name: "React", level: 80 },
        { name: "NumPy", level: 95 },
        { name: "Pandas", level: 95 },
        { name: "TensorFlow", level: 80 },
        { name: "scikit-learn", level: 90 }
      ]
    },
    { 
      category: "Tools & Databases", 
      icon: <Database className="w-6 h-6" />,
      items: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 75 },
        { name: "SQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Power BI", level: 85 }
      ]
    }
  ];

  // Filter projects by category
  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const projectCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Form validation
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Particle animation component
  const ParticleField = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
      </div>
    );
  };

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-700">Anirudh S</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.toLowerCase()
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-700 hover:text-teal-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-teal-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
        <ParticleField />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Anirudh S</span>
                </h1>
                <div className="text-xl sm:text-2xl text-gray-600 font-light min-h-[2rem]">
                  <span className="inline-block">
                    {typedText}
                    <span className="animate-pulse text-teal-600">|</span>
                  </span>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  Passionate about <span className="text-teal-600 font-semibold">artificial intelligence</span> and its potential to shape the future. 
                  I continuously explore emerging technologies and innovate to solve real-world problems.
                </p>
                
                {/* Tech badges */}
                <div className="flex flex-wrap gap-3">
                  {['Python', 'Machine Learning', 'Deep Learning', 'React', 'AI Research'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/80 backdrop-blur-sm text-teal-700 rounded-full text-sm font-medium border border-teal-200 hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  View My Work
                  <ChevronDown size={20} />
                </button>
                <a
                  href="https://www.linkedin.com/in/sudoanirudh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-teal-600 hover:text-teal-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Linkedin size={20} />
                  LinkedIn Profile
                </a>
              </div>

              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Kozhikode, Kerala, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>anirudhsudheer@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-teal-400 to-teal-600 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" 
                  alt="Anirudh S - AI & ML Engineering Student" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-8 -left-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
                <Database size={20} className="text-teal-600" />
              </div>
              <div className="absolute -top-2 left-16 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300">
                <Globe size={16} className="text-teal-600" />
              </div>
              <div className="absolute bottom-16 -right-8 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-45 hover:rotate-0 hover:scale-110 transition-all duration-300">
                <Code size={20} className="text-teal-600" />
              </div>
              
              {/* Pulsing dots */}
              <div className="absolute top-1/4 -right-4 w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 -left-4 w-2 h-2 bg-teal-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -left-2 w-1 h-1 bg-teal-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm a dedicated AI & ML engineering student with a strong foundation in Python and C programming.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                My passion for AI and its potential to shape the future drives me to continuously explore 
                emerging technologies and innovate. I'm eager to apply my skills and knowledge to solve 
                real-world problems and contribute to the advancement of artificial intelligence.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 mb-2">6+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600 mb-2">3</div>
                  <div className="text-gray-600">Internships</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Recent Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Participating in GSSoC'25 as a Contributor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Neo4j Certified Professional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    <span className="text-gray-700">Participated in National Level Hackathon</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Certifications</h3>
              <div className="space-y-3">
                {certifications.slice(0, 5).map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award size={20} className="text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
              <button className="text-teal-600 hover:text-teal-700 font-medium">
                View All Certifications →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Code Showcase */}
      <section className="py-20 bg-gray-900 text-green-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff88' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <Terminal className="inline-block w-10 h-10 mr-4 text-green-400" />
              Code in Action
            </h2>
            <p className="text-lg text-gray-300">A glimpse into my technical expertise</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Python ML Code */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">ml_model.py</span>
                </div>
                <Brain className="w-5 h-5 text-teal-400" />
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{`# AI Model Training Pipeline
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def train_disaster_classifier():
    # Load and preprocess data
    data = pd.read_csv('disaster_tweets.csv')
    X_train, y_train = preprocess_data(data)
    
    # Train Random Forest model
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    
    # Evaluate performance
    accuracy = accuracy_score(y_test, predictions)
    print(f"Model Accuracy: {accuracy:.2f}")
    
    return model

# Execute training
classifier = train_disaster_classifier()
>> Model Accuracy: 0.94`}</code>
              </pre>
            </div>

            {/* React Component Code */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">Portfolio.tsx</span>
                </div>
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{`// Interactive Portfolio Component
const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  useEffect(() => {
    // Animate on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }
    );
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="portfolio-grid">
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          {...project}
          onClick={() => setActiveProject(project)}
        />
      ))}
    </div>
  );
};`}</code>
              </pre>
            </div>
          </div>

          {/* Command prompt simulation */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">anirudh@portfolio:~</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white">whoami</span>
                </div>
                <div className="text-gray-300 mb-4">AI & ML Engineering Student | Full Stack Developer | Problem Solver</div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white">ls -la skills/</span>
                </div>
                <div className="text-gray-300 mb-4">
                  <div>drwxr-xr-x 2 anirudh staff 64 Sep 30 2025 python/</div>
                  <div>drwxr-xr-x 2 anirudh staff 64 Sep 30 2025 machine-learning/</div>
                  <div>drwxr-xr-x 2 anirudh staff 64 Sep 30 2025 react/</div>
                  <div>drwxr-xr-x 2 anirudh staff 64 Sep 30 2025 ai-research/</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v26l-6-6-4 4 14 14 14-14-4-4-6 6v-26h-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-4">
              <Building className="w-10 h-10 text-teal-600" />
              Professional Journey
            </h2>
            <p className="text-lg text-gray-600">My experience in AI, ML, and software development</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-teal-200"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  style={{
                    animation: visibleSections.has('experience') ? `fadeInUp 0.6s ease-out forwards` : 'none',
                    animationDelay: `${index * 0.2}s`,
                    opacity: visibleSections.has('experience') ? 1 : 0
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                      {/* Date badge */}
                      <div className={`absolute top-4 ${
                        index % 2 === 0 ? 'right-4' : 'left-4'
                      } px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium`}>
                        {exp.duration}
                      </div>
                      
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
                          <Building size={28} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors duration-300">
                            {exp.position}
                          </h3>
                          <p className="text-teal-600 font-semibold text-lg">{exp.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2">
                              <Globe size={12} />
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">{exp.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium border border-teal-200 hover:bg-teal-100 transition-colors duration-200 cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Arrow pointing to timeline */}
                      <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                        index % 2 === 0 
                          ? 'right-0 translate-x-1/2' 
                          : 'left-0 -translate-x-1/2'
                      } w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Timeline end */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 bg-teal-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600">Showcasing my work in AI, ML, and software development</p>
            
            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedFilter === category
                      ? 'bg-teal-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter size={16} />
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project, index: number) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 cursor-pointer group transform hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: visibleSections.has('projects') ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1">
                      View Details
                      <ExternalLink size={14} />
                    </button>
                    <div className="flex items-center gap-2">
                      <a href={project.github} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <Github size={18} />
                      </a>
                      <a href={project.demo} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23064e3b' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40v-40h40v40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-4">
              <Sparkles className="w-10 h-10 text-teal-600" />
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600">Interactive showcase of my technical expertise</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skills.map((skillGroup, groupIndex) => (
              <div 
                key={groupIndex} 
                className={`bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 ${
                  visibleSections.has('skills') ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${groupIndex * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{skillGroup.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-teal-600 font-semibold text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-1000 ease-out ${
                            visibleSections.has('skills') ? 'animate-progress-bar' : 'w-0'
                          }`}
                          style={{ 
                            '--progress': `${skill.level}%`,
                            width: visibleSections.has('skills') ? `${skill.level}%` : '0%',
                            animationDelay: `${(groupIndex * 0.2) + (skillIndex * 0.1)}s`
                          } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Floating tech icons */}
          <div className="mt-16 relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Python', icon: '🐍', delay: 0 },
                { name: 'React', icon: '⚛️', delay: 0.1 },
                { name: 'TensorFlow', icon: '🧠', delay: 0.2 },
                { name: 'Docker', icon: '🐳', delay: 0.3 },
                { name: 'MongoDB', icon: '🍃', delay: 0.4 },
                { name: 'Git', icon: '📚', delay: 0.5 },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 cursor-pointer ${
                    visibleSections.has('skills') ? 'animate-bounce-in' : 'opacity-0 scale-50'
                  }`}
                  style={{ animationDelay: `${tech.delay + 0.5}s` }}
                >
                  <div className="text-4xl mb-2 text-center">{tech.icon}</div>
                  <div className="text-sm font-medium text-gray-700 text-center">{tech.name}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <p className="text-lg text-gray-600">My academic journey</p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <GraduationCap size={24} className="text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-teal-600 font-medium">{edu.institution}</p>
                      <p className="text-gray-600 text-sm">{edu.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">{edu.duration}</p>
                    {edu.percentage && (
                      <p className="text-teal-600 font-semibold">{edu.percentage}</p>
                    )}
                    {edu.status && (
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mt-2">
                        {edu.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Let's discuss opportunities and collaborations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">anirudhsudheer@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+91 95391 02851</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <MapPin size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Kozhikode, Kerala, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/sudoanirudh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Linkedin size={20} className="text-blue-600" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Github size={20} className="text-gray-600" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.name 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {formData.name && (
                      <div className="absolute right-3 top-3 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.email 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formData.email && !formErrors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <div className="absolute right-3 top-3 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                        formErrors.subject 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="What's this about?"
                    />
                    {formData.subject && (
                      <div className="absolute right-3 top-3 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                    <span className="text-gray-500 font-normal">({formData.message.length}/500)</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      maxLength={500}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none ${
                        formErrors.message 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-teal-300'
                      }`}
                      placeholder="Tell me about your project or opportunity..."
                    />
                    {formData.message.length >= 10 && (
                      <div className="absolute right-3 top-3 text-green-500">
                        ✓
                      </div>
                    )}
                  </div>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg transform hover:-translate-y-1'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <div className="w-5 h-5 text-white">✓</div>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                    <p className="text-green-700 font-medium">Thanks for reaching out! I'll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                    <p className="text-red-700 font-medium">Something went wrong. Please try again or contact me directly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Anirudh S</h3>
            <p className="text-gray-400 mb-6">AI & ML Engineering Student</p>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.linkedin.com/in/sudoanirudh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:anirudhsudheer@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 Anirudh S. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h3>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;