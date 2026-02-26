import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineUserGroup, HiOutlineBadgeCheck, HiOutlineTrendingUp } from 'react-icons/hi';

const Counter = ({ value, suffix, inView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const end = value;
        const duration = 2000;
        const incrementTime = duration / 60;

        const timer = setInterval(() => {
            start += 1;
            const progress = start / 60;
            const current = Math.round(progress * end);

            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [inView, value]);

    return <span>{count}{suffix}</span>;
};

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            color: '#008080',
        },
        {
            icon: HiOutlineBadgeCheck,
            value: 500,
            suffix: '+',
            label: 'Projects Delivered',
            description: 'Successful campaigns launched',
            color: '#008080',
        },
        {
            icon: HiOutlineTrendingUp,
            value: 300,
            suffix: '%',
            label: 'Average ROI',
            description: 'Return on ad spend achieved',
            color: '#008080',
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

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden" ref={ref}>
            <div className="max-w-[1280px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="mb-4">
                        Your Success Is Our <span className="text-primary-teal">Priority</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        We combine creativity with data-driven strategies to deliver exceptional
                        results that help your business thrive in the digital landscape.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.label}
                            className="text-center p-6 bg-bg-soft rounded-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="w-14 h-14 rounded-full bg-primary-teal/10 flex items-center justify-center mx-auto mb-4">
                                <feature.icon size={24} className="text-primary-teal" />
                            </div>

                            <div className="text-4xl font-heading font-bold text-text-heading mb-2">
                                <Counter value={feature.value} suffix={feature.suffix} inView={isInView} />
                            </div>

                            <h4 className="font-heading font-semibold text-text-heading mb-1">
                                {feature.label}
                            </h4>
                            <p className="text-sm text-text-body">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            className="flex gap-4 p-6 bg-bg-soft rounded-card border border-border-light"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-teal flex items-center justify-center">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
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
