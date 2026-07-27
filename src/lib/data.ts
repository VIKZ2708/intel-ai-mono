export interface Module {
  title: string;
  topics: string[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: "DSA" | "System Design" | "Full Stack" | "Web Dev" | "AI/ML";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  image: string;
  tags: string[];
  popular?: boolean;
  instructor: "vikas" | "jitender" | "both";
  whatYouLearn: string[];
  prerequisites: string[];
  forWhom: string[];
  curriculum: Module[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Build a rock-solid foundation with arrays, linked lists, trees, graphs, and sorting algorithms.",
    category: "DSA",
    level: "Beginner",
    duration: "12 weeks",
    lessons: 120,
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=600&h=380&fit=crop&auto=format",
    tags: ["Arrays", "Trees", "Graphs", "Sorting"],
    popular: true,
    instructor: "vikas",
    whatYouLearn: [
      "Understand time & space complexity using Big-O notation",
      "Master arrays, strings, and two-pointer techniques",
      "Implement stacks, queues, and linked lists from scratch",
      "Traverse and manipulate binary trees & BSTs",
      "Apply BFS & DFS to solve graph problems",
      "Sort data efficiently with Merge Sort, Quick Sort, Heap Sort",
      "Solve 80+ curated coding problems across all concepts",
      "Build intuition for choosing the right data structure",
    ],
    prerequisites: [
      "Basic programming knowledge in any language (Java, Python, or C++ preferred)",
      "Understanding of loops, conditionals, and functions",
      "No prior DSA experience required",
    ],
    forWhom: [
      "Students preparing for campus placements",
      "Developers switching into product-based companies",
      "Anyone starting their DSA journey from scratch",
      "Professionals who want to refresh fundamentals",
    ],
    curriculum: [
      {
        title: "Complexity Analysis & Arrays",
        topics: [
          "Big-O, Big-Θ, Big-Ω notation",
          "Time vs Space complexity trade-offs",
          "1D and 2D arrays — traversal and manipulation",
          "Sliding window technique",
          "Prefix sums and difference arrays",
          "Practice: Two Sum, Maximum Subarray, Rotate Array",
        ],
      },
      {
        title: "Strings & Hashing",
        topics: [
          "String operations and immutability",
          "Anagrams, palindromes, and pattern matching",
          "HashMap and HashSet internals",
          "Frequency counting patterns",
          "Practice: Longest Substring Without Repeating, Group Anagrams",
        ],
      },
      {
        title: "Linked Lists",
        topics: [
          "Singly and doubly linked lists",
          "Insertion, deletion, and reversal",
          "Fast & slow pointer (Floyd's cycle detection)",
          "Merging and sorting linked lists",
          "Practice: Reverse Linked List, LRU Cache, Merge K Sorted Lists",
        ],
      },
      {
        title: "Stacks & Queues",
        topics: [
          "Stack using arrays and linked lists",
          "Monotonic stack patterns",
          "Queue, Deque, and Circular Queue",
          "Priority Queue and Heaps",
          "Practice: Valid Parentheses, Next Greater Element, Sliding Window Maximum",
        ],
      },
      {
        title: "Trees & Binary Search Trees",
        topics: [
          "Binary tree representation and traversals (in/pre/post/level)",
          "Height, diameter, and balance",
          "Binary Search Tree operations",
          "Lowest Common Ancestor",
          "Practice: Invert Binary Tree, Validate BST, Path Sum",
        ],
      },
      {
        title: "Graphs",
        topics: [
          "Graph representations: adjacency list vs matrix",
          "BFS and DFS from scratch",
          "Topological sort (Kahn's algorithm)",
          "Union-Find / Disjoint Set Union",
          "Shortest paths: Dijkstra's algorithm",
          "Practice: Number of Islands, Clone Graph, Course Schedule",
        ],
      },
      {
        title: "Sorting & Searching",
        topics: [
          "Bubble, Selection, Insertion sort — when to use each",
          "Merge Sort and Quick Sort (implementation + analysis)",
          "Heap Sort",
          "Binary Search patterns — lower/upper bound",
          "Practice: Search in Rotated Array, Kth Largest Element",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Advanced DSA & Interview Prep",
    description: "Crack FAANG interviews with dynamic programming, advanced graph algorithms, and segment trees.",
    category: "DSA",
    level: "Advanced",
    duration: "16 weeks",
    lessons: 200,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=380&fit=crop&auto=format",
    tags: ["Dynamic Programming", "Graph Algorithms", "Tries", "Segment Trees"],
    popular: true,
    instructor: "vikas",
    whatYouLearn: [
      "Master Dynamic Programming — top-down and bottom-up approaches",
      "Solve advanced graph problems: Bellman-Ford, Floyd-Warshall, MST",
      "Build Tries for autocomplete and word search problems",
      "Implement Segment Trees and Binary Indexed Trees for range queries",
      "Understand Backtracking, Greedy, and Divide & Conquer paradigms",
      "Solve 150+ problems at LeetCode Medium/Hard level",
      "Learn mock interview techniques and time management",
      "Get interview-ready for FAANG and top product companies",
    ],
    prerequisites: [
      "Completion of DSA Fundamentals (Course 1) or equivalent knowledge",
      "Comfortable with recursion and basic graph traversals",
      "Familiarity with time and space complexity analysis",
    ],
    forWhom: [
      "Developers targeting FAANG, Google, Amazon, Microsoft interviews",
      "Competitive programmers looking to level up",
      "Anyone who has DSA basics but struggles with hard problems",
    ],
    curriculum: [
      {
        title: "Recursion & Backtracking",
        topics: [
          "Recursion tree visualization",
          "Backtracking template and pruning",
          "Subsets, Permutations, Combinations",
          "N-Queens, Sudoku Solver",
          "Word Search and Letter Combinations",
        ],
      },
      {
        title: "Dynamic Programming — Foundations",
        topics: [
          "Memoization vs tabulation",
          "1D DP: Fibonacci, Climbing Stairs, House Robber",
          "2D DP: Unique Paths, Minimum Path Sum",
          "Knapsack (0/1, Unbounded)",
          "Longest Common Subsequence / Substring",
        ],
      },
      {
        title: "Dynamic Programming — Advanced",
        topics: [
          "DP on Trees and Graphs",
          "Interval DP: Burst Balloons, Matrix Chain Multiplication",
          "Bitmask DP",
          "DP with monotonic stack optimization",
          "Digit DP",
        ],
      },
      {
        title: "Advanced Graph Algorithms",
        topics: [
          "Bellman-Ford algorithm",
          "Floyd-Warshall all-pairs shortest paths",
          "Minimum Spanning Tree: Prim's and Kruskal's",
          "Strongly Connected Components (Tarjan's, Kosaraju's)",
          "Bridges and Articulation Points",
        ],
      },
      {
        title: "Tries & String Algorithms",
        topics: [
          "Trie insertion, search, and deletion",
          "Autocomplete with Tries",
          "KMP pattern matching",
          "Rabin-Karp rolling hash",
          "Suffix Arrays",
        ],
      },
      {
        title: "Segment Trees & Advanced Structures",
        topics: [
          "Segment Tree build, query, and update",
          "Lazy propagation",
          "Binary Indexed Tree (Fenwick Tree)",
          "Sparse Table for range minimum queries",
          "Persistent Segment Tree",
        ],
      },
      {
        title: "Mock Interviews & Strategy",
        topics: [
          "FAANG interview format deep-dive",
          "How to think aloud and communicate approach",
          "Handling hints and clarifications",
          "10 full mock interview sessions",
          "Resume and profile review",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "System Design Fundamentals",
    description: "Design scalable distributed systems — load balancers, databases, caching, and microservices.",
    category: "System Design",
    level: "Intermediate",
    duration: "10 weeks",
    lessons: 85,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop&auto=format",
    tags: ["Load Balancing", "Caching", "Databases", "APIs"],
    instructor: "jitender",
    whatYouLearn: [
      "Translate business requirements into scalable system architectures",
      "Design RESTful and GraphQL APIs with proper rate limiting",
      "Choose between SQL and NoSQL databases for different use cases",
      "Implement caching layers with Redis and CDN strategies",
      "Use load balancers, reverse proxies, and horizontal scaling",
      "Build reliable systems with queues and async processing",
      "Understand CAP theorem and consistency trade-offs",
      "Design systems that handle millions of concurrent users",
    ],
    prerequisites: [
      "1+ year of software development experience",
      "Basic understanding of HTTP, REST APIs",
      "Familiarity with databases (SQL or NoSQL)",
    ],
    forWhom: [
      "Backend developers preparing for senior engineer interviews",
      "Developers moving from SDE-1 to SDE-2 / senior roles",
      "Engineers who want to design systems confidently",
    ],
    curriculum: [
      {
        title: "Foundations of Scalable Systems",
        topics: [
          "Vertical vs horizontal scaling",
          "Latency vs throughput trade-offs",
          "Reliability, availability, and fault tolerance",
          "Single points of failure and redundancy",
          "Back-of-envelope estimation techniques",
        ],
      },
      {
        title: "Databases & Storage",
        topics: [
          "RDBMS vs NoSQL — when to choose what",
          "Indexing, sharding, and replication",
          "ACID vs BASE properties",
          "Read replicas and write-ahead logging",
          "Blob storage and object stores (S3-like systems)",
        ],
      },
      {
        title: "Caching Strategies",
        topics: [
          "Cache-aside, write-through, write-back patterns",
          "Redis internals and data structures",
          "CDN and edge caching",
          "Cache invalidation strategies",
          "Thundering herd problem and solutions",
        ],
      },
      {
        title: "APIs & Communication",
        topics: [
          "RESTful API design best practices",
          "GraphQL vs REST vs gRPC",
          "Rate limiting algorithms (Token Bucket, Leaky Bucket)",
          "API versioning and backward compatibility",
          "WebSockets and Server-Sent Events",
        ],
      },
      {
        title: "Messaging & Async Processing",
        topics: [
          "Message queues: RabbitMQ and Kafka basics",
          "Producer-consumer patterns",
          "At-least-once vs exactly-once delivery",
          "Event-driven architecture",
          "Background job processing",
        ],
      },
      {
        title: "System Design Case Studies",
        topics: [
          "Design a URL shortener (TinyURL)",
          "Design a key-value store",
          "Design a notification system",
          "Design a rate limiter",
          "Design a search autocomplete system",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Advanced System Design",
    description: "Architect systems at the scale of Twitter, Netflix, and Uber with real-world case studies.",
    category: "System Design",
    level: "Advanced",
    duration: "14 weeks",
    lessons: 160,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=380&fit=crop&auto=format",
    tags: ["Distributed Systems", "CAP Theorem", "Kafka", "Sharding"],
    popular: true,
    instructor: "jitender",
    whatYouLearn: [
      "Architect systems serving 100M+ users with high availability",
      "Design distributed databases with consistent hashing and sharding",
      "Build real-time data pipelines using Kafka and stream processing",
      "Implement service meshes, circuit breakers, and distributed tracing",
      "Design for geo-distribution, multi-region failover, and disaster recovery",
      "Understand the trade-offs in consistency models (eventual, strong, causal)",
      "Ace senior/staff engineer system design interviews at top companies",
    ],
    prerequisites: [
      "Completion of System Design Fundamentals (Course 3) or 2+ years backend experience",
      "Experience with at least one cloud platform (AWS, GCP, or Azure)",
      "Solid understanding of databases and caching",
    ],
    forWhom: [
      "Senior engineers targeting staff/principal roles",
      "Architects who want to formalize their design knowledge",
      "Developers preparing for senior FAANG/MAANG interviews",
    ],
    curriculum: [
      {
        title: "Distributed Systems Theory",
        topics: [
          "CAP theorem deep dive with real-world examples",
          "PACELC theorem",
          "Consensus algorithms: Paxos and Raft",
          "Leader election and distributed coordination",
          "Two-phase commit and Saga pattern",
        ],
      },
      {
        title: "Advanced Database Design",
        topics: [
          "Consistent hashing for distributed caches and DBs",
          "Database sharding strategies",
          "Multi-master replication",
          "NewSQL: CockroachDB, Spanner",
          "Time-series databases",
        ],
      },
      {
        title: "Stream Processing & Kafka",
        topics: [
          "Kafka architecture: brokers, topics, partitions",
          "Kafka consumers, consumer groups, and offsets",
          "Stream processing with Kafka Streams",
          "Exactly-once semantics",
          "Real-time analytics pipelines",
        ],
      },
      {
        title: "Microservices & Service Mesh",
        topics: [
          "Microservices decomposition strategies",
          "Service discovery and load balancing",
          "Circuit breaker pattern (Hystrix/Resilience4j)",
          "Distributed tracing (Jaeger, Zipkin)",
          "API Gateway patterns",
        ],
      },
      {
        title: "Real-World System Design Cases",
        topics: [
          "Design Twitter / X feed and timeline",
          "Design Netflix video streaming",
          "Design Uber ride-matching and surge pricing",
          "Design WhatsApp messaging at scale",
          "Design Google Drive / Dropbox",
        ],
      },
      {
        title: "Observability & Reliability",
        topics: [
          "SLOs, SLAs, and error budgets",
          "Logging, metrics, and distributed tracing (the three pillars)",
          "Chaos engineering principles",
          "Blue-green and canary deployments",
          "Post-mortems and blameless culture",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Full Stack Development",
    description: "Go from zero to full-stack hero — React, Node.js, databases, REST APIs, and deployment.",
    category: "Full Stack",
    level: "Intermediate",
    duration: "20 weeks",
    lessons: 240,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=380&fit=crop&auto=format",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
    popular: true,
    instructor: "both",
    whatYouLearn: [
      "Build modern UIs with React 19 including hooks and context",
      "Create scalable REST APIs with Node.js and Express",
      "Design relational databases and write complex SQL queries",
      "Authenticate users with JWT and OAuth (Google/GitHub)",
      "Use Docker to containerize and deploy your applications",
      "Set up CI/CD pipelines and deploy to cloud platforms",
      "Handle file uploads, real-time features, and third-party integrations",
      "Build and ship 3 full-stack projects for your portfolio",
    ],
    prerequisites: [
      "Comfortable with HTML, CSS, and basic JavaScript",
      "Some programming experience (any language)",
      "No backend or React experience needed",
    ],
    forWhom: [
      "Frontend developers who want to go full-stack",
      "Students who want job-ready full-stack skills",
      "Developers building their first SaaS product",
      "Professionals switching to tech from other fields",
    ],
    curriculum: [
      {
        title: "JavaScript Deep Dive",
        topics: [
          "ES6+: destructuring, spread, arrow functions, modules",
          "Promises, async/await, and error handling",
          "Closures, prototypes, and the event loop",
          "DOM manipulation and browser APIs",
          "TypeScript fundamentals",
        ],
      },
      {
        title: "React 19 — Fundamentals to Advanced",
        topics: [
          "JSX, components, and props",
          "useState, useEffect, useRef, useMemo, useCallback",
          "Context API and state management",
          "React Router v6 — client-side routing",
          "React Server Components and Suspense",
          "Forms, validation, and controlled components",
        ],
      },
      {
        title: "Backend with Node.js & Express",
        topics: [
          "Node.js event loop and non-blocking I/O",
          "Building REST APIs with Express",
          "Middleware, error handling, and request validation",
          "JWT authentication and session management",
          "File uploads with Multer",
        ],
      },
      {
        title: "Databases",
        topics: [
          "PostgreSQL: schemas, joins, indexes, transactions",
          "ORM with Prisma or Drizzle",
          "MongoDB for document storage",
          "Redis for caching and sessions",
          "Database migrations and seeding",
        ],
      },
      {
        title: "DevOps & Deployment",
        topics: [
          "Docker: containers, images, and Compose",
          "GitHub Actions CI/CD pipeline",
          "Deploying to Railway, Render, or AWS",
          "Environment variables and secrets management",
          "Monitoring and logging basics",
        ],
      },
      {
        title: "Capstone Projects",
        topics: [
          "Project 1: Full-stack task manager with auth",
          "Project 2: Real-time chat application with WebSockets",
          "Project 3: E-commerce API with payments (Stripe integration)",
          "Portfolio deployment and README writing",
          "Code review and peer feedback sessions",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "React & Next.js Mastery",
    description: "Build production-grade web apps with React 19, Next.js 15, TypeScript, and Tailwind CSS.",
    category: "Full Stack",
    level: "Intermediate",
    duration: "12 weeks",
    lessons: 140,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=380&fit=crop&auto=format",
    tags: ["React 19", "Next.js 15", "TypeScript", "Tailwind"],
    instructor: "both",
    whatYouLearn: [
      "Build type-safe React apps end-to-end with TypeScript",
      "Use the Next.js 15 App Router and Server Components",
      "Style beautiful UIs rapidly with Tailwind CSS",
      "Optimize Core Web Vitals: LCP, CLS, FID",
      "Integrate third-party APIs and authentication providers",
      "Deploy to Vercel with custom domains and CI/CD",
      "Test components with Vitest and Playwright",
      "Master advanced patterns: compound components, render props, custom hooks",
    ],
    prerequisites: [
      "Basic React knowledge (props, state, hooks)",
      "Comfortable with JavaScript ES6+",
      "HTML/CSS fundamentals",
    ],
    forWhom: [
      "React developers who want to upgrade to Next.js",
      "Frontend engineers targeting senior positions",
      "Developers building SaaS products or portfolios",
    ],
    curriculum: [
      {
        title: "TypeScript for React Developers",
        topics: [
          "Types, interfaces, generics, and utility types",
          "Typing props, hooks, events, and refs",
          "Discriminated unions for component variants",
          "Type-safe API calls with Zod",
        ],
      },
      {
        title: "Next.js 15 App Router",
        topics: [
          "App Router vs Pages Router — when to use each",
          "Server Components and Client Components",
          "Layouts, nested routes, and route groups",
          "Loading states, error boundaries, and Suspense",
          "Parallel and intercepting routes",
        ],
      },
      {
        title: "Data Fetching & Caching",
        topics: [
          "fetch with caching and revalidation",
          "Server Actions for mutations",
          "SWR and React Query for client-side fetching",
          "Optimistic UI updates",
          "Streaming with Suspense",
        ],
      },
      {
        title: "Tailwind CSS — Advanced Patterns",
        topics: [
          "Design tokens and custom theme configuration",
          "Responsive design and dark mode",
          "Animation with tailwind-animate",
          "Component libraries: shadcn/ui integration",
          "CSS-in-JS alternatives and trade-offs",
        ],
      },
      {
        title: "Performance & SEO",
        topics: [
          "Image optimization with next/image",
          "Font optimization with next/font",
          "Metadata API and Open Graph",
          "Lighthouse auditing and Core Web Vitals",
          "Bundle analysis and code splitting",
        ],
      },
      {
        title: "Testing & Deployment",
        topics: [
          "Unit testing with Vitest",
          "Component testing with Testing Library",
          "E2E testing with Playwright",
          "CI/CD with GitHub Actions + Vercel",
          "Feature flags and preview deployments",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Introduction to AI & Machine Learning",
    description: "Understand AI fundamentals — regression, classification, neural networks, and real-world ML.",
    category: "AI/ML",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 90,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=380&fit=crop&auto=format",
    tags: ["Python", "ML Basics", "Neural Networks", "Scikit-learn"],
    instructor: "jitender",
    whatYouLearn: [
      "Understand the full machine learning pipeline end-to-end",
      "Apply linear and logistic regression to real datasets",
      "Build classification and clustering models",
      "Preprocess and clean messy real-world data",
      "Evaluate models with precision, recall, F1-score, and AUC-ROC",
      "Build your first neural network using TensorFlow/Keras",
      "Visualize data and model insights with Matplotlib and Seaborn",
      "Deploy a simple ML model as a web API",
    ],
    prerequisites: [
      "Basic Python programming (loops, functions, lists)",
      "High school level mathematics (algebra, basic statistics)",
      "No ML or data science experience needed",
    ],
    forWhom: [
      "Complete beginners curious about AI and data science",
      "Software developers wanting to add AI to their skillset",
      "Students exploring AI/ML as a career path",
      "Non-engineers who want to understand ML concepts",
    ],
    curriculum: [
      {
        title: "Python for Data Science",
        topics: [
          "NumPy arrays and vectorized operations",
          "Pandas DataFrames — filtering, groupby, merge",
          "Data visualization with Matplotlib and Seaborn",
          "Jupyter Notebooks workflow",
          "Handling missing data and outliers",
        ],
      },
      {
        title: "Supervised Learning",
        topics: [
          "Linear regression and gradient descent",
          "Logistic regression for binary classification",
          "Decision Trees and Random Forests",
          "Support Vector Machines (SVM)",
          "Model evaluation: train/test split, cross-validation",
        ],
      },
      {
        title: "Unsupervised Learning",
        topics: [
          "K-Means clustering",
          "Hierarchical clustering",
          "Principal Component Analysis (PCA)",
          "Dimensionality reduction techniques",
          "Anomaly detection",
        ],
      },
      {
        title: "Neural Networks Basics",
        topics: [
          "Perceptron and multi-layer networks",
          "Activation functions: ReLU, Sigmoid, Tanh",
          "Backpropagation and chain rule",
          "Building a neural network with Keras",
          "Overfitting and regularization",
        ],
      },
      {
        title: "Real-World Projects",
        topics: [
          "Project: Spam email classifier",
          "Project: House price prediction",
          "Project: Customer churn prediction",
          "Model deployment with FastAPI",
          "Communicating results to non-technical stakeholders",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Deep Learning & Generative AI",
    description: "Build LLMs, diffusion models, and AI agents using PyTorch and the Hugging Face ecosystem.",
    category: "AI/ML",
    level: "Advanced",
    duration: "16 weeks",
    lessons: 190,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=380&fit=crop&auto=format",
    tags: ["PyTorch", "Transformers", "LLMs", "Diffusion Models"],
    popular: true,
    instructor: "jitender",
    whatYouLearn: [
      "Build and train deep neural networks with PyTorch from scratch",
      "Understand and implement Transformers and the attention mechanism",
      "Fine-tune large language models (LLMs) using LoRA and PEFT",
      "Build Retrieval-Augmented Generation (RAG) pipelines",
      "Create AI agents with tool use and memory",
      "Train and evaluate diffusion models for image generation",
      "Deploy AI models to production with efficient serving",
      "Understand safety, alignment, and responsible AI practices",
    ],
    prerequisites: [
      "Completion of Intro to AI/ML (Course 7) or equivalent experience",
      "Comfortable with Python and NumPy",
      "Basic understanding of neural networks and backpropagation",
    ],
    forWhom: [
      "ML engineers moving into generative AI",
      "Researchers who want to apply LLMs to products",
      "Developers building AI-native applications",
      "Anyone serious about the frontier of AI",
    ],
    curriculum: [
      {
        title: "Deep Learning with PyTorch",
        topics: [
          "Tensors, autograd, and computational graphs",
          "CNN architectures: LeNet, VGG, ResNet",
          "RNNs, LSTMs, and sequence-to-sequence models",
          "Training loops, optimizers, and schedulers",
          "GPU training and mixed precision",
        ],
      },
      {
        title: "Transformers & Attention",
        topics: [
          "Self-attention and multi-head attention",
          "Positional encodings",
          "Encoder-decoder architecture",
          "BERT, GPT, and T5 family overview",
          "Implementing a mini-GPT from scratch",
        ],
      },
      {
        title: "LLMs & Fine-Tuning",
        topics: [
          "Hugging Face Transformers and Datasets",
          "Supervised fine-tuning (SFT)",
          "Parameter-efficient fine-tuning: LoRA, QLoRA, PEFT",
          "Instruction tuning and RLHF overview",
          "Evaluating LLMs: ROUGE, BLEU, perplexity",
        ],
      },
      {
        title: "RAG & AI Agents",
        topics: [
          "Embeddings and vector databases (Pinecone, Chroma)",
          "Building a RAG pipeline with LangChain",
          "AI agents with tool use (function calling)",
          "Memory: short-term, long-term, episodic",
          "Multi-agent frameworks overview",
        ],
      },
      {
        title: "Generative Models",
        topics: [
          "Variational Autoencoders (VAEs)",
          "Diffusion models: DDPM and DDIM",
          "Stable Diffusion architecture",
          "Image editing with InstructPix2Pix",
          "Text-to-video overview",
        ],
      },
      {
        title: "Production & Responsible AI",
        topics: [
          "Model quantization and ONNX export",
          "Serving LLMs with vLLM and TGI",
          "Prompt injection and safety red-teaming",
          "Bias, fairness, and model cards",
          "Cost optimization for AI workloads",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Web Development Bootcamp",
    description: "A complete beginner-friendly path covering HTML, CSS, JavaScript, and basic React.",
    category: "Web Dev",
    level: "Beginner",
    duration: "14 weeks",
    lessons: 150,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=380&fit=crop&auto=format",
    tags: ["HTML", "CSS", "JavaScript", "React Basics"],
    instructor: "vikas",
    whatYouLearn: [
      "Write semantic HTML5 and build well-structured web pages",
      "Style websites with CSS — flexbox, grid, animations, responsive design",
      "Program interactivity with JavaScript from the ground up",
      "Understand the DOM and browser events",
      "Fetch data from APIs and display it dynamically",
      "Get started with React — components, props, and state",
      "Version control your projects with Git and GitHub",
      "Deploy your first website to the web",
    ],
    prerequisites: [
      "No programming experience required",
      "A laptop with a modern browser (Chrome/Firefox)",
      "Enthusiasm to learn and build",
    ],
    forWhom: [
      "Complete beginners with zero coding experience",
      "Students exploring web development as a career",
      "Non-technical professionals who want to build websites",
      "Anyone who wants to launch their own web presence",
    ],
    curriculum: [
      {
        title: "HTML5 Fundamentals",
        topics: [
          "Document structure and semantic elements",
          "Headings, paragraphs, lists, and links",
          "Images, videos, and media",
          "HTML forms and inputs",
          "Accessibility basics and ARIA roles",
        ],
      },
      {
        title: "CSS Styling & Layout",
        topics: [
          "Selectors, specificity, and the cascade",
          "Box model, margin, padding, borders",
          "Flexbox layouts — rows and columns",
          "CSS Grid — two-dimensional layouts",
          "Transitions, animations, and hover effects",
          "Responsive design and media queries",
        ],
      },
      {
        title: "JavaScript Fundamentals",
        topics: [
          "Variables, data types, and operators",
          "Functions, scope, and closures",
          "Arrays and objects",
          "Control flow: loops and conditionals",
          "ES6+: arrow functions, template literals, destructuring",
        ],
      },
      {
        title: "DOM & Browser APIs",
        topics: [
          "Selecting and manipulating DOM elements",
          "Event listeners and the event object",
          "Form handling and validation",
          "Local Storage and Session Storage",
          "fetch API and working with JSON",
        ],
      },
      {
        title: "Introduction to React",
        topics: [
          "Why React? Components and the virtual DOM",
          "JSX syntax and rendering elements",
          "Props and state with useState",
          "Handling events in React",
          "Building a mini project: Todo App",
        ],
      },
      {
        title: "Tools, Git & Deployment",
        topics: [
          "VS Code setup and essential extensions",
          "Git basics: init, add, commit, push",
          "GitHub repository and collaboration",
          "Deploying with Netlify / Vercel",
          "Final project: Personal portfolio website",
        ],
      },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "SDE-2 at Amazon",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Intel AI's DSA course helped me crack my Amazon interview in just 3 months. The structured approach and practice problems are unmatched.",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Software Engineer at Google",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "The System Design course gave me the confidence to answer even the toughest architecture questions. Got my dream job at Google!",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Full Stack Developer at Razorpay",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "Enrolled in the 1-Year Mastery Program and it completely transformed my career. The mentors are incredible and the content is top-notch.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "ML Engineer at Microsoft",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The AI/ML track is world-class. Went from a complete beginner to building production-grade models in under a year.",
  },
];

export const learningPaths = [
  {
    id: 1,
    title: "Interview Cracker",
    description: "DSA + System Design track curated for top-tier tech interviews",
    icon: "🎯",
    weeks: 28,
    courses: 4,
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    description: "Complete path from web basics to deploying production apps",
    icon: "🚀",
    weeks: 32,
    courses: 5,
    color: "from-purple-600 to-pink-500",
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    description: "End-to-end AI track from ML basics to building LLMs",
    icon: "🤖",
    weeks: 24,
    courses: 3,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "1-Year Mastery",
    description: "DSA + System Design + Full Stack + AI — all in one power year",
    icon: "⚡",
    weeks: 52,
    courses: 9,
    color: "from-brand to-cyan",
  },
];
