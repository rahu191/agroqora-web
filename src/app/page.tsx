import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, Search, Sprout, BarChart3, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import LandingContactForm from './landing-contact-form';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight text-primary">AgroQora</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#privacy" className="text-sm font-medium hover:text-primary transition-colors">Privacy</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            <Button asChild size="sm">
              <Link href="/dashboard">Launch App</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
            alt="Smart Agricultural Technology"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for Text Visibility - Balanced darkness */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center md:text-left relative z-10 pt-20 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">Empowering Modern Farming</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white drop-shadow-xl leading-[1.1]">
            Smarter Farming.<br />
            <span className="text-accent italic">Sustainable Future.</span>
          </h1>
          
          <p className="max-w-2xl text-xl md:text-2xl text-white mb-12 font-bold leading-relaxed drop-shadow-lg">
            Harness the power of AI and real-time data to optimize your yields, 
            diagnose diseases instantly, and make data-driven market decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-12">
            <Button asChild size="lg" className="h-16 px-10 text-xl font-bold shadow-2xl group bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard" className="flex items-center gap-3">
                Launch Dashboard
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" className="h-16 px-10 text-xl font-bold shadow-2xl group bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact" className="flex items-center gap-3">
                Contact Us
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-background relative z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter text-foreground italic">Core Technologies</h2>
            <div className="h-2 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "AI Disease Diagnosis",
                description: "Instantly detect plant diseases and get treatment plans using our advanced computer vision AI.",
                icon: Search,
              },
              {
                title: "Precision Crop Planning",
                description: "Maximize your harvest with AI that analyzes soil, weather, and historical data for your land.",
                icon: Sprout,
              },
              {
                title: "Market-Driven Selection",
                description: "Connect with real-time demand. Grow what the market needs for the highest returns.",
                icon: BarChart3,
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-10 rounded-3xl border border-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Privacy Section */}
      <section id="privacy" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="h-24 w-24 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">Your Data, Your Control</h2>
              <p className="text-xl text-primary-foreground/90 max-w-3xl leading-relaxed font-medium">
                At AgroQora, we prioritize your data privacy. Your farm data, crop images, and personal information are encrypted and used solely to provide you with personalized agricultural insights.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-6">
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                      <span className="font-bold text-sm tracking-wider uppercase">End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                      <span className="font-bold text-sm tracking-wider uppercase">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                      <span className="font-bold text-sm tracking-wider uppercase">No 3rd-Party Sharing</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AgroQora Section */}
      <section className="py-32 border-y bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
             <Image
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop"
                alt="Modern farming technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground uppercase italic leading-tight">Why Choose<br/><span className="text-primary">AgroQora?</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We bridge the gap between traditional agricultural wisdom and modern AI technology, providing actionable insights that make a difference in every harvest.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "Data-driven decision making for higher yields",
                "Sustainable practices that protect the environment",
                "Accessible technology for small and large-scale farms",
                "Real-time monitoring and predictive analytics"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-foreground">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xl font-bold">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold">
               <Link href="/about">Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16 text-foreground">
            <div>
              <h2 className="text-5xl font-black text-primary mb-6 uppercase italic tracking-tighter">Get In Touch</h2>
              <p className="text-2xl text-muted-foreground max-w-md leading-tight font-medium">
                Ready to transform your farming with AI? Let's grow together.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-8 group">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Our Location</p>
                  <p className="text-2xl font-bold">Maharashtra, India</p>
                  <p className="text-muted-foreground font-medium">Pimpri-Chinchwad</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group">
                <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">Email Contacts</p>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Rahul Patle</span>
                        <a href="mailto:rahul.patle@agroqora.com" className="text-xl font-bold hover:text-primary transition-colors">rahul.patle@agroqora.com</a>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Kiran Fegade</span>
                        <a href="mailto:kiran.fegade@agroqora.com" className="text-xl font-bold hover:text-primary transition-colors">kiran.fegade@agroqora.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative">
             <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
             <LandingContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/10 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
               <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={40} height={40} />
               <span className="text-2xl font-black tracking-tighter text-primary italic">AgroQora</span>
            </div>
            
            <div className="flex items-center gap-12">
                 <Link
                    href="https://www.linkedin.com/company/agroqora-tech-farm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all hover:scale-105"
                >
                    <Linkedin className="h-6 w-6" />
                    Follow LinkedIn
                </Link>
            </div>
            
            <p className="text-sm font-bold text-muted-foreground/60 tracking-widest uppercase">&copy; {new Date().getFullYear()} AgroQora. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
