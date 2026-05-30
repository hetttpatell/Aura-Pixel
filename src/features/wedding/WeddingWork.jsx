import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Couple Data ──────────────────────────────────────────────────────────────
const couples = [
  {
    id: 'nidhi-keshav',
    names: ['Nidhi', 'Keshav'],
    tagline: 'A celebration of eternal love, rooted in tradition.',
    photos: [
      '/wedding(2)-8.jpeg',
      '/wedding(2)-9.jpeg',
      '/wedding(2)-10.jpeg',
      '/wedding(2)-11.jpeg',
      '/wedding(2)-12.jpeg',
      '/wedding(2)-13.jpeg',
      '/wedding(2)-14.jpeg',
    ],
    videos: [
      '/weeding(2)-1.mp4',
      '/weeding(2)-2.mp4',
      '/weeding(2)-3.mp4',
      '/weeding(2)-4.mp4',
    ],
  },
  {
    id: 'rohan-ayushi',
    names: ['Rohan', 'Ayushi'],
    tagline: 'Where modern elegance meets timeless grace.',
    photos: [
      '/wedding-1.jpeg',
      '/wedding-2.jpeg',
      '/wedding-3.jpeg',
      '/wedding-4.jpeg',
      '/wedding-5.jpeg',
      '/wedding-6.jpeg',
      '/wedding-7.jpeg',
    ],
    videos: [],
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="27" cy="27" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="rgba(0,0,0,0.35)" />
    <path d="M22 17L38 27L22 37V17Z" fill="white" />
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7L21 21M21 7L7 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
    <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
  </svg>
);

const MuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" />
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="white" />
    <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" />
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="white" />
    <path d="M19.07 4.93a10 10 0 010 14.14" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// ─── LazyImage Component ──────────────────────────────────────────────────────
const LazyImage = memo(({ src, alt, className, style, onClick }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        ...style,
        backgroundColor: '#E8E0D5',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={onClick}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'opacity 0.7s ease, transform 0.5s cubic-bezier(0.2,0.9,0.4,1)',
            opacity: loaded ? 1 : 0,
            willChange: 'transform',
          }}
        />
      )}
      {/* Shimmer placeholder */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(110deg, #E8E0D5 30%, #F5EDE3 50%, #E8E0D5 70%)',
            backgroundSize: '200% 100%',
            animation: 'ww-shimmer 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
});
LazyImage.displayName = 'LazyImage';

// ─── VideoReel Component ──────────────────────────────────────────────────────
const VideoReel = memo(({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-play/pause on viewport visibility
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div
        ref={containerRef}
        className="ww-video-reel"
        onClick={openFullscreen}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Gradient overlay */}
        <div className="ww-video-overlay" />
        {/* Play indicator */}
        <div className="ww-video-play-hint">
          <PlayIcon />
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="ww-video-modal" onClick={closeFullscreen}>
          <div className="ww-video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <video
              src={src}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000',
              }}
            />
            <div className="ww-modal-controls">
              <button onClick={toggleMute} className="ww-modal-btn" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <MuteIcon /> : <UnmuteIcon />}
              </button>
              <button onClick={closeFullscreen} className="ww-modal-btn" aria-label="Close">
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
VideoReel.displayName = 'VideoReel';

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="ww-lightbox" onClick={onClose}>
      <button className="ww-lightbox-close" onClick={onClose} aria-label="Close lightbox">
        <CloseIcon />
      </button>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '92vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: '4px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// ─── Couple Section ───────────────────────────────────────────────────────────
const CoupleSection = memo(({ couple, index, isLast }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const videoSectionRef = useRef(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Grid items stagger
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.ww-grid-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Videos stagger
      if (videoSectionRef.current) {
        const vids = videoSectionRef.current.querySelectorAll('.ww-video-reel');
        if (vids.length) {
          gsap.fromTo(
            vids,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: videoSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  // Build masonry-style grid layout assignments
  // Desktop: varied spans for visual interest
  // Mobile: all items equal size except hero spans full width
  const getGridSpan = (idx, total) => {
    if (total <= 4) return idx === 0 ? 'span-2' : 'span-1';
    // For 7 photos: first is hero, rest alternate
    if (idx === 0) return 'span-hero';
    if (idx === 3 || idx === 5) return 'span-wide';
    return 'span-1';
  };

  return (
    <div ref={sectionRef} className="ww-couple-section" id={`couple-${couple.id}`}>
      {/* Couple Header */}
      <div ref={headerRef} className="ww-couple-header">
        <div className="ww-couple-number">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="ww-couple-divider-line" />
        <h2 className="ww-couple-names">
          {couple.names[0]} <span className="ww-amp">&</span> {couple.names[1]}
        </h2>
        <p className="ww-couple-tagline">{couple.tagline}</p>
      </div>

      {/* Photo Grid */}
      <div ref={gridRef} className="ww-masonry-grid">
        {couple.photos.map((photo, idx) => (
          <LazyImage
            key={photo}
            src={photo}
            alt={`${couple.names.join(' & ')} - Photo ${idx + 1}`}
            className={`ww-grid-item ${getGridSpan(idx, couple.photos.length)}`}
            onClick={() => setLightboxSrc(photo)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Video Reels */}
      {couple.videos.length > 0 && (
        <div ref={videoSectionRef} className="ww-video-section">
          <div className="ww-video-section-header">
            <div className="ww-film-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#A67C52" strokeWidth="1.5" fill="none" />
                <path d="M2 8h20M2 16h20M7 4v16M17 4v16" stroke="#A67C52" strokeWidth="1" opacity="0.5" />
                <circle cx="12" cy="12" r="3" stroke="#A67C52" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <span className="ww-video-kicker">Wedding Films</span>
          </div>
          <div className="ww-video-grid">
            {couple.videos.map((videoSrc) => (
              <VideoReel key={videoSrc} src={videoSrc} />
            ))}
          </div>
        </div>
      )}

      {/* Section divider */}
      {!isLast && <div className="ww-section-divider" />}

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={couple.names.join(' & ')}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
});
CoupleSection.displayName = 'CoupleSection';

// ─── Main WeddingWork Component ───────────────────────────────────────────────
const WeddingWork = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeCouple, setActiveCouple] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const scrollToCouple = (idx) => {
    setActiveCouple(idx);
    const el = document.getElementById(`couple-${couples[idx].id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

        /* ── Shimmer animation ── */
        @keyframes ww-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Section ── */
        .ww-section {
          background: linear-gradient(180deg, #F7F5F2 0%, #FAF8F5 40%, #F5F1EC 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          color: #1C1A18;
        }

        .ww-grain-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          background-image: radial-gradient(#ccc 0.5px, transparent 0.5px);
          background-size: 16px 16px;
          z-index: 0;
        }

        .ww-content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 48px 100px;
          position: relative;
          z-index: 2;
        }

        /* ── Main Header ── */
        .ww-main-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 48px;
          border-bottom: 1px solid #E2DCD5;
        }

        .ww-main-kicker {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #9B8E7C;
          font-weight: 400;
          margin-bottom: 16px;
          display: block;
        }

        .ww-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 6vw, 76px);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #1C1A18;
          line-height: 1.05;
          margin: 0 0 12px 0;
        }

        .ww-main-title em {
          font-style: italic;
          color: #A67C52;
          font-weight: 400;
        }

        .ww-main-subtitle {
          font-size: 14px;
          color: #8A7D6E;
          font-weight: 300;
          letter-spacing: 0.3px;
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Couple Nav ── */
        .ww-couple-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 64px;
          flex-wrap: wrap;
        }

        .ww-couple-nav-btn {
          padding: 12px 28px;
          border: 1px solid #D7CABB;
          background: transparent;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: #6A5D4F;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .ww-couple-nav-btn::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: #7A5A3A;
          transition: height 0.3s ease;
          z-index: -1;
        }

        .ww-couple-nav-btn:hover,
        .ww-couple-nav-btn.active {
          color: #F7F5F2;
          border-color: #7A5A3A;
        }

        .ww-couple-nav-btn:hover::before,
        .ww-couple-nav-btn.active::before {
          height: 100%;
        }

        /* ── Couple Section ── */
        .ww-couple-section {
          margin-bottom: 80px;
          scroll-margin-top: 80px;
        }

        .ww-couple-header {
          text-align: center;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .ww-couple-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: #C7AD7F;
          font-weight: 400;
        }

        .ww-couple-divider-line {
          width: 40px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #C7AD7F, transparent);
        }

        .ww-couple-names {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #1C1A18;
          margin: 0;
          line-height: 1.15;
        }

        .ww-amp {
          font-style: italic;
          color: #A67C52;
          font-weight: 400;
          padding: 0 6px;
        }

        .ww-couple-tagline {
          font-size: 14px;
          color: #8A7D6E;
          font-weight: 300;
          letter-spacing: 0.3px;
          max-width: 400px;
          margin: 0;
        }

        /* ── Masonry Grid ── */
        .ww-masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 48px;
        }

        .ww-grid-item {
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          min-height: 280px;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1), box-shadow 0.4s ease;
        }

        .ww-grid-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(28, 26, 24, 0.15);
          z-index: 3;
        }

        .ww-grid-item:hover img {
          transform: scale(1.04);
        }

        .ww-grid-item.span-wide {
          grid-column: span 2;
          min-height: 360px;
        }

        .ww-grid-item.span-hero {
          grid-column: span 2;
          grid-row: span 2;
          min-height: 580px;
        }

        .ww-grid-item.span-1 {
          min-height: 280px;
        }

        /* ── Video Section ── */
        .ww-video-section {
          margin-top: 32px;
          margin-bottom: 24px;
        }

        .ww-video-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          justify-content: center;
        }

        .ww-film-icon {
          display: flex;
          align-items: center;
        }

        .ww-video-kicker {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #A67C52;
          font-weight: 400;
        }

        .ww-video-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .ww-video-reel {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1), box-shadow 0.4s ease;
          will-change: transform;
        }

        .ww-video-reel:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 48px rgba(28, 26, 24, 0.2);
        }

        .ww-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(0, 0, 0, 0.15) 60%,
            rgba(0, 0, 0, 0.55) 100%
          );
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .ww-video-reel:hover .ww-video-overlay {
          opacity: 0.7;
        }

        .ww-video-play-hint {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .ww-video-reel:hover .ww-video-play-hint {
          opacity: 1;
        }

        /* ── Video Modal ── */
        .ww-video-modal {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ww-fade-in 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .ww-video-modal-inner {
          position: relative;
          width: min(420px, 92vw);
          height: min(750px, 88vh);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }

        .ww-modal-controls {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .ww-modal-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ww-modal-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.08);
        }

        /* ── Lightbox ── */
        .ww-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ww-fade-in 0.25s ease;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }

        .ww-lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .ww-lightbox-close:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }

        /* ── Section Divider ── */
        .ww-section-divider {
          width: 100%;
          max-width: 600px;
          margin: 0 auto 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #D7CABB, transparent);
          position: relative;
        }

        .ww-section-divider::after {
          content: '✦';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #F7F5F2;
          padding: 0 16px;
          font-size: 14px;
          color: #C7AD7F;
        }

        /* ── Animations ── */
        @keyframes ww-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ww-masonry-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .ww-grid-item.span-hero {
            grid-column: span 2;
            grid-row: span 1;
            min-height: 340px;
          }

          .ww-grid-item.span-wide {
            grid-column: span 2;
            min-height: 300px;
          }

          .ww-grid-item.span-1 {
            min-height: 240px;
          }

          .ww-video-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }

        @media (max-width: 760px) {
          .ww-content-wrapper {
            padding: 48px 16px 60px;
          }

          .ww-main-title {
            font-size: clamp(32px, 8vw, 48px);
          }

          .ww-couple-names {
            font-size: clamp(28px, 7vw, 42px);
          }

          .ww-masonry-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 4px;
          }

          /* All grid items uniform on mobile — no inconsistent heights */
          .ww-grid-item,
          .ww-grid-item.span-1,
          .ww-grid-item.span-wide {
            grid-column: span 1;
            grid-row: span 1;
            min-height: 200px !important;
            aspect-ratio: 3 / 4;
            border-radius: 3px;
          }

          /* Only the hero image spans full width on mobile */
          .ww-grid-item.span-hero {
            grid-column: span 2;
            grid-row: span 1;
            min-height: 240px !important;
            aspect-ratio: 16 / 9;
          }

          .ww-video-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .ww-video-reel {
            border-radius: 8px;
          }

          .ww-video-modal-inner {
            width: 94vw;
            height: 85vh;
            border-radius: 12px;
          }

          .ww-couple-nav-btn {
            padding: 10px 20px;
            font-size: 14px;
          }

          .ww-video-play-hint {
            opacity: 0.7;
          }
        }

        @media (max-width: 480px) {
          .ww-masonry-grid {
            gap: 3px;
          }

          .ww-grid-item,
          .ww-grid-item.span-1,
          .ww-grid-item.span-wide {
            min-height: 160px !important;
            aspect-ratio: 3 / 4;
          }

          .ww-grid-item.span-hero {
            min-height: 200px !important;
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>

      <section className="ww-section" ref={sectionRef} id="our-work">
        <div className="ww-grain-overlay" />

        <div className="ww-content-wrapper">
          {/* Main Header */}
          <div ref={headerRef} className="ww-main-header">
            <span className="ww-main-kicker">Our Portfolio</span>
            <h1 className="ww-main-title">
              Stories We've <em>Captured</em>
            </h1>
            <p className="ww-main-subtitle">
              Every frame holds a memory. Every film tells a love story.
              Here are some of the beautiful weddings we've had the honour to document.
            </p>
          </div>

          {/* Couple Navigation */}
          <div className="ww-couple-nav">
            {couples.map((couple, idx) => (
              <button
                key={couple.id}
                className={`ww-couple-nav-btn ${idx === activeCouple ? 'active' : ''}`}
                onClick={() => scrollToCouple(idx)}
              >
                {couple.names[0]} & {couple.names[1]}
              </button>
            ))}
          </div>

          {/* Couple Sections */}
          {couples.map((couple, idx) => (
            <CoupleSection
              key={couple.id}
              couple={couple}
              index={idx}
              isLast={idx === couples.length - 1}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default WeddingWork;