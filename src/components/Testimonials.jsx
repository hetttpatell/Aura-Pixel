import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiOutlineStar } from 'react-icons/hi';
import { HiStar } from 'react-icons/hi';

const Testimonials = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO, TechFlow',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            content: 'Aura Pixel transformed our digital presence completely. Their strategic approach to marketing helped us achieve 300% growth in just 6 months. Highly recommended!',
            rating: 5,
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Founder, StartupX',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            content: 'The team at Aura Pixel is exceptional. They understand the nuances of digital marketing and deliver results that exceed expectations. Our ROI has never been better.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Marketing Director, Luxe Brand',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            content: 'Working with Aura Pixel was a game-changer for our brand. Their creative campaigns and data-driven strategies helped us reach our target audience effectively.',
            rating: 5,
        },
        {
            id: 4,
            name: 'David Kim',
            role: 'CTO, FinanceHub',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            content: 'The level of professionalism and expertise at Aura Pixel is unmatched. They took our marketing to the next level with innovative strategies and flawless execution.',
            rating: 5,
        },
        {
            id: 5,
            name: 'Amanda Foster',
            role: 'Owner, EcoTech Solutions',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
            content: 'Aura Pixel helped us build a strong online presence from scratch. Their team is responsive, creative, and truly invested in our success. Amazing results!',
            rating: 5,
        },
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            i < rating ? (
                <HiStar key={i} className="text-yellow-400" size={18} />
            ) : (
                <HiOutlineStar key={i} className="text-gray-300" size={18} />
            )
        ));
    };

    return (
        <section className="py-[100px] bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-light/20 to-transparent" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                        Testimonials
                    </span>
                    <h2 className="mb-4">
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-text-body">
                        Don't just take our word for it. Here's what our clients have to say
                        about their experience working with us.
                    </p>
                </motion.div>

                {/* Testimonial Slider */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card p-8 md:p-12 text-center"
                        >
                            {/* Quote Icon */}
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-teal/10 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2">
                                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
                                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <p className="text-lg md:text-xl text-text-body leading-relaxed mb-8 italic">
                                &ldquo;{testimonials[currentIndex].content}&rdquo;
                            </p>

                            {/* Rating */}
                            <div className="flex justify-center gap-1 mb-6">
                                {renderStars(testimonials[currentIndex].rating)}
                            </div>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-teal/20"
                                />
                                <div className="text-left">
                                    <h4 className="font-heading font-semibold text-text-heading">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-sm text-text-body">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center text-text-heading hover:border-primary-teal hover:text-primary-teal transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </motion.button>
                        <motion.button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center text-text-heading hover:border-primary-teal hover:text-primary-teal transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-8 bg-primary-teal'
                                        : 'bg-border-light hover:bg-primary-teal/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;