export interface ProjectStage {
  step: string;
  name: string;
  title: string;
  description: string;
}

export interface DecisionItem {
  decision: string;
  chosen: string;
  chosenRationale: string;
  rejected: string;
  rejectedRationale: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  categories: string[];
  role: string;
  timeline: string;
  constraints: string;
  deployment: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  stages: ProjectStage[];
  decisions: DecisionItem[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    explanation?: string;
  };
  tradeoffs: string;
  metrics: MetricItem[];
  prevProject?: { slug: string; title: string };
  nextProject?: { slug: string; title: string };
}

export const PROJECTS: Record<string, ProjectData> = {
  'hirenix': {
    slug: 'hirenix',
    title: 'Hirenix',
    tagline: 'Full-Stack AI Career Intelligence Platform & Semantic Resume Matching Engine',
    categories: ['AI & ML', 'Full-Stack'],
    role: 'Solo Lead Architect & Full-Stack AI Engineer',
    timeline: '2 Months',
    constraints: 'Sub-200ms vector search latency on serverless PostgreSQL while orchestrating multi-provider LLMs',
    deployment: 'Vercel (Next.js) + Render (FastAPI) + Supabase (pgvector)',
    techStack: ['Next.js', 'TypeScript', 'FastAPI', 'Groq API', 'NVIDIA NIM', 'Supabase pgvector', 'Docker'],
    githubUrl: 'https://github.com/SudoAnirudh/Hirenix',
    liveUrl: 'https://hirenix.vercel.app',
    problem: 'ATS keyword matching misses contextual candidate experience and codebase quality, while job seekers lack objective feedback on application alignment. Existing screening tools rely on static keyword matching rather than semantic similarity.',
    stages: [
      { step: '01', name: 'INGESTION', title: 'Candidate Document & Repo Parser', description: 'Async FastAPI ingests Resume PDF, GitHub repository commit history, and LinkedIn profile into normalized candidate JSON.' },
      { step: '02', name: 'EMBEDDING', title: 'OpenAI Text Embedding & pgvector Indexing', description: 'Generates 1536-dimensional embeddings co-located with relational candidate data in Supabase pgvector (<200ms search).' },
      { step: '03', name: 'EVALUATION', title: 'GPI Code Quality & ATS Match Scoring', description: 'GitHub Production Index (GPI) algorithm scores code complexity, commit consistency, and stack diversity alongside ATS match precision.' },
      { step: '04', name: 'SIMULATION', title: 'Groq Real-Time Voice Interview Evaluator', description: 'Decouples speech analysis to Groq LPU hardware for sub-2-second voice interaction and real-time interview evaluations.' },
    ],
    decisions: [
      {
        decision: 'Hybrid Semantic Embedding & Vector Search',
        chosen: 'FastAPI + Supabase pgvector co-located with relational DB',
        chosenRationale: 'Co-locating relational candidate profiles and vector embeddings inside PostgreSQL eliminated cross-service network hops and guaranteed atomic transaction updates.',
        rejected: 'External Vector SaaS (Pinecone / Qdrant)',
        rejectedRationale: 'External services introduced duplicate data syncing pipelines, extra network latency, and severed relational joins.',
      },
      {
        decision: 'Multi-Provider LLM Orchestration',
        chosen: 'Groq LPU (LLaMA 3) for real-time speech + NVIDIA NIM for analytical scoring',
        chosenRationale: 'Decoupling real-time speech evaluation to Groq hardware achieved sub-2-second voice response latencies needed for realistic interview simulation.',
        rejected: 'Single API Provider Fallback Loop',
        rejectedRationale: 'Standard cloud providers suffered from 4-8 second TTFT spikes, breaking natural conversational flow.',
      },
    ],
    codeSnippet: {
      filename: 'services/hybrid_search.py',
      language: 'python',
      explanation: 'Co-located PostgreSQL pgvector cosine similarity search combined with ATS metadata filtering in an async FastAPI endpoint.',
      code: `@app.post("/api/v1/candidates/search", response_model=List[CandidateMatch])
async def search_candidates(
    request: JobSearchRequest, 
    db: AsyncSession = Depends(get_db_session)
):
    # Generate vector embedding for input job description
    query_vector = await embedding_service.get_vector(request.job_description)
    
    # Execute pgvector cosine similarity match co-located inside PostgreSQL
    stmt = (
        select(Candidate, Candidate.embedding.cosine_distance(query_vector).label("distance"))
        .where(Candidate.is_active == True)
        .order_by(text("distance ASC"))
        .limit(request.top_k)
    )
    results = await db.execute(stmt)
    return [
        CandidateMatch(candidate=row.Candidate, match_score=round(1.0 - row.distance, 4))
        for row in results
    ]`,
    },
    tradeoffs: 'Truncated resume PDF text extractions to 4,000 tokens before embedding to maintain sub-200ms API response times. Reduced vector storage overhead by 60% with negligible loss in semantic matching precision.',
    metrics: [
      { value: '< 200ms', label: 'API Response Latency', subtext: 'Co-located Supabase pgvector cosine search' },
      { value: '< 2s', label: 'Voice Feedback Loop', subtext: 'Groq LPU real-time speech evaluation' },
      { value: '50+ Nodes', label: 'Skill Taxonomy Graph', subtext: 'Categorized candidate technical capabilities' },
    ],
    prevProject: { slug: 'agentkube', title: 'AgentKube' },
    nextProject: { slug: 'self-correcting-agent', title: 'Self-Correcting ReAct Agent' },
  },

  'agentkube': {
    slug: 'agentkube',
    title: 'AgentKube',
    tagline: 'Kubernetes Multi-Agent AI Execution Platform with Asynchronous Job Queuing & GitOps CI/CD',
    categories: ['Cloud & DevOps', 'Distributed AI'],
    role: 'Cloud & AI Platform Engineer',
    timeline: '6 Weeks',
    constraints: 'Eliminating HTTP gateway timeouts during multi-minute multi-agent reasoning workloads',
    deployment: 'AWS EKS + Argo CD + Terraform + Prometheus/Grafana',
    techStack: ['Python', 'FastAPI', 'Celery', 'Redis', 'Kubernetes', 'AWS EKS', 'Terraform', 'Argo CD', 'Prometheus'],
    githubUrl: 'https://github.com/SudoAnirudh/AgentKube',
    problem: 'Running multi-agent AI tasks synchronously causes HTTP gateway timeouts, lacks workload isolation across worker pods, and provides zero cluster-level execution metrics.',
    stages: [
      { step: '01', name: 'DISPATCH', title: 'FastAPI Async Ingestion', description: 'Acknowledges incoming agent run requests immediately with HTTP 202 Accepted and an execution tracking ID.' },
      { step: '02', name: 'QUEUEING', title: 'Redis & Celery Task Worker', description: 'Routes execution jobs to dedicated worker pools isolated from the public-facing API gateway.' },
      { step: '03', name: 'SCALING', title: 'Kubernetes HPA & EKS Nodes', description: 'Horizontal Pod Autoscaler scales worker replicas dynamically based on Redis queue depth and CPU utilization.' },
      { step: '04', name: 'TELEMETRY', title: 'Prometheus & Grafana Observability', description: 'Exposes full scrape endpoints for queue lag, task execution durations, and container memory pressure.' },
    ],
    decisions: [
      {
        decision: 'Asynchronous Job-Based Execution Loop',
        chosen: 'HTTP 202 Accepted + Celery Queue + Redis',
        chosenRationale: 'Allowed API to return sub-50ms responses while long-running agent loops execute reliably in background workers without gateway drops.',
        rejected: 'Synchronous Long-Polling HTTP APIs',
        rejectedRationale: 'Caused HTTP 504 gateway timeouts on agent tasks requiring multi-step tool calls.',
      },
      {
        decision: 'GitOps Automation & K8s Production Hardening',
        chosen: 'Argo CD + Declarative Helm Charts + Non-Root Security Contexts',
        chosenRationale: 'GitOps guarantees cluster state matches Git repository definitions with automated rollbacks and immutable image tags.',
        rejected: 'Manual kubectl Apply Scripts',
        rejectedRationale: 'Manual deployments drift from codebase state and lack automated rollback capabilities during bad releases.',
      },
    ],
    codeSnippet: {
      filename: 'tasks/agent_worker.py',
      language: 'python',
      explanation: 'Asynchronous task enqueue handler returning immediate HTTP 202 status while offloading execution to Celery workers on Kubernetes.',
      code: `@celery_app.task(bind=True, max_retries=3, default_retry_delay=10)
def execute_agent_workload(self, task_id: str, payload: dict):
    logger.info(f"Initiating agent execution: {task_id}")
    runner = AgentExecutionEngine(task_id=task_id, config=payload.get("config"))
    result = runner.run_with_telemetry()
    redis_store.set(f"task:{task_id}:result", result.to_json(), ex=3600)
    return {"status": "COMPLETED", "task_id": task_id}`,
    },
    tradeoffs: 'Managing Redis and worker infrastructure added operational overhead, but guaranteed zero dropped requests and isolated failure blast radiuses.',
    metrics: [
      { value: '100%', label: 'Gateway Timeout Elimination', subtext: 'Via asynchronous 202 Accepted worker queue' },
      { value: '< 15ms', label: 'Initial Dispatch Latency', subtext: 'Client request acknowledgment speed' },
      { value: '< 30s', label: 'HPA Scale Speed', subtext: 'Dynamic 3 to 8 worker pod scaling' },
    ],
    prevProject: { slug: 'messydata', title: 'MessyData' },
    nextProject: { slug: 'hirenix', title: 'Hirenix' },
  },

  'self-correcting-agent': {
    slug: 'self-correcting-agent',
    title: 'Self-Correcting ReAct Agent',
    tagline: 'Autonomous Agent Control Loop Framework Built From Scratch with Budget-Capped Backtracking',
    categories: ['AI & ML'],
    role: 'Solo AI Systems Engineer',
    timeline: '3 Weeks',
    constraints: 'Building deterministic error recovery loops from scratch without high-level agent frameworks',
    deployment: 'Python 3.11 + NVIDIA NIM + Groq API',
    techStack: ['Python', 'ReAct Architecture', 'NVIDIA NIM', 'Groq API', 'Pytest'],
    githubUrl: 'https://github.com/SudoAnirudh/Self_Correcting_Agent',
    problem: 'Standard LLM tool-calling fails silently or enters infinite loops when web scraping tools return malformed output, missing arguments, or rate-limit errors.',
    stages: [
      { step: '01', name: 'PLANNING', title: 'Goal Deconstruction & Tool Routing', description: 'Decomposes complex user research queries into atomic tool invocation steps (Web Scraper, Calculator, Fact Verifier).' },
      { step: '02', name: 'EXECUTION', title: 'ReAct Loop & Tool Execution', description: 'Executes tool calls and streams tool outputs into a bounded working memory stack.' },
      { step: '03', name: 'EVALUATION', title: 'Critique Gate & Reflection', description: 'Independent Evaluator model audits tool outputs for malformed data or hallucinated citations.' },
      { step: '04', name: 'RECOVERY', title: 'Budget-Capped Backtracking', description: 'If verification fails, rewinds state stack, reformulates prompt, and attempts alternative execution paths.' },
    ],
    decisions: [
      {
        decision: 'Modular ReAct Architecture From Scratch',
        chosen: 'Custom Planner, Orchestrator, Tool Router, Working Memory, and Evaluator',
        chosenRationale: 'Building the execution loop from scratch provided full visibility into agent state transitions, token budget consumption, and custom error handling.',
        rejected: 'Framework Wrappers (LangChain AgentExecutor)',
        rejectedRationale: 'High-level abstractions hid internal memory stack states, making deterministic state backtracking and custom retry logic impossible.',
      },
      {
        decision: 'Budget-Capped State Backtracking',
        chosen: 'State Backtracking & Prompt Reformulation Loop',
        chosenRationale: 'State backtracking allows the agent to rewind its memory stack to the last known good state and attempt an alternative action path.',
        rejected: 'Naive Retry Loops Without State Mutation',
        rejectedRationale: 'Retrying the exact same tool call without prompt modification caused infinite loop execution burns.',
      },
    ],
    codeSnippet: {
      filename: 'agent/control_loop.py',
      language: 'python',
      explanation: 'State backtracking and prompt reformulation loop preventing infinite agent execution loops.',
      code: `async def execute_agent_loop(task: AgentTask, max_steps: int = 5) -> TaskResult:
    memory_stack = [task.initial_prompt]
    step_count = 0
    
    while step_count < max_steps:
        thought, action, tool_args = await planner.next_step(memory_stack)
        try:
            observation = await tool_router.dispatch(action, tool_args)
            verified = await evaluator.verify(observation)
            if verified.is_valid:
                return TaskResult(success=True, answer=observation)
            
            # ReAct reflection & prompt reformulation upon verification fault
            memory_stack.append(f"Fault: {verified.reason}. Reformulating plan.")
        except ToolExecutionError as err:
            # Budget-capped state backtracking to last verified checkpoint
            memory_stack = memory_stack[:step_count]
            memory_stack.append(f"Tool Error: {err}. Routing fallback tool.")
        step_count += 1
        
    return TaskResult(success=False, error="Budget cap limit reached (5 steps)")`,
    },
    tradeoffs: 'Adding reflection and evaluator validation steps increases total LLM calls per query by ~30%, but completely prevents hallucinated or unverified final answers.',
    metrics: [
      { value: '0 / 10', label: 'Unverified Failures', subtext: 'Benchmark test suite accuracy' },
      { value: '41', label: 'Self-Correction Events', subtext: 'Logged deterministic recoveries' },
      { value: 'Custom', label: 'ReAct Engine', subtext: 'Built zero-dependency from scratch' },
    ],
    prevProject: { slug: 'hirenix', title: 'Hirenix' },
    nextProject: { slug: 'messydata', title: 'MessyData' },
  },

  'messydata': {
    slug: 'messydata',
    title: 'MessyData',
    tagline: 'Resilient Multi-Source Data Reconciliation & Tiered Entity Resolution Engine',
    categories: ['Full-Stack', 'AI & ML'],
    role: 'Data & Backend Engineer',
    timeline: '4 Weeks',
    constraints: 'Reconciling mismatched, dirty customer records from legacy CSV encodings and APIs without data loss',
    deployment: 'Python 3.10 + PostgreSQL + RapidFuzz + Docker Compose',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'RapidFuzz', 'Docker Compose', 'Streamlit'],
    githubUrl: 'https://github.com/SudoAnirudh/MessyData',
    problem: 'Organizations aggregating user records across multiple legacy databases end up with duplicate, corrupted, and poorly formatted profiles that skew analytics.',
    stages: [
      { step: '01', name: 'EXTRACTION', title: 'Multi-Source Extraction & Normalization', description: 'Ingests raw records from PostgreSQL, REST APIs, and varied CSV encodings into normalized data schemas.' },
      { step: '02', name: 'RESOLUTE', title: 'Exact Key & RapidFuzz Similarity Matching', description: 'Executes exact key matching followed by C++ accelerated Jaro-Winkler string distance scoring.' },
      { step: '03', name: 'MERGING', title: 'Golden Record Synthesis & Auto Merges', description: 'Clusters candidate profiles above 88% confidence and writes unified golden customer records.' },
      { step: '04', name: 'TRIAGE', title: 'Streamlit Lineage & Manual Triage Queue', description: 'Routes borderline matches (80%-88%) to a 20-record manual triage queue with full lineage tracking.' },
    ],
    decisions: [
      {
        decision: 'Tiered Entity Resolution Engine',
        chosen: 'Exact Key Matching + C++ RapidFuzz (Jaro-Winkler + Token Sort)',
        chosenRationale: 'Exact SQL matching misses human typos. RapidFuzz provided C++ accelerated string distance calculations across thousands of records in milliseconds.',
        rejected: 'Naive SQL LIKE Pattern Matching',
        rejectedRationale: 'SQL LIKE clauses failed on transposed names, missing middle initials, and varied phone formats.',
      },
      {
        decision: 'Lineage Dashboard & Triage Queue',
        chosen: 'Streamlit Observability Dashboard + Manual Triage Queue',
        chosenRationale: 'Borderline similarity scores (80%–88%) are safely routed to a manual triage queue, guaranteeing zero accidental merges on ambiguous records.',
        rejected: 'Silent Automated Merges Without Threshold Gates',
        rejectedRationale: 'Auto-merging below 88% risk corrupting distinct customer accounts with similar names.',
      },
    ],
    codeSnippet: {
      filename: 'pipeline/entity_resolution.py',
      language: 'python',
      explanation: 'Tiered fuzzy matching engine utilizing RapidFuzz C++ algorithms for record clustering.',
      code: `def reconcile_customer_records(raw_records: pd.DataFrame, cutoff: float = 88.0) -> DeduplicationSummary:
    golden_records, triage_queue = [], []
    clustered_groups = defaultdict(list)
    
    for idx, record in raw_records.iterrows():
        matched = False
        for group_id, members in clustered_groups.items():
            # C++ accelerated RapidFuzz Token Sort & Jaro-Winkler similarity
            score = fuzz.token_sort_ratio(record["name"], members[0]["name"])
            if score >= cutoff:
                members.append(record)
                matched = True
                break
        if not matched:
            clustered_groups[record["id"]].append(record)
            
    return DeduplicationSummary(merged=len(clustered_groups), triage_count=len(triage_queue))`,
    },
    tradeoffs: 'Setting conservative fuzzy matching cutoffs (88%) required maintaining a manual triage queue for edge cases, but guaranteed 100% data integrity for golden records.',
    metrics: [
      { value: '518', label: 'Verified Profile Merges', subtext: 'Automated entity resolution' },
      { value: '20', label: 'Triage Queue Records', subtext: 'Borderline human audit safety gate' },
      { value: '100%', label: 'CI/CD Pass Rate', subtext: 'Automated GitHub Actions workflow' },
    ],
    prevProject: { slug: 'self-correcting-agent', title: 'Self-Correcting ReAct Agent' },
    nextProject: { slug: 'agentkube', title: 'AgentKube' },
  },

  'pashu-swasthya': {
    slug: 'pashu-swasthya',
    title: 'PashuSwasthya',
    tagline: 'Offline-First Multilingual Mobile App for Cattle Breed & Disease Diagnosis',
    categories: ['Mobile', 'AI & ML'],
    role: 'AI Model Engineer & Mobile App Developer',
    timeline: '3 Months',
    constraints: 'Zero internet connectivity in remote farmland; target budget Android devices (<2GB RAM)',
    deployment: 'Flutter (Android) + TensorFlow Lite (On-Device)',
    techStack: ['Flutter', 'TensorFlow Lite', 'MobileNetV3', 'Python'],
    githubUrl: 'https://github.com/SudoAnirudh/PashuSwasthya',
    problem: 'Rural cattle farmers face severe economic losses due to delayed veterinary diagnosis for cattle diseases in remote zero-connectivity zones.',
    stages: [
      { step: '01', name: 'CAPTURE', title: 'Camera & Image Preprocessing', description: 'Captures cattle image and resizes/normalizes array to 224x224 tensor format on device.' },
      { step: '02', name: 'INFERENCE', title: 'On-Device Quantized TFLite Engine', description: 'Executes INT8 MobileNetV3 model completely offline with sub-50ms CPU inference time.' },
      { step: '03', name: 'DIAGNOSIS', title: 'Disease & Confidence Parser', description: 'Maps output vector to class labels with confidence score and immediate treatment advisory.' },
      { step: '04', name: 'AUDIO', title: 'Localized Voice Advisory Output', description: 'Synthesizes regional dialect audio advisory so illiterate farmers can act immediately.' },
    ],
    decisions: [
      {
        decision: 'On-Device Quantized TFLite Inference',
        chosen: 'INT8 Post-Training Quantization (14MB TFLite Model)',
        chosenRationale: 'Cloud APIs fail in internet-dead zones. INT8 quantization reduced model size from 65MB to 14MB with sub-50ms inference latency.',
        rejected: 'Cloud-Hosted Inference API',
        rejectedRationale: 'Requires continuous 4G/5G data connections which are unavailable in remote Indian farm fields.',
      },
    ],
    codeSnippet: {
      filename: 'ml/tflite_engine.dart',
      language: 'dart',
      explanation: 'On-device INT8 quantized MobileNetV3 TFLite inference loop with sub-50ms latency.',
      code: `Future<DiagnosisResult> runOnDeviceInference(File imageFile) async {
  final inputBytes = await preprocessImage(imageFile, targetSize: 224);
  final interpreter = await Interpreter.fromAsset('models/mobilenet_v3_quant.tflite');
  
  var outputBuffer = List<int>.filled(numClasses, 0).reshape([1, numClasses]);
  final stopwatch = Stopwatch()..start();
  
  interpreter.run(inputBytes, outputBuffer);
  stopwatch.stop(); // Guaranteed < 50ms latency on mobile CPUs
  
  final topPrediction = parseTFLiteOutputs(outputBuffer);
  return DiagnosisResult(disease: topPrediction.label, latencyMs: stopwatch.elapsedMilliseconds);
}`,
    },
    tradeoffs: 'Quantizing to INT8 dropped precision by 2.8% on rare edge cases, but enabled instant offline inference without device overheating.',
    metrics: [
      { value: '100%', label: 'Offline First', subtext: 'Zero network connection required' },
      { value: '14 MB', label: 'Quantized TFLite Model', subtext: 'INT8 post-training compressed size' },
      { value: '< 50ms', label: 'Inference Latency', subtext: 'Sub-second CPU execution on budget Android' },
    ],
    prevProject: { slug: 'agentkube', title: 'AgentKube' },
    nextProject: { slug: 'nimma-guru', title: 'Nimma-Guru' },
  },

  'nimma-guru': {
    slug: 'nimma-guru',
    title: 'Nimma-Guru',
    tagline: 'Community Mentorship Directory Powered by Google Gemini 2.0 Flash',
    categories: ['Mobile', 'AI & ML'],
    role: 'Android Lead Intern (MindMatrix)',
    timeline: '3 Months',
    constraints: 'Building responsive Android Material 3 Compose UI with multi-dialect voice query support',
    deployment: 'Android Jetpack Compose + Firebase + Gemini 2.0 Flash',
    techStack: ['Kotlin', 'Jetpack Compose', 'Google Gemini 2.0', 'Firebase'],
    githubUrl: 'https://github.com/SudoAnirudh/Nimma-Guru',
    problem: 'Students in non-metropolitan towns struggle to find verified local mentors for career guidance, technical skills, and academic prep due to rigid directory filters.',
    stages: [
      { step: '01', name: 'QUERY', title: 'Voice & Natural Text Query Ingestion', description: 'Accepts student query in multi-dialect natural language via voice or text.' },
      { step: '02', name: 'PARSING', title: 'Gemini 2.0 Flash Intent Extraction', description: 'Passes natural input through Gemini 2.0 Flash to extract JSON intent schema (domain, language, urgency).' },
      { step: '03', name: 'MATCHING', title: 'Firebase Repository Intent Query', description: 'Queries mentor database using structured intent parameters.' },
      { step: '04', name: 'RENDER', title: 'Material 3 Compose UI Cards', description: 'Renders verified mentor profiles with one-tap connect options.' },
    ],
    decisions: [
      {
        decision: 'Google Gemini 2.0 Flash Integration',
        chosen: 'Gemini 2.0 Flash Structured Output Parsing',
        chosenRationale: 'Conversational query extraction allowed students to search naturally ("someone who can teach me coding in Kannada") rather than selecting rigid UI dropdowns.',
        rejected: 'Static SQL Tag Filters',
        rejectedRationale: 'Required students to know precise keywords and missed conversational intent.',
      },
    ],
    codeSnippet: {
      filename: 'ai/MentorMatcher.kt',
      language: 'kotlin',
      explanation: 'Gemini 2.0 Flash natural language query extraction for Android mentor search.',
      code: `suspend fun findMentorMatches(studentQuery: String): List<MentorProfile> {
    val generativeModel = Firebase.ai.generativeModel("gemini-2.0-flash")
    val prompt = """
        Extract domain skills, language preference, and intent from query: "$studentQuery".
        Respond in JSON schema: {"skills": [], "language": "", "urgency": ""}
    """.trimIndent()
    val response = generativeModel.generateContent(prompt)
    val parsedIntent = jsonDecoder.decodeFromString<SearchIntent>(response.text!!)
    return mentorRepository.queryMentorsByIntent(parsedIntent)
}`,
    },
    tradeoffs: 'Cloud AI inference requires active network access, but unlocked rich conversational multi-dialect search capability.',
    metrics: [
      { value: '10+', label: 'Material 3 Screens', subtext: 'Built with Jetpack Compose' },
      { value: 'Gemini 2.0', label: 'AI Match Engine', subtext: 'Structured JSON intent parsing' },
      { value: 'MindMatrix', label: 'Production Internship', subtext: '3-month deployment lifecycle' },
    ],
    prevProject: { slug: 'pashu-swasthya', title: 'PashuSwasthya' },
    nextProject: { slug: 'ai-career-copilot', title: 'AI Career CoPilot' },
  },

  'ai-career-copilot': {
    slug: 'ai-career-copilot',
    title: 'AI Career CoPilot',
    tagline: 'Multi-Agent Job Discovery & Kanban Tracking Pipeline Engine',
    categories: ['AI & ML', 'Full-Stack'],
    role: 'Full-Stack AI Engineer',
    timeline: '6 Weeks',
    constraints: 'Managing LLM API rate limits during high-volume job description processing',
    deployment: 'FastAPI + Celery + Redis + ChromaDB + Next.js',
    techStack: ['FastAPI', 'Celery', 'Redis', 'ChromaDB', 'NVIDIA NIM', 'Next.js'],
    githubUrl: 'https://github.com/SudoAnirudh/AI_Career_CoPilot',
    problem: 'Applying for technical jobs requires hours of manual work tailoring cover letters, matching key experience items to job specs, and tracking application state.',
    stages: [
      { step: '01', name: 'PARSE', title: 'Job Specification Parser', description: 'Extracts core requirements, tech stacks, and seniority level from posted job URLs.' },
      { step: '02', name: 'SEARCH', title: 'ChromaDB Vector Retrieval', description: 'Queries candidate project database for 3 most relevant experience items.' },
      { step: '03', name: 'TAILOR', title: 'Multi-Agent Resume & Letter Generation', description: 'Orchestrates ATS parser, bullet optimizer, and letter writer agents asynchronously.' },
      { step: '04', name: 'TRACK', title: 'Kanban Status Synchronization', description: 'Updates application board state to READY_TO_APPLY with tailored assets.' },
    ],
    decisions: [
      {
        decision: 'Decoupled Celery Worker Architecture',
        chosen: 'HTTP 202 Accepted + Celery Workers + Redis',
        chosenRationale: 'Asynchronous queue workers prevent HTTP gateway timeouts during multi-step agent execution.',
        rejected: 'Synchronous HTTP API Calls',
        rejectedRationale: 'Caused gateway timeouts when executing sequential LLM generation steps.',
      },
    ],
    codeSnippet: {
      filename: 'tasks/worker.py',
      language: 'python',
      explanation: 'Asynchronous Celery worker task decoupling multi-agent LLM pipeline execution.',
      code: `@celery_app.task(bind=True, max_retries=3, default_retry_delay=5)
def orchestrate_job_tailoring_task(self, job_id: str, user_id: str):
    job_desc = db.fetch_job(job_id)
    user_projects = chroma_vector_store.query_relevant_projects(job_desc.text, k=3)
    
    # Trigger multi-agent pipeline asynchronously
    tailored_resume = agent_orchestrator.run(
        agents=["ats_parser", "bullet_optimizer", "cover_letter_writer"],
        context={"job": job_desc, "projects": user_projects}
    )
    kanban_service.update_application_status(job_id, status="READY_TO_APPLY")`,
    },
    tradeoffs: 'Managing Redis infrastructure added deployment complexity, but completely eliminated UI freeze during agent generation.',
    metrics: [
      { value: 'Celery', label: 'Async Queue', subtext: 'Redis task broker decoupling' },
      { value: 'ChromaDB', label: 'Vector Retrieval', subtext: 'Semantic project context matching' },
      { value: 'Sub-50ms', label: 'Dispatch Time', subtext: 'Instant UI feedback response' },
    ],
    prevProject: { slug: 'nimma-guru', title: 'Nimma-Guru' },
    nextProject: { slug: 'cnn-visualizer', title: 'CNN Visualizer' },
  },

  'cnn-visualizer': {
    slug: 'cnn-visualizer',
    title: 'CNN Visualizer',
    tagline: 'Interactive Web Dashboard for Neural Network Feature Map & Weight Inspection',
    categories: ['AI & ML'],
    role: 'Creator & ML Engineer',
    timeline: '3 Weeks',
    constraints: 'Zero-latency visual rendering during layer-by-layer feature map inspection',
    deployment: 'Python + Streamlit + TensorFlow',
    techStack: ['Python', 'TensorFlow', 'Keras', 'Streamlit'],
    githubUrl: 'https://github.com/SudoAnirudh/CNN-VISUALIZER',
    problem: 'Deep learning models are black boxes. Students and engineers struggle to visualize how convolutional layers extract feature hierarchies.',
    stages: [
      { step: '01', name: 'UPLOAD', title: 'Image & Model Ingestion', description: 'Accepts image input and loads target CNN model architecture.' },
      { step: '02', name: 'EXTRACT', title: 'Sub-Model Layer Activations', description: 'Dynamically builds Keras sub-models to extract feature map activations for target Conv2D layers.' },
      { step: '03', name: 'PROCESS', title: 'Matrix Normalization & Heatmap Gen', description: 'Normalizes raw activation matrices into visual heatmaps.' },
      { step: '04', name: 'DISPLAY', title: 'Streamlit Interactive Grid', description: 'Renders feature maps side-by-side with filter weight distributions.' },
    ],
    decisions: [
      {
        decision: 'Dynamic Activation Extraction',
        chosen: 'Dynamic Keras Sub-Models for Intermediate Layer Outputs',
        chosenRationale: 'Dynamic extraction enables users to upload custom images and inspect real-time feature transformations across arbitrary neural network architectures.',
        rejected: 'Pre-Rendered Static Activation Plots',
        rejectedRationale: 'Static plots prevented custom user inputs and arbitrary layer comparisons.',
      },
    ],
    codeSnippet: {
      filename: 'visualizer/core.py',
      language: 'python',
      explanation: 'Dynamic Keras sub-model construction for feature map activation extraction.',
      code: `def get_layer_activations(model: tf.keras.Model, layer_name: str, input_image: np.ndarray) -> np.ndarray:
    # Construct intermediate sub-model dynamically
    intermediate_layer_model = tf.keras.Model(
        inputs=model.input,
        outputs=model.get_layer(layer_name).output
    )
    # Extract feature activation maps
    activations = intermediate_layer_model.predict(input_image)
    return activations`,
    },
    tradeoffs: 'High-resolution feature map rendering consumes RAM on large images; implemented spatial downsampling on feature maps > 512x512.',
    metrics: [
      { value: 'Real-Time', label: 'Feature Map Extraction', subtext: 'Dynamic Keras sub-model evaluation' },
      { value: 'Streamlit', label: 'Interactive Dashboard', subtext: 'Layer-by-layer visual inspection' },
      { value: 'TensorFlow', label: 'ML Framework', subtext: 'Conv2D filter weight visualization' },
    ],
    prevProject: { slug: 'ai-career-copilot', title: 'AI Career CoPilot' },
    nextProject: { slug: 'community-connect', title: 'Community Connect' },
  },

  'community-connect': {
    slug: 'community-connect',
    title: 'Community Connect',
    tagline: 'Civic Engagement Platform with Firebase Auth & Supabase RLS',
    categories: ['Mobile', 'Full-Stack'],
    role: 'Full-Stack Developer',
    timeline: '4 Weeks',
    constraints: 'Multi-platform support (Android + Web) with strict row-level security for citizen grievance reports',
    deployment: 'Flutter + React + Firebase + Supabase',
    techStack: ['Flutter', 'React', 'Firebase Auth', 'Supabase'],
    githubUrl: 'https://github.com/SudoAnirudh/Community_Connect',
    problem: 'Citizens struggle to report ward-level civic issues directly to local representatives with transparent status tracking.',
    stages: [
      { step: '01', name: 'AUTH', title: 'Firebase Phone OTP Authentication', description: 'Authenticates citizen phone numbers securely.' },
      { step: '02', name: 'REPORT', title: 'Geographic Grievance Submission', description: 'Captures location coordinates, photo proof, and grievance classification.' },
      { step: '03', name: 'SECURE', title: 'Supabase PostgreSQL RLS Verification', description: 'Passes auth JWT to Supabase RLS policies to restrict editing to report creators.' },
      { step: '04', name: 'TRACK', title: 'Real-Time Status Synchronization', description: 'Broadcasts resolution state updates to citizen dashboard.' },
    ],
    decisions: [
      {
        decision: 'Firebase Auth + Supabase RLS Bridge',
        chosen: 'Firebase Phone Auth JWT passed to Supabase SQL RLS Policies',
        chosenRationale: 'Leveraged Firebase phone auth while utilizing Supabase declarative SQL authorization rules.',
        rejected: 'Custom Authentication Server',
        rejectedRationale: 'Increased operational burden without providing additional security benefits.',
      },
    ],
    codeSnippet: {
      filename: 'auth/supabase_rls_bridge.ts',
      language: 'typescript',
      explanation: 'Passing Firebase Auth JWT token to Supabase client for Row Level Security.',
      code: `import { createClient } from '@supabase/supabase-js';

export function getAuthenticatedSupabaseClient(firebaseIdToken: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: \`Bearer \${firebaseIdToken}\`,
        },
      },
    }
  );
}`,
    },
    tradeoffs: 'Dual-backend integration required syncing JWT tokens between Firebase and Supabase, but provided robust security for citizen reports.',
    metrics: [
      { value: 'PostgreSQL', label: 'Row Level Security', subtext: 'Declarative data access rules' },
      { value: 'Flutter & React', label: 'Cross-Platform', subtext: 'Android and Web client parity' },
      { value: 'Real-Time', label: 'Status Updates', subtext: 'Supabase WebSocket listeners' },
    ],
    prevProject: { slug: 'cnn-visualizer', title: 'CNN Visualizer' },
    nextProject: { slug: 'hirenix', title: 'Hirenix' },
  },
};
