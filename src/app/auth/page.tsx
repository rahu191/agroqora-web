'use client';

import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAdditionalUserInfo,
  type ConfirmationResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserProfile } from '@/lib/userProfile';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── Country codes ───────────────────────────────────────────────
const COUNTRIES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
] as const;

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

// ─── Error mapping ───────────────────────────────────────────────
function friendlyError(err: any): string {
  const code = err?.code || '';
  switch (code) {
    case 'auth/invalid-phone-number':
      return 'Please enter a valid phone number.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/code-expired':
      return 'OTP has expired. Please request a new one.';
    case 'auth/invalid-verification-code':
      return 'Incorrect OTP. Please check and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/quota-exceeded':
      return 'SMS quota exceeded. Please try again tomorrow.';
    case 'auth/captcha-check-failed':
      return 'Security check failed. Please refresh and try again.';
    default:
      return err?.message || (code ? `Error: ${code}` : 'Something went wrong. Please try again.');
  }
}

export default function AuthPage() {
  const router = useRouter();
  const { user, loading: authLoading, userProfile, profileLoading } = useAuth();

  // ─── State ──────────────────────────────────────────────────────
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isSignUp, setIsSignUp] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ─── Redirect if already logged in ─────────────────────────────
  useEffect(() => {
    if (!authLoading && user && !profileLoading) {
      if (userProfile) {
        router.replace('/dashboard');
      } else {
        router.replace('/complete-signup');
      }
    }
  }, [user, authLoading, userProfile, profileLoading, router]);

  // ─── Resend timer ──────────────────────────────────────────────
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  // ─── Setup reCAPTCHA (once, on mount) ──────────────────────────
  useEffect(() => {
    let container = document.getElementById('recaptcha-container-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'recaptcha-container-root';
      document.body.appendChild(container);
    }

    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, container, {
        size: 'invisible',
        callback: () => { /* reCAPTCHA solved */ },
        'expired-callback': () => {
          setError('Security verification expired. Please try again.');
        },
      });
    }

    return () => {
      if (recaptchaRef.current) {
        try { recaptchaRef.current.clear(); } catch {}
        recaptchaRef.current = null;
      }
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // ─── Send OTP ──────────────────────────────────────────────────
  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length < 6 || cleaned.length > 15) {
      setError('Please enter a valid phone number.');
      return;
    }

    setSending(true);
    try {
      if (!recaptchaRef.current) {
        setError('Security verification failed to load. Please refresh the page.');
        setSending(false);
        return;
      }

      const fullPhone = `${countryCode}${cleaned}`;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaRef.current);
      confirmationRef.current = confirmation;
      setStep('otp');
      setResendTimer(RESEND_COOLDOWN);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setError(friendlyError(err));
    } finally {
      setSending(false);
    }
  };

  // ─── Resend OTP ────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    setSending(true);
    try {
      if (!recaptchaRef.current) {
        setError('Security verification failed to load. Please refresh.');
        setSending(false);
        return;
      }
      const cleaned = phoneNumber.replace(/\D/g, '');
      const fullPhone = `${countryCode}${cleaned}`;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaRef.current);
      confirmationRef.current = confirmation;
      setResendTimer(RESEND_COOLDOWN);
    } catch (err: any) {
      setError(friendlyError(err));
    } finally {
      setSending(false);
    }
  };

  // ─── Verify OTP — with isNewUser routing ───────────────────────
  const handleVerifyOtp = async (otpValue?: string) => {
    const code = otpValue || otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setError('');
    setVerifying(true);
    try {
      if (!confirmationRef.current) {
        setError('Session expired. Please request a new OTP.');
        setStep('phone');
        setVerifying(false);
        return;
      }

      const result = await confirmationRef.current.confirm(code);

      // Check if this is a brand-new user
      const additionalInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalInfo?.isNewUser ?? false;

      if (isNewUser) {
        // New user — send to profile completion
        router.push('/complete-signup');
      } else {
        // Returning user — check if they have a profile in Firestore
        const existingProfile = await getUserProfile(result.user.uid);
        if (existingProfile) {
          router.push('/dashboard');
        } else {
          // Profile missing (maybe they abandoned signup earlier)
          router.push('/complete-signup');
        }
      }
    } catch (err: any) {
      setError(friendlyError(err));
    } finally {
      setVerifying(false);
    }
  };

  // ─── OTP digit input handlers ─────────────────────────────────
  const handleOtpChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    setError('');

    if (digit && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1]?.focus();
    }

    // Auto-submit when all digits are filled
    if (digit && idx === OTP_LENGTH - 1 && next.every((d) => d !== '')) {
      handleVerifyOtp(next.join(''));
    }
  };

  const handleOtpKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    otpRefs.current[focusIdx]?.focus();
    if (pasted.length === OTP_LENGTH) {
      handleVerifyOtp(next.join(''));
    }
  };

  // ─── Loading while checking auth ──────────────────────────────
  if (authLoading || (user && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a2e1a] via-[#133d28] to-[#1a4d34]">
        <Loader2 className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  // Already logged in — don't render (redirect in useEffect)
  if (user) return null;

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[80px]" />

      {/* ═══ Glassmorphism Card ═══ */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <div className="backdrop-blur-2xl bg-white/[0.07] border border-white/[0.12] rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          {/* Logo + Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/10">
              <Image src="/Agroqora_logo.png" alt="AgroQora" width={40} height={40} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isSignUp ? 'Create an Account' : 'Welcome to AgroQora'}
            </h1>
            <p className="text-sm text-white/50 mt-1">
              {step === 'phone'
                ? 'Enter your phone number to get started'
                : `OTP sent to ${countryCode} ${phoneNumber}`}
            </p>
          </div>

          {/* ═══ Step 1 — Phone Input ═══ */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="phone-input" className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  {/* Country Code Selector */}
                  <select
                    id="country-code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 w-[110px] rounded-xl bg-white/[0.08] border border-white/[0.12] text-white text-sm font-medium px-3 outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: 'none' }}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#1a2e23] text-white">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  {/* Phone Input */}
                  <Input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setError('');
                    }}
                    className="h-12 flex-1 rounded-xl bg-white/[0.08] border-white/[0.12] text-white placeholder:text-white/30 text-base focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/30"
                    autoComplete="tel"
                    autoFocus
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-400/20 animate-in fade-in slide-in-from-top-1 duration-300">
                  <span className="text-red-300 text-sm leading-relaxed">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={sending || !phoneNumber.trim()}
                className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending OTP…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Send OTP
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-[11px] text-center text-white/30 leading-relaxed">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-white/50 underline hover:text-white/70 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-white/50 underline hover:text-white/70 transition-colors">
                  Privacy Policy
                </Link>
              </p>

              <div className="pt-4 border-t border-white/10 text-center text-sm text-white/50">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors underline underline-offset-2"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
          )}

          {/* ═══ Step 2 — OTP Verification ═══ */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Verification Code
                </label>
                <div className="flex justify-center gap-2.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={idx === 0 ? handleOtpPaste : undefined}
                      className={`
                        w-11 h-14 text-center text-xl font-bold rounded-xl
                        bg-white/[0.08] border transition-all duration-200 outline-none text-white
                        ${digit
                          ? 'border-emerald-400/50 ring-1 ring-emerald-400/20 bg-white/[0.12]'
                          : 'border-white/[0.12] focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30'
                        }
                      `}
                      aria-label={`OTP digit ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-400/20 animate-in fade-in slide-in-from-top-1 duration-300">
                  <span className="text-red-300 text-sm leading-relaxed">{error}</span>
                </div>
              )}

              <Button
                onClick={() => handleVerifyOtp()}
                disabled={verifying || otp.some((d) => !d)}
                className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                {verifying ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Verify & Continue
                  </span>
                )}
              </Button>

              {/* Resend + Change number */}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtp(Array(OTP_LENGTH).fill(''));
                    setError('');
                  }}
                  className="text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
                >
                  Change number
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0 || sending}
                  className={`transition-colors underline underline-offset-2 ${
                    resendTimer > 0
                      ? 'text-white/25 cursor-not-allowed'
                      : 'text-emerald-400/80 hover:text-emerald-300 cursor-pointer'
                  }`}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/[0.06]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/60" />
            <span className="text-[11px] text-white/30 font-medium">Secured by Firebase Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}
