export const portfolioData = {
    personal: {
        name: "ANIRUDH S",
        role: "AI & ML Engineer",
        email: "anirudhsudheer@gmail.com",
        phone: "+91 95391 02851",
        location: "Kozhikode, Kerala, India",
        social: {
            github: "https://github.com/SudoAnirudh",
            linkedin: "https://linkedin.com/in/sudoanirudh"
        }
    },
    hero: {
        status: "Available for AI/ML Intern Roles",
        taglines: [
            "Transforming data into intelligent decisions.", // Sunday
            "Building systems that learn and adapt.",        // Monday
            "Turning raw signals into actionable insights.", // Tuesday
            "Architecting neural networks for the real world.", // Wednesday
            "Deep Learning. Deeper understanding.",          // Thursday
            "Bridging the gap between data and deployment.", // Friday
            "Coding the future of artificial intelligence."  // Saturday
        ],
        subtext: "AI & ML undergraduate with strong hands-on exposure to Deep Learning, CNNs, and NLP. Experienced in end-to-end AI application development from data to deployment.",
        actions: [
            { text: "View Selected Work", href: "#projects", icon: "arrow_forward", primary: true },
            { text: "Download CV", href: "https://drive.google.com/uc?export=download&id=1V6g7AmD1qLFil0PY0rPI54-Rfp0RgajU", icon: "north_east", primary: false }
        ]
    },
    about: {
        title: "About / Identity",
        bio: "I am a B.E. student in Artificial Intelligence & Machine Learning (2022–2026) with a passion for building AI solutions. I have experience working with LLMs, conversational AI pipelines, and computer vision models, actively targeting AI/ML Intern roles.",
        pythonClass: {
            className: "AnirudhS",
            attributes: [
                { name: "role", value: "\"AI/ML Undergraduate\"" },
                { name: "stack", value: "[\"Deep Learning\", \"CNNs\", \"NLP\"]" },
                { name: "location", value: "\"Kozhikode, India\"" },
                { name: "email", value: "\"anirudhsudheer@gmail.com\"" }
            ],
            methods: [
                { name: "goal", return: "\"Moving from data → model → deployment\"" }
            ]
        },
        image: "/profile.png"
    },
    education: [
        {
            period: "2022 – 2026 (Pursuing)",
            degree: "B.E. AI & Machine Learning",
            institution: "Srinivas Institute of Technology, Mangalore"
        },
        {
            period: "2020 – 2022 | 85%",
            degree: "Pre-University (Bio Science)",
            institution: "NHSS Vakayad, Kozhikode"
        },
        {
            period: "2019 – 2020 | 95%",
            degree: "Secondary School",
            institution: "GHSS Naduvannur, Kozhikode"
        }
    ],
    experience: [
        {
            period: "Sep 2025 – Nov 2025",
            role: "Data Analytics Intern",
            company: "Vodafone Idea Foundation",
            description: "Worked with LLMs and conversational AI pipelines. Applied analytics on real telecom datasets and explored AI solutions for customer experience optimization."
        },
        {
            period: "Jun 2025 – Jul 2025",
            role: "AI & Data Analytics Intern",
            company: "Edunet Foundation (Shell India)",
            description: "Built ML models for garbage classification with a focus on environmental sustainability. Handled data preprocessing, training, and evaluation."
        },
        {
            period: "Apr 2025 – May 2025",
            role: "AI Intern",
            company: "Codec Technologies",
            description: "Conducted ML/DL experimentation for applied use cases and improved research workflows."
        }
    ],
    skills: [
        {
            category: "Languages",
            items: "Python, C, Java, Dart, PHP"
        },
        {
            category: "Frameworks & Libraries",
            items: "Django, Flask, NumPy, Pandas, Matplotlib, Seaborn, scikit-learn, Flutter"
        },
        {
            category: "Tools & Platforms",
            items: "Git, VS Code, Jupyter, Anaconda, Excel, Power BI, Tableau, SQL, MongoDB"
        },
        {
            category: "Soft Skills",
            items: "Analytical Thinking, Problem Solving, Collaboration, Leadership, User Empathy"
        }
    ],
    projects: [
        {
            title: "PashuSwasthya",
            icon: "agriculture",
            description: "Offline, multilingual mobile app for cattle breed & disease detection using TensorFlow Lite.",
            image: "/projects/pashu_swasthya.png",
            github: "https://github.com/SudoAnirudh/PashuSwasthya"
        },
        {
            title: "CNN Visualizer",
            icon: "visibility",
            description: "Web tool to visualize CNN filters, feature maps, and activations for deep learning interpretability.",
            image: "/projects/cnn_visualizer.png",
            github: "https://github.com/SudoAnirudh/CNN-VISUALIZER"
        },
        {
            title: "Customer Churn Prediction",
            icon: "analytics",
            description: "ML-based churn prediction using historical data with feature engineering improvements.",
            image: "/projects/churn_prediction.png",
            github: "https://github.com/SudoAnirudh/Customer_Churn_Prediction"
        },
        {
            title: "Stock Price Predictor",
            icon: "trending_up",
            description: "Forecasting models using LSTMs with strong emphasis on prediction accuracy.",
            image: "/projects/stock_predictor.png",
            github: "https://github.com/SudoAnirudh/Stock_Price_Predictor"
        },
        {
            title: "Image Enhancement Toolkit",
            icon: "auto_fix",
            description: "ML/DL-based enhancement models with a Streamlit dashboard for interaction.",
            image: "/projects/image_enhancement.png",
            github: "https://github.com/SudoAnirudh/Image-Enhancement-Toolkit"
        },
        {
            title: "Intrusion Detection System",
            icon: "security",
            description: "Network intrusion detection using ML with Flask-based real-time monitoring UI.",
            image: "/projects/intrusion_detection.png",
            github: "https://github.com/SudoAnirudh/Intrusion-Detection-System-Using-ML"
        }
    ],
    certifications: [
        "Google Cloud – Introduction to Generative AI",
        "Neo4j Certified Professional",
        "IBM – ML with Python, Deep Learning with TensorFlow",
        "Infosys Springboard – ML Foundation, GenAI Principles",
        "Zscaler – Fundamentals of Cybersecurity"
    ],
    achievements: [
        "Contributor: GSSoC ’25, Hacktoberfest 2025",
        "Active participant in national hackathons & IEEE events",
        "GDSC Event Participant"
    ],
    footer: {
        copyright: "© 2026 Anirudh S / AI & ML Engineer"
    }
};
