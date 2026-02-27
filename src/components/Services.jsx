import { motion } from 'framer-motion';
import {
    HiOutlineSearch,
    HiOutlineChartBar,
    HiOutlineShare,
    HiOutlineLightBulb,
    HiOutlineCode,
    HiOutlineTrendingUp
} from 'react-icons/hi';

const Services = () => {
    const services = [
        {
            icon: HiOutlineSearch,
            title: 'SEO Optimization',
            description: 'Dominate search rankings with our data-driven SEO strategies. We optimize your digital presence for maximum visibility and organic growth.',
            color: '#008080',
            gradient: 'from-teal-500 to-teal-600',
        },
        {
            icon: HiOutlineChartBar,
            title: 'Performance Marketing',
            description: 'Drive measurable results with targeted ad campaigns. We maximize your ROI through strategic paid advertising across all platforms.',
            color: '#4285F4',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            icon: HiOutlineShare,
            title: 'Social Media',
            description: 'Build a powerful social presence that engages and converts. We create scroll-stopping content that resonates with your audience.',
            color: '#E4405F',
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            icon: HiOutlineLightBulb,
            title: 'Branding',
            description: 'Create a memorable brand identity that stands out. We craft compelling brand stories that connect with your target market.',
            color: '#F9AB00',
            gradient: 'from-amber-500 to-orange-500',
        },
        {
            icon: HiOutlineCode,
            title: 'Website Development',
            description: 'Build stunning, high-performance websites that convert. We combine beautiful design with seamless functionality.',
            color: '#0A66C2',
            gradient: 'from-blue-600 to-indigo-600',
        },
        {
            icon: HiOutlineTrendingUp,
            title: 'Conversion Optimization',
            description: 'Turn visitors into customers with data-backed optimization. We analyze, test, and improve every touchpoint of your funnel.',
            color: '#008080',
            gradient: 'from-emerald-500 to-teal-600',
        },
    ];

    // Card animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Loading line variants
    const lineVariants = {
        hidden: {
            scaleX: 0,
            originX: 0
        },
        visible: {
            scaleX: 1,
            originX: 0,
            transition: {
                delay: 0.2,
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    // Icon animation variants
    const iconVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            rotate: -180
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                delay: 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    // Content fade in variants
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.4
            }
        }
    };

    // Header variants
    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const accentVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: { duration: 0.6, delay: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <section id="services" className="relative py-12 sm:py-16 md:py-[100px] bg-gradient-to-br from-bg-soft via-white to-bg-soft overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Pixel Grid */}
                <div
                    className="w-full h-full opacity-40"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 128, 128, 0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 128, 128, 0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'float 6s ease-in-out infinite',
                    }}
                />

                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-teal/10 to-blue-500/10 rounded-full blur-xl animate-float" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Enhanced Section Header - Mobile Optimized */}
                <motion.div
                    className="text-center mb-8 sm:mb-10 md:mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                >
                    <motion.span
                        className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-light to-blue-50 text-primary-teal font-heading font-semibold text-xs sm:text-sm rounded-full mb-4 sm:mb-6 border border-primary-teal/20 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        ✨ Our Services
                    </motion.span>

                    <motion.h2
                        className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl"
                    >
                        Comprehensive Digital <span className="text-gradient relative">
                            Solutions
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal to-blue-500 rounded-full"
                                variants={accentVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        className="max-w-2xl mx-auto text-text-body text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0"
                    >
                        From strategy to execution, we provide end-to-end digital marketing services
                        that drive real business results and accelerate your growth.
                    </motion.p>
                </motion.div>

                {/* Enhanced Services Grid - 2 columns on mobile for better visibility */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="group relative"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={cardVariants}
                        >
                            {/* Mobile Card - Ultra compact for 2-column grid */}
                            <div className="relative bg-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 md:p-6 border border-white/50 shadow-md group-hover:shadow-xl overflow-hidden transition-all duration-300 h-full flex flex-col">

                                {/* Animated Background Gradient */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}30, ${service.color}15)`
                                    }}
                                />

                                {/* Glowing Border Effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}15, transparent, ${service.color}15)`,
                                        padding: '1px',
                                    }}
                                >
                                    <div className="w-full h-full bg-white/90 rounded-2xl" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Enhanced Icon with Loading Animation - Mobile Optimized */}
                                    <motion.div
                                        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                                        style={{
                                            backgroundColor: `${service.color}15`,
                                        }}
                                        variants={iconVariants}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 3,
                                        }}
                                    >
                                        {/* Icon Glow Effect */}
                                        <div
                                            className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                            style={{ backgroundColor: service.color }}
                                        />

                                        <service.icon
                                            size={22}
                                            style={{ color: service.color }}
                                            className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                                        />

                                        {/* Sparkle Effect */}
                                        <motion.div
                                            className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100"
                                            animate={{
                                                scale: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: index * 0.2,
                                            }}
                                        />
                                    </motion.div>

                                    {/* Enhanced Title - Mobile Optimized */}
                                    <motion.h3
                                        className="text-base sm:text-lg md:text-xl font-heading font-bold text-text-heading mb-2 sm:mb-3"
                                        variants={contentVariants}
                                    >
                                        {service.title}
                                    </motion.h3>

                                    {/* Enhanced Description - Mobile Compact */}
                                    <motion.p
                                        className="text-text-body text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow"
                                        variants={contentVariants}
                                    >
                                        {service.description}
                                    </motion.p>

                                    {/* Learn More Button - Mobile Optimized */}
                                    <motion.div
                                        className="flex items-center text-xs sm:text-sm font-semibold cursor-pointer mt-auto pt-1 sm:pt-2"
                                        style={{ color: service.color }}
                                        variants={contentVariants}
                                    >
                                        <span className="mr-1 sm:mr-2 group-hover:mr-2 sm:group-hover:mr-3 transition-all duration-300">Learn More</span>
                                        <motion.svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform duration-200"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </motion.svg>
                                    </motion.div>
                                </div>

                                {/* Loading Line Animation at Top */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                    style={{ backgroundColor: service.color }}
                                    custom={index}
                                    variants={lineVariants}
                                />

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -top-px overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                                        style={{ width: '200%' }}
                                    />
                                </div>
                            </div>

                            {/* Floating Number Badge - Smaller on mobile */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-primary-teal to-blue-500 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-md"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    visible: {
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            delay: 0.4,
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15
                                        }
                                    }
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action - Mobile Optimized */}
                <motion.div
                    className="text-center mt-10 sm:mt-12 md:mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.button
                        className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-teal to-blue-600 text-white font-heading font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(0, 128, 128, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Explore All Services</span>
                        <motion.svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </motion.svg>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
