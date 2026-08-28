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
        subtitle: "Full-Stack AI Career Intelligence Platform & Semantic Resume Matching Engine",
        category: ["AI & ML", "Full-Stack"],
        techStack: ["Next.js", "FastAPI", "Groq API", "NVIDIA NIM", "Supabase", "pgvector", "Docker"],
        github: "https://github.com/SudoAnirudh/Hirenix",
        demo: "https://hirenix-frontend.vercel.app/",
        image: "/projects/hirenix.png",
        role: "Solo Lead Architect & Full-Stack AI Engineer",
        timeline: "2 Months",
        constraints: "Sub-200ms vector search latency on serverless PostgreSQL DB while orchestrating multi-provider LLM calls.",
        problem: "ATS keyword matching misses contextual candidate experience and codebase quality, while job seekers lack objective feedback on application alignment. Existing screening tools rely on static keyword matching rather than semantic similarity.",
        approach: [
            {
                title: "Hybrid Semantic Embedding & Vector Search",
                decision: "Engineered an async FastAPI backend combining exact ATS keyword extraction with text-embedding-3-small vector embeddings stored in Supabase pgvector.",
                rejectedAlternative: "External Vector SaaS (Pinecone / Qdrant)",
                rationale: "Co-locating relational candidate profiles and vector embeddings inside PostgreSQL eliminated cross-service network hops and guaranteed atomic transaction updates."
            },
            {
                title: "Multi-Provider LLM Orchestration",
                decision: "Utilized Groq API (LLaMA 3) for ultra-fast real-time voice interview evaluation (<2s latency) and NVIDIA NIM for candidate analytical indexing.",
                rejectedAlternative: "Single API provider fallback loop",
                rationale: "Decoupling real-time speech evaluation to Groq's LPU hardware achieved sub-2-second voice response latencies needed for realistic interview simulation."
            }
        ],
        tradeoffs: "Truncated resume PDF text extractions to 4,000 tokens before embedding to maintain sub-200ms API response times. Reduced vector storage overhead by 60% with negligible loss in semantic matching precision.",
        outcome: "Shipped an end-to-end career intelligence SaaS platform featuring sub-200ms vector matching, a custom GitHub Production Index (GPI) code quality evaluator, and real-time voice interview simulation.",
        metrics: [
            { label: "API Response Latency", value: "< 200ms" },
            { label: "Vector Store", value: "Supabase pgvector" },
            { label: "Interview Latency", value: "< 2s Voice Eval" }
        ]
    },
    "self-correcting-agent": {
        slug: "self-correcting-agent",
        title: "Self-Correcting ReAct Agent",
        subtitle: "Autonomous Agent Control Loop Framework Built From Scratch",
        category: ["AI & ML"],
        techStack: ["Python", "ReAct Architecture", "NVIDIA NIM", "Groq API", "Pytest"],
        github: "https://github.com/SudoAnirudh/Self_Correcting_Agent",
        image: "/projects/self_correcting_agent.png",
        role: "Solo AI Systems Engineer",
        timeline: "3 Weeks",
        constraints: "Building deterministic error recovery loops from scratch without high-level agent frameworks (LangChain/LlamaIndex).",
        problem: "Standard LLM tool-calling fails silently or enters infinite loops when web scraping tools return malformed output, missing arguments, or rate-limit errors.",
        approach: [
            {
                title: "Modular ReAct Architecture From Scratch",
                decision: "Engineered a multi-step ReAct framework from scratch featuring modular components: Planner, Orchestrator, Tool Router, Working Memory, and Evaluator.",
                rejectedAlternative: "Framework wrappers (LangChain AgentExecutor)",
                rationale: "Building the execution loop from scratch provided full visibility into agent state transitions, token budget consumption, and custom error handling."
            },
            {
                title: "Budget-Capped State Backtracking",
                decision: "Implemented a self-correction recovery engine with state backtracking and prompt reformulation triggered upon tool execution failure.",
                rejectedAlternative: "Naive retry loops without state mutation",
                rationale: "State backtracking allows the agent to rewind its memory stack to the last known good state and attempt an alternative action path rather than repeating a failed tool call."
            }
        ],
        tradeoffs: "Adding reflection and evaluator validation steps increases total LLM calls per query by ~30%, but completely prevents hallucinated or unverified final answers.",
        outcome: "Evaluated against a 10-task benchmark suite: logged 41 self-correction events and reduced unverified/hallucinated answers from 5/10 to 0/10.",
        metrics: [
            { label: "Unverified Failures", value: "0 / 10 Benchmark Tasks" },
            { label: "Self-Correction Events", value: "41 Logged Recoveries" },
            { label: "Control Framework", value: "ReAct From Scratch" }
        ]
    },
    "messydata": {
        slug: "messydata",
        title: "MessyData",
        subtitle: "Resilient Multi-Source Data Reconciliation & Tiered Entity Resolution Engine",
        category: ["Full-Stack", "AI & ML"],
        techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "RapidFuzz", "Docker Compose", "Streamlit"],
        github: "https://github.com/SudoAnirudh/MessyData",
        image: "/projects/messy_data.png",
        role: "Data & Backend Engineer",
        timeline: "4 Weeks",
        constraints: "Reconciling mismatched, dirty customer records from legacy CSV encodings and APIs without data loss.",
        problem: "Organizations aggregating user records across multiple legacy databases end up with duplicate, corrupted, and poorly formatted profiles that skew analytics.",
        approach: [
            {
                title: "Tiered Entity Resolution Engine",
                decision: "Combined exact key matching with C++ accelerated RapidFuzz string similarity (Jaro-Winkler + Token Sort Ratio) to cluster candidate customer profiles.",
                rejectedAlternative: "Naive SQL LIKE pattern matching",
                rationale: "Exact SQL matching misses human typos ('Anirudh S' vs 'Anirud S'). RapidFuzz provided C++ accelerated string distance calculations across thousands of records."
            },
            {
                title: "Lineage Dashboard & Triage Queue",
                decision: "Constructed a Streamlit observability dashboard tracking pipeline execution metrics, data lineage, and a dedicated 20-record manual triage queue.",
                rejectedAlternative: "Silent automated merges without human verification",
                rationale: "Borderline similarity scores (80%–88%) are safely routed to a manual triage queue, guaranteeing zero accidental merges on ambiguous records."
            }
        ],
        tradeoffs: "Setting conservative fuzzy matching cutoffs (88%) required maintaining a manual triage queue for edge cases, but guaranteed 100% data integrity for golden records.",
        outcome: "Executed 518 automatic profile merges with a dedicated 20-record manual triage queue, Streamlit lineage observability, and full CI/CD test automation in GitHub Actions.",
        metrics: [
            { label: "Automatic Profile Merges", value: "518 Verified Merges" },
            { label: "Manual Triage Queue", value: "20 Borderline Records" },
            { label: "Automated Testing", value: "GitHub Actions CI/CD" }
        ]
    },
    "nimma-guru": {
        slug: "nimma-guru",
        title: "Nimma-Guru",
        subtitle: "Community Mentorship Directory Powered by Google Gemini 2.0 Flash",
        category: ["Mobile", "AI & ML"],
        techStack: ["Kotlin", "Jetpack Compose", "Google Gemini 2.0", "Firebase"],
        github: "https://github.com/SudoAnirudh/Nimma-Guru",
        image: "/projects/nimma_guru.png",
        role: "Android Lead Intern (MindMatrix)",
        timeline: "3 Months",
        constraints: "Building responsive Android Material 3 Compose UI with multi-dialect voice query support.",
        problem: "Students in non-metropolitan towns struggle to find verified local mentors for career guidance, technical skills, and academic prep.",
        approach: [
            {
                title: "Google Gemini 2.0 Flash Integration",
                decision: "Integrated Gemini 2.0 Flash API to power natural language mentor matching and voice query intent extraction.",
                rejectedAlternative: "Static SQL tag filters",
                rationale: "Conversational query extraction allowed students to search naturally ('someone who can teach me coding in Kannada') rather than selecting rigid UI dropdowns."
            }
        ],
        tradeoffs: "Cloud AI inference requires active network access, but unlocked rich conversational multi-dialect search capability.",
        outcome: "Shipped 10+ responsive Material 3 Compose screens connecting students with verified mentors during 3-month MindMatrix internship.",
        metrics: [
            { label: "UI Framework", value: "Android Jetpack Compose" },
            { label: "AI Engine", value: "Google Gemini 2.0 Flash" },
            { label: "Data Sync", value: "Firebase Real-Time DB" }
        ]
    },
    "pashu-swasthya": {
        slug: "pashu-swasthya",
        title: "PashuSwasthya",
        subtitle: "Offline-First Multilingual Mobile App for Cattle Breed & Disease Diagnosis",
        category: ["Mobile", "AI & ML"],
        techStack: ["Flutter", "TensorFlow Lite", "MobileNetV3", "Python"],
        github: "https://github.com/SudoAnirudh/PashuSwasthya",
        image: "/projects/pashu_swasthya.png",
        role: "AI Model Engineer & Mobile App Developer",
        timeline: "3 Months",
        constraints: "Zero internet connectivity in remote farmland; target budget Android devices (<2GB RAM).",
        problem: "Rural cattle farmers face severe economic losses due to delayed veterinary diagnosis for cattle diseases in remote zero-connectivity zones.",
        approach: [
            {
                title: "On-Device Quantized TFLite Inference",
                decision: "Trained MobileNetV3 CNN in TensorFlow, then applied INT8 post-training quantization to export a 14MB TFLite model running 100% on-device.",
                rejectedAlternative: "Cloud-hosted Inference API",
                rationale: "Cloud APIs fail in internet-dead zones. INT8 quantization reduced model size from 65MB to 14MB with sub-50ms inference latency."
            }
        ],
        tradeoffs: "Quantizing to INT8 dropped precision by 2.8% on rare edge cases, but enabled instant offline inference without device overheating.",
        outcome: "Shipped a 100% offline veterinary diagnostic tool operating with sub-50ms inference latency and localized regional voice output.",
        metrics: [
            { label: "Network Dependency", value: "100% Offline First" },
            { label: "Model Size", value: "14 MB Quantized TFLite" },
            { label: "Inference Latency", value: "< 50ms On-Device" }
        ]
    },
    "ai-career-copilot": {
        slug: "ai-career-copilot",
        title: "AI Career CoPilot",
        subtitle: "Multi-Agent Job Discovery & Kanban Tracking Pipeline Engine",
        category: ["AI & ML", "Full-Stack"],
        techStack: ["FastAPI", "Celery", "Redis", "ChromaDB", "NVIDIA NIM", "Next.js"],
        github: "https://github.com/SudoAnirudh/AI_Career_CoPilot",
        image: "/projects/ai_career_copilot.png",
        role: "Full-Stack AI Engineer",
        timeline: "6 Weeks",
        constraints: "Managing LLM API rate limits during high-volume job description processing.",
        problem: "Applying for technical jobs requires hours of manual work tailoring cover letters, matching key experience items to job specs, and tracking application state.",
        approach: [
            {
                title: "Decoupled Celery Worker Architecture",
                decision: "Offloaded heavy multi-agent LLM calls to background Celery tasks backed by Redis.",
                rejectedAlternative: "Synchronous HTTP API calls",
                rationale: "Asynchronous queue workers prevent HTTP gateway timeouts during multi-step agent execution."
            }
        ],
        tradeoffs: "Managing Redis infrastructure added deployment complexity, but completely eliminated UI freeze during agent generation.",
        outcome: "Automated candidate-job alignment, custom cover letter drafting, and real-time Kanban pipeline state updates.",
        metrics: [
            { label: "Task Queue", value: "Celery + Redis" },
            { label: "Vector DB", value: "ChromaDB Embedding Store" },
            { label: "Orchestration", value: "FastAPI Async Pipeline" }
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
        constraints: "Zero-latency visual rendering during layer-by-layer feature map inspection.",
        problem: "Deep learning models are black boxes. Students and engineers struggle to visualize how convolutional layers extract feature hierarchies.",
        approach: [
            {
                title: "Dynamic Activation Extraction",
                decision: "Constructed Keras sub-models dynamically to output activation matrices for every intermediate Conv2D layer.",
                rejectedAlternative: "Pre-rendered static activation plots",
                rationale: "Dynamic extraction enables users to upload custom images and inspect real-time feature transformations across arbitrary neural network architectures."
            }
        ],
        tradeoffs: "High-resolution feature map rendering consumes RAM on large images; implemented spatial downsampling on feature maps > 512x512.",
        outcome: "Built an interactive model interpretability tool used by classmates to understand CNN feature hierarchies.",
        metrics: [
            { label: "Interactivity", value: "Real-Time Feature Inspection" },
            { label: "Framework", value: "TensorFlow & Keras" }
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
        constraints: "Multi-platform support (Android + Web) with strict row-level security for citizen grievance reports.",
        problem: "Citizens struggle to report ward-level civic issues directly to local representatives with transparent status tracking.",
        approach: [
            {
                title: "Firebase Auth + Supabase RLS Bridge",
                decision: "Used Firebase Auth for OTP user authentication, then passed JWT tokens into Supabase PostgreSQL Row Level Security (RLS) policies.",
                rejectedAlternative: "Custom authentication server",
                rationale: "Leveraged Firebase's phone auth while utilizing Supabase's declarative SQL authorization rules."
            }
        ],
        tradeoffs: "Dual-backend integration required syncing JWT tokens between Firebase and Supabase, but provided robust security for citizen reports.",
        outcome: "Shipped a cross-platform civic app allowing citizens to pin geographic issue reports and track resolution progress.",
        metrics: [
            { label: "Security", value: "PostgreSQL Row Level Security" },
            { label: "Clients", value: "Flutter & React" }
        ]
    }
};

