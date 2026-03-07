import { useEffect, useState, useMemo, useCallback } from 'react';
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
};

// Social Media Icons
const SOCIAL_ICONS = [
    SiFacebook, SiInstagram, SiLinkedin, SiYoutube, SiX, SiTiktok,
    SiPinterest, SiSnapchat, SiThreads, SiWhatsapp, SiTelegram, SiFacebook,
];

// Icon component
const SocialIcon = ({ IconComponent, x, y, delay, phase, idx }) => (
    <motion.div
        className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
        initial={{ left: `${x}%`, top: `${y}%`, opacity: 0, scale: 0 }}
        animate={
            phase === 'show'
                ? { left: `${x}%`, top: `${y}%`, opacity: 1, scale: 1 }
                : { left: '50%', top: '50%', opacity: 0, scale: 0.2, x: '-50%', y: '-50%' }
        }
        transition={
            phase === 'show'
                ? { delay, duration: 0.5, ease: ease.smooth }
                : { delay: idx * 0.03, duration: 0.6, ease: ease.flow }
        }
    >
        <IconComponent className="w-full h-full text-white" />
    </motion.div>
);

const WelcomeScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('show'); // show → converge → text → dock → done
    const [showText, setShowText] = useState(false);
    const [isDocking, setIsDocking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check mobile
    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate icon positions
    const icons = useMemo(() =>
        SOCIAL_ICONS.map((IconComponent, i) => {
            const angle = (i / SOCIAL_ICONS.length) * Math.PI * 2;
            const r = 16 + (i % 3) * 4;
            return {
                IconComponent,
                x: 50 + Math.cos(angle) * r,
                y: 50 + Math.sin(angle) * r,
                delay: i * 0.035,
                idx: i,
            };
        }), []);

    const done = useCallback(() => onComplete(), [onComplete]);

    useEffect(() => {
        // Timeline:
        // 0-2.5s: Icons visible (2s watch)
        // 2.5-3.2s: Icons converge
        // 3.2s: Text appears centered
        // 4.2s: Text starts docking to nav
        // 5.2s: Complete
        const t1 = setTimeout(() => setPhase('converge'), 2500);
        const t2 = setTimeout(() => setShowText(true), 3200);
        const t3 = setTimeout(() => setIsDocking(true), 4200);
        const t4 = setTimeout(done, 5600);

        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [done]);

    // Dock target position - calculated from center to navbar logo position
    // Navbar: max-w-[1280px] mx-auto px-4 sm:px-6, logo is top-left
    // Logo center is approximately at: left ~16-24px + half logo width, top ~36-40px
    const dockPosition = isMobile
        ? { x: 'calc(-50vw + 70px)', y: 'calc(-50vh + 36px)', scale: 0.5 }
        : { x: 'calc(-50vw + 100px)', y: 'calc(-50vh + 40px)', scale: 0.52 };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[500] flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ backgroundColor: '#006D6D' }}
                animate={{
                    backgroundColor: showText ? '#FFFFFF' : '#006D6D',
                }}
                transition={{
                    backgroundColor: { duration: 0.6, ease: ease.smooth },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
                {/* Icons */}
                {!showText && icons.map((icon, i) => (
                    <SocialIcon key={i} {...icon} phase={phase} />
                ))}

                {/* Brand Text with dock animation - NO FADE */}
                <AnimatePresence>
                    {showText && (
                        <motion.div
                            className="flex items-baseline z-10"
                            initial={{ opacity: 0, y: 30, scale: 1, x: 0 }}
                            animate={isDocking ? {
                                opacity: 1,
                                y: 0,
                                scale: dockPosition.scale,
                                x: dockPosition.x,
                                translateY: dockPosition.y,
                            } : {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                x: 0,
                                translateY: 0,
                            }}
                            transition={{
                                duration: isDocking ? 1.0 : 0.6,
                                ease: isDocking ? ease.dock : ease.smooth,
                            }}
                        >
                            <motion.span
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-['Plus_Jakarta_Sans'] font-medium"
                                style={{ color: '#1e293b' }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.5, ease: ease.smooth }}
                            >
                                Aura
                            </motion.span>
                            <motion.span
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-['Plus_Jakarta_Sans'] font-bold"
                                style={{ color: '#01686C' }}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.5, ease: ease.smooth }}
                            >
                                Pixel
                            </motion.span>
                        </motion.div>
                    )}
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
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                            transition={{ delay: 0.4, duration: 0.4, ease: ease.smooth }}
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
