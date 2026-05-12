import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const btsImages = [
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop',
    alt: 'Photographer in action',
    rotation: -3,
    speed: 0.5,
  },
  {
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop',
    alt: 'Camera setup',
    rotation: 4,
    speed: -0.3,
  },
  {
    src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=600&auto=format&fit=crop',
    alt: 'Editing process',
    rotation: -2,
    speed: 0.7,
  },
  {
    src: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?q=80&w=600&auto=format&fit=crop',
    alt: 'Team at work',
    rotation: 5,
    speed: -0.5,
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop',
    alt: 'On location',
    rotation: -4,
    speed: 0.4,
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    alt: 'Wedding details',
    rotation: 2,
    speed: -0.6,
  },
];

const WeddingBTS = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      // Multi-speed parallax & blur-to-focus on images
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const speed = btsImages[i]?.speed || 0.5;

        // Parallax at different speeds
        gsap.to(img, {
          y: speed * 150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });

        // Blur-to-focus + fade in
        gsap.fromTo(img,
          { filter: 'blur(8px)', opacity: 0, y: 40, scale: 0.95 },
          {
            filter: 'blur(0px)', opacity: 1, y: 0, scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
               trigger: img,
               start: 'top 90%',
               toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Asymmetric grid positions
  const positions = [
    'col-start-1 col-end-3 row-start-1 row-end-3',
    'col-start-3 col-end-5 row-start-1 row-end-2 mt-12',
    'col-start-5 col-end-7 row-start-1 row-end-3 mt-6',
    'col-start-1 col-end-3 row-start-3 row-end-4 -mt-8',
    'col-start-3 col-end-5 row-start-2 row-end-4 mt-4',
    'col-start-5 col-end-7 row-start-3 row-end-4 -mt-12',
  ];

  return (
    <section
      ref={sectionRef}
      id="bts"
      className="relative py-32 px-6"
      style={{ background: '#FFF3E3', overflow: 'visible' }}
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-[1440px] mx-auto mb-20 text-center">
        <span className="text-[#D4AF37] font-bold text-xs tracking-[0.4em] uppercase">The Process</span>
        <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-[#2B0F0F] font-bold mt-4">
          Behind the <span className="italic text-[#7A1B1B]">Scenes</span>
        </h2>
        <p className="text-[#5C3A21] font-medium text-base mt-6 max-w-md mx-auto">
          A glimpse into the artistry and dedication behind every shoot
        </p>
      </div>

      {/* Asymmetric Collage - Desktop */}
      <div className="hidden md:grid max-w-[1200px] mx-auto grid-cols-6 grid-rows-3 gap-4">
        {btsImages.map((img, i) => (
          <div
            key={i}
            ref={el => imagesRef.current[i] = el}
            className={`${positions[i]} relative group cursor-pointer`}
            style={{
              transform: `rotate(${img.rotation}deg)`,
              willChange: 'transform, filter',
            }}
          >
            {/* Polaroid frame */}
            <div className="bg-[#FAF3E0] p-2 pb-10 shadow-xl group-hover:shadow-[0_20px_60px_rgba(122,27,27,0.25)] transition-shadow duration-500 border border-[#E8D1B5]">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#7A1B1B]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <p className="text-[#5C3A21] font-semibold text-[10px] tracking-widest uppercase mt-3 text-center font-['Inter']">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {btsImages.slice(0, 4).map((img, i) => (
          <div
            key={i}
            ref={el => { if (!imagesRef.current[i]) imagesRef.current[i] = el; }}
            className="relative"
            style={{ transform: `rotate(${img.rotation * 0.5}deg)` }}
          >
            <div className="bg-[#FAF3E0] p-1.5 pb-8 border border-[#E8D1B5] shadow-md">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <p className="text-[#5C3A21] font-semibold text-[9px] tracking-widest uppercase mt-2 text-center">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeddingBTS;
