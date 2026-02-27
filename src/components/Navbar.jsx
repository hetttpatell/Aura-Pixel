import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import { BsArrowRight, BsLightningChargeFill, BsCameraFill, BsBagCheckFill, BsFilm, BsPenFill } from 'react-icons/bs';
import { MdTrendingUp, MdBrush, MdMicNone } from 'react-icons/md';
import { FaInstagram, FaGoogle, FaFacebook } from 'react-icons/fa';

const services = [
    { name: 'Social Media', icon: FaInstagram, desc: 'Grow your brand presence', iconColor: 'text-rose-500', bg: 'bg-rose-50', href: '#services' },
    { name: 'SEO', icon: MdTrendingUp, desc: 'Rank higher, get found', iconColor: 'text-sky-500', bg: 'bg-sky-50', href: '#services' },
    { name: 'Google Ads', icon: FaGoogle, desc: 'Convert clicks to customers', iconColor: 'text-orange-500', bg: 'bg-orange-50', href: '#services' },
    { name: 'Meta Ads', icon: FaFacebook, desc: 'Targeted social advertising', iconColor: 'text-blue-600', bg: 'bg-blue-50', href: '#services' },
    { name: 'E-commerce', icon: BsBagCheckFill, desc: 'Scale your online store', iconColor: 'text-emerald-500', bg: 'bg-emerald-50', href: '#services' },
    { name: 'Content Writing', icon: BsPenFill, desc: 'Words that drive action', iconColor: 'text-violet-500', bg: 'bg-violet-50', href: '#services' },
    { name: 'Podcast Productions', icon: MdMicNone, desc: 'Share your story, your way', iconColor: 'text-red-500', bg: 'bg-red-50', href: '#services' },
    { name: 'Product Photography', icon: BsCameraFill, desc: 'Visuals that sell products', iconColor: 'text-amber-500', bg: 'bg-amber-50', href: '#services' },
    { name: 'Content Creation', icon: MdBrush, desc: 'Creative content at scale', iconColor: 'text-teal-500', bg: 'bg-teal-50', href: '#services' },
    { name: 'Video & Photo Editing', icon: BsFilm, desc: 'Polish every pixel', iconColor: 'text-primary-teal', bg: 'bg-teal-50', href: '#services' },
];

const EASE = [0.25, 0.46, 0.45, 0.94];

const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE, staggerChildren: 0.08 } },
};

const linkVariants = {
    hidden: { y: -16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: EASE } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.25, ease: EASE, staggerChildren: 0.025, delayChildren: 0.05 } },
};

const mobileItemVariants = {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.2, ease: EASE } },
};

const dropdownVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16, ease: 'easeIn' } },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring', stiffness: 280, damping: 26, staggerChildren: 0.035, delayChildren: 0.05 },
    },
};

const dropdownItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isHovered, setIsHovered] = useState(null);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const navRef = useRef(null);
    const servicesTimeout = useRef(null);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services', hasDropdown: true },
        { name: 'About Us', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
    ];

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const sections = navLinks.map(l => l.href.substring(1));
            for (const sec of [...sections].reverse()) {
                const el = document.getElementById(sec);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(sec);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setIsMobileServicesOpen(false);
            }
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsMobileServicesOpen(false);
        document.body.style.overflow = '';
        setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    const openServices = () => { clearTimeout(servicesTimeout.current); setIsServicesOpen(true); };
    const closeServices = () => { servicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 100); };

    return (
        <>
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-teal via-teal-400 to-primary-dark z-[300] origin-left"
                style={{ scaleX: smoothProgress }}
            />

            <motion.nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-[200] transition-all duration-500 py-2 bg-white border-b border-primary-teal/10 shadow-md lg:py-2 lg:bg-transparent lg:border-none lg:shadow-none"
                initial="hidden"
                animate="visible"
                variants={navVariants}
            >
                {/* Gradient underline on scroll */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-teal/30 to-transparent"
                    animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">

                    {/* ── Logo ── */}
                    <motion.a
                        href="#home"
                        className="flex items-center z-10 relative group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                    >
                        <motion.div className="absolute -inset-4 bg-primary-teal/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img
                            src="/AURA-PIXEL.PNG"
                            alt="Aura Pixel"
                            className={`relative transition-all duration-500 ${isScrolled ? 'h-[50px] sm:h-[60px] lg:h-[70px]' : 'h-[55px] sm:h-[65px] lg:h-[80px]'} w-auto`}
                        />
                    </motion.a>

                    {/* ── Desktop Nav ── */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) =>
                            link.hasDropdown ? (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={openServices}
                                    onMouseLeave={closeServices}
                                >
                                    <motion.button
                                        className="relative font-heading text-[0.95rem] font-medium text-text-heading py-2 px-4 hover:text-primary-teal group flex items-center gap-1 cursor-pointer transition-colors duration-200"
                                        variants={linkVariants}
                                        custom={index}
                                        onMouseEnter={() => setIsHovered(link.name)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <motion.span
                                            className="relative z-10"
                                            animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: EASE }}
                                        >
                                            <HiChevronDown size={16} />
                                        </motion.span>

                                        {activeSection === 'services' && (
                                            <motion.div
                                                className="absolute inset-0 bg-primary-light rounded-lg"
                                                layoutId="activeNav"
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}

                                        <motion.div
                                            className="absolute inset-0 bg-primary-light/50 rounded-lg"
                                            animate={{ opacity: isHovered === link.name ? 1 : 0, scale: isHovered === link.name ? 1 : 0.85 }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        <motion.span
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-teal to-primary-dark rounded-full"
                                            animate={{ width: activeSection === 'services' ? '60%' : 0 }}
                                            whileHover={{ width: '60%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.button>

                                    {/* ── Mega dropdown ── */}
                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.div
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[620px] bg-white/96 backdrop-blur-2xl rounded-2xl shadow-[0_24px_64px_rgba(0,128,128,0.14)] border border-primary-teal/10 overflow-hidden"
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                onMouseEnter={openServices}
                                                onMouseLeave={closeServices}
                                            >
                                                <div className="h-[3px] bg-gradient-to-r from-primary-teal via-teal-400 to-primary-dark" />
                                                <div className="px-6 pt-4 pb-3 border-b border-gray-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-teal">What We Offer</p>
                                                    <p className="text-[13px] text-text-body mt-0.5">Full-spectrum digital marketing solutions</p>
                                                </div>
                                                <motion.div
                                                    className="p-3 grid grid-cols-2 gap-1"
                                                    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                                                >
                                                    {services.map((service) => {
                                                        const Icon = service.icon;
                                                        return (
                                                            <motion.a
                                                                key={service.name}
                                                                href={service.href}
                                                                onClick={(e) => { e.preventDefault(); handleNavClick(service.href); }}
                                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-light/60 group/item transition-colors duration-150 cursor-pointer"
                                                                variants={dropdownItemVariants}
                                                                whileHover={{ x: 3 }}
                                                                transition={{ duration: 0.18 }}
                                                            >
                                                                <div className={`w-9 h-9 rounded-xl ${service.bg} flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover/item:scale-110 group-hover/item:shadow-sm`}>
                                                                    <Icon size={18} className={service.iconColor} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-[13px] font-semibold text-text-heading leading-tight group-hover/item:text-primary-teal transition-colors duration-150">{service.name}</p>
                                                                    <p className="text-[11px] text-text-body mt-0.5 leading-tight truncate">{service.desc}</p>
                                                                </div>
                                                                <BsArrowRight size={13} className="text-primary-teal flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                            </motion.a>
                                                        );
                                                    })}
                                                </motion.div>
                                                <div className="h-2" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="relative font-heading text-[0.95rem] font-medium text-text-heading py-2 px-4 hover:text-primary-teal group transition-colors duration-200"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    variants={linkVariants}
                                    custom={index}
                                    onMouseEnter={() => setIsHovered(link.name)}
                                    onMouseLeave={() => setIsHovered(null)}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {activeSection === link.href.substring(1) && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary-light rounded-lg"
                                            layoutId="activeNav"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <motion.div
                                        className="absolute inset-0 bg-primary-light/50 rounded-lg"
                                        animate={{ opacity: isHovered === link.name ? 1 : 0, scale: isHovered === link.name ? 1 : 0.85 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                    <motion.span
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-teal to-primary-dark rounded-full"
                                        animate={{ width: activeSection === link.href.substring(1) ? '60%' : 0 }}
                                        whileHover={{ width: '60%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            )
                        )}
                    </div>

                    {/* ── CTA Button (Desktop) ── */}
                    <motion.a
                        href="#contact"
                        className="hidden lg:inline-flex items-center gap-2 relative group"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.45 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div className="absolute -inset-1 bg-gradient-to-r from-primary-teal to-primary-dark rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-2 bg-gradient-to-r from-primary-teal to-primary-dark text-white font-heading font-semibold text-sm py-3 px-6 rounded-xl overflow-hidden">
                            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <BsLightningChargeFill className="text-yellow-300" />
                            <span>Get Free Strategy Call</span>
                            <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <BsArrowRight className="text-lg" />
                            </motion.div>
                        </div>
                    </motion.a>

                    {/* ── Mobile Hamburger ── */}
                    <motion.button
                        className="lg:hidden flex items-center justify-center w-10 h-10 bg-primary-light/80 backdrop-blur-sm border border-primary-teal/10 rounded-xl cursor-pointer z-10 flex-shrink-0"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <HiX size={20} className="text-primary-teal" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <HiMenuAlt3 size={20} className="text-primary-teal" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* ── Mobile Menu Overlay ── */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] lg:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />

                            <motion.div
                                className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-border-light shadow-[0_20px_50px_rgba(0,128,128,0.12)] overflow-y-auto lg:hidden"
                                style={{ maxHeight: 'calc(100vh - 70px)' }}
                                variants={mobileMenuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-teal via-primary-dark to-primary-teal" />

                                <div className="p-4 flex flex-col gap-1.5">
                                    {navLinks.map((link) =>
                                        link.hasDropdown ? (
                                            <motion.div key={link.name} variants={mobileItemVariants}>
                                                <button
                                                    className={`w-full flex items-center justify-between font-heading text-base font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${isMobileServicesOpen
                                                        ? 'bg-primary-light text-primary-teal'
                                                        : 'text-text-heading hover:bg-primary-light/70 hover:text-primary-teal active:scale-95'
                                                        }`}
                                                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                                >
                                                    <span>{link.name}</span>
                                                    <motion.span
                                                        animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                                                        transition={{ duration: 0.2, ease: EASE }}
                                                    >
                                                        <HiChevronDown size={18} />
                                                    </motion.span>
                                                </button>

                                                <AnimatePresence>
                                                    {isMobileServicesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                            className="overflow-hidden"
                                                        >
                                                            {/* 2-column grid for mobile services - desktop style */}
                                                            <div className="mt-2 grid grid-cols-2 gap-1.5 px-1">
                                                                {services.map((service, i) => {
                                                                    const Icon = service.icon;
                                                                    return (
                                                                        <motion.a
                                                                            key={service.name}
                                                                            href={service.href}
                                                                            onClick={(e) => { e.preventDefault(); handleNavClick(service.href); }}
                                                                            className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-primary-light/80 group/ms transition-all duration-200 cursor-pointer"
                                                                            initial={{ x: -10, opacity: 0 }}
                                                                            animate={{ x: 0, opacity: 1 }}
                                                                            transition={{ delay: i * 0.02, duration: 0.15 }}
                                                                            whileHover={{ scale: 0.98 }}
                                                                            whileTap={{ scale: 0.95 }}
                                                                        >
                                                                            <div className={`w-8 h-8 rounded-lg ${service.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/ms:scale-110`}>
                                                                                <Icon size={16} className={service.iconColor} />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-[12px] font-semibold text-text-heading leading-tight group-hover/ms:text-primary-teal transition-colors duration-200 truncate">{service.name}</p>
                                                                                <p className="text-[10px] text-text-body mt-0.5 leading-tight truncate group-hover/ms:text-primary-teal transition-colors duration-200">{service.desc}</p>
                                                                            </div>
                                                                            <BsArrowRight size={12} className="text-primary-teal flex-shrink-0 opacity-0 group-hover/ms:opacity-100 transition-opacity duration-200" />
                                                                        </motion.a>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ) : (
                                            <motion.a
                                                key={link.name}
                                                href={link.href}
                                                className={`font-heading text-base font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${activeSection === link.href.substring(1)
                                                    ? 'bg-primary-light text-primary-teal'
                                                    : 'text-text-heading hover:bg-primary-light/70 hover:text-primary-teal active:scale-95'
                                                    }`}
                                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                                variants={mobileItemVariants}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <span className="flex items-center justify-between">
                                                    {link.name}
                                                    <BsArrowRight className={`text-primary-teal transition-opacity duration-200 ${activeSection === link.href.substring(1) ? 'opacity-100' : 'opacity-0'}`} />
                                                </span>
                                            </motion.a>
                                        )
                                    )}

                                    {/* Mobile CTA */}
                                    <motion.div className="mt-3 pt-3 border-t border-border-light" variants={mobileItemVariants}>
                                        <motion.a
                                            href="#contact"
                                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-teal to-primary-dark text-white font-heading font-semibold py-4 px-6 rounded-xl w-full"
                                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <BsLightningChargeFill className="text-yellow-300" />
                                            <span>Get Free Strategy Call</span>
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;