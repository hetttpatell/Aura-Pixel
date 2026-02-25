import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${isScrolled
                    ? 'py-3 bg-white/85 backdrop-blur-xl border-b border-primary-teal/10 shadow-[0_4px_30px_rgba(0,128,128,0.05)]'
                    : 'py-5'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    className="flex items-center z-10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <img
                        src="/AURA-PIXEL.PNG"
                        alt="Aura Pixel"
                        className={`transition-all duration-300 ${isScrolled ? 'h-9' : 'h-11'}`}
                    />
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="relative font-heading text-[0.95rem] font-medium text-text-heading py-2 transition-colors duration-200 hover:text-primary-teal group"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(link.href);
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -2 }}
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-teal to-primary-dark transition-all duration-300 group-hover:w-full rounded-full" />
                        </motion.a>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.a
                    href="#contact"
                    className="hidden lg:inline-flex btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#contact');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Get Free Strategy Call
                </motion.a>

                {/* Mobile Menu Toggle */}
                <motion.button
                    className="lg:hidden flex items-center justify-center bg-transparent border-none cursor-pointer p-2 text-text-heading z-10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-border-light shadow-lg overflow-hidden lg:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="font-heading text-lg font-medium text-text-heading py-3 px-4 rounded-lg transition-all duration-200 hover:bg-primary-light hover:text-primary-teal"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link.href);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                className="btn btn-primary mt-2 w-full text-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Get Free Strategy Call
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
