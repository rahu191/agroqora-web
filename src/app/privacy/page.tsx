import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — AgroQora',
  description: 'AgroQora Privacy Policy. Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={28} height={28} />
            <span className="text-lg font-bold tracking-tight text-primary">AgroQora</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: March 28, 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              AgroQora (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and related services (collectively, the &ldquo;Service&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li><strong className="text-foreground">Personal Information:</strong> Name, email address, phone number, company/farm name, and other information you provide when using our contact forms or registering for the platform.</li>
              <li><strong className="text-foreground">Farm & Agricultural Data:</strong> Crop information, soil data, sensor telemetry, and diagnostic images you submit for analysis through our AI tools.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use the Service, including your IP address, browser type, pages viewed, and time spent on the platform.</li>
              <li><strong className="text-foreground">Device Information:</strong> Information about the device you use to access the Service, including hardware model, operating system, and unique device identifiers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>To provide, maintain, and improve the AgroQora platform and its AI-powered agricultural insights.</li>
              <li>To process and respond to your inquiries, demo requests, and partnership proposals.</li>
              <li>To send you relevant updates, technical alerts, and marketing communications (with your consent).</li>
              <li>To analyze usage patterns and optimize the user experience.</li>
              <li>To comply with legal requirements and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures, including end-to-end encryption, secure cloud infrastructure on Google Cloud Platform, and strict access controls to protect your data. While no method of transmission over the internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">5. Data Sharing & Third Parties</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform (e.g., Google Cloud for infrastructure, analytics providers) under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to provide you with the Service and as described in this Privacy Policy. We will also retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of any inaccurate data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request portability of your data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">8. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Essential cookies required for the platform to function cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Service after any modifications constitutes your acceptance of the new Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-muted/30 border border-border">
              <p className="font-bold text-foreground">AgroQora</p>
              <p className="text-muted-foreground">Email: <a href="mailto:admin@agroqora.com" className="text-primary hover:underline">admin@agroqora.com</a></p>
              <p className="text-muted-foreground">Location: Pimpri-Chinchwad, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t bg-muted/10 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/60">&copy; {new Date().getFullYear()} Agroqora. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-medium text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
