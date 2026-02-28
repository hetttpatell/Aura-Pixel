import { useState, useEffect } from 'react';

// Custom hook to detect reduced motion preference
// This works across all framer-motion versions
export const useReducedMotion = () => {
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        // Default to false during SSR
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mediaQuery.matches);

        const handler = (e) => setReduceMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return reduceMotion;
};

export default useReducedMotion;
