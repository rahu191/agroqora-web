import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail, MapPin, Building } from 'lucide-react';
import LandingContactForm from './landing-contact-form';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] min-h-[400px] flex-col items-center justify-center text-center text-white">
        <Image
          src="/Agroqora_splash.png"
          alt="AgroQora splash banner"
          fill
          className="object-cover -z-10"
          priority
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />

        <div className="max-w-4xl p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
            Smarter Farming.
            <br />
            Sustainable Future.
          </h1>
        </div>
      </section>

      {/* Contact and Info Section */}
      <section id="contact" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">CONTACT US</h2>
              <h3 className="text-xl font-semibold text-foreground mb-6">REACH OUT DIRECTLY</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">OFFICE</p>
                    <p>Pimpri-Chinchwad, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">EMAIL</p>
                    <p><a href="mailto:info@agroqora.com" className="hover:underline">info@agroqora.com</a> (General)</p>
                    <p><a href="mailto:sales@agroqora.com" className="hover:underline">sales@agroqora.com</a> (Business)</p>
                    <p><a href="mailto:tech@agroqora.com" className="hover:underline">tech@agroqora.com</a> (Support)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Founded by:</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Rahul Patle (<a href="mailto:rahul.patle@agroqora.com" className="text-primary hover:underline">rahul.patle@agroqora.com</a>)</p>
                <p>Kiran Fegade (<a href="mailto:kiran.fegade@agroqora.com" className="text-primary hover:underline">kiran.fegade@agroqora.com</a>)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <LandingContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50">
        <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                 <Link
                    href="https://www.linkedin.com/company/agroqora-tech-farm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <Linkedin className="h-5 w-5" />
                    Follow us on LinkedIn
                </Link>
            </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AgroQora. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
