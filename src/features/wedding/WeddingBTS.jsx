import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const btsMoments = [
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
    caption: '05:30 AM — Catching the first light before the ceremony.',
  },
  {
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
    caption: 'Final gear check. Backup of everything, always.',
  },
  {
    src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=600&auto=format&fit=crop',
    caption: 'Long lens for those intimate, far-away emotions.',
  },
  {
    src: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?q=80&w=600&auto=format&fit=crop',
    caption: 'Coordinating with the decor team for the perfect angle.',
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop',
    caption: 'Scouting the sunset spot two hours in advance.',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    caption: 'The raw, unfiltered joy after the final wrap.',
  },
];

const WeddingBTS = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="bts"
      className="py-20 md:py-28 bg-[#F7F5F2]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Simple Editorial Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#1C1A18] font-light mb-4">
            Behind the <span className="italic text-[#A67C52]">Seen</span>
          </h2>
          <p className="font-['Inter'] text-[#6A5D4F] text-xs md:text-sm leading-relaxed tracking-wider opacity-70 uppercase font-medium">
            The process, the passion, and the candid reality.
          </p>
        </div>

        {/* Clean Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {btsMoments.map((moment, i) => (
            <div 
              key={i}
              ref={el => itemsRef.current[i] = el}
              className="break-inside-avoid group"
            >
              <div className="relative overflow-hidden bg-[#EAE5DE] mb-3">
                <img 
                  src={moment.src} 
                  alt={moment.caption}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="px-1">
                <p className="font-['Inter'] text-[11px] md:text-xs text-[#9B8E7C] leading-relaxed tracking-widest uppercase font-medium">
                  {moment.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingBTS;



