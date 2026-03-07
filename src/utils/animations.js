/**
 * Optimized Animation Utilities for Framer Motion
 * 
 * These variants and configurations are designed for smooth 60fps animations
 * using GPU-accelerated properties (transform, opacity) only.
 */

// Optimized spring config for smoother animations
export const smoothSpring = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.5,
};

// Fast spring for quick interactions
export const fastSpring = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 0.3,
};

// Gentle spring for subtle animations
export const gentleSpring = {
    type: 'spring',
    stiffness: 80,
    damping: 18,
    mass: 0.8,
};

// Optimized easing curves
export const easings = {
    smooth: [0.4, 0, 0.2, 1],
    smoothOut: [0, 0, 0.2, 1],
    smoothIn: [0.4, 0, 1, 1],
    spring: [0.34, 1.56, 0.64, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
};

// Optimized fade variants
export const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: easings.smooth },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: easings.smoothIn },
    },
};

// Optimized fade up variants (GPU-accelerated)
export const fadeUpVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easings.smooth },
    },
};

// Optimized scale variants
export const scaleVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothSpring,
    },
};

// Optimized slide variants
export const slideLeftVariants = {
    hidden: {
        opacity: 0,
        x: -30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: easings.smooth },
    },
};

export const slideRightVariants = {
    hidden: {
        opacity: 0,
        x: 30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: easings.smooth },
    },
};

// Stagger container variants (for parent elements)
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Stagger item variants (for children)
export const staggerItem = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easings.smooth },
    },
};

// Optimized hover animations (use sparingly)
export const hoverScale = {
    scale: 1.02,
    transition: fastSpring,
};

export const hoverLift = {
    y: -4,
    transition: fastSpring,
};

export const tapScale = {
    scale: 0.98,
};

// Optimized viewport settings for animations
export const viewportOnce = {
    once: true,
    amount: 0.2,
    margin: '50px',
};

export const viewportReplay = {
    once: false,
    amount: 0.3,
};

// Reduced motion variants (for accessibility)
export const getReducedMotionVariants = (shouldReduce) => ({
    hidden: shouldReduce ? {} : { opacity: 0 },
    visible: shouldReduce ? {} : { opacity: 1 },
});

// Float animation config (optimized for continuous animation)
export const floatAnimation = {
    y: [0, -8, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

// Optimized parallax config
export const parallaxConfig = {
    damping: 25,
    stiffness: 80,
    mass: 0.5,
};

// Card hover animation
export const cardHover = {
    y: -6,
    scale: 1.01,
    transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
    },
};

// Button animations
export const buttonVariants = {
    idle: { scale: 1 },
    hover: {
        scale: 1.03,
        transition: fastSpring,
    },
    tap: {
        scale: 0.97,
        transition: { duration: 0.1 },
    },
};

// Menu animations
export const menuVariants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2, ease: easings.smoothIn },
    },
    open: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.25,
            ease: easings.smooth,
            staggerChildren: 0.03,
            delayChildren: 0.05,
        },
    },
};

export const menuItemVariants = {
    closed: { x: -10, opacity: 0 },
    open: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.2, ease: easings.smooth },
    },
};

// Icon spin animation
export const spinAnimation = {
    rotate: 360,
    transition: {
        duration: 0.6,
        ease: 'linear',
    },
};

// Pulse animation for loading states
export const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

/**
 * Creates optimized animation props for a component
 * @param {string} type - Animation type: 'fadeUp', 'fadeIn', 'scale', 'slideLeft', 'slideRight'
 * @param {number} delay - Animation delay in seconds
 * @param {boolean} shouldReduce - Whether to reduce motion
 */
export const createAnimationProps = (type = 'fadeUp', delay = 0, shouldReduce = false) => {
    if (shouldReduce) {
        return { initial: {}, animate: {} };
    }

    const variants = {
        fadeUp: fadeUpVariants,
        fadeIn: fadeVariants,
        scale: scaleVariants,
        slideLeft: slideLeftVariants,
        slideRight: slideRightVariants,
    };

    const selected = variants[type] || fadeUpVariants;

    return {
        initial: 'hidden',
        animate: 'visible',
        variants: {
            ...selected,
            visible: {
                ...selected.visible,
                transition: {
                    ...selected.visible.transition,
                    delay,
                },
            },
        },
    };
};
