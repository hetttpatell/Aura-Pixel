import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsArrowRight, BsLightningChargeFill } from 'react-icons/bs';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isHovered, setIsHovered] = useState(null);
    const navRef = useRef(null);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    // Scroll progress for animations
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform values based on scroll
    const navBgOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
    const navScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
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

    // Animation variants
    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1
            }
        }
    };

    const linkVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        },
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: { x: -20, opacity: 0 },
        open: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-teal via-primary-dark to-primary-teal z-[300] origin-left"
                style={{ scaleX: smoothProgress }}
            />

            <motion.nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${isScrolled
                    ? 'py-2 bg-white/90 backdrop-blur-2xl border-b border-primary-teal/10 shadow-[0_4px_40px_rgba(0,128,128,0.08)]'
                    : 'py-3 bg-transparent'
                    }`}
                initial="hidden"
                animate="visible"
                variants={navVariants}
            >
                {/* Animated gradient border on scroll */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: isScrolled ? 1 : 0,
                        opacity: isScrolled ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                />

                <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
                    {/* Logo with glow effect */}
                    <motion.a
                        href="#home"
                        className="flex items-center z-10 relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="absolute -inset-4 bg-primary-teal/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <img
                            src="/AURA-PIXEL.PNG"
                            alt="Aura Pixel"
                            className={`relative transition-all duration-500 ${isScrolled ? 'h-[70px] w-auto max-w-none' : 'h-[90px] w-auto max-w-none'}`}
                        />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="relative font-heading text-[0.95rem] font-medium text-text-heading py-2 px-4 transition-colors duration-300 hover:text-primary-teal group"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                                variants={linkVariants}
                                custom={index}
                                onMouseEnter={() => setIsHovered(link.name)}
                                onMouseLeave={() => setIsHovered(null)}
                                whileHover={{ y: -2 }}
                            >
                                <span className="relative z-10">{link.name}</span>

                                {/* Active indicator */}
                                {activeSection === link.href.substring(1) && (
                                    <motion.div
                                        className="absolute inset-0 bg-primary-light rounded-lg"
                                        layoutId="activeNav"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}

                                {/* Hover background */}
                                <motion.div
                                    className="absolute inset-0 bg-primary-light/50 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: isHovered === link.name ? 1 : 0,
                                        scale: isHovered === link.name ? 1 : 0.8
                                    }}
                                    transition={{ duration: 0.2 }}
                                />

                                {/* Bottom underline */}
                                <motion.span
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-teal to-primary-dark rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: activeSection === link.href.substring(1) ? '60%' : 0
                                    }}
                                    whileHover={{ width: '60%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button with enhanced styling */}
                    <motion.a
                        href="#contact"
                        className="hidden lg:inline-flex items-center gap-2 relative group"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('#contact');
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Button glow effect */}
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-primary-teal to-primary-dark rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                        />

                        <div className="relative flex items-center gap-2 bg-gradient-to-r from-primary-teal to-primary-dark text-white font-heading font-semibold text-sm py-3 px-6 rounded-xl overflow-hidden">
                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                            />

                            <BsLightningChargeFill className="text-yellow-300" />
                            <span>Get Free Strategy Call</span>
                            <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <BsArrowRight className="text-lg" />
                            </motion.div>
                        </div>
                    </motion.a>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="lg:hidden flex items-center justify-center w-10 h-10 bg-primary-light/80 backdrop-blur-sm border border-primary-teal/10 rounded-xl cursor-pointer z-10"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ backgroundColor: 'rgba(0, 128, 128, 0.1)' }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <HiX size={20} className="text-primary-teal" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <HiMenuAlt3 size={20} className="text-primary-teal" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-border-light shadow-[0_20px_50px_rgba(0,128,128,0.1)] overflow-hidden lg:hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal via-primary-dark to-primary-teal" />

                            <div className="p-6 flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className={`font-heading text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${activeSection === link.href.substring(1)
                                            ? 'bg-primary-light text-primary-teal'
                                            : 'text-text-heading hover:bg-primary-light/50 hover:text-primary-teal'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link.href);
                                        }}
                                        variants={mobileItemVariants}
                                    >
                                        <span className="flex items-center justify-between">
                                            {link.name}
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <BsArrowRight className={`text-primary-teal ${activeSection === link.href.substring(1) ? 'opacity-100' : 'opacity-0'}`} />
                                            </motion.span>
                                        </span>
                                    </motion.a>
                                ))}

                                <motion.div
                                    className="mt-4 pt-4 border-t border-border-light"
                                    variants={mobileItemVariants}
                                >
                                    <motion.a
                                        href="#contact"
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-teal to-primary-dark text-white font-heading font-semibold py-4 px-6 rounded-xl w-full"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick('#contact');
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <BsLightningChargeFill className="text-yellow-300" />
                                        <span>Get Free Strategy Call</span>
                                    </motion.a>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;