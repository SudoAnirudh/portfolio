export interface Social {
    github: string;
    linkedin: string;
    buyMeACoffee?: string;
}

export interface Personal {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    social: Social;
}

export interface HeroAction {
    text: string;
    href: string;
    icon: string;
    primary: boolean;
}

export interface Hero {
    status: string;
    taglines: string[];
    subtext: string;
    actions: HeroAction[];
}

export interface About {
    title: string;
    bio: string;
    image: string;
    highlights: {
        label: string;
        value: string;
        icon: string;
    }[];
}

export interface Education {
    period: string;
    degree: string;
    institution: string;
    cgpa?: string;
}

export interface CertificationItem {
    title: string;
    issuer: string;
    featured?: boolean;
}

export interface Experience {
    period: string;
    role: string;
    company: string;
    description: string[];
}

export interface Skill {
    category: string;
    items: string;
}

export interface Project {
    slug: string;
    title: string;
    icon: string;
    description: string;
    image?: string;
    github: string;
    demo?: string;
    featured?: boolean;
    problem?: string;
    approach?: string;
    outcome?: string;
    specs: {
        label: string;
        value: string;
    }[];
    category?: string[];
    techStack: string[];
}

export interface Footer {
    copyright: string;
}

export interface PortfolioData {
    personal: Personal;
    hero: Hero;
    about: About;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    projects: Project[];
    certifications: CertificationItem[];
    achievements: string[];
    footer: Footer;
}

export const portfolioData: PortfolioData = {
    personal: {
        name: "ANIRUDH S",
        role: "AI & ML Engineer",
        email: "anirudhsudheer@gmail.com",
        phone: "+91 95391 02851",
        location: "Kozhikode, Kerala, India",
        social: {
            github: "https://github.com/SudoAnirudh",
            linkedin: "https://linkedin.com/in/sudoanirudh",
            buyMeACoffee: "https://buymeacoffee.com/SudoAnirudh"
        }
    },
    hero: {
        status: "Open for AI/ML & GenAI Roles",
        taglines: [
            "Building end-to-end AI systems that solve real problems.",
            "Transforming data pipelines into production-grade models.",
            "Architecting LLM orchestration, RAG, and vector search systems.",
            "Bridging the gap between deep learning research and deployment.",
            "Crafting fast, offline-first ML mobile and web applications."
        ],
        subtext: "AI/ML Engineer specializing in production-grade machine learning pipelines, LLM orchestration (RAG/Agents), vector databases, and full-stack AI deployment.",
        actions: [
            { text: "View Selected Work", href: "#projects", icon: "arrow_forward", primary: true },
            { text: "Download CV", href: "/Anirudh_S.pdf", icon: "north_east", primary: false }
        ]
    },
    about: {
        title: "About / Identity",
        bio: "I build applied AI systems end-to-end — from raw data pipelines to deployed products. Recent work spans multilingual mobile apps with on-device ML, RAG and agentic LLM orchestration pipelines, and high-performance async backends in FastAPI and Django. I move fast with modern AI tooling, write clean production code, and I'm looking for an engineering team building real products with machine learning at the core.",
        image: "/profile_pixel.png",
        highlights: [
            { label: "DEGREE", value: "B.E. in AI & ML (CGPA: 7.77)", icon: "school" },
            { label: "EXPERIENCE", value: "2 Machine Learning & Android Internships", icon: "work" },
            { label: "SHIPPED", value: "8 End-to-End AI & Full-Stack Projects", icon: "rocket_launch" }
        ]
    },
    education: [
        {
            period: "2022 – 2026",
            degree: "B.E. in Artificial Intelligence & Machine Learning",
            institution: "Srinivas Institute of Technology, Mangalore",
            cgpa: "7.77"
        }
    ],
    experience: [
        {
            period: "Feb 2026 – May 2026",
            role: "Android App Development Intern (Generative AI)",
            company: "MindMatrix",
            description: [
                "Architected Nimma-Guru, a community mentorship mobile platform in Kotlin & Jetpack Compose connecting students with verified local mentors.",
                "Integrated Google Gemini 2.0 Flash to power AI mentor matching, voice query assistance, and multi-dialect content indexing.",
                "Engineered scalable Firebase real-time sync and session scheduling, delivering 10+ responsive Material 3 screens within a 3-month cycle."
            ]
        },
        {
            period: "Jan 2026 – Mar 2026",
            role: "AI/ML Intern",
            company: "HeproAI",
            description: [
                "Engineered a multi-dimensional student analytics engine tracking Academic, Wellness, and Career Readiness metrics across 200+ profiles with sub-100ms inference latency.",
                "Applied K-Means clustering for behavioral cohort segmentation to pinpoint risk indicators and automate targeted mentor interventions.",
                "Built interactive analytical dashboards in Power BI and Python to visualize learner progress and risk signals in real time."
            ]
        }
    ],
    skills: [
        {
            category: "AI & Machine Learning",
            items: "Python, scikit-learn, TensorFlow, TensorFlow Lite, LangChain, ChromaDB, pgvector, NVIDIA NIM, Gemini API"
        },
        {
            category: "Languages",
            items: "Python, JavaScript, TypeScript, Kotlin, SQL"
        },
        {
            category: "Backend & Databases",
            items: "FastAPI, Flask, Django, PostgreSQL, Supabase, Firebase, MongoDB"
        },
        {
            category: "Frontend & Mobile",
            items: "React, Next.js, Jetpack Compose, Flutter"
        },
        {
            category: "Tools & Infrastructure",
            items: "Git, Docker, Google Cloud, Android Studio, Jupyter, Power BI, VS Code"
        }
    ],
    projects: [
        {
            slug: "hirenix",
            title: "Hirenix",
            icon: "psychology",
            featured: true,
            description: "AI SaaS platform for resume intelligence, GitHub portfolio analysis, and automated mock interview prep.",
            problem: "Recruiters and job seekers struggle to map complex candidate skill sets to job requirements accurately and quickly.",
            approach: "Built an async FastAPI backend using Supabase pgvector and LangChain to calculate hybrid semantic resume-to-job match scores, with sub-200ms candidate indexing.",
            outcome: "Delivered real-time resume parsing, automated GitHub code quality scoring, and interactive mock interview evaluation.",
            image: "/projects/hirenix.png",
            github: "https://github.com/SudoAnirudh/Hirenix",
            demo: "https://hirenix-frontend.vercel.app/",
            specs: [
                { label: "Architecture", value: "Next.js + FastAPI" },
                { label: "Vector Search", value: "Supabase pgvector" },
                { label: "LLM Pipeline", value: "LangChain + OpenAI" },
                { label: "Latency", value: "< 200ms Indexing" }
            ],
            category: ["AI & ML", "Full-Stack"],
            techStack: ["Next.js", "FastAPI", "Supabase", "pgvector", "LangChain", "Python"]
        },
        {
            slug: "pashu-swasthya",
            title: "PashuSwasthya",
            icon: "agriculture",
            featured: true,
            description: "Offline-first, multilingual mobile application for cattle breed identification and disease detection.",
            problem: "Rural farmers lack immediate access to veterinary diagnostic services in low-connectivity remote regions.",
            approach: "Trained lightweight Convolutional Neural Network (CNN) image classification models and optimized them into quantized TensorFlow Lite models deployed directly on-device.",
            outcome: "Enabled instant offline disease diagnosis with multilingual audio support for non-tech-literate agricultural workers.",
            image: "/projects/pashu_swasthya.png",
            github: "https://github.com/SudoAnirudh/PashuSwasthya",
            specs: [
                { label: "Deployment", value: "On-Device TFLite" },
                { label: "Network Mode", value: "100% Offline First" },
                { label: "UI Layer", value: "Flutter Multilingual" },
                { label: "Core Model", value: "Custom CNN" }
            ],
            category: ["Mobile", "AI & ML"],
            techStack: ["Flutter", "TensorFlow Lite", "Python", "CNN"]
        },
        {
            slug: "ai-career-copilot",
            title: "AI Career CoPilot",
            icon: "work_history",
            featured: true,
            description: "Multi-agent job search assistant automating opportunity discovery, resume tailoring, and Kanban application tracking.",
            problem: "High-volume job searching is repetitive, manual, and difficult to track across disparate job portals.",
            approach: "Engineered a multi-agent orchestration pipeline using Gemini API, Celery task queues, and ChromaDB vector embeddings to match job descriptions with tailored resume variants.",
            outcome: "Automated candidate-job alignment, custom cover letter drafting, and Kanban pipeline state updates.",
            image: "/projects/ai_career_copilot.png",
            github: "https://github.com/SudoAnirudh/AI_Career_CoPilot",
            specs: [
                { label: "Orchestration", value: "Multi-Agent System" },
                { label: "Task Queue", value: "Celery + Redis" },
                { label: "Embeddings", value: "ChromaDB Vector Store" },
                { label: "Inference", value: "Gemini API + NIM" }
            ],
            category: ["AI & ML", "Full-Stack"],
            techStack: ["Next.js", "FastAPI", "Celery", "PostgreSQL", "ChromaDB", "Gemini API"]
        },
        {
            slug: "nimma-guru",
            title: "Nimma-Guru",
            icon: "diversity_3",
            featured: false,
            description: "Community mentor directory connecting village students with local domain experts using Google Gemini.",
            image: "/projects/nimma_guru.png",
            github: "https://github.com/SudoAnirudh/Nimma-Guru",
            specs: [
                { label: "Platform", value: "Android Native" },
                { label: "UI Framework", value: "Jetpack Compose" },
                { label: "AI Engine", value: "Gemini 2.0 Flash" }
            ],
            category: ["Mobile", "AI & ML"],
            techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Gemini API"]
        },
        {
            slug: "cnn-visualizer",
            title: "CNN Visualizer",
            icon: "visibility",
            featured: false,
            description: "Interactive web dashboard for visualizing CNN feature maps, filter weights, and activation layers for model interpretability.",
            image: "/projects/cnn_visualizer.png",
            github: "https://github.com/SudoAnirudh/CNN-VISUALIZER",
            specs: [
                { label: "Category", value: "Model Interpretability" },
                { label: "Framework", value: "TensorFlow & Keras" }
            ],
            category: ["AI & ML"],
            techStack: ["Python", "TensorFlow", "Keras", "Streamlit"]
        },
        {
            slug: "self-correcting-agent",
            title: "Self-Correcting Agent",
            icon: "auto_fix_high",
            featured: false,
            description: "Autonomous ReAct web research agent with self-evaluation loops, fallback LLM routing, and budget limits.",
            image: "/projects/self_correcting_agent.png",
            github: "https://github.com/SudoAnirudh/Self_Correcting_Agent",
            specs: [
                { label: "Pattern", value: "ReAct Loop + Fallbacks" },
                { label: "Inference", value: "NVIDIA NIM & Groq" }
            ],
            category: ["AI & ML"],
            techStack: ["Python", "NVIDIA NIM", "Groq API", "Pytest"]
        },
        {
            slug: "messydata",
            title: "MessyData",
            icon: "dataset",
            featured: false,
            description: "Resilient multi-source ETL pipeline and fuzzy matching identity resolution engine for customer record reconciliation.",
            image: "/projects/messy_data.png",
            github: "https://github.com/SudoAnirudh/MessyData",
            specs: [
                { label: "Engine", value: "RapidFuzz + Tenacity" },
                { label: "Database", value: "PostgreSQL" }
            ],
            category: ["Full-Stack"],
            techStack: ["Python", "PostgreSQL", "Docker", "RapidFuzz"]
        },
        {
            slug: "community-connect",
            title: "Community Connect",
            icon: "groups",
            featured: false,
            description: "Civic engagement app connecting citizens with ward representatives using Firebase Auth and Supabase RLS.",
            image: "/projects/community_connect.png",
            github: "https://github.com/SudoAnirudh/Community_Connect",
            specs: [
                { label: "Auth Bridge", value: "Firebase + Supabase RLS" },
                { label: "Clients", value: "Flutter & React" }
            ],
            category: ["Mobile", "Full-Stack"],
            techStack: ["Flutter", "React", "Firebase Auth", "Supabase"]
        }
    ],
    certifications: [
        { title: "Deep Learning With TensorFlow", issuer: "IBM", featured: true },
        { title: "Machine Learning With Python", issuer: "IBM", featured: true },
        { title: "Introduction to Generative AI", issuer: "Google Cloud", featured: true },
        { title: "Artificial Intelligence", issuer: "Certiport, Pearson", featured: false },
        { title: "Neo4j Certified Professional", issuer: "Neo4j", featured: false }
    ],
    achievements: [
        "Merged 5+ open-source pull requests across high-impact repositories during GSSoC ’25 and Hacktoberfest 2025",
        "Selected for the Student Leadership Team at USAII Global AI Hackathon 2026, coordinating communications for 100+ participants"
    ],
    footer: {
        copyright: "© 2026 Anirudh S · AI & ML Engineer"
    }
};


