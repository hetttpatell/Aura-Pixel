import { useState, useEffect, useRef } from 'react';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, LayoutGroup } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

// Smooth easing — matching Aura Pixel
const EASE = [0.4, 0, 0.2, 1];

const navVariants = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.06, delay: 0.6 } },
};

const linkVariants = {
  hidden: { y: -12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } },
};

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: EASE } },
  open: { opacity: 1, height: 'auto', transition: { duration: 0.2, ease: EASE, staggerChildren: 0.04, delayChildren: 0.06 } },
};

const mobileItemVariants = {
  closed: { x: -12, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { duration: 0.15, ease: EASE } },
};

const navLinks = [
  { name: 'Showcase', href: '#showcase' },
  { name: 'Portfolio', href: '#work' },
  { name: 'Behind the Scenes', href: '#bts' },
  { name: 'Contact', href: '#inquiry' },
];

const WeddingNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const { setBrand, startTransition } = useBrand();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Handle scroll for background and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      // Active section tracking
      const sections = ['showcase', 'work', 'bts', 'inquiry'];
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sec);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
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

  const handleBack = () => {
    startTransition('aura');
  };

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getSectionFromHref = (href) => href.replace('#', '');

  return (
    <>
      {/* Scroll progress bar — wedding theme gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[300] origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #7A1B1B, #D4AF37, #7A1B1B)',
          opacity: isScrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[200] py-2 lg:py-2"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 243, 227, 0.97)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(122, 27, 27, 0.12)' : 'none',
          boxShadow: isScrolled ? '0 4px 24px rgba(122, 27, 27, 0.10)' : 'none',
          transform: 'translateY(0)',
          opacity: 1,
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease, border-bottom 0.4s ease, backdrop-filter 0.4s ease',
        }}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Gradient underline on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
          animate={{ scaleX: isScrolled && isVisible ? 1 : 0, opacity: isScrolled && isVisible ? 1 : 0 }}
          transition={{ duration: 0.45 }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* ── Logo with wedding.jpeg ── */}
          <motion.div
            className="flex items-center gap-3 z-10 relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('#showcase')}
          >
            {/* Glow on hover */}
            <motion.div
              className="absolute -inset-4 rounded-2xl blur-xl"
              style={{ background: 'rgba(212, 175, 55, 0.1)' }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Logo image */}
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/40 shadow-sm flex-shrink-0">
              <img
                src="/wedding.jpeg"
                alt="Wedding Pixel"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Brand text */}
            <motion.div
              className="relative flex items-baseline"
              animate={{
                fontSize: isScrolled ? '1.375rem' : '1.5rem',
              }}
              transition={{ fontSize: { duration: 0.4 } }}
            >
              <span 
                className="font-['Plus_Jakarta_Sans'] font-medium tracking-wide transition-colors duration-400"
                style={{ color: isScrolled ? '#2B0F0F' : '#FFF3E3' }}
              >
                Wedding
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold tracking-wide text-[#D4AF37] ml-1">Pixel</span>
            </motion.div>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <LayoutGroup>
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const section = getSectionFromHref(link.href);
                return (
                  <motion.button
                    key={link.name}
                    className="relative text-[0.95rem] font-semibold py-2 px-4 group transition-colors duration-300 font-['Plus_Jakarta_Sans'] cursor-pointer"
                    style={{ color: isScrolled ? '#5C3A21' : '#FFD700' }}
                    onClick={() => scrollToSection(link.href)}
                    variants={linkVariants}
                    custom={index}
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span className="relative z-10">{link.name}</span>

                    {/* Active indicator background */}
                    {activeSection === section && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(212, 175, 55, 0.1)' }}
                        layoutId="activeWeddingNav"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(212, 175, 55, 0.08)' }}
                      animate={{
                        opacity: isHovered === link.name ? 1 : 0,
                        scale: isHovered === link.name ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Active underline */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7A1B1B, #D4AF37)' }}
                      animate={{ width: activeSection === section ? '60%' : 0 }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* ── Right side actions ── */}
          <div className="flex items-center gap-3">

            {/* Aura Pixel switcher — uses Aura Pixel brand colors */}
            <motion.button
              className="hidden xl:flex items-center gap-2.5 px-5 py-2 rounded-full border cursor-pointer group transition-all duration-300"
              style={{
                borderColor: isScrolled ? 'rgba(1, 104, 108, 0.2)' : 'rgba(255, 243, 227, 0.3)',
                background: isScrolled ? 'rgba(1, 104, 108, 0.05)' : 'rgba(255, 243, 227, 0.1)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.03,
                borderColor: isScrolled ? 'rgba(1, 104, 108, 0.4)' : 'rgba(255, 243, 227, 0.5)',
                background: isScrolled ? 'rgba(1, 104, 108, 0.1)' : 'rgba(255, 243, 227, 0.2)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBack}
            >
              <BsArrowLeft className="group-hover:-translate-x-0.5 transition-transform duration-200" style={{ color: isScrolled ? '#01686C' : '#FFF3E3' }} />
              <span className="text-sm font-semibold font-['Plus_Jakarta_Sans']">
                <span style={{ color: isScrolled ? '#475569' : '#FFF3E3', opacity: isScrolled ? 1 : 0.8 }}>Aura</span>
                <span style={{ color: isScrolled ? '#01686C' : '#4FD1D9' }}>Pixel</span>
              </span>
            </motion.button>

            {/* Book Now CTA — Desktop */}
            <motion.button
              className="hidden lg:inline-flex items-center gap-2 relative group cursor-pointer"
              onClick={() => scrollToSection('#inquiry')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, #7A1B1B, #D4AF37)' }}
              />
              <div
                className="relative flex items-center gap-2 text-white font-['Plus_Jakarta_Sans'] font-semibold text-sm py-3 px-6 rounded-xl overflow-hidden shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7A1B1B, #9B2C2C)' }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
                  transition={{ duration: 0.7 }}
                />
                {/* Gold diamond accent */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4AF37" />
                </svg>
                <span>Book Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <BsArrowRight className="text-lg text-[#D4AF37]" />
                </motion.div>
              </div>
            </motion.button>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-10 h-10 backdrop-blur-sm border rounded-xl cursor-pointer z-10 flex-shrink-0 transition-all duration-300"
              style={{
                background: isScrolled ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 243, 227, 0.15)',
                borderColor: isScrolled ? 'rgba(122, 27, 27, 0.12)' : 'rgba(255, 243, 227, 0.3)',
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                    <HiX size={20} style={{ color: isScrolled ? '#7A1B1B' : '#FFF3E3' }} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                    <HiMenuAlt3 size={20} style={{ color: isScrolled ? '#7A1B1B' : '#FFF3E3' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
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
                className="absolute top-full left-0 right-0 border-b overflow-y-auto lg:hidden"
                style={{
                  maxHeight: 'calc(100dvh - 70px)',
                  background: 'rgba(255, 243, 227, 0.98)',
                  borderColor: 'rgba(122, 27, 27, 0.1)',
                  boxShadow: '0 20px 50px rgba(122, 27, 27, 0.1)',
                }}
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Top gradient accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: 'linear-gradient(90deg, #7A1B1B, #D4AF37, #7A1B1B)' }}
                />

                <div className="p-4 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const section = getSectionFromHref(link.href);
                    return (
                      <motion.button
                        key={link.name}
                        className="w-full text-left text-base font-semibold py-3 px-4 rounded-xl transition-all duration-200 font-['Plus_Jakarta_Sans'] cursor-pointer"
                        style={{
                          color: activeSection === section ? '#7A1B1B' : '#2B0F0F',
                          background: activeSection === section ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                        }}
                        onClick={() => scrollToSection(link.href)}
                        variants={mobileItemVariants}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="flex items-center justify-between">
                          {link.name}
                          <BsArrowRight
                            className="transition-opacity duration-200"
                            style={{
                              color: '#7A1B1B',
                              opacity: activeSection === section ? 1 : 0,
                            }}
                          />
                        </span>
                      </motion.button>
                    );
                  })}

                  {/* Aura Pixel Switcher — Mobile */}
                  <motion.div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(122, 27, 27, 0.1)' }} variants={mobileItemVariants}>
                    <button
                      className="w-full flex items-center justify-between py-4 px-6 rounded-xl border font-['Plus_Jakarta_Sans'] font-bold cursor-pointer"
                      style={{
                        background: 'rgba(1, 104, 108, 0.05)',
                        borderColor: 'rgba(1, 104, 108, 0.15)',
                        color: '#01686C',
                      }}
                      onClick={handleBack}
                    >
                      <div className="flex items-center gap-3">
                        <BsArrowLeft className="text-[#01686C]" />
                        <span>
                          <span className="text-slate-700">Switch to Aura</span>
                          <span className="text-[#01686C]">Pixel</span>
                        </span>
                      </div>
                      <BsArrowRight className="text-[#01686C]" />
                    </button>
                  </motion.div>

                  {/* Mobile CTA */}
                  <motion.div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(122, 27, 27, 0.08)' }} variants={mobileItemVariants}>
                    <motion.button
                      className="flex items-center justify-center gap-2 font-semibold py-4 px-6 rounded-xl w-full text-white font-['Plus_Jakarta_Sans'] cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #7A1B1B, #9B2C2C)' }}
                      onClick={() => scrollToSection('#inquiry')}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4AF37" />
                      </svg>
                      <span>Book Now</span>
                    </motion.button>
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

export default WeddingNavbar;
