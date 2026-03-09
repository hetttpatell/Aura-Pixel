import { useEffect, useState, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiFacebook,
    SiInstagram,
    SiLinkedin,
    SiYoutube,
    SiX,
    SiTiktok,
    SiPinterest,
    SiSnapchat,
    SiThreads,
    SiWhatsapp,
    SiTelegram,
} from 'react-icons/si';

// Premium easing curves
const ease = {
    smooth: [0.22, 1, 0.36, 1],
    flow: [0.4, 0, 0.2, 1],
    dock: [0.76, 0, 0.24, 1], // Smooth dock easing
    elastic: [0.68, -0.55, 0.27, 1.55],
    luxury: [0.16, 1, 0.3, 1], // Premium ease-out-expo for buttery smooth deceleration
};

// Social Media Icons
const SOCIAL_ICONS = [
    SiFacebook, SiInstagram, SiLinkedin, SiYoutube, SiX, SiTiktok,
    SiPinterest, SiSnapchat, SiThreads, SiWhatsapp, SiTelegram, SiFacebook,
];

// Particle/sparkle positions for the reveal effect
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    distance: 80 + Math.random() * 60,
    size: 4 + Math.random() * 6,
    delay: i * 0.08,
}));

// Floating decorative shapes
const FLOATING_SHAPES = [
    { x: -150, y: -80, size: 8, delay: 0.3 },
    { x: 160, y: -60, size: 6, delay: 0.45 },
    { x: -180, y: 40, size: 10, delay: 0.4 },
    { x: 170, y: 70, size: 7, delay: 0.55 },
    { x: -100, y: -100, size: 5, delay: 0.25 },
    { x: 120, y: 90, size: 9, delay: 0.6 },
];

// Icon component with smoother, slower animations
const SocialIcon = ({ IconComponent, x, y, delay, phase, idx }) => (
    <motion.div
        className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
        initial={{ left: `${x}%`, top: `${y}%`, opacity: 0, scale: 0, rotate: -180 }}
        animate={
            phase === 'show'
                ? { left: `${x}%`, top: `${y}%`, opacity: 1, scale: 1, rotate: 0 }
                : { left: '50%', top: '50%', opacity: 0, scale: 0.2, x: '-50%', y: '-50%', rotate: 180 }
        }
        transition={
            phase === 'show'
                ? { delay, duration: 0.9, ease: ease.smooth }
                : { delay: idx * 0.04, duration: 0.7, ease: ease.flow }
        }
    >
        <IconComponent className="w-full h-full text-white" />
    </motion.div>
);

const WelcomeScreen = ({ onComplete, onDockStart, onNavLogoReveal }) => {
    const [phase, setPhase] = useState('show'); // show → converge → text → dock → done
    const [showText, setShowText] = useState(false);
    const [showPortal, setShowPortal] = useState(false);
    const [isDocking, setIsDocking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [targetRect, setTargetRect] = useState(null);

    // Refs for precise positioning
    const splashLogoRef = useRef(null);
    const targetRectRef = useRef(null); // Keep latest target rect in ref for accurate dock positioning

    // Function to calculate navbar logo position (extracted for reuse)
    const calculateTarget = useCallback(() => {
        const navbarLogo = document.querySelector('[data-logo-target="true"]');
        if (navbarLogo) {
            const rect = navbarLogo.getBoundingClientRect();
            const newRect = {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                fontSize: parseFloat(getComputedStyle(navbarLogo).fontSize)
            };
            targetRectRef.current = newRect;
            setTargetRect(newRect);
            return newRect;
        }
        return null;
    }, []);

    // Check mobile
    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate exact navbar logo position
    useLayoutEffect(() => {
        // Calculate immediately and after a short delay to ensure navbar is rendered
        calculateTarget();
        const timer = setTimeout(calculateTarget, 100);

        window.addEventListener('resize', calculateTarget);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateTarget);
        };
    }, [calculateTarget]);

    // Generate icon positions with slower stagger
    const icons = useMemo(() =>
        SOCIAL_ICONS.map((IconComponent, i) => {
            const angle = (i / SOCIAL_ICONS.length) * Math.PI * 2;
            const r = 16 + (i % 3) * 4;
            return {
                IconComponent,
                x: 50 + Math.cos(angle) * r,
                y: 50 + Math.sin(angle) * r,
                delay: i * 0.12, // Slower stagger for smoother appearance
                idx: i,
            };
        }), []);

    const done = useCallback(() => onComplete(), [onComplete]);

    useEffect(() => {
        // Timeline (slower for smoother experience):
        // 0-2.22s: Icons appear slowly (last icon at 1.32s + 0.9s duration)
        // 2.72s: Icons converge + Portal effect starts
        // 3.8s: Text appears centered with effects (more time for portal)
        // 5.4s: Text starts docking to nav + Content begins fade-in (final 20%)
        // 7.0s: Complete
        const t0 = setTimeout(() => setShowPortal(true), 2720);
        const t1 = setTimeout(() => setPhase('converge'), 2720);
        const t2 = setTimeout(() => setShowText(true), 3800);
        const t3 = setTimeout(() => {
            // Recalculate target position right before docking for maximum accuracy
            calculateTarget();
            setIsDocking(true);
            // Trigger content fade-in during docking (final ~20% of animation)
            onDockStart?.();
        }, 5400);
        // Reveal navbar logo just before completion for seamless handoff
        const t5 = setTimeout(() => {
            onNavLogoReveal?.();
        }, 6800);
        const t4 = setTimeout(done, 7200); // Extended slightly for smoother completion

        return () => [t0, t1, t2, t3, t4, t5].forEach(clearTimeout);
    }, [done, onDockStart, onNavLogoReveal, calculateTarget]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[500] flex items-center justify-center overflow-hidden pointer-events-none"
                style={{ backgroundColor: isDocking ? 'transparent' : (showText ? '#FFFFFF' : '#006D6D') }}
                initial={{ backgroundColor: '#006D6D' }}
                animate={{
                    backgroundColor: isDocking ? 'rgba(255,255,255,0)' : (showText ? '#FFFFFF' : '#006D6D'),
                }}
                transition={{
                    backgroundColor: { duration: isDocking ? 1.0 : 0.6, ease: ease.smooth },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3, ease: ease.smooth } }}
            >
                {/* Icons */}
                {!showText && icons.map((icon, i) => (
                    <SocialIcon key={i} {...icon} phase={phase} />
                ))}

                {/* Portal/Vortex Effect - appears when icons converge */}
                <AnimatePresence>
                    {showPortal && !showText && (
                        <>
                            {/* Inner portal ring */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40"
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={{ width: 60, height: 60, opacity: [0, 1, 0.6], rotate: 180 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.9, ease: ease.smooth }}
                            />
                            {/* Outer portal ring */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={{ width: 100, height: 100, opacity: [0, 0.8, 0.4], rotate: -90 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ delay: 0.15, duration: 0.9, ease: ease.smooth }}
                            />
                            {/* Glow pulse at center */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)' }}
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={{ width: 80, height: 80, opacity: [0, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.7, ease: ease.flow }}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Expanding rings reveal effect - when text appears */}
                <AnimatePresence>
                    {showText && !isDocking && (
                        <>
                            {[1, 2, 3].map((ring) => (
                                <motion.div
                                    key={ring}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                                    style={{ border: '1px solid rgba(1, 104, 108, 0.3)' }}
                                    initial={{ width: 0, height: 0, opacity: 0 }}
                                    animate={{
                                        width: [0, 200 + ring * 80],
                                        height: [0, 200 + ring * 80],
                                        opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                        delay: ring * 0.25,
                                        duration: 1.8,
                                        ease: ease.smooth
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Particle burst effect */}
                <AnimatePresence>
                    {showText && !isDocking && (
                        <>
                            {PARTICLES.map((particle, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                                    style={{
                                        width: particle.size,
                                        height: particle.size,
                                        background: 'linear-gradient(135deg, #01686C 0%, #00a8a8 100%)',
                                        boxShadow: '0 0 8px rgba(1, 104, 108, 0.5)',
                                    }}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    animate={{
                                        x: Math.cos(particle.angle) * particle.distance,
                                        y: Math.sin(particle.angle) * particle.distance,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.2, 0],
                                    }}
                                    transition={{
                                        delay: particle.delay,
                                        duration: 1.3,
                                        ease: ease.smooth
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Floating decorative shapes */}
                <AnimatePresence>
                    {showText && !isDocking && (
                        <>
                            {FLOATING_SHAPES.map((shape, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 pointer-events-none"
                                    style={{
                                        width: shape.size,
                                        height: shape.size,
                                        borderRadius: i % 2 === 0 ? '50%' : '2px',
                                        background: i % 3 === 0
                                            ? 'rgba(1, 104, 108, 0.6)'
                                            : 'rgba(30, 41, 59, 0.4)',
                                        transform: i % 2 === 1 ? 'rotate(45deg)' : 'none',
                                    }}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    animate={{
                                        x: shape.x,
                                        y: [shape.y, shape.y - 15, shape.y],
                                        opacity: [0, 0.8, 0.6],
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.4 } }}
                                    transition={{
                                        delay: shape.delay,
                                        duration: 1.0,
                                        ease: ease.smooth,
                                        y: {
                                            delay: shape.delay + 1.0,
                                            duration: 2.5,
                                            repeat: Infinity,
                                            repeatType: 'reverse',
                                            ease: 'easeInOut'
                                        }
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Horizontal reveal lines */}
                <AnimatePresence>
                    {showText && !isDocking && (
                        <>
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px pointer-events-none"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(1, 104, 108, 0.4), transparent)' }}
                                initial={{ width: 0, x: '-50%', opacity: 0 }}
                                animate={{ width: 300, x: '-50%', opacity: [0, 1, 0.3] }}
                                transition={{ delay: 0.15, duration: 1.2, ease: ease.smooth }}
                            />
                            <motion.div
                                className="absolute left-1/2 h-px pointer-events-none"
                                style={{
                                    top: 'calc(50% - 40px)',
                                    background: 'linear-gradient(90deg, transparent, rgba(1, 104, 108, 0.2), transparent)'
                                }}
                                initial={{ width: 0, x: '-50%', opacity: 0 }}
                                animate={{ width: 200, x: '-50%', opacity: [0, 0.8, 0.4] }}
                                transition={{ delay: 0.3, duration: 1.0, ease: ease.smooth }}
                            />
                            <motion.div
                                className="absolute left-1/2 h-px pointer-events-none"
                                style={{
                                    top: 'calc(50% + 40px)',
                                    background: 'linear-gradient(90deg, transparent, rgba(1, 104, 108, 0.2), transparent)'
                                }}
                                initial={{ width: 0, x: '-50%', opacity: 0 }}
                                animate={{ width: 200, x: '-50%', opacity: [0, 0.8, 0.4] }}
                                transition={{ delay: 0.3, duration: 1.0, ease: ease.smooth }}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Brand Text with dock animation and entrance effects */}
                <AnimatePresence>
                    {showText && (() => {
                        // For docking: use fixed position to fly to exact navbar logo position
                        // We measure the splash logo height and the navbar logo to align baselines perfectly

                        // Starting position (center of screen)
                        const startLeft = window.innerWidth / 2;
                        const startTop = window.innerHeight / 2;

                        // Calculate current splash font size based on current breakpoint
                        const splashFontSize = window.innerWidth >= 1024 ? 60  // lg: text-6xl = 3.75rem = 60px
                            : window.innerWidth >= 768 ? 48  // md: text-5xl = 3rem = 48px
                                : window.innerWidth >= 640 ? 36  // sm: text-4xl = 2.25rem = 36px
                                    : 30; // text-3xl = 1.875rem = 30px

                        // Target position - adjust top to align text baselines correctly
                        // The navbar logo's top is the container top, but we need the text baseline to match
                        const endLeft = targetRect ? targetRect.left : (isMobile ? 16 : 24);
                        const navFontSize = targetRect ? targetRect.fontSize : (isMobile ? 24 : 30);
                        const endScale = navFontSize / splashFontSize;

                        // When scaling down with transformOrigin 'left top', there's a slight vertical 
                        // offset because the text's visual baseline doesn't sit at the top of the bounding box.
                        // Add a small correction to push the logo down to match navbar position.
                        const verticalOffset = isMobile ? 5 : 6;
                        const endTop = targetRect ? (targetRect.top + verticalOffset) : (isMobile ? 17 : 24);

                        return (
                            <motion.div
                                ref={splashLogoRef}
                                className="flex items-baseline z-10"
                                style={{
                                    position: 'fixed',
                                    // Use top-left origin for precise positioning when docking
                                    transformOrigin: 'left top',
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    left: startLeft,
                                    top: startTop,
                                    x: '-50%',
                                    y: '-50%',
                                }}
                                animate={isDocking ? {
                                    opacity: 0,
                                    scale: endScale,
                                    left: endLeft,
                                    top: endTop,
                                    x: '0%',
                                    y: '0%',
                                } : {
                                    opacity: 1,
                                    scale: 1,
                                    left: startLeft,
                                    top: startTop,
                                    x: '-50%',
                                    y: '-50%',
                                }}
                                transition={{
                                    duration: isDocking ? (isMobile ? 1.4 : 1.6) : 1.0, // Luxury timing
                                    ease: ease.luxury, // Premium ease-out-expo feel
                                    opacity: isDocking
                                        ? { duration: 0, delay: isMobile ? 1.4 : 1.6 } // Instant hide at the end (no fade)
                                        : { duration: 0.8 },
                                }}
                            >
                                {/* Background glow effect */}
                                {!isDocking && (
                                    <motion.div
                                        className="absolute inset-0 -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.6, 0.3] }}
                                        transition={{ delay: 0.3, duration: 1.6, ease: ease.smooth }}
                                        style={{
                                            background: 'radial-gradient(ellipse at center, rgba(1, 104, 108, 0.25) 0%, transparent 70%)',
                                            filter: 'blur(30px)',
                                            transform: 'scale(2.5)',
                                        }}
                                    />
                                )}

                                {/* Shimmer overlay */}
                                {!isDocking && (
                                    <motion.div
                                        className="absolute inset-0 -z-5 overflow-hidden pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.7 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                                transform: 'skewX(-20deg)',
                                            }}
                                            initial={{ x: '-200%' }}
                                            animate={{ x: '200%' }}
                                            transition={{ delay: 0.6, duration: 1.4, ease: ease.smooth }}
                                        />
                                    </motion.div>
                                )}

                                <motion.span
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-['Plus_Jakarta_Sans'] font-medium text-slate-800"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.1,
                                        duration: 0.6,
                                        ease: ease.smooth,
                                    }}
                                >
                                    Aura
                                </motion.span>
                                <motion.span
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-['Plus_Jakarta_Sans'] font-bold text-[#01686C]"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.2,
                                        duration: 0.6,
                                        ease: ease.smooth,
                                    }}
                                >
                                    Pixel
                                </motion.span>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>

                {/* Tagline - fades out before dock */}
                <AnimatePresence>
                    {showText && !isDocking && (
                        <motion.p
                            className="absolute text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase"
                            style={{
                                color: 'rgba(0,109,109,0.6)',
                                top: '58%',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
                            transition={{ delay: 0.6, duration: 0.7, ease: ease.smooth }}
                        >
                            Digital Marketing Excellence
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};

export default WelcomeScreen;
