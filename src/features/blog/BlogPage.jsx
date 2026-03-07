import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineSearch,
    HiOutlineBookmark,
    HiOutlineShare,
    HiOutlineChevronLeft,
    HiOutlineX,
    HiOutlineTrendingUp,
    HiOutlineFire,
    HiOutlineSparkles
} from 'react-icons/hi';
import { BsArrowUpRight, BsGrid, BsListUl } from 'react-icons/bs';
import { MdTrendingUp, MdAccessTime, MdEdit, MdBrush, MdMovie, MdOutlineMic } from 'react-icons/md';
import {
    FaFacebook,
    FaGoogle,
    FaShoppingBag,
    FaCamera,
    FaUsers
} from 'react-icons/fa';
import { blogPosts, blogCategories } from '../../components/Services/constants/blogs';
import useReducedMotion from '../../hooks/useReducedMotion';

// Icon mapping
const iconMap = {
    LayoutGrid: BsGrid,
    Users: FaUsers,
    TrendingUp: MdTrendingUp,
    Google: FaGoogle,
    Facebook: FaFacebook,
    ShoppingBag: FaShoppingBag,
    Edit: MdEdit,
    Mic: MdOutlineMic,
    Camera: FaCamera,
    Brush: MdBrush,
    Film: MdMovie
};

const sortOptions = [
    { id: 'latest', name: 'Latest First', icon: HiOutlineCalendar },
    { id: 'popular', name: 'Most Popular', icon: HiOutlineFire },
    { id: 'trending', name: 'Trending Now', icon: MdTrendingUp },
    { id: 'readTime', name: 'Reading Time', icon: MdAccessTime },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const filterVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

// BlogCard Component
const BlogCard = ({ post, index, onClick, viewMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    if (viewMode === 'list') {
        return (
            <motion.article
                variants={itemVariants}
                layoutId={`blog-card-${post.id}`}
                onClick={() => onClick(post)}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-border-light/50 cursor-pointer"
                whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-48 md:w-64 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                        <motion.img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                        {post.trending && (
                            <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <HiOutlineFire size={12} />
                                Trending
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-primary-light text-primary-teal text-xs font-bold rounded-full">
                                    {post.category}
                                </span>
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                    <HiOutlineClock size={12} />
                                    {post.readTime}
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-heading font-bold text-text-heading group-hover:text-primary-teal transition-colors duration-300 mb-2 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-text-body line-clamp-2 hidden sm:block">
                                {post.excerpt}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                            <div className="flex items-center gap-2">
                                <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <p className="text-xs font-semibold text-text-heading">{post.author}</p>
                                    <p className="text-xs text-text-muted">{post.date}</p>
                                </div>
                            </div>
                            <motion.span
                                className="text-primary-teal"
                                animate={{ x: isHovered ? 4 : 0 }}
                            >
                                <BsArrowUpRight size={20} />
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    return (
        <motion.article
            variants={itemVariants}
            layoutId={`blog-card-${post.id}`}
            onClick={() => onClick(post)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-border-light/50 cursor-pointer flex flex-col h-full"
            whileHover={{ y: -8, boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
        >
            {/* Image Container */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Category Badge */}
                <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                >
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary-teal text-xs font-bold rounded-full shadow-lg">
                        {post.category}
                    </span>
                </motion.div>

                {/* Trending Badge */}
                {post.trending && (
                    <motion.div
                        className="absolute top-4 right-4 z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    >
                        <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <HiOutlineFire size={14} className="animate-pulse" />
                            Trending
                        </span>
                    </motion.div>
                )}

                {/* Read Time */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-white/90 text-sm font-medium">
                    <HiOutlineClock className="text-primary-teal" size={16} />
                    {post.readTime}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                    <HiOutlineCalendar size={14} />
                    {post.date}
                </div>

                <h3 className="text-lg md:text-xl font-heading font-bold text-text-heading group-hover:text-primary-teal transition-colors duration-300 mb-3 line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-sm text-text-body line-clamp-2 mb-4 flex-grow">
                    {post.excerpt}
                </p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light/50">
                    <div className="flex items-center gap-2">
                        <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-md"
                        />
                        <span className="text-xs font-semibold text-text-heading">{post.author}</span>
                    </div>
                    <motion.span
                        className="text-primary-teal font-bold text-sm flex items-center gap-1"
                        animate={{ x: isHovered ? 4 : 0 }}
                    >
                        Read
                        <BsArrowUpRight size={16} />
                    </motion.span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-teal/5 to-cyan-500/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.article>
    );
};

// BlogPostDetail Component
const BlogPostDetail = ({ post, onClose }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const shouldReduceMotion = useReducedMotion();

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
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal to-cyan-500 z-[301] origin-left"
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
                <span className="font-medium text-sm hidden sm:inline">Back to Blogs</span>
            </motion.button>

            {/* Hero Image */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
                {/* Category & Meta */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap items-center gap-3 mb-4"
                >
                    <span className="px-4 py-1.5 bg-primary-teal text-white text-sm font-bold rounded-full">
                        {post.category}
                    </span>
                    {post.trending && (
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                            <HiOutlineFire size={14} />
                            Trending
                        </span>
                    )}
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-heading mb-6 leading-tight"
                >
                    {post.title}
                </motion.h1>

                {/* Author & Date */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border-light"
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-teal/20"
                        />
                        <div>
                            <p className="font-semibold text-text-heading">{post.author}</p>
                            <p className="text-sm text-text-muted">Content Strategist</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-border-light hidden sm:block" />
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                            <HiOutlineCalendar size={16} />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <HiOutlineClock size={16} />
                            {post.readTime}
                        </span>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-bg-soft hover:bg-primary-light text-text-muted hover:text-primary-teal transition-colors"
                        >
                            <HiOutlineBookmark size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-bg-soft hover:bg-primary-light text-text-muted hover:text-primary-teal transition-colors"
                        >
                            <HiOutlineShare size={20} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-lg max-w-none prose-headings:text-text-heading prose-p:text-text-body prose-strong:text-text-heading prose-a:text-primary-teal prose-a:no-underline hover:prose-a:underline"
                >
                    <p className="text-xl text-text-body leading-relaxed mb-8 font-medium">
                        {post.excerpt}
                    </p>
                    {post.content.split('\n\n').map((paragraph, idx) => (
                        <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="mb-6 text-text-body leading-relaxed"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.article>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-border-light"
                >
                    <h4 className="text-sm font-semibold text-text-muted mb-4">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-bg-soft hover:bg-primary-light text-text-body hover:text-primary-teal text-sm rounded-full transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Spacer */}
            <div className="h-20" />
        </motion.div>
    );
};

// Main BlogPage Component
const BlogPage = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedPost, setSelectedPost] = useState(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const sortDropdownRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    // Check if a search query was passed via navigation state (from homepage blog section)
    useEffect(() => {
        if (location.state?.searchQuery) {
            setSearchQuery(location.state.searchQuery);
            // Clear the state so refreshing doesn't keep the search
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    // Handle click outside for dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
                setShowSortDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter and sort posts
    const filteredPosts = useMemo(() => {
        let posts = [...blogPosts];

        // Filter by category
        if (selectedCategory !== 'all') {
            posts = posts.filter(post => post.category === selectedCategory);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Sort posts
        switch (sortBy) {
            case 'latest':
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popular':
                posts.sort((a, b) => b.trending - a.trending);
                break;
            case 'trending':
                posts = posts.filter(p => p.trending).concat(posts.filter(p => !p.trending));
                break;
            case 'readTime':
                posts.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
                break;
            default:
                break;
        }

        return posts;
    }, [selectedCategory, searchQuery, sortBy]);

    // Get featured posts
    const featuredPosts = useMemo(() =>
        blogPosts.filter(post => post.featured).slice(0, 2),
        []
    );

    // Handle post click
    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    // Handle category click
    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
    };

    // Get icon component
    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName];
        return IconComponent || BsGrid;
    };

    return (
        <div className="min-h-screen bg-bg-main">
            {/* Page Header */}
            <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-light text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
                        Our Blog
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-heading mb-3 sm:mb-4 font-heading">
                        Blog & <span className="text-gradient">Insights</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-text-body/80">
                        <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary-teal">Blog</span>
                    </div>
                </motion.div>
            </section>

            {/* Featured Posts */}
            {!searchQuery && selectedCategory === 'all' && (
                <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-bg-soft">
                    <div className="max-w-[1280px] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-8"
                        >
                            <HiOutlineSparkles className="text-primary-teal" size={24} />
                            <h2 className="text-2xl font-heading font-bold text-text-heading">Featured Articles</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {featuredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handlePostClick(post)}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-border-light/50 cursor-pointer"
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="flex flex-col md:flex-row h-full">
                                        <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                                            <motion.img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            />
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            <span className="px-3 py-1 bg-primary-light text-primary-teal text-xs font-bold rounded-full w-fit mb-3">
                                                {post.category}
                                            </span>
                                            <h3 className="text-xl font-heading font-bold text-text-heading group-hover:text-primary-teal transition-colors mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-text-body line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                                <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full" />
                                                <span>{post.author}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Filter Section */}
            <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 sticky top-16 z-40 bg-bg-main/80 backdrop-blur-xl border-b border-border-light/50">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Category Pills */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-2 w-full lg:w-auto"
                        >
                            {blogCategories.map((category) => {
                                const Icon = getIcon(category.icon);
                                const isActive = selectedCategory === category.id;
                                return (
                                    <motion.button
                                        key={category.id}
                                        variants={filterVariants}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isActive
                                            ? 'text-white shadow-lg'
                                            : 'bg-bg-soft text-text-body hover:bg-white hover:shadow-md border border-border-light/50'
                                            }`}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeCategory"
                                                className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full`}
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Icon size={16} />
                                            <span className="hidden sm:inline">{category.name}</span>
                                            <span className="sm:hidden">{category.id === 'all' ? 'All' : category.name.slice(0, 6)}</span>
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>

                        {/* Search & Controls */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            {/* Search */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`relative flex-1 lg:w-64 transition-all duration-300 ${isSearchFocused ? 'lg:w-80' : ''}`}
                            >
                                <HiOutlineSearch
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-primary-teal' : 'text-text-muted'}`}
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className={`w-full pl-12 pr-4 py-3 bg-bg-soft rounded-full border-2 outline-none transition-all duration-300 ${isSearchFocused
                                        ? 'border-primary-teal bg-white shadow-lg shadow-primary-teal/10'
                                        : 'border-transparent hover:border-border-light'
                                        }`}
                                />
                                {searchQuery && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-border-light hover:bg-primary-light text-text-muted hover:text-primary-teal transition-colors"
                                    >
                                        <HiOutlineX size={14} />
                                    </motion.button>
                                )}
                            </motion.div>

                            {/* Sort Dropdown */}
                            <div className="relative" ref={sortDropdownRef}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="p-3 bg-bg-soft hover:bg-white rounded-full border border-border-light/50 hover:shadow-md transition-all"
                                >
                                    <HiOutlineTrendingUp size={20} className="text-text-body" />
                                </motion.button>

                                <AnimatePresence>
                                    {showSortDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border-light/50 overflow-hidden z-50"
                                        >
                                            {sortOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => { setSortBy(option.id); setShowSortDropdown(false); }}
                                                        className={`w-full px-4 py-3 flex items-center gap-3 text-left text-sm transition-colors ${sortBy === option.id
                                                            ? 'bg-primary-light text-primary-teal font-semibold'
                                                            : 'text-text-body hover:bg-bg-soft'
                                                            }`}
                                                    >
                                                        <Icon size={16} />
                                                        {option.name}
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* View Toggle */}
                            <div className="hidden sm:flex bg-bg-soft rounded-full p-1 border border-border-light/50">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-primary-teal' : 'text-text-muted'}`}
                                >
                                    <BsGrid size={18} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-primary-teal' : 'text-text-muted'}`}
                                >
                                    <BsListUl size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-text-muted"
                    >
                        Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                        {selectedCategory !== 'all' && ` in ${blogCategories.find(c => c.id === selectedCategory)?.name}`}
                        {searchQuery && ` for "${searchQuery}"`}
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section id="posts-section" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1280px] mx-auto">
                    <AnimatePresence mode="wait">
                        {filteredPosts.length > 0 ? (
                            <motion.div
                                key={`${selectedCategory}-${viewMode}`}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0 }}
                                className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-1'
                                    }`}
                            >
                                {filteredPosts.map((post, index) => (
                                    <BlogCard
                                        key={post.id}
                                        post={post}
                                        index={index}
                                        onClick={handlePostClick}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-bg-soft rounded-full flex items-center justify-center">
                                    <HiOutlineSearch size={32} className="text-text-muted" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-text-heading mb-2">
                                    No articles found
                                </h3>
                                <p className="text-text-muted mb-6">
                                    Try adjusting your search or filter criteria
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                    className="px-6 py-3 bg-primary-teal text-white font-semibold rounded-full"
                                >
                                    Clear Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-teal/5 via-bg-soft to-cyan-500/5">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-heading mb-4">
                            Want to contribute?
                        </h2>
                        <p className="text-text-body mb-8">
                            Have insights to share? We're always looking for guest contributors
                            who are passionate about digital marketing.
                        </p>
                        <Link to="/#contact">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,128,128,0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-primary-teal to-cyan-500 text-white font-heading font-bold text-lg rounded-full shadow-lg"
                            >
                                Become a Contributor
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Blog Post Detail Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <BlogPostDetail
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogPage;