import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker
} from 'react-icons/hi';
import {
    SiFacebook,
    SiInstagram,
    SiLinkedin,
    SiYoutube,
    SiX
} from 'react-icons/si';

const quickLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
];

const servicesLinks = [
    { name: 'SEO Optimization', href: '/#services' },
    { name: 'Performance Marketing', href: '/#services' },
    { name: 'Social Media', href: '/#services' },
    { name: 'Branding', href: '/#services' },
    { name: 'Web Development', href: '/#services' },
    { name: 'Conversion Optimization', href: '/#services' },
];

const socialLinks = [
    { icon: SiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: SiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: SiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: SiX, href: 'https://x.com', label: 'X (Twitter)' },
    { icon: SiYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navigate = useNavigate();

    const handleNavClick = (href) => {
        navigate(href.startsWith('#') ? `/${href}` : href);
    };

    return (
        <footer className="bg-text-heading relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <a href="/#home" className="inline-block mb-6" onClick={(e) => { e.preventDefault(); handleNavClick('/#home'); }}>
                            <img src="/AURA-PIXEL.PNG" alt="Aura Pixel" className="h-12 brightness-0 invert" />
                        </a>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Transforming businesses through intelligent digital marketing strategies.
                            Your growth is our mission.
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:hello@aurapixel.com" className="flex items-center gap-3 text-gray-400 hover:text-primary-teal transition-colors duration-300">
                                <HiOutlineMail size={20} />
                                <span>hello@aurapixel.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-primary-teal transition-colors duration-300">
                                <HiOutlinePhone size={20} />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400">
                                <HiOutlineLocationMarker size={20} className="flex-shrink-0 mt-1" />
                                <span>123 Marketing Street, Digital City, DC 10001</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                        className="text-gray-400 hover:text-primary-teal transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary-teal transition-colors duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-lg mb-6">Services</h4>
                        <ul className="space-y-3">
                            {servicesLinks.map((service) => (
                                <li key={service.name}>
                                    <a
                                        href={service.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(service.href); }}
                                        className="text-gray-400 hover:text-primary-teal transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary-teal transition-colors duration-300" />
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-heading font-semibold text-lg mb-6">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest marketing insights.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-btn text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-teal transition-colors duration-300"
                            />
                            <motion.button
                                type="submit"
                                className="w-full btn btn-primary"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Subscribe
                            </motion.button>
                        </form>

                        {/* Social Links */}
                        <div className="mt-6">
                            <p className="text-gray-400 text-sm mb-3">Follow us:</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-primary-teal hover:border-primary-teal hover:text-white transition-all duration-300"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {currentYear} Aura Pixel. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-primary-teal transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary-teal transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary-teal transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;