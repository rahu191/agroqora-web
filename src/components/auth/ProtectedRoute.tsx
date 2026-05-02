'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, userProfile, profileLoading, signOut } = useAuth();
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

  if (userProfile.approvalStatus === 'pending') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="max-w-md w-full bg-card p-8 rounded-[2rem] border shadow-xl flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-2">Registration Pending</h2>
          <p className="text-muted-foreground mb-8">
            Your investor registration is currently under review by a partner. You will be able to access the dashboard once approved.
          </p>
          <button
            onClick={signOut}
            className="text-sm font-medium text-destructive hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  if (userProfile.approvalStatus === 'rejected') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="max-w-md w-full bg-card p-8 rounded-[2rem] border shadow-xl flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-2">Registration Declined</h2>
          <p className="text-muted-foreground mb-8">
            Unfortunately, your registration request has been declined. Please contact support for more information.
          </p>
          <button
            onClick={signOut}
            className="text-sm font-medium text-destructive hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
