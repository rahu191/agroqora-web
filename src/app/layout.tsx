import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PT_Sans } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AgroQora — AI-Powered Agritech Platform for Smarter, Sustainable Farming',
  description: 'AgroQora is a digital-native Agritech SaaS platform scaling Indian agriculture with real-time IoT monitoring, AI crop diagnostics, and predictive intelligence. Built on Google Cloud.',
  keywords: ['agritech', 'AI farming', 'IoT agriculture', 'crop diagnostics', 'smart farming', 'India', 'SaaS', 'precision agriculture'],
  openGraph: {
    title: 'AgroQora — Smarter Farming. Sustainable Future.',
    description: 'Scaling Indian Agriculture with Real-time IoT Monitoring and AI-Driven Predictive Intelligence.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'AgroQora',
  },
  icons: {
    icon: '/Agroqora_logo.png?v=1',
    shortcut: '/Agroqora_logo.png?v=1',
    apple: '/Agroqora_logo.png?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ptSans.variable} suppressHydrationWarning>
      <body className="font-body antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
