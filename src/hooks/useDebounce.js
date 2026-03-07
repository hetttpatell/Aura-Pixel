import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 */
export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Debounce a callback function
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
export const useDebouncedCallback = (callback, delay = 300) => {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
};

/**
 * Throttle a callback function
 * @param {Function} callback - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 */
export const useThrottle = (callback, limit = 100) => {
    const lastRunRef = useRef(Date.now());
    const timeoutRef = useRef(null);

    const throttledCallback = useCallback((...args) => {
        const now = Date.now();

        if (now - lastRunRef.current >= limit) {
            lastRunRef.current = now;
            callback(...args);
        } else {
            // Schedule a trailing call
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                lastRunRef.current = Date.now();
                callback(...args);
            }, limit - (now - lastRunRef.current));
        }
    }, [callback, limit]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return throttledCallback;
};

export default useDebounce;
