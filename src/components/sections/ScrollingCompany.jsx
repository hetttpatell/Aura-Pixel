import { useEffect, useRef, useState, useMemo } from 'react';

/* ─── Data ─────────────────────────────────────────────────────── */
const companies = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Partner ${i + 1}`,
    logo: `/logo-${i + 1}.PNG`,
}));

const stats = [
    { value: '16+', label: 'Active Partners' },
    { value: '150+', label: 'Happy Clients' },
    { value: '98%', label: 'Satisfaction' },
];

/* ─── Reduced‑motion hook ───────────────────────────────────────── */
const useReducedMotion = () => {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
        const handler = (e) => setReduced(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return reduced;
};

/* ─── Logo Card ─────────────────────────────────────────────────── */
const LogoCard = ({ company, prefixKey }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError) return null;

    return (
        <div key={`${prefixKey}-${company.id}`} className="sc-logo-item">
            <div className="sc-logo-inner">
                <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="sc-logo-img"
                    loading="lazy"
                    draggable={false}
                    onError={() => setImgError(true)}
                />
            </div>
        </div>
    );
};

/* ─── Component ─────────────────────────────────────────────────── */
const ScrollingCompany = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [tickerReady, setTickerReady] = useState(false);
    const sectionRef = useRef(null);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setTimeout(() => setTickerReady(true), 700);
                }
            },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    /*
     * FIX: Build logo items per-set with unique keys.
     * Previously, logoItems was built once and reused in both sets,
     * causing duplicate React keys and silent de-duplication of logos 14–16.
     */
    const logoSets = useMemo(() =>
        [0, 1].map((setIdx) =>
            companies.map((company) => (
                <LogoCard
                    key={`set${setIdx}-logo${company.id}`}
                    company={company}
                    prefixKey={`set${setIdx}`}
                />
            ))
        ),
        []);

    return (
        <section
            ref={sectionRef}
            id="partners"
            aria-label="Our trusted brand partners"
            className={`sc-section ${isVisible ? 'sc-section--visible' : ''}`}
        >
            {/* ── Decorative background ── */}
            <div className="sc-orb sc-orb--tl" aria-hidden="true" />
            <div className="sc-orb sc-orb--br" aria-hidden="true" />
            <div className="sc-grid-bg" aria-hidden="true" />

            {/* ── Header ── */}
            <div className="sc-container">
                {/* FIX: role="doc-subtitle" is for ePub — removed */}
                <div className={`sc-badge ${isVisible ? 'sc-badge--in' : ''}`}>
                    <span className="sc-badge__dot" aria-hidden="true" />
                    <span>Our Partners</span>
                </div>

                <h2 className={`sc-heading ${isVisible ? 'sc-heading--in' : ''}`}>
                    Trusted by{' '}
                    <span className="sc-heading__gradient">Leading</span>{' '}
                    Brands
                </h2>

                <p className={`sc-subtext ${isVisible ? 'sc-subtext--in' : ''}`}>
                    We collaborate with visionary companies to deliver exceptional digital
                    experiences that drive measurable growth and lasting impact.
                </p>

                <div
                    className={`sc-stats ${isVisible ? 'sc-stats--in' : ''}`}
                    aria-label="Partnership statistics"
                >
                    {stats.map((stat, i) => (
                        <div
                            className="sc-stat-pill"
                            key={stat.label}
                            /* FIX: Pass delay as CSS custom property so the CSS var(--delay) actually works */
                            style={{ '--sc-delay': `${0.5 + i * 0.12}s` }}
                        >
                            <span className="sc-stat-pill__value">{stat.value}</span>
                            <span className="sc-stat-pill__sep" aria-hidden="true" />
                            <span className="sc-stat-pill__label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Ticker ── */}
            <div
                className={`sc-ticker-wrap ${tickerReady ? 'sc-ticker-wrap--ready' : ''}`}
                aria-label="Scrolling partner logos"
                role="region"
            >
                <div className="sc-fade sc-fade--left" aria-hidden="true" />
                <div className="sc-fade sc-fade--right" aria-hidden="true" />

                <div className="sc-ticker-track">
                    {/* FIX: Each set gets its own array of logo cards with unique keys */}
                    {logoSets.map((logoItems, dupIdx) => (
                        <div
                            key={dupIdx}
                            className={`sc-ticker-set ${tickerReady && !prefersReduced ? 'sc-ticker-set--scrolling' : ''}`}
                            /* FIX: boolean true instead of string 'true' for aria-hidden */
                            aria-hidden={dupIdx > 0 ? true : undefined}
                        >
                            {logoItems}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="sc-divider" aria-hidden="true" />

            {/* ──────── Scoped CSS ──────── */}
            <style>{`
                /* ── Section shell ── */
                .sc-section {
                    position: relative;
                    padding: 7rem 0 5rem;
                    background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 40%, #f0f4f8 100%);
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(28px);
                    transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1),
                                transform 0.9s cubic-bezier(0.4,0,0.2,1);
                }
                .sc-section--visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ── Decorative orbs ── */
                .sc-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                }
                .sc-orb--tl {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(0,128,128,0.08) 0%, transparent 70%);
                    top: -150px; left: -100px;
                }
                .sc-orb--br {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(0,128,128,0.06) 0%, transparent 70%);
                    bottom: -100px; right: -80px;
                }

                /* ── Dot grid ── */
                .sc-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(0,128,128,0.07) 1px, transparent 1px);
                    background-size: 38px 38px;
                    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%);
                    pointer-events: none;
                    z-index: 0;
                }

                /* ── Container ── */
                .sc-container {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    text-align: center;
                    margin-bottom: 3.5rem;
                }

                /* ── Badge ── */
                .sc-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 20px;
                    background: rgba(0,128,128,0.07);
                    border: 1px solid rgba(0,128,128,0.18);
                    border-radius: 999px;
                    color: #008080;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                    opacity: 0;
                    transform: translateY(12px) scale(0.94);
                    transition: opacity 0.55s cubic-bezier(0.34,1.56,0.64,1),
                                transform 0.55s cubic-bezier(0.34,1.56,0.64,1);
                    backdrop-filter: blur(8px);
                    box-shadow: 0 2px 12px rgba(0,128,128,0.08);
                }
                .sc-badge--in {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                .sc-badge__dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #008080;
                    animation: sc-pulse 2.2s ease infinite;
                }
                @keyframes sc-pulse {
                    0%   { box-shadow: 0 0 0 0   rgba(0,128,128,0.4); }
                    70%  { box-shadow: 0 0 0 9px rgba(0,128,128,0); }
                    100% { box-shadow: 0 0 0 0   rgba(0,128,128,0); }
                }

                /* ── Heading ── */
                .sc-heading {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: clamp(2.2rem, 5vw, 3.5rem);
                    font-weight: 800;
                    color: #0f172a;
                    line-height: 1.15;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.1rem;
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
                }
                .sc-heading--in { opacity: 1; transform: translateY(0); }
                .sc-heading__gradient {
                    background: linear-gradient(130deg, #007a7a 0%, #00b5b5 50%, #005f5f 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: sc-shimmer 5s linear infinite;
                }
                @keyframes sc-shimmer { to { background-position: 200% center; } }

                /* ── Subtext ── */
                .sc-subtext {
                    font-family: 'Inter', sans-serif;
                    max-width: 560px;
                    margin: 0 auto 2.25rem;
                    color: #4a5568;
                    font-size: clamp(0.9rem, 2vw, 1.05rem);
                    line-height: 1.75;
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
                }
                .sc-subtext--in { opacity: 1; transform: translateY(0); }

                /* ── Stats pills ── */
                .sc-stats {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.875rem;
                    flex-wrap: wrap;
                    opacity: 0;
                    transform: translateY(14px);
                    transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
                }
                .sc-stats--in { opacity: 1; transform: translateY(0); }

                .sc-stat-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.9);
                    border: 1px solid rgba(0,128,128,0.13);
                    border-radius: 100px;
                    backdrop-filter: blur(14px);
                    box-shadow: 0 2px 16px rgba(0,128,128,0.07), 0 1px 3px rgba(0,0,0,0.04);
                    /* FIX: Single transition — no duplicate property, no conflict */
                    transition: opacity 0.6s ease var(--sc-delay, 0.5s),
                                transform 0.6s cubic-bezier(0.34,1.4,0.64,1) var(--sc-delay, 0.5s),
                                box-shadow 0.28s ease,
                                border-color 0.28s ease;
                    opacity: 0;
                    transform: translateY(10px);
                    cursor: default;
                }
                /* FIX: Stagger enter via --sc-delay CSS var (set inline via style prop) */
                .sc-stats--in .sc-stat-pill {
                    opacity: 1;
                    transform: translateY(0);
                }
                .sc-stat-pill:hover {
                    box-shadow: 0 8px 28px rgba(0,128,128,0.14);
                    transform: translateY(-3px) !important;
                    border-color: rgba(0,128,128,0.25);
                }
                .sc-stat-pill__value {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #008080;
                    letter-spacing: -0.02em;
                }
                .sc-stat-pill__sep {
                    width: 1px;
                    height: 20px;
                    background: rgba(0,128,128,0.2);
                    border-radius: 1px;
                    flex-shrink: 0;
                }
                .sc-stat-pill__label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #475569;
                    letter-spacing: 0.01em;
                    white-space: nowrap;
                }

                /* ── Ticker wrapper ── */
                .sc-ticker-wrap {
                    position: relative;
                    overflow: hidden;
                    padding: 2.5rem 0;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                }
                .sc-ticker-wrap--ready {
                    opacity: 1;
                }

                /* Gradient fade masks — match section background exactly */
                .sc-fade {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 220px;
                    z-index: 10;
                    pointer-events: none;
                }
                .sc-fade--left  {
                    left: 0;
                    background: linear-gradient(to right,
                        #f0f4f8 0%,
                        rgba(240,244,248,0.85) 40%,
                        transparent 100%
                    );
                }
                .sc-fade--right {
                    right: 0;
                    background: linear-gradient(to left,
                        #f0f4f8 0%,
                        rgba(240,244,248,0.85) 40%,
                        transparent 100%
                    );
                }

                /* ── Track & sets ── */
                .sc-ticker-track {
                    display: flex;
                    align-items: center;
                    width: max-content;
                }

                .sc-ticker-set {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }
                /* FIX: Added will-change for GPU compositing — smooth 60fps scroll */
                .sc-ticker-set--scrolling {
                    animation: sc-ticker 35s linear infinite; 
                    will-change: transform;
                }
                @keyframes sc-ticker {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-100%); }
                }
                /* Pause on hover */
                .sc-ticker-wrap:hover .sc-ticker-set--scrolling {
                    animation-play-state: paused;
                }

                /* ── Logo card ── */
                .sc-logo-item {
                    flex-shrink: 0;
                    margin: 0 1.4rem;
                    width: 420px;
                    height: 280px;
                    background: rgba(255,255,255,0.96);
                    border: 1px solid rgba(0,0,0,0.07);
                    border-radius: 16px;
                    /* FIX: backdrop-filter removed — parent has overflow:hidden so it had no effect */
                    box-shadow:
                        0 1px 2px rgba(0,0,0,0.04),
                        0 4px 16px rgba(0,0,0,0.06),
                        inset 0 1px 0 rgba(255,255,255,1);
                    transition:
                        box-shadow 0.3s ease,
                        transform 0.3s cubic-bezier(0.34,1.4,0.64,1),
                        border-color 0.3s ease;
                    /* FIX: cursor: pointer since hover effects suggest interactivity */
                    cursor: pointer;
                    overflow: hidden;
                }
                .sc-logo-item:hover {
                    box-shadow:
                        0 2px 4px rgba(0,0,0,0.04),
                        0 12px 32px rgba(0,128,128,0.14),
                        inset 0 1px 0 rgba(255,255,255,1);
                    transform: translateY(-5px) scale(1.02);
                    border-color: rgba(0,128,128,0.22);
                }

                /* ── Logo inner frame ── */
                .sc-logo-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 28px 36px;
                    box-sizing: border-box;
                }

                .sc-logo-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    filter: grayscale(0.1) contrast(1.02) drop-shadow(0 1px 3px rgba(0,0,0,0.08));
                    transition: filter 0.3s ease, transform 0.3s ease;
                    display: block;
                    /* FIX: crisp-edges was causing pixel-art rendering on smooth logos — removed */
                    image-rendering: auto;
                }
                .sc-logo-item:hover .sc-logo-img {
                    filter: grayscale(0) contrast(1.05) drop-shadow(0 4px 12px rgba(0,128,128,0.18));
                    transform: scale(1.04);
                }

                /* ── Bottom divider ── */
                .sc-divider {
                    max-width: 1280px;
                    margin: 0 auto;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(0,128,128,0.15), transparent);
                }

                /* ── Tablet ── */
                @media (max-width: 1024px) {
                    .sc-fade { width: 160px; }
                }

                /* ── Mobile ── */
                @media (max-width: 768px) {
                    .sc-section { padding: 5rem 0 3.5rem; }
                    .sc-container { padding: 0 1.25rem; margin-bottom: 2.5rem; }

                    .sc-fade { width: 80px; }

                    .sc-logo-item {
                        margin: 0 0.75rem;
                        width: 200px;
                        height: 130px;
                        border-radius: 12px;
                    }
                    .sc-logo-inner { padding: 20px 24px; }

                    .sc-stats { gap: 0.5rem; }
                    .sc-stat-pill { padding: 9px 16px; gap: 10px; }
                    .sc-stat-pill__value { font-size: 0.98rem; }
                    .sc-stat-pill__label { font-size: 0.73rem; }

                    .sc-orb--tl { width: 280px; height: 280px; top: -90px; left: -70px; }
                    .sc-orb--br { width: 220px; height: 220px; }
                }

                @media (max-width: 480px) {
                    .sc-heading { font-size: 2rem; }
                    .sc-logo-item {
                        margin: 0 0.6rem;
                        width: 160px;
                        height: 106px;
                        border-radius: 10px;
                    }
                    .sc-logo-inner { padding: 16px 20px; }
                    .sc-fade { width: 50px; }
                }

                /* ── Reduced motion ── */
                @media (prefers-reduced-motion: reduce) {
                    .sc-ticker-set--scrolling { animation: none; }
                    .sc-badge__dot { animation: none; }
                    .sc-heading__gradient { animation: none; }
                    .sc-section,
                    .sc-badge,
                    .sc-heading,
                    .sc-subtext,
                    .sc-stats,
                    .sc-stat-pill {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default ScrollingCompany;