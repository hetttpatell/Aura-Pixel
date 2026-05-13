import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';

/**
 * BrandTransition Component
 * Handles a high-end, editorial transition when switching between Aura Pixel and Wedding Pixel.
 * Uses spring physics, subtle textures, and staggered typography for a premium feel.
 */
const BrandTransition = () => {
  const { transition, setBrand, completeTransition } = useBrand();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const inProgress = useRef(false);

  useEffect(() => {
    if (transition.isActive && !inProgress.current) {
      inProgress.current = true;
      setIsVisible(true);
      
      // Phase 1: Wait for overlay to become fully opaque
      const switchTimer = setTimeout(() => {
        if (transition.target) {
          setBrand(transition.target);
          if (transition.target === 'wedding') {
            navigate('/wedding');
          } else {
            navigate('/');
          }
        }
        
        // Phase 2: Hold the brand reveal
        const holdTimer = setTimeout(() => {
          setIsVisible(false);
          
          // Phase 3: Cleanup after fade out
          const cleanupTimer = setTimeout(() => {
            completeTransition();
            inProgress.current = false;
          }, 600);
          
          return () => clearTimeout(cleanupTimer);
        }, 1400); // Reveal duration (slightly longer for text animation)

        return () => clearTimeout(holdTimer);
      }, 600);

      return () => clearTimeout(switchTimer);
    }
  }, [transition.isActive, transition.target, setBrand, completeTransition, navigate]);

  const isTargetWedding = transition.target === 'wedding';
  
  const theme = {
    bg: isTargetWedding ? '#F5E6C0' : '#FFFFFF',
    accent: isTargetWedding ? '#8B1E1E' : '#008080',
    logo: isTargetWedding ? '/wedding.png' : '/AURA-PIXEL.PNG',
    font: isTargetWedding ? "'Cormorant Garamond', serif" : "'Plus Jakarta Sans', sans-serif",
    tagline: isTargetWedding ? "Editorial Wedding Excellence" : "Digital Innovation Hub",
    gold: isTargetWedding ? '#D4AF37' : '#008080',
    gradient: isTargetWedding 
      ? 'radial-gradient(circle at center, #FDF7E2 0%, #F5E6C0 100%)'
      : 'radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 100%)'
  };

  // Split tagline for staggered animation
  const characters = theme.tagline.split("");

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="brand-transition-container"
          className="fixed inset-0 z-[10000] overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ background: theme.gradient }}
        >
          {/* 1. Subtle Film Grain / Noise Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")`,
              mixBlendMode: 'overlay'
            }}
          />

          {/* 2. Dynamic Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1], 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at center, ${theme.accent}22 0%, transparent 70%)` 
            }}
          />

          {/* 3. Content Container */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Logo Wrapper */}
            <div className="relative mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 25,
                  delay: 0.2
                }}
                className="relative"
              >
                <img 
                  src={theme.logo} 
                  alt="Brand Logo" 
                  className="h-32 sm:h-48 md:h-64 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                
                {/* Fallback Text Logo */}
                <div style={{ display: 'none' }} className="text-center">
                  <h1 
                    className="text-5xl sm:text-7xl font-bold tracking-tighter"
                    style={{ fontFamily: theme.font, color: theme.accent }}
                  >
                    {isTargetWedding ? 'Wedding Pixel' : 'Aura Pixel'}
                  </h1>
                </div>
              </motion.div>
            </div>

            {/* Tagline with Staggered Character Animation */}
            <div className="flex overflow-hidden px-4 text-center">
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 0.6 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + (index * 0.02),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-[9px] sm:text-[11px] uppercase tracking-[0.6em] font-light inline-block whitespace-pre"
                  style={{ color: theme.accent, fontFamily: theme.font }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Minimal Editorial Frames */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isTargetWedding ? 0.3 : 0.15 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="absolute inset-12 border border-current pointer-events-none"
            style={{ color: theme.gold }}
          />

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] origin-center opacity-30"
            style={{ backgroundColor: theme.gold }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandTransition;




