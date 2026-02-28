import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';
import useReducedMotion from '../hooks/useReducedMotion';

const blogPosts = [
    {
        id: 1,
        title: '10 Digital Marketing Trends to Watch in 2024',
        excerpt: 'Stay ahead of the curve with these emerging trends that are reshaping the digital marketing landscape.',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
        category: 'Marketing',
        date: 'Feb 15, 2024',
        readTime: '5 min read',
    },
    {
        id: 2,
        title: 'How to Maximize Your ROI with Google Ads',
        excerpt: 'Learn the strategies that top marketers use to get the most out of their Google Ads campaigns.',
        image: 'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=600&h=400&fit=crop',
        category: 'PPC',
        date: 'Feb 10, 2024',
        readTime: '7 min read',
    },
    {
        id: 3,
        title: 'The Ultimate Guide to Social Media Marketing',
        excerpt: 'Master the art of social media marketing with our comprehensive guide covering all major platforms.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
        category: 'Social Media',
        date: 'Feb 5, 2024',
        readTime: '10 min read',
    },
    {
        id: 4,
        title: 'AI in Marketing: Future or Present?',
        excerpt: 'Explore how Artificial Intelligence is revolutionizing customer engagement and data analysis.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        category: 'Technology',
        date: 'Feb 20, 2024',
        readTime: '6 min read',
    },
];

const Blog = () => {
    const [hoveredPost, setHoveredPost] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="blog" className="py-[60px] md:py-[100px] bg-bg-soft relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 right-0 w-72 h-72 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
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
                        Our Blog
                    </motion.div>
                    <h2 className="mb-6 text-4xl md:text-5xl font-heading font-bold">
                        Latest <span className="text-gradient bg-gradient-to-r from-primary-teal via-cyan-500 to-primary-teal bg-clip-text text-transparent">Insights</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body text-lg leading-relaxed">
                        Stay updated with the latest trends, tips, and strategies in digital marketing
                        from our team of experts.
                    </p>
                </motion.div>

                {/* Blog Grid - 2 Column Mobile */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredPost(post.id)}
                            onHoverEnd={() => setHoveredPost(null)}
                            className="group relative bg-white rounded-xl md:rounded-3xl overflow-hidden border border-border-light/50 flex flex-col h-full"
                            whileHover={{
                                y: -8,
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* Card Glow Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-teal to-cyan-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredPost === post.id ? 0.03 : 0 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Image Container */}
                            <div className="relative h-32 sm:h-48 md:h-64 overflow-hidden">
                                <motion.img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    animate={{
                                        scale: hoveredPost === post.id ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                    loading="lazy"
                                />

                                {/* Gradient Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: hoveredPost === post.id ? 0.9 : 0.6 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Category Badge */}
                                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                                    <span className="px-2 md:px-3 py-1 bg-primary-teal text-white text-[10px] md:text-xs font-bold rounded-full shadow-sm">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Date Overlay (Bottom Left) */}
                                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10 flex items-center gap-1 md:gap-2 text-white/90 text-[10px] md:text-sm font-medium">
                                    <HiOutlineCalendar className="text-sm md:text-base text-primary-teal" />
                                    {post.date}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 md:p-6 flex flex-col flex-grow relative">
                                <div className="text-[10px] md:text-xs font-bold text-primary-teal uppercase tracking-widest mb-1 md:mb-2">
                                    {post.readTime}
                                </div>
                                <h3 className="text-sm md:text-xl font-heading font-bold text-text-heading group-hover:text-primary-teal transition-colors duration-300 line-clamp-2 mb-2">
                                    {post.title}
                                </h3>
                                <p className="hidden md:block text-text-body text-sm leading-relaxed line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>

                                {/* Bottom Link Indicator */}
                                <div className="mt-auto pt-2 border-t border-border-light flex items-center gap-2">
                                    <span className="text-primary-teal font-bold text-[9px] md:text-xs uppercase tracking-wider">Read Full</span>
                                    <motion.span
                                        animate={{ x: hoveredPost === post.id ? 3 : 0 }}
                                        className="text-primary-teal text-xs"
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.button
                        className="relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary-teal to-cyan-500 text-white font-heading font-bold text-base md:text-lg rounded-full shadow-lg overflow-hidden group"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 128, 128, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View All Articles
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
