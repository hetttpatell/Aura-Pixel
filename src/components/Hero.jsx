import { useEffect, useState } from 'react';
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

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 120 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (isMobile) return; // No parallax on mobile
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set((clientX - centerX) / 60);
            mouseY.set((clientY - centerY) / 60);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, isMobile]);

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

    const handleIconClick = (link) => {
        if (link.startsWith('#')) {
            document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

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

    // Mobile positions for bubble icons around the smaller image - properly spaced to avoid overlap
    const mobilePositions = [
        { top: '10%', left: '-3%' },
        { top: '10%', right: '-3%' },
        { top: '30%', left: '-6%' },
        { top: '30%', right: '-6%' },
        { top: '50%', left: '-3%' },
        { top: '50%', right: '-3%' },
        { top: '70%', left: '-6%' },
        { top: '70%', right: '-6%' },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-28 pb-10 overflow-hidden">
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
                        >
                            Digital Marketing Excellence
                        </motion.span>

                        <motion.h1
                            className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Ignite Your Brand's Aura{' '}
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
                        >
                            <motion.a
                                href="#contact"
                                className="btn btn-primary text-sm sm:text-base px-5 sm:px-7 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                            >
                                Get Started
                                <HiArrowRight className="text-base sm:text-lg" />
                            </motion.a>
                            <motion.a
                                href="#portfolio"
                                className="btn btn-secondary text-sm sm:text-base px-5 sm:px-7 py-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                            >
                                View Portfolio
                            </motion.a>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            className="grid grid-cols-4 gap-2 sm:gap-4 mt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="relative group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.08, duration: 0.4 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-2 sm:p-3 border border-white/50 shadow-md hover:shadow-lg transition-all duration-300">
                                        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary-teal via-teal-400 to-primary-teal rounded-t-xl opacity-80" />
                                        <div className="text-center">
                                            <span className="block text-lg sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary-teal to-teal-600 bg-clip-text text-transparent">
                                                {stat.value}
                                            </span>
                                            <span className="block text-[10px] sm:text-xs text-text-body mt-0.5 font-medium leading-tight">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content — Image */}
                    <motion.div
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Image container — smaller on mobile */}
                            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-4 lg:mt-0 overflow-visible">
                                {/* Splash background */}
                                <motion.img
                                    src="/Splash.png"
                                    alt="Splash Background"
                                    className="w-full h-auto relative z-10"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                />

                                {/* Gibli character — floating, mobile friendly */}
                                <motion.img
                                    src="/Gibli.png"
                                    alt="Gibli Character"
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
                                />

                                {/* Mobile floating icons around Gibli - bubble style */}
                                {floatingIcons.map((item, index) => {
                                    const pos = mobilePositions[index];
                                    return (
                                        <motion.div
                                            key={`mobile-${item.name}`}
                                            className="absolute lg:hidden flex flex-col items-center cursor-pointer z-40"
                                            style={pos}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                x: [0, 2, -2, 2, 0],
                                                y: [0, -4, -2, -5, 0],
                                                rotate: [0, 2, -1, 2, 0],
                                            }}
                                            transition={{
                                                opacity: { delay: 0.7 + item.delay, duration: 0.4 },
                                                scale: { delay: 0.7 + item.delay, duration: 0.4 },
                                                x: { delay: 0.7 + item.delay, duration: 5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                                                y: { delay: 0.7 + item.delay, duration: 4 + index * 0.2, repeat: Infinity, ease: 'easeInOut' },
                                                rotate: { delay: 0.7 + item.delay, duration: 6 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleIconClick(item.link)}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-xl border-2 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                style={{ borderColor: `${item.color}40` }}
                                            >
                                                <item.icon size={14} style={{ color: item.color }} />
                                            </div>
                                            <span className="mt-0.5 text-[8px] font-medium text-text-heading bg-white/80 backdrop-blur-sm px-1 py-0.5 rounded-md whitespace-nowrap">
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Desktop floating icons around image */}
                            {floatingIcons.map((item, index) => {
                                const pos = desktopPositions[index];
                                return (
                                    <motion.div
                                        key={item.name}
                                        className="absolute hidden lg:flex flex-col items-center cursor-pointer z-30"
                                        style={pos}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: [0, 6, -4, 5, 0],
                                            y: [0, -10, -4, -12, 0],
                                            rotate: [0, 4, -2, 3, 0],
                                        }}
                                        transition={{
                                            opacity: { delay: 0.6 + item.delay, duration: 0.4 },
                                            scale: { delay: 0.6 + item.delay, duration: 0.4 },
                                            x: { delay: 0.6 + item.delay, duration: 7 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
                                            y: { delay: 0.6 + item.delay, duration: 6 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                                            rotate: { delay: 0.6 + item.delay, duration: 8 + index * 0.4, repeat: Infinity, ease: 'easeInOut' },
                                        }}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleIconClick(item.link)}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border-2 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                                            style={{ borderColor: `${item.color}40` }}
                                        >
                                            <item.icon size={22} style={{ color: item.color }} />
                                        </div>
                                        <span className="mt-1.5 text-[10px] font-medium text-text-heading bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-primary-light/30 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default Hero;
