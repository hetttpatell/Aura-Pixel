import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineEye } from 'react-icons/hi';
import useReducedMotion from '../hooks/useReducedMotion';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    const filters = ['All', 'Branding', 'Web Design', 'Marketing', 'Social Media'];

    const projects = [
        {
            id: 1,
            title: 'TechFlow SaaS Platform',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            description: 'Complete website redesign with 200% increase in conversions',
            stats: '200% ROI',
            statsLabel: 'Increase',
            color: 'from-teal-500 to-cyan-500',
        },
        {
            id: 2,
            title: 'Luxe Fashion Brand',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            description: 'Brand identity and social media strategy',
            stats: '500K',
            statsLabel: 'Reach',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 3,
            title: 'FitLife App Campaign',
            category: 'Marketing',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
            description: 'Performance marketing campaign for fitness app',
            stats: '150%',
            statsLabel: 'Installs',
            color: 'from-orange-500 to-red-500',
        },
        {
            id: 4,
            title: 'Gourmet Kitchen',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
            description: 'Instagram and Facebook growth strategy',
            stats: '1M',
            statsLabel: 'Followers',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 5,
            title: 'EcoTech Solutions',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
            description: 'Complete brand transformation for sustainability company',
            stats: '85%',
            statsLabel: 'Awareness',
            color: 'from-blue-500 to-indigo-500',
        },
        {
            id: 6,
            title: 'FinanceHub Dashboard',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            description: 'Financial dashboard UI/UX design',
            stats: '40%',
            statsLabel: 'Engagement',
            color: 'from-violet-500 to-purple-500',
        },
    ];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

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
                                className="group relative bg-white rounded-xl md:rounded-3xl overflow-hidden border border-border-light/50"
                                whileHover={{
                                    y: -8,
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                                }}
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
                                    <div className="flex items-center gap-2 border-t border-border-light pt-2 mt-auto">
                                        <span className="text-primary-teal font-bold text-[9px] md:text-xs uppercase tracking-wider">Explore</span>
                                        <motion.span
                                            animate={{ x: hoveredProject === project.id ? 3 : 0 }}
                                            className="text-primary-teal text-xs"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                <motion.div
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
                        <span className="relative z-10 flex items-center gap-2">
                            View All Projects
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;