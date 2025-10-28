import { useState, useEffect } from 'react';
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
  Building
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
    { category: "Programming Languages", items: ["Python", "C Language", "Java", "Dart", "PHP"] },
    { category: "Libraries/Frameworks", items: ["Django", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Flask", "scikit-learn", "Flutter"] },
    { category: "Tools/Platforms", items: ["Git", "VS Code", "Excel", "Power BI", "Tableau", "Jupyter Notebook", "Anaconda"] },
    { category: "Databases", items: ["SQL", "MongoDB"] }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-skills');
            }
          });
        },
        { threshold: 0.2 }
      );
      skillsObserver.observe(skillsSection);
    }

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">Anirudh S</h1>
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
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-cyan-400'
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
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 w-full text-left transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-gradient"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Hi, I'm <span className="text-cyan-400">Anirudh S</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
              AI & ML Engineering Student passionate about leveraging technology to solve real-world problems.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-600 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                View Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              I'm a dedicated AI & ML engineering student with a strong foundation in Python and C programming.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                My passion for AI and its potential to shape the future drives me to continuously explore 
                emerging technologies and innovate. I'm eager to apply my skills and knowledge to solve 
                real-world problems and contribute to the advancement of artificial intelligence.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">6+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">3</div>
                  <div className="text-gray-400">Internships</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Recent Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-400">Participating in GSSoC'25 as a Contributor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-400">Neo4j Certified Professional</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-400">Participated in National Level Hackathon</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Certifications</h3>
              <div className="space-y-3">
                {certifications.slice(0, 5).map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <Award size={20} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
              <button className="text-cyan-400 hover:text-cyan-300 font-medium">
                View All Certifications →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Professional Experience</h2>
            <p className="text-lg text-gray-400">My journey in AI, ML, and software development</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-900 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                      <Building size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{exp.type}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-cyan-900/50 text-cyan-400 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-400">A selection of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">View Details</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
            <p className="text-lg text-gray-400">Technologies I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-white mb-4">{skillGroup.category}</h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-cyan-400 h-2.5 rounded-full skill-bar-fill" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-gray-400 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Education</h2>
            <p className="text-lg text-gray-400">My academic journey</p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                      <GraduationCap size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                      <p className="text-cyan-400 font-medium">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{edu.duration}</p>
                    {edu.percentage && (
                      <p className="text-cyan-400 font-semibold">{edu.percentage}</p>
                    )}
                    {edu.status && (
                      <span className="inline-block px-3 py-1 bg-cyan-900/50 text-cyan-400 rounded-full text-sm font-medium mt-2">
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
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-400">I'm open to discussing new projects and opportunities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <a href="mailto:anirudhsudheer@gmail.com" className="text-gray-400 hover:text-cyan-400">anirudhsudheer@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                      <Phone size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Phone</p>
                      <a href="tel:+919539102851" className="text-gray-400 hover:text-cyan-400">+91 95391 02851</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                      <MapPin size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-gray-400">Kozhikode, Kerala, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/sudoanirudh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center hover:bg-blue-800/50 transition-colors duration-200"
                  >
                    <Linkedin size={20} className="text-blue-400" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Github size={20} className="text-gray-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
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
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 Anirudh S. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <span className="px-3 py-1 bg-cyan-900/50 text-cyan-400 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Github size={20} />
                  View Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex-1 bg-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200 flex items-center justify-center gap-2"
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