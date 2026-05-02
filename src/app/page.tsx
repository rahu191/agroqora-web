import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, ArrowRight, CheckCircle2, Cpu, Radio, TrendingUp, AlertTriangle, Lightbulb, Rocket, Menu } from 'lucide-react';
import LandingContactForm from './landing-contact-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STICKY NAVIGATION BAR                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 w-full z-[100] bg-background/80 backdrop-blur-md border-b" role="banner">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight text-primary">AgroQora</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <Link href="#home" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="#technology" className="text-sm font-medium hover:text-primary transition-colors">Technology</Link>
            <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">Team</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</Link>
            <Button asChild size="sm">
              <Link href="/auth">Sign In</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden cursor-pointer touch-manipulation relative z-[110]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-72 pt-20 px-6 z-[200]">
              <nav className="flex flex-col items-center gap-8" aria-label="Mobile Navigation">
                <SheetClose asChild>
                  <Link href="#home" className="text-lg font-bold hover:text-primary transition-colors">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#technology" className="text-lg font-bold hover:text-primary transition-colors">Technology</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#team" className="text-lg font-bold hover:text-primary transition-colors">Team</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#contact" className="text-lg font-bold hover:text-primary transition-colors">Contact Us</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg" className="mt-4">
                    <Link href="/auth">Sign In</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
            alt="Smart Agricultural Technology"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center md:text-left relative z-10 pt-20 w-full">
          {/* Launching Soon Ticker */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white border-2 border-white/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-[0_0_30px_rgba(76,175,80,0.5)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] animate-pulse">Empowering Indian Agriculture with AI & IoT</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-xl leading-[1.1]">
            Smarter Farming.<br />
            <span className="text-accent italic">Sustainable Future.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-2xl text-white/90 mb-12 font-medium leading-relaxed drop-shadow-lg">
            Scaling Indian Agriculture with Real-time IoT Monitoring and AI-Driven Predictive Intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-12">
            <Button asChild size="lg" className="h-16 px-10 text-xl font-bold shadow-2xl group bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact" className="flex items-center gap-3">
                Request Demo
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM & SOLUTION                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="problem" className="py-28 bg-background relative z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">Why We Exist</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              The Problem.<br/><span className="text-primary italic">Our Solution.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* The Challenge */}
            <div className="bg-red-50 dark:bg-red-950/20 p-10 md:p-14 rounded-[2.5rem] border border-red-200 dark:border-red-900/30 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-red-100 dark:bg-red-900/20 rounded-full blur-3xl opacity-60" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-8">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-red-800 dark:text-red-300 uppercase tracking-tight">The Challenge</h3>
                <p className="text-lg text-red-700/80 dark:text-red-300/70 leading-relaxed font-medium">
                  Traditional farming is hindered by unpredictable weather, declining soil health, and late-stage pest outbreaks that destroy entire yields. Farmers are forced to react to crises instead of preventing them.
                </p>
              </div>
            </div>

            {/* The Agroqora Solution */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-10 md:p-14 rounded-[2.5rem] border border-emerald-200 dark:border-emerald-900/30 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-8">
                  <Lightbulb className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-emerald-800 dark:text-emerald-300 uppercase tracking-tight">The Agroqora Solution</h3>
                <p className="text-lg text-emerald-700/80 dark:text-emerald-300/70 leading-relaxed font-medium">
                  We provide an end-to-end digital ecosystem — a subscription-based SaaS platform that fuses IoT sensor data with Google Cloud-powered ML models, giving farmers the &ldquo;foresight&rdquo; to act before problems occur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: CORE TECHNOLOGY PILLARS (PUBLIC DEEP-DIVE)          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="technology" className="py-28 bg-muted/30 border-y relative">
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">Our Product</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Core Technology Pillars
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive suite of AI and IoT capabilities purpose-built for modern Indian agriculture.
            </p>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "AI Crop Diagnostics",
                description: "Built on TensorFlow and Vertex AI, our computer vision models detect pests and nutrient deficiencies from simple smartphone photos. Get instant treatment plans powered by deep learning.",
                icon: Cpu,
                gradient: "from-violet-500/10 to-blue-500/10",
                iconBg: "bg-violet-100 dark:bg-violet-900/30",
                iconColor: "text-violet-600 dark:text-violet-400",
              },
              {
                title: "IoT Soil Intelligence",
                description: "Plug-and-play sensors providing 24/7 IoT telemetry on moisture, pH, and temperature via Google Cloud IoT. Real-time dashboards give you complete control over your soil health.",
                icon: Radio,
                gradient: "from-emerald-500/10 to-teal-500/10",
                iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
                iconColor: "text-emerald-600 dark:text-emerald-400",
              },
              {
                title: "Yield Prediction Engine",
                description: "Proprietary ML models trained on Vertex AI that analyze historical data, weather patterns, and market trends to optimize harvest timing and maximize profit.",
                icon: TrendingUp,
                gradient: "from-amber-500/10 to-orange-500/10",
                iconBg: "bg-amber-100 dark:bg-amber-900/30",
                iconColor: "text-amber-600 dark:text-amber-400",
              }
            ].map((feature, i) => (
              <article key={i} className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-10 rounded-[2rem] border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}>
                <div className={`h-16 w-16 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[1.05rem]">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: FOUNDING LEADERSHIP (PUBLIC)                        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="team" className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">The Team</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Founding Leadership
            </h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
            {/* Rahul Patle */}
            <article className="bg-card p-10 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="h-20 w-20 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-primary">RP</span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-1">Rahul Patle</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Co-Founder & Principal Engineer</p>
                <p className="text-muted-foreground leading-relaxed text-[1.05rem]">
                  An IT veteran with over 15 years of experience in Java, Microservices, and Cloud Architecture (GCP/AWS). Rahul leads the core engineering and AI integration.
                </p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/60">
                  <a href="mailto:rahul.patle@agroqora.com" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    rahul.patle@agroqora.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rahul-patle191"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-[#0A66C2] transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </article>

            {/* Kiran Fegade */}
            <article className="bg-card p-10 rounded-[2.5rem] border border-border shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="h-20 w-20 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-primary">KF</span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-1">Kiran Fegade</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-6">Co-Founder & Solution Architecture Specialist</p>
                <p className="text-muted-foreground leading-relaxed text-[1.05rem]">
                  A seasoned IT professional with over 16 years of experience designing scalable, high-availability systems and strategic technical operations. Kiran ensures the platform&apos;s architecture is robust, secure, and ready for national scale.
                </p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/60">
                  <a href="mailto:kiran.fegade@agroqora.com" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    kiran.fegade@agroqora.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kiranfegade19/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-[#0A66C2] transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Mission Statement */}
          <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Rocket className="h-12 w-12 text-accent mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Our Mission</h3>
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed font-medium max-w-2xl mx-auto">
                To bridge the gap between deep-tech innovation and the grassroots of Indian agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: CONTACT & TRUST SIGNALS                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 bg-muted/20 border-t">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16 text-foreground">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">Get Started</p>
              <h2 className="text-5xl font-black text-foreground mb-6 tracking-tight leading-tight">
                Let&apos;s Build the<br/><span className="text-primary italic">Future of Farming.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-md leading-relaxed font-medium">
                Ready to transform your agricultural operations with AI &amp; IoT? Let&apos;s grow together.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-8 group">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 flex-shrink-0">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Registered Office</p>
                  <p className="text-2xl font-bold">Pimpri-Chinchwad</p>
                  <p className="text-muted-foreground font-medium">Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 flex-shrink-0">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Official Contact</p>
                  <a href="mailto:admin@agroqora.com" className="text-2xl font-bold hover:text-primary transition-colors">
                    admin@agroqora.com
                  </a>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-4 pt-6">
                {[
                  "Google Cloud Partner",
                  "End-to-End Encryption",
                  "GDPR Compliant"
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card p-10 md:p-14 rounded-[3rem] border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative">
             <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
             <LandingContactForm />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* GLOBAL PROFESSIONAL FOOTER                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <footer className="border-t bg-[#111827] text-white py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand + Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={36} height={36} />
                <span className="text-xl font-black tracking-tighter italic">AgroQora</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                A digital-native Agritech SaaS platform scaling Indian agriculture with AI-driven predictive intelligence and real-time IoT monitoring.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Quick Links</h4>
              <nav className="flex flex-col gap-3" aria-label="Footer Navigation">
                <Link href="#home" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
                <Link href="#technology" className="text-sm text-white/70 hover:text-white transition-colors">Technology</Link>
                <Link href="#team" className="text-sm text-white/70 hover:text-white transition-colors">Team</Link>
                <Link href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact Us</Link>
              </nav>
            </div>

            {/* Legal + Contact */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Legal & Contact</h4>
              <div className="flex flex-col gap-3">
                <Link href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">Terms of Service</Link>
                <a href="mailto:admin@agroqora.com" className="text-sm text-white/70 hover:text-white transition-colors">admin@agroqora.com</a>
                <p className="text-sm text-white/50">Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40 tracking-wider">&copy; {new Date().getFullYear()} Agroqora. All Rights Reserved.</p>
            <Link
              href="https://www.linkedin.com/company/agroqora-tech-farm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-all hover:scale-105"
            >
              <Linkedin className="h-5 w-5" />
              Follow us on LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
