import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    HiOutlineSearch,
    HiOutlineChartBar,
    HiOutlineShare,
    HiOutlineLightBulb,
    HiOutlineCode,
    HiOutlineTrendingUp
} from 'react-icons/hi';

const Services = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const services = [
        {
            icon: HiOutlineSearch,
            title: 'SEO Optimization',
            description: 'Dominate search rankings with our data-driven SEO strategies. We optimize your digital presence for maximum visibility and organic growth.',
            color: '#008080',
        },
        {
            icon: HiOutlineChartBar,
            title: 'Performance Marketing',
            description: 'Drive measurable results with targeted ad campaigns. We maximize your ROI through strategic paid advertising across all platforms.',
            color: '#4285F4',
        },
        {
            icon: HiOutlineShare,
            title: 'Social Media',
            description: 'Build a powerful social presence that engages and converts. We create scroll-stopping content that resonates with your audience.',
            color: '#E4405F',
        },
        {
            icon: HiOutlineLightBulb,
            title: 'Branding',
            description: 'Create a memorable brand identity that stands out. We craft compelling brand stories that connect with your target market.',
            color: '#F9AB00',
        },
        {
            icon: HiOutlineCode,
            title: 'Website Development',
            description: 'Build stunning, high-performance websites that convert. We combine beautiful design with seamless functionality.',
            color: '#0A66C2',
        },
        {
            icon: HiOutlineTrendingUp,
            title: 'Conversion Optimization',
            description: 'Turn visitors into customers with data-backed optimization. We analyze, test, and improve every touchpoint of your funnel.',
            color: '#008080',
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
            },
        },
    };

    return (
        <section id="services" className="relative py-[100px] bg-bg-soft overflow-hidden">
            {/* Pixel Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 128, 128, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 128, 128, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    ref={ref}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Our Services
                    </span>
                    <h2 className="mb-4">
                        Comprehensive Digital <span className="text-gradient">Solutions</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        From strategy to execution, we provide end-to-end digital marketing services
                        that drive real business results.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="group relative bg-white/80 backdrop-blur-xl rounded-card p-8 border border-white/30 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                            variants={itemVariants}
                            whileHover={{
                                boxShadow: `0 10px 40px ${service.color}20`,
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: `${service.color}10`,
                                }}
                            >
                                <service.icon size={28} style={{ color: service.color }} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-heading font-semibold text-text-heading mb-3">
                                {service.title}
                            </h3>
                            <p className="text-text-body leading-relaxed">
                                {service.description}
                            </p>

                            {/* Hover Arrow */}
                            <motion.div
                                className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: -10 }}
                                whileHover={{ x: 0 }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${service.color}10` }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={service.color}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Top Accent Line */}
                            <div
                                className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ backgroundColor: service.color }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;