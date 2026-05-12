import React, { useEffect, useRef, useState } from 'react';

const portfolioItems = [
  {
    title: "The Royal Affair",
    subtitle: "Udaipur, Rajasthan",
    description: "A celebration of love amidst historic palaces and serene lakes.",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Eternal Vows",
    subtitle: "Jaipur, Rajasthan",
    description: "Traditional ceremonies captured with an editorial eye.",
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=3174&auto=format&fit=crop",
  },
  {
    title: "Sacred Fire",
    subtitle: "Mumbai, Maharashtra",
    description: "Intimate and cinematic Phere moments. The eternal bond.",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2913&auto=format&fit=crop",
  },
  {
    title: "Vibrant Haldi",
    subtitle: "Ahmedabad, Gujarat",
    description: "Pure emotion and vibrant hues of the Haldi ceremony.",
    src: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=2940&auto=format&fit=crop",
  },
];

const WeddingWork = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    const targetCard = cardRefs.current[index];
    if (!container || !targetCard) return;

    const containerWidth = container.offsetWidth;
    const cardWidth = targetCard.offsetWidth;
    const cardOffset = targetCard.offsetLeft;
    
    // Calculate the position to center the card
    const scrollTarget = cardOffset - (containerWidth / 2) + (cardWidth / 2);
    
    container.scrollTo({
      left: scrollTarget,
      behavior: 'smooth'
    });
    
    // Proactively set active index for immediate feedback
    setActiveIndex(index);
  };

  const goPrev = () => activeIndex > 0 && scrollToIndex(activeIndex - 1);
  const goNext = () => activeIndex < portfolioItems.length - 1 && scrollToIndex(activeIndex + 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .mw-section {
          background-color: #F7F5F2;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
          color: #1C1A18;
        }

        .mw-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.2;
          background-image: radial-gradient(#ccc 0.5px, transparent 0.5px);
          background-size: 16px 16px;
          z-index: 0;
        }

        .mw-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 64px 48px 80px 48px;
          position: relative;
          z-index: 2;
        }

        .mw-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border-bottom: 1px solid #E2DCD5;
          padding-bottom: 40px;
          margin-bottom: 64px;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .mw-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .mw-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mw-kicker {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9B8E7C;
          font-weight: 400;
        }

        .mw-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #1C1A18;
          line-height: 1;
        }

        .mw-main-title span {
          font-style: italic;
          font-weight: 400;
          color: #A67C52;
        }

        .mw-counter {
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 4px;
          color: #BCA98A;
          margin-top: 8px;
        }

        .mw-scroll-area {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          margin-bottom: 48px;
          padding-bottom: 24px;
          scrollbar-width: none;
        }
        .mw-scroll-area:active {
          cursor: grabbing;
        }
        .mw-scroll-area::-webkit-scrollbar {
          display: none;
        }

        .mw-track {
          display: flex;
          gap: 40px;
          padding: 0 calc(50vw - 280px); /* Centers the cards initially */
        }

        @media (max-width: 760px) {
          .mw-track {
            padding: 0 calc(50vw - 160px);
            gap: 20px;
          }
        }

        .mw-card {
          scroll-snap-align: center;
          flex: 0 0 74vw;
          max-width: 560px;
          min-width: 280px;
          background: transparent;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .mw-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: #EAE5DE;
          margin-bottom: 24px;
        }

        .mw-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          filter: grayscale(0%) contrast(1.02);
        }

        .mw-card.active .mw-image {
          transform: scale(1.02);
        }

        .mw-card-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          padding: 0 12px;
        }

        .mw-card-location {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #A68B6E;
          font-weight: 400;
          transition: color 0.2s;
        }

        .mw-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 4vw, 34px);
          font-weight: 500;
          letter-spacing: -0.3px;
          color: #1C1A18;
          margin: 0;
          line-height: 1.15;
        }

        .mw-card-desc {
          font-size: 13px;
          line-height: 1.5;
          color: #6A5D4F;
          font-weight: 350;
          max-width: 400px;
          margin: 8px auto 0 auto;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          transition-delay: 0.05s;
        }

        .mw-card.active .mw-card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .mw-card:not(.active) .mw-card-location,
        .mw-card:not(.active) .mw-card-title {
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .mw-card-line {
          width: 0;
          height: 1.5px;
          background: #C7AD7F;
          margin: 12px auto 0 auto;
          transition: width 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .mw-card.active .mw-card-line {
          width: 54px;
        }

        .mw-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #E5DDD2;
        }

        .mw-dots {
          display: flex;
          gap: 18px;
        }

        .mw-nav-dot {
          width: 34px;
          height: 1px;
          background: #D4C9BC;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        .mw-nav-dot.active {
          background: #7A5A3A;
          width: 68px;
        }

        .mw-nav-arrows {
          display: flex;
          gap: 48px;
          order: -1; /* Place arrows above dots for better visibility */
        }

        .mw-arrow {
          background: none;
          border: 1px solid #D7CABB;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          color: #7A5A3A;
          transition: all 0.3s ease;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mw-arrow:hover {
          background: #7A5A3A;
          color: #F7F5F2;
          border-color: #7A5A3A;
          transform: translateY(-2px);
        }

        .mw-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .mw-silent-index {
          font-size: 10px;
          color: #D7CABB;
          letter-spacing: 2px;
          margin-top: 24px;
          text-align: center;
          text-transform: uppercase;
        }

        @media (max-width: 760px) {
          .mw-container {
            padding: 40px 24px 60px 24px;
          }
          .mw-card {
            flex: 0 0 86vw;
            max-width: 460px;
          }
          .mw-nav-arrows {
            display: none;
          }
          .mw-dots {
            gap: 12px;
          }
          .mw-nav-dot {
            width: 28px;
          }
          .mw-nav-dot.active {
            width: 48px;
          }
        }
      `}</style>

      <section className="mw-section" ref={sectionRef}>
        <div className="mw-grain" />

        <div className="mw-container">
          <div className={`mw-header ${isVisible ? 'visible' : ''}`}>
            <div className="mw-title-group">
              <div className="mw-kicker">Silent Archives</div>
              <h1 className="mw-main-title">
                Frames of <span>stillness</span>
              </h1>
            </div>
            <div className="mw-counter">
              {String(activeIndex + 1).padStart(2, '0')} / {portfolioItems.length}
            </div>
          </div>

          <div className="mw-scroll-area" ref={scrollRef}>
            <div className="mw-track">
              {portfolioItems.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`mw-card ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => scrollToIndex(idx)}
                >
                  <div className="mw-image-frame">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="mw-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="mw-card-meta">
                    <div className="mw-card-location">{item.subtitle}</div>
                    <h3 className="mw-card-title">{item.title}</h3>
                    <p className="mw-card-desc">{item.description}</p>
                    <div className="mw-card-line" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mw-nav">
            <div className="mw-dots">
              {portfolioItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`mw-nav-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="mw-nav-arrows">
              <button 
                className="mw-arrow" 
                onClick={goPrev} 
                disabled={activeIndex === 0}
                aria-label="Previous"
              >
                ←
              </button>
              <button 
                className="mw-arrow" 
                onClick={goNext} 
                disabled={activeIndex === portfolioItems.length - 1}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
          <div className="mw-silent-index">drag · scroll</div>
        </div>
      </section>
    </>
  );
};

export default WeddingWork;