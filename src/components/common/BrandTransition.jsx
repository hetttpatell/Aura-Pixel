import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';

/**
 * BrandTransition Component
 * Handles the cinematic overlay transition when switching between Aura Pixel and Wedding Pixel.
 * Optimized for performance and brand aesthetics.
 * 
 * Fixed: Robustness against multiple clicks and concurrent transitions.
 */
const BrandTransition = () => {
  const { transition, setBrand, completeTransition } = useBrand();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const inProgress = useRef(false);

  useEffect(() => {
    // Only start if a transition is active and we're not already processing one
    if (transition.isActive && !inProgress.current) {
      inProgress.current = true;
      setIsVisible(true);
      
      // Phase 1: Fade in overlay (starts immediately due to AnimatePresence)
      const timer = setTimeout(() => {
        // Phase 2: Switch brand and route
        // This happens while the screen is fully opaque
        if (transition.target) {
          setBrand(transition.target);
          if (transition.target === 'wedding') {
            navigate('/wedding');
          } else {
            navigate('/');
          }
        }
        
        // Phase 3: Wait a bit to let the new page initialize/mount
        const exitTimer = setTimeout(() => {
          setIsVisible(false);
          
          // Phase 4: Final cleanup after exit animation completes
          const cleanupTimer = setTimeout(() => {
            completeTransition();
            inProgress.current = false; // Reset for next time
          }, 600); // Buffer for Framer Motion exit animation (0.5s + small buffer)
          
          return () => clearTimeout(cleanupTimer);
        }, 800);

        return () => clearTimeout(exitTimer);
      }, 600); // Buffer for Framer Motion enter animation (0.5s + small buffer)

      return () => {
        // Cleanup if component unmounts or effect re-runs
        clearTimeout(timer);
      };
    }
  }, [transition.isActive, transition.target, setBrand, completeTransition, navigate]);

  // Determine theme colors based on the TARGET brand
  const isTargetWedding = transition.target === 'wedding';
  const bgColor = isTargetWedding ? '#0B0E14' : '#ffffff';
  const accentColor = isTargetWedding ? '#D4AF37' : '#008080';
  const textColor = isTargetWedding ? '#FDFBF7' : '#0f172a';

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="brand-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all'
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Minimalist Logo/Brand Identifier */}
            <div 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                border: `1px solid ${accentColor}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '50%',
                  border: `1px solid ${accentColor}20`,
                }}
              />
              
              {/* Center Letter */}
              <span style={{ 
                color: accentColor, 
                fontWeight: '700', 
                fontSize: '32px',
                fontFamily: isTargetWedding ? "'Cormorant Garamond', serif" : "'Plus Jakarta Sans', sans-serif"
              }}>
                {isTargetWedding ? 'W' : 'A'}
              </span>
            </div>
            
            {/* Brand Name */}
            <motion.div className="text-center">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ 
                  color: textColor, 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  fontFamily: isTargetWedding ? "'Cormorant Garamond', serif" : "'Plus Jakarta Sans', sans-serif",
                  marginBottom: '8px'
                }}
              >
                {isTargetWedding ? 'WEDDING PIXEL' : 'AURA PIXEL'}
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                style={{ 
                  height: '1px', 
                  backgroundColor: accentColor,
                  margin: '0 auto',
                  opacity: 0.5
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Subtle progress indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "linear" }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '3px',
              backgroundColor: accentColor,
              transformOrigin: 'left',
              opacity: 0.3
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandTransition;
