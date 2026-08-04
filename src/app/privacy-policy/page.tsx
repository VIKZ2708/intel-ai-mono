import Link from "next/link";
import { Zap, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Intel AI",
  description: "How Intel AI collects, uses, and protects your personal data. Compliant with India's Digital Personal Data Protection Act (DPDPA) 2023.",
};

const LAST_UPDATED = "August 4, 2026";
const GRIEVANCE_EMAIL = "vikz2708@gmail.com";
const COMPANY_NAME = "Intel AI";
const COMPANY_ADDRESS = "India";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-[#21262d]">{title}</h2>
      <div className="space-y-3 text-[#8b949e] text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 ml-2">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">

      {/* Nav */}
      <div className="border-b border-[#21262d] bg-[#0d1117] sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span className="font-bold text-sm">
              <span className="text-white">Intel</span>
              <span className="bg-gradient-to-r from-[#0071e3] to-[#00c9ff] bg-clip-text text-transparent"> AI</span>
            </span>
          </Link>
          <span className="text-[#30363d]">/</span>
          <span className="text-sm text-[#8b949e]">Privacy Policy</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">

        {/* Header */}
        <div className="mb-12 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center shrink-0 mt-1">
            <Shield className="w-5 h-5 text-[#3d95f4]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-[#8b949e] text-sm">Last updated: {LAST_UPDATED}</p>
            <p className="text-[#8b949e] text-sm mt-1">
              Compliant with India&apos;s <strong className="text-white">Digital Personal Data Protection Act (DPDPA) 2023</strong>
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 mb-10 text-sm text-[#8b949e] leading-relaxed">
          Welcome to {COMPANY_NAME}. We are committed to protecting your personal data. This Privacy Policy explains what information we collect when you use our platform, how we use it, and the rights you have over it. By using Intel AI, you agree to the practices described here.
        </div>

        <Section title="1. Who We Are">
          <P>
            {COMPANY_NAME} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a technology education platform based in {COMPANY_ADDRESS}, providing structured learning in DSA, System Design, Full Stack Development, and AI/ML. We operate the website at intel-ai-mu.vercel.app and all associated services.
          </P>
          <P>
            For the purposes of the DPDPA 2023, {COMPANY_NAME} is the <strong className="text-white">Data Fiduciary</strong> responsible for determining how and why your personal data is processed.
          </P>
        </Section>

        <Section title="2. Information We Collect">
          <P><strong className="text-white">Information you provide directly:</strong></P>
          <Ul items={[
            "Name and email address (when you sign up or log in via Google OAuth)",
            "Profile information (username, avatar from your Google account)",
            "Code submissions you write in our IDE",
            "Course progress and problem completion data",
          ]} />
          <P className="mt-3"><strong className="text-white">Information collected automatically:</strong></P>
          <Ul items={[
            "IP address and browser/device information",
            "Pages visited and time spent on the platform",
            "Submission timestamps used for streak and calendar tracking",
            "Error logs for debugging (via our error tracking service)",
          ]} />
          <P><strong className="text-white">Information we do NOT collect:</strong></P>
          <Ul items={[
            "Payment card numbers or bank details (handled directly by payment processors)",
            "Sensitive personal data such as Aadhaar, PAN, or biometric data",
            "Data from children under 18 — our platform is intended for adults",
          ]} />
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use your data only for the following purposes:</P>
          <Ul items={[
            "To create and manage your account and authenticate you securely",
            "To track your learning progress, streaks, and problem-solving history",
            "To personalise your experience — recommended problems, study plans",
            "To display your ranking on the leaderboard (only your username is shown publicly)",
            "To send transactional emails — account confirmation, password reset",
            "To improve the platform by analysing aggregate usage patterns",
            "To comply with legal obligations under Indian law",
          ]} />
        </Section>

        <Section title="4. Legal Basis for Processing (DPDPA 2023)">
          <P>Under the Digital Personal Data Protection Act 2023, we process your personal data on the following grounds:</P>
          <Ul items={[
            "Consent — you have given us clear consent when creating your account",
            "Contractual necessity — to provide the services you signed up for",
            "Legitimate interests — to improve platform security, prevent fraud, and maintain service quality",
            "Legal obligation — where required by applicable Indian law",
          ]} />
        </Section>

        <Section title="5. How We Share Your Information">
          <P>We do not sell your personal data. We share it only with trusted third-party service providers who help us operate the platform:</P>
          <Ul items={[
            "Google OAuth — for authentication (governed by Google's Privacy Policy)",
            "Neon / PostgreSQL — our database host, stores your account and submission data",
            "Vercel — our hosting provider, processes request logs",
            "Judge0 CE — our code execution engine, receives your code submissions to run test cases",
            "Resend / SendGrid — transactional email delivery",
            "PostHog or Mixpanel — aggregate, anonymised usage analytics",
            "Sentry — error tracking (no personally identifiable code is stored)",
          ]} />
          <P>All third-party processors are contractually bound to protect your data and may not use it for their own purposes.</P>
          <P>We may disclose your data to law enforcement or government authorities if required by a valid legal order under Indian law.</P>
        </Section>

        <Section title="6. Cookies and Tracking">
          <P>We use the following types of cookies:</P>
          <Ul items={[
            "Session cookies — to keep you logged in during your visit",
            "Authentication cookies — set by NextAuth.js to verify your identity",
            "Analytics cookies — to understand how users navigate the platform (can be opted out)",
          ]} />
          <P>You can control cookies through your browser settings. Disabling session cookies will prevent you from logging in.</P>
        </Section>

        <Section title="7. Data Retention">
          <Ul items={[
            "Account data is retained for as long as your account is active",
            "Submission data (your code history) is retained indefinitely to show your progress",
            "If you delete your account, all personal data is deleted within 30 days",
            "Anonymised aggregate analytics data may be retained longer for platform improvement",
          ]} />
        </Section>

        <Section title="8. Your Rights (Data Principal Rights under DPDPA 2023)">
          <P>As a Data Principal under the DPDPA 2023, you have the following rights:</P>
          <Ul items={[
            "Right to Access — request a copy of all personal data we hold about you",
            "Right to Correction — request correction of inaccurate or incomplete data",
            "Right to Erasure — request deletion of your personal data (right to be forgotten)",
            "Right to Grievance Redressal — raise a complaint with our Grievance Officer",
            "Right to Nominate — nominate another person to exercise rights on your behalf in case of death or incapacity",
            "Right to Withdraw Consent — withdraw consent at any time (this will result in account deletion)",
          ]} />
          <P>To exercise any of these rights, email us at <a href={`mailto:${GRIEVANCE_EMAIL}`} className="text-[#3d95f4] hover:underline">{GRIEVANCE_EMAIL}</a>. We will respond within <strong className="text-white">72 hours</strong>.</P>
        </Section>

        <Section title="9. Data Security">
          <Ul items={[
            "All data is transmitted over HTTPS/TLS encryption",
            "Passwords are never stored — authentication is handled via Google OAuth only",
            "Database access is restricted to authorised services only",
            "We conduct periodic security reviews of our infrastructure",
            "In the event of a data breach, we will notify affected users within 72 hours as required by law",
          ]} />
        </Section>

        <Section title="10. Children's Privacy">
          <P>
            Our platform is intended for users who are 18 years of age or older. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided us with personal data, please contact us immediately and we will delete it.
          </P>
        </Section>

        <Section title="11. Changes to This Policy">
          <P>
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page and notify registered users via email if the changes are material. Continued use of the platform after changes constitutes acceptance of the updated policy.
          </P>
        </Section>

        <Section title="12. Grievance Officer">
          <P>
            In accordance with the Information Technology Act 2000 and the DPDPA 2023, a Grievance Officer has been appointed:
          </P>
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 mt-3">
            <p className="text-white font-semibold">Vikas Jakhar</p>
            <p className="text-[#8b949e] text-sm mt-1">Grievance Officer, {COMPANY_NAME}</p>
            <a href={`mailto:${GRIEVANCE_EMAIL}`} className="text-[#3d95f4] text-sm hover:underline mt-1 block">{GRIEVANCE_EMAIL}</a>
            <p className="text-[#8b949e] text-sm mt-1">Response time: within 72 hours</p>
          </div>
          <P className="mt-3">
            If you are not satisfied with our response, you may escalate your complaint to the <strong className="text-white">Data Protection Board of India</strong> once it is operational under the DPDPA 2023.
          </P>
        </Section>

        {/* Footer nav */}
        <div className="pt-8 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7681]">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
