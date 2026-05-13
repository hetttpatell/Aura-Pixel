import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WeddingShowcase = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const linesRef = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      // Defensive targets
      const t = {
        section: sectionRef.current,
        image: imageRef.current,
        lines: linesRef.current.filter(Boolean),
        stats: statRefs.current.filter(Boolean)
      };

      // Subtle section fade-in
      if (t.section) {
        gsap.fromTo(t.section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: {
              trigger: t.section,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Elegant text line reveals
      if (t.lines.length) {
        t.lines.forEach((line, i) => {
          gsap.from(line, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          });
        });
      }

      // Soft image reveal
      if (t.image) {
        gsap.from(t.image, {
          scale: 0.95,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: t.image,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // Stats counter animation
      if (t.stats.length) {
        t.stats.forEach((stat, i) => {
          const finalValue = parseInt(stat.innerText);
          if (isNaN(finalValue)) return;

          gsap.from(stat, {
            innerText: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              if (stat) stat.innerText = Math.floor(this.targets()[0].innerText);
            },
          });
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const textLines = [
    { text: 'We don\'t just take photos.', style: 'text-neutral-900 text-3xl md:text-5xl font-light tracking-tight' },
    { text: 'We craft royal legacies', style: 'text-stone-600 text-3xl md:text-5xl font-serif italic font-normal' },
    { text: 'that transcend time.', style: 'text-neutral-900 text-3xl md:text-5xl font-light tracking-tight' },
  ];

  const stats = [
    { label: 'Weddings Shot', value: 5, suffix: '+' },
    { label: 'Years Experience', value: 1, suffix: '+' },
    { label: 'Cinema Quality', value: 4, suffix: 'K' },
  ];

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative min-h-screen py-28 px-6 bg-gradient-to-br from-stone-50 via-white to-stone-50"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Side */}
        <div ref={textRef} className="space-y-6 lg:pr-8">
          <span className="inline-block text-stone-400 text-xs tracking-[0.3em] uppercase font-medium">
            Philosophy
          </span>

          <div className="space-y-3">
            {textLines.map((line, i) => (
              <p
                key={i}
                ref={el => linesRef.current[i] = el}
                className={`${line.style} leading-[1.2]`}
              >
                {line.text}
              </p>
            ))}
          </div>

          <p className="text-stone-500 text-base leading-relaxed mt-6 max-w-md font-light">
            Every wedding is a unique story woven from tradition, emotion, and beauty.
            We blend cinematic techniques with an editorial eye to create imagery that
            feels both timeless and vividly alive.
          </p>

          <div className="flex items-center gap-8 mt-10 pt-8 border-t border-stone-200">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-stone-800 text-3xl font-light tracking-wide font-serif">
                  <span ref={el => statRefs.current[i] = el}>{stat.value}</span>{stat.suffix}
                </p>
                <p className="text-stone-400 text-[11px] uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <div className="relative flex justify-end">
          <div className="relative w-full max-w-md">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] w-full overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop"
                alt="Elegant Indian wedding portrait"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 ease-out"
                loading="lazy"
              />
              {/* Subtle light overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-stone-900/10 pointer-events-none" />
            </div>

            {/* Minimal accent lines */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-stone-300/60" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-stone-300/60" />

            {/* Soft shadow effect */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-stone-200/40 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingShowcase;