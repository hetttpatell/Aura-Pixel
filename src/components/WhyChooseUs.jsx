import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineUserGroup, HiOutlineBadgeCheck, HiOutlineTrendingUp } from 'react-icons/hi';

const WhyChooseUs = () => {
    const features = [
        {
            icon: HiOutlineLightningBolt,
            value: 10,
            suffix: '+',
            label: 'Years Experience',
            description: 'A decade of digital marketing excellence',
            color: '#008080',
        },
        {
            icon: HiOutlineUserGroup,
            value: 150,
            suffix: '+',
            label: 'Happy Clients',
            description: 'Businesses transformed globally',
            color: '#4285F4',
        },
        {
            icon: HiOutlineBadgeCheck,
            value: 500,
            suffix: '+',
            label: 'Projects Delivered',
            description: 'Successful campaigns launched',
            color: '#E4405F',
        },
        {
            icon: HiOutlineTrendingUp,
            value: 300,
            suffix: '%',
            label: 'Average ROI',
            description: 'Return on ad spend achieved',
            color: '#F9AB00',
        },
    ];

    const reasons = [
        {
            title: 'Data-Driven Strategies',
            description: 'Every decision is backed by comprehensive analytics and insights, ensuring your marketing budget works harder.',
        },
        {
            title: 'Dedicated Team',
            description: 'Our passionate experts become an extension of your team, fully invested in your success.',
        },
        {
            title: 'Transparent Reporting',
            description: 'Real-time dashboards and detailed reports keep you informed every step of the way.',
        },
        {
            title: 'Proven Results',
            description: 'Our track record speaks for itself with consistent growth for clients across industries.',
        },
    ];

    const Counter = ({ value, suffix, shouldAnimate }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (shouldAnimate) {
                const duration = 2000;
                const steps = 60;
                const stepValue = value / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += stepValue;
                    if (current >= value) {
                        setCount(value);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(current));
                    }
                }, duration / steps);

                return () => clearInterval(timer);
            }
        }, [shouldAnimate, value]);

        return (
            <span>
                {count}{suffix}
            </span>
        );
    };

    return (
        <section id="about" className="py-[100px] bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/30 to-transparent" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="mb-4">
                        Your Success Is Our <span className="text-gradient">Priority</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        We combine creativity with data-driven strategies to deliver exceptional
                        results that help your business thrive in the digital landscape.
                    </p>
                </motion.div>

                {/* Animated Counter Blocks */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.label}
                            className="relative group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                            <div className="glass-card p-6 text-center h-full">
                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <feature.icon size={24} style={{ color: feature.color }} />
                                </div>

                                {/* Counter */}
                                <div className="text-4xl font-heading font-bold text-text-heading mb-2">
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Counter value={feature.value} suffix={feature.suffix} shouldAnimate={true} />
                                    </motion.span>
                                </div>

                                {/* Label */}
                                <h4 className="font-heading font-semibold text-text-heading mb-1">
                                    {feature.label}
                                </h4>
                                <p className="text-sm text-text-body">
                                    {feature.description}
                                </p>

                                {/* Bottom Accent */}
                                <div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: feature.color }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            className="flex gap-4 p-6 rounded-card bg-bg-soft/50 border border-border-light transition-all duration-300 hover:bg-white hover:shadow-md"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-teal/10 flex items-center justify-center">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#008080"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-heading font-semibold text-text-heading mb-2">
                                    {reason.title}
                                </h4>
                                <p className="text-text-body text-sm leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;