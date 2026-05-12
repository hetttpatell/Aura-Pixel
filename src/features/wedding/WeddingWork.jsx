import React, { useEffect, useRef, useState } from 'react';

const portfolioItems = [
  {
    title: "The Royal Affair",
    subtitle: "Udaipur, Rajasthan",
    description: "A celebration of love amidst historic palaces and serene lakes. Every frame tells a story etched in royalty.",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2940&auto=format&fit=crop",
    accent: "#D4AF37",
    tag: "Destination Wedding",
    number: "01",
  },
  {
    title: "Eternal Vows",
    subtitle: "Jaipur, Rajasthan",
    description: "Traditional ceremonies captured with an editorial eye. Rituals reimagined through the lens of timeless beauty.",
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=3174&auto=format&fit=crop",
    accent: "#A8C5A0",
    tag: "Traditional Ceremony",
    number: "02",
  },
  {
    title: "Sacred Fire",
    subtitle: "Mumbai, Maharashtra",
    description: "Intimate and cinematic Phere moments. The eternal bond between souls captured in warmth and light.",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2913&auto=format&fit=crop",
    accent: "#E8A87C",
    tag: "Pheras & Rituals",
    number: "03",
  },
  {
    title: "Vibrant Haldi",
    subtitle: "Ahmedabad, Gujarat",
    description: "Pure emotion and vibrant hues of the Haldi ceremony — where joy is worn on every face, every hand.",
    src: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=2940&auto=format&fit=crop",
    accent: "#F5C842",
    tag: "Pre-Wedding",
    number: "04",
  },
];

const WeddingWork = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (i) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ left: i * container.offsetWidth, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ww-section {
          background: #0D0A08;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .ww-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
        }

        .ww-header {
          padding: 80px 60px 48px;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .ww-header.visible { opacity: 1; transform: translateY(0); }

        .ww-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #7A6A5A;
          margin-bottom: 16px;
        }

        .ww-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 400;
          color: #F0EAE0;
          line-height: 0.92;
          margin: 0;
        }
        .ww-title em {
          font-style: italic;
          color: #D4AF37;
        }

        .ww-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: #4A3F35;
          text-transform: uppercase;
        }

        /* Scroll container */
        .ww-track {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 60px;
          gap: 24px;
          position: relative;
          z-index: 5;
          padding-bottom: 60px;
        }
        .ww-track::-webkit-scrollbar { display: none; }

        .ww-card {
          scroll-snap-align: center;
          flex: 0 0 calc(70vw);
          max-width: 880px;
          min-width: 320px;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ww-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/2;
          overflow: hidden;
        }

        .ww-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
          filter: saturate(0.7) brightness(0.85);
          transform: scale(1.08);
        }
        .ww-card.active .ww-card-img {
          filter: saturate(1) brightness(0.9);
          transform: scale(1);
        }

        /* Overlay gradient */
        .ww-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 30%,
            rgba(8, 5, 3, 0.2) 60%,
            rgba(8, 5, 3, 0.85) 100%
          );
          transition: opacity 0.6s ease;
        }
        .ww-card:not(.active) .ww-card-overlay {
          background: linear-gradient(
            to bottom,
            rgba(8,5,3,0.3) 0%,
            rgba(8, 5, 3, 0.75) 100%
          );
        }

        /* Card number stamp */
        .ww-card-num {
          position: absolute;
          top: 28px;
          left: 28px;
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(240,234,224,0.5);
          transition: color 0.6s ease;
        }
        .ww-card.active .ww-card-num {
          color: rgba(240,234,224,0.9);
        }

        /* Tag pill */
        .ww-card-tag {
          position: absolute;
          top: 28px;
          right: 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(240,234,224,0.55);
          border: 1px solid rgba(240,234,224,0.15);
          padding: 6px 12px;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          transition: all 0.6s ease;
        }
        .ww-card.active .ww-card-tag {
          color: rgba(240,234,224,0.9);
          border-color: rgba(240,234,224,0.3);
        }

        /* Bottom text block */
        .ww-card-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 32px 36px;
          transform: translateY(12px);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ww-card.active .ww-card-text {
          transform: translateY(0);
        }

        .ww-card-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent, #D4AF37);
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s;
        }
        .ww-card.active .ww-card-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .ww-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 400;
          color: #F0EAE0;
          margin: 0 0 12px 0;
          line-height: 1.05;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s;
        }
        .ww-card.active .ww-card-title {
          opacity: 1;
          transform: translateY(0);
        }

        .ww-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(240,234,224,0.65);
          line-height: 1.7;
          max-width: 480px;
          margin: 0;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s;
        }
        .ww-card.active .ww-card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        /* Accent line on active */
        .ww-card-line {
          position: absolute;
          left: 32px;
          bottom: 0;
          height: 2px;
          width: 0;
          background: var(--accent, #D4AF37);
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .ww-card.active .ww-card-line {
          width: 48px;
        }

        /* Dots nav */
        .ww-dots {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 60px 64px;
          position: relative;
          z-index: 10;
        }

        .ww-dot {
          height: 1px;
          background: #3A3028;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }
        .ww-dot:not(.active) { width: 24px; }
        .ww-dot.active { width: 48px; background: #D4AF37; }

        /* Decorative vertical text */
        .ww-side-text {
          position: absolute;
          right: 60px;
          bottom: 160px;
          writing-mode: vertical-rl;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #2A2018;
          z-index: 2;
          user-select: none;
        }

        @media (max-width: 768px) {
          .ww-header { padding: 48px 24px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .ww-track { padding: 0 24px 48px; }
          .ww-card { flex: 0 0 calc(85vw); }
          .ww-dots { padding: 0 24px 48px; }
          .ww-side-text { display: none; }
        }
      `}</style>

      <section id="work" className="ww-section" ref={sectionRef}>
        <div className="ww-grain" />
        <span className="ww-side-text">Scroll to explore</span>

        {/* Header */}
        <div className={`ww-header ${isVisible ? 'visible' : ''}`}>
          <div>
            <p className="ww-eyebrow">Curated Portfolio</p>
            <h2 className="ww-title">
              Visual <em>Poetry</em>
            </h2>
          </div>
          <p className="ww-count">{String(activeIndex + 1).padStart(2, '0')} / 04</p>
        </div>

        {/* Scroll Track */}
        <div className="ww-track" ref={containerRef}>
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className={`ww-card ${i === activeIndex ? 'active' : ''}`}
              style={{ '--accent': item.accent }}
              onClick={() => scrollToIndex(i)}
            >
              <div className="ww-card-img-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  className="ww-card-img"
                  loading="lazy"
                />
                <div className="ww-card-overlay" />
              </div>

              <span className="ww-card-num">{item.number}</span>
              <span className="ww-card-tag">{item.tag}</span>

              <div className="ww-card-text">
                <p className="ww-card-subtitle">{item.subtitle}</p>
                <h3 className="ww-card-title">{item.title}</h3>
                <p className="ww-card-desc">{item.description}</p>
              </div>
              <div className="ww-card-line" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="ww-dots">
          {portfolioItems.map((_, i) => (
            <button
              key={i}
              className={`ww-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default WeddingWork;