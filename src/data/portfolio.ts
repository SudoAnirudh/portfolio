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

export interface PythonAttribute {
    name: string;
    value: string;
}

export interface PythonMethod {
    name: string;
    return: string;
}

export interface PythonClass {
    className: string;
    attributes: PythonAttribute[];
    methods: PythonMethod[];
}

export interface About {
    title: string;
    bio: string;
    pythonClass: PythonClass;
    image: string;
}

export interface Education {
    period: string;
    degree: string;
    institution: string;
}

export interface Experience {
    period: string;
    role: string;
    company: string;
    description: string | string[];
}

export interface Skill {
    category: string;
    items: string;
}

export interface Project {
    title: string;
    icon: string;
    description: string;
    image?: string;
    github: string;
    demo?: string;
    specs: {
        label: string;
        value: string;
    }[];
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
    certifications: string[];
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
        status: "Seeking AI/ML & GenAI Roles",
        taglines: [
            "Transforming data into intelligent decisions.", // Sunday
            "Building systems that learn and adapt.",        // Monday
            "Turning raw signals into actionable insights.", // Tuesday
            "Architecting neural networks for the real world.", // Wednesday
            "Deep Learning. Deeper understanding.",          // Thursday
            "Bridging the gap between data and deployment.", // Friday
            "Coding the future of artificial intelligence."  // Saturday
        ],
        subtext: "AI/ML Engineer with a B.E. in Artificial Intelligence & Machine Learning, experienced in building production-grade AI applications, Android solutions, and machine learning systems. Skilled in Python, Kotlin, FastAPI, Google Gemini, NLP, and Deep Learning.",
        actions: [
            { text: "View Selected Work", href: "#projects", icon: "arrow_forward", primary: true },
            { text: "Download CV", href: "/Anirudh_S.pdf", icon: "north_east", primary: false }
        ]
    },
    about: {
        title: "About / Identity",
        bio: "I am a B.E. student in Artificial Intelligence & Machine Learning (2022–2026) experienced in building production-grade AI applications, Android solutions, and machine learning systems. I have hands-on experience delivering real-world projects through internships in Generative AI and student analytics.",
        pythonClass: {
            className: "AnirudhS",
            attributes: [
                { name: "role", value: "\"AI/ML Engineer\"" },
                { name: "stack", value: "[\"Python\", \"Kotlin\", \"FastAPI\", \"Gemini API\", \"Deep Learning\"]" },
                { name: "location", value: "\"Kozhikode, India\"" },
                { name: "email", value: "\"anirudhsudheer@gmail.com\"" }
            ],
            methods: [
                { name: "goal", return: "\"Building production-grade AI & mobile systems\"" }
            ]
        },
        image: "/profile_pixel.png"
    },
    education: [
        {
            period: "Sep 2022 – 2026",
            degree: "B.E. in Artificial Intelligence and Machine Learning (CGPA: 7.77)",
            institution: "Srinivas Institute Of Technology, Mangalore"
        },
        {
            period: "Jun 2020 – Mar 2022",
            degree: "Bio Science Pre-University (85%)",
            institution: "NHSS Vakayad, Kozhikode"
        },
        {
            period: "Jun 2019 – Mar 2020",
            degree: "Secondary School (95%)",
            institution: "GHSS Naduvannur, Kozhikode"
        }
    ],
    experience: [
        {
            period: "Feb 2026 – May 2026",
            role: "Android App Development Intern (Generative AI)",
            company: "MindMatrix",
            description: [
                "Developed Nimma-Guru, a community mentorship Android application using Kotlin and Jetpack Compose, connecting students with local mentors.",
                "Architected an end-to-end solution with Firebase backend services supporting real-time session scheduling, mentor profile management, and multilingual content.",
                "Integrated Google Gemini 2.0 Flash to enable AI-powered mentor recommendations and voice-assisted interactions.",
                "Built community engagement features (Thank You Wall, Wall of Fame) and designed 10+ responsive Material 3 Compose screens.",
                "Utilized Android Studio, Google Cloud Labs, and Google AI Studio to deliver a functional prototype within a 3-month cycle."
            ]
        },
        {
            period: "Jan 2026 – Mar 2026",
            role: "AI/ML Intern",
            company: "HeproAI",
            description: [
                "Designed a data-driven student analytics framework tracking Academic, Wellness, Productivity, and Career Readiness across 200+ student profiles.",
                "Implemented composite scoring algorithms to generate normalized performance metrics, enabling real-time dashboard updates with sub-100ms inference time.",
                "Applied K-Means clustering to segment learners into five behavioral cohorts based on risk/readiness indicators.",
                "Developed a rule-based mentor recommendation engine mapping 15+ student risk signals to personalized intervention strategies."
            ]
        }
    ],
    skills: [
        {
            category: "Languages",
            items: "Python, JavaScript, TypeScript, Kotlin, SQL"
        },
        {
            category: "AI / ML",
            items: "scikit-learn, TensorFlow, TensorFlow Lite, LangChain, ChromaDB, pgvector, NVIDIA NIM, Gemini API"
        },
        {
            category: "Backend & APIs",
            items: "FastAPI, Flask, Django, Firebase, Supabase, MongoDB, PostgreSQL"
        },
        {
            category: "Frontend & Mobile",
            items: "React, Next.js, Jetpack Compose, Flutter"
        },
        {
            category: "Tools & Platforms",
            items: "Git, Docker, Google Cloud, Android Studio, Jupyter, Power BI, VS Code"
        }
    ],
    projects: [
        {
            title: "PashuSwasthya",
            icon: "agriculture",
            description: "Offline, multilingual mobile app for cattle breed & disease detection using TensorFlow Lite.",
            image: "/projects/pashu_swasthya.png",
            github: "https://github.com/SudoAnirudh/PashuSwasthya",
            specs: [
                { label: "Format", value: "Mobile Cartridge" },
                { label: "Mode", value: "Offline First" },
                { label: "Region", value: "Multilingual" },
                { label: "Status", value: "Prototype Ready" }
            ],
            techStack: ["Flutter", "TensorFlow Lite", "Python"]
        },
        {
            title: "CNN Visualizer",
            icon: "visibility",
            description: "Web tool to visualize CNN filters, feature maps, and activations for deep learning interpretability.",
            image: "/projects/cnn_visualizer.png",
            github: "https://github.com/SudoAnirudh/CNN-VISUALIZER",
            specs: [
                { label: "Format", value: "Web Cartridge" },
                { label: "Mode", value: "Interactive Visuals" },
                { label: "Engine", value: "Deep Learning" },
                { label: "Status", value: "Open Source" }
            ],
            techStack: ["Python", "TensorFlow", "Keras", "Streamlit"]
        },
        {
            title: "Hirenix",
            icon: "psychology",
            description: "AI-powered SaaS platform for resume intelligence, GitHub portfolio analysis, and mock interview prep using NLP and LLMs.",
            image: "/projects/hirenix.png",
            github: "https://github.com/SudoAnirudh/Hirenix",
            demo: "https://hirenix-frontend.vercel.app/",
            specs: [
                { label: "Format", value: "AI SaaS Cartridge" },
                { label: "Mode", value: "Real-time Analysis" },
                { label: "Engine", value: "LLM + Vector Search" },
                { label: "Status", value: "Ongoing 🚀" }
            ],
            techStack: ["Next.js", "FastAPI", "Supabase", "OpenAI", "pgvector", "Python"]
        },
        {
            title: "MessyData",
            icon: "dataset",
            description: "Resilient multi-source ETL pipeline and fuzzy matching identity resolution engine to ingest, clean, and reconcile customer profiles across disconnected systems.",
            image: "/projects/messy_data.png",
            github: "https://github.com/SudoAnirudh/MessyData",
            specs: [
                { label: "Format", value: "Data Pipeline Cartridge" },
                { label: "Mode", value: "Identity Resolution" },
                { label: "Engine", value: "RapidFuzz + Tenacity" },
                { label: "Status", value: "Completed 🚀" }
            ],
            techStack: ["Python", "PostgreSQL", "Streamlit", "Docker", "RapidFuzz", "Tenacity"]
        },
        {
            title: "Community Connect",
            icon: "groups",
            description: "Premium community management platform for local wards and panchayats, leveraging custom OIDC claims to connect Firebase Auth with Supabase RLS.",
            image: "/projects/community_connect.png",
            github: "https://github.com/SudoAnirudh/Community_Connect",
            specs: [
                { label: "Format", value: "Mobile/Web Cartridge" },
                { label: "Arch", value: "Firebase + Supabase" },
                { label: "Status", value: "Ongoing (Beta) 🛠️" },
                { label: "Engine", value: "Flutter + React" }
            ],
            techStack: ["Flutter", "React", "Firebase Auth", "Supabase", "PostgreSQL", "Riverpod"]
        },
        {
            title: "Nimma-Guru",
            icon: "diversity_3",
            description: "A community-driven mentor directory connecting village experts and knowledge seekers using Google Gemini and offline SMS integration.",
            image: "/projects/nimma_guru.png",
            github: "https://github.com/SudoAnirudh/Nimma-Guru",
            specs: [
                { label: "Format", value: "Mobile Cartridge" },
                { label: "Mode", value: "Offline + Voice" },
                { label: "Engine", value: "Gemini Flash 2.0" },
                { label: "Status", value: "Completed 🚀" }
            ],
            techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Gemini API", "Android Studio"]
        }
    ],
    certifications: [
        "Deep Learning With TensorFlow - IBM",
        "Machine Learning With Python - IBM",
        "Introduction to Generative AI - Google Cloud",
        "Artificial Intelligence - Certiport, Pearson",
        "Neo4j Certified Professional - Neo4j"
    ],
    achievements: [
        "Merged 5+ PRs across open-source repositories as a contributor to GSSoC ’25 and Hacktoberfest 2025",
        "Selected for the Student Leadership Team at the USAII Global AI Hackathon 2026, handling participant communications and logistics for 100+ registrants"
    ],
    footer: {
        copyright: "© 2026 Anirudh S / AI & ML Engineer"
    }
};
