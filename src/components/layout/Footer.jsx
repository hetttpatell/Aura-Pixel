import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    HiOutlineMail,
    HiOutlinePhone,
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

const Footer = memo(() => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const handleNavClick = useCallback((href) => {
        const isFullPageNavigation = href.startsWith('/') && !href.startsWith('/#');
        navigate(href.startsWith('#') ? `/${href}` : href);
        if (isFullPageNavigation) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [navigate]);

    return (
        <footer className="relative overflow-hidden bg-text-heading">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    <div className="lg:col-span-1">
                        <a href="/#home" className="inline-block mb-6" onClick={(e) => { e.preventDefault(); handleNavClick('/#home'); }}>
                            <span className="text-2xl font-heading font-bold text-white">Aura Pixel</span>
                        </a>
                        <p className="mb-6 leading-relaxed text-gray-400">
                            Transforming businesses through intelligent digital marketing strategies. Your growth is our mission.
                        </p>
                        <div className="space-y-3">
                            <a href="mailto:hello@aurapixel.com" className="flex items-center gap-3 transition-colors duration-300 text-gray-400 hover:text-primary-teal">
                                <HiOutlineMail size={20} />
                                <span>hello@aurapixel.com</span>
                            </a>
                            <a href="tel:+919879794198" className="flex items-center gap-3 transition-colors duration-300 text-gray-400 hover:text-primary-teal">
                                <HiOutlinePhone size={20} />
                                <span>+91 98797 94198</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white font-heading">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} className="transition-colors duration-300 flex items-center gap-2 group text-gray-400 hover:text-primary-teal">
                                        <span className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-gray-600 group-hover:bg-primary-teal" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white font-heading">Services</h4>
                        <ul className="space-y-3">
                            {servicesLinks.map((service) => (
                                <li key={service.name}>
                                    <a href={service.href} onClick={(e) => { e.preventDefault(); handleNavClick(service.href); }} className="transition-colors duration-300 flex items-center gap-2 group text-gray-400 hover:text-primary-teal">
                                        <span className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-gray-600 group-hover:bg-primary-teal" />
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white font-heading">Follow Us</h4>
                        <div>
                            <p className="text-sm mb-3 text-gray-400">Connect with us:</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-white/5 border border-gray-700 text-gray-400 hover:bg-primary-teal hover:border-primary-teal hover:text-white" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} aria-label={social.label}>
                                        <social.icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-center md:text-left text-gray-500">
                            © {currentYear} Aura Pixel. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy-policy" className="transition-colors duration-300 text-gray-500 hover:text-primary-teal">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="transition-colors duration-300 text-gray-500 hover:text-primary-teal">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;