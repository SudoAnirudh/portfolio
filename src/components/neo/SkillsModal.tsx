"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Code2,
  Cpu,
  Database,
  Smartphone,
  Wrench,
  Layers,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: string;
}

const skillDetails: Record<string, string> = {
  Python: "Primary language for ML & backend. Developed PashuSwasthya offline DL disease models, engineered Hirenix FastAPI scoring backend, and built Flask-based Intrusion Detection Systems.",
  PyTorch: "Used for deep learning model training, tensor manipulations, CNN feature layer extraction, and custom loss optimization across computer vision pipelines.",
  Ollama: "Deployed for local LLM inference (Llama 3, Qwen, Mistral) in privacy-focused, zero-latency local development environments.",
  Cursor: "AI-native IDE used for agentic pair programming, multi-file code transformations, and rapid codebase exploration.",
  "Claude Code": "Anthropic CLI agent used for autonomous terminal tasks, system debugging, automated refactoring, and code reviews.",
  Antigravity: "Google DeepMind agentic AI IDE used for multi-agent orchestration, pair programming, and structured task execution.",
  "OpenAI Codex": "Utilized for AI-driven code generation, automated docstring synthesis, and function implementation.",
  "Gemini CLI": "Google Gemini terminal tools used for quick LLM querying, multi-file code summarization, and prompt prototyping.",
  Hermes: "Nous Research Hermes agentic reasoning models and function-calling framework for complex tool-use workflows.",
  OpenClaw: "Autonomous AI agent and web intelligence automation tool for extracting structured web data.",
  JavaScript: "Used in Next.js development. Built UI components and client-side interactions for Hirenix career intelligence SaaS and portfolio widgets.",
  TypeScript: "Utilized in building type-safe UI modules and page routing for the Hirenix candidate portal, ensuring robust schema design.",
  Kotlin: "Android Intern at MindMatrix. Developed 'Nimma-Guru' mentorship app connecting students with local mentors, retired teachers, and professionals.",
  SQL: "Designed relational schemas, optimized index queries, and configured structured database triggers for candidate trackers and student analytics.",
  "scikit-learn": "HeproAI Intern: Applied K-Means clustering for behavioral cohort segmentation of 200+ profiles. Used for threat profiling in Intrusion Detection System.",
  TensorFlow: "Trained Convolutional Neural Networks (CNN) for image classifications. Built 'CNN Visualizer' web tool to analyze filter activations.",
  "TensorFlow Lite": "PashuSwasthya project: Deployed on-device CNN models for cattle breed & disease detection, optimized for low-connectivity rural areas.",
  LangChain: "Used for LLM orchestration, structured data parsing, prompt engineering, and semantic query routing in career intelligence tools.",
  ChromaDB: "Created local vector database embeddings for candidate resume search and similarity-based retrieval.",
  pgvector: "Hirenix: Configured pgvector in Supabase to power semantic resume-to-job similarity search and career roadmap matching under 200ms.",
  "NVIDIA NIM": "Hirenix: Integrated NIM microservices (embeddings) for scalable, sub-200ms career compatibility scoring.",
  "Google Gemini API": "MindMatrix Intern: Integrated Gemini 2.0 Flash into Nimma-Guru for voice-assisted commands and AI-powered mentor recommendations.",
  FastAPI: "Hirenix backend: Developed async API endpoints handling resume parsing and candidate indexing under 200ms latency.",
  Celery: "Engineered distributed asynchronous task queues for multi-agent workloads and background data reconciliation in AgentKube.",
  Redis: "In-memory caching and message broker powering Celery task distribution and real-time state tracking.",
  Flask: "Built backend routing, data validation, and real-time inference endpoints for the Network Intrusion Detection System.",
  Django: "Used for building structured backend panels and administering model database records.",
  Firebase: "MindMatrix: Implemented real-time sessions scheduling, user profiles database, and multilingual content management for Nimma-Guru.",
  Supabase: "Hirenix backend: Managed authentication, candidate database, and pgvector semantic query execution.",
  MongoDB: "Stored semi-structured document payloads, resume parse results, and logging outputs.",
  PostgreSQL: "Engineered relational schemas and index optimizations. Integrated pgvector plugin in production DB.",
  SQLAlchemy: "Async ORM for FastAPI backends, modeling complex relational schemas and transaction isolation.",
  RapidFuzz: "C++ accelerated string matching engine for high-throughput fuzzy entity resolution in MessyData.",
  React: "Used for frontends of Hirenix and the portfolio. Crafted highly responsive, animated UI panels.",
  "Next.js": "Hirenix frontend: Designed dynamic search interfaces, real-time interview simulator dashboard, and metrics visualization.",
  "Jetpack Compose": "MindMatrix: Developed 10+ responsive screens following Material 3 guidelines for community mentorship features.",
  Flutter: "PashuSwasthya: Designed the multilingual, offline-capable mobile app featuring voice symptom input and local storage.",
  "MobileNetV3": "Efficient convolutional neural network architecture quantized to INT8 for sub-50ms mobile edge inference.",
  "Android Native (Kotlin)": "Native mobile development on Android Studio utilizing Coroutines, StateFlow, and Jetpack components.",
  Git: "Managed project branches and PR workflows. Merged 5+ contributions during GSSoC '25 and Hacktoberfest 2025.",
  "GitHub Actions": "Engineered automated CI/CD pipelines running linting, Docker builds, and automated unit test suites.",
  Docker: "Containerized FastAPI and Node.js backend/frontend services for isolated production deployments.",
  "Docker Compose": "Orchestrated multi-container local environments with PostgreSQL, Redis, Celery, and FastAPI services.",
  Streamlit: "Built interactive analytical dashboards for CNN feature map visualization and ETL data lineage inspection.",
  Linux: "Debian/Ubuntu production environments, shell scripting, systemd service management, and networking diagnostics.",
  Kubernetes: "Orchestrated multi-agent task execution workloads and HPA autoscaling policies on AWS EKS.",
  Helm: "Templated Kubernetes manifest bundles and cluster charts for consistent, reproducible deployments.",
  ArgoCD: "Automated GitOps continuous delivery synchronization between GitHub repositories and Kubernetes clusters.",
  Terraform: "Infrastructure as Code (IaC) provisioning AWS EKS clusters, VPC subnets, and IAM roles for AgentKube.",
  Prometheus: "Scraped application metrics, task queue depths, and cluster resource utilization for real-time observability.",
  Grafana: "Engineered operational monitoring dashboards visualizing system SLOs, latency percentiles, and error rates."
};

const categoryIcons: Record<string, React.ReactNode> = {
  "AI & Machine Learning": <Cpu className="w-4 h-4 text-[#B5E635]" />,
  "Languages & Frameworks": <Code2 className="w-4 h-4 text-[#38BDF8]" />,
  "Backend & Databases": <Database className="w-4 h-4 text-[#6D4AFF]" />,
  "Edge ML & Mobile": <Smartphone className="w-4 h-4 text-[#FF7A9E]" />,
  "Tools & Infrastructure": <Wrench className="w-4 h-4 text-[#B5E635]" />
};

export const SkillsModal: React.FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  initialSkill,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSkill || "");
  const [prevInitialSkill, setPrevInitialSkill] = useState(initialSkill);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  if (initialSkill !== prevInitialSkill) {
    setPrevInitialSkill(initialSkill);
    setSearchQuery(initialSkill || "");
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const queryTokens = searchQuery
    .toLowerCase()
    .split(/[\s,/]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const categoriesWithSkills = portfolioData.skills
    .filter(
      (cat) =>
        selectedCategory === "ALL" || selectedCategory === cat.category
    )
    .map((category) => {
      const skillsInCat = category.items
        .split(", ")
        .map((item) => item.trim())
        .filter((item) => {
          if (queryTokens.length === 0) return true;
          const desc = (skillDetails[item] || "").toLowerCase();
          const itemLower = item.toLowerCase();
          return queryTokens.some(
            (t) => itemLower.includes(t) || desc.includes(t)
          );
        });

      return { category: category.category, skills: skillsInCat };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-[3px] border-[#0D0D0D] shadow-[8px_8px_0px_0px_#0D0D0D] w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#6D4AFF] text-white border-b-[2.5px] border-[#0D0D0D] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-lg font-black uppercase tracking-tight">
                TECHNICAL SKILLS &amp; ARCHITECTURAL ASSETS (46)
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 bg-white text-black border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Filter Bar */}
          <div className="p-4 sm:p-5 border-b-[2px] border-[#0D0D0D] bg-zinc-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`font-mono text-xs uppercase font-bold px-3 py-1.5 border-[2px] border-[#0D0D0D] cursor-pointer transition-all ${
                  selectedCategory === "ALL"
                    ? "bg-[#B5E635] text-black shadow-[2px_2px_0px_0px_#0D0D0D]"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                ALL
              </button>
              {portfolioData.skills.map((s) => (
                <button
                  key={s.category}
                  onClick={() => setSelectedCategory(s.category)}
                  className={`font-mono text-xs uppercase font-bold px-2.5 py-1.5 border-[2px] border-[#0D0D0D] cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedCategory === s.category
                      ? "bg-[#B5E635] text-black shadow-[2px_2px_0px_0px_#0D0D0D]"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  <span>{s.category}</span>
                </button>
              ))}
            </div>

            {/* Search Input with Clear Button */}
            <div className="relative min-w-[240px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all 46 skills &amp; usage..."
                className="w-full bg-white border-[2px] border-[#0D0D0D] pl-8 pr-8 py-1.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] shadow-[2px_2px_0px_0px_#0D0D0D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-zinc-200 hover:bg-[#FF7A9E] rounded-full flex items-center justify-center text-[10px] font-bold text-black cursor-pointer transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categorized Skills Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 graph-paper space-y-8">
            {categoriesWithSkills.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-white border-[2px] border-[#0D0D0D] p-8 shadow-[4px_4px_0px_0px_#0D0D0D]">
                <div className="font-mono text-sm font-bold text-zinc-700">
                  NO SKILLS MATCHING &quot;{searchQuery}&quot;
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("ALL");
                  }}
                  className="px-4 py-2 bg-[#B5E635] text-black border-[2px] border-[#0D0D0D] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_#0D0D0D] hover:bg-lime-400 active:shadow-none transition-all cursor-pointer"
                >
                  CLEAR SEARCH (VIEW ALL 46)
                </button>
              </div>
            ) : (
              categoriesWithSkills.map(({ category, skills }) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-[#0D0D0D]">
                    {categoryIcons[category] || (
                      <Layers className="w-4 h-4 text-[#0D0D0D]" />
                    )}
                    <h3 className="font-display text-base sm:text-lg font-black uppercase text-[#0D0D0D] tracking-tight">
                      {category} ({skills.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {skills.map((skillName) => {
                      const description =
                        skillDetails[skillName] ||
                        "Core technology utilized across engineering workflows and project implementations.";

                      const isHighlighted =
                        queryTokens.length > 0 &&
                        queryTokens.some((t) =>
                          skillName.toLowerCase().includes(t)
                        );

                      return (
                        <div
                          key={skillName}
                          className={`bg-white border-[2px] border-[#0D0D0D] p-3.5 shadow-[3px_3px_0px_0px_#0D0D0D] flex flex-col justify-between hover:-translate-y-0.5 transition-transform ${
                            isHighlighted ? "ring-2 ring-[#B5E635] bg-[#F4FCE3]" : ""
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <h4 className="font-mono text-xs font-black uppercase text-[#0D0D0D]">
                                {skillName}
                              </h4>
                              <span className="w-2 h-2 rounded-full bg-[#B5E635] border border-black" />
                            </div>
                            <p className="font-mono text-[11px] text-zinc-600 leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillsModal;
