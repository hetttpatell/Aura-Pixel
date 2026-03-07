import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineEye, HiOutlineX, HiOutlineChevronLeft, HiOutlineCheckCircle } from 'react-icons/hi';
import { useReducedMotion } from '../../hooks';

const filters = ['All', 'Branding', 'Web Design', 'Marketing', 'Social Media'];

const projects = [
    {
        id: 1,
        title: 'TechFlow SaaS Platform',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        description: 'Complete website redesign with 200% increase in conversions',
        fullDescription: 'TechFlow approached us with a challenge: their outdated website was failing to convert visitors into customers. We conducted extensive user research, redesigned the entire user experience, and implemented a modern, conversion-focused design. The result was a stunning 200% increase in conversion rates within the first three months. Our approach included A/B testing, heatmap analysis, and iterative improvements to ensure optimal performance.',
        stats: '200% ROI',
        statsLabel: 'Increase',
        color: 'from-teal-500 to-cyan-500',
        client: 'TechFlow Inc.',
        duration: '3 months',
        services: ['UI/UX Design', 'Web Development', 'Conversion Optimization', 'A/B Testing'],
        results: ['200% increase in conversions', '45% reduction in bounce rate', '3x increase in page views', '150% growth in sign-ups']
    },
    {
        id: 2,
        title: 'Luxe Fashion Brand',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        description: 'Brand identity and social media strategy',
        fullDescription: 'Luxe Fashion needed a complete brand transformation to appeal to a younger, more digital-savvy audience. We developed a comprehensive brand identity including logo redesign, color palette, typography, and brand guidelines. Combined with a strategic social media presence, the brand reached over 500K people within the first month of launch, establishing Luxe as a trendsetter in the fashion industry.',
        stats: '500K',
        statsLabel: 'Reach',
        color: 'from-purple-500 to-pink-500',
        client: 'Luxe Fashion Co.',
        duration: '2 months',
        services: ['Brand Identity', 'Logo Design', 'Social Media Strategy', 'Content Creation'],
        results: ['500K social reach', 'Brand recognition up 80%', '120% follower growth', '45% engagement rate increase']
    },
    {
        id: 3,
        title: 'FitLife App Campaign',
        category: 'Marketing',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        description: 'Performance marketing campaign for fitness app',
        fullDescription: 'FitLife needed to stand out in the crowded fitness app market. We designed and executed a multi-channel performance marketing campaign targeting health-conscious millennials. Through strategic ad placements, influencer partnerships, and compelling creative, we achieved a 150% increase in app installs while maintaining a cost-per-acquisition well below industry benchmarks.',
        stats: '150%',
        statsLabel: 'Installs',
        color: 'from-orange-500 to-red-500',
        client: 'FitLife Technologies',
        duration: '4 months',
        services: ['Performance Marketing', 'Influencer Marketing', 'Creative Design', 'Analytics'],
        results: ['150% increase in installs', '40% lower CPA', '2M+ ad impressions', '25% user retention improvement']
    },
    {
        id: 4,
        title: 'Gourmet Kitchen',
        category: 'Social Media',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
        description: 'Instagram and Facebook growth strategy',
        fullDescription: 'Gourmet Kitchen, a premium culinary brand, wanted to build a strong social media presence from scratch. We developed a content strategy focused on mouthwatering food photography, behind-the-scenes content, and interactive stories. Within six months, the brand grew to over 1 million followers, becoming one of the most followed food brands in the region with exceptional engagement rates.',
        stats: '1M',
        statsLabel: 'Followers',
        color: 'from-green-500 to-emerald-500',
        client: 'Gourmet Kitchen Ltd.',
        duration: '6 months',
        services: ['Social Media Management', 'Content Strategy', 'Photography', 'Community Management'],
        results: ['1M+ followers gained', '8% average engagement', '50M+ monthly impressions', '300% increase in website traffic']
    },
    {
        id: 5,
        title: 'EcoTech Solutions',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        description: 'Complete brand transformation for sustainability company',
        fullDescription: 'EcoTech Solutions, a green technology company, needed a brand that communicated their commitment to sustainability while appealing to corporate clients. We crafted a modern, eco-friendly brand identity that balanced professionalism with environmental consciousness. The rebrand increased brand awareness by 85% and helped secure partnerships with major corporations seeking sustainable solutions.',
        stats: '85%',
        statsLabel: 'Awareness',
        color: 'from-blue-500 to-indigo-500',
        client: 'EcoTech Solutions',
        duration: '3 months',
        services: ['Brand Strategy', 'Visual Identity', 'Website Design', 'Marketing Collateral'],
        results: ['85% brand awareness increase', '12 new corporate partnerships', '60% increase in inquiries', 'Industry award winner']
    },
    {
        id: 6,
        title: 'FinanceHub Dashboard',
        category: 'Web Design',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        description: 'Financial dashboard UI/UX design',
        fullDescription: 'FinanceHub required an intuitive yet powerful dashboard for their financial analytics platform. We designed a user-centric interface that simplified complex financial data into actionable insights. The new design increased user engagement by 40%, reduced support tickets by 60%, and received overwhelmingly positive feedback from both new users and power users alike.',
        stats: '40%',
        statsLabel: 'Engagement',
        color: 'from-violet-500 to-purple-500',
        client: 'FinanceHub Corp.',
        duration: '4 months',
        services: ['UI/UX Design', 'Dashboard Development', 'User Research', 'Usability Testing'],
        results: ['40% increase in engagement', '60% fewer support tickets', '4.8/5 user satisfaction', '50% faster task completion']
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Portfolio Detail Modal Component
const PortfolioDetail = ({ project, onClose }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-bg-main overflow-y-auto"
        >
            {/* Reading Progress Bar */}
            <motion.div
                className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} z-[301] origin-left`}
                style={{ scaleX }}
            />

            {/* Close Button */}
            <motion.button
                onClick={onClose}
                className="fixed top-4 right-4 md:top-8 md:right-8 z-[302] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-text-heading hover:text-primary-teal hover:shadow-xl transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                <HiOutlineX size={24} />
            </motion.button>

            {/* Back Button */}
            <motion.button
                onClick={onClose}
                className="fixed top-4 left-4 md:top-8 md:left-8 z-[302] flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg text-text-heading hover:text-primary-teal hover:shadow-xl transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: -4 }}
            >
                <HiOutlineChevronLeft size={20} />
                <span className="font-medium text-sm hidden sm:inline">Back to Portfolio</span>
            </motion.button>

            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent" />

                {/* Stats Overlay */}
                <motion.div
                    className="absolute bottom-8 right-8 z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={`px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-2xl shadow-2xl`}>
                        <span className="text-3xl md:text-4xl font-bold">{project.stats}</span>
                        <span className="ml-2 text-sm opacity-90">{project.statsLabel}</span>
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-20">
                {/* Category & Client */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap items-center gap-3 mb-4"
                >
                    <span className={`px-4 py-1.5 bg-gradient-to-r ${project.color} text-white text-sm font-bold rounded-full`}>
                        {project.category}
                    </span>
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-text-heading text-sm font-medium rounded-full border border-border-light">
                        {project.client}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-heading mb-6 leading-tight"
                >
                    {project.title}
                </motion.h1>

                {/* Project Meta */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border-light"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-text-muted text-sm">Duration:</span>
                        <span className="font-semibold text-text-heading">{project.duration}</span>
                    </div>
                    <div className="h-4 w-px bg-border-light hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <span className="text-text-muted text-sm">Client:</span>
                        <span className="font-semibold text-text-heading">{project.client}</span>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-heading font-bold text-text-heading mb-4">Project Overview</h2>
                    <p className="text-lg text-text-body leading-relaxed">
                        {project.fullDescription}
                    </p>
                </motion.div>

                {/* Services & Results Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 border border-border-light shadow-lg"
                    >
                        <h3 className="text-xl font-heading font-bold text-text-heading mb-4 flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                                <HiOutlineEye className="text-white" size={16} />
                            </span>
                            Services Provided
                        </h3>
                        <ul className="space-y-3">
                            {project.services.map((service, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    className="flex items-center gap-3 text-text-body"
                                >
                                    <HiOutlineCheckCircle className="text-primary-teal flex-shrink-0" size={18} />
                                    {service}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-primary-teal to-primary-dark rounded-2xl p-6 text-white shadow-lg"
                    >
                        <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <HiOutlineExternalLink size={16} />
                            </span>
                            Key Results
                        </h3>
                        <ul className="space-y-3">
                            {project.results.map((result, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <HiOutlineCheckCircle className="text-white/80 flex-shrink-0" size={18} />
                                    {result}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-primary-teal to-primary-dark rounded-2xl p-8 md:p-12"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                                Want Similar Results?
                            </h2>
                            <p className="text-white/80 text-base md:text-lg max-w-lg">
                                Let's discuss how we can help your brand achieve remarkable growth.
                            </p>
                        </div>
                        <motion.a
                            href="/#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                                setTimeout(() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }, 300);
                            }}
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary-dark font-heading font-semibold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Free Consultation
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="portfolio" className="pb-[100px] bg-gradient-to-b from-bg-soft via-white to-bg-soft relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-primary-teal/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-teal/10 to-cyan-500/10 text-primary-teal font-heading font-semibold text-sm rounded-full mb-6 border border-primary-teal/20"
                    >
                        <span className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
                        Our Portfolio
                    </motion.div>
                    <h2 className="mb-6 text-4xl md:text-5xl font-heading font-bold">
                        Work That <span className="text-gradient bg-gradient-to-r from-primary-teal via-cyan-500 to-primary-teal bg-clip-text text-transparent">Speaks</span> Volumes
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body text-lg leading-relaxed">
                        Explore our successful projects and see how we've helped businesses
                        achieve remarkable growth through strategic digital marketing solutions.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {filters.map((filter, index) => (
                        <motion.button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className={`relative px-4 sm:px-7 py-2.5 sm:py-3 rounded-full font-heading font-semibold text-xs sm:text-sm ${activeFilter === filter
                                ? 'text-white'
                                : 'bg-white text-text-heading border border-border-light hover:border-primary-teal hover:text-primary-teal'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {activeFilter === filter && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gradient-to-r from-primary-teal to-cyan-500 rounded-full"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span className="relative z-10">{filter}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                transition={{
                                    layout: { type: 'spring', stiffness: 200, damping: 25 },
                                    duration: 0.5,
                                    delay: index * 0.05
                                }}
                                onHoverStart={() => setHoveredProject(project.id)}
                                onHoverEnd={() => setHoveredProject(null)}
                                onClick={() => setSelectedProject(project)}
                                className="group relative bg-white rounded-xl md:rounded-3xl overflow-hidden border border-border-light/50 will-change-transform cursor-pointer"
                                whileHover={{
                                    y: -4,
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                                }}
                                style={{ transform: 'translateZ(0)' }}
                            >
                                {/* Card Glow Effect */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-xl md:rounded-3xl`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredProject === project.id ? 0.03 : 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Image Container */}
                                <div className="relative h-40 md:h-64 overflow-hidden rounded-t-xl md:rounded-t-3xl">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredProject === project.id ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* Hover Actions - Simplified for Mobile */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center gap-2 md:gap-4 z-20 pointer-events-none md:pointer-events-auto"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: hoveredProject === project.id ? 1 : 0,
                                            y: hoveredProject === project.id ? 0 : 10
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 font-heading font-bold rounded-full shadow-xl">
                                            <HiOutlineEye className="text-lg" />
                                            View Case Study
                                        </div>
                                        <div className="md:hidden p-2 bg-white text-slate-900 rounded-full">
                                            <HiOutlineEye className="text-lg" />
                                        </div>
                                    </motion.div>

                                    {/* Category Badge - Responsive sizing */}
                                    <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                                        <span className="px-2 md:px-3 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] md:text-xs font-bold rounded-full shadow-sm border border-white/20">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Stats Corner */}
                                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-10">
                                        <div className={`px-2 md:px-4 py-1 bg-gradient-to-r ${project.color} text-white text-[10px] md:text-sm font-bold rounded-lg md:rounded-xl shadow-lg`}>
                                            {project.stats}
                                        </div>
                                    </div>
                                </div>

                                {/* Content - Responsive Padding/Text */}
                                <div className="p-3 md:p-6 relative">
                                    <h3 className="text-sm md:text-xl font-heading font-bold text-text-heading group-hover:text-primary-teal line-clamp-1 mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-text-body text-[11px] md:text-sm leading-tight md:leading-relaxed line-clamp-2 mb-2 md:mb-4">
                                        {project.description}
                                    </p>

                                    {/* Premium Link Indicator - Simplified for Mobile */}
                                    {/* <div className="flex items-center gap-2 border-t border-border-light pt-2 mt-auto">
                                        <span className="text-primary-teal font-bold text-[9px] md:text-xs uppercase tracking-wider">Explore</span>
                                        <motion.span
                                            animate={{ x: hoveredProject === project.id ? 3 : 0 }}
                                            className="text-primary-teal text-xs"
                                        >
                                            →
                                        </motion.span>
                                    </div> */}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                {/* <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.button
                        className="relative px-10 py-4 bg-gradient-to-r from-primary-teal to-cyan-500 text-white font-heading font-bold text-lg rounded-full shadow-lg overflow-hidden group"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 128, 128, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* <span className="relative z-10 flex items-center gap-2">
                            View All Projects
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span> */}
                {/* Shimmer Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" /> */}
                {/* </motion.button> */}
                {/* </motion.div> */}
            </div>

            {/* Portfolio Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <PortfolioDetail
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;