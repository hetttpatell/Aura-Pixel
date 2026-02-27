import { useEffect, useRef, useState } from 'react';

const ScrollingCompany = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Start the scrolling animation after a short delay for entrance effect
                    setTimeout(() => setIsScrolling(true), 500);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const companies = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        name: 'AuraPixel',
        logo: '/AURA-PIXEL.PNG'
    }));

    const logoItems = companies.map((company, index) => (
        <div
            key={company.id}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 h-16 sm:h-20 md:h-24 rounded-2xl border bg-white flex items-center justify-center mx-3 sm:mx-5 md:mx-6 px-4 sm:px-5 hover:bg-gray-50 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer"
            style={{
                borderColor: '#0f3b44',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
                transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
            className="py-20 overflow-hidden"
            style={{
                backgroundColor: '#FBFDFD',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            <div className="container mx-auto px-4 mb-16">
                <div
                    className="text-center"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '100ms'
                    }}
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ color: '#0f3b44' }}
                    >
                        Our Partners
                    </h2>
                    <p
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        style={{ color: '#5a6b7a' }}
                    >
                        Trusted by leading brands worldwide
                    </p>
                    <div
                        className="w-24 h-1 mx-auto mt-6 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #0f3b44, #1a6b7c, #0f3b44)',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '400ms'
                        }}
                    />
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
                section:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default ScrollingCompany;
