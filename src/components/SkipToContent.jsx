import { useState, useEffect } from 'react';

/**
 * SkipToContent Component
 * Provides accessibility feature for keyboard users to skip navigation
 * and jump directly to main content
 */
const SkipToContent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Show skip link when Tab is pressed
            if (e.key === 'Tab') {
                setIsVisible(true);
            }
        };

        const handleClick = () => {
            setIsVisible(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleSkip = (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
            // Set tabindex temporarily to allow focusing
            if (!mainContent.hasAttribute('tabindex')) {
                mainContent.setAttribute('tabindex', '-1');
            }
        }
        setIsVisible(false);
    };

    return (
        <a
            href="#main-content"
            onClick={handleSkip}
            className={`
        fixed top-4 left-4 z-[9999]
        px-6 py-3
        bg-primary-teal text-white
        font-semibold text-sm
        rounded-lg shadow-lg
        transform transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-primary-teal/50
        ${isVisible
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : '-translate-y-full opacity-0 pointer-events-none'
                }
      `}
            style={{
                // Ensure it's always visible to screen readers
                clipPath: isVisible ? 'none' : 'inset(50%)',
                height: isVisible ? 'auto' : '1px',
                width: isVisible ? 'auto' : '1px',
                overflow: isVisible ? 'visible' : 'hidden',
            }}
        >
            Skip to main content
        </a>
    );
};

export default SkipToContent;
