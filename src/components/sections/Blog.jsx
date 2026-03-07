import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineFire } from 'react-icons/hi';
import { BsArrowUpRight } from 'react-icons/bs';
import { useReducedMotion } from '../../hooks';
import { blogPosts as allBlogPosts } from '../Services/constants/blogs';

// Get featured/recent posts - show 4 on mobile, 3 on desktop (CSS handles visibility)
const blogPosts = allBlogPosts.slice(0, 4);

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

                {/* Blog Grid - Show 4 on mobile (2x2), 3 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {blogPosts.map((post, index) => (
                        <Link
                            to="/blog"
                            state={{ searchQuery: post.title }}
                            key={post.id}
                            className={`${index === 3 ? 'lg:hidden' : ''}`}
                        >
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onHoverStart={() => setHoveredPost(post.id)}
                                onHoverEnd={() => setHoveredPost(null)}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-border-light/50 flex flex-col h-full cursor-pointer"
                                whileHover={{
                                    y: -8,
                                    boxShadow: '0 25px 60px rgba(0,0,0,0.12)'
                                }}
                            >
                                {/* Hover Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-cyan-500/5 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Image Container */}
                                <div className="relative h-36 sm:h-44 md:h-56 overflow-hidden">
                                    <motion.img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        animate={{
                                            scale: hoveredPost === post.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.6 }}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary-teal text-[10px] md:text-xs font-bold rounded-full shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Trending Badge */}
                                    {post.trending && (
                                        <div className="absolute top-3 right-3 z-10">
                                            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                                <HiOutlineFire size={12} className="animate-pulse" />
                                                <span className="hidden sm:inline">Trending</span>
                                            </span>
                                        </div>
                                    )}

                                    {/* Read Time */}
                                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-white/90 text-[10px] md:text-sm font-medium">
                                        <HiOutlineClock className="text-primary-teal" size={14} />
                                        {post.readTime}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-text-muted mb-2">
                                        <HiOutlineCalendar size={12} />
                                        {post.date}
                                    </div>

                                    <h3 className="text-sm md:text-lg font-heading font-bold text-text-heading group-hover:text-primary-teal transition-colors duration-300 mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="hidden md:block text-sm text-text-body line-clamp-2 mb-4 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    {/* Author & CTA */}
                                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border-light/50 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={post.authorImage}
                                                alt={post.author}
                                                className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover ring-2 ring-white shadow-md"
                                            />
                                            <span className="text-[10px] md:text-xs font-semibold text-text-heading hidden sm:block">{post.author}</span>
                                        </div>
                                        <motion.span
                                            className="text-primary-teal font-bold text-[10px] md:text-sm flex items-center gap-1"
                                            animate={{ x: hoveredPost === post.id ? 4 : 0 }}
                                        >
                                            Read
                                            <BsArrowUpRight size={14} />
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
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
                    <Link to="/blog">
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
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
