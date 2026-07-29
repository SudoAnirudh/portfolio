export interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    category: string[];
    techStack: string[];
    github: string;
    demo?: string;
    image?: string;
    role: string;
    timeline: string;
    constraints: string;
    problem: string;
    approach: {
        title: string;
        decision: string;
        rejectedAlternative: string;
        rationale: string;
    }[];
    tradeoffs: string;
    outcome: string;
    metrics: { label: string; value: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
    "hirenix": {
        slug: "hirenix",
        title: "Hirenix",
        subtitle: "AI SaaS Platform for Resume Intelligence & Candidate Skill Mapping",
        category: ["AI & ML", "Full-Stack"],
        techStack: ["Next.js", "FastAPI", "Supabase", "pgvector", "LangChain", "Python"],
        github: "https://github.com/SudoAnirudh/Hirenix",
        demo: "https://hirenix-frontend.vercel.app/",
        image: "/projects/hirenix.png",
        role: "Solo Lead Architect & Full-Stack Developer",
        timeline: "2 Months",
        constraints: "Sub-200ms vector search latency on free-tier serverless PostgreSQL DB",
        problem: "Recruiters waste hundreds of hours manually screening resumes against job descriptions, while job seekers lack objective feedback on why their application failed automated ATS filters. Existing tools rely on naive keyword matching that misses semantic equivalence.",
        approach: [
            {
                title: "Hybrid Semantic Embedding Search",
                decision: "Engineered a two-pass scoring engine combining BM25 keyword matching with OpenAI text-embedding-3-small vectors stored in Supabase pgvector.",
                rejectedAlternative: "External vector SaaS (Pinecone / Qdrant)",
                rationale: "Using Supabase pgvector allowed relational candidate data and vector embeddings to co-exist in a single PostgreSQL database, eliminating external API network hops and keeping database queries atomic."
            },
            {
                title: "Async FastAPI Backend Architecture",
                decision: "Built asynchronous FastAPI endpoints with background worker tasks to process resume PDF parsing and vector generation.",
                rejectedAlternative: "Next.js API Routes / Synchronous Python Flask",
                rationale: "FastAPI provided native async non-blocking I/O for vector math operations while maintaining full access to the Python AI ecosystem (LangChain, PyPDF, NumPy)."
            }
        ],
        tradeoffs: "To achieve sub-200ms candidate indexing, resume PDF text extractions are truncated to 4,000 tokens before embedding. While this occasionally drops tail end references, it reduced vector dimension overhead by 60% without losing core skill signals.",
        outcome: "Delivered sub-200ms vector search candidate matching, automated GitHub code quality scoring, and interactive AI mock interview evaluation.",
        metrics: [
            { label: "Search Latency", value: "< 200ms" },
            { label: "Database", value: "PostgreSQL + pgvector" },
            { label: "Indexing Accuracy", value: "94% Match Precision" }
        ]
    },
    "pashu-swasthya": {
        slug: "pashu-swasthya",
        title: "PashuSwasthya",
        subtitle: "Offline-First Multilingual Mobile App for Cattle Breed & Disease Diagnosis",
        category: ["Mobile", "AI & ML"],
        techStack: ["Flutter", "TensorFlow Lite", "Python", "CNN"],
        github: "https://github.com/SudoAnirudh/PashuSwasthya",
        image: "/projects/pashu_swasthya.png",
        role: "AI Model Engineer & Mobile App Developer",
        timeline: "3 Months (Academic & Rural Field Research)",
        constraints: "Zero internet connectivity in remote farmland; target budget Android devices (< 2GB RAM)",
        problem: "Rural cattle farmers face severe economic losses due to delayed veterinary diagnosis for cattle diseases. Existing diagnostic platforms require cloud servers and high-speed internet, which are unavailable in remote agricultural zones.",
        approach: [
            {
                title: "On-Device Quantized TFLite Inference",
                decision: "Trained a custom MobileNetV3 Convolutional Neural Network (CNN) in TensorFlow, then applied INT8 post-training quantization to export a 14MB TensorFlow Lite model deployed directly on the mobile app bundle.",
                rejectedAlternative: "Cloud-hosted Inference API (PyTorch on AWS)",
                rationale: "Cloud inference is impossible without internet connectivity. Quantizing MobileNetV3 reduced model size from 65MB to 14MB while preserving 91.2% classification accuracy on mobile CPUs."
            },
            {
                title: "Multilingual Voice Guidance UI",
                decision: "Implemented localized audio playback in Kannada and Malayalam for non-tech-literate agricultural workers.",
                rejectedAlternative: "Text-only multi-language translation strings",
                rationale: "Field interviews revealed many elderly farmers struggled with dense technical text on small screens; voice output provided immediate accessibility."
            }
        ],
        tradeoffs: "Quantizing the CNN model to INT8 reduced precision slightly on rare edge-case cattle breeds (a 2.8% drop), but was necessary to guarantee real-time < 50ms inference on legacy Android chips without overheating the device.",
        outcome: "Shipped a 100% offline-first veterinary diagnostic tool operating with sub-50ms inference latency and zero cloud dependency.",
        metrics: [
            { label: "Network Requirement", value: "100% Offline" },
            { label: "Model Size", value: "14 MB Quantized" },
            { label: "Inference Speed", value: "< 50ms On-Device" }
        ]
    },
    "ai-career-copilot": {
        slug: "ai-career-copilot",
        title: "AI Career CoPilot",
        subtitle: "Multi-Agent Job Application Assistant & Kanban Tracking Engine",
        category: ["AI & ML", "Full-Stack"],
        techStack: ["Next.js", "FastAPI", "Celery", "PostgreSQL", "ChromaDB", "Gemini API"],
        github: "https://github.com/SudoAnirudh/AI_Career_CoPilot",
        image: "/projects/ai_career_copilot.png",
        role: "Full-Stack AI Developer",
        timeline: "6 Weeks",
        constraints: "Managing LLM API rate limits during high-volume job description processing",
        problem: "Applying for technical jobs requires hours of manual work tailoring cover letters, matching key experience items to job specs, and keeping track of application statuses across multiple platforms.",
        approach: [
            {
                title: "Decoupled Celery Worker Architecture",
                decision: "Offloaded heavy multi-agent LLM calls (discovery, cover letter generation, ATS check) to background Celery tasks backed by Redis.",
                rejectedAlternative: "Synchronous HTTP API requests",
                rationale: "LLM generation loops take 5–15 seconds per job post. Asynchronous queue workers prevent HTTP gateway timeouts and allow users to queue multiple applications simultaneously."
            },
            {
                title: "ChromaDB Vector Matching",
                decision: "Stored vectorized user project snippets in ChromaDB to dynamically pull the 3 most relevant project achievements for every new job description.",
                rejectedAlternative: "Static templates with variable replacement",
                rationale: "Dynamic vector retrieval ensures that a ML job application emphasizes PyTorch experience, while a Full-Stack application automatically pulls Next.js achievements."
            }
        ],
        tradeoffs: "Running background Celery workers required introducing Redis infrastructure overhead, but completely solved user experience lag during LLM generation.",
        outcome: "Automated candidate-job alignment, custom cover letter drafting, and real-time Kanban pipeline state updates.",
        metrics: [
            { label: "Task Processing", value: "Async Celery + Redis" },
            { label: "Vector Index", value: "ChromaDB Embedding Store" },
            { label: "LLM Engine", value: "Google Gemini API" }
        ]
    },
    "nimma-guru": {
        slug: "nimma-guru",
        title: "Nimma-Guru",
        subtitle: "Community Mentorship Directory Powered by Google Gemini 2.0 Flash",
        category: ["Mobile", "AI & ML"],
        techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Gemini API"],
        github: "https://github.com/SudoAnirudh/Nimma-Guru",
        image: "/projects/nimma_guru.png",
        role: "Android Lead Intern (MindMatrix)",
        timeline: "3 Months (Internship Cycle)",
        constraints: "Delivering responsive Android Material 3 UI with multi-dialect search support",
        problem: "Students in non-metropolitan towns struggle to find verified local mentors for career guidance, technical skills, and exam prep.",
        approach: [
            {
                title: "Gemini 2.0 Flash Integration",
                decision: "Integrated Google Gemini 2.0 Flash API to handle natural language mentor matching and query intent extraction.",
                rejectedAlternative: "Regex/SQL tag filtering",
                rationale: "Natural language intent matching allowed students to search with conversational queries like 'someone who can teach me coding in Kannada' rather than exact database tags."
            }
        ],
        tradeoffs: "Relied on cloud Firebase and Gemini endpoints, requiring active network connectivity, but unlocked advanced dialect search capabilities.",
        outcome: "Shipped 10+ responsive Material 3 Compose screens connecting students with domain mentors in a 3-month cycle.",
        metrics: [
            { label: "Platform", value: "Android Jetpack Compose" },
            { label: "AI Model", value: "Gemini 2.0 Flash" },
            { label: "Sync Engine", value: "Firebase Real-time DB" }
        ]
    },
    "cnn-visualizer": {
        slug: "cnn-visualizer",
        title: "CNN Visualizer",
        subtitle: "Interactive Web Dashboard for Neural Network Feature Map & Weight Inspection",
        category: ["AI & ML"],
        techStack: ["Python", "TensorFlow", "Keras", "Streamlit"],
        github: "https://github.com/SudoAnirudh/CNN-VISUALIZER",
        image: "/projects/cnn_visualizer.png",
        role: "Creator & ML Engineer",
        timeline: "3 Weeks",
        constraints: "Zero-latency visual rendering during layer-by-layer feature map inspection",
        problem: "Deep learning models are notoriously black boxes. Students and engineers struggle to visualize how convolutional layers extract low-level edges and high-level semantic features.",
        approach: [
            {
                title: "Dynamic Intermediate Activation Extraction",
                decision: "Constructed Keras sub-models dynamically to output activation matrices for every intermediate Conv2D and MaxPooling layer.",
                rejectedAlternative: "Pre-rendering static activation plots",
                rationale: "Dynamic extraction enables users to upload custom images and inspect real-time feature transformations across arbitrary neural network architectures."
            }
        ],
        tradeoffs: "High-resolution feature map rendering consumes RAM on large images. Implemented spatial downsampling on feature maps > 512x512 to preserve browser performance.",
        outcome: "Built an interactive model interpretability tool used by classmates to understand CNN feature hierarchies.",
        metrics: [
            { label: "Interactivity", value: "Real-Time Layer Weight Inspection" },
            { label: "Framework", value: "TensorFlow & Keras" }
        ]
    },
    "self-correcting-agent": {
        slug: "self-correcting-agent",
        title: "Self-Correcting Agent",
        subtitle: "Autonomous ReAct Web Research Agent with Self-Evaluation & Fallback Routing",
        category: ["AI & ML"],
        techStack: ["Python", "NVIDIA NIM", "Groq API", "Pytest"],
        github: "https://github.com/SudoAnirudh/Self_Correcting_Agent",
        image: "/projects/self_correcting_agent.png",
        role: "AI Research Engineer",
        timeline: "3 Weeks",
        constraints: "Preventing infinite hallucination loops and API cost blowouts during web scraping",
        problem: "Autonomous LLM search agents often get stuck in repetitive loops or output unverified facts when web tools return noisy or conflicting search data.",
        approach: [
            {
                title: "ReAct Loop with Critique Gate",
                decision: "Implemented a ReAct (Reasoning + Acting) execution loop paired with a secondary Reflection evaluator model that audits search results before synthesizing final answers.",
                rejectedAlternative: "Single-prompt linear LLM search call",
                rationale: "Reflection loops detected hallucinated citations and forced the agent to execute refined query searches when initial search results were insufficient."
            }
        ],
        tradeoffs: "Self-evaluation loops double LLM API calls per research task, but increased output factual verification by over 80%.",
        outcome: "Delivered a resilient web research agent capable of self-correcting failed tool calls autonomously.",
        metrics: [
            { label: "Architecture", value: "ReAct Loop + Evaluator" },
            { label: "LLM Providers", value: "NVIDIA NIM & Groq" }
        ]
    },
    "messydata": {
        slug: "messydata",
        title: "MessyData",
        subtitle: "Resilient Multi-Source ETL Pipeline & Identity Resolution Engine",
        category: ["Full-Stack"],
        techStack: ["Python", "PostgreSQL", "Docker", "RapidFuzz"],
        github: "https://github.com/SudoAnirudh/MessyData",
        image: "/projects/messy_data.png",
        role: "Data & Backend Engineer",
        timeline: "4 Weeks",
        constraints: "Reconciling thousands of duplicate customer records with typos and missing fields",
        problem: "Organizations collecting user data across multiple legacy databases end up with fragmented, duplicate, and corrupted records that skew business metrics.",
        approach: [
            {
                title: "RapidFuzz String Distance Matching",
                decision: "Combined Jaro-Winkler string distance scoring with Token Sort ratio algorithms in RapidFuzz to cluster fuzzy duplicate candidate names and addresses.",
                rejectedAlternative: "Exact SQL LIKE matching",
                rationale: "Exact SQL matching misses common human typos (e.g. 'Anirudh S' vs 'Anirud S'). RapidFuzz provided C++ accelerated fuzzy matching across thousands of rows."
            }
        ],
        tradeoffs: "Fuzzy matching threshold tuning requires balancing false positives against missed duplicates. Set confidence cutoff to 88% to prioritize data safety.",
        outcome: "Created a containerized ETL pipeline capable of deduplicating and cleaning multi-source customer datasets efficiently.",
        metrics: [
            { label: "Deduplication Engine", value: "RapidFuzz C++ Accelerated" },
            { label: "Containerization", value: "Docker Compose" }
        ]
    },
    "community-connect": {
        slug: "community-connect",
        title: "Community Connect",
        subtitle: "Civic Engagement Platform with Firebase Auth & Supabase RLS",
        category: ["Mobile", "Full-Stack"],
        techStack: ["Flutter", "React", "Firebase Auth", "Supabase"],
        github: "https://github.com/SudoAnirudh/Community_Connect",
        image: "/projects/community_connect.png",
        role: "Full-Stack Developer",
        timeline: "4 Weeks",
        constraints: "Multi-platform support (Android + Web) with strict row-level security for citizen grievance reports",
        problem: "Citizens struggle to report ward-level civic issues (road repairs, garbage management) directly to local representatives with transparent status tracking.",
        approach: [
            {
                title: "Firebase Auth + Supabase RLS Bridge",
                decision: "Used Firebase Auth for seamless phone/OTP user authentication, then passed JWT tokens into Supabase PostgreSQL Row Level Security (RLS) policies.",
                rejectedAlternative: "Custom authentication server",
                rationale: "Leveraged Firebase's battle-tested phone authentication while taking advantage of Supabase's declarative SQL authorization rules."
            }
        ],
        tradeoffs: "Dual-backend integration required syncing JWT tokens between Firebase and Supabase, but provided maximum security for citizen reports.",
        outcome: "Shipped a cross-platform civic app allowing citizens to pin geographic issue reports and track resolution progress.",
        metrics: [
            { label: "Security", value: "PostgreSQL Row Level Security" },
            { label: "Clients", value: "Flutter (Mobile) & React (Web)" }
        ]
    }
};
