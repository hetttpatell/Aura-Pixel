import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
    SiGoogleads,
    SiMeta,
    SiInstagram,
    SiFacebook,
    SiLinkedin,
    SiGoogleanalytics,
    SiMailchimp
} from 'react-icons/si';
import { HiArrowRight, HiOutlineSearch } from 'react-icons/hi';

// Optimized spring config for smoother animations
const smoothSpring = { damping: 25, stiffness: 100, mass: 0.5 };
const fastSpring = { damping: 20, stiffness: 200, mass: 0.3 };

// Optimized easing for silky smooth animations
const smoothEase = [0.4, 0, 0.2, 1];

const floatingIcons = [
    { icon: SiGoogleads, name: 'Google Ads', color: '#4285F4', link: 'https://ads.google.com', delay: 0 },
    { icon: SiMeta, name: 'Meta Ads', color: '#0668E1', link: 'https://www.meta.com/business', delay: 0.1 },
    { icon: HiOutlineSearch, name: 'SEO', color: '#008080', link: '#services', delay: 0.2 },
    { icon: SiInstagram, name: 'Instagram', color: '#E4405F', link: 'https://instagram.com', delay: 0.3 },
    { icon: SiFacebook, name: 'Facebook', color: '#1877F2', link: 'https://facebook.com', delay: 0.4 },
    { icon: SiLinkedin, name: 'LinkedIn', color: '#0A66C2', link: 'https://linkedin.com', delay: 0.5 },
    { icon: SiGoogleanalytics, name: 'Analytics', color: '#F9AB00', link: 'https://analytics.google.com', delay: 0.6 },
    { icon: SiMailchimp, name: 'Email', color: '#FFB300', link: '#services', delay: 0.7 },
];

const stats = [
    { value: '150+', label: 'Clients' },
    { value: '5M+', label: 'Ad Spend' },
    { value: '300%', label: 'ROI' },
    { value: '95%', label: 'Retention' },
];

const desktopPositions = [
    { top: '5%', left: '10%' },
    { top: '0%', right: '15%' },
    { top: '25%', left: '-5%' },
    { top: '20%', right: '-5%' },
    { top: '55%', left: '-8%' },
    { top: '50%', right: '-8%' },
    { top: '75%', left: '5%' },
    { top: '80%', right: '10%' },
];

// Mobile positions for bubble icons around the smaller image - constrained to prevent overflow
const mobilePositions = [
    { top: '10%', left: '2%' },
    { top: '10%', right: '2%' },
    { top: '30%', left: '0%' },
    { top: '30%', right: '0%' },
    { top: '50%', left: '2%' },
    { top: '50%', right: '2%' },
    { top: '70%', left: '0%' },
    { top: '70%', right: '0%' },
];

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized spring config for buttery smooth parallax
    const x = useSpring(mouseX, smoothSpring);
    const y = useSpring(mouseY, smoothSpring);

    useEffect(() => {
        if (isMobile) return; // No parallax on mobile
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            // Reduced movement for subtler, smoother effect
            mouseX.set((clientX - centerX) / 80);
            mouseY.set((clientY - centerY) / 80);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, isMobile]);

    // Memoize click handler
    const handleIconClick = useCallback((link) => {
        if (link.startsWith('/#') || link.startsWith('#')) {
            navigate(link.startsWith('#') ? `/${link}` : link);
        } else {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    }, [navigate]);

    return (
        <section
            id="home"
            className="relative min-h-[100dvh] flex items-center pt-20 sm:pt-24 lg:pt-28 pb-10 overflow-hidden"
            aria-label="Hero Section - Aura Pixel Digital Marketing"
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">

                    {/* Left Content — shown below image on mobile, left on desktop */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="inline-block px-3 py-1.5 bg-primary-light text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            role="doc-subtitle"
                        >
                            Digital Marketing Excellence
                        </motion.span>

                        <motion.h1
                            className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Ignite Your Brand&apos;s Aura{' '}
                            <span className="text-gradient">Pixel-Perfect Growth</span>
                        </motion.h1>

                        <motion.p
                            className="text-sm sm:text-base text-text-body mb-5 sm:mb-6 max-w-xl leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Performance-driven digital marketing that turns traffic into measurable revenue.
                            We blend creativity with data to deliver exceptional results.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-3 mb-5 sm:mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            role="group"
                            aria-label="Call to action buttons"
                        >
                            <motion.a
                                href="/#contact"
                                className="btn btn-primary text-sm sm:text-base px-5 sm:px-7 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); navigate('/#contact'); }}
                                role="button"
                                aria-label="Get started with Aura Pixel digital marketing services"
                            >
                                Get Started
                                <HiArrowRight className="text-base sm:text-lg" aria-hidden="true" />
                            </motion.a>
                            <motion.a
                                href="/#portfolio"
                                className="btn btn-secondary text-sm sm:text-base px-5 sm:px-7 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); navigate('/#portfolio'); }}
                                role="button"
                                aria-label="View our portfolio of successful digital marketing campaigns"
                            >
                                View Portfolio
                            </motion.a>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.section
                            className="grid grid-cols-4 gap-2 sm:gap-4 mt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            aria-label="Company Statistics"
                        >
                            {stats.map((stat, index) => (
                                <motion.article
                                    key={stat.label}
                                    className="relative group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.08, duration: 0.4 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <motion.div
                                        className="relative bg-white/90 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/50 shadow-md"
                                        whileHover={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary-teal via-teal-400 to-primary-teal rounded-t-xl opacity-80" />
                                        <div className="text-center">
                                            <span
                                                className="block text-lg sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary-teal to-teal-600 bg-clip-text text-transparent"
                                                aria-label={`${stat.value} ${stat.label}`}
                                            >
                                                {stat.value}
                                            </span>
                                            <span className="block text-[10px] sm:text-xs text-text-body mt-0.5 font-medium leading-tight">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                </motion.article>
                            ))}
                        </motion.section>
                    </motion.div>

                    {/* Right Content — Image */}
                    <motion.aside
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                        aria-label="Visual showcase of digital marketing tools"
                    >
                        <div className="relative">
                            {/* Image container — smaller on mobile */}
                            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-4 lg:mt-0">
                                {/* Splash background */}
                                <motion.img
                                    src="/Splash.png"
                                    alt="Creative splash background representing digital marketing innovation and brand transformation"
                                    className="w-full h-auto relative z-10"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    loading="eager"
                                    width="600"
                                    height="600"
                                />

                                {/* Gibli character — floating, mobile friendly */}
                                <motion.img
                                    src="/Gibli.png"
                                    alt="Aura Pixel mascot character representing creative digital marketing solutions"
                                    className="absolute top-0 left-0 w-full h-auto z-20"
                                    style={isMobile ? {} : { x, y }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, isMobile ? -8 : -15, 0],
                                    }}
                                    transition={{
                                        opacity: { delay: 0.6, duration: 0.6 },
                                        y: {
                                            delay: 0.6,
                                            duration: isMobile ? 4 : 3,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                    loading="eager"
                                    width="600"
                                    height="600"
                                />

                                {/* Floating icons around image - optimized animations */}
                                {floatingIcons.map((item, index) => {
                                    const pos = isMobile ? mobilePositions[index] : desktopPositions[index];
                                    const bubbleSize = isMobile ? 'w-10 h-10' : 'w-12 h-12';
                                    const iconSize = isMobile ? 18 : 22;
                                    const fontSize = isMobile ? 'text-[9px]' : 'text-[10px]';
                                    // Simplified animation with longer duration for smoother motion
                                    const floatDuration = 5 + index * 0.5;
                                    return (
                                        <motion.div
                                            key={item.name}
                                            className="absolute flex flex-col items-center cursor-pointer z-40 will-change-transform"
                                            style={pos}
                                            animate={{
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                y: {
                                                    delay: 0.8 + item.delay,
                                                    duration: floatDuration,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut'
                                                },
                                            }}
                                            whileHover={{ scale: 1.08, transition: fastSpring }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={() => handleIconClick(item.link)}
                                        >
                                            <div
                                                className={`${bubbleSize} rounded-full bg-white/90 backdrop-blur-xl border-2 flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-xl`}
                                                style={{ borderColor: item.color }}
                                            >
                                                <item.icon size={iconSize} style={{ color: item.color }} />
                                            </div>
                                            <span className={`mt-1 font-medium text-text-heading bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md whitespace-nowrap ${fontSize}`}>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-primary-light/30 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default Hero;