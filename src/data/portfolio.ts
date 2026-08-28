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
        role: "AI/ML Engineer | Generative AI & Agentic Systems",
        email: "anirudhsudheer@gmail.com",
        phone: "+91 95391 02851",
        location: "Kozhikode, Kerala, India (Open to Relocate & Remote)",
        social: {
            github: "https://github.com/SudoAnirudh",
            linkedin: "https://linkedin.com/in/sudoanirudh",
            buyMeACoffee: "https://buymeacoffee.com/SudoAnirudh"
        }
    },
    hero: {
        status: "📍 Kozhikode / Open to Relocate across India & Remote | Available for Full-Time & High-Impact Contract Roles",
        taglines: [
            "Building Autonomous Agentic Workflows & Multi-Agent Systems.",
            "Architecting Production GenAI Backends (FastAPI & pgvector).",
            "Deploying Edge Machine Learning Systems & Mobile AI Apps.",
            "Engineering Resilient Data Pipelines & Entity Resolution Engines."
        ],
        subtext: "Building Autonomous Agentic Workflows, Production GenAI Backends (FastAPI & pgvector), and Edge Machine Learning Systems.",
        actions: [
            { text: "View Flagship Projects", href: "#projects", icon: "arrow_forward", primary: true },
            { text: "Download Resume (PDF)", href: "https://drive.google.com/file/d/1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU/view?usp=drive_link", icon: "download", primary: false },
            { text: "LinkedIn", href: "https://linkedin.com/in/sudoanirudh", icon: "open_in_new", primary: false }
        ]
    },
    about: {
        title: "About / Identity",
        bio: "I build production-grade AI systems end-to-end — from asynchronous backends and vector search engines to autonomous multi-agent control loops and edge ML deployments. My technical core centers on Python, FastAPI, pgvector, LangChain/ReAct architectures, PyTorch, and TensorFlow Lite. I focus on measurable engineering impact: reducing API latency, eliminating hallucination loops, optimizing token budgets, and shipping clean, maintainable systems.",
        image: "/profile_pixel.png",
        highlights: [
            { label: "DEGREE", value: "B.E. in AI & ML (CGPA: 7.77)", icon: "school" },
            { label: "EXPERIENCE", value: "2 Machine Learning & Android Internships", icon: "work" },
            { label: "SHIPPED", value: "8 End-to-End AI & Full-Stack Systems", icon: "rocket_launch" }
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
            category: "AI & Agentic Systems",
            items: "Python, FastAPI, pgvector, Supabase, ReAct Control Loops, LangChain, NVIDIA NIM, Groq API, Google Gemini API, ChromaDB, PyTorch"
        },
        {
            category: "AI Coding & Agent Tooling",
            items: "Cursor, Claude Code, Antigravity, OpenAI Codex, Gemini CLI, Hermes, OpenClaw"
        },
        {
            category: "Languages & Frameworks",
            items: "Python, TypeScript, JavaScript, Kotlin, SQL, Next.js, React, Jetpack Compose, Flutter"
        },
        {
            category: "Backend & Databases",
            items: "FastAPI, Celery, Redis, PostgreSQL, SQLAlchemy, Supabase, Firebase, Docker, RapidFuzz"
        },
        {
            category: "Edge ML & Mobile",
            items: "TensorFlow Lite, MobileNetV3, Android Native (Kotlin), Flutter"
        },
        {
            category: "Tools & Infrastructure",
            items: "Git, GitHub Actions, Docker Compose, Streamlit, Linux, Vercel"
        }
    ],
    projects: [
        {
            slug: "hirenix",
            title: "Hirenix",
            icon: "psychology",
            featured: true,
            description: "Full-Stack AI Career Intelligence Platform featuring multi-provider LLM orchestration, async API throughput, and pgvector semantic resume search.",
            problem: "ATS keyword matching misses contextual candidate experience and codebase quality, delaying talent discovery.",
            approach: "Built an async FastAPI backend ingesting Resume PDF, GitHub repository histories, and LinkedIn profiles into a unified candidate representation with hybrid pgvector search (<200ms API response).",
            outcome: "Integrated a GitHub Production Index (GPI) algorithm evaluating code quality, and a voice-enabled real-time interview evaluation engine powered by Groq LLaMA 3.",
            image: "/projects/hirenix.png",
            github: "https://github.com/SudoAnirudh/Hirenix",
            demo: "https://hirenix-frontend.vercel.app/",
            specs: [
                { label: "Architecture", value: "Next.js + FastAPI" },
                { label: "Vector Search", value: "Supabase pgvector" },
                { label: "LLM Pipeline", value: "Groq LLaMA 3 + NVIDIA NIM" },
                { label: "API Latency", value: "< 200ms Indexing Response" }
            ],
            category: ["AI & ML", "Full-Stack"],
            techStack: ["Next.js", "FastAPI", "Groq API", "NVIDIA NIM", "Supabase", "pgvector", "Docker"]
        },
        {
            slug: "self-correcting-agent",
            title: "Self-Correcting ReAct Agent",
            icon: "auto_fix_high",
            featured: true,
            description: "Autonomous ReAct agent control loop built from scratch featuring deterministic evaluation, budget-capped recovery engines, and prompt reformulation.",
            problem: "Standard LLM tool-calling fails silently or enters infinite loops upon malformed tool responses or missing API parameters.",
            approach: "Engineered a multi-step ReAct framework from scratch featuring modular components: Planner, Orchestrator, Tool Router, Working Memory, and Evaluator with budget-capped state backtracking.",
            outcome: "Evaluated against a 10-task benchmark suite: logged 41 self-correction events and reduced unverified/hallucinated answers from 5/10 to 0/10.",
            image: "/projects/self_correcting_agent.png",
            github: "https://github.com/SudoAnirudh/Self_Correcting_Agent",
            specs: [
                { label: "Control Loop", value: "ReAct Architecture From Scratch" },
                { label: "Inference", value: "NVIDIA NIM + Groq API" },
                { label: "Recovery Engine", value: "Budget-Capped Backtracking" },
                { label: "Benchmark Suite", value: "0/10 Unverified Failures" }
            ],
            category: ["AI & ML"],
            techStack: ["Python", "ReAct Architecture", "NVIDIA NIM", "Groq API", "Pytest"]
        },
        {
            slug: "messydata",
            title: "MessyData",
            icon: "dataset",
            featured: true,
            description: "Resilient multi-source ETL pipeline and tiered entity resolution engine for customer record reconciliation.",
            problem: "Inconsistent customer records spread across legacy databases, rate-limited APIs, and varied CSV encodings generate duplicate data.",
            approach: "Engineered an idempotent ETL pipeline with tiered entity resolution combining exact key matching with C++ accelerated RapidFuzz fuzzy similarity scoring to generate a golden record.",
            outcome: "Executed 518 automatic profile merges with a 20-record manual triage queue, Streamlit lineage observability dashboard, and automated GitHub Actions CI/CD tests.",
            image: "/projects/messy_data.png",
            github: "https://github.com/SudoAnirudh/MessyData",
            specs: [
                { label: "Entity Resolution", value: "RapidFuzz Tiered Matching" },
                { label: "Profile Merges", value: "518 Auto / 20 Triage" },
                { label: "Observability", value: "Streamlit Lineage Dashboard" },
                { label: "CI/CD Pipeline", value: "GitHub Actions + Docker" }
            ],
            category: ["Full-Stack", "AI & ML"],
            techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "RapidFuzz", "Docker Compose", "Streamlit"]
        },
        {
            slug: "nimma-guru",
            title: "Nimma-Guru",
            icon: "diversity_3",
            featured: false,
            description: "Generative AI community mentorship mobile application with on-device voice assistance and Google Gemini 2.0 Flash mentor matching.",
            image: "/projects/nimma_guru.png",
            github: "https://github.com/SudoAnirudh/Nimma-Guru",
            specs: [
                { label: "Platform", value: "Android Native (Kotlin)" },
                { label: "UI Framework", value: "Jetpack Compose" },
                { label: "AI Engine", value: "Google Gemini 2.0 Flash" }
            ],
            category: ["Mobile", "AI & ML"],
            techStack: ["Kotlin", "Jetpack Compose", "Google Gemini 2.0", "Firebase"]
        },
        {
            slug: "pashu-swasthya",
            title: "PashuSwasthya",
            icon: "agriculture",
            featured: false,
            description: "Multilingual offline-first cattle disease diagnostic mobile app powered by INT8 quantized TensorFlow Lite edge inference.",
            image: "/projects/pashu_swasthya.png",
            github: "https://github.com/SudoAnirudh/PashuSwasthya",
            specs: [
                { label: "Edge Inference", value: "On-Device TFLite (INT8)" },
                { label: "Network Requirement", value: "100% Offline First" },
                { label: "Latency", value: "< 50ms On-Device" }
            ],
            category: ["Mobile", "AI & ML"],
            techStack: ["Flutter", "TensorFlow Lite", "MobileNetV3", "Python"]
        },
        {
            slug: "ai-career-copilot",
            title: "AI Career CoPilot",
            icon: "work_history",
            featured: false,
            description: "Asynchronous multi-agent job discovery engine running background scraping, ChromaDB match scoring, and automated outreach generation.",
            image: "/projects/ai_career_copilot.png",
            github: "https://github.com/SudoAnirudh/AI_Career_CoPilot",
            specs: [
                { label: "Orchestration", value: "FastAPI + Celery" },
                { label: "Task Queue", value: "Redis" },
                { label: "Vector DB", value: "ChromaDB" }
            ],
            category: ["AI & ML", "Full-Stack"],
            techStack: ["FastAPI", "Celery", "Redis", "ChromaDB", "NVIDIA NIM", "Next.js"]
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
                { label: "Interpretability", value: "Layer Feature Map Inspection" },
                { label: "Framework", value: "TensorFlow & Keras" }
            ],
            category: ["AI & ML"],
            techStack: ["Python", "TensorFlow", "Keras", "Streamlit"]
        },
        {
            slug: "community-connect",
            title: "Community Connect",
            icon: "groups",
            featured: false,
            description: "Civic engagement app connecting citizens with ward representatives using Firebase Auth and Supabase Row Level Security.",
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
        copyright: "© 2026 Anirudh S · AI/ML Engineer | Generative AI & Agentic Systems"
    }
};



