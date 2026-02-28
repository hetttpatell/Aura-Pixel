import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const stats = [
    { value: '3.4k+', label: 'Active Clients' },
    { value: '85k', label: 'Projects Done' },
    { value: '180K', label: 'Work Joined' },
    { value: '8.5k', label: 'Successful Campaigns' },
];

const team = [
    { name: 'Kathan', role: 'Founder & CEO', image: '/kathaan-about.png', isMale: true },
    { name: 'Priyal', role: 'Creative Director', image: '/priyal-About.png', isMale: false },
    { name: 'Alex', role: 'Marketing Head', image: '/kathaan-about.png', isMale: true },
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

const AboutUs = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    return (
        <div className="bg-bg-main min-h-screen font-body overflow-hidden py-12 text-text-body">
            {/* 1. Page Header */}
            <section className="pt-32 pb-16 text-center px-4">
                <FadeIn>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-4 font-heading">About Us</h1>
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-text-body/80">
                        <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary-teal">About Us</span>
                    </div>
                </FadeIn>
            </section>

            {/* 2. Dark Stats Section */}
            <section className="bg-text-heading text-white py-24 px-4 sm:px-8 relative overflow-hidden">
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-teal/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-teal/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-[1280px] mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 items-center">
                        {/* Left Image/Video block */}
                        <FadeIn direction="right">
                            <div className="relative rounded-[2rem] overflow-hidden group">
                                {/* Embedded placeholder for the video/image in the design */}
                                <div className="aspect-[4/3] bg-gradient-to-tr from-gray-800 to-gray-900 overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                                        alt="Team working"
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-text-heading/40 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="mt-8">
                                    <p className="text-text-body/80 text-sm leading-relaxed border-l-2 border-primary-teal pl-4">
                                        <strong className="text-white">We provide high-quality digital marketing agency Since 1999</strong>, we transform concepts into amazing digital experiences. We help you reach your goals by combining innovative design techniques with advanced tools to generate maximum ROI.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Text Block */}
                        <FadeIn direction="left">
                            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] mb-8 font-heading">
                                Dedicated to Your <br className="hidden lg:block" />
                                Success with <span className="text-primary-teal inline-block relative">
                                    Innovative
                                    {/* Small decorative sparkle */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute -right-12 -top-8 text-primary-teal/40 hidden md:block"
                                    >
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                                        </svg>
                                    </motion.div>
                                </span> <br className="hidden lg:block" />
                                Digital Marketing Solutions
                            </h2>
                            <p className="text-text-body/80 text-lg md:text-xl leading-relaxed max-w-xl">
                                When you choose our full-service digital marketing agency, you get a custom strategy that fits your unique goals. We combine data-driven insights with creative excellence to accelerate your path to market leadership.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16">
                        {stats.map((stat, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">{stat.value}</span>
                                    <span className="text-sm md:text-base text-text-body/80 font-medium uppercase tracking-wider">{stat.label}</span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission (Large Feature) Section */}
            <section className="py-24 px-4 sm:px-8 relative">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50 pointer-events-none" />

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary-light text-primary-dark text-xs font-bold tracking-widest uppercase mb-6 border border-primary-teal/20">
                            Our Vision & Mission
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-text-heading mb-12 max-w-3xl mx-auto leading-tight font-heading">
                            Empowering Brands <br className="hidden sm:block" />
                            to Thrive in the Digital World
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] w-full max-w-[1200px] mx-auto shadow-2xl bg-bg-soft">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="Team collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 4. Team Section */}
            <section className="py-24 px-4 sm:px-8 bg-bg-soft/50">
                <div className="max-w-[1280px] mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary-light text-primary-dark text-xs font-bold tracking-widest uppercase mb-6 border border-primary-teal/20">
                            Our Team
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-text-heading mb-16 max-w-xl leading-tight font-heading">
                            Introducing Our <br />
                            Expert Marketing Team
                        </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {team.map((member, idx) => (
                            <FadeIn key={idx} delay={idx * 0.15}>
                                <div className="group relative bg-bg-main rounded-[2rem] overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-border-light">
                                    <div className="aspect-[4/5] bg-bg-soft relative overflow-hidden flex items-end justify-center pt-8 px-8">
                                        {/* Character background element */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-auto object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-main/90 via-bg-main/80 to-transparent backdrop-blur-sm z-20 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <h3 className="text-xl font-bold text-text-heading font-heading">{member.name}</h3>
                                        <p className="text-primary-teal font-medium text-sm">{member.role}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* 5. Mission/Vision Split Cards */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <FadeIn delay={0.2} direction="right">
                            <div className="bg-bg-main p-12 md:p-16 rounded-[2rem] shadow-card border border-border-light h-full flex flex-col justify-center">
                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary-light text-primary-dark text-[10px] font-bold tracking-widest uppercase mb-8 w-fit">
                                    Our Mission
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-text-heading mb-6 leading-tight font-heading">
                                    Our mission is to empower brands through innovation.
                                </h3>
                                <p className="text-text-body text-lg leading-relaxed">
                                    Empowering brands to thrive digitally through cutting-edge strategies that consistently engage, inspire, and foster sustainable growth using scalable tools.
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4} direction="left">
                            <div className="bg-primary-teal p-12 md:p-16 rounded-[2rem] shadow-card h-full flex flex-col justify-center relative overflow-hidden text-white">
                                {/* Visual decoration inside teal card */}
                                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-8 w-fit relative z-10 backdrop-blur-sm">
                                    Our Vision
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight relative z-10 font-heading">
                                    Empowering brands to thrive digitally.
                                </h3>
                                <p className="text-white/80 text-lg leading-relaxed relative z-10">
                                    To be the primary catalyst for digital transformation, setting new standards of creative excellence and driving measurable impact for brands worldwide.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-24 px-4 sm:px-8">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        <FadeIn>
                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary-light text-primary-dark text-xs font-bold tracking-widest uppercase mb-6 border border-primary-teal/20">
                                FAQ
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-text-heading mb-8 leading-tight font-heading">
                                Answers to Your <br />
                                Most Common <br />
                                Questions
                            </h2>
                            <p className="text-text-body text-lg mb-8 max-w-md">
                                Find quick answers to common questions about our digital marketing services, workflows, and what it's like to partner with us.
                            </p>
                        </FadeIn>

                        <div className="flex flex-col gap-4">
                            {faqs.map((faq, idx) => {
                                const isOpen = openFaqIndex === idx;
                                return (
                                    <FadeIn key={idx} delay={idx * 0.1} direction="left">
                                        <div
                                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                                            className={`cursor-pointer border rounded-2xl p-6 transition-all duration-300 ${isOpen ? 'border-primary-teal bg-primary-teal/5 shadow-sm' : 'border-border-light bg-bg-main hover:border-gray-300'}`}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <h4 className={`text-lg font-bold transition-colors font-heading ${isOpen ? 'text-primary-teal' : 'text-text-heading'}`}>
                                                    {faq.question}
                                                </h4>
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary-teal text-white' : 'bg-bg-soft text-text-body'}`}>
                                                    {isOpen ? <BsChevronUp size={18} /> : <BsChevronDown size={18} />}
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-text-body leading-relaxed border-t border-border-light/50 pt-4">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
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
