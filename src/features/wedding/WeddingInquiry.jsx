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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    venue: '',
    message: ''
  });

  const [activeField, setActiveField] = useState(null);

  const WHATSAPP_NUMBER = "919409404332"; // Pre-defined WhatsApp number

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      const t = {
        header: headerRef.current,
        inputs: inputsRef.current.filter(Boolean),
        btn: btnRef.current
      };

      if (t.header) {
        gsap.from(t.header, {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: t.header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      if (t.inputs.length) {
        t.inputs.forEach((input, i) => {
          gsap.from(input, {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: input,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          });
        });
      }

      if (t.btn) {
        gsap.from(t.btn, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: t.btn,
            start: 'top 98%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Wedding Inquiry - Aura Pixel*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Venue:* ${formData.venue}%0A%0A` +
      `*Vision:*%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFocus = (name, e) => {
    setActiveField(name);
    const parent = e.target.closest('.input-group');
    if (!parent) return;
    const line = parent.querySelector('.input-line');
    if (line) gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' });
  };

  const handleBlur = (name, e) => {
    setActiveField(null);
    if (e.target.value) return;
    const parent = e.target.closest('.input-group');
    if (!parent) return;
    const line = parent.querySelector('.input-line');
    if (line) gsap.to(line, { scaleX: 0, duration: 0.3 });
  };

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
    { name: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Rahul Sharma' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. rahul@example.com' },
    { name: 'date', label: 'Wedding Date', type: 'text', placeholder: 'e.g. 12th Dec 2024' },
    { name: 'venue', label: 'Venue / Location', type: 'text', placeholder: 'e.g. Udaipur, Rajasthan' },
  ];

  return (
    <section
      ref={sectionRef}
      id="inquiry"
      className="relative flex flex-col min-h-screen pt-24 md:pt-32 overflow-hidden"
      style={{ background: '#FFF3E3' }}
    >
      {/* Decorative Ornaments */}
      <div className="absolute -top-20 -left-20 w-60 md:w-80 h-60 md:h-80 opacity-[0.03] pointer-events-none select-none rotate-12">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#7A1B1B]">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>
      <div className="absolute -bottom-20 -right-20 w-60 md:w-80 h-60 md:h-80 opacity-[0.03] pointer-events-none select-none -rotate-12">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#7A1B1B]">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 px-6 flex-1 flex flex-col justify-center pb-24 md:pb-32">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 mt-8 md:mt-0">
          <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-2 border border-[#7A1B1B]/10 rounded-full mb-6 md:mb-8 bg-white/40 backdrop-blur-sm">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#7A1B1B] animate-pulse" />
            <span className="text-[#7A1B1B] font-bold text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase">Reserve Your Date</span>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#7A1B1B] animate-pulse" />
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl md:text-9xl text-[#2B0F0F] font-bold leading-[0.9]">
            Let&apos;s Create <br />
            <span className="italic text-[#7A1B1B] font-medium serif">Magic</span>
          </h2>
          <p className="text-[#5C3A21] font-medium text-base md:text-lg mt-8 md:mt-10 max-w-xl mx-auto leading-relaxed opacity-70 px-4">
            Every love story is unique. Share your vision with us and let&apos;s craft a cinematic memory that lasts forever.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative group/form w-full max-w-3xl mx-auto">
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#7A1B1B]/5 to-transparent rounded-[2rem] md:rounded-[3rem] blur-xl md:blur-2xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="relative bg-white/40 backdrop-blur-md p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/60 shadow-[0_30px_100px_-20px_rgba(43,15,15,0.1)]">
            <form ref={formRef} className="space-y-10 md:space-y-12" onSubmit={handleSubmit}>
              {/* Grid for main fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12">
                {fields.map((field, i) => (
                  <div
                    key={field.name}
                    ref={el => inputsRef.current[i] = el}
                    className="input-group relative"
                  >
                    <label
                      className={`absolute left-0 transition-all duration-500 pointer-events-none font-['Inter'] tracking-wider uppercase
                        ${(formData[field.name] || activeField === field.name)
                          ? '-translate-y-6 md:-translate-y-7 text-[9px] md:text-[10px] font-bold text-[#7A1B1B] opacity-100'
                          : 'translate-y-2 md:translate-y-3 text-xs md:text-sm font-medium text-[#5C3A21] opacity-50'
                        }`}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={(e) => handleFocus(field.name, e)}
                      onBlur={(e) => handleBlur(field.name, e)}
                      placeholder={activeField === field.name ? field.placeholder : ''}
                      className="w-full bg-transparent border-b border-[#7A1B1B]/10 text-[#2B0F0F] font-semibold text-base md:text-lg py-2 md:py-3 px-0 focus:outline-none focus:border-[#7A1B1B]/40 transition-all placeholder:text-[#2B0F0F]/20 font-['Inter']"
                      autoComplete="off"
                      required
                    />
                    <div
                      className="input-line absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7A1B1B]"
                      style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                    />
                  </div>
                ))}
              </div>

              {/* Message field - Full Width */}
              <div
                ref={el => inputsRef.current[fields.length] = el}
                className="input-group relative mt-10"
              >
                <label
                  className={`absolute left-0 transition-all duration-500 pointer-events-none font-['Inter'] tracking-wider uppercase
                    ${(formData.message || activeField === 'message')
                      ? '-translate-y-6 md:-translate-y-7 text-[9px] md:text-[10px] font-bold text-[#7A1B1B] opacity-100'
                      : 'translate-y-2 md:translate-y-3 text-xs md:text-sm font-medium text-[#5C3A21] opacity-50'
                    }`}
                >
                  Tell Us Your Vision
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={(e) => handleFocus('message', e)}
                  onBlur={(e) => handleBlur('message', e)}
                  placeholder={activeField === 'message' ? "Share your thoughts, themes, or special requests..." : ''}
                  className="w-full bg-transparent border-b border-[#7A1B1B]/10 text-[#2B0F0F] font-semibold text-base md:text-lg py-2 md:py-3 px-0 focus:outline-none focus:border-[#7A1B1B]/40 transition-all resize-none placeholder:text-[#2B0F0F]/20 font-['Inter']"
                  required
                />
                <div
                  className="input-line absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7A1B1B]"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
              </div>

              {/* Submit Section */}
              <div ref={btnRef} className="pt-6 md:pt-10">
                <button
                  type="submit"
                  className="group relative w-full py-5 md:py-7 bg-[#7A1B1B] text-[#FFF3E3] text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold hover:bg-[#2B0F0F] transition-all duration-700 flex items-center justify-center gap-4 md:gap-5 cursor-pointer rounded-2xl shadow-[0_20px_40px_-10px_rgba(122,27,27,0.25)] md:shadow-[0_20px_60px_-10px_rgba(122,27,27,0.3)] active:scale-[0.98] overflow-hidden"
                >
                  <span className="relative z-10">Send via WhatsApp</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="relative z-10 transition-transform duration-700 group-hover:translate-x-3 md:group-hover:translate-x-4 w-4 h-4 md:w-[18px] md:h-[18px]">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  {/* Glass Shine */}
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000 ease-in-out" />
                </button>
                <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                  <div className="h-px w-6 md:w-8 bg-[#7A1B1B]/10" />
                  <p className="text-[#5C3A21]/50 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-center">
                    Typically responds within 24 hours
                  </p>
                  <div className="h-px w-6 md:w-8 bg-[#7A1B1B]/10" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <div
        className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[200] transition-all duration-1000 ${showBackToTop ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-20 rotate-45 pointer-events-none'
          }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={backToTopRef}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#7A1B1B]/10 bg-white/90 backdrop-blur-xl flex items-center justify-center text-[#7A1B1B] hover:bg-[#7A1B1B] hover:text-[#FFF3E3] transition-all duration-700 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] group relative overflow-hidden"
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-y-1.5 md:group-hover:-translate-y-2 transition-transform duration-500 relative z-10 w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#7A1B1B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </button>
      </div>

      {/* Modern Minimal Footer */}
      <div className="w-full px-6 md:px-10 py-10 md:py-16 relative z-10 border-t border-[#7A1B1B]/10 bg-[#FFF3E3]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="text-center md:text-left space-y-3">
            <span className="block text-[#7A1B1B] font-bold text-3xl md:text-4xl tracking-tighter font-['Cormorant_Garamond']">Wedding Pixel.</span>
            <p className="text-[#5C3A21]/50 font-bold text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em]">
              © {new Date().getFullYear()} Aura Pixel Studio. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Instagram', 'Facebook'].map(social => (
              <a key={social} href="#" className="relative group text-[#2B0F0F] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#7A1B1B]">
                {social}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#7A1B1B] rounded-full transition-all duration-500 group-hover:w-1 group-hover:opacity-100 opacity-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingInquiry;

