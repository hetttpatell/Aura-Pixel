import { useEffect, useRef, useState } from 'react';

// Hook fallback
const useReducedMotion = () => {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mq.matches);
    }, []);
    return reduced;
};

const companies = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Partner ${i + 1}`,
    logo: `/logo-${i + 1}.PNG`
}));

const ScrollingCompany = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRef = useRef(null);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setTimeout(() => setIsScrolling(true), 600);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const logoItems = companies.map((company, index) => (
        <div
            key={company.id}
            className="logo-item-wrapper"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <img
                src={company.logo}
                alt={company.name}
                className="floating-logo"
                loading="lazy"
            />
        </div>
    ));

    return (
        <section
            ref={sectionRef}
            className={`partners-section ${isVisible ? 'visible' : ''}`}
        >
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="grid-overlay" />

            <div className="container">
                <div className={`badge ${isVisible ? 'badge-in' : ''}`}>
                    <span className="badge-dot" />
                    <span>Our Partners</span>
                </div>

                <h2 className={`heading ${isVisible ? 'heading-in' : ''}`}>
                    Trusted by{' '}
                    <span className="heading-gradient">Leading</span>{' '}
                    Brands
                </h2>

                <p className={`subtext ${isVisible ? 'subtext-in' : ''}`}>
                    We collaborate with visionary companies to deliver exceptional digital
                    experiences that drive growth and innovation worldwide.
                </p>

                <div className={`stats-row ${isVisible ? 'stats-in' : ''}`}>
                    {[
                        { value: '12+', label: 'Active Partners' },
                        { value: '150+', label: 'Happy Clients' },
                        { value: '98%', label: 'Satisfaction' },
                    ].map((stat, i) => (
                        <div className="stat-pill" key={i} style={{ animationDelay: `${400 + i * 100}ms` }}>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ticker-wrapper">
                <div className="fade-left" />
                <div className="fade-right" />

                <div className="ticker-track">
                    {[0, 1].map((dupIdx) => (
                        <div
                            key={dupIdx}
                            className={`ticker-set ${isScrolling && !prefersReduced ? 'scrolling' : ''}`}
                            aria-hidden={dupIdx > 0 ? 'true' : undefined}
                            style={{ opacity: isScrolling ? 1 : 0, transition: 'opacity 0.8s ease' }}
                        >
                            {logoItems}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .partners-section {
                    position: relative;
                    padding: 8rem 0 3rem; /* Reduced bottom padding */
                    background: linear-gradient(to bottom, #f8fcfc, #ffffff, #f8fcfc);
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(32px);
                    transition: opacity 1s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1);
                }
                .partners-section.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                }
                .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,124,124,0.08) 0%, transparent 70%); top: -100px; left: -100px; }
                .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%); bottom: -80px; right: -80px; }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(0,124,124,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,124,0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 100%);
                }

                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    text-align: center;
                    position: relative;
                    z-index: 10;
                    margin-bottom: 3.5rem; /* Reduced header margin */
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 20px;
                    background: rgba(0,124,124,0.08);
                    border: 1px solid rgba(0,124,124,0.15);
                    border-radius: 999px;
                    color: #007C7C;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin-bottom: 2rem;
                    opacity: 0;
                    transform: scale(0.9) translateY(10px);
                    transition: all 0.6s cubic-bezier(0.34,1.56,0.64,1);
                    backdrop-filter: blur(8px);
                }
                .badge.badge-in { opacity: 1; transform: scale(1) translateY(0); }
                .badge-dot { width: 6px; height: 6px; background: #007C7C; border-radius: 50%; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,124,124,0.3); } 70% { box-shadow: 0 0 0 10px rgba(0,124,124,0); } 100% { box-shadow: 0 0 0 0 rgba(0,124,124,0); } }

                .heading {
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 800;
                    color: #0f2d36;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.5rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease 0.2s;
                }
                .heading.heading-in { opacity: 1; transform: translateY(0); }
                .heading-gradient {
                    background: linear-gradient(to right, #007C7C, #0dd4d4, #007C7C);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 5s linear infinite;
                }
                @keyframes shimmer { to { background-position: 200% center; } }

                .subtext {
                    max-width: 600px;
                    margin: 0 auto 3rem;
                    color: #4a7070;
                    font-size: 1.15rem;
                    line-height: 1.6;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease 0.3s;
                }
                .subtext.subtext-in { opacity: 1; transform: translateY(0); }

                .stats-row { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; opacity: 0; transition: all 0.8s ease 0.4s; }
                .stats-row.stats-in { opacity: 1; }
                .stat-pill {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.7);
                    border: 1px solid rgba(0,124,124,0.1);
                    border-radius: 100px;
                    backdrop-filter: blur(10px);
                }
                .stat-value { font-size: 1.15rem; font-weight: 800; color: #007C7C; }
                .stat-label { font-size: 0.8rem; font-weight: 600; color: #4a7070; }

                .ticker-wrapper { position: relative; overflow: hidden; padding: 1.5rem 0; } /* Reduced ticker padding */
                .fade-left { left: 0; width: 300px; position: absolute; top: 0; bottom: 0; background: linear-gradient(to right, #ffffff, transparent); z-index: 10; }
                .fade-right { right: 0; width: 300px; position: absolute; top: 0; bottom: 0; background: linear-gradient(to left, #ffffff, transparent); z-index: 10; }

                .ticker-track { display: flex; }
                .ticker-set { display: flex; align-items: center; flex-shrink: 0; }
                .ticker-set.scrolling { animation: ticker 60s linear infinite; } /* Slower for extreme scale */
                @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-100%); } }

                .logo-item-wrapper {
                    flex-shrink: 0;
                    margin: 0 7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .floating-logo {
                    height: clamp(150px, 20vw, 300px); /* Extreme Branding Impact */
                    width: auto;
                    max-width: 500px;
                    object-fit: contain;
                    filter: drop-shadow(0 0 10px rgba(0,0,0,0.02));
                    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .logo-item-wrapper:hover .floating-logo {
                    transform: scale(1.08); /* Smaller scale effect because base size is already huge */
                    filter: drop-shadow(0 20px 40px rgba(0,124,124,0.15));
                }

                @media (max-width: 768px) {
                    .logo-item-wrapper { margin: 0 3rem; }
                    .floating-logo { height: 100px; }
                    .fade-left, .fade-right { width: 120px; }
                    .partners-section { padding: 6rem 0 3rem; }
                    .ticker-wrapper { padding: 2rem 0; }
                    .container { margin-bottom: 4rem; }
                }
            `}</style>
        </section>
    );
};

export default ScrollingCompany;
