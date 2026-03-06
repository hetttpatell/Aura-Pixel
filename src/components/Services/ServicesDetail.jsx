import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    HiArrowLeft, HiChevronRight, HiSparkles, HiCheck,
    HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineShieldCheck,
    HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineHeart,
    HiOutlineArrowRight, HiOutlineStar, HiOutlineUserGroup,
    HiOutlineGlobe, HiOutlineTrendingUp, HiOutlineSparkles
} from 'react-icons/hi';
import { BsArrowRight, BsArrowUpRight, BsPlayFill, BsLightningCharge } from 'react-icons/bs';
import useReducedMotion from '../../hooks/useReducedMotion';
import {
    getContentById,
    getServiceById,
    getSubServiceById,
    getSubServicesByCategory,
    serviceCategories,
    subServicesContent
} from './servicesContent';

// Animation constants
const EASE = [0.25, 0.46, 0.45, 0.94];
const SPRING = { type: 'spring', stiffness: 280, damping: 26 };

// Animation variants
const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: EASE,
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: i * 0.08,
            ease: EASE
        }
    })
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const processStepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: i * 0.15, ease: EASE }
    })
};

// Service Card Component
const ServiceCard = ({ service, index, onClick, isActive }) => {
    const prefersReducedMotion = useReducedMotion();
    const Icon = service.icon;

    return (
        <motion.div
            layoutId={`service-${service.id}`}
            variants={prefersReducedMotion ? {} : cardVariants}
            custom={index}
            whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(service.id)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${isActive
                ? 'bg-gradient-to-br from-primary-teal to-primary-dark text-white shadow-xl shadow-primary-teal/25'
                : 'bg-white hover:shadow-xl shadow-md border border-gray-100'
                }`}
        >
            {/* Background gradient animation */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isActive ? 'opacity-20' : ''}`} />

            {/* Animated border on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: `linear-gradient(135deg, ${service.primaryColor}20, transparent)`,
                }}
            />

            <div className="relative p-6">
                {/* Icon with floating animation */}
                <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${isActive ? 'bg-white/20' : `bg-gradient-to-br ${service.bgGradient}`
                        }`}
                    whileHover={prefersReducedMotion ? {} : {
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                    }}
                    animate={prefersReducedMotion ? {} : {
                        y: [0, -5, 0],
                    }}
                    transition={{
                        rotate: { duration: 0.5 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Icon className={`w-7 h-7 ${isActive ? 'text-white' : service.primaryColor}`} style={{ color: isActive ? 'white' : service.primaryColor }} />
                </motion.div>

                {/* Title */}
                <h3 className={`font-heading font-bold text-lg mb-2 ${isActive ? 'text-white' : 'text-text-heading'}`}>
                    {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 line-clamp-2 ${isActive ? 'text-white/80' : 'text-text-body'}`}>
                    {service.description}
                </p>

                {/* Stats preview with pulse animation */}
                <div className="flex items-center gap-3">
                    <motion.span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-primary-light text-primary-teal'
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {service.stats[0].value} {service.stats[0].label}
                    </motion.span>
                </div>

                {/* Arrow indicator with slide animation */}
                <motion.div
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-primary-light'
                        }`}
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                >
                    <BsArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-white' : 'text-text-body group-hover:text-primary-teal'}`} />
                </motion.div>
            </div>
        </motion.div>
    );
};

// Sub-service Card Component
const SubServiceCard = ({ subService, index }) => {
    const prefersReducedMotion = useReducedMotion();
    const Icon = subService.icon;
    const safeColor = subService?.color || '#14B8A6';

    return (
        <motion.div
            variants={prefersReducedMotion ? {} : cardVariants}
            custom={index}
            whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden"
        >
            {/* Decorative gradient line */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 opacity-60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                    background: `linear-gradient(90deg, ${safeColor}, transparent)`,
                    originX: 0
                }}
            />

            {/* Icon with hover effect */}
            <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: `${safeColor}15` }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                animate={prefersReducedMotion ? {} : {
                    boxShadow: [`0 0 0 ${safeColor}00`, `0 0 20px ${safeColor}30`, `0 0 0 ${safeColor}00`]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Icon className="w-6 h-6" style={{ color: safeColor }} />
            </motion.div>

            {/* Title */}
            <h4 className="font-heading font-bold text-text-heading mb-2 group-hover:text-primary-teal transition-colors">
                {subService.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-text-body mb-4 line-clamp-2">
                {subService.description}
            </p>

            {/* Features preview with staggered animation */}
            <div className="flex flex-wrap gap-2">
                {subService.features.slice(0, 3).map((feature, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-text-body"
                    >
                        {feature}
                    </motion.span>
                ))}
                {subService.features.length > 3 && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs px-2 py-1 rounded-full bg-primary-light text-primary-teal font-medium"
                    >
                        +{subService.features.length - 3} more
                    </motion.span>
                )}
            </div>

            {/* Hover arrow */}
            <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
            >
                <BsArrowRight className="w-5 h-5" style={{ color: safeColor }} />
            </motion.div>
        </motion.div>
    );
};

// Feature Card Component
const FeatureCard = ({ feature, index, color = '#14B8A6' }) => {
    const safeColor = color || '#14B8A6';
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-light/50 transition-all duration-300 group cursor-pointer"
        >
            <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{ backgroundColor: `${safeColor}15` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <HiCheck className="w-5 h-5" style={{ color: safeColor }} />
            </motion.div>
            <span className="text-text-heading font-medium group-hover:text-primary-teal transition-colors">{feature}</span>
        </motion.div>
    );
};

// Process Step Component
const ProcessStep = ({ step, index, color }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            variants={prefersReducedMotion ? {} : processStepVariants}
            custom={index}
            className="relative flex gap-6"
        >
            {/* Step number with line */}
            <div className="flex flex-col items-center">
                <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg text-white"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 10 }}
                    animate={prefersReducedMotion ? {} : {
                        boxShadow: [`0 0 0 ${color}00`, `0 0 20px ${color}50`, `0 0 0 ${color}00`]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {step.step}
                </motion.div>
                {index < 3 && (
                    <motion.div
                        className="w-0.5 flex-1 mt-2"
                        style={{ background: `linear-gradient(to bottom, ${color}, ${color}20)` }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <motion.h4
                    className="font-heading font-bold text-xl text-text-heading mb-2"
                    whileHover={{ x: 5 }}
                >
                    {step.title}
                </motion.h4>
                <p className="text-text-body">{step.desc}</p>
            </div>
        </motion.div>
    );
};

// Stat Card Component
const StatCard = ({ stat, index, color }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            variants={prefersReducedMotion ? {} : cardVariants}
            custom={index}
            whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.03 }}
            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 relative overflow-hidden group"
        >
            {/* Decorative corner */}
            <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
                style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            />

            <motion.div
                className="relative"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <motion.span
                    className="text-4xl font-heading font-bold bg-gradient-to-r from-primary-teal to-primary-dark bg-clip-text text-transparent"
                    animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                    {stat.value}
                </motion.span>
            </motion.div>
            <p className="text-text-body text-sm mt-2 relative">{stat.label}</p>
        </motion.div>
    );
};

// Benefit Card Component
const BenefitCard = ({ benefit, index, color }) => {
    const prefersReducedMotion = useReducedMotion();
    const icons = [HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineHeart, HiOutlineStar, HiOutlineUserGroup];
    const Icon = icons[index % icons.length];

    return (
        <motion.div
            variants={prefersReducedMotion ? {} : cardVariants}
            custom={index}
            whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02, x: 5 }}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
        >
            <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}15` }}
                whileHover={{ rotate: 10, scale: 1.1 }}
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </motion.div>
            <span className="font-medium text-text-heading">{benefit}</span>
        </motion.div>
    );
};

// Hero Section Component
const HeroSection = ({ content, type, onBack, backLabel }) => {
    const prefersReducedMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const navigate = useNavigate();

    // Handle missing content or icons gracefully
    const Icon = content?.icon || HiOutlineSparkles;
    const isService = type === 'service';
    const color = isService ? content?.primaryColor : content?.color || '#14B8A6';

    // Navigate to LeadCapture section
    const handleGetStarted = () => {
        navigate('/#contact');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <motion.section
            className="relative min-h-[70vh] flex items-center overflow-hidden"
            style={{ opacity: prefersReducedMotion ? 1 : opacity }}
        >
            {/* Animated background */}
            <motion.div
                className={`absolute inset-0 ${isService ? `bg-gradient-to-br ${content.bgGradient}` : 'from-gray-50 to-white'}`}
                style={{ y: prefersReducedMotion ? 0 : y }}
            />

            {/* Animated decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
                    }}
                    animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 30, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
                    }}
                    animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.3, 1],
                        x: [0, -20, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Additional floating circles */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
                    }}
                    animate={prefersReducedMotion ? {} : {
                        y: [0, -20, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
                    }}
                    animate={prefersReducedMotion ? {} : {
                        y: [0, 30, 0],
                        x: [0, -15, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Back button with smooth animation */}
                <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 text-text-body hover:text-primary-teal transition-colors mb-8 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.1 }}
                    >
                        <HiArrowLeft className="w-5 h-5" />
                    </motion.div>
                    <span className="font-medium">{backLabel}</span>
                </motion.button>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div variants={heroVariants}>
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-6"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <HiSparkles className="w-4 h-4 text-primary-teal" />
                            </motion.div>
                            <span className="text-sm font-medium text-text-heading">
                                {isService ? 'Service Category' : 'Specialized Service'}
                            </span>
                        </motion.div>

                        <motion.h1
                            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-heading leading-tight mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {content.title}
                        </motion.h1>

                        <motion.p
                            className="text-xl text-text-body mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {isService ? content?.tagline : content?.description}
                        </motion.p>

                        <motion.p
                            className="text-text-body/80 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {isService ? content?.description : subServicesContent[content?.id]?.description || ''}
                        </motion.p>

                        {/* CTA Buttons - Only Get Started, no Watch Demo */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.button
                                onClick={handleGetStarted}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg relative overflow-hidden group"
                                style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${color}40` }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Get Started</span>
                                <motion.div
                                    className="relative z-10"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <BsArrowRight className="w-5 h-5" />
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <motion.div
                            className="relative w-full aspect-square max-w-md mx-auto"
                            animate={prefersReducedMotion ? {} : {
                                y: [0, -20, 0],
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Main icon container */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl flex items-center justify-center"
                                style={{
                                    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                                    border: `1px solid ${color}20`
                                }}
                            >
                                <motion.div
                                    className="w-40 h-40 rounded-3xl flex items-center justify-center"
                                    style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
                                    whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.05 }}
                                    animate={prefersReducedMotion ? {} : {
                                        boxShadow: [`0 20px 60px ${color}30`, `0 40px 80px ${color}50`, `0 20px 60px ${color}30`]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Icon className="w-20 h-20 text-white" />
                                </motion.div>
                            </motion.div>

                            {/* Floating elements */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center"
                                    style={{
                                        top: `${20 + i * 25}%`,
                                        left: i % 2 === 0 ? '-10%' : 'auto',
                                        right: i % 2 === 1 ? '-10%' : 'auto',
                                    }}
                                    animate={prefersReducedMotion ? {} : {
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 4 + i,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.5
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg"
                                        style={{ backgroundColor: `${color}20` }}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

// Main ServicesDetail Component
const ServicesDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const prefersReducedMotion = useReducedMotion();
    const [isLoading, setIsLoading] = useState(true);

    // Get content based on URL parameter
    const contentData = useMemo(() => {
        if (!serviceId) return { type: 'all', data: null };
        return getContentById(serviceId) || { type: 'all', data: null };
    }, [serviceId]);

    const { type, data: content } = contentData;

    // Handle loading state on route change
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 50);
        return () => clearTimeout(timer);
    }, [location.pathname, serviceId]);

    // Get sub-services for a service category
    const subServices = useMemo(() => {
        if (type === 'service' && content) {
            return getSubServicesByCategory(content.id);
        }
        if (type === 'sub-service' && content) {
            return [];
        }
        return Object.values(subServicesContent);
    }, [type, content]);

    // Get all services for "all" view
    const allServices = useMemo(() => Object.values(serviceCategories), []);

    // Pre-compute back navigation target and label
    const backUrl = useMemo(() => {
        if (type === 'sub-service') {
            const parentCategory = content?.category;
            if (parentCategory && serviceCategories[parentCategory]) {
                return `/services/${parentCategory}`;
            }
            return '/services';
        }
        return '/services';
    }, [type, content]);

    const backLabel = useMemo(() => {
        if (type === 'sub-service' && content?.category && serviceCategories[content.category]) {
            return `Back to ${serviceCategories[content.category].title}`;
        }
        if (type === 'service') return 'Back to All Services';
        return 'Back to Services';
    }, [type, content]);

    // Handle back button - uses pre-computed backUrl for reliability
    const handleBack = useCallback(() => {
        navigate(backUrl);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [navigate, backUrl]);

    // Handle service card click - simple navigation
    const handleServiceClick = useCallback((id) => {
        navigate(`/services/${id}`);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [navigate]);

    // Handle consultation click
    const handleConsultation = () => {
        navigate('/#contact');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    // Scroll to top when route changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.pathname]);

    // Render all services grid
    const renderAllServices = () => (
        <motion.div
            className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div className="text-center mb-16" variants={heroVariants}>
                <motion.span
                    className="inline-block px-4 py-2 rounded-full bg-primary-light text-primary-teal text-sm font-semibold mb-4"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,128,128,0.2)' }}
                >
                    Our Services
                </motion.span>
                <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-heading mb-6">
                    Digital Marketing Solutions
                </h1>
                <p className="text-xl text-text-body max-w-2xl mx-auto">
                    Comprehensive digital marketing services to grow your business online. Choose a category to explore specialized solutions tailored to your unique needs.
                </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={staggerContainer}
            >
                {allServices.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        onClick={handleServiceClick}
                        isActive={false}
                    />
                ))}
            </motion.div>
        </motion.div>
    );

    // Render service detail view
    const renderServiceDetail = () => {
        if (!content) return null;
        const parentService = type === 'sub-service' ? getServiceById(content.category) : content;
        const color = type === 'service' ? content?.primaryColor : content?.color || '#14B8A6';

        return (
            <motion.div
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Hero Section */}
                <HeroSection
                    content={content}
                    type={type}
                    onBack={handleBack}
                    backLabel={backLabel}
                />


                {/* Static Wave Divider for sub-services */}
                {type === 'sub-service' && (
                    <div className="relative h-24 overflow-hidden">
                        <svg
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                            className="absolute bottom-0 w-full h-full"
                            style={{ color: `${color}10` }}
                        >
                            <path
                                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                )}

                {/* Stats Section */}
                <section className="py-16 bg-bg-soft">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {(type === 'service' ? content?.stats : parentService?.stats || []).map((stat, index) => (
                                <StatCard key={index} stat={stat} index={index} color={color} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-heading mb-4">
                                What's Included
                            </h2>
                            <p className="text-text-body max-w-2xl mx-auto">
                                Our comprehensive {content.title.toLowerCase()} solutions include everything you need to succeed. We handle the complexity so you can focus on growing your business.
                            </p>
                        </motion.div>

                        {/* Enhanced animated grid for sub-services */}
                        <motion.div
                            className={`grid gap-6 ${type === 'sub-service' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'}`}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {(type === 'service' ? content?.features : content?.features || []).map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    custom={index}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -5,
                                        boxShadow: `0 20px 40px ${color}15`
                                    }}
                                    className={`group relative p-6 rounded-2xl border transition-all duration-300 ${type === 'sub-service'
                                        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                                        : 'bg-gray-50 border-transparent'
                                        }`}
                                >
                                    {/* Animated background for sub-services */}
                                    {type === 'sub-service' && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${color}08, transparent)`,
                                            }}
                                        />
                                    )}

                                    <div className="relative flex items-start gap-4">
                                        <motion.div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${color}15` }}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            animate={type === 'sub-service' ? {
                                                boxShadow: [`0 0 0 ${color}00`, `0 0 20px ${color}30`, `0 0 0 ${color}00`]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <HiCheck className="w-6 h-6" style={{ color }} />
                                        </motion.div>
                                        <div>
                                            <h4 className="font-heading font-semibold text-text-heading mb-1 group-hover:text-primary-teal transition-colors">
                                                {feature}
                                            </h4>
                                            {type === 'sub-service' && (
                                                <motion.p
                                                    className="text-sm text-text-body/70"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    whileHover={{ opacity: 1, height: 'auto' }}
                                                >
                                                    Professional {feature.toLowerCase()} tailored for your success
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Animated corner accent for sub-services */}
                                    {type === 'sub-service' && (
                                        <motion.div
                                            className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{
                                                background: `linear-gradient(135deg, transparent 50%, ${color}10 50%)`,
                                                borderTopRightRadius: '1rem'
                                            }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Section - For sub-services */}
                {type === 'sub-service' && content?.benefits && (
                    <section className="py-20 bg-bg-soft">
                        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-heading mb-4">
                                    Key Benefits
                                </h2>
                                <p className="text-text-body max-w-2xl mx-auto">
                                    Discover why businesses choose our {content.title} services to achieve their goals
                                </p>
                            </motion.div>

                            <motion.div
                                className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {content.benefits.map((benefit, index) => (
                                    <BenefitCard
                                        key={index}
                                        benefit={benefit}
                                        index={index}
                                        color={content.color}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Process Section - For sub-services */}
                {type === 'sub-service' && content?.process && (
                    <section className="py-20">
                        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-heading mb-4">
                                    Our Process
                                </h2>
                                <p className="text-text-body max-w-2xl mx-auto">
                                    A proven, systematic approach that delivers consistent results for your business
                                </p>
                            </motion.div>

                            <motion.div
                                className="max-w-2xl mx-auto"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {content.process.map((step, index) => (
                                    <ProcessStep key={index} step={step} index={index} color={content.color} />
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Sub-services Grid - For main services */}
                {type === 'service' && subServices.length > 0 && (
                    <section className="py-20 bg-bg-soft">
                        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-heading mb-4">
                                    Specialized Solutions
                                </h2>
                                <p className="text-text-body max-w-2xl mx-auto">
                                    Explore our {content.title.toLowerCase()} sub-services designed to address specific needs and maximize your results
                                </p>
                            </motion.div>

                            <motion.div
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {subServices.map((subService, index) => (
                                    <motion.div
                                        key={subService.id}
                                        variants={prefersReducedMotion ? {} : cardVariants}
                                        custom={index}
                                        whileHover={{ y: -6 }}
                                        onClick={() => handleServiceClick(subService.id)}
                                        className="group cursor-pointer"
                                    >
                                        <SubServiceCard
                                            subService={subService}
                                            index={index}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="relative rounded-3xl overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-teal to-primary-dark" />

                            {/* Decorative elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10"
                                    animate={prefersReducedMotion ? {} : {
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 90, 0]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10"
                                    animate={prefersReducedMotion ? {} : {
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{ duration: 15, repeat: Infinity }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative py-16 px-8 text-center">
                                <motion.h2
                                    className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    Ready to Get Started?
                                </motion.h2>
                                <motion.p
                                    className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Let's discuss how our {content.title} services can help transform your business and drive real results
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <motion.button
                                        onClick={handleConsultation}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-teal rounded-xl font-bold text-lg hover:shadow-xl transition-shadow"
                                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Book a Free Consultation
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <BsArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        );
    };

    // Show loading state briefly during transitions
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-teal/30 border-t-primary-teal rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {type === 'all' ? renderAllServices() : renderServiceDetail()}
        </div>
    );
};

export default ServicesDetail;
