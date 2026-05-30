import { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Utility: clamp ──────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// ─── Mandala / Rangoli SVG (decorative center motif) ────────────────────────
const RangoliMotif = ({ size = 240, opacity = 0.13 }) => {
  const petals = 16;
  const r1 = size * 0.42;
  const r2 = size * 0.26;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="rangoliGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B6508" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer petals */}
      {Array.from({ length: petals }, (_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r1;
        const y = cy + Math.sin(rad) * r1;
        return (
          <ellipse
            key={`op${i}`}
            cx={x}
            cy={y}
            rx={size * 0.06}
            ry={size * 0.14}
            transform={`rotate(${angle + 90}, ${x}, ${y})`}
            fill="#D4AF37"
            opacity={0.55}
          />
        );
      })}
      {/* Inner petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) + 22.5;
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r2;
        const y = cy + Math.sin(rad) * r2;
        return (
          <ellipse
            key={`ip${i}`}
            cx={x}
            cy={y}
            rx={size * 0.045}
            ry={size * 0.1}
            transform={`rotate(${angle + 90}, ${x}, ${y})`}
            fill="#FF8C00"
            opacity={0.6}
          />
        );
      })}
      {/* Rings */}
      <circle cx={cx} cy={cy} r={r1 * 0.62} fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity={0.5} />
      <circle cx={cx} cy={cy} r={r1 * 0.38} fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity={0.4} />
      <circle cx={cx} cy={cy} r={size * 0.085} fill="url(#rangoliGrad)" />
      <circle cx={cx} cy={cy} r={size * 0.04} fill="#FFD700" opacity={0.9} />
      {/* Dot ring */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        return (
          <circle
            key={`dot${i}`}
            cx={cx + Math.cos(angle) * r1 * 0.82}
            cy={cy + Math.sin(angle) * r1 * 0.82}
            r={size * 0.012}
            fill="#D4AF37"
            opacity={0.55}
          />
        );
      })}
    </svg>
  );
};

// ─── Floating Diya (lamp) SVG ────────────────────────────────────────────────
const Diya = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    {/* flame */}
    <ellipse cx="20" cy="11" rx="3.5" ry="5.5" fill="#FF8C00" opacity={0.9} />
    <ellipse cx="20" cy="13" rx="2" ry="3" fill="#FFD700" opacity={0.95} />
    {/* wick */}
    <line x1="20" y1="16" x2="20" y2="20" stroke="#8B4010" strokeWidth="1" />
    {/* bowl */}
    <path d="M11 22 Q13 30 20 31 Q27 30 29 22 Z" fill="#D4550A" />
    <path d="M12 22 Q14 28 20 29 Q26 28 28 22 Z" fill="#E8621A" />
    {/* oil sheen */}
    <ellipse cx="20" cy="23" rx="6.5" ry="1.8" fill="#FFD700" opacity={0.3} />
    {/* spout */}
    <path d="M28 22 Q33 21 32 25 Q30 27 26 24" fill="#D4550A" />
  </svg>
);

// ─── Marigold SVG ────────────────────────────────────────────────────────────
const Marigold = ({ size = 32, variant = 0 }) => {
  const outer = variant % 3 === 0 ? '#FF8C00' : variant % 3 === 1 ? '#FF5500' : '#FFB300';
  const inner = variant % 3 === 0 ? '#FFB300' : variant % 3 === 1 ? '#FF8C00' : '#FF6600';
  const pts = 14;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: pts }, (_, i) => {
        const deg = (i * 360) / pts;
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={22 + Math.cos(rad) * 14} cy={22 + Math.sin(rad) * 14}
            rx={4.5} ry={2.8}
            transform={`rotate(${deg + 90}, ${22 + Math.cos(rad) * 14}, ${22 + Math.sin(rad) * 14})`}
            fill={i % 2 === 0 ? outer : inner} opacity={0.95}
          />
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const deg = (i * 45);
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={`i${i}`}
            cx={22 + Math.cos(rad) * 8} cy={22 + Math.sin(rad) * 8}
            rx={3.5} ry={2}
            transform={`rotate(${deg + 90}, ${22 + Math.cos(rad) * 8}, ${22 + Math.sin(rad) * 8})`}
            fill={inner} opacity={0.85}
          />
        );
      })}
      <circle cx="22" cy="22" r="7" fill="#FFD700" />
      <circle cx="22" cy="22" r="4" fill="#E8A000" />
    </svg>
  );
};

// ─── Marigold Garland ─────────────────────────────────────────────────────────
const MarigoldGarland = ({ count = 13, width = 300 }) => {
  const pts = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return { x: t * width, y: Math.sin(t * Math.PI) * 22 };
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  return (
    <svg width={width} height={50} viewBox={`0 0 ${width} 50`} xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <path d={d} stroke="#8B6508" strokeWidth="1.2" fill="none" opacity={0.5} />
      {pts.map((p, i) => (
        <g key={i} transform={`translate(${p.x - 12}, ${p.y - 12})`}>
          <Marigold size={i === Math.floor(count / 2) ? 30 : 22} variant={i} />
        </g>
      ))}
    </svg>
  );
};

// ─── Toran (top archway decorative border) ────────────────────────────────────
const Toran = ({ isMobile }) => {
  const pts = isMobile ? 10 : 18;
  const clipPoints = Array.from({ length: pts * 2 + 2 }, (_, i) => {
    if (i === 0) return '0 0';
    if (i === pts * 2 + 1) return '100% 0';
    const idx = i - 1;
    const isDown = idx % 2 === 0;
    const pct = (idx / (pts * 2)) * 100;
    const y = isDown ? '88%' : '55%';
    return `${pct}% ${y}`;
  }).join(', ');

  return (
    <div
      className="absolute top-0 left-0 w-full z-20 pointer-events-none"
      style={{ height: isMobile ? '140px' : '180px' }}
    >
      {/* Main fabric */}
      <div
        className="w-full relative"
        style={{
          height: isMobile ? '110px' : '145px',
          background: 'linear-gradient(180deg, #7A0C0C 0%, #9E1515 50%, #6E0A0A 100%)',
          clipPath: `polygon(${clipPoints})`,
        }}
      >
        {/* Gold weave texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 10px, rgba(212,175,55,0.2) 10px, rgba(212,175,55,0.2) 11px)`,
        }} />
        {/* Top gold border */}
        <div className="absolute top-0 w-full h-[4px]" style={{
          background: 'linear-gradient(90deg, #8B6508, #FFD700, #D4AF37, #FFD700, #8B6508)'
        }} />
        {/* Bottom gold trim */}
        <div className="absolute bottom-0 w-full h-[3px]" style={{
          background: 'linear-gradient(90deg, #8B6508, #FFD700, #D4AF37, #FFD700, #8B6508)'
        }} />
        {/* Decorative dots */}
        <div className="absolute bottom-4 w-full flex justify-around px-6">
          {Array.from({ length: isMobile ? 10 : 20 }, (_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'radial-gradient(circle, #FFD700, #8B6508)' }} />
          ))}
        </div>
      </div>
      {/* Garland */}
      <div className="absolute left-0 w-full flex justify-center overflow-hidden"
        style={{ top: isMobile ? '78px' : '108px' }}>
        <div style={{ width: '98%' }}>
          <MarigoldGarland
            count={isMobile ? 9 : 15}
            width={typeof window !== 'undefined' ? window.innerWidth * 0.97 : 1200}
          />
        </div>
      </div>
      {/* Tassels */}
      <div className="absolute w-full flex justify-around px-2"
        style={{ top: isMobile ? '76px' : '105px' }}>
        {Array.from({ length: isMobile ? 14 : 26 }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-[2px]"
              style={{
                height: `${16 + (i % 4) * 5}px`,
                background: 'linear-gradient(180deg, #D4AF37, #8B6508)',
              }}
            />
            <div className="w-1.5 h-2 rounded-b-full" style={{ background: '#8B6508' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Particle canvas (floating petals + diyas) ───────────────────────────────
function useParticleCanvas(canvasRef, isMobile) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    let lastWidth = window.innerWidth;
    let resizeTimeout;
    const resize = () => {
      if (window.innerWidth === lastWidth) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        lastWidth = window.innerWidth;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }, 100);
    };
    
    // Initial resize
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    window.addEventListener('resize', resize);
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const colors = ['#FF8C00', '#FFB300', '#D4AF37', '#FFD700', '#FF6B35', '#E87415', '#FFCA4A'];
    const COUNT = isMobile ? 28 : 80;

    const petals = Array.from({ length: COUNT }, () => ({
      x: Math.random() * (W() || 800),
      y: Math.random() * (H() || 900),
      size: Math.random() * 5 + 1.5,
      vy: Math.random() * 0.45 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.012 + 0.003,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.018,
      alpha: Math.random() * 0.45 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      petal: Math.random() > 0.45,
    }));

    let t = 0;
    let isVisible = true;

    const draw = () => {
      if (!isVisible) return;
      t++;
      ctx.clearRect(0, 0, W(), H());
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * p.wobbleSpeed + p.wobble) * 0.35;
        p.rot += p.rotSpeed;
        if (p.y > H() + 12) { p.y = -12; p.x = Math.random() * W(); }
        if (p.x < -12) p.x = W() + 12;
        if (p.x > W() + 12) p.x = -12;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.petal) {
          ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
        } else {
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const wasVisible = isVisible;
        isVisible = entries[0].isIntersecting;
        if (isVisible && !wasVisible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else if (!isVisible) {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    draw();
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener('resize', resize); 
      observer.disconnect();
    };
  }, [canvasRef, isMobile]);
}

// ─── Hanging Bell ────────────────────────────────────────────────────────────
const Bell = forwardRef(({ style }, ref) => (
  <div ref={ref} className="flex flex-col items-center origin-top" style={{ ...style }}>
    <div style={{ width: 2, height: 56, background: 'linear-gradient(180deg, #D4AF37, #8B6508)', boxShadow: '0 0 4px rgba(212,175,55,0.4)' }} />
    <div style={{
      width: 36, height: 36,
      borderRadius: '50% 50% 48% 48% / 40% 40% 60% 60%',
      background: 'linear-gradient(135deg, #F9D423 0%, #D4AF37 50%, #8B6508 100%)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: 'linear-gradient(180deg, #D4AF37, #8B6508)',
        position: 'absolute', bottom: -5,
      }} />
    </div>
  </div>
));
Bell.displayName = 'Bell';

// ─── Animated text reveal util ───────────────────────────────────────────────
const CharReveal = ({ text, className, style, delay = 0 }) => (
  <span className={className} style={style}>
    {text.split('').map((ch, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          animation: `charFadeUp 0.6s ease forwards`,
          animationDelay: `${delay + i * 0.04}s`,
          opacity: 0,
          whiteSpace: ch === ' ' ? 'pre' : undefined,
        }}
      >
        {ch}
      </span>
    ))}
  </span>
);

// ─── Main WeddingHero ─────────────────────────────────────────────────────────
const WeddingHero = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const toranRef = useRef(null);
  const bellLeftRef = useRef(null);
  const bellRightRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const scrollLineRef = useRef(null);
  const mandalaRef = useRef(null);
  const leftDiyasRef = useRef(null);
  const rightDiyasRef = useRef(null);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [ready, setReady] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile((prev) => {
      const isNowMobile = window.innerWidth < 768;
      if (prev !== isNowMobile) return isNowMobile;
      return prev;
    });
  }, []);
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  useParticleCanvas(canvasRef, isMobile);

  // ─── Entrance animations ──────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Defensive targets
      const t = {
        toran: toranRef.current,
        canvas: canvasRef.current,
        content: contentRef.current,
        mandala: mandalaRef.current,
        bells: [bellLeftRef.current, bellRightRef.current].filter(Boolean),
        curtains: [curtainLeftRef.current, curtainRightRef.current].filter(Boolean),
        diyas: [leftDiyasRef.current, rightDiyasRef.current].filter(Boolean)
      };

      // Initial states
      if (t.toran) gsap.set(t.toran, { yPercent: -100, opacity: 0 });
      if (t.canvas) gsap.set(t.canvas, { opacity: 0 });
      if (t.content) gsap.set(t.content, { opacity: 0, y: 30 });
      if (t.mandala) gsap.set(t.mandala, { opacity: 0, scale: 0.7, rotation: -15 });
      if (t.bells.length) gsap.set(t.bells, { y: -80, opacity: 0 });
      if (t.curtains.length) gsap.set(t.curtains, { opacity: 0 });
      if (leftDiyasRef.current) gsap.set(leftDiyasRef.current, { opacity: 0, x: -20 });
      if (rightDiyasRef.current) gsap.set(rightDiyasRef.current, { opacity: 0, x: 20 });

      if (t.toran) tl.to(t.toran, { yPercent: 0, opacity: 1, duration: 1.2 }, 0.1);
      if (t.bells.length) tl.to(t.bells, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, 0.4);
      if (t.curtains.length) tl.to(t.curtains, { opacity: 1, duration: 1.4 }, 0.3);
      if (t.mandala) tl.to(t.mandala, { opacity: 1, scale: 1, rotation: 0, duration: 1.8, ease: 'back.out(1.4)' }, 0.6);
      if (t.canvas) tl.to(t.canvas, { opacity: 1, duration: 1.5 }, 0.5);
      if (t.content) tl.to(t.content, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.9);
      if (t.diyas.length) tl.to(t.diyas, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 }, 1.2);

      setReady(true);

      // Bell perpetual swing
      [bellLeftRef.current, bellRightRef.current].forEach((bell, i) => {
        if (!bell) return;
        gsap.to(bell, {
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 2.2 + i * 0.4,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'top center',
        });
      });

      // Mandala slow rotation
      if (mandalaRef.current) {
        gsap.to(mandalaRef.current, {
          rotation: 360,
          duration: 80,
          repeat: -1,
          ease: 'none',
        });
      }

      // Desktop scroll reveal — deferred until entrance animation completes
      // to prevent GSAP from capturing mid-animation transform values
      if (!isMobile) {
        const createScrollTimeline = () => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=130%',
              scrub: 1.2,
              pin: true,
            },
          });

          scrollTl
            .to(curtainLeftRef.current, { xPercent: -120, ease: 'power2.inOut' }, 0)
            .to(curtainRightRef.current, { xPercent: 120, ease: 'power2.inOut' }, 0)
            .to(toranRef.current, { y: -250, ease: 'power2.inOut' }, 0)
            .to([bellLeftRef.current, bellRightRef.current].filter(Boolean), { y: -200, opacity: 0, ease: 'power1.inOut', stagger: 0.05 }, 0)
            .to(canvasRef.current, { opacity: 0.4, ease: 'power1.inOut' }, 0);
        };

        // Wait for entrance timeline to finish before creating scroll triggers
        tl.eventCallback('onComplete', createScrollTimeline);

        // Mouse parallax (subtle)
        let mouseRaf;
        const onMouseMove = (e) => {
          if (!mandalaRef.current) return;
          cancelAnimationFrame(mouseRaf);
          mouseRaf = requestAnimationFrame(() => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            gsap.to(mandalaRef.current, { x: x * 18, y: y * 12, duration: 1.8, ease: 'power2.out', overwrite: 'auto' });
          });
        };
        window.addEventListener('mousemove', onMouseMove);
        self.add(() => {
          window.removeEventListener('mousemove', onMouseMove);
          cancelAnimationFrame(mouseRaf);
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden flex items-center justify-center`}
      style={{ backgroundColor: '#F5E6C0', minHeight: '100dvh' }}
    >

      {/* ══ Background layers ══ */}
      <div className="absolute inset-0 z-0">
        {/* Base warm gradient - Multi-layered for premium feel */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, #FDF7E2 0%, #F8EDD1 25%, #F5E6C0 60%, #EDD5A0 100%)'
        }} />
        
        {/* Subtle vignette for depth */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(139, 101, 8, 0.08) 70%, rgba(90, 20, 5, 0.15) 100%)'
        }} />

        {/* Professional Geometric Pattern (Centered) */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08]" 
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B6508' stroke-width='0.5' opacity='0.4'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z' /%3E%3Ccircle cx='40' cy='40' r='1.5' fill='%238B6508' fill-opacity='0.2' /%3E%3C/g%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.5' fill='%238B6508' fill-opacity='0.15' /%3E%3C/svg%3E")
            `,
            backgroundSize: '80px 80px, 20px 20px',
            backgroundPosition: 'center center',
            backgroundRepeat: 'repeat',
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 90%)',
          }} 
        />
      </div>

      {/* ══ Keyframe Animations ══ */}
      <style>{`
        @keyframes charFadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldPulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(212,175,55,0.4)); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 10px rgba(212,175,55,0.7)); opacity: 1; }
        }
        @keyframes diyaFlicker {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
      `}</style>

      {/* ══ Particle Canvas ══ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none w-full h-full"
        aria-hidden="true"
      />

      {/* ══ Left & Right Curtains ══ */}
      {/* Left curtain */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 h-full z-[18]"
        style={{ width: isMobile ? 52 : 'clamp(90px, 13vw, 180px)' }}
      >
        <div className="absolute inset-0" style={{
          background: `repeating-linear-gradient(90deg, #6E0A0A 0px, #8B1010 8px, #A51515 16px, #8B1010 24px, #6E0A0A 32px)`,
        }} />
        {/* Sheen */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,200,100,0.1) 60%, rgba(0,0,0,0.2) 100%)'
        }} />
        {/* Right edge gold trim */}
        <div className="absolute top-0 right-0 h-full w-[5px]" style={{
          background: 'linear-gradient(180deg, #8B6508, #FFD700, #D4AF37, #FFD700, #8B6508)'
        }} />
        {/* Marigold sprigs on curtain */}
        {!isMobile && (
          <div className="absolute top-[200px] right-[-8px] flex flex-col gap-4 z-10">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ opacity: 0.85 }}>
                <Marigold size={i % 2 === 0 ? 26 : 20} variant={i} />
              </div>
            ))}
          </div>
        )}
        {/* Decorative gems */}
        <div className="absolute top-0 right-3 h-full flex flex-col justify-around py-12">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="w-2 h-2 rounded-full mx-auto" style={{
              background: 'radial-gradient(circle, #FFD700, #B8860B)',
            }} />
          ))}
        </div>
        {/* Gold knot emblem */}
        <div
          className="absolute rounded-full border-[3px] border-[#D4AF37]"
          style={{
            top: '52%', right: '-10px',
            width: 28, height: 28,
            background: 'radial-gradient(circle, #FFD700, #8B6508)',
            boxShadow: '0 0 10px rgba(212,175,55,0.6)',
          }}
        />
      </div>

      {/* Right curtain */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 h-full z-[18]"
        style={{ width: isMobile ? 52 : 'clamp(90px, 13vw, 180px)' }}
      >
        <div className="absolute inset-0" style={{
          background: `repeating-linear-gradient(90deg, #6E0A0A 0px, #8B1010 8px, #A51515 16px, #8B1010 24px, #6E0A0A 32px)`,
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(270deg, rgba(0,0,0,0.3) 0%, rgba(255,200,100,0.1) 60%, rgba(0,0,0,0.2) 100%)'
        }} />
        <div className="absolute top-0 left-0 h-full w-[5px]" style={{
          background: 'linear-gradient(180deg, #8B6508, #FFD700, #D4AF37, #FFD700, #8B6508)'
        }} />
        {!isMobile && (
          <div className="absolute top-[200px] left-[-8px] flex flex-col gap-4 z-10">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} style={{ opacity: 0.85 }}>
                <Marigold size={i % 2 === 0 ? 26 : 20} variant={i + 2} />
              </div>
            ))}
          </div>
        )}
        <div className="absolute top-0 left-3 h-full flex flex-col justify-around py-12">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="w-2 h-2 rounded-full mx-auto" style={{
              background: 'radial-gradient(circle, #FFD700, #B8860B)',
            }} />
          ))}
        </div>
        <div
          className="absolute rounded-full border-[3px] border-[#D4AF37]"
          style={{
            top: '52%', left: '-10px',
            width: 28, height: 28,
            background: 'radial-gradient(circle, #FFD700, #8B6508)',
            boxShadow: '0 0 10px rgba(212,175,55,0.6)',
          }}
        />
      </div>

      {/* ══ Toran ══ */}
      <div 
        ref={toranRef} 
        className="absolute top-0 left-0 w-full z-[22] pointer-events-none origin-top"
        style={{ height: isMobile ? '140px' : '180px' }}
      >
        <Toran isMobile={isMobile} />
      </div>

      {/* ══ Hanging Bells ══ */}
      <div className="absolute top-0 w-full z-[21] pointer-events-none flex justify-center gap-[22vw] md:gap-[18vw]"
        style={{ paddingTop: isMobile ? '0px' : '2px' }}>
        <Bell ref={bellLeftRef} style={{ position: 'relative' }} />
        <Bell ref={bellRightRef} style={{ position: 'relative' }} />
      </div>

      {/* ══ Center Mandala / Rangoli ══ */}
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '80vw' : '55vw',
          maxWidth: 620,
        }}
      >
        <div
          ref={mandalaRef}
          aria-hidden="true"
        >
          <RangoliMotif
            size={typeof window !== 'undefined' ? Math.min(window.innerWidth * (isMobile ? 0.8 : 0.55), 620) : 480}
            opacity={0.15}
          />
        </div>
      </div>

      {/* ══ Floating Diyas (left & right of content, desktop) ══ */}
      {!isMobile && (
        <>
          <div ref={leftDiyasRef} className="absolute left-[16%] top-[50%] -translate-y-1/2 z-[8] flex flex-col gap-8 opacity-70">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{ animation: `diyaFlicker ${1.4 + i * 0.3}s ease-in-out infinite alternate` }}>
                <Diya size={22 + i * 2} />
              </div>
            ))}
          </div>
          <div ref={rightDiyasRef} className="absolute right-[16%] top-[50%] -translate-y-1/2 z-[8] flex flex-col gap-8 opacity-70">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{ animation: `diyaFlicker ${1.6 + i * 0.35}s ease-in-out infinite alternate` }}>
                <Diya size={22 + i * 2} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ══ Hero Content ══ */}
      <div
        ref={contentRef}
        className="relative z-[10] flex flex-col items-center text-center pointer-events-none"
        style={{
          marginTop: isMobile ? '40px' : '0px',
          padding: isMobile ? '0 40px' : '0 200px',
          maxWidth: '100%',
        }}
      >
        {/* OM / Mangal symbol */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: isMobile ? '28px' : '38px',
            color: '#C4762A',
            opacity: 0.85,
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginBottom: isMobile ? '10px' : '14px',
            animation: ready ? 'goldPulse 3s ease-in-out infinite' : 'none',
          }}
          aria-label="Om symbol"
        >
          ॐ
        </div>

        {/* Thin gold line ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 14 : 20 }}>
          <div style={{ width: isMobile ? 30 : 50, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4AF37', opacity: 0.8 }} />
          <div style={{ width: isMobile ? 30 : 50, height: 1, background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </div>

        {/* Brand tagline */}
        <p style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: isMobile ? '9px' : '10px',
          letterSpacing: isMobile ? '0.35em' : '0.45em',
          textTransform: 'uppercase',
          color: '#8B6508',
          opacity: 0.9,
          marginBottom: isMobile ? 12 : 18,
          fontWeight: 500,
        }}>
          Aura Pixel • Weddings
        </p>

        {/* Main brand logo image */}
        <div style={{
          marginBottom: isMobile ? 16 : 24,
          maxWidth: isMobile ? '280px' : '480px',
          width: '100%',
          filter: 'drop-shadow(0 4px 20px rgba(61, 26, 6, 0.1))'
        }}>
          <img 
            src="/wedding.png" 
            alt="Wedding Pixel" 
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block'
            }} 
          />
        </div>

        {/* Sanskrit/Hindi script decorative subtitle */}
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: isMobile ? '12px' : '14px',
          color: '#9E4A1A',
          opacity: 0.7,
          letterSpacing: '0.15em',
          marginBottom: isMobile ? 16 : 24,
          fontStyle: 'italic',
        }}>
          शादी की यादें, हमेशा के लिए
        </p>

        {/* Descriptor line */}
        <p style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: isMobile ? '11px' : '13px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#7A4010',
          opacity: 0.75,
          marginBottom: 0,
        }}>
          Crafting timeless stories
        </p>

        {/* Bottom ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: isMobile ? 18 : 28 }}>
          <div style={{ width: isMobile ? 24 : 40, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <Marigold size={isMobile ? 18 : 22} variant={0} />
          <div style={{ width: isMobile ? 4 : 5, height: isMobile ? 4 : 5, borderRadius: '50%', background: '#D4AF37', opacity: 0.8 }} />
          <Marigold size={isMobile ? 18 : 22} variant={1} />
          <div style={{ width: isMobile ? 24 : 40, height: 1, background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </div>

        {/* Mobile: scattered floor flowers */}
        {isMobile && (
          <div style={{ display: 'flex', gap: 14, marginTop: 20, opacity: 0.6 }}>
            {[0, 1, 2].map(i => <Marigold key={i} size={16} variant={i} />)}
          </div>
        )}
      </div>

      {/* ══ Scroll Indicator (desktop) ══ */}
      {!isMobile && (
        <div
          ref={scrollLineRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-[20] pointer-events-none"
          style={{ animation: ready ? 'fadeInUp 0.8s 2s ease both' : 'none' }}
        >
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '9px',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#B8860B',
            marginBottom: 10,
            opacity: 0.8,
          }}>
            Enter Pheras
          </p>
          <div style={{
            width: 1.5,
            height: 60,
            background: 'rgba(184,134,11,0.18)',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(180deg, #D4AF37, transparent)',
              animation: 'scrollPulse 2.2s ease-in-out infinite',
            }} />
          </div>
        </div>
      )}

      {/* ══ Bottom vignette fade ══ */}
      <div
        className="absolute bottom-0 left-0 w-full z-[4] pointer-events-none"
        style={{
          height: isMobile ? '80px' : '100px',
          background: 'linear-gradient(to top, #F5E6C0 0%, transparent 100%)',
        }}
      />

      {/* ══ Floor marigold scatter (desktop) ══ */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 w-full z-[5] pointer-events-none flex px-32 pb-2" style={{ opacity: 0.45 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${7 + i * 12}%`,
                bottom: `${6 + (i % 3) * 14}px`,
                transform: `rotate(${(i * 41) % 360}deg)`,
              }}
            >
              <Marigold size={16 + (i % 4) * 5} variant={i} />
            </div>
          ))}
        </div>
      )}

      {/* ══ Global keyframes ══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes goldPulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes diyaFlicker {
          0%   { opacity: 0.55; transform: translateY(0px); }
          100% { opacity: 0.85; transform: translateY(-3px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0)    translateX(-50%); }
        }
        @keyframes charFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WeddingHero;