'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

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

type HotspotId = 'automation' | 'inventory' | 'security';

type ThreeMaterial = {
  emissiveIntensity?: number;
  color?: { setHSL: (h: number, s: number, l: number) => void };
};

type ThreeObject = {
  rotation: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
  material?: ThreeMaterial;
};

type ThreeMesh = ThreeObject & { material?: ThreeMaterial };

function WarehouseExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotId | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const sceneStateRef = useRef<{
    gsap: any;
    highlights: Record<HotspotId, ThreeObject[]>;
    resetHighlight: () => void;
    activeIntensity: Record<HotspotId, number>;
  } | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    const lowThreads = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const compactViewport = window.innerWidth < 768;

    if (reduceMotion || lowPower || lowThreads || compactViewport) {
      setUseFallback(true);
      setSceneReady(false);
      return;
    }

    let disposeScene = () => {};

    let mounted = true;

    async function init() {
      if (!containerRef.current) return;

      const start = performance.now();

      try {
        const [THREE, gsapModule] = await Promise.all([
          import(/* webpackIgnore: true */ 'https://cdn.skypack.dev/three@0.159.0?min'),
          import(/* webpackIgnore: true */ 'https://cdn.skypack.dev/gsap@3.12.5?min'),
        ]);
        if (!mounted || !containerRef.current) return;

        const gsap = (gsapModule as any).gsap || (gsapModule as any).default || gsapModule;

        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(
          28,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          100
        );
        camera.position.set(6, 4, 9);
        camera.lookAt(0, 1.5, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = false;
        containerRef.current.appendChild(renderer.domElement);

        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
          }
        });
        resizeObserver.observe(containerRef.current);

        const ambientLight = new THREE.AmbientLight(0xbfd3ff, 0.75);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x9ab8ff, 1.4);
        keyLight.position.set(4, 8, 6);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0x80eaff, 0.8);
        rimLight.position.set(-6, 4, -3);
        scene.add(rimLight);

        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.15,
          roughness: 0.4,
        });
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        scene.add(floor);

        const conveyorGroup = new THREE.Group();
        const beltMaterial = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.2, roughness: 0.5 });
        const belt = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 1.2), beltMaterial);
        belt.position.set(0, 1.2, 0);
        conveyorGroup.add(belt);

        const rollerMaterial = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.25 });
        for (let i = -3; i <= 3; i++) {
          const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 24), rollerMaterial);
          roller.rotation.z = Math.PI / 2;
          roller.position.set(i * 0.9, 1.05, 0);
          conveyorGroup.add(roller);
        }

        const packages: ThreeMesh[] = [];
        const packageMaterial = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 });
        for (let i = 0; i < 4; i++) {
          const pkg = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), packageMaterial.clone());
          pkg.position.set(-2 + i * 1.4, 1.5, 0);
          packages.push(pkg as ThreeMesh);
          conveyorGroup.add(pkg);
        }

        scene.add(conveyorGroup);

        const armGroup = new THREE.Group();
        armGroup.position.set(2.2, 1.2, -1.4);
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.4, 32), new THREE.MeshStandardMaterial({ color: 0x1e3a8a }));
        base.position.y = 0.2;
        armGroup.add(base);

        const shoulder = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 1.8, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.4 })
        );
        shoulder.position.y = 1.4;
        armGroup.add(shoulder);

        const forearmPivot = new THREE.Group();
        forearmPivot.position.set(0, 2.2, 0);
        armGroup.add(forearmPivot);

        const forearm = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 1.6, 0.45),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.3 })
        );
        forearm.position.y = 0.9;
        forearmPivot.add(forearm);

        const claw = new THREE.Mesh(
          new THREE.TorusGeometry(0.35, 0.1, 16, 32, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0xf0f9ff, emissive: 0x2563eb, emissiveIntensity: 0.2 })
        );
        claw.position.set(0, 1.7, 0);
        forearmPivot.add(claw);

        scene.add(armGroup);

        const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x312e81, metalness: 0.3, roughness: 0.5 });
        const rackGroup = new THREE.Group();
        rackGroup.position.set(-2.6, 1.5, -1.8);

        for (let level = 0; level < 3; level++) {
          const shelf = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.12, 1.2), rackMaterial);
          shelf.position.set(0, level * 1, 0);
          rackGroup.add(shelf);

          for (let column = 0; column < 3; column++) {
            const bin = new THREE.Mesh(
              new THREE.BoxGeometry(0.9, 0.7, 0.9),
              new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x312e81, emissiveIntensity: 0.05 })
            );
            bin.position.set(-1.2 + column * 1.2, level * 1 + 0.5, 0);
            rackGroup.add(bin);
          }
        }

        scene.add(rackGroup);

        const highlights: Record<HotspotId, ThreeObject[]> = {
          automation: [armGroup],
          inventory: rackGroup.children,
          security: [claw],
        };

        const activeIntensity = {
          automation: 0.9,
          inventory: 0.4,
          security: 1.1,
        } as const;

        const resetHighlight = () => {
          rackGroup.children.forEach((child) => {
            if ((child as ThreeMesh).material) {
              const material = (child as ThreeMesh).material as ThreeMaterial;
              material.emissiveIntensity = 0.05;
            }
          });
          (claw.material as ThreeMaterial).emissiveIntensity = 0.2;
        };

        sceneStateRef.current = {
          gsap,
          highlights,
          resetHighlight,
          activeIntensity,
        };

        const armTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
        const tweens: Array<any> = [armTimeline];
        armTimeline
          .to(shoulder.rotation, { z: 0.35, duration: 2.4, ease: 'sine.inOut' })
          .to(shoulder.rotation, { z: -0.3, duration: 2.4, ease: 'sine.inOut' })
          .to(shoulder.rotation, { z: 0, duration: 1.6, ease: 'sine.inOut' });

        tweens.push(
          gsap.to(forearmPivot.rotation, { x: 0.9, yoyo: true, repeat: -1, duration: 2.8, ease: 'sine.inOut' })
        );
        tweens.push(
          gsap.to(claw.position, { y: 1.4, yoyo: true, repeat: -1, duration: 2.8, ease: 'sine.inOut' })
        );

        packages.forEach((pkg, index) => {
          const duration = 6 + index * 0.3;
          tweens.push(
            gsap.to(pkg.position, {
              x: 2.6,
              repeat: -1,
              duration,
              ease: 'none',
              modifiers: {
                x: (x: string) => {
                  const numeric = parseFloat(x);
                  return numeric > 3 ? '-2.4' : x;
                },
              },
            })
          );
          tweens.push(
            gsap.to(pkg.rotation, {
              y: Math.PI * 2,
              repeat: -1,
              duration,
              ease: 'none',
            })
          );
        });

        let rafId: number;
        const clock = new THREE.Clock();

        const animate = () => {
          const elapsed = clock.getElapsedTime();
          belt.material.color.setHSL(0.6, 0.15, 0.18 + Math.sin(elapsed * 0.6) * 0.02);
          rackGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.08;
          renderer.render(scene, camera);
          rafId = renderer.getAnimationLoop()
            ? 0
            : requestAnimationFrame(animate);
        };

        if (renderer.getAnimationLoop()) {
          renderer.setAnimationLoop(() => {
            const elapsed = clock.getElapsedTime();
            belt.material.color.setHSL(0.6, 0.15, 0.18 + Math.sin(elapsed * 0.6) * 0.02);
            rackGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.08;
            renderer.render(scene, camera);
          });
        } else {
          animate();
        }

        disposeScene = () => {
          tweens.forEach((tween) => tween?.kill?.());
          if (renderer.getAnimationLoop()) {
            renderer.setAnimationLoop(null);
          } else {
            cancelAnimationFrame(rafId);
          }
          resizeObserver.disconnect();
          renderer.dispose();
          scene.clear();
          renderer.domElement.remove();
          sceneStateRef.current = null;
        };

        const readyTime = performance.now() - start;
        if (readyTime < 2000) {
          setSceneReady(true);
        } else {
          setSceneReady(false);
          setUseFallback(true);
          disposeScene();
        }
      } catch (error) {
        console.error('Failed to initialize warehouse visualization', error);
        setSceneReady(false);
        setUseFallback(true);
      }
    }

    init();

    return () => {
      mounted = false;
      disposeScene();
    };
  }, []);

  useEffect(() => {
    const state = sceneStateRef.current;
    if (!state) return;
    state.resetHighlight();
    if (!activeHotspot) return;

    const targets = state.highlights[activeHotspot] ?? [];
    const tweens = targets
      .filter((target) => 'material' in target && (target as ThreeMesh).material)
      .map((target) => {
        const mat = (target as ThreeMesh).material as ThreeMaterial;
        return state.gsap.to(mat, {
          emissiveIntensity: state.activeIntensity[activeHotspot],
          duration: 0.4,
          ease: 'sine.out',
        });
      });

    if (!tweens.length) {
      targets.forEach((target) => {
        state.gsap.to(target.rotation, { y: target.rotation.y + 0.3, duration: 0.6, ease: 'sine.out' });
      });
    }

    return () => {
      tweens.forEach((tween) => tween?.kill?.());
    };
  }, [activeHotspot]);

  useEffect(() => {
    if (!sceneReady) return;
    // light parallax background
    const node = containerRef.current;
    if (!node) return;

    const handlePointer = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      node.style.setProperty('--pointer-x', `${x}`);
      node.style.setProperty('--pointer-y', `${y}`);
    };

    node.addEventListener('pointermove', handlePointer);
    return () => node.removeEventListener('pointermove', handlePointer);
  }, [sceneReady]);

  return (
    <div className="relative isolate flex h-[420px] flex-1 flex-col overflow-hidden rounded-3xl bg-[#0d1023]/80 ring-1 ring-white/5 backdrop-blur-lg md:h-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,120,255,0.35),_transparent_60%)] transition-opacity duration-500" style={{ opacity: sceneReady ? 1 : 0.4 }} />
      <div className="absolute inset-0" ref={containerRef} aria-hidden={!sceneReady} />

      {useFallback ? (
        <div className="relative z-10 flex h-full flex-col items-start justify-end gap-4 px-8 py-10 text-white/70">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white/70">
            Immersive Logistics
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/70">
            Experience adaptive automation with real-time visibility, optimized for every device.
          </p>
        </div>
      ) : (
        <>
          {!sceneReady ? (
            <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-3 px-8 text-white/60">
              <div className="h-2 w-28 animate-pulse rounded-full bg-white/20" />
              <div className="h-2 w-40 animate-pulse rounded-full bg-white/10" />
              <div className="h-2 w-32 animate-pulse rounded-full bg-white/10" />
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-0" style={{
            background:
              'radial-gradient(circle at calc(var(--pointer-x,0.4)*100%) calc(var(--pointer-y,0.5)*100%), rgba(56,189,248,0.25), transparent 55%)',
            opacity: 0.6,
          }}
          />

          <div className="relative z-10 mt-auto grid gap-3 px-8 pb-8 text-sm text-white/80">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-300/80">Warehouse Intelligence</p>
            <p className="max-w-sm text-[13px] leading-6 text-white/70">
              Real-time automation, inventory orchestration, and biometric security unify your fulfillment network.
            </p>
          </div>

          <div className="pointer-events-auto absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-3 px-6">
            {[
              { id: 'automation', label: 'Robotic Automation' },
              { id: 'inventory', label: 'Inventory Flow' },
              { id: 'security', label: 'Secure Handling' },
            ].map((hotspot) => (
              <button
                key={hotspot.id}
                onMouseEnter={() => setActiveHotspot(hotspot.id as HotspotId)}
                onFocus={() => setActiveHotspot(hotspot.id as HotspotId)}
                onMouseLeave={() => setActiveHotspot(null)}
                onBlur={() => setActiveHotspot(null)}
                className={`group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-white/70 transition duration-300 hover:border-sky-400/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60`}
              >
                <span className="relative z-10">{hotspot.label}</span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/0 via-sky-400/20 to-sky-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </>
      )}
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
  const [form, setForm] = useState<FormState>({ identifier: '', password: '', storeId: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.identifier.trim()) {
      next.identifier = 'Enter your email or username to continue.';
    } else if (!/^[\w.+-]+@([\w-]+\.)+[\w-]+$/.test(form.identifier.trim()) && form.identifier.trim().length < 3) {
      next.identifier = 'Provide a valid email or username.';
    }

    if (!form.password) {
      next.password = 'Password cannot be empty.';
    } else if (form.password.length < 8) {
      next.password = 'Use at least 8 characters for security.';
    }

    if (!form.storeId.trim()) {
      next.storeId = 'Unique store ID is required.';
    } else if (!/^[a-zA-Z0-9-]{3,}$/.test(form.storeId.trim())) {
      next.storeId = 'Store ID should be alphanumeric (dashes allowed).';
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

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      setStatus('success');
      setMessage('Success! Redirecting to your workspace…');

      setTimeout(() => {
        window.location.href = 'http://localhost:3000';
      }, 900);
    } catch (error) {
      setStatus('error');
      setMessage("We couldn't verify those credentials. Try again or reset your password.");
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
              </div>
              <div className="grid gap-4 text-xs text-white/60">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500/90 shadow-[0_8px_24px_rgba(79,70,229,0.4)]" />
                  <div>
                    <p className="font-semibold text-white/80">Adaptive Capacity</p>
                    <p>Real-time load balancing with predictive alerts.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400/80 shadow-[0_8px_24px_rgba(14,165,233,0.35)]" />
                  <div>
                    <p className="font-semibold text-white/80">Quantum Sync</p>
                    <p>Inventory, production, and sales data unified instantly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative z-10 text-xs text-white/50">
            © {new Date().getFullYear()} Inventra ERP. Secure by design.
          </footer>
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
              disabled={status === 'validating'}
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
