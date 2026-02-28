import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useReducedMotion from '../../hooks/useReducedMotion';

const stats = [
    { value: '3.4k+', label: 'Active Clients', suffix: '+', prefix: '', endValue: 3400 },
    { value: '85k', label: 'Projects Done', suffix: '', prefix: '', endValue: 85 },
    { value: '180K', label: 'Work Joined', suffix: 'K', prefix: '', endValue: 180 },
    { value: '8.5k', label: 'Successful Campaigns', suffix: 'k', prefix: '', endValue: 8500 },
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

const StatCard = ({ stat, index, inView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
        >
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-heading tracking-tight font-heading">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} inView={inView} />
            </span>
            <span className="block text-[10px] sm:text-xs md:text-sm text-text-body font-medium uppercase tracking-wider mt-1 sm:mt-2">
                {stat.label}
            </span>
        </motion.div>
    );
};

const AboutUs = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

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
            <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-bg-soft via-white to-bg-soft">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left - Image */}
                        <FadeIn direction="right">
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                                    alt="Team working"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                            </div>
                        </FadeIn>

                        {/* Right - Text */}
                        <FadeIn direction="left" delay={0.2}>
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold leading-tight font-heading text-text-heading">
                                    Dedicated to Your <br />
                                    <span className="text-primary-teal">Success</span> with <br />
                                    <span className="text-cyan-500">Innovative</span> Digital <br />
                                    Marketing Solutions
                                </h2>
                                <p className="text-sm sm:text-base text-text-body leading-relaxed max-xl">
                                    When you choose our full-service digital marketing agency, you get a custom strategy that fits your unique goals.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Stats */}
                    <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 border-t border-border-light pt-8 sm:pt-10 md:pt-12 mt-8 sm:mt-10 md:mt-12">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} stat={stat} index={idx} inView={isStatsInView} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-[1280px] mx-auto text-center">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary-light to-cyan-50 text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6 border border-primary-teal/20">
                            <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
                            Our Vision & Mission
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-6 sm:mb-8 max-w-3xl mx-auto leading-tight font-heading">
                            Empowering Brands to Thrive in the <span className="text-gradient">Digital World</span>
                        </h2>
                    </FadeIn>

                    {/* Mission & Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
                        <FadeIn direction="right" delay={0.2}>
                            <motion.div
                                className="bg-bg-soft p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-card border border-border-light text-left"
                                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,128,128,0.1)' }}
                            >
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary-light text-primary-dark text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6">
                                    Our Mission
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-heading mb-3 sm:mb-4 font-heading">
                                    Empowering brands through innovation
                                </h3>
                                <p className="text-sm sm:text-base text-text-body leading-relaxed">
                                    We empower brands to thrive digitally through cutting-edge strategies that consistently engage, inspire, and foster sustainable growth.
                                </p>
                            </motion.div>
                        </FadeIn>

                        <FadeIn direction="left" delay={0.4}>
                            <motion.div
                                className="bg-gradient-to-br from-primary-teal to-primary-dark p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-card text-white relative overflow-hidden"
                                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,128,128,0.3)' }}
                            >
                                <div className="absolute right-0 top-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-sm">
                                        Our Vision
                                    </div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 font-heading">
                                        Leading digital transformation
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                                        To be the primary catalyst for digital transformation, setting new standards of creative excellence worldwide.
                                    </p>
                                </div>
                            </motion.div>
                        </FadeIn>
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
                                    className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-card border border-border-light hover:shadow-xl"
                                    whileHover={{ y: -8 }}
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
