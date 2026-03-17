import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About AgroQora"
        description="Smarter Farming, Sustainable Future."
      />
      <Card>
        <CardContent className="pt-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image src="/Agroqora_logo.png" alt="AgroQora Logo" width={80} height={80} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-headline mb-4">
              Smarter Farming, Sustainable Future
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
              Leverage the power of AI to diagnose plant health, optimize resources, and boost your crop
              yield. AgroQora is your partner in modern agriculture.
            </p>

            <div className="text-muted-foreground">
              <p className="font-semibold text-lg">Founded by:</p>
              <p className="text-lg mt-1">
                Rahul Patle (<a href="mailto:rahul.patle@agroqora.com" className="text-primary hover:underline">rahul.patle@agroqora.com</a>)
              </p>
              <p className="text-lg mt-1">
                Kiran Fegade (<a href="mailto:kiran.fegade@agroqora.com" className="text-primary hover:underline">kiran.fegade@agroqora.com</a>)
              </p>
            </div>

            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link
                  href="https://www.linkedin.com/company/agroqora-tech-farm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Follow us on LinkedIn
                </Link>
              </Button>
            </div>

            <footer className="mt-12 text-sm text-muted-foreground border-t pt-4">
              <p>&copy; {new Date().getFullYear()} AgroQora. All rights reserved.</p>
            </footer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
