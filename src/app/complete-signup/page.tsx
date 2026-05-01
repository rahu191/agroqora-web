'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createUserProfile, type UserType } from '@/lib/userProfile';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, User, MapPin, Sprout, Briefcase, Handshake, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const USER_TYPES: { value: UserType; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'farmer', label: 'Farmer', icon: Sprout, description: 'I grow crops and manage farmland' },
  { value: 'investor', label: 'Investor', icon: Briefcase, description: 'I invest in agricultural ventures' },
  { value: 'partner', label: 'Partner', icon: Handshake, description: 'I provide agri-tech services' },
];

export default function CompleteSignupPage() {
  const router = useRouter();
  const { user, loading: authLoading, userProfile, profileLoading, refreshProfile } = useAuth();

  // ─── Form state ────────────────────────────────────────────────
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<UserType | ''>('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ─── Guards ────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && user && !profileLoading && userProfile) {
      // Already has a profile — go to dashboard
      router.replace('/dashboard');
    }
  }, [user, authLoading, userProfile, profileLoading, router]);

  // ─── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!userType) {
      setError('Please select your role.');
      return;
    }
    if (!location.trim()) {
      setError('Please enter your location.');
      return;
    }
    if (!user) {
      setError('Session expired. Please log in again.');
      router.push('/auth');
      return;
    }

    setSubmitting(true);
    try {
      await createUserProfile(user.uid, {
        fullName: fullName.trim(),
        userType: userType as UserType,
        location: location.trim(),
        phoneNumber: user.phoneNumber || '',
      });

      // Refresh the profile in AuthContext so ProtectedRoute lets us through
      await refreshProfile();

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError('Failed to save your profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Loading ───────────────────────────────────────────────────
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a2e1a] via-[#133d28] to-[#1a4d34]">
        <Loader2 className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  if (!user) return null;
  if (userProfile) return null; // Will redirect

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 py-8">
      {/* ═══ Background layers ═══ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e1a] via-[#133d28] to-[#1a4d34]" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lime-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* ═══ Glassmorphism Card ═══ */}
      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <div className="backdrop-blur-2xl bg-white/[0.07] border border-white/[0.12] rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-lime-400/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-emerald-400/20">
              <Sparkles className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Welcome! Let&apos;s get to know you</h1>
            <p className="text-sm text-white/50 mt-1 text-center">
              Complete your profile to start using AgroQora
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="full-name" className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                <User className="h-3.5 w-3.5" />
                Full Name
              </label>
              <Input
                id="full-name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setError(''); }}
                className="h-12 rounded-xl bg-white/[0.08] border-white/[0.12] text-white placeholder:text-white/30 text-base focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30"
                autoFocus
              />
            </div>

            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                I am a…
              </label>
              <div className="grid gap-3">
                {USER_TYPES.map((type) => {
                  const isSelected = userType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => { setUserType(type.value); setError(''); }}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left group
                        ${isSelected
                          ? 'bg-emerald-500/15 border-emerald-400/40 ring-1 ring-emerald-400/20'
                          : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]'
                        }
                      `}
                    >
                      <div className={`
                        h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                        ${isSelected
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/[0.06] text-white/40 group-hover:text-white/60'
                        }
                      `}>
                        <type.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isSelected ? 'text-emerald-300' : 'text-white/70'}`}>
                          {type.label}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-emerald-300/60' : 'text-white/30'}`}>
                          {type.description}
                        </p>
                      </div>
                      {/* Radio indicator */}
                      <div className={`
                        ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${isSelected
                          ? 'border-emerald-400 bg-emerald-500'
                          : 'border-white/20'
                        }
                      `}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                Location / City
              </label>
              <Input
                id="location"
                type="text"
                placeholder="e.g. Pune, Maharashtra"
                value={location}
                onChange={(e) => { setLocation(e.target.value); setError(''); }}
                className="h-12 rounded-xl bg-white/[0.08] border-white/[0.12] text-white placeholder:text-white/30 text-base focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-400/20 animate-in fade-in slide-in-from-top-1 duration-300">
                <span className="text-red-300 text-sm leading-relaxed">{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting || !fullName.trim() || !userType || !location.trim()}
              className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Setting up your account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Complete Signup & Enter Dashboard
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Phone info */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/[0.06]">
            <Image src="/Agroqora_logo.png" alt="" width={14} height={14} className="opacity-40" />
            <span className="text-[11px] text-white/30 font-medium">
              Signed in as {user.phoneNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
