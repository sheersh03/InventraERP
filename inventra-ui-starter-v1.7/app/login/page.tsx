'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type FormState = {
  identifier: string;
  password: string;
  storeId: string;
};

type FormStatus = 'idle' | 'validating' | 'success' | 'error';

type AnimatedFieldProps = {
  id: keyof FormState;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function WarehouseExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoaded(true), 480);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="relative isolate flex h-[420px] flex-1 flex-col overflow-hidden rounded-3xl bg-[#0d1023]/80 ring-1 ring-white/5 backdrop-blur-lg md:h-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,120,255,0.35),_transparent_60%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-10 md:py-12">
        {!isLoaded ? (
          <div role="status" aria-live="polite" className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-white/5 px-8 py-10 backdrop-blur-lg">
            <div className="h-3 w-28 animate-pulse rounded-full bg-white/15" />
            <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-32 animate-pulse rounded-full bg-white/10" />
            <span className="sr-only">Loading warehouse animation</span>
          </div>
        ) : (
          <figure
            className="warehouse-figure w-full max-w-md"
            role="img"
            aria-label="Animated illustration of an automated warehouse with robotics, conveyor belts, and drone delivery."
            data-animated={!shouldReduceMotion}
          >
            <svg className="w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="warehouse-floor" x1="0%" y1="0%" x2="100%" y2="60%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="tower" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1f3b8a" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <linearGradient id="belt" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="320" height="180" fill="url(#warehouse-floor)" rx="20" ry="20" opacity="0.95" />

              <g className="tower">
                <rect x="30" y="45" width="36" height="100" rx="10" fill="url(#tower)" opacity="0.62" />
                <rect x="38" y="55" width="20" height="15" rx="4" fill="#334155" />
                <rect x="38" y="78" width="20" height="15" rx="4" fill="#334155" />
                <rect x="38" y="101" width="20" height="15" rx="4" fill="#334155" />
                <rect x="38" y="124" width="20" height="15" rx="4" fill="#334155" />
              </g>

              <g className="shelves">
                {[0, 1, 2].map((level) => (
                  <g key={level} transform={`translate(90 ${55 + level * 32})`}>
                    <rect width="140" height="6" rx="2" fill="#1e3a8a" />
                    <g fill="#facc15" opacity="0.9">
                      <rect x="8" y="-20" width="28" height="24" rx="4" />
                      <rect x="46" y="-14" width="26" height="18" rx="4" />
                      <rect x="80" y="-22" width="28" height="26" rx="4" />
                      <rect x="116" y="-16" width="22" height="20" rx="4" />
                    </g>
                  </g>
                ))}
              </g>

              <g className="conveyor">
                <rect x="80" y="135" width="200" height="16" rx="8" fill="url(#belt)" />
                <g className="rollers" fill="#1e293b">
                  {[...Array(9)].map((_, index) => (
                    <rect key={index} x={85 + index * 22} y="130" width="4" height="26" rx="2" opacity="0.55" />
                  ))}
                </g>
                <g className="packages" fill="#f59e0b">
                  <g className="package package-a">
                    <rect x="92" y="120" width="32" height="22" rx="4" />
                    <rect x="92" y="120" width="32" height="10" rx="4" fill="#facc15" />
                  </g>
                  <g className="package package-b">
                    <rect x="148" y="120" width="30" height="22" rx="4" />
                    <rect x="148" y="120" width="30" height="10" rx="4" fill="#facc15" />
                  </g>
                  <g className="package package-c">
                    <rect x="204" y="120" width="34" height="22" rx="4" />
                    <rect x="204" y="120" width="34" height="10" rx="4" fill="#facc15" />
                  </g>
                </g>
              </g>

              <g className="forklift" transform="translate(160 110)">
                <rect x="-25" y="35" width="80" height="22" rx="11" fill="#0f172a" opacity="0.95" />
                <rect x="-15" y="10" width="54" height="32" rx="10" fill="#22d3ee" opacity="0.85" />
                <rect x="32" y="6" width="6" height="44" rx="2" fill="#1e293b" />
                <rect x="36" y="40" width="36" height="6" rx="3" fill="#eab308" />
                <circle cx="-3" cy="47" r="9" fill="#0f172a" stroke="#1f2937" strokeWidth="4" />
                <circle cx="33" cy="47" r="9" fill="#0f172a" stroke="#1f2937" strokeWidth="4" />
                <rect x="-8" y="16" width="16" height="12" rx="4" fill="#bae6fd" opacity="0.4" />
              </g>

              <g className="drone" transform="translate(250 55)">
                <rect x="-18" y="-6" width="36" height="14" rx="7" fill="#22d3ee" opacity="0.9" />
                <rect x="-10" y="6" width="20" height="18" rx="6" fill="#0ea5e9" opacity="0.9" />
                <rect x="-8" y="24" width="16" height="16" rx="4" fill="#facc15" />
                <rect x="-26" y="-12" width="20" height="4" rx="2" fill="#38bdf8" />
                <rect x="6" y="-12" width="20" height="4" rx="2" fill="#38bdf8" />
              </g>

              <g className="beams" opacity="0.25" stroke="#38bdf8" strokeWidth="1">
                {[0, 1, 2, 3].map((beam) => (
                  <path key={beam} d={`M0 ${20 + beam * 40} Q 160 ${10 + beam * 40}, 320 ${20 + beam * 40}`} fill="none" />
                ))}
              </g>
            </svg>
          </figure>
        )}
      </div>

      <style jsx>{`
        .warehouse-figure {
          position: relative;
          border-radius: 1.25rem;
          background: rgba(15, 23, 42, 0.45);
          box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.08);
          padding: 1.5rem;
          backdrop-filter: blur(20px);
        }

        .warehouse-figure svg {
          display: block;
          filter: drop-shadow(0 12px 32px rgba(14, 116, 144, 0.2));
        }

        .warehouse-figure[data-animated='true'] .forklift {
          animation: forklift-drive 4.2s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .warehouse-figure[data-animated='true'] .package {
          animation: package-shift 4s linear infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .warehouse-figure[data-animated='true'] .package-b {
          animation-delay: 0.8s;
        }

        .warehouse-figure[data-animated='true'] .package-c {
          animation-delay: 1.6s;
        }

        .warehouse-figure[data-animated='true'] .drone {
          animation: drone-hover 3.6s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .warehouse-figure[data-animated='true'] .beams path {
          stroke-dasharray: 6 12;
          animation: beam-flow 3.8s linear infinite;
        }

        @keyframes forklift-drive {
          0% {
            transform: translateX(-48px);
          }
          35% {
            transform: translateX(42px);
          }
          55% {
            transform: translateX(42px);
          }
          100% {
            transform: translateX(-48px);
          }
        }

        @keyframes package-shift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(90px);
          }
        }

        @keyframes drone-hover {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(10px) scale(1.03);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes beam-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -120;
          }
        }
      `}</style>
    </div>
  );
}


function AnimatedField({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  error,
}: AnimatedFieldProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <label className="block">
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ease-[var(--ease-standard)] ${
          error
            ? 'border-[#ff7b7b]/80 shadow-[0_0_0_2px_rgba(229,72,77,0.25)]'
            : focused
            ? 'border-[#7b6bff] shadow-[0_0_0_2px_rgba(90,73,240,0.45)]'
            : 'border-white/10'
        } bg-white/[0.02] backdrop-blur-sm`}
      >
        <div
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-[var(--ease-standard)] ${
            focused ? 'opacity-100' : ''
          }`}
          aria-hidden
        >
          <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/50 via-violet-400/40 to-sky-400/40 blur-2xl" />
        </div>
        <span
          className={`pointer-events-none absolute left-4 text-sm transition-all duration-300 ease-[var(--ease-standard)] ${
            isActive
              ? 'top-2 text-xs font-medium text-white/80'
              : 'top-1/2 -translate-y-1/2 text-sm text-white/60'
          }`}
        >
          {label}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className="relative z-10 w-full bg-transparent px-4 pb-3 pt-8 text-sm text-white outline-none transition-[filter] duration-300 ease-[var(--ease-standard)] placeholder:text-transparent focus:saturate-150"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-rose-300 transition-opacity duration-300 ease-[var(--ease-standard)]">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>({ identifier: '', password: '', storeId: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('Enter any credentials to continue while we finalize authentication.');
  const [shakeKey, setShakeKey] = useState(0);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.identifier.trim()) {
      next.identifier = 'Identifier is required.';
    }

    if (!form.password) {
      next.password = 'Password is required.';
    }

    if (!form.storeId.trim()) {
      next.storeId = 'Store ID is required.';
    }

    return next;
  }, [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setMessage('Please resolve the highlighted fields.');
      setShakeKey((value) => value + 1);
      return;
    }

    try {
      setStatus('validating');
      setMessage('Authenticating your workspace credentials…');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          identifier: form.identifier.trim(),
          password: form.password,
          storeId: form.storeId.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Temporary login could not be established.');
      }

      setStatus('success');
      setMessage(data.message || 'Temporary login active. Redirecting to your workspace…');

      const redirectTo = searchParams.get('redirectTo');
      const destination = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';

      setTimeout(() => {
        router.push(destination);
        router.refresh();
      }, 600);
    } catch (error) {
      console.error('Temporary login failed', error);
      setStatus('error');
      const fallback = error instanceof Error ? error.message : 'Mock authentication failed. Please try again.';
      setMessage(fallback);
      setShakeKey((value) => value + 1);
    }
  }

  const formAccentClass =
    status === 'success'
      ? 'border-emerald-400/70 shadow-[0_0_0_2px_rgba(52,211,153,0.4)]'
      : status === 'error'
      ? 'border-rose-400/70 shadow-[0_0_0_2px_rgba(248,113,113,0.35)]'
      : 'border-white/10 shadow-[0_10px_40px_rgba(15,23,42,0.45)]';

  const formAnimationClass =
    status === 'success'
      ? 'animate-[pulse_1.8s_ease-in-out_infinite]'
      : status === 'error'
      ? 'animate-[shake_420ms_cubic-bezier(.36,.07,.19,.97)_1]'
      : '';

  return (
    <main className="relative min-h-screen bg-[#05070f] px-4 py-10 text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-sky-500/20 via-blue-600/20 to-purple-500/20 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-stretch">
        <section className="relative flex flex-1 flex-col gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#13162b] via-[#13162b]/80 to-[#0a0d1f] p-10 shadow-[0_20px_60px_rgba(8,11,26,0.55)]">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -left-16 top-20 h-32 w-32 rounded-full bg-sky-400/40 blur-3xl" />
            <div className="absolute right-20 top-10 h-36 w-36 rounded-full bg-violet-500/40 blur-3xl" />
            <div className="absolute bottom-16 left-1/3 h-24 w-56 rotate-6 rounded-full bg-gradient-to-r from-indigo-400/30 to-sky-500/30 blur-2xl" />
          </div>
          <div className="relative z-10 flex flex-1 flex-col gap-8">
            <WarehouseExperience />
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white/80 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Inventra Access Portal
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight">Login to your workspace</h1>
                <p className="max-w-md text-sm leading-6 text-white/70">
                  Welcome to Inventra ERP — fast, collaborative, AI-native. Authenticate securely to continue orchestrating your multi-tenant operations.
                </p>
                <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-xs text-amber-100 shadow-[0_10px_30px_rgba(245,158,11,0.12)]">
                  Temporary login active: any identifier, password, and store ID will work until backend authentication is connected.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          key={shakeKey}
          className={`relative w-full max-w-md self-center overflow-hidden rounded-[32px] border bg-white/[0.04] px-8 py-10 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-emphasized)] ${formAccentClass} ${formAnimationClass}`}
        >
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 via-indigo-400/10 to-sky-400/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-blue-500/10 blur-3xl" aria-hidden />

          <header className="relative z-10 mb-8 space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-medium uppercase tracking-[0.2em] text-white/70">Access</span>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-white/50">Need an account?</span>
                <Link href="/signup" className="font-semibold text-sky-300 transition-colors duration-200 ease-[var(--ease-standard)] hover:text-sky-200">
                  Create one
                </Link>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Sign in</h2>
            <p className="text-sm text-white/60">Enter your credentials to continue to Inventra.</p>
          </header>

          <form className="relative z-10 space-y-5" onSubmit={handleSubmit} noValidate>
            <AnimatedField
              id="identifier"
              label="User ID or Email"
              autoComplete="username"
              value={form.identifier}
              onChange={(value) => setForm((prev) => ({ ...prev, identifier: value }))}
              error={errors.identifier}
            />
            <AnimatedField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
              error={errors.password}
            />
            <AnimatedField
              id="storeId"
              label="Unique Store ID"
              autoComplete="organization"
              value={form.storeId}
              onChange={(value) => setForm((prev) => ({ ...prev, storeId: value }))}
              error={errors.storeId}
            />

            <button
              type="submit"
              className={`group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(76,29,149,0.45)] transition-all duration-300 ease-[var(--ease-emphasized)] focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-70 ${
                status === 'success' ? 'animate-[pulse_1.6s_ease-in-out_infinite]' : ''
              }`}
              disabled={status === 'validating' || status === 'success'}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === 'validating' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Authenticating…
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                    Redirecting…
                  </>
                ) : (
                  'Sign in'
                )}
              </span>
              <span className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-emphasized)] group-hover:opacity-100">
                <span className="absolute inset-0 bg-white/10" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl" />
              </span>
            </button>
          </form>

          <div className="relative z-10 mt-6 min-h-[1.5rem] text-sm text-white/70" aria-live="polite" role="status">
            {message}
          </div>

          <div className="relative z-10 mt-8 flex items-center justify-between text-xs text-white/50">
            <Link href="/forgot-password" className="transition-colors duration-200 ease-[var(--ease-standard)] hover:text-white/80">
              Forgot password?
            </Link>
            <Link href="/support" className="transition-colors duration-200 ease-[var(--ease-standard)] hover:text-white/80">
              Need support?
            </Link>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </main>
  );
}
