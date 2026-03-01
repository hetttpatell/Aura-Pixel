import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiOutlineChat, HiChevronDown } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { services } from '../constants/services';

// Removed budgetOptions as we're switching to services dropdown

// Initialize EmailJS outside the component to ensure it's ready
emailjs.init("bwpbqijxAOuDDPJq5");

const LeadCapture = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        subService: '',
        message: '',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const subDropdownRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceSelect = (serviceName) => {
        setFormData((prev) => ({ ...prev, service: serviceName, subService: '' }));
        setIsDropdownOpen(false);
    };

    const handleSubServiceSelect = (subServiceName) => {
        setFormData((prev) => ({ ...prev, subService: subServiceName }));
        setIsSubDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (subDropdownRef.current && !subDropdownRef.current.contains(event.target)) {
                setIsSubDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // EmailJS Integration
            // IDs are trimmed to prevent invisible whitespace errors
            const SERVICE_ID = "service_w7iw5rw".trim();
            const TEMPLATE_ID = "template_7s4brvy".trim();
            const PUBLIC_KEY = "bwpbqijxAOuDDPJq5".trim();

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone_number: formData.phone,
                service: formData.subService ? `${formData.service} - ${formData.subService}` : formData.service,
                message: formData.message,
                submitted_at: new Date().toLocaleString(),
                source_url: window.location.href,
                to_email: 'hetpatel140505@gmail.com',
            };

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            // Track conversion for Meta Pixel
            if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'Lead', {
                    content_name: 'Strategy Request Form',
                    content_category: 'Lead Generation',
                });
            }

            // Track conversion for Google Ads
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-XXXXX/XXXXX', // Replace with actual conversion ID
                    event_category: 'Lead Generation',
                    event_label: 'Strategy Request Form',
                });
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('EmailJS Error Object:', error);
            const errorMessage = error?.text || error?.message || 'Something went wrong.';
            alert(`EmailJS Error: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Centered Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-xs md:text-sm rounded-full mb-4 md:mb-6">
                            GET IN TOUCH
                        </span>
                        <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
                            Get Your Free Digital Growth <span className="text-gradient">Blueprint</span>
                        </h2>
                        <p className="text-base md:text-lg text-text-body mx-auto max-w-2xl">
                            Schedule a free strategy session with our experts. We'll analyze your business
                            and create a customized growth roadmap tailored to your goals.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Left Content: Benefits & Trust */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col h-full justify-between"
                    >
                        {/* Benefits */}
                        <div className="space-y-4 mb-10">
                            {[
                                'Free 30-minute strategy consultation',
                                'Custom growth roadmap',
                                'Competitor analysis report',
                                'ROI projection & timeline',
                            ].map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    className="flex items-center gap-4 group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-teal/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary-teal group-hover:text-white transition-all duration-300">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-teal group-hover:text-white transition-colors duration-300">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className="text-text-heading font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <motion.div
                            className="mt-auto pt-8 border-t border-border-light w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <p className="text-sm text-text-muted mb-6">Trusted by leading brands:</p>
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-8 items-center justify-start opacity-60">
                                {['Google Partner', 'Meta Business', 'HubSpot', 'Semrush'].map((brand) => (
                                    <span key={brand} className="font-heading font-semibold text-sm md:text-base text-text-heading text-left hover:text-primary-teal transition-colors duration-300">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                        className="relative"
                    >
                        {/* Decorative blob behind form - constrained to prevent overflow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-teal/10 to-transparent rounded-[2rem] blur-2xl -z-10 animate-pulse-glow scale-110" />

                        <div className="glass-card p-6 sm:p-8 md:p-10 relative z-10 border border-border-light/50 shadow-xl shadow-primary-teal/5">
                            {isSubmitted ? (
                                <motion.div
                                    className="text-center py-8"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-text-heading mb-3">
                                        Thank You!
                                    </h3>
                                    <p className="text-text-body mb-6">
                                        We've received your request. Our team will reach out within 24 hours
                                        to schedule your free strategy session.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({ name: '', email: '', phone: '', service: '', subService: '', message: '' });
                                        }}
                                        className="text-primary-teal font-semibold hover:underline"
                                    >
                                        Submit another request
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name Field */}
                                    <div className="relative group">
                                        <label htmlFor="name" className="block text-sm font-medium text-text-heading mb-2 group-focus-within:text-primary-teal transition-colors">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body group-focus-within:text-primary-teal transition-colors" size={20} />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-soft/50 border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 focus:bg-white transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative group">
                                        <label htmlFor="email" className="block text-sm font-medium text-text-heading mb-2 group-focus-within:text-primary-teal transition-colors">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body group-focus-within:text-primary-teal transition-colors" size={20} />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="john@company.com"
                                                className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-soft/50 border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 focus:bg-white transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="relative group">
                                        <label htmlFor="phone" className="block text-sm font-medium text-text-heading mb-2 group-focus-within:text-primary-teal transition-colors">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body group-focus-within:text-primary-teal transition-colors" size={20} />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-soft/50 border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 focus:bg-white transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Services Dropdown */}
                                    <div className="relative group" ref={dropdownRef}>
                                        <label htmlFor="service" className="block text-sm font-medium text-text-heading mb-2 group-[.is-active]:text-primary-teal transition-colors">
                                            Interested Service *
                                        </label>
                                        <div className={`relative ${isDropdownOpen ? 'is-active' : ''}`}>
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`w-full flex items-center justify-between pl-4 pr-10 py-3 md:py-3.5 bg-bg-soft/50 border ${isDropdownOpen ? 'border-primary-teal ring-2 ring-primary-teal/20 bg-white' : 'border-border-light hover:border-primary-teal/50'} rounded-btn text-text-heading transition-all duration-300 text-left`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {formData.service ? (
                                                        <>
                                                            {(() => {
                                                                const selectedService = services.find(s => s.name === formData.service);
                                                                const Icon = selectedService?.icon;
                                                                return Icon ? <Icon className={selectedService.iconColor} size={20} /> : <div className="w-5 h-5 bg-primary-teal/10 rounded" />;
                                                            })()}
                                                            <span>{formData.service}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-text-muted">Select a service...</span>
                                                    )}
                                                </div>
                                                <HiChevronDown
                                                    className={`text-text-body transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                    size={20}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="absolute z-50 top-full left-0 right-0 mt-2 p-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,128,128,0.12)] border border-primary-teal/10 max-h-[300px] overflow-y-auto custom-scrollbar"
                                                    >
                                                        <div className="grid grid-cols-1 gap-1">
                                                            {services.map((service) => {
                                                                const Icon = service.icon;
                                                                return (
                                                                    <button
                                                                        key={service.name}
                                                                        type="button"
                                                                        onClick={() => handleServiceSelect(service.name)}
                                                                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${formData.service === service.name ? 'bg-primary-light text-primary-teal' : 'hover:bg-primary-light/50 text-text-heading'}`}
                                                                    >
                                                                        <div className={`w-9 h-9 rounded-xl ${service.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                                                            <Icon size={18} className={service.iconColor} />
                                                                        </div>
                                                                        <div className="text-left flex-1 min-w-0">
                                                                            <p className="text-[13px] md:text-[14px] font-semibold leading-tight truncate">{service.name}</p>
                                                                            <p className="text-[10px] md:text-[11px] text-text-body mt-0.5 leading-tight opacity-70 line-clamp-1">{service.desc}</p>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Sub-Services Dropdown */}
                                    <AnimatePresence>
                                        {formData.service && services.find(s => s.name === formData.service)?.subServices?.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                className="relative group"
                                                ref={subDropdownRef}
                                            >
                                                <label htmlFor="subService" className="block text-sm font-medium text-text-heading mb-2 group-[.is-active]:text-primary-teal transition-colors">
                                                    Specific Service Focus *
                                                </label>
                                                <div className={`relative ${isSubDropdownOpen ? 'is-active' : ''}`}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsSubDropdownOpen(!isSubDropdownOpen)}
                                                        className={`w-full flex items-center justify-between pl-4 pr-10 py-3 md:py-3.5 bg-bg-soft/50 border ${isSubDropdownOpen ? 'border-primary-teal ring-2 ring-primary-teal/20 bg-white' : 'border-border-light hover:border-primary-teal/50'} rounded-btn text-text-heading transition-all duration-300 text-left`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {formData.subService ? (
                                                                <span className="font-medium text-primary-teal">{formData.subService}</span>
                                                            ) : (
                                                                <span className="text-text-muted">Select a specific focus...</span>
                                                            )}
                                                        </div>
                                                        <HiChevronDown
                                                            className={`text-text-body transition-transform duration-300 ${isSubDropdownOpen ? 'rotate-180' : ''}`}
                                                            size={20}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {isSubDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                                className="absolute z-40 top-full left-0 right-0 mt-2 p-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,128,128,0.12)] border border-primary-teal/10 max-h-[250px] overflow-y-auto custom-scrollbar"
                                                            >
                                                                <div className="grid grid-cols-1 gap-1">
                                                                    {services.find(s => s.name === formData.service).subServices.map((subName) => (
                                                                        <button
                                                                            key={subName}
                                                                            type="button"
                                                                            onClick={() => handleSubServiceSelect(subName)}
                                                                            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${formData.subService === subName ? 'bg-primary-light text-primary-teal font-semibold' : 'hover:bg-primary-light/50 text-text-heading'}`}
                                                                        >
                                                                            <span className="text-[14px] leading-tight text-left">{subName}</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Message Field */}
                                    <div className="relative group">
                                        <label htmlFor="message" className="block text-sm font-medium text-text-heading mb-2 group-focus-within:text-primary-teal transition-colors">
                                            Tell us about your project
                                        </label>
                                        <div className="relative">
                                            <HiOutlineChat className="absolute left-4 top-4 text-text-body group-focus-within:text-primary-teal transition-colors" size={20} />
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Describe your goals and challenges..."
                                                className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-soft/50 border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 focus:bg-white transition-all duration-300 resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn btn-primary py-3.5 md:py-4 text-base md:text-lg"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Get My Strategy
                                                <FiSend className="text-lg" />
                                            </span>
                                        )}
                                    </motion.button>

                                    {/* Privacy Note */}
                                    <p className="text-xs text-text-body text-center mt-4">
                                        By submitting, you agree to our{' '}
                                        <a href="#" className="text-primary-teal hover:underline">Privacy Policy</a>
                                        {' '}and{' '}
                                        <a href="#" className="text-primary-teal hover:underline">Terms of Service</a>
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Contact Aura Pixel',
                        description: 'Get your free digital growth blueprint from Aura Pixel',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'Aura Pixel',
                            url: 'https://aurapixel.com',
                        },
                    }),
                }}
            />
        </section>
    );
};

export default LeadCapture;