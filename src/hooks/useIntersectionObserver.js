import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for performant intersection observer
 * Uses a shared observer instance for better performance
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.triggerOnce - Whether to unobserve after first intersection
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 */
export const useIntersectionObserver = ({
    triggerOnce = true,
    threshold = 0.1,
    rootMargin = '50px 0px',
} = {}) => {
    const [isInView, setIsInView] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const ref = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || (triggerOnce && hasTriggered)) return;

        // Check for native support
        if (!('IntersectionObserver' in window)) {
            setIsInView(true);
            setHasTriggered(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        setHasTriggered(true);
                        if (triggerOnce && observerRef.current) {
                            observerRef.current.unobserve(entry.target);
                        }
                    } else if (!triggerOnce) {
                        setIsInView(false);
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [threshold, rootMargin, triggerOnce, hasTriggered]);

    return { ref, isInView, hasTriggered };
};

export default useIntersectionObserver;
