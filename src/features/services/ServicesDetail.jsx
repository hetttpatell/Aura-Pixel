import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiOutlineCheckCircle, HiOutlineChevronRight, HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { BsLightningChargeFill, BsArrowRight } from 'react-icons/bs';
import {
    serviceCategories,
    subServicesContent,
    getServiceById,
    getSubServiceById,
    getSubServicesByCategory,
    getContentById
} from '../../components/Services/servicesContent';
import { services as servicesList } from '../../components/Services/constants/services';

// ============================================
// VIEW TYPES
// ============================================
const VIEW_TYPES = {
    ALL_SERVICES: 'all-services',
    SERVICE_DETAIL: 'service-detail',
    SUB_SERVICE_DETAIL: 'sub-service-detail'
};

// ============================================
// ANIMATION VARIANTS
// ============================================
const pageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.43, 0.13, 0.23, 0.96],
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.98,
        transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96]
        }
    })
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const floatingVariants = {
    animate: {
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const pulseVariants = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const shimmerVariants = {
    animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return { ref, isInView };
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const slugify = (text) => text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';

const getServiceIdFromName = (name) => {
    const mapping = {
        'Social Media': 'social-media',
        'SEO': 'seo',
        'Google Ads': 'google-ads',
        'Meta Ads': 'meta-ads',
        'E-commerce': 'e-commerce',
        'Content Writing': 'content-writing',
        'Podcast Productions': 'podcast-productions',
        'Product Photography': 'product-photography',
        'Content Creation': 'content-creation',
        'Video & Photo Editing': 'video-photo-editing'
    };
    return mapping[name] || slugify(name);
};

const getSubServiceIdFromName = (name) => slugify(name);

// ============================================
// ANIMATED BACKGROUND PARTICLES
// ============================================
const FloatingParticles = () => {
    const particleProps = useMemo(() => {
        return [...Array(6)].map((_, i) => ({
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animateX: Math.random() * 100 - 50,
            animateY: Math.random() * 100 - 50,
            duration: Math.random() * 10 + 10,
            delay: i * 0.5,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particleProps.map((props, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-primary-teal/20 to-blue-500/20 blur-xl"
                    style={{
                        width: props.width,
                        height: props.height,
                        left: props.left,
                        top: props.top,
                    }}
                    animate={{
                        x: [0, props.animateX, 0],
                        y: [0, props.animateY, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: props.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: props.delay,
                    }}
                />
            ))}
        </div>
    );
};

// ============================================
// BACK BUTTON COMPONENT
// ============================================
const BackButton = ({ onClick, label = 'Back' }) => (
    <motion.button
        onClick={onClick}
        className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-teal bg-gradient-to-r from-primary-light to-teal-50 hover:from-primary-teal hover:to-teal-600 hover:text-white rounded-full transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-primary-teal/25 group overflow-hidden"
        whileHover={{ x: -6, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
    >
        <motion.span
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
        />
        <HiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
        {label}
    </motion.button>
);

// ============================================
// ANIMATED SECTION WRAPPER
// ============================================
const AnimatedSection = ({ children, delay = 0, className = '' }) => {
    const { ref, isInView } = useScrollAnimation();
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// 3D CARD COMPONENT
// ============================================
const Card3D = ({ children, className = '', onClick }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        setRotateX(-mouseY / 20);
        setRotateY(mouseX / 20);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={`${className} cursor-pointer`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ z: 50 }}
        >
            {children}
        </motion.div>
    );
};

// ============================================
// ALL SERVICES VIEW COMPONENT
// ============================================
const AllServicesView = ({ onServiceClick }) => {
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"]
    });
    const headerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div
            key="all-services"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <FloatingParticles />

            {/* Header */}
            <motion.div
                ref={headerRef}
                className="text-center mb-16 relative"
                style={{ y: headerY, opacity: headerOpacity }}
            >
                {/* Animated badge */}
                <motion.span
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-light via-teal-50 to-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-8 border border-primary-teal/20 shadow-lg shadow-primary-teal/10 relative overflow-hidden"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <HiSparkles className="w-4 h-4 animate-pulse" />
                    Our Services
                </motion.span>

                {/* Animated title with gradient */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-heading mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Comprehensive Digital{' '}
                    <motion.span
                        className="relative inline-block"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-gradient bg-gradient-to-r from-primary-teal via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            Solutions
                        </span>
                        <motion.span
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal via-blue-500 to-purple-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        />
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Transform your digital presence with our full suite of marketing services designed to drive growth and maximize ROI.
                </motion.p>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -top-10 left-1/4 w-20 h-20 bg-gradient-to-r from-primary-teal/20 to-blue-500/20 rounded-full blur-2xl"
                    variants={floatingVariants}
                    animate="animate"
                />
                <motion.div
                    className="absolute -bottom-5 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                />
            </motion.div>

            {/* Services Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {servicesList.map((service, index) => {
                    const serviceId = getServiceIdFromName(service.name);
                    const categoryData = serviceCategories[serviceId];
                    const IconComponent = service.icon;

                    return (
                        <motion.div
                            key={service.name}
                            custom={index}
                            variants={cardVariants}
                            className="perspective-1000"
                        >
                            <Card3D
                                onClick={() => onServiceClick(serviceId)}
                                className="group h-full"
                            >
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-7 shadow-xl border border-white/50 hover:shadow-2xl hover:shadow-primary-teal/10 transition-all duration-500 overflow-hidden h-full flex flex-col transform-gpu">
                                    {/* Animated gradient background */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${categoryData?.bgGradient || 'from-gray-50 to-white'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    />

                                    {/* Shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                    />

                                    {/* Glow effect on hover */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-teal/0 via-primary-teal/20 to-blue-500/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon with animated ring */}
                                        <div className="relative mb-5">
                                            <motion.div
                                                className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                                                whileHover={{ scale: 1.15, rotate: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                                            </motion.div>
                                            {/* Animated ring */}
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl border-2 border-primary-teal/30"
                                                initial={{ scale: 1, opacity: 0 }}
                                                whileHover={{ scale: 1.4, opacity: 0 }}
                                                transition={{ duration: 0.6, repeat: Infinity }}
                                            />
                                        </div>

                                        {/* Title & Description */}
                                        <h3 className="font-heading font-bold text-xl text-text-heading mb-3 group-hover:text-primary-teal transition-colors duration-300">
                                            {service.name}
                                        </h3>
                                        <p className="text-text-body text-sm mb-5 flex-grow leading-relaxed">
                                            {service.desc}
                                        </p>

                                        {/* Sub-services count with animation */}
                                        {service.subServices && service.subServices.length > 0 && (
                                            <motion.div
                                                className="text-xs text-text-body/70 flex items-center gap-2 mb-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                            >
                                                <span className="relative flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-teal opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-teal"></span>
                                                </span>
                                                {service.subServices.length} specialized services
                                            </motion.div>
                                        )}

                                        {/* Animated CTA */}
                                        <motion.div
                                            className="flex items-center text-primary-teal font-semibold text-sm gap-2 group-hover:gap-3 transition-all duration-300"
                                            whileHover={{ x: 5 }}
                                        >
                                            Explore
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <HiArrowRight className="w-5 h-5" />
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                </div>
                            </Card3D>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

// ============================================
// SERVICE DETAIL VIEW COMPONENT
// ============================================
const ServiceDetailView = ({ serviceId, onBack, onSubServiceClick }) => {
    const service = getServiceById(serviceId);
    const subServices = getSubServicesByCategory(serviceId);
    const serviceFromList = servicesList.find(s => getServiceIdFromName(s.name) === serviceId);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    if (!service) {
        return (
            <motion.div
                className="text-center py-20"
                variants={pageVariants}
                initial="initial"
                animate="enter"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                >
                    <HiSparkles className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h2 className="text-2xl font-heading font-bold text-text-heading mb-4">Service Not Found</h2>
                <p className="text-text-body mb-6">The requested service could not be found.</p>
                <BackButton onClick={onBack} label="Back to Services" />
            </motion.div>
        );
    }

    const IconComponent = service.icon;

    return (
        <motion.div
            ref={containerRef}
            key={`service-${serviceId}`}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="relative"
        >
            <FloatingParticles />

            {/* Back Navigation */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <BackButton onClick={onBack} label="All Services" />
            </motion.div>

            {/* Service Header with Parallax */}
            <motion.div
                className={`relative rounded-[2rem] p-8 md:p-12 mb-16 overflow-hidden bg-gradient-to-br ${service.bgGradient} shadow-2xl`}
                style={{ y: backgroundY, opacity }}
            >
                {/* Animated Background Pattern */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, ${service.primaryColor}30 0%, transparent 50%),
                                          radial-gradient(circle at 80% 70%, ${service.primaryColor}25 0%, transparent 50%),
                                          radial-gradient(circle at 50% 50%, ${service.primaryColor}15 0%, transparent 70%)`
                    }}
                />

                {/* Animated mesh gradient overlay */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Animated Icon */}
                    <motion.div
                        className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                        <IconComponent className="w-12 h-12 text-white" />
                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl bg-white/30"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Title & Description with stagger */}
                    <div className="flex-1">
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading mb-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-text-body"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {service.tagline}
                        </motion.p>
                    </div>
                </div>

                {/* Animated Stats */}
                <motion.div
                    className="relative z-10 grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {service.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 150 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <motion.div
                                className="text-3xl md:text-4xl font-bold text-text-heading mb-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-sm text-text-body font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Description with animated border */}
            <AnimatedSection delay={0.1} className="mb-16">
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-teal via-blue-500 to-purple-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-heading mb-5 flex items-center gap-3">
                        <HiLightningBolt className="w-7 h-7 text-primary-teal" />
                        About This Service
                    </h2>
                    <p className="text-text-body text-lg leading-relaxed">{service.description}</p>
                </div>
            </AnimatedSection>

            {/* Features with optimized smooth animations */}
            <AnimatedSection delay={0.2} className="mb-16">
                {/* Section Container with elegant glassmorphism */}
                <motion.div
                    className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white/95 via-white/80 to-primary-light/20 border border-white/60 shadow-xl overflow-hidden transform-gpu"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Static background gradient orbs - no animation for performance */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-primary-teal/15 to-blue-400/15 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/10 blur-3xl pointer-events-none" />

                    {/* Header with icon */}
                    <div className="relative z-10 flex items-center gap-4 mb-8">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-teal to-teal-500 flex items-center justify-center shadow-md transform-gpu">
                            <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-heading">
                            Key Features
                        </h2>
                    </div>

                    {/* Features Grid with staggered fade-in */}
                    <motion.div
                        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.06, delayChildren: 0.1 }
                            }
                        }}
                    >
                        {service.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group transform-gpu"
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.35, ease: "easeOut" }
                                    }
                                }}
                            >
                                {/* Card with CSS hover effects for better mobile performance */}
                                <div className="relative flex items-center gap-4 p-4 md:p-5 bg-white/95 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-default transform-gpu">
                                    {/* Checkmark icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                                        style={{ backgroundColor: `${service.primaryColor}12` }}
                                    >
                                        <HiOutlineCheckCircle
                                            className="w-5 h-5 transition-colors duration-300"
                                            style={{ color: service.primaryColor }}
                                        />
                                    </div>

                                    {/* Feature text */}
                                    <span className="text-text-heading font-medium text-sm md:text-[15px] leading-snug group-hover:text-primary-teal transition-colors duration-300">
                                        {feature}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Subtle bottom accent line */}
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-teal/20 to-transparent" />
                    <motion.div
                        className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.div>
            </AnimatedSection>

            {/* Sub-Services with advanced cards */}
            {subServices.length > 0 && (
                <AnimatedSection delay={0.3} className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-heading mb-8 flex items-center gap-3">
                        <motion.span
                            className="inline-block w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <HiSparkles className="w-5 h-5 text-white" />
                        </motion.span>
                        Specialized Services
                    </h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {subServices.map((subService, index) => {
                            const SubIcon = subService.icon;
                            return (
                                <motion.div
                                    key={subService.id}
                                    className="perspective-1000"
                                    variants={cardVariants}
                                    custom={index}
                                >
                                    <Card3D
                                        onClick={() => onSubServiceClick(subService.id)}
                                        className="group h-full"
                                    >
                                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-7 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                                            {/* Animated gradient border */}
                                            <motion.div
                                                className="absolute inset-0 rounded-3xl border-2 border-transparent"
                                                style={{
                                                    background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${subService.color}40, transparent, ${subService.color}40) border-box`
                                                }}
                                                whileHover={{
                                                    background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${subService.color}, ${subService.color}80, ${subService.color}) border-box`
                                                }}
                                            />

                                            {/* Icon with glow */}
                                            <motion.div
                                                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                                                style={{ backgroundColor: `${subService.color}20` }}
                                                whileHover={{ scale: 1.15, rotate: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <SubIcon
                                                    className="w-7 h-7"
                                                    style={{ color: subService.color }}
                                                />
                                                <motion.div
                                                    className="absolute inset-0 rounded-2xl"
                                                    style={{ backgroundColor: subService.color }}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileHover={{ opacity: 0.2, scale: 1.3 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h3 className="font-heading font-bold text-lg text-text-heading mb-3 group-hover:text-primary-teal transition-colors duration-300">
                                                    {subService.title}
                                                </h3>
                                                <p className="text-text-body text-sm line-clamp-2 leading-relaxed mb-5">
                                                    {subService.description}
                                                </p>

                                                {/* Animated CTA */}
                                                <motion.div
                                                    className="flex items-center text-primary-teal font-semibold text-sm gap-2"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    View Details
                                                    <motion.span
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        <HiOutlineChevronRight className="w-5 h-5" />
                                                    </motion.span>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Card3D>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatedSection>
            )}

            {/* Services from constant list that don't have sub-services in categories */}
            {serviceFromList?.subServices && subServices.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-2xl font-heading font-bold text-text-heading mb-6">
                        What We Offer
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {serviceFromList.subServices.map((subName, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border-light shadow-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: service.primaryColor }}
                                />
                                <span className="text-text-heading font-medium">{subName}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* CTA Section - Clean and minimal */}
            <AnimatedSection delay={0.4} className="mt-20">
                <motion.div
                    className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-r from-primary-teal to-primary-dark overflow-hidden"
                >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                                Ready to Get Started?
                            </h2>
                            <p className="text-white/80 text-base md:text-lg max-w-lg">
                                Let's discuss how we can transform your digital presence with our {service.title} solutions.
                            </p>
                        </div>
                        <motion.a
                            href="/#contact"
                            className="flex-shrink-0 inline-flex items-center gap-2 relative group cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                // Use direct location change for reliable navigation with hash
                                window.location.href = '/#contact';
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div className="absolute -inset-1 bg-white/30 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative flex items-center gap-2 bg-white text-primary-dark font-heading font-semibold text-sm py-3 px-6 rounded-xl overflow-hidden">
                                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-teal/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <BsLightningChargeFill className="text-yellow-500" />
                                <span>Get Free Strategy Call</span>
                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <BsArrowRight className="text-lg" />
                                </motion.div>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>
            </AnimatedSection>
        </motion.div>
    );
};

// ============================================
// SUB-SERVICE DETAIL VIEW COMPONENT
// ============================================
const SubServiceDetailView = ({ subServiceId, onBackToService, onBackToAllServices }) => {
    const subService = getSubServiceById(subServiceId);
    const parentService = subService ? getServiceById(subService.category) : null;
    const containerRef = useRef(null);

    if (!subService) {
        return (
            <motion.div
                className="text-center py-20"
                variants={pageVariants}
                initial="initial"
                animate="enter"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-xl"
                >
                    <HiSparkles className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h2 className="text-2xl font-heading font-bold text-text-heading mb-4">Service Not Found</h2>
                <p className="text-text-body mb-6">The requested service could not be found.</p>
                <BackButton onClick={onBackToAllServices} label="Back to Services" />
            </motion.div>
        );
    }

    const IconComponent = subService.icon;

    return (
        <motion.div
            ref={containerRef}
            key={`sub-service-${subServiceId}`}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="relative"
        >
            <FloatingParticles />

            {/* Breadcrumb Navigation */}
            <motion.div
                className="mb-10 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <BackButton onClick={onBackToService} label={parentService?.title || 'Back'} />
                <motion.span
                    className="text-text-body/30 text-2xl"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    /
                </motion.span>
                <BackButton onClick={onBackToAllServices} label="All Services" />
            </motion.div>

            {/* Sub-Service Header with enhanced styling */}
            <motion.div
                className="relative rounded-[2rem] p-8 md:p-12 mb-16 overflow-hidden bg-gradient-to-br from-white via-white to-bg-soft border border-white/50 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
                {/* Animated Background Accents */}
                <motion.div
                    className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-30"
                    style={{ backgroundColor: subService.color }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-[80px] opacity-20"
                    style={{ backgroundColor: subService.color }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Animated Icon with glow */}
                    <motion.div
                        className="relative w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: subService.color }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                        <IconComponent className="w-12 h-12 text-white" />
                        {/* Animated glow ring */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl"
                            style={{ border: `3px solid ${subService.color}` }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Title & Category */}
                    <div className="flex-1">
                        <motion.div
                            className="flex items-center gap-3 mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <motion.span
                                className="px-4 py-1.5 text-sm font-semibold rounded-full shadow-lg"
                                style={{
                                    backgroundColor: `${subService.color}20`,
                                    color: subService.color
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {parentService?.title}
                            </motion.span>
                        </motion.div>
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {subService.title}
                        </motion.h1>
                    </div>
                </div>
            </motion.div>

            {/* Description with glass effect */}
            <AnimatedSection delay={0.1} className="mb-16">
                <div className="relative p-8 md:p-10 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl overflow-hidden">
                    {/* Animated accent line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1.5 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${subService.color}, ${subService.color}80, ${subService.color})` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-heading mb-5 flex items-center gap-3">
                        <motion.span
                            className="inline-flex w-10 h-10 rounded-xl items-center justify-center"
                            style={{ backgroundColor: `${subService.color}20` }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <HiLightningBolt className="w-5 h-5" style={{ color: subService.color }} />
                        </motion.span>
                        Overview
                    </h2>
                    <p className="text-text-body text-lg leading-relaxed">{subService.description}</p>
                </div>
            </AnimatedSection>

            {/* Two Column Layout with enhanced cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {/* Features Card */}
                <AnimatedSection delay={0.15}>
                    <motion.div
                        className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-7 md:p-9 shadow-xl border border-white/50 overflow-hidden relative group"
                        whileHover={{ y: -5, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Hover glow effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${subService.color}10, transparent 70%)` }}
                        />

                        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-heading mb-8 flex items-center gap-3">
                            <motion.span
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: `${subService.color}20` }}
                                whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                                <HiOutlineCheckCircle className="w-5 h-5" style={{ color: subService.color }} />
                            </motion.span>
                            What's Included
                        </h3>
                        <ul className="space-y-4">
                            {subService.features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4 group/item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.08 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md"
                                        style={{ backgroundColor: `${subService.color}25` }}
                                        whileHover={{ scale: 1.3 }}
                                    >
                                        <motion.div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: subService.color }}
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                        />
                                    </motion.div>
                                    <span className="text-text-body group-hover/item:text-text-heading transition-colors">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatedSection>

                {/* Benefits Card */}
                <AnimatedSection delay={0.2}>
                    <motion.div
                        className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-7 md:p-9 shadow-xl border border-white/50 overflow-hidden relative group"
                        whileHover={{ y: -5, scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Hover glow effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: `radial-gradient(circle at 50% 50%, ${subService.color}10, transparent 70%)` }}
                        />

                        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-heading mb-8 flex items-center gap-3">
                            <motion.span
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: `${subService.color}20` }}
                                whileHover={{ scale: 1.1, rotate: -10 }}
                            >
                                <HiArrowRight className="w-5 h-5" style={{ color: subService.color }} />
                            </motion.span>
                            Benefits
                        </h3>
                        <ul className="space-y-4">
                            {subService.benefits.map((benefit, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4 group/item"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.08 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="flex-shrink-0 mt-0.5"
                                        whileHover={{ scale: 1.3, rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <HiOutlineCheckCircle
                                            className="w-6 h-6"
                                            style={{ color: subService.color }}
                                        />
                                    </motion.div>
                                    <span className="text-text-body group-hover/item:text-text-heading transition-colors">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatedSection>
            </div>

            {/* Process - Modern Timeline Design */}
            <AnimatedSection delay={0.25} className="mb-16">
                <div className="text-center mb-12">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                        style={{ backgroundColor: `${subService.color}15` }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <HiSparkles className="w-4 h-4" style={{ color: subService.color }} />
                        <span className="text-sm font-medium" style={{ color: subService.color }}>How We Work</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-heading">
                        Our Process
                    </h2>
                </div>

                {/* Desktop Timeline */}
                <div className="hidden lg:block relative">
                    {(() => {
                        const stepCount = subService.process.length;
                        const widthPercent = 100 / stepCount;
                        const halfStep = widthPercent / 2;

                        return (
                            <>
                                {/* Progress Track Background */}
                                <div
                                    className="absolute top-[57px] h-1.5 bg-gray-100 rounded-full overflow-hidden"
                                    style={{ left: `${halfStep}%`, right: `${halfStep}%` }}
                                />

                                {/* Animated Progress Segments - Loading bar effect */}
                                {subService.process.map((_, index) => (
                                    index < stepCount - 1 && (
                                        <motion.div
                                            key={`progress-${index}`}
                                            className="absolute top-[57px] h-1.5 rounded-full origin-left"
                                            style={{
                                                backgroundColor: subService.color,
                                                left: `calc(${halfStep}% + ${index * widthPercent}%)`,
                                                width: `${widthPercent}%`,
                                            }}
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1.2,
                                                delay: 0.8 + index * 1.0,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                        />
                                    )
                                ))}

                                <div
                                    className="grid gap-6 relative"
                                    style={{ gridTemplateColumns: `repeat(${stepCount}, 1fr)` }}
                                >
                                    {subService.process.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative pt-28 flex flex-col items-center"
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8 + index * 1.0, duration: 0.6 }}
                                        >
                                            {/* Step Circle on Timeline */}
                                            <motion.div
                                                className="absolute top-[44px] left-0 right-0 flex justify-center z-10"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 + index * 1.0, type: "spring", stiffness: 200 }}
                                            >
                                                {/* Pulse ring animation */}
                                                <motion.div
                                                    className="absolute w-8 h-8 rounded-full"
                                                    style={{ backgroundColor: subService.color }}
                                                    initial={{ scale: 1, opacity: 0.5 }}
                                                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: index * 0.4,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <div
                                                    className="relative w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                                                    style={{ backgroundColor: subService.color }}
                                                >
                                                    {step.step}
                                                </div>
                                            </motion.div>

                                            {/* Content Card */}
                                            <motion.div
                                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                                                whileHover={{ y: -8, borderColor: subService.color }}
                                            >
                                                <h4 className="font-heading font-bold text-lg text-text-heading mb-2 group-hover:text-primary-teal transition-colors">
                                                    {step.title}
                                                </h4>
                                                <p className="text-text-body text-sm leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </div>

                {/* Mobile/Tablet Vertical Timeline - Redesigned */}
                <div className="lg:hidden relative pl-14 sm:pl-16">
                    {/* Vertical Line Background Track */}
                    <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full" />

                    {/* Animated Progress Line - Single slow loading bar */}
                    <motion.div
                        className="absolute left-5 sm:left-6 top-0 w-0.5 rounded-full origin-top"
                        style={{ backgroundColor: subService.color }}
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 2.5,
                            delay: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                    />

                    <div className="space-y-5 sm:space-y-6">
                        {subService.process.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: 0.4 + index * 0.3,
                                    duration: 0.4,
                                    ease: "easeOut"
                                }}
                            >
                                {/* Step Number Circle */}
                                <motion.div
                                    className="absolute -left-9 sm:-left-10 top-4 z-10"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.5 + index * 0.3,
                                        duration: 0.35,
                                        ease: "easeOut"
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ring-4 ring-white"
                                        style={{ backgroundColor: subService.color }}
                                    >
                                        {step.step}
                                    </div>
                                </motion.div>

                                {/* Content Card */}
                                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100/80 hover:shadow-lg transition-shadow duration-300">
                                    <h4 className="font-heading font-bold text-text-heading text-base sm:text-lg mb-1.5">
                                        {step.title}
                                    </h4>
                                    <p className="text-text-body text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Enhanced CTA Section */}
            <AnimatedSection delay={0.3} className="mt-20">
                <motion.div
                    className="relative rounded-[2.5rem] p-10 md:p-16 overflow-hidden shadow-2xl"
                    style={{
                        background: `linear-gradient(135deg, ${subService.color} 0%, ${subService.color}cc 50%, ${subService.color}ee 100%)`
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Animated mesh background */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.35) 0%, transparent 50%),
                                              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.25) 0%, transparent 50%),
                                              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)`
                        }}
                    />

                    {/* Floating particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/20"
                            style={{
                                width: Math.random() * 20 + 10,
                                height: Math.random() * 20 + 10,
                                left: `${10 + i * 12}%`,
                                top: `${15 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                y: [0, -40, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 4 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.4,
                            }}
                        />
                    ))}

                    <div className="relative z-10 text-center">
                        {/* Animated icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/25 backdrop-blur-sm mb-8 shadow-xl"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <HiSparkles className="w-10 h-10 text-white" />
                            </motion.div>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Ready for {subService.title}?
                        </motion.h2>
                        <motion.p
                            className="text-white/95 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Let our experts help you achieve your goals with our specialized {subService.title} services.
                        </motion.p>
                        <Link
                            to="/#contact"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-text-heading font-bold text-lg rounded-full shadow-2xl overflow-hidden hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
                        >
                            {/* Hover gradient overlay */}
                            <span
                                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-400"
                                style={{ background: `linear-gradient(90deg, ${subService.color}, ${subService.color}dd)` }}
                            />
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Project</span>
                            <span
                                className="relative z-10"
                            >
                                <HiArrowRight className="w-6 h-6 group-hover:text-white transition-colors duration-300" />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </AnimatedSection>
        </motion.div>
    );
};

// ============================================
// MAIN SERVICES DETAIL COMPONENT
// ============================================
const ServicesDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState(VIEW_TYPES.ALL_SERVICES);
    const [activeServiceId, setActiveServiceId] = useState(null);
    const [activeSubServiceId, setActiveSubServiceId] = useState(null);

    // Parse the URL parameter to determine view type
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (!serviceId) {
            setCurrentView(VIEW_TYPES.ALL_SERVICES);
            setActiveServiceId(null);
            setActiveSubServiceId(null);
            return;
        }

        // Check if it's a main service or sub-service
        const content = getContentById(serviceId);

        if (content) {
            if (content.type === 'service') {
                setCurrentView(VIEW_TYPES.SERVICE_DETAIL);
                setActiveServiceId(serviceId);
                setActiveSubServiceId(null);
            } else if (content.type === 'sub-service') {
                setCurrentView(VIEW_TYPES.SUB_SERVICE_DETAIL);
                setActiveSubServiceId(serviceId);
                setActiveServiceId(content.data.category);
            }
        } else {
            // Fallback: try to match with service list
            const matchedService = servicesList.find(s => getServiceIdFromName(s.name) === serviceId);
            if (matchedService) {
                setCurrentView(VIEW_TYPES.SERVICE_DETAIL);
                setActiveServiceId(serviceId);
                setActiveSubServiceId(null);
            } else {
                // Invalid ID - redirect to all services
                navigate('/services', { replace: true });
            }
        }
    }, [serviceId, navigate]);

    // Navigation handlers
    const handleServiceClick = (id) => {
        navigate(`/services/${id}`);
    };

    const handleSubServiceClick = (id) => {
        navigate(`/services/${id}`);
    };

    const handleBackToAllServices = () => {
        navigate('/services');
    };

    const handleBackToService = () => {
        if (activeServiceId) {
            navigate(`/services/${activeServiceId}`);
        } else {
            navigate('/services');
        }
    };

    return (
        <section className="relative min-h-screen py-20 pt-28 bg-gradient-to-br from-bg-soft via-white to-bg-soft overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Animated Gradient Mesh */}
                <motion.div
                    className="absolute inset-0 opacity-40"
                    animate={{
                        background: [
                            'radial-gradient(ellipse at 0% 0%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 100% 100%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 100% 0%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 0% 100%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 0% 0%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Animated Pixel Grid */}
                <motion.div
                    className="w-full h-full opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 128, 128, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 128, 128, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Enhanced Floating Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-primary-teal/15 to-blue-500/15 rounded-full blur-3xl hidden lg:block"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-52 h-52 bg-gradient-to-r from-pink-500/15 to-purple-500/15 rounded-full blur-3xl hidden lg:block"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl hidden lg:block"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatePresence mode="wait">
                    {currentView === VIEW_TYPES.ALL_SERVICES && (
                        <AllServicesView onServiceClick={handleServiceClick} />
                    )}
                    {currentView === VIEW_TYPES.SERVICE_DETAIL && (
                        <ServiceDetailView
                            serviceId={activeServiceId}
                            onBack={handleBackToAllServices}
                            onSubServiceClick={handleSubServiceClick}
                        />
                    )}
                    {currentView === VIEW_TYPES.SUB_SERVICE_DETAIL && (
                        <SubServiceDetailView
                            subServiceId={activeSubServiceId}
                            onBackToService={handleBackToService}
                            onBackToAllServices={handleBackToAllServices}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ServicesDetail;
