import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const allTools = [
  {
    name: 'iPhone 15 Pro Max',
    tag: 'CINEMATIC',
    desc: '4K ProRes Log Footage for intimate handheld shots.',
    photo: '/iphone_wedding_pro_1778598461384.png',
    span: 'col-span-2 row-span-2',
  },
  {
    name: 'Sony A7 IV',
    tag: 'HYBRID',
    desc: 'Versatile 10-bit 4:2:2 color depth with Zeiss optics.',
    photo: '/cinema_camera_wedding_1778598501924.png',
    span: 'col-span-2 row-span-1',
  },
  {
    name: 'Mavic 3 Cine',
    tag: 'AERIAL',
    desc: 'Sweeping Hasselblad aerial perspectives for grand venues.',
    photo: '/media__1778598426461.png',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'DJI Mic 2',
    tag: 'AUDIO',
    desc: 'Flawless 32-bit float internal recording for crystal clear vows.',
    photo: '/dji_mic_wedding_1778598481036.png',
    span: 'col-span-1 row-span-1',
  }
];

const WeddingTools = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });

      cardRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-16 pb-8 bg-[#FFFDFB] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#7A1B1B]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#D4AF37]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div ref={headerRef} className="max-w-[1000px] mx-auto px-6 mb-12 text-center relative z-10">
        <span className="text-[#D4AF37] font-bold text-[9px] tracking-[0.4em] uppercase mb-4 block opacity-80">Pro Equipment</span>
        <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-[#2B0F0F] font-extralight leading-none tracking-tight">
          The <span className="italic font-light text-[#7A1B1B]">Arsenal</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[220px]">
          {allTools.map((tool, i) => (
            <div
              key={i}
              ref={el => cardRef.current[i] = el}
              className={`
                group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] 
                bg-[#FAF3E0] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                ${tool.span}
              `}
            >
              {/* Image Background */}
              {tool.photo ? (
                <>
                  <img 
                    src={tool.photo} 
                    alt={tool.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  {/* Subtle default overlay, becomes darker on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                </>
              ) : (
                <div className={`absolute inset-0 ${tool.featured ? 'bg-[#7A1B1B]' : 'bg-[#D4AF37]'} opacity-20 md:opacity-10 md:group-hover:opacity-20 transition-opacity duration-500`} />
              )}

              {/* Content Overlay - Mobile visible, Desktop on hover */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <div className="transform translate-y-0 md:translate-y-8 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-[1px] w-8 bg-[#D4AF37]/60" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37]">
                      {tool.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-4xl text-white font-medium leading-none mb-3">
                    {tool.name}
                  </h3>
                  
                  <p className="text-xs md:text-sm font-['Inter'] text-white/70 leading-relaxed max-w-[280px] line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {/* Minimal Border Glow */}
              <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none group-hover:border-white/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingTools;


