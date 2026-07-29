"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";

const MSG_LIMIT = 10;
const STORAGE_KEY = "intel_ai_msg_count";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const quickQuestions = [
  "What courses do you offer?",
  "Tell me about the 1-Year Program",
  "Who are the founders?",
  "What is covered in DSA?",
];

function getResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // ── Helper flags ──────────────────────────────────────────────────────────
  const isExperienced = /\b(experienced?|senior|expert|professional|working|employee|years? of exp|mid.?level|already (know|know|work)|advanced (person|engineer|dev)|not a beginner|not new)\b/.test(q);
  const isBeginner    = /\b(beginner|fresher|newbie|new to|zero (exp|knowledge|coding)|never coded|starting|just started|school|college|student|no (exp|background)|absolute(ly)? new)\b/.test(q);
  const isInterview   = /\b(interview|faang|crack|placement|job|hired|google|amazon|microsoft|tier.?1|product.based)\b/.test(q);
  const wantsRec      = /\b(recommend|suggest|which (course|one)|what should (i|we)|best for|right for|good for|suitable|what do you (suggest|recommend)|where (do i|should i) start|guide me|help me choose|not sure)\b/.test(q);
  const hasTopic      = (kw: string[]) => kw.some(k => q.includes(k));

  // ── 1. Pure short greetings only (not "hey what courses…") ───────────────
  if (/^(hi|hello|hey|hii|howdy|sup|yo|hola)[\s!.?]*$/.test(q)) {
    return "Hey there! 👋 I'm the Intel AI assistant. I can help you find the right course, answer questions about our programs, founders, or pricing — just ask!\n\nFor example, try:\n• \"What courses do you have for experienced engineers?\"\n• \"I'm a fresher — where should I start?\"\n• \"What's covered in the 1-Year Program?\"";
  }

  // ── 2. Greetings followed by a question (extract the question intent) ────
  const strippedGreeting = q.replace(/^(hi|hello|hey|hii|howdy|sup|yo),?\s*/i, "").trim();
  const qEffective = strippedGreeting || q;

  // ── 3. Experience-level + recommendation intent ───────────────────────────
  // Experienced users asking about courses
  if (isExperienced && (hasTopic(["course","offer","teach","learn","option","what do","what can","program","which"]) || wantsRec)) {
    return "Great — here are our top picks for experienced engineers:\n\n📗 Advanced DSA & Interview Prep (16 weeks, Advanced)\nDP, Graph Algorithms, Tries, Segment Trees, Competitive Programming. Built to crack FAANG-level interviews. Start here if your fundamentals need sharpening.\n\n🏛️ Advanced System Design (14 weeks, Advanced)\nDistributed Systems, CAP Theorem, Kafka, Database Sharding — designing systems at the scale of Twitter, Netflix & Uber. Essential for senior/staff roles.\n\n🧠 Deep Learning & Generative AI (16 weeks, Advanced)\nPyTorch, Transformers, LLMs, Diffusion Models. If AI is your next frontier, this is it.\n\n⚡ 1-Year Mastery Program (52 weeks)\nAll advanced tracks combined — DSA + System Design + Full Stack + AI. Most complete option for a comprehensive skill upgrade.\n\nWhich area matters most right now — interview prep, system design, or AI/ML?";
  }

  // Beginners / freshers asking about courses
  if (isBeginner && (hasTopic(["course","offer","teach","learn","option","program","which","start","where"]) || wantsRec)) {
    return "Welcome! Here's the best starting path for beginners:\n\n💻 Web Dev Bootcamp (14 weeks, Beginner)\nHTML, CSS, JavaScript, intro to React. Zero coding experience needed. Build real websites by week 4.\n\n📘 DSA Fundamentals (12 weeks, Beginner)\nArrays, Linked Lists, Sorting, Trees, Graphs — the foundation for every software engineering role.\n\n🤖 Intro to AI & Machine Learning (8 weeks, Beginner)\nPython, regression, classification, neural network basics — no ML background required.\n\nMost freshers start with Web Dev Bootcamp → DSA Fundamentals. In 6 months you'll be interview-ready.\n\nWant the full 1-Year Mastery Program that covers everything in sequence? I can tell you more about that too.";
  }

  // Interview prep focus
  if (isInterview && (hasTopic(["course","which","what","recommend","suggest","help","prepare","ready"]) || wantsRec)) {
    return "For cracking interviews at top companies, here's exactly what to focus on:\n\n🎯 Interview Cracker Path (28 weeks) — our most popular combination:\n  ↳ Advanced DSA & Interview Prep (16 weeks) — DP, Graphs, Tries, Competitive Programming\n  ↳ System Design Fundamentals or Advanced (10–14 weeks) — depending on your target role\n\nIf you're targeting FAANG or Tier-1 product companies, you'll need both strong DSA AND system design.\n\nFor mid-level/senior roles: go straight to Advanced DSA + Advanced System Design.\nFor fresher/junior roles: start with DSA Fundamentals, then move to the advanced version.\n\nWant a personalised recommendation? Tell us your current role and target company — reach out at vikz2708@gmail.com or WhatsApp +91 98713 58616.";
  }

  // Generic recommendation intent (no specific level detected)
  if (wantsRec && hasTopic(["course","program","learn","study","enroll","join","start"])) {
    return "Happy to help you find the right course! To give you the best recommendation, could you tell me:\n\n1. Are you a fresher/student, or do you have work experience?\n2. What's your goal — cracking interviews, switching domains, or upskilling?\n3. Any specific area of interest — DSA, System Design, Full Stack, or AI/ML?\n\nIn the meantime, here's a quick guide:\n• Fresher → Web Dev Bootcamp or DSA Fundamentals\n• Experienced (interview prep) → Advanced DSA + System Design\n• Experienced (AI interest) → Deep Learning & Gen AI\n• Want everything → 1-Year Mastery Program\n\nOr just tell me your situation and I'll point you in the right direction!";
  }

  // ── 4. Fee / pricing ─────────────────────────────────────────────────────
  if (hasTopic(["fee","price","cost","pricing","how much","payment","emi","installment"])) {
    return "We don't list fees publicly because pricing is personalised — it depends on your background, which course(s) you choose, and your payment preferences (one-time vs EMI).\n\nTo get your exact quote:\n📞 WhatsApp: +91 98713 58616\n📧 vikz2708@gmail.com\n\nOr click 'Talk to an Advisor' in the 1-Year Program section — we usually respond within a few hours.";
  }

  // ── 5. Topic-specific responses ──────────────────────────────────────────
  const eff = qEffective;

  if (eff.includes("dsa") || eff.includes("data structure") || eff.includes("algorithm") || eff.includes("competitive")) {
    if (isExperienced || isInterview) {
      return "For experienced engineers, I'd go straight to:\n\n📗 Advanced DSA & Interview Prep (16 weeks, 200 lessons)\nCovers: Dynamic Programming, Graph Algorithms (BFS/DFS/Dijkstra), Tries, Segment Trees, Fenwick Trees, Competitive Programming patterns.\n\nThis is specifically designed to crack FAANG-level interviews. Our founders Vikas & Jitender built this curriculum from their 5+ years of teaching at Pepcoding and Scaler.";
    }
    return "We offer two DSA courses:\n\n📘 DSA Fundamentals (Beginner, 12 weeks, 120 lessons)\nArrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting & Searching. Perfect from scratch.\n\n📗 Advanced DSA & Interview Prep (Advanced, 16 weeks, 200 lessons)\nDP, Graph Algorithms, Tries, Segment Trees, Competitive Programming. Designed for FAANG-level interviews.\n\nNot sure which? Tell me your current level and I'll pick one for you.";
  }

  if (eff.includes("system design") || eff.includes("distributed") || eff.includes("scalab") || eff.includes("architecture") || eff.includes("microservice")) {
    if (isExperienced) {
      return "For experienced engineers, I'd recommend going directly to:\n\n🏛️ Advanced System Design (14 weeks, 160 lessons)\nDistributed Systems, CAP Theorem, Kafka, Database Sharding, Consistent Hashing — you'll design systems like Twitter, Netflix & Uber. This is the go-to course for senior/staff engineering interviews.";
    }
    return "We have two System Design courses:\n\n🏗️ System Design Fundamentals (Intermediate, 10 weeks, 85 lessons)\nLoad Balancing, Caching, Databases, REST APIs, Microservices basics.\n\n🏛️ Advanced System Design (Advanced, 14 weeks, 160 lessons)\nDistributed Systems, CAP Theorem, Kafka, Database Sharding, designing Twitter/Netflix/Uber-scale systems.\n\nIf you have 2+ years of engineering experience, go straight to Advanced.";
  }

  if (eff.includes("full stack") || eff.includes("fullstack") || eff.includes("react") || eff.includes("node") || (eff.includes("next") && !eff.includes("next step"))) {
    return "Our Full Stack options:\n\n🌐 Full Stack Development (Intermediate, 20 weeks, 240 lessons)\nReact, Node.js, PostgreSQL, REST APIs, Docker, cloud deployment. Build and ship production apps.\n\n⚡ React & Next.js Mastery (Intermediate, 12 weeks, 140 lessons)\nReact 19, Next.js 15, TypeScript, Tailwind CSS. Focused on modern frontend engineering.\n\nIf you want backend + frontend together → Full Stack Dev. If you know backend and want to master React/Next.js → take the second course.";
  }

  if (eff.includes("web dev") || eff.includes("webdev") || eff.includes("html") || eff.includes("css")) {
    return "💻 Web Dev Bootcamp (Beginner, 14 weeks, 150 lessons)\n\nHTML5, CSS3, JavaScript (ES6+), intro to React. Zero coding experience needed. You'll build responsive websites and understand how the web works.\n\nPerfect as a first course before moving to DSA or Full Stack Development.";
  }

  if (eff.includes("javascript") && !eff.includes("node")) {
    return "JavaScript is core to two of our courses:\n\n💻 Web Dev Bootcamp — covers modern JavaScript (ES6+) from scratch.\n⚡ React & Next.js Mastery — advanced JavaScript with React 19 & Next.js 15.\n🌐 Full Stack Development — JavaScript across the entire stack (frontend + Node.js backend).\n\nAre you completely new to JS, or looking to go deeper with frameworks?";
  }

  if (eff.includes("ai") || eff.includes("machine learning") || eff.includes("deep learning") || eff.includes("llm") || eff.includes("ml") || eff.includes("neural") || eff.includes("generative") || eff.includes("gpt") || eff.includes("python")) {
    if (isExperienced) {
      return "For someone with experience, I'd recommend:\n\n🧠 Deep Learning & Generative AI (Advanced, 16 weeks, 190 lessons)\nPyTorch, Transformers, LLMs, Diffusion Models, building AI agents. This is currently our most in-demand course given the AI boom. You'll go from understanding how GPT works to building your own AI pipelines.";
    }
    return "Our AI/ML courses:\n\n🤖 Intro to AI & Machine Learning (Beginner, 8 weeks, 90 lessons)\nPython for ML, regression, classification, neural network basics, scikit-learn. No prior ML knowledge needed.\n\n🧠 Deep Learning & Generative AI (Advanced, 16 weeks, 190 lessons)\nPyTorch, Transformers, LLMs, Diffusion Models, AI agents. Our most popular course right now.\n\nIf you can write basic Python, you can start with the beginner course and move up. If you're already technical, go straight to Deep Learning.";
  }

  if (eff.includes("1 year") || eff.includes("one year") || eff.includes("year program") || eff.includes("mastery") || eff.includes("flagship") || eff.includes("everything") || eff.includes("all course")) {
    return "Our 1-Year Mastery Program is our flagship — covers everything in one structured path.\n\n📅 Duration: 12 months (52 weeks)\n\n🔖 What's covered:\n• Basic → Advanced DSA\n• System Design (Fundamentals + Advanced)\n• Full Stack Development + Next.js Mastery\n• Intro to AI → Deep Learning & Generative AI\n\n✅ What's included:\n• 1-on-1 mentorship sessions\n• Live doubt-clearing classes\n• Mock interviews with industry experts\n• Placement assistance\n• Lifetime access\n• Industry-recognised certificate\n\nBest for: anyone who wants a complete transformation — fresher to senior or career switcher.\n\nFee is personalised. Reach out: vikz2708@gmail.com | WhatsApp +91 98713 58616";
  }

  if (eff.includes("learning path") || eff.includes("roadmap") || (eff.includes("path") && !eff.includes("xpath"))) {
    return "We have 4 curated Learning Paths:\n\n🎯 Interview Cracker (28 weeks)\nAdvanced DSA + System Design. Built for FAANG-level prep.\n→ Best for: experienced engineers targeting top-tier companies.\n\n🚀 Full Stack Engineer (32 weeks)\nWeb Dev → React/Next.js → Full Stack. Deploy production apps.\n→ Best for: anyone who wants to build and ship products.\n\n🤖 AI/ML Engineer (24 weeks)\nML basics → Deep Learning → LLMs & AI agents.\n→ Best for: engineers wanting to enter the AI space.\n\n⚡ 1-Year Mastery (52 weeks)\nAll 4 tracks combined. Most popular for complete upskilling.";
  }

  // ── 6. People / founders ─────────────────────────────────────────────────
  if (eff.includes("vikas") || (eff.includes("ceo") && !eff.includes("cto"))) {
    return "Vikas Jakhar — Co-Founder & CEO of Intel AI.\n\n👨‍💻 Engineering Lead at TATA AIG General Insurance\nPrev: Tech Lead at Xarterian | SDE-2 at MediBuddy\n\n🎓 5+ years teaching DSA & Competitive Programming at Pepcoding and Scaler\n\n📚 B.Tech (Information Technology), USICT, New Delhi\n\nHis teaching approach: build real understanding, not just pattern memorisation.";
  }

  if (eff.includes("jitender") || eff.includes("punia") || (eff.includes("cto") && !eff.includes("ceo"))) {
    return "Jitender Singh Punia — Co-Founder & CTO of Intel AI.\n\n👨‍💻 Full-stack architect with deep expertise in distributed systems & AI/ML infrastructure\n\n🎓 5+ years teaching at Scaler & Pepcoding — mentored hundreds of engineers through DSA, System Design & Full Stack\n\nHis vision: curriculum that reflects real-world engineering, not just interview tricks.";
  }

  if (eff.includes("founder") || eff.includes("who built") || eff.includes("who created") || eff.includes("about intel ai") || eff.includes("who made")) {
    return "Intel AI was founded by two engineers who've both built production systems AND taught thousands of students:\n\n👤 Vikas Jakhar (CEO) — Engineering Lead at TATA AIG, ex-Tech Lead at Xarterian, ex-SDE-2 at MediBuddy. 5+ years teaching at Pepcoding & Scaler.\n\n👤 Jitender Singh Punia (CTO) — Full-stack architect, educator at Scaler & Pepcoding for 5+ years.\n\nBoth have been on both sides — building real systems at companies AND teaching engineers to get there. That's what makes Intel AI different.";
  }

  if (eff.includes("teaching") || (eff.includes("experience") && !hasTopic(["course","learn","offer","what","which"])) || eff.includes("scaler") || eff.includes("pepcoding")) {
    return "Our founders bring 5+ years of hands-on teaching experience at Scaler and Pepcoding.\n\nVikas built the Competitive Programming curriculum at Pepcoding — covering Segment Trees, Fenwick Trees, Network Flow, Number Theory.\n\nJitender has mentored hundreds of engineers through System Design and Full Stack at Scaler.\n\nThis isn't a content-dump platform. Every lesson is structured for real comprehension.";
  }

  // ── 7. Other intents ─────────────────────────────────────────────────────
  if (hasTopic(["placement","job","hired","recruit","company","google","amazon","microsoft","salary","package","lpa","ctc"])) {
    return "Our students have landed roles at Google, Amazon, Microsoft, Flipkart, Razorpay, Walmart, and more.\n\nThe 1-Year Mastery Program includes dedicated placement support:\n• Resume reviews\n• Mock technical interviews (DSA + System Design)\n• Referral network support\n• LinkedIn profile optimisation\n\n1,000+ learners placed and growing. Want to know more about placement stats? Reach out at vikz2708@gmail.com.";
  }

  if (hasTopic(["certificate","certification","credential","recognised","recognition"])) {
    return "Every completed course comes with an industry-recognised Intel AI certificate.\n\nThe 1-Year Mastery Program certificate carries the most weight — it signals mastery across all four pillars that hiring managers care about: DSA, System Design, Full Stack, and AI.\n\nCertificates are shareable on LinkedIn directly.";
  }

  if (hasTopic(["practice","ide","problem","leetcode","coding challenge","arena"])) {
    return "Yes! We have a built-in DSA Practice Arena with 30 problems across all major topics:\nArrays, Stack, Linked List, Binary Search, Sliding Window, Graphs, Dynamic Programming, Backtracking, and more.\n\nEach problem has:\n• Full description + examples\n• Multi-language editor (JavaScript, Python, Java, C++)\n• Real code execution (Run & Submit)\n• Runtime distribution and performance metrics after submission\n\nVisit /practice to try it — it's free, no sign-in required to run code.";
  }

  if (hasTopic(["duration","how long","weeks","months","time to complete","finish"])) {
    return "Course durations:\n\n• Web Dev Bootcamp — 14 weeks\n• DSA Fundamentals — 12 weeks\n• Intro to AI/ML — 8 weeks\n• System Design Fundamentals — 10 weeks\n• React & Next.js — 12 weeks\n• Full Stack Dev — 20 weeks\n• Advanced DSA — 16 weeks\n• Advanced System Design — 14 weeks\n• Deep Learning & Gen AI — 16 weeks\n• 1-Year Mastery — 52 weeks\n\nAll courses include lifetime access — study at your own pace.";
  }

  if (hasTopic(["student","learner","community","how many","enrolled","batch","size"])) {
    return "We have 1,000+ learners enrolled across our courses and learning paths. We intentionally keep batches small so every student gets real attention from instructors — not a 500-person lecture hall. Quality over scale.";
  }

  if (hasTopic(["contact","reach","email","support","advisor","call","phone","whatsapp","talk","connect","number"])) {
    return "Reach us directly — we're responsive:\n\n📧 vikz2708@gmail.com\n📞 +91 98713 58616\n💬 WhatsApp: +91 98713 58616 (fastest response)\n\nOr click 'Talk to an Advisor' anywhere on the site — it opens a pre-filled WhatsApp message. We typically reply within a few hours.";
  }

  if (hasTopic(["refund","guarantee","money back","trial","cancel","risk"])) {
    return "We offer a 7-day trial period. If you're not satisfied within the first week, we'll either find you the right course or issue a full refund — no questions asked.\n\nReach out: vikz2708@gmail.com | WhatsApp +91 98713 58616";
  }

  if (hasTopic(["emi","installment","payment plan","pay monthly","loan","finance"])) {
    return "Yes, we offer flexible payment options including EMI/instalments for most courses. The exact breakdown depends on the course and duration.\n\nContact us to discuss payment plans:\n📞 WhatsApp: +91 98713 58616\n📧 vikz2708@gmail.com";
  }

  // ── 8. Generic course listing (no level detected) ────────────────────────
  if (hasTopic(["course","offer","what do you","what can i","teach","learn","program","enroll","join"])) {
    return "Here's our full course catalog — tell me your level and I'll narrow it down:\n\n🟢 Beginner\n  💻 Web Dev Bootcamp — 14 wks\n  📘 DSA Fundamentals — 12 wks\n  🤖 Intro to AI & ML — 8 wks\n\n🟡 Intermediate\n  🌐 Full Stack Development — 20 wks\n  ⚡ React & Next.js Mastery — 12 wks\n  🏗️ System Design Fundamentals — 10 wks\n\n🔴 Advanced\n  📗 Advanced DSA & Interview Prep — 16 wks\n  🏛️ Advanced System Design — 14 wks\n  🧠 Deep Learning & Gen AI — 16 wks\n\n⚡ Complete Package\n  1-Year Mastery Program — 52 wks (all of the above)\n\nAre you a fresher, mid-level, or experienced engineer?";
  }

  // ── 9. Engineering & EdTech topics — always helpful, never a dead end ────

  if (hasTopic(["devops","docker","kubernetes","k8s","ci/cd","jenkins","github action","pipeline","helm","terraform","ansible","aws","azure","gcp","cloud","serverless","ec2","lambda","infrastructure"])) {
    return "Great area! We cover Docker and cloud deployment in our Full Stack Development course (20 weeks) — you'll deploy real apps to production.\n\nWe don't have a standalone DevOps/Cloud course yet, but it's on our roadmap. In the meantime:\n• Full Stack Dev → Docker + deployment foundations\n• Advanced System Design → cloud-scale architecture (load balancing, CDNs, distributed systems)\n\nFor a personalised DevOps learning plan, reach out — our instructors can guide you:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["cybersecurity","cyber security","ethical hack","penetration","pentest","hacking","security engineer","infosec","owasp","ctf","network security","vulnerability","malware","cryptography"])) {
    return "Cybersecurity is a fantastic field! We don't have a dedicated course yet, but our curriculum builds strong foundations:\n\n• Advanced System Design → secure architecture, rate limiting, auth flows, how large systems protect themselves\n• Full Stack Dev → secure coding, API security, authentication best practices\n\nA dedicated ethical hacking track is on our consideration list — drop us a message and we'll keep you posted:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["mobile","android","ios","flutter","react native","swift","kotlin","app development","mobile app","play store","app store"])) {
    return "Mobile dev is a great path! Here's how Intel AI sets you up:\n\n⚡ React & Next.js Mastery → deep React knowledge, which transfers directly to React Native (most popular cross-platform framework)\n🌐 Full Stack Development → the backend APIs every mobile app depends on\n\nOnce you're strong in React, picking up React Native for iOS + Android takes 4–6 weeks.\n\nWe're evaluating a dedicated Flutter/React Native module — let us know if that interests you:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["data science","data engineer","data analyst","pandas","numpy","spark","hadoop","etl","data warehouse","snowflake","analytics","statistics","probability","data pipeline"])) {
    return "Data engineering is one of the hottest tracks right now! Here's what we offer:\n\n🤖 Intro to AI & ML → Python, pandas, numpy, statistics, scikit-learn — the core data science toolkit\n🧠 Deep Learning & Gen AI → data at scale, ML pipelines and engineering\n🏛️ Advanced System Design → Kafka, distributed storage, data pipeline architecture\n\nWe don't have a standalone Data Science/BI course yet. Tell us your specific role target (Data Scientist, Data Engineer, Analyst?) and we'll map the right courses:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["blockchain","web3","smart contract","solidity","ethereum","nft","defi","crypto","cryptocurrency","decentralized","dapp","polygon","solana"])) {
    return "Web3 is exciting! We don't have a dedicated blockchain course right now, but here's the strongest foundation:\n\n🌐 Full Stack Development → JavaScript mastery is essential (most Web3 tooling like ethers.js is JS-based)\n🏛️ Advanced System Design → teaches distributed consensus — the core idea behind blockchains\n\nWith strong Full Stack skills, you can learn Solidity and Web3 in 4–6 weeks via open-source resources.\n\nInterested in a dedicated Web3 track? Tell us — it shapes what we build next:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["game dev","game development","unity","unreal","godot","gaming","game engine","2d game","3d game"])) {
    return "Game development is fascinating! We don't have a game-engine-specific course, but our skills transfer directly:\n\n📗 Advanced DSA → pathfinding, physics simulation, NPC AI all rely heavily on algorithms\n🌐 Full Stack Dev → web-based and multiplayer game backends\n🧠 Deep Learning → game AI using reinforcement learning is a growing field\n\nIf you want strong engineering foundations that make a great game developer, DSA + System Design is the right starting point. For Unity/Unreal specifically, pair that with dedicated engine resources.\n\nFeel free to reach out for a personalised path:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["competitive programming","codeforces","codechef","atcoder","icpc","olympiad","topcoder","segment tree","fenwick","network flow","number theory"])) {
    return "Competitive Programming is directly in our curriculum!\n\n📗 Advanced DSA & Interview Prep (16 weeks) covers:\n• Segment Trees & Fenwick Trees\n• Network Flow algorithms\n• Number Theory (GCD, Sieve, modular arithmetic)\n• Advanced Graph algorithms\n• DP patterns used in CP contests\n\nOur co-founder Vikas Jakhar personally designed the CP curriculum at Pepcoding. You can also practice right now on our Arena (/practice) with 30 problems from Easy to Hard.\n\nReady to enrol? 📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["operating system","os concept","process","thread","deadlock","memory management","virtual memory","computer network","networking","tcp","udp","http","https","dns","osi","socket","cs fundamental"])) {
    return "CS fundamentals are what separate strong engineers from the rest. Here's how we cover them:\n\n🏗️ System Design Fundamentals → networking (HTTP, DNS, CDNs, load balancers), database internals, caching, concurrency\n🏛️ Advanced System Design → distributed consensus, network protocols at scale, storage architecture\n\nWe weave OS and networking into System Design because that's how they're actually applied in real systems and interviews.\n\nFor standalone OS/Networks for GATE prep — that's not our focus. We're oriented toward industry and interview readiness.\n\nQuestions? 📞 +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["python","django","flask","fastapi"]) && !hasTopic(["machine learning","ml","ai","deep learning","data"])) {
    return "Python is used across multiple Intel AI courses:\n\n🤖 Intro to AI & ML → primary language (pandas, numpy, scikit-learn)\n🧠 Deep Learning & Gen AI → PyTorch, building ML pipelines\n📗 Advanced DSA → Python is one of 4 supported languages in our Practice Arena\n\nFor Django/Flask/FastAPI specifically — our Full Stack Dev uses Node.js/Express, but the REST API and database concepts transfer directly to any Python web framework.\n\nPython backend your specific goal? Reach out:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["java","spring boot","spring framework","hibernate","maven","gradle","enterprise java"])) {
    return "Java is one of the 4 supported languages in our Practice Arena and DSA courses — you'll write and run Java solutions across 30 problems.\n\nFor enterprise Java (Spring Boot, microservices, JPA) — our Advanced System Design covers the architecture (microservices, APIs, distributed systems) that applies regardless of language.\n\nA standalone Spring Boot course isn't in our current catalog, but DSA + System Design gives you everything to ace Java-heavy interviews at product companies.\n\nNeed specific Java guidance? 📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["golang","go lang","rust lang"," rust ","kotlin","scala","swift lang","dart lang"])) {
    return "Great language choice! Our perspective:\n\n• C++ and Java → directly supported in DSA courses and Practice Arena\n• TypeScript → used in Full Stack and React/Next.js courses\n• Go, Rust, Kotlin, Swift → not primary languages yet, but DSA and System Design fundamentals are language-agnostic\n\nThe best engineers are strong in fundamentals first, language-specific second. Our Advanced DSA + System Design track builds that foundation — then picking up Go/Rust/Kotlin takes weeks, not months.\n\nReach out for language-specific guidance alongside our courses:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["salary","ctc","compensation","package","lpa","per annum","hike","raise","negotiate","offer letter"])) {
    return "Here's an honest picture for Indian tech roles (2024–25):\n\nFresher (0–1 yr):\n• Service companies (TCS, Infosys): ₹3–6 LPA\n• Mid-tier product companies: ₹8–15 LPA\n• FAANG / top startups: ₹20–40 LPA\n\nExperienced (3–5 yrs):\n• Strong DSA + System Design: ₹25–60 LPA at product companies\n• FAANG-level: ₹50 L – 1.5 Cr\n\nThe gap between service and product pay is almost entirely explained by DSA + System Design skills — which our Advanced courses target directly.\n\nWant a plan to make that jump? 📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["resume","cv","portfolio","linkedin profile","github profile","cover letter","ats","applicant tracking"])) {
    return "Resume and portfolio prep is part of our placement support in the 1-Year Mastery Program:\n\n✅ Resume reviews by experienced engineers\n✅ LinkedIn profile optimisation\n✅ GitHub portfolio guidance (what projects to build and showcase)\n✅ ATS-friendly structuring\n\nWhat actually makes a resume stand out:\n• Strong DSA history (LeetCode / our Practice Arena)\n• 2–3 real deployed projects (our Full Stack course delivers this)\n• System design confidence you can articulate in interviews\n\nWant resume help? 📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["mock interview","interview strategy","how to prepare","interview tips","behavioral","hr round","online assessment","oa ","coding round","system design interview"])) {
    return "Here's a complete interview prep strategy:\n\nRound 1 — Online Assessment / Coding:\n→ Advanced DSA & Interview Prep (covers exactly the patterns tested)\n\nRound 2 — Technical DSA:\n→ Practice on our Arena (/practice) — 30 problems, Easy to Hard\n→ Focus: DP, Graphs, Binary Search, Sliding Window\n\nRound 3 — System Design:\n→ Advanced System Design course + practice designing systems out loud\n\nRound 4 — Behavioral / HR:\n→ The 1-Year Program includes mock behavioral interviews with industry experts\n\nFor FAANG specifically: weak system design is what eliminates most experienced candidates.\n\nWant a personalised prep plan? Tell us your target company:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["scaler","coding ninja","coding ninjas","geeksforgeeks","gfg","udemy","coursera","algoexpert","interviewbit","pwskills","pw skills","vs intel","compare","better than","other platform","vs other"])) {
    return "Fair question! Here's what makes Intel AI different:\n\nInstructor quality: Our founders have 5+ years teaching at Scaler & Pepcoding AND real industry experience at TATA AIG, MediBuddy, Xarterian. You get both teaching depth and real-world perspective.\n\nPersonalised attention: Small cohorts — you're not lost in a batch of 500.\n\nBuilt-in Practice Arena: 30 DSA problems with real code execution, no separate platform.\n\nCurriculum design: Built around what actually gets you hired, not just what sounds impressive.\n\nPricing: Personalised, not one-size-fits-all.\n\nThe best platform is the one you complete and that lands you the role. Happy to discuss what makes us the right fit for your specific situation:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["freelanc","upwork","fiverr","toptal","startup","own business","build a product","side project","indie","solopreneur"])) {
    return "Building something of your own is exciting — engineering skills are the best foundation.\n\nHow Intel AI helps:\n\n🌐 Full Stack Development → build and deploy your own product end-to-end. Most indie founders use exactly this stack.\n⚡ React & Next.js → fastest way to build polished web products\n🤖 AI/ML → if you want to build AI-powered products\n🏛️ System Design → critical once your startup scales past the MVP\n\nFor freelancing: Full Stack Dev + a portfolio of deployed projects is the most direct path to landing clients.\n\nHave a specific product idea? Tell us what you're building:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["career switch","career change","career transition","change domain","switch to tech","non-tech","not from cs","different field","mba into tech","arts background"])) {
    return "Career switching into tech is completely achievable — it's one of the most common paths our learners take.\n\nRealistic roadmap:\n\nStep 1 — Foundation (2–3 months):\n💻 Web Dev Bootcamp → HTML, CSS, JavaScript, React. No CS background needed.\n\nStep 2 — Core skills (3–4 months):\n📘 DSA Fundamentals → the language of every technical interview\n\nStep 3 — Specialise (3–6 months):\nFull Stack, AI/ML, or System Design based on your interest\n\nOr go all-in: our 1-Year Mastery Program is built for complete transformations — from day 1 to placement-ready.\n\nTell us where you're coming from and we'll build your personalised roadmap:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["internship","intern","summer intern","industrial training","campus placement","college placement","fresher placement","final year"])) {
    return "Internship and campus placement prep — here's the playbook:\n\nFor on-campus (any company):\n📘 DSA Fundamentals → all campus rounds test this\n\nFor off-campus / product company internships:\n📗 Advanced DSA → FAANG and top startups test advanced DSA even for interns\n\nFor PPO / full-time conversion:\n🌐 Full Stack Dev → practical project skills = stronger PPO chances\n\nIf you're 6–12 months from placement season, DSA Fundamentals → Advanced DSA is the most direct route.\n\nTell us your college, year, and target companies — we'll build a timeline:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["ui/ux","ux design","ui design","figma","product design","wireframe","user research","design system"])) {
    return "UI/UX is a great complement to engineering! Our courses are engineering-focused, but here's the overlap:\n\n⚡ React & Next.js Mastery → heavy on UI component design, responsive layouts, Tailwind CSS — great for frontend engineers working closely with designers\n🌐 Full Stack Dev → implementation side of design systems\n\nFor pure UX research, Figma prototyping, or product design strategy — that's outside our current scope.\n\nIf you're a designer who wants to code (or an engineer who wants to design better), reach out and we'll suggest the right starting point:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["database","sql","mysql","postgresql","mongodb","nosql","redis","elasticsearch","query optim","indexing","normalization","database design"])) {
    return "Databases are covered across our curriculum:\n\n🏗️ System Design Fundamentals → SQL vs NoSQL, indexing, query optimisation, replication, sharding\n🏛️ Advanced System Design → database at scale — Cassandra, Redis, Elasticsearch, CAP theorem\n🌐 Full Stack Development → PostgreSQL with Prisma ORM, real schema design for production apps\n\nFor SQL interview prep, our System Design track covers exactly what comes up in data-heavy engineering interviews.\n\nWant a focused DB/SQL track? Tell us your use case:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["how to study","study tips","learning strategy","how to learn","retention","spaced repetition","pomodoro","study plan","daily routine","consistency"])) {
    return "Here's what actually works for engineering learning:\n\n📌 Consistency beats intensity — 2 hours daily > 14 hours on weekends\n📌 Active recall — solve problems without looking at solutions first\n📌 Spaced repetition — revisit DSA topics every 3–5 days\n📌 Build, don't just watch — every Intel AI course has hands-on components\n📌 Track progress — our dashboard shows your submissions and improvement\n\nOur courses are structured with this in mind — each week builds on the last, with embedded practice.\n\nWant a study plan tailored to your schedule? Tell us your available hours per week:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["open source","contribute","pull request","hacktoberfest","gsoc","google summer of code","oss"])) {
    return "Open source contribution is one of the best ways to build credibility!\n\nHow Intel AI supports this:\n• Full Stack Dev → you ship real deployable projects you can open-source\n• DSA courses → all practice done in a real IDE environment\n• React/Next.js → build components you can contribute to OSS projects\n\nStrong DSA + Full Stack skills make you immediately useful to open source projects.\n\nFor GSOC / internship strategy specifically, our instructors can point you to the right projects to target:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  if (hasTopic(["product manager","product management"," pm ","product thinking","agile","scrum","jira","roadmap","stakeholder","product role"])) {
    return "Intel AI is an engineering education platform, so PM-specific skills (roadmapping, agile, Jira) aren't in our curriculum. But here's where we add real value for technical PMs:\n\nMany PM roles at top companies (Google APM, Microsoft PM) go through the same technical interviews as engineers — Advanced DSA + System Design directly prepares you for that.\n\nA strong technical PM who can talk to engineers as equals commands significantly more and advances faster.\n\nTargeting PM roles and want to strengthen your technical foundation?\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
  }

  // ── 10. Default — contextual, genuinely helpful ───────────────────────────
  return "That's a great question — let me help you get the right answer.\n\nI'm the Intel AI assistant, specialising in software engineering and AI/ML education. I can help with:\n\n🎓 Finding the right course for your background\n💼 Interview prep (DSA, System Design, behavioral)\n🔀 Career switching into tech\n💰 Fees and payment options\n🛠️ Specific topics — DevOps, mobile, data science, blockchain, and more\n\nTell me a bit about your situation — what's your background and what are you trying to achieve?\n\nOr reach out directly:\n📞 WhatsApp: +91 98713 58616 | 📧 vikz2708@gmail.com";
}

export default function AIChat() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hi! 👋 I'm the Intel AI assistant. Ask me anything — courses, learning paths, founders, the 1-Year Program, practice problems, or anything else about this platform!" },
  ]);
  const [input, setInput] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = status === "authenticated" && !!session;

  // Load count: from DB if logged in, else localStorage
  useEffect(() => {
    if (status === "loading") return;
    if (isLoggedIn) {
      apiFetch("/ai").then(r => r.json()).then(d => setMsgCount(d.count ?? 0)).catch(() => {});
    } else {
      setMsgCount(parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10));
    }
  }, [status, isLoggedIn]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLimited = msgCount >= MSG_LIMIT;
  const remaining = Math.max(0, MSG_LIMIT - msgCount);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || isLimited) return;

    const newCount = msgCount + 1;
    setMsgCount(newCount);

    // Persist count
    if (isLoggedIn) {
      apiFetch("/ai", { method: "POST" }).catch(() => {});
    } else {
      localStorage.setItem(STORAGE_KEY, String(newCount));
    }

    const userMsg: Message = { id: Date.now(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const isLastMsg = newCount === MSG_LIMIT;
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: isLastMsg
          ? getResponse(msg) + "\n\n⚠️ You've reached your 10 message limit. To get more messages, contact us at vikz2708@gmail.com or +91 98713 58616."
          : getResponse(msg),
      };
      setMessages((prev) => [...prev, reply]);
    }, 500);
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-full shadow-2xl shadow-[#0071e3]/40 flex items-center justify-center transition-all duration-200 pulse-glow"
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6" fill="white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-24px)] bg-[#161b22] border border-[#21262d] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-[#21262d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Intel AI Assistant</div>
                  {isLimited ? (
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <Lock className="w-3 h-3" /> Limit reached — Sign in to continue
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      Online — {remaining} message{remaining === 1 ? "" : "s"} remaining
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "assistant" ? "bg-[#0071e3]/20" : "bg-[#21262d]"}`}>
                    {m.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-[#0071e3]" /> : <User className="w-3.5 h-3.5 text-[#8b949e]" />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "assistant" ? "bg-[#1c2333] text-[#e6edf3]" : "bg-[#0071e3] text-white"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 bg-[#1c2333] border border-[#21262d] text-[#8b949e] hover:text-[#0071e3] hover:border-[#0071e3]/30 rounded-full transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input / Limit wall */}
            <div className="px-3 py-3 border-t border-[#21262d]">
              {isLimited ? (
                <div className="bg-[#0d1117] border border-[#0071e3]/30 rounded-xl p-4 text-center space-y-2">
                  <div className="w-9 h-9 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-sm font-semibold text-white">Free limit reached</div>
                  <div className="text-xs text-[#8b949e]">You've used all 10 free messages. Sign in to get unlimited access.</div>
                  <button className="w-full mt-1 py-2 bg-[#0071e3] hover:bg-[#0058b3] text-white text-sm font-semibold rounded-lg transition-colors">
                    Sign In to Continue
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask about courses, founders, paths..."
                    className="flex-1 px-3 py-2 bg-[#0d1117] border border-[#21262d] rounded-lg text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim()}
                    className="w-9 h-9 bg-[#0071e3] hover:bg-[#0058b3] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
