import Link from "next/link";
import { Zap, Globe, ExternalLink, GitBranch, PlayCircle, Mail } from "lucide-react";

const footerLinks = {
  Courses: ["DSA Fundamentals", "Advanced DSA", "System Design", "Full Stack Dev", "AI & ML", "Web Dev Bootcamp"],
  "Learning Paths": ["Interview Cracker", "Full Stack Engineer", "AI/ML Engineer", "1-Year Mastery"],
  Company: ["About Us", "Founders", "Careers", "Blog", "Press Kit"],
  Support: ["Contact Us", "FAQ", "Community", "Student Success", "Privacy Policy", "Terms of Service"],
};

const socials = [
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: GitBranch, href: "#", label: "GitHub" },
  { icon: PlayCircle, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:vikz2708@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#161b22] border-t border-[#21262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" fill="white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">Intel</span>
                <span className="gradient-text"> AI</span>
              </span>
            </div>
            <p className="text-sm text-[#8b949e] leading-relaxed mb-5">
              India&apos;s most structured tech education platform. Learn DSA, System Design, Full Stack, and AI.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#21262d] flex items-center justify-center text-[#8b949e] hover:text-[#0071e3] hover:border-[#0071e3]/50 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[#8b949e] hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[#21262d] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8b949e]">
            © {new Date().getFullYear()} Intel AI. All rights reserved.
          </p>
          <p className="text-xs text-[#8b949e]">
            Built with ❤️ in India by{" "}
            <span className="text-[#0071e3]">Vikas Jakhar</span> &{" "}
            <span className="text-[#0071e3]">Jitender Singh Punia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
