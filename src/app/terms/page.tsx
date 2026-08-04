import Link from "next/link";
import { Zap, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Intel AI",
  description: "Terms and conditions governing your use of the Intel AI platform.",
};

const LAST_UPDATED = "August 4, 2026";
const CONTACT_EMAIL = "vikz2708@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-[#21262d]">{title}</h2>
      <div className="space-y-3 text-[#8b949e] text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 ml-2">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function TermsPage() {
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
          <span className="text-sm text-[#8b949e]">Terms of Service</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">

        {/* Header */}
        <div className="mb-12 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center shrink-0 mt-1">
            <FileText className="w-5 h-5 text-[#3d95f4]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-[#8b949e] text-sm">Last updated: {LAST_UPDATED}</p>
            <p className="text-[#8b949e] text-sm mt-1">Governing law: <strong className="text-white">Republic of India</strong></p>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 mb-10 text-sm text-[#8b949e] leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of Intel AI (&quot;the Platform&quot;). By creating an account or using any part of the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
        </div>

        <Section title="1. Acceptance of Terms">
          <P>
            By accessing or using Intel AI, you confirm that you are at least 18 years old, have the legal capacity to enter into a binding agreement, and agree to these Terms and our <Link href="/privacy-policy" className="text-[#3d95f4] hover:underline">Privacy Policy</Link>.
          </P>
        </Section>

        <Section title="2. Your Account">
          <Ul items={[
            "You must provide accurate information when creating your account",
            "You are responsible for maintaining the security of your account",
            "You must notify us immediately of any unauthorised access to your account",
            "One person may not maintain more than one account",
            "You may not share your account credentials with anyone else",
            "We reserve the right to terminate accounts that violate these Terms",
          ]} />
        </Section>

        <Section title="3. Acceptable Use">
          <P>You agree NOT to:</P>
          <Ul items={[
            "Copy, scrape, or systematically download problems, solutions, or editorial content from the Platform",
            "Share premium content (company-tagged problems, editorials, AI hints) outside the Platform",
            "Attempt to reverse-engineer, decompile, or extract the Platform's source code",
            "Use automated bots, scripts, or tools to interact with the Platform",
            "Submit malicious code, exploits, or harmful content through the code IDE",
            "Impersonate another user or misrepresent your identity",
            "Use the Platform for any unlawful purpose under Indian law",
            "Abuse, harass, or threaten other users in any community features",
          ]} />
        </Section>

        <Section title="4. Intellectual Property">
          <P>
            All content on Intel AI — including but not limited to problem statements, editorial solutions, course materials, code examples, illustrations, and UI design — is owned by Intel AI or licensed to us and is protected by copyright law.
          </P>
          <P>
            Your code submissions belong to you. By submitting code on the Platform, you grant Intel AI a non-exclusive, royalty-free licence to store and display it as part of your profile and submission history.
          </P>
          <P>
            You may not reproduce, distribute, or create derivative works from our content without explicit written permission.
          </P>
        </Section>

        <Section title="5. Subscription and Payments">
          <P>
            Certain features of Intel AI are available only to paid subscribers (&quot;Premium&quot; users). By subscribing:
          </P>
          <Ul items={[
            "You authorise us to charge your selected payment method at the start of each billing period",
            "Subscriptions auto-renew unless cancelled before the renewal date",
            "Refunds are available within 7 days of purchase if you have not accessed premium content",
            "We reserve the right to change pricing with 30 days notice to existing subscribers",
            "Prices are in Indian Rupees (INR) and inclusive of applicable taxes",
          ]} />
        </Section>

        <Section title="6. Platform Availability">
          <P>
            We strive to maintain 99% uptime but do not guarantee uninterrupted access. We may perform scheduled maintenance, which we will announce in advance where possible. We are not liable for any losses caused by downtime or service interruptions.
          </P>
        </Section>

        <Section title="7. User-Generated Content">
          <P>
            If the Platform includes community features (discussion threads, comments), you are responsible for any content you post. You agree not to post content that is defamatory, obscene, illegal, or violates the rights of any third party. We reserve the right to remove any content that violates these Terms without notice.
          </P>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <P>
            The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that:
          </P>
          <Ul items={[
            "The Platform will be error-free or uninterrupted",
            "Content is always accurate, complete, or up to date",
            "Use of the Platform will result in job placement or interview success",
          ]} />
        </Section>

        <Section title="9. Limitation of Liability">
          <P>
            To the maximum extent permitted by applicable Indian law, Intel AI shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Platform, including but not limited to loss of data, loss of income, or failure to achieve expected outcomes.
          </P>
          <P>
            Our total aggregate liability to you shall not exceed the amount you paid us in the 3 months preceding the claim.
          </P>
        </Section>

        <Section title="10. Termination">
          <P>
            We may suspend or terminate your account at any time if we determine you have violated these Terms. You may terminate your account at any time by emailing us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#3d95f4] hover:underline">{CONTACT_EMAIL}</a>.
          </P>
          <P>
            Upon termination, your right to access the Platform ceases immediately. Sections covering intellectual property, disclaimers, and limitation of liability survive termination.
          </P>
        </Section>

        <Section title="11. Governing Law and Dispute Resolution">
          <P>
            These Terms are governed by the laws of the Republic of India. Any disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act 1996, with the seat of arbitration in India.
          </P>
        </Section>

        <Section title="12. Changes to These Terms">
          <P>
            We may update these Terms from time to time. Material changes will be communicated via email to registered users at least 14 days before taking effect. Continued use of the Platform after changes take effect constitutes acceptance.
          </P>
        </Section>

        <Section title="13. Contact Us">
          <P>For any questions about these Terms, contact us at:</P>
          <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 mt-3">
            <p className="text-white font-semibold">Intel AI</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#3d95f4] text-sm hover:underline mt-1 block">{CONTACT_EMAIL}</a>
          </div>
        </Section>

        {/* Footer nav */}
        <div className="pt-8 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7681]">
          <p>© {new Date().getFullYear()} Intel AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
