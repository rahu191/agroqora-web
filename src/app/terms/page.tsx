import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — AgroQora',
  description: 'AgroQora Terms of Service. Review the terms and conditions governing your use of our platform.',
};

export default function TermsOfServicePage() {
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
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Effective Date: March 28, 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using AgroQora&apos;s platform, website, APIs, and any related services (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              AgroQora is a digital-native Agritech SaaS platform that provides AI-powered crop diagnostics, IoT-based soil intelligence, yield prediction, and market analytics for modern agriculture. Our platform fuses real-time sensor data with Google Cloud-powered machine learning models to deliver actionable farming insights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>You must provide accurate, current, and complete information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to reverse-engineer, decompile, or extract source code from our AI models or proprietary algorithms.</li>
              <li>Upload malicious code, viruses, or any content designed to disrupt the Service.</li>
              <li>Resell, redistribute, or commercially exploit the Service without prior written consent from AgroQora.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of the Service — including but not limited to our AI models, algorithms, software, designs, logos, and text — are the exclusive property of AgroQora and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">6. Data Ownership</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of all data you upload to the platform, including farm data, crop images, and sensor telemetry. By using the Service, you grant AgroQora a limited, non-exclusive license to process, analyze, and store your data solely for the purpose of providing you with the Service and improving our AI models. We will never sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. AgroQora makes no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of AI-generated insights, crop diagnostics, or yield predictions. Agricultural outcomes depend on numerous factors beyond the scope of our platform, and our recommendations should not be considered a substitute for professional agronomic advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by applicable law, AgroQora shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, crops, data, or business opportunities arising from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">9. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain high availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to scheduled maintenance, system upgrades, or circumstances beyond our control. We will make reasonable efforts to notify users in advance of planned downtime.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">10. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease. You may request export of your data within 30 days of account termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">12. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              AgroQora reserves the right to modify these Terms at any time. We will provide notice of material changes through the Service or via email. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-muted/30 border border-border">
              <p className="font-bold text-foreground">AgroQora</p>
              <p className="text-muted-foreground">Email: <a href="mailto:admin@agroqora.com" className="text-primary hover:underline">admin@agroqora.com</a></p>
              <p className="text-muted-foreground">Location: Pimpri-Chinchwad, Maharashtra, India</p>
              <p className="text-muted-foreground">Jurisdiction: Pune, Maharashtra, India</p>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t bg-muted/10 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/60">&copy; {new Date().getFullYear()} Agroqora. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-medium text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
