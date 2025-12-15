import { Github, Linkedin, Mail, FileText, Code, Database, Terminal, Cpu, Globe, Award } from 'lucide-react';

export const profile = {
    name: "Anirudh S",
    title: "AI & ML Engineering Student",
    email: "anirudhsudheer@gmail.com",
    phone: "+91 95391 02851",
    location: "Kozhikode, Kerala, India",
    summary: "Highly motivated AI & ML engineering student with a strong command of Python and C, passionate about leveraging emerging technologies to solve real-world problems. My passion for AI and its potential to shape the future drives me to continuously explore emerging technologies and innovate.",
    social: {
        github: "https://github.com/SudoAnirudh", // Placeholder
        linkedin: "https://www.linkedin.com/in/sudoanirudh/", // Placeholder
        email: "mailto:anirudhsudheer@gmail.com"
    }
};

export const education = [
    {
        institution: "Srinivas Institute Of Technology, Mangalore",
        degree: "B.E. in Artificial Intelligence And Machine Learning",
        duration: "Sept 2022 - 2026",
        details: "Pursuing"
    },
    {
        institution: "Nhss Vakayad, Kozhikode",
        degree: "Bio Science Pre-University",
        duration: "June 2020 - March 2022",
        details: "Percentage: 85%"
    },
    {
        institution: "Ghss Naduvannur, Kozhikode",
        degree: "Secondary School",
        duration: "June 2019 - March 2020",
        details: "Percentage: 95%"
    }
];

export const experience = [
    {
        company: "Vodafone Idea Foundation",
        role: "Data Analytics Intern",
        duration: "Sept 2025 - Nov 2025",
        type: "Virtual",
        description: "This internship gave me hands-on exposure to: • Working with Large Language Models • Understanding conversational AI pipelines • Applying real-world data analysis methods • Exploring how telecom + AI combine to build smarter customer experiences"
    },
    {
        company: "Hacktoberfest'25",
        role: "Open Source Contributor",
        duration: "Oct 2025 - Nov 2025",
        type: "Virtual",
        description: "Contributed to open source projects and helped the community grow."
    },
    {
        company: "GSSoC'25",
        role: "Contributor",
        duration: "Jul 2025 - Nov 2025",
        type: "Virtual",
        description: " Contributed to open source projects and helped the community grow."
    },
    {
        company: "Edunet Foundation",
        role: "AI & DA Intern",
        duration: "June 2025 - July 2025",
        type: "Virtual",
        description: "Supported by Shell India. Developed and implemented ML models for garbage classification, contributing to practical solutions in environmental sustainability."
    },
    {
        company: "Codec Technologies",
        role: "AI Intern",
        duration: "April 2025 - May 2025",
        type: "Virtual",
        description: "Engineered AI models and streamlined research documentation to enhance project outcomes."
    }
];

export const skills = [
    { category: "Languages", items: ["Python", "C", "Java", "Dart", "PHP"], icon: Code },
    { category: "Frameworks/Libs", items: ["Django", "Flask", "React", "Flutter", "NumPy", "Pandas", "Scikit-learn"], icon: Terminal },
    { category: "Tools", items: ["Git", "VS Code", "Jupyter", "Power BI", "Tableau"], icon: Cpu },
    { category: "Databases", items: ["SQL", "MongoDB"], icon: Database }
];

export const projects = [
    {
        title: "CNN Filter Visualizer",
        category: "Web App",
        tech: "React, JavaScript, CNN",
        description: "Visualizes the filters of a CNN model.",
        link: "https://github.com/SudoAnirudh/CNN-VISUALIZER"
    },
    {
        title: "Intrusion Detection System",
        category: "Machine Learning",
        tech: "ML, Flask, Python",
        description: "Uses machine learning with scikit-learn to detect network intrusions, featuring a Flask-based web interface for easy monitoring.",
        link: "https://github.com/SudoAnirudh/Intrusion-Detection-System-Using-ML"
    },
    {
        title: "Disaster Tweet Classifier",
        category: "NLP",
        tech: "NLP, Python",
        description: "A machine learning model to classify tweets as disaster-related or not using NLP techniques.",
        link: "#"
    },
    {
        title: "PashuSwasthya",
        category: "Deep Learning",
        tech: "Python,Dart,CNN, MobileNet",
        description: "Developed a mobile application using Flutter and Dart to classify animal diseases using deep learning models.",
        link: "https://github.com/SudoAnirudh/PashuSwasthya"
    },
    {
        title: "Image Enhancement Toolkit",
        category: "App Dev",
        tech: "PyQt6, OpenCV",
        description: "Desktop application for basic image processing like Gaussian blur with interactive adjustments.",
        link: "https://github.com/SudoAnirudh/Image-Enhancement-Toolkit"
    },
    {
        title: "Customer Churn Prediction",
        category: "Machine Learning",
        tech: "ML, Jupyter",
        description: "Predicts which customers are likely to leave a company to help businesses take retention actions.",
        link: "https://github.com/SudoAnirudh/Customer_Churn_Prediction"
    }
];

export const certifications = [
    "Neo4j Certified Professional",
    "Introduction to Generative AI - Google Cloud",
    "Machine Learning for All - Coursera",
    "Artificial Intelligence - Certiport",
    "Fundamentals of Cybersecurity - Zscaler",
    "Machine Learning With Python - IBM",
    "Deep Learning with Tensorflow - IBM"
];

export const achievements = [
    "Participated in GSSoC’25 as a Contributor",
    "Participated in Hacktoberfest 2025 as a Contributor"
];
