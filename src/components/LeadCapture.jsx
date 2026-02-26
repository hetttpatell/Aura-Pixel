import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiOutlineChat, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';

const LeadCapture = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const budgetOptions = [
        { value: '', label: 'Select Budget Range' },
        { value: '5k-10k', label: '$5,000 - $10,000' },
        { value: '10k-25k', label: '$10,000 - $25,000' },
        { value: '25k-50k', label: '$25,000 - $50,000' },
        { value: '50k+', label: '$50,000+' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

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

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-[100px] bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-primary-light text-primary-teal font-heading font-semibold text-sm rounded-full mb-4">
                            Get Started
                        </span>
                        <h2 className="mb-6">
                            Get Your Free Digital Growth <span className="text-gradient">Blueprint</span>
                        </h2>
                        <p className="text-lg text-text-body mb-8">
                            Schedule a free strategy session with our experts. We'll analyze your business
                            and create a customized growth roadmap tailored to your goals.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {[
                                'Free 30-minute strategy consultation',
                                'Custom growth roadmap',
                                'Competitor analysis report',
                                'ROI projection & timeline',
                            ].map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary-teal/10 flex items-center justify-center flex-shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className="text-text-heading font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-10 pt-8 border-t border-border-light">
                            <p className="text-sm text-text-body mb-4">Trusted by leading brands:</p>
                            <div className="flex flex-wrap gap-6 items-center opacity-60">
                                {['Google Partner', 'Meta Business', 'HubSpot', 'Semrush'].map((brand) => (
                                    <span key={brand} className="font-heading font-semibold text-text-heading">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card p-8 md:p-10">
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
                                            setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
                                        }}
                                        className="text-primary-teal font-semibold hover:underline"
                                    >
                                        Submit another request
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name Field */}
                                    <div className="relative">
                                        <label htmlFor="name" className="block text-sm font-medium text-text-heading mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-3.5 bg-bg-soft border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative">
                                        <label htmlFor="email" className="block text-sm font-medium text-text-heading mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="john@company.com"
                                                className="w-full pl-12 pr-4 py-3.5 bg-bg-soft border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-sm font-medium text-text-heading mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full pl-12 pr-4 py-3.5 bg-bg-soft border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Budget Dropdown */}
                                    <div className="relative">
                                        <label htmlFor="budget" className="block text-sm font-medium text-text-heading mb-2">
                                            Monthly Budget
                                        </label>
                                        <div className="relative">
                                            <HiOutlineCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-body" size={20} />
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-3.5 bg-bg-soft border border-border-light rounded-btn text-text-heading focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 transition-all duration-300 appearance-none cursor-pointer"
                                            >
                                                {budgetOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className="relative">
                                        <label htmlFor="message" className="block text-sm font-medium text-text-heading mb-2">
                                            Tell us about your project
                                        </label>
                                        <div className="relative">
                                            <HiOutlineChat className="absolute left-4 top-4 text-text-body" size={20} />
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Describe your goals and challenges..."
                                                className="w-full pl-12 pr-4 py-3.5 bg-bg-soft border border-border-light rounded-btn text-text-heading placeholder:text-text-muted focus:outline-none focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 transition-all duration-300 resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn btn-primary py-4 text-lg"
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
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