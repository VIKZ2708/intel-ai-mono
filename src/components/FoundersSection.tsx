"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";
import TiltCard from "./TiltCard";

const founders = [
  {
    name: "Vikas Jakhar",
    role: "Co-Founder & CEO",
    bio: "Engineering Lead at TATA AIG General Insurance, with prior experience as Tech Lead at Xarterian and SDE-2 at MediBuddy. With 5+ years of teaching DSA, Algorithms, and Competitive Programming at Pepcoding and Scaler, Vikas brings rare depth across both industry and education. B.Tech (IT) from USICT, New Delhi.",
    linkedin: "https://www.linkedin.com/in/vikas-jakhar-017bb6145/",
    photo: "/founders/vikas.jpeg",
    gradient: "from-[#0071e3] to-[#00c9ff]",
    tags: ["TATA AIG", "Xarterian", "MediBuddy", "Pepcoding", "Scaler"],
  },
  {
    name: "Jitender Singh Punia",
    role: "Co-Founder & CTO",
    bio: "Full-stack architect and educator with 5+ years of teaching experience at Scaler and Pepcoding. Jitender has mentored hundreds of engineers through DSA, System Design, and full-stack development, and brings hands-on experience building large-scale production systems. His vision shapes Intel AI's curriculum to reflect real-world engineering — preparing students for the toughest interviews and senior engineering roles.",
    linkedin: "https://www.linkedin.com/in/jitender-punia/",
    photo: "/founders/jitender.png",
    gradient: "from-purple-500 to-[#0071e3]",
    tags: ["Scaler", "Pepcoding", "System Design", "DSA", "Full Stack"],
  },
];

export default function FoundersSection() {
  return (
    <section id="founders" className="py-24 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3"
          >
            Leadership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Meet the <span className="gradient-text">Founding Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] max-w-xl mx-auto"
          >
            Built by engineers who&apos;ve been in your shoes — they&apos;ve cracked the interviews, built the products, and now they&apos;re here to help you do the same.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
            <TiltCard intensity={7}>
            <div className="group bg-[#161b22] border border-[#21262d] rounded-2xl p-8 hover:border-[#0071e3]/40 transition-all duration-300 card-glow h-full"
            >
              {/* Avatar */}
              <div className="flex items-center gap-5 mb-6">
                <div className={`relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-[#21262d] group-hover:ring-[#0071e3]/40 transition-all duration-300`}>
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${founder.gradient}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#3d95f4] transition-colors">
                    {founder.name}
                  </h3>
                  <p className="text-sm text-[#0071e3] font-medium mt-0.5">{founder.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-[#0d1117] border border-[#21262d] hover:border-[#0071e3]/50 text-[#8b949e] hover:text-[#0071e3] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      className="p-1.5 rounded-md bg-[#0d1117] border border-[#21262d] hover:border-[#0071e3]/50 text-[#8b949e] hover:text-[#0071e3] transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#8b949e] leading-relaxed mb-5">{founder.bio}</p>

              {/* Experience tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {founder.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-[#0d1117] border border-[#21262d] text-[#8b949e] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Decorative line */}
              <div className={`h-0.5 rounded-full bg-gradient-to-r ${founder.gradient} opacity-30`} />
            </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
