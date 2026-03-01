import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useReducedMotion from '../../hooks/useReducedMotion';

const stats = [
    { value: '3.4k', label: 'Active Clients', suffix: '+', prefix: '', endValue: 3400 },
    { value: '85k', label: 'Projects Done', suffix: '', prefix: '', endValue: 85 },
    { value: '180K', label: 'Work Joined', suffix: 'K', prefix: '', endValue: 180 },
    { value: '8.5', label: 'Successful Campaigns', suffix: 'k', prefix: '', endValue: 8500 },
];

const team = [
    { name: 'Kathan', role: 'Founder & CEO', image: '/kathaan-about.png', splash: '/p-SPLASH.png' },
    { name: 'Priyal', role: 'Creative Director', image: '/priyal-About.png', splash: '/Splash.png' },
];

const faqs = [
    {
        question: 'What services do you offer?',
        answer: 'We provide a comprehensive suite of digital marketing services including SEO, Social Media Marketing, Performance Ads, Web Development, and Brand Strategy tailored to your specific goals.'
    },
    {
        question: 'How do you measure campaign success?',
        answer: 'We track key performance indicators (KPIs) such as ROI, conversion rates, cost per acquisition (CPA), and overall engagement metrics using advanced analytics tools to ensure transparent reporting.'
    },
    {
        question: 'Do you work with startups?',
        answer: 'Yes! We love partnering with startups to build their digital presence from the ground up, offering scalable solutions that grow alongside their business.'
    },
    {
        question: 'What makes your agency different?',
        answer: 'Our unique blend of data-driven strategies and creative brilliance sets us apart. We act as an extension of your team, deeply invested in your long-term success rather than just short-term wins.'
    }
];

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Counter = ({ value, suffix, prefix, inView }) => {
    const [count, setCount] = useState('0');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!inView) return;
        if (shouldReduceMotion) {
            setCount(value);
            return;
        }

        let start = 0;
        const end = parseFloat(value.replace(/[kK+]/g, '')) * (value.includes('k') || value.includes('K') ? 1000 : 1);
        const duration = 2000;
        const incrementTime = duration / 60;

        const timer = setInterval(() => {
            start += 1;
            const progress = start / 60;
            const current = Math.round(progress * end);

            if (current >= end) {
                setCount(value);
                clearInterval(timer);
            } else {
                const displayValue = current >= 1000 ? (current / 1000).toFixed(1) + 'k' : current;
                setCount(displayValue);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [inView, value, shouldReduceMotion]);

    return <span>{prefix}{count}{suffix}</span>;
};

// StatCard component has been replaced with inline motion.div for better performance

const AboutUs = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="bg-bg-main font-body overflow-x-hidden text-text-body">
            {/* Page Header */}
            <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 text-center px-4">
                <FadeIn>
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-light text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
                        About Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading mb-3 sm:mb-4 font-heading">
                        About <span className="text-gradient">Aura Pixel</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-text-body/80">
                        <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary-teal">About Us</span>
                    </div>
                </FadeIn>
            </section>

            {/* Dedicated to Your Success */}
            <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 overflow-hidden">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* Left - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="relative order-2 md:order-1"
                        >
                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-2xl image-hover-lift gpu-smooth">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                                    alt="Team working"
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                            </div>
                            {/* Decorative Element */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-teal/20 to-cyan-400/20 rounded-full blur-2xl"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Right - Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6 sm:space-y-8 order-1 md:order-2"
                        >
                            {/* Section Label */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/80 rounded-full"
                            >
                                <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-primary-teal tracking-wide">Our Commitment</span>
                            </motion.div>

                            {/* Enhanced Heading */}
                            <h2 className="dedicated-heading text-shadow-soft">
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.35 }}
                                    className="line block"
                                >
                                    Dedicated to Your{' '}
                                    <span className="highlight">Success</span>
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.45 }}
                                    className="line block"
                                >
                                    with <span className="highlight-cyan">Innovative</span>
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.55 }}
                                    className="line block"
                                >
                                    Digital Marketing Solutions
                                </motion.span>
                            </h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.65 }}
                                className="text-base sm:text-lg text-text-body leading-relaxed max-w-lg"
                            >
                                When you choose our full-service digital marketing agency, you get a custom strategy that fits your unique goals. We blend creativity with data-driven insights to deliver exceptional results.
                            </motion.p>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.75 }}
                            >
                                <motion.a
                                    href="/#services"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-teal to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Explore Our Services
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        ref={statsRef}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-10 sm:pt-14 md:pt-16 mt-10 sm:mt-14 md:mt-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Animated Border Top */}
                        <motion.div
                            className="col-span-full h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent mb-8 sm:mb-10"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{
                                    duration: 0.7,
                                    delay: idx * 0.12,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="relative text-center p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-primary-teal/10 hover:border-primary-teal/30 hover:bg-white/80 hover:shadow-lg transition-all duration-500 gpu-smooth"
                            >
                                {/* Subtle gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-cyan-400/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading tracking-tight font-heading bg-gradient-to-r from-primary-teal to-cyan-600 bg-clip-text text-transparent">
                                        <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} inView={isStatsInView} />
                                    </span>
                                    <span className="block text-xs sm:text-sm text-text-body font-medium uppercase tracking-widest mt-2 sm:mt-3">
                                        {stat.label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-light to-cyan-50 text-primary-teal font-heading font-semibold text-sm rounded-full mb-6 sm:mb-8 border border-primary-teal/20"
                        >
                            <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
                            Our Vision & Mission
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading mb-6 sm:mb-8 max-w-4xl mx-auto leading-tight font-heading">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="block"
                            >
                                Empowering Brands to
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="block"
                            >
                                Thrive in the <span className="text-gradient">Digital World</span>
                            </motion.span>
                        </h2>
                    </motion.div>

                    {/* Mission & Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-14 md:mt-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotateY: -5 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 text-left h-full gpu-smooth relative overflow-hidden group"
                                whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(0,128,128,0.15)' }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary-light text-primary-dark text-xs font-bold tracking-widest uppercase mb-6"
                                    >
                                        Our Mission
                                    </motion.div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-heading mb-4 font-heading">
                                        Empowering brands through innovation
                                    </h3>
                                    <p className="text-base sm:text-lg text-text-body leading-relaxed">
                                        We empower brands to thrive digitally through cutting-edge strategies that consistently engage, inspire, and foster sustainable growth.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50, rotateY: 5 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="bg-gradient-to-br from-primary-teal via-teal-600 to-cyan-700 p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-xl text-white relative overflow-hidden h-full gpu-smooth group"
                                whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(0,128,128,0.35)' }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Animated background elements */}
                                <motion.div
                                    className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute left-0 bottom-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                />
                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
                                    >
                                        Our Vision
                                    </motion.div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 font-heading">
                                        Leading digital transformation
                                    </h3>
                                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                                        To be the primary catalyst for digital transformation, setting new standards of creative excellence worldwide.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-bg-soft">
                <div className="max-w-[1280px] mx-auto">
                    <FadeIn>
                        <div className="text-center mb-8 sm:mb-10 md:mb-12">
                            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary-light to-cyan-50 text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6 border border-primary-teal/20">
                                <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
                                Our Team
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading font-heading">
                                Meet Our <span className="text-gradient">Leadership</span>
                            </h2>
                            <p className="max-w-xl mx-auto text-sm sm:text-base text-text-body mt-3 sm:mt-4">
                                The visionary minds behind Aura Pixel's success
                            </p>
                        </div>
                    </FadeIn>

                    {/* Team Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-3xl mx-auto">
                        {team.map((member, idx) => (
                            <FadeIn key={idx} delay={idx * 0.15}>
                                <motion.div
                                    className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-card border border-border-light hover:shadow-xl will-change-transform"
                                    whileHover={{ y: -4 }}
                                    style={{ transform: 'translateZ(0)' }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-gradient-to-br from-bg-soft to-white">
                                        <img
                                            src={member.splash}
                                            alt="Splash"
                                            className="absolute inset-0 w-full h-full object-contain opacity-15"
                                        />
                                        <div className="absolute inset-0 flex items-end justify-center pb-2 sm:pb-4">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-contain object-bottom max-h-[85%] sm:max-h-[90%]"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                    </div>

                                    {/* Team Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
                                        <h3 className="text-xl sm:text-2xl font-bold text-text-heading font-heading">{member.name}</h3>
                                        <p className="text-sm sm:text-base text-primary-teal font-semibold">{member.role}</p>
                                    </div>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
                        <FadeIn>
                            <div>
                                <div className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-light text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6 border border-primary-teal/20">
                                    FAQ
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-4 sm:mb-6 font-heading">
                                    Answers to Your <br />
                                    Most Common <span className="text-gradient">Questions</span>
                                </h2>
                                <p className="text-sm sm:text-base text-text-body max-w-md">
                                    Find quick answers to common questions about our digital marketing services.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="flex flex-col gap-3 sm:gap-4">
                            {faqs.map((faq, idx) => {
                                const isOpen = openFaqIndex === idx;
                                return (
                                    <FadeIn key={idx} delay={idx * 0.1} direction="left">
                                        <motion.div
                                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                                            className={`cursor-pointer border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${isOpen ? 'border-primary-teal bg-primary-teal/5 shadow-sm' : 'border-border-light bg-white hover:border-gray-300'}`}
                                        >
                                            <div className="flex justify-between items-center gap-3 sm:gap-4">
                                                <h4 className={`text-sm sm:text-base md:text-lg font-bold transition-colors font-heading ${isOpen ? 'text-primary-teal' : 'text-text-heading'}`}>
                                                    {faq.question}
                                                </h4>
                                                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-teal text-white' : 'bg-bg-soft text-text-body'}`}>
                                                    {isOpen ? <BsChevronUp size={14} sm:size={16} /> : <BsChevronDown size={14} sm:size={16} />}
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-xs sm:text-sm text-text-body leading-relaxed border-t border-border-light/50 pt-3 sm:pt-4">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </FadeIn>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
