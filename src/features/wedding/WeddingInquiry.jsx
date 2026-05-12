import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WeddingInquiry = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headerRef = useRef(null);
  const inputsRef = useRef([]);
  const btnRef = useRef(null);
  const backToTopRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      inputsRef.current.forEach((input, i) => {
        if (!input) return;
        gsap.from(input, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: input,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.12,
        });
      });

      if (btnRef.current) {
        gsap.from(btnRef.current, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Focus animation for inputs
  const handleFocus = (e) => {
    const parent = e.target.closest('.input-group');
    if (!parent) return;
    const line = parent.querySelector('.input-line');
    const label = parent.querySelector('.input-label');
    if (line) gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' });
    if (label) gsap.to(label, { y: -24, scale: 0.85, color: '#7A1B1B', duration: 0.3 });
  };

  const handleBlur = (e) => {
    if (e.target.value) return;
    const parent = e.target.closest('.input-group');
    if (!parent) return;
    const line = parent.querySelector('.input-line');
    const label = parent.querySelector('.input-label');
    if (line) gsap.to(line, { scaleX: 0, duration: 0.3 });
    if (label) gsap.to(label, { y: 0, scale: 1, color: '#5C3A21', duration: 0.3 });
  };

  // Magnetic button effect
  const handleMouseMove = (e) => {
    if (!backToTopRef.current) return;
    const { left, top, width, height } = backToTopRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    gsap.to(backToTopRef.current, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!backToTopRef.current) return;
    gsap.to(backToTopRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  const fields = [
    { name: 'name', label: 'Your Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'date', label: 'Wedding Date', type: 'text' },
    { name: 'venue', label: 'Venue / Location', type: 'text' },
  ];

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative min-h-screen flex items-center py-32 px-6"
      style={{ background: '#FFF3E3' }}
    >
      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-[#D4AF37] font-bold text-xs tracking-[0.4em] uppercase">Get in Touch</span>
          <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-[#2B0F0F] font-bold mt-4">
            Let&apos;s Create <span className="italic text-[#7A1B1B]">Magic</span>
          </h2>
          <p className="text-[#5C3A21] font-medium text-base mt-6 max-w-md mx-auto">
            Tell us about your special day and we&apos;ll craft a custom proposal
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} className="space-y-12" onSubmit={e => e.preventDefault()}>
          {fields.map((field, i) => (
            <div
              key={field.name}
              ref={el => inputsRef.current[i] = el}
              className="input-group relative"
            >
              <label className="input-label absolute top-3 left-0 text-[#5C3A21] font-medium text-sm tracking-wider uppercase pointer-events-none transition-all origin-left font-['Inter']">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent border-b border-[#E8D1B5] text-[#2B0F0F] font-semibold text-lg py-3 px-0 focus:outline-none font-['Inter']"
                autoComplete="off"
              />
              {/* Active line */}
              <div
                className="input-line absolute bottom-0 left-0 w-full h-[2px] bg-[#7A1B1B]"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
              />
            </div>
          ))}

          {/* Message field */}
          <div
            ref={el => inputsRef.current[fields.length] = el}
            className="input-group relative"
          >
            <label className="input-label absolute top-3 left-0 text-[#5C3A21] font-medium text-sm tracking-wider uppercase pointer-events-none transition-all origin-left font-['Inter']">
              Tell Us Your Vision
            </label>
            <textarea
              name="message"
              rows="3"
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full bg-transparent border-b border-[#E8D1B5] text-[#2B0F0F] font-semibold text-lg py-3 px-0 focus:outline-none resize-none font-['Inter']"
            />
            <div
              className="input-line absolute bottom-0 left-0 w-full h-[2px] bg-[#7A1B1B]"
              style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
            />
          </div>

          {/* Submit */}
          <div ref={btnRef} className="pt-4">
            <button
              type="submit"
              className="group w-full py-5 bg-[#7A1B1B] text-[#FFF3E3] text-sm uppercase tracking-[0.3em] font-semibold hover:bg-[#2B0F0F] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer rounded-xl shadow-lg"
            >
              Send Inquiry
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Back to Top - Magnetic Button */}
      <div
        className={`fixed bottom-8 right-8 z-[200] transition-all duration-500 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={backToTopRef}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 rounded-full border border-[#7A1B1B]/30 bg-[#FFF3E3]/90 backdrop-blur-md flex items-center justify-center text-[#7A1B1B] hover:bg-[#7A1B1B] hover:text-[#FFF3E3] transition-colors duration-300 cursor-pointer shadow-lg"
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Footer line */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#E8D1B5] py-8 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#5C3A21] font-medium text-xs tracking-wider">
            © {new Date().getFullYear()} Wedding Pixel — A Sub-Brand of Aura Pixel
          </span>
          <div className="flex items-center gap-6">
            {['Instagram', 'YouTube', 'Pinterest'].map(social => (
              <a key={social} href="#" className="text-[#7A1B1B] font-semibold text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors duration-300">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingInquiry;
