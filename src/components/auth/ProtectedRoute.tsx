'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, userProfile, profileLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && !profileLoading && !userProfile) {
      router.replace('/complete-signup');
    }
  }, [user, loading, userProfile, profileLoading, router]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        <div className="relative">
          <Image
            src="/Agroqora_logo.png"
            alt="AgroQora"
            width={56}
            height={56}
            className="animate-pulse"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-1.5 w-32 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading your farm data…</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return null;
  }

  return <>{children}</>;
}
