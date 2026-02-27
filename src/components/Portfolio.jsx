import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineEye } from 'react-icons/hi';

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);

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

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
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
                    className="flex flex-wrap justify-center gap-3 mb-12"
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
                            className={`relative px-7 py-3 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${activeFilter === filter
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
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
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
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onHoverStart={() => setHoveredProject(project.id)}
                                onHoverEnd={() => setHoveredProject(null)}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-500"
                            >
                                {/* Card Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredProject === project.id ? 1.15 : 1
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Stats Badge - Animated */}
                                    <motion.div
                                        className="absolute top-4 right-4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{
                                            opacity: hoveredProject === project.id ? 1 : 0,
                                            x: hoveredProject === project.id ? 0 : 20
                                        }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <div className={`px-4 py-2 bg-gradient-to-r ${project.color} text-white text-sm font-bold rounded-full shadow-lg`}>
                                            {project.stats}
                                            <span className="text-xs font-normal ml-1 opacity-80">{project.statsLabel}</span>
                                        </div>
                                    </motion.div>

                                    {/* Hover Actions */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: hoveredProject === project.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.button
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-heading font-bold rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                                            whileHover={{ scale: 1.1, backgroundColor: '#f0fdf4' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <HiOutlineEye className="text-lg" />
                                            View Project
                                        </motion.button>
                                        <motion.button
                                            className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                                            whileHover={{ scale: 1.1, rotate: 45 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <HiOutlineExternalLink className="text-xl" />
                                        </motion.button>
                                    </motion.div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    {/* Decorative Line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent" />

                                    <h3 className="text-xl font-heading font-bold text-text-heading mt-2 mb-3 group-hover:text-primary-teal transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-text-body text-sm leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Read More Link */}
                                    <motion.div
                                        className="flex items-center gap-2 mt-4 text-primary-teal font-semibold text-sm cursor-pointer"
                                        initial={{ opacity: 0.7 }}
                                        animate={{ opacity: hoveredProject === project.id ? 1 : 0.7 }}
                                    >
                                        <span>Learn More</span>
                                        <motion.span
                                            animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.div>
                                </div>

                                {/* Corner Accent */}
                                <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-tl-2xl`} />
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
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
