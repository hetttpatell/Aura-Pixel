import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import {
    HiOutlineLightningBolt,
    HiOutlineUserGroup,
    HiOutlineBadgeCheck,
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineChartBar,
    HiOutlineCurrencyRupee,
    HiOutlineGlobe,
    HiOutlineClock,
    HiOutlineStar,
    HiOutlineCheckCircle,
    HiOutlineUserAdd
} from 'react-icons/hi';
import { FaRocket, FaHandshake, FaAward, FaUsers, FaChartLine, FaShieldAlt, FaMedal, FaCrown } from 'react-icons/fa';

const Counter = ({ value, suffix, inView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const end = value;
        const duration = 2500;
        const incrementTime = duration / 60;

        const timer = setInterval(() => {
            start += 1;
            const progress = start / 60;
            const current = Math.round(progress * end);

            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [inView, value]);

    return <span>{count}{suffix}</span>;
};

const StatCard = ({ icon: StatIcon, value, suffix, label, index, inView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
        >
            <div className="bg-gradient-to-br from-white to-bg-soft rounded-2xl p-6 shadow-card border border-border-light hover:shadow-lg hover:shadow-md transition-all duration-500 group hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-2xl" />

                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
                        <StatIcon size={26} className="text-white" />
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold text-text-heading">
                            <Counter value={value} suffix={suffix} inView={inView} />
                        </span>
                    </div>

                    <p className="text-text-body font-medium text-sm uppercase tracking-wide">
                        {label}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const ReasonCard = ({ icon: Icon, title, description, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-5 group"
        >
            <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-text-heading to-slate-900 flex items-center justify-center shadow-lg shadow-slate-800/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-teal group-hover:to-primary-teal transition-all duration-300">
                    <Icon size={24} className="text-white" />
                </div>
            </div>

            <div className="flex-1 pt-1">
                <h4 className="font-heading font-bold text-lg text-text-heading mb-2 group-hover:text-primary-teal transition-colors duration-300">
                    {title}
                </h4>
                <p className="text-text-body leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const FloatingSymbol = ({ icon: Icon, label, color, delay, position }) => {
    return (
        <motion.div
            className="absolute hidden lg:flex flex-col items-center z-30"
            style={position}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            whileInView={{
                opacity: 1,
                scale: 1,
                rotate: 0,
            }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{
                opacity: { delay: delay, duration: 0.5 },
                scale: { delay: delay, duration: 0.5, type: 'spring' },
                rotate: { delay: delay, duration: 0.5 },
            }}
        >
            <motion.div
                className="w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-xl border-2 flex items-center justify-center shadow-xl"
                style={{ borderColor: color }}
                animate={{
                    y: [0, -8, 0],
                    boxShadow: [
                        '0 4px 20px rgba(0,0,0,0.1)',
                        '0 8px 30px rgba(0,0,0,0.15)',
                        '0 4px 20px rgba(0,0,0,0.1)'
                    ]
                }}
                transition={{
                    y: { delay: delay + 0.5, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                    boxShadow: { delay: delay + 0.5, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                }}
            >
                <Icon size={26} style={{ color }} />
            </motion.div>
            <span className="mt-3 text-xs font-bold text-text-heading bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
                {label}
            </span>
        </motion.div>
    );
};

const TrustBadge = ({ icon: Icon, label, color, index }) => {
    return (
        <motion.div
            className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
            >
                <Icon size={20} style={{ color }} />
            </div>
            <span className="text-text-heading font-semibold text-sm">{label}</span>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (isMobile) return;
        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set((e.clientX - centerX) / 60);
            mouseY.set((e.clientY - centerY) / 60);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, isMobile]);

    const features = [
        {
            icon: HiOutlineLightningBolt,
            value: 10,
            suffix: '+',
            label: 'Years Experience',
        },
        {
            icon: HiOutlineUserGroup,
            value: 150,
            suffix: '+',
            label: 'Happy Clients',
        },
        {
            icon: HiOutlineBadgeCheck,
            value: 500,
            suffix: '+',
            label: 'Projects Delivered',
        },
        {
            icon: HiOutlineTrendingUp,
            value: 300,
            suffix: '%',
            label: 'Average ROI',
        },
    ];

    const reasons = [
        {
            icon: FaRocket,
            title: 'Results-Driven Approach',
            description: 'We focus on measurable outcomes, not just vanity metrics. Every strategy is designed to drive real business growth and ROI.',
        },
        {
            icon: FaHandshake,
            title: 'Partnership Mentality',
            description: 'We treat your business like our own. Our team becomes an extension of yours, fully invested in achieving your goals.',
        },
        {
            icon: HiOutlineChartBar,
            title: 'Data-Backed Decisions',
            description: 'All our recommendations are backed by comprehensive analytics and industry research. No guesswork—just proven strategies.',
        },
        {
            icon: HiOutlineShieldCheck,
            title: 'Trusted & Certified',
            description: 'With industry-recognized certifications and a proven track record, you can rest assured your digital presence is in expert hands.',
        },
    ];

    const floatingSymbols = [
        { icon: FaCrown, label: 'Premium Service', color: '#f59e0b', delay: 0.7, position: { top: '0%', left: '-5%' } },
        { icon: FaShieldAlt, label: '100% Secure', color: '#10b981', delay: 0.8, position: { top: '5%', right: '-8%' } },
        { icon: FaMedal, label: 'Award Winner', color: '#8b5cf6', delay: 0.9, position: { top: '40%', left: '-12%' } },
        { icon: FaChartLine, label: '300% Growth', color: '#06b6d4', delay: 1.0, position: { top: '35%', right: '-12%' } },
        { icon: FaUsers, label: 'Expert Team', color: '#ef4444', delay: 1.1, position: { top: '70%', left: '-8%' } },
        { icon: HiOutlineClock, label: 'On-Time', color: '#f97316', delay: 1.2, position: { top: '75%', right: '-5%' } },
    ];

    const trustBadges = [
        { icon: FaAward, label: 'Industry Award Winner', color: '#f59e0b' },
        { icon: HiOutlineShieldCheck, label: 'Google Certified Partner', color: '#4285f4' },
        { icon: HiOutlineBadgeCheck, label: '100% Satisfaction', color: '#10b981' },
        { icon: HiOutlineCurrencyRupee, label: 'Best Pricing', color: '#8b5cf6' },
        { icon: HiOutlineGlobe, label: 'Global Clients', color: '#06b6d4' },
        { icon: HiOutlineStar, label: '5-Star Rating', color: '#f59e0b' },
        { icon: HiOutlineCheckCircle, label: 'ISO Certified', color: '#10b981' },
        { icon: HiOutlineUserAdd, label: 'Dedicated Support', color: '#ef4444' },
    ];

    return (
        <section id="about" className="py-16 md:py-24 bg-bg-soft relative overflow-hidden" ref={ref}>
            {/* Subtle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-full mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                        Why Choose Us
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-heading mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Your Success is Our
                        <span className="block text-gradient"> Priority</span>
                    </motion.h2>

                    <motion.p
                        className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        We combine creativity with data-driven strategies to deliver exceptional results.
                        Here's what makes us the preferred choice for businesses worldwide.
                    </motion.p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <StatCard
                            key={feature.label}
                            {...feature}
                            index={index}
                            inView={isInView}
                        />
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Left Column - Text Content */}
                    <div>
                        <motion.h3
                            className="text-2xl md:text-3xl font-heading font-bold text-text-heading mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Why Businesses
                            <span className="text-gradient"> Trust Us</span>
                        </motion.h3>

                        <p className="text-text-body leading-relaxed mb-8 text-base">
                            We're not just another agency—we're your strategic partner in digital growth.
                            Our commitment to excellence and transparent communication sets us apart
                            from the competition.
                        </p>

                        {/* Reasons List */}
                        <div className="space-y-6">
                            {reasons.map((reason, index) => (
                                <ReasonCard key={reason.title} {...reason} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Bigger Visual with More Floating Symbols */}
                    <div className="relative">
                        <motion.div
                            className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        >
                            {/* Splash Background - Bigger */}
                            <motion.img
                                src="/p-SPLASH.png"
                                alt="Splash Background"
                                className="w-full h-auto relative z-10"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            />

                            {/* Priyal Character - Bigger with enhanced animations */}
                            <motion.img
                                src="/Priyal.png"
                                alt="Priyal Character"
                                className="absolute top-0 left-0 w-full h-auto z-20"
                                style={isMobile ? {} : { x, y }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{
                                    opacity: 1,
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    opacity: { delay: 0.6, duration: 0.6 },
                                    y: {
                                        delay: 0.6,
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                            />

                            {/* More Floating Symbols */}
                            {floatingSymbols.map((symbol, index) => (
                                <FloatingSymbol key={index} {...symbol} />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
