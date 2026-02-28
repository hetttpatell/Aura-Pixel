import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const companies = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: 'AuraPixel',
    logo: '/AURA-PIXEL.PNG'
}));

const ScrollingCompany = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRef = useRef(null);
    const isMobile = useReducedMotion();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Start the scrolling animation after a short delay for entrance effect
                    setTimeout(() => setIsScrolling(true), 500);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const logoItems = companies.map((company, index) => (
        <div
            key={company.id}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 h-16 sm:h-20 md:h-24 rounded-2xl border bg-white flex items-center justify-center mx-3 sm:mx-5 md:mx-6 px-4 sm:px-5 hover:bg-gray-50 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer"
            style={{
                borderColor: '#0f3b44',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
                transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                transitionProperty: 'all',
                transitionDuration: '0.6s',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: isVisible ? '0 4px 15px rgba(0,0,0,0.08)' : 'none'
            }}
        >
            <img
                src={company.logo}
                alt={company.name}
                className="w-14 h-14 object-contain"
                loading="lazy"
            />
        </div>
    ));

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-gradient-to-b from-bg-soft via-white to-bg-soft relative overflow-hidden"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {/* Background Decorative Elements - Matching Portfolio.jsx */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-[#007C7C]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header - Exactly matching Portfolio.jsx structure */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#007C7C]/10 text-[#007C7C] font-heading font-semibold text-sm rounded-full mb-6 border border-[#007C7C]/20"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                            transitionProperty: 'all',
                            transitionDuration: '0.4s',
                            transitionDelay: '100ms'
                        }}
                    >
                        <span className="w-2 h-2 bg-[#007C7C] rounded-full animate-pulse" />
                        Our Partners
                    </div>

                    <h2
                        className="mb-6 text-4xl md:text-5xl font-heading font-bold"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transitionProperty: 'all',
                            transitionDuration: '0.6s',
                            transitionDelay: '200ms'
                        }}
                    >
                        Trusted by <span className="text-gradient bg-gradient-to-r from-[#007C7C] via-cyan-500 to-[#007C7C] bg-clip-text text-transparent">Leading</span> Brands
                    </h2>

                    <p
                        className="max-w-2xl mx-auto text-text-body text-lg leading-relaxed"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transitionProperty: 'all',
                            transitionDuration: '0.8s',
                            transitionDelay: '300ms'
                        }}
                    >
                        We collaborate with visionary companies to deliver exceptional digital
                        experiences that drive growth and innovation worldwide.
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Gradient overlays for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#FBFDFD] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#FBFDFD] to-transparent pointer-events-none" />

                <div className="flex overflow-hidden py-4">
                    <div
                        className={`flex items-center ${isScrolling ? 'animate-scroll' : ''}`}
                        style={{
                            opacity: isScrolling ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                        }}
                    >
                        {logoItems}
                    </div>
                    <div
                        className={`flex items-center ${isScrolling ? 'animate-scroll' : ''}`}
                        aria-hidden="true"
                        style={{
                            opacity: isScrolling ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                        }}
                    >
                        {logoItems}
                    </div>
                    <div
                        className={`flex items-center ${isScrolling ? 'animate-scroll' : ''}`}
                        aria-hidden="true"
                        style={{
                            opacity: isScrolling ? 1 : 0,
                            transition: 'opacity 0.5s ease'
                        }}
                    >
                        {logoItems}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { 
                        transform: translateX(0); 
                    }
                    100% { 
                        transform: translateX(-33.33%); 
                    }
                }
                .animate-scroll {
                    animation: scroll 15s linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </section>
    );
};

export default ScrollingCompany;
