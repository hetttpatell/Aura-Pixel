import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            initials: "AK",
            name: 'Ankit Kumar',
            title: 'CEO, TechVentures',
            content: 'Working with AuraPixel transformed our digital presence. Their strategic approach and dedication delivered results beyond our expectations. Truly a game-changer for our business.',
            rating: 5,
        },
        {
            id: 2,
            initials: "SJ",
            name: 'Sarah Johnson',
            title: 'CEO, TechFlow',
            content: 'Aura Pixel transformed our digital presence completely. Their strategic approach to marketing helped us achieve 300% growth in just 6 months. Highly recommended!',
            rating: 5,
        },
        {
            id: 3,
            initials: "MC",
            name: 'Michael Chen',
            title: 'Founder, StartupX',
            content: 'The team at Aura Pixel is exceptional. They understand the nuances of digital marketing and deliver results that exceed expectations. Our ROI has never been better.',
            rating: 5,
        },
        {
            id: 4,
            initials: "ER",
            name: 'Emily Rodriguez',
            title: 'Marketing Director, Luxe Brand',
            content: 'Working with Aura Pixel was a game-changer for our brand. Their creative campaigns and data-driven strategies helped us reach our target audience effectively.',
            rating: 5,
        },
        {
            id: 5,
            initials: "DK",
            name: 'David Kim',
            title: 'CTO, FinanceHub',
            content: 'The level of professionalism and expertise at Aura Pixel is unmatched. They took our marketing to the next level with innovative strategies and flawless execution.',
            rating: 5,
        },
        {
            id: 6,
            initials: "AF",
            name: 'Amanda Foster',
            title: 'Owner, EcoTech Solutions',
            content: 'Aura Pixel helped us build a strong online presence from scratch. Their team is responsive, creative, and truly invested in our success. Amazing results!',
            rating: 5,
        },
    ];

    // Auto-slide with 10 seconds for reading time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Elegant fade and slide animation
    const cardVariants = {
        initial: { opacity: 0, y: 30, filter: "blur(10px)" },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
        exit: {
            opacity: 0,
            y: -20,
            filter: "blur(5px)",
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
    };

    // Staggered reveal animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Gentle pulse for trust indicators
    const pulseAnimation = {
        animate: {
            scale: [1, 1.15, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <section className="py-[100px] bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-light/20 to-transparent" />

                {/* Subtle floating orbs */}
                <motion.div
                    className="absolute top-32 left-[10%] w-48 h-48 bg-primary-teal/5 rounded-full blur-3xl"
                    animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-32 right-[10%] w-56 h-56 bg-teal-400/5 rounded-full blur-3xl"
                    animate={{ y: [0, -25, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        What Our <span className="text-gradient">Clients Say</span>
                    </motion.h2>
                    <motion.p
                        className="max-w-2xl mx-auto text-text-body"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Don't just take our word for it. Here's what our clients have to say
                        about their experience working with us.
                    </motion.p>
                </motion.div>

                {/* Premium Dark Mode Testimonial Slider */}
                <div className="relative max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative rounded-[24px] p-8 md:p-10 overflow-hidden"
                        >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2744] to-[#0d4d4d] rounded-[24px]" />

                            {/* Glassmorphism */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[24px]" />

                            {/* Inner glow */}
                            <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

                            {/* Border */}
                            <div className="absolute inset-0 rounded-[24px] border border-white/10" />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Quote Icon */}
                                <motion.div
                                    className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-primary-teal/20 to-primary-teal/10 border border-primary-teal/30 flex items-center justify-center mb-6"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2" className="text-teal-400">
                                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
                                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                                    </svg>
                                </motion.div>

                                {/* Testimonial Content */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.p
                                        className="text-lg md:text-xl text-gray-300 italic leading-relaxed font-body mb-8"
                                        variants={itemVariants}
                                    >
                                        "{testimonials[currentIndex].content}"
                                    </motion.p>

                                    {/* Client Profile */}
                                    <motion.div
                                        className="flex items-center gap-4 mb-6"
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-teal to-teal-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <span className="text-white font-heading font-bold text-lg">{testimonials[currentIndex].initials}</span>
                                        </motion.div>

                                        <div>
                                            <h4 className="font-heading font-semibold text-white text-lg">
                                                {testimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-gray-400 text-sm font-body">
                                                {testimonials[currentIndex].title}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Bottom Section */}
                                    <motion.div
                                        className="flex items-end justify-between pt-4 border-t border-white/10"
                                        variants={itemVariants}
                                    >
                                        {/* Rating */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                                    >
                                                        <HiStar className="text-yellow-400 fill-yellow-400" size={18} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <span className="text-white font-heading font-bold text-lg ml-1">{testimonials[currentIndex].rating}.0</span>
                                        </div>

                                        {/* Reviews */}
                                        <div className="text-right">
                                            <p className="text-gray-500 text-sm font-body">
                                                Based on 150+ reviews
                                            </p>
                                            <p className="text-teal-400/80 text-xs font-body mt-0.5">
                                                Guaranteed – Results or Refund
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <motion.div
                        className="flex justify-center gap-4 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {testimonials.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-primary-teal'
                                    : 'w-2 bg-border-light hover:bg-primary-teal/50'
                                    }`}
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </motion.div>

                    {/* Arrow Navigation */}
                    <motion.div
                        className="flex justify-center gap-4 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-text-heading hover:border-primary-teal hover:text-primary-teal transition-colors duration-300 shadow-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </motion.button>
                        <motion.button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-text-heading hover:border-primary-teal hover:text-primary-teal transition-colors duration-300 shadow-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Trust Indicators - Enhanced Badges */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-4 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* 500+ Clients */}
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-teal/10 to-teal-400/10 rounded-full border border-primary-teal/20 shadow-sm"
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 128, 128, 0.15)" }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.7)", "0 0 0 rgba(34, 197, 94, 0)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-body text-text-heading font-semibold">500+ Clients Served</span>
                    </motion.div>

                    {/* 98% Satisfaction */}
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-teal/10 to-teal-400/10 rounded-full border border-primary-teal/20 shadow-sm"
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 128, 128, 0.15)" }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.7)", "0 0 0 rgba(34, 197, 94, 0)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <span className="text-sm font-body text-text-heading font-semibold">98% Satisfaction</span>
                    </motion.div>

                    {/* 10+ Years */}
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-teal/10 to-teal-400/10 rounded-full border border-primary-teal/20 shadow-sm"
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 128, 128, 0.15)" }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.7)", "0 0 0 rgba(34, 197, 94, 0)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <span className="text-sm font-body text-text-heading font-semibold">10+ Years</span>
                    </motion.div>

                    {/* 150+ Reviews */}
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-teal/10 to-teal-400/10 rounded-full border border-primary-teal/20 shadow-sm"
                        whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 128, 128, 0.15)" }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.7)", "0 0 0 rgba(34, 197, 94, 0)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        />
                        <span className="text-sm font-body text-text-heading font-semibold">150+ Reviews</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
