import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const gearList = [
  'Sony A7 IV', 'Canon R5', 'DJI Ronin 4D', 'Anamorphic Lenses', 'Zeiss Primes',
  'RED Komodo', 'Blackmagic 6K', 'Sigma Art Series', 'DJI Mavic 3 Pro', 'Godox Lighting',
  'Sennheiser MKE', 'Atomos Ninja', 'Profoto B10', 'Tiffen Filters', 'SmallRig Cage',
];

const gearItems = [
  {
    name: 'Cinema Camera',
    desc: 'RED Komodo 6K for buttery cinematic footage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="6" width="16" height="12" rx="2" />
        <path d="M18 10l4-2v8l-4-2" />
        <circle cx="9" cy="12" r="2" />
      </svg>
    ),
  },
  {
    name: 'Prime Lenses',
    desc: 'Zeiss & Sigma Art for razor-sharp portraits',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    name: 'Aerial Systems',
    desc: 'DJI Mavic 3 Pro for sweeping aerial shots',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Lighting Rigs',
    desc: 'Profoto & Godox for dramatic cinematic lighting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

const WeddingTools = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      // Infinite marquee
      if (marqueeRef.current) {
        const marquee = marqueeRef.current;
        const clone = marquee.innerHTML;
        marquee.innerHTML += clone;

        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -totalWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
          }
        });
      }

      // Cards stagger from bottom
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80, opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      style={{ background: '#FFF3E3', overflow: 'hidden' }}
    >
      {/* Header */}
      <div ref={headerRef} className="text-center px-6 mb-16">
        <span className="text-[#D4AF37] font-bold text-xs tracking-[0.4em] uppercase">Equipment</span>
        <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-[#2B0F0F] font-bold mt-4">
          Tools of the <span className="italic text-[#7A1B1B]">Trade</span>
        </h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative py-8 border-y border-[#E8D1B5] mb-20">
        <div ref={marqueeRef} className="flex items-center whitespace-nowrap">
          {gearList.map((gear, i) => (
            <span key={i} className="flex items-center mx-8 text-[#7A1B1B] text-lg md:text-2xl font-['Cormorant_Garamond'] font-bold tracking-wider">
              {gear}
              <span className="ml-8 text-[#D4AF37] text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Gear Cards */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gearItems.map((item, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="group p-8 border border-[#E8D1B5] hover:border-[#7A1B1B]/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer relative rounded-xl"
            style={{ background: 'linear-gradient(135deg, #FAF3E0 0%, #FFF3E3 100%)' }}
          >
            <div className="text-[#7A1B1B] mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl text-[#2B0F0F] mb-2">
              {item.name}
            </h3>
            <p className="text-[#5C3A21] font-medium text-sm font-['Inter'] leading-relaxed">
              {item.desc}
            </p>
            {/* Hover glow */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-[#7A1B1B]/[0.03] transition-colors duration-500 pointer-events-none rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeddingTools;
