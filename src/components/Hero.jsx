import { useEffect } from 'react';
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            mouseX.set((clientX - centerX) / 50);
            mouseY.set((clientY - centerY) / 50);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const floatingIcons = [
        { icon: SiGoogleads, name: 'Google Ads', color: '#4285F4', link: 'https://ads.google.com', delay: 0 },
        { icon: SiMeta, name: 'Meta Ads', color: '#0668E1', link: 'https://www.meta.com/business', delay: 0.1 },
        { icon: HiOutlineSearch, name: 'SEO', color: '#008080', link: '#services', delay: 0.2 },
        { icon: SiInstagram, name: 'Instagram', color: '#E4405F', link: 'https://instagram.com', delay: 0.3 },
        { icon: SiFacebook, name: 'Facebook', color: '#1877F2', link: 'https://facebook.com', delay: 0.4 },
        { icon: SiLinkedin, name: 'LinkedIn', color: '#0A66C2', link: 'https://linkedin.com', delay: 0.5 },
        { icon: SiGoogleanalytics, name: 'Analytics', color: '#F9AB00', link: 'https://analytics.google.com', delay: 0.6 },
        { icon: SiMailchimp, name: 'Email Marketing', color: '#FFE01B', link: '#services', delay: 0.7 },
    ];

    const stats = [
        { value: '150+', label: 'Clients' },
        { value: '5M+', label: 'Ad Spend' },
        { value: '300%', label: 'ROI' },
        { value: '95%', label: 'Retention' },
    ];

    const handleIconClick = (link) => {
        if (link.startsWith('#')) {
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center pt-26 lg:pt-32 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 w-full h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center w-full">
                    {/* Left Content */}
                    <motion.div
                        className="order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="inline-block px-3 py-1.5 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Digital Marketing Excellence
                        </motion.span>

                        <motion.h1
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Ignite Your Brand's Aura{' '}
                            <span className="text-gradient">Pixel-Perfect Growth</span>
                        </motion.h1>

                        <motion.p
                            className="text-base text-text-body mb-6 max-w-xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Performance-driven digital marketing that turns traffic into measurable revenue.
                            We blend creativity with data to deliver exceptional results.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-3 mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <motion.a
                                href="#contact"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Get Started
                                <HiArrowRight className="text-lg" />
                            </motion.a>
                            <motion.a
                                href="#portfolio"
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                View Portfolio
                            </motion.a>
                        </motion.div>

                        {/* Stats Section - Grid Layout */}
                        <motion.div
                            className="grid grid-cols-2 gap-4 mt-6 max-w-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="relative group"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="relative bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl p-3 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                        {/* Gradient accent line */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal via-teal-400 to-primary-teal rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity" />

                                        <div className="text-center">
                                            <motion.span
                                                className="block text-2xl font-heading font-bold bg-gradient-to-r from-primary-teal to-teal-600 bg-clip-text text-transparent"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1 + index * 0.1 }}
                                            >
                                                {stat.value}
                                            </motion.span>
                                            <span className="block text-xs text-text-body mt-1 font-medium">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Illustration with Floating Elements */}
                    <motion.div
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Main Illustration - Splash.png as sticky background */}
                            <div
                                className="relative w-full max-w-md mx-auto"
                            >
                                {/* Splash.png - Sticky Background (completely static, no motion) */}
                                <motion.img
                                    src="/Splash.png"
                                    alt="Splash Background"
                                    className="w-full h-auto relative z-10"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                />
                                {/* Gibli.png - Overlay on top of Splash (moves with cursor) */}
                                <motion.img
                                    src="/Gibli.png"
                                    alt="Gibli Character"
                                    className="absolute top-0 left-0 w-full h-auto z-20"
                                    style={{ x, y }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        opacity: { delay: 0.6, duration: 0.6 },
                                        y: {
                                            delay: 0.6,
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                />
                            </div>

                            {/* Floating Icon Cards */}
                            {floatingIcons.map((item, index) => {
                                const positions = [
                                    { top: '5%', left: '10%' },
                                    { top: '0%', right: '15%' },
                                    { top: '25%', left: '-5%' },
                                    { top: '20%', right: '-5%' },
                                    { top: '55%', left: '-8%' },
                                    { top: '50%', right: '-8%' },
                                    { top: '75%', left: '5%' },
                                    { top: '80%', right: '10%' },
                                ];
                                const pos = positions[index];

                                return (
                                    <motion.div
                                        key={item.name}
                                        className="absolute hidden lg:flex flex-col items-center cursor-pointer z-30"
                                        style={pos}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: [0, 8, -5, 6, 0],
                                            y: [0, -12, -5, -15, 0],
                                            rotate: [0, 5, -3, 4, 0],
                                        }}
                                        transition={{
                                            opacity: { delay: 0.6 + item.delay, duration: 0.4 },
                                            scale: { delay: 0.6 + item.delay, duration: 0.4 },
                                            x: {
                                                delay: 0.6 + item.delay,
                                                duration: 6 + index * 0.5,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            },
                                            y: {
                                                delay: 0.6 + item.delay,
                                                duration: 5 + index * 0.3,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            },
                                            rotate: {
                                                delay: 0.6 + item.delay,
                                                duration: 7 + index * 0.4,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            },
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleIconClick(item.link)}
                                    >
                                        <div
                                            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-xl border-2 flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
                                            style={{ borderColor: `${item.color}40` }}
                                        >
                                            <item.icon size={24} style={{ color: item.color }} />
                                        </div>
                                        <span className="mt-2 text-xs font-medium text-text-heading bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap">
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
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/30 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default Hero;
