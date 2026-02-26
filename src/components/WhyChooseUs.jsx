import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
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

const StatCard = ({ icon: Icon, value, suffix, label, description, index, inView, color }) => {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -8 }}
        >
            {/* Abstract Shape Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/50 to-transparent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />

            {/* Card */}
            <div className="relative bg-white border-2 border-transparent hover:border-primary-teal/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary-teal/15 overflow-hidden">
                {/* Animated Background Accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-teal/5 rounded-full blur-2xl group-hover:bg-primary-teal/10 transition-all duration-500" />

                {/* Top Accent Line */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-teal to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon Circle - Offset Design */}
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className="w-12 h-12 rounded-full bg-primary-teal flex items-center justify-center -ml-2"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Icon size={22} className="text-white" />
                    </motion.div>
                    <motion.div
                        className="w-8 h-8 rounded-full bg-bg-soft flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.2 }}
                    >
                        <span className="text-primary-teal text-sm font-bold">→</span>
                    </motion.div>
                </div>

                {/* Counter */}
                <div className="text-4xl font-heading font-bold text-text-heading mb-1 tracking-tight">
                    <Counter value={value} suffix={suffix} inView={inView} />
                </div>

                {/* Label with underline */}
                <h4 className="font-heading font-bold text-text-heading mb-2 text-lg">
                    {label}
                </h4>
                <p className="text-sm text-text-body leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const ReasonItem = ({ title, description, index, iconNumber }) => {
    return (
        <motion.div
            className="flex items-start gap-4 group cursor-pointer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
        >
            {/* Number Badge */}
            <motion.div
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-text-heading flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <span className="text-white font-heading font-bold text-lg relative z-10">{iconNumber}</span>
                <motion.div
                    className="absolute inset-0 bg-primary-teal"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>

            <div className="flex-1 pt-1">
                <h4 className="font-heading font-bold text-lg text-text-heading mb-2 group-hover:text-primary-teal transition-colors duration-300">
                    {title}
                </h4>
                <p className="text-text-body text-sm leading-relaxed group-hover:text-text-heading transition-colors duration-300">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Mouse tracking for images
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX.set((e.clientX - centerX) / 50);
            mouseY.set((e.clientY - centerY) / 50);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const features = [
        {
            icon: HiOutlineLightningBolt,
            value: 10,
            suffix: '+',
            label: 'Years Experience',
            description: 'A decade of digital marketing excellence',
        },
        {
            icon: HiOutlineUserGroup,
            value: 150,
            suffix: '+',
            label: 'Happy Clients',
            description: 'Businesses transformed globally',
        },
        {
            icon: HiOutlineBadgeCheck,
            value: 500,
            suffix: '+',
            label: 'Projects Delivered',
            description: 'Successful campaigns launched',
        },
        {
            icon: HiOutlineTrendingUp,
            value: 300,
            suffix: '%',
            label: 'Average ROI',
            description: 'Return on ad spend achieved',
        },
    ];

    const reasons = [
        {
            title: 'Data-Driven Strategies',
            description: 'Every decision is backed by comprehensive analytics and insights, ensuring your marketing budget works smarter, not harder.',
        },
        {
            title: 'Dedicated Team',
            description: 'Our passionate experts become an extension of your team, fully invested in your success and growth.',
        },
        {
            title: 'Transparent Reporting',
            description: 'Real-time dashboards and detailed reports keep you informed every step of the way, no surprises.',
        },
        {
            title: 'Proven Results',
            description: 'Our track record speaks for itself with consistent, measurable growth for clients across industries.',
        },
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden" ref={ref}>
            {/* Animated Background Elements with Mouse Tracking */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl"
                style={{ x, y }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-80 h-80 bg-primary-teal/10 rounded-full blur-3xl"
                style={{ x: mouseX, y: mouseY }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-light/20 rounded-full blur-3xl" />

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Header - Bold Typography with Enhanced Animations */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-text-heading text-white font-heading font-medium text-sm rounded-full mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.span
                            className="w-2 h-2 bg-primary-teal rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Why Choose Us
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-heading font-bold text-text-heading mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Let's Build Something
                        <span className="block text-gradient">Great Together</span>
                    </motion.h2>

                    <motion.p
                        className="max-w-xl mx-auto text-text-body text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        We don't just deliver results — we build partnerships that last.
                        Here's what sets us apart from the rest.
                    </motion.p>
                </motion.div>

                {/* Stats - Offset Grid Layout with Enhanced Animations */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <StatCard
                            key={feature.label}
                            {...feature}
                            index={index}
                            inView={isInView}
                        />
                    ))}
                </motion.div>

                {/* Reasons - Two Column with Numbered List */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Left Column - Title */}
                    <motion.div
                        className="lg:sticky lg:top-24 self-start"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.h3
                            className="text-2xl md:text-3xl font-heading font-bold text-text-heading mb-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            Why Businesses
                            <span className="text-gradient"> Choose Us</span>
                        </motion.h3>
                        <p className="text-text-body leading-relaxed mb-6 text-lg">
                            We combine strategic thinking with creative execution to deliver
                            campaigns that not only look great but perform even better.
                        </p>

                        {/* Animated Team Members */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.div
                                className="flex -space-x-3"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, type: 'spring' }}
                            >
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-primary-teal/20 border-2 border-white flex items-center justify-center"
                                        whileHover={{ scale: 1.2, zIndex: 10 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <span className="text-xs font-bold text-primary-teal">User</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                            <motion.span
                                className="text-sm text-text-body"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                            >
                                Join 150+ happy clients
                            </motion.span>
                        </motion.div>

                        {/* Gibli Art - Replacing Get Started Button */}
                        <motion.div
                            className="mt-6 relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            {/* Peiyal-Splash as background */}
                            <div className="absolute -top-4 -left-4 w-40 h-40">
                                <img
                                    src="/Peiyal-Splash.png"
                                    alt="Background"
                                    className="w-full h-full object-contain opacity-60"
                                />
                            </div>
                            {/* Priyal overlay with animation */}
                            <motion.div
                                className="relative w-48 mx-auto"
                                style={{ x, y }}
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <img
                                    src="/Priyal.png"
                                    alt="Priyal"
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Reason Items */}
                    <div className="space-y-4">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={reason.title}
                                className="group p-5 rounded-xl hover:bg-bg-soft transition-colors duration-300"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                            >
                                <ReasonItem {...reason} index={index} iconNumber={`0${index + 1}`} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
