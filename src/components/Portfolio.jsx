import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

const Portfolio = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Branding', 'Web Design', 'Marketing', 'Social Media'];

    const projects = [
        {
            id: 1,
            title: 'TechFlow SaaS Platform',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            description: 'Complete website redesign with 200% increase in conversions',
            stats: '200% ROI',
        },
        {
            id: 2,
            title: 'Luxe Fashion Brand',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            description: 'Brand identity and social media strategy',
            stats: '500K Reach',
        },
        {
            id: 3,
            title: 'FitLife App Campaign',
            category: 'Marketing',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
            description: 'Performance marketing campaign for fitness app',
            stats: '150% Installs',
        },
        {
            id: 4,
            title: 'Gourmet Kitchen',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
            description: 'Instagram and Facebook growth strategy',
            stats: '1M Followers',
        },
        {
            id: 5,
            title: 'EcoTech Solutions',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
            description: 'Complete brand transformation for sustainability company',
            stats: '85% Awareness',
        },
        {
            id: 6,
            title: 'FinanceHub Dashboard',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            description: 'Financial dashboard UI/UX design',
            stats: '40% Engagement',
        },
    ];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="portfolio" className="py-[100px] bg-bg-soft relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Our Portfolio
                    </span>
                    <h2 className="mb-4">
                        Work That <span className="text-gradient">Speaks</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        Explore our successful projects and see how we've helped businesses
                        achieve remarkable growth through strategic digital marketing.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {filters.map((filter) => (
                        <motion.button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-primary-teal text-white shadow-md'
                                    : 'bg-white text-text-heading border border-border-light hover:border-primary-teal hover:text-primary-teal'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative bg-white rounded-card overflow-hidden shadow-card"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-text-heading/80 via-text-heading/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Hover CTA */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ y: 20 }}
                                        whileHover={{ y: 0 }}
                                    >
                                        <motion.button
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-text-heading font-heading font-semibold rounded-btn shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            View Project
                                            <HiOutlineExternalLink className="text-lg" />
                                        </motion.button>
                                    </motion.div>

                                    {/* Stats Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-teal text-white text-xs font-semibold rounded-full">
                                        {project.stats}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span className="text-xs font-medium text-primary-teal uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                    <h3 className="text-lg font-heading font-semibold text-text-heading mt-2 mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-text-body">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.button
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;