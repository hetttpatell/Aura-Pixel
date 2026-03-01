import { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage Component
 * Handles lazy loading, placeholder states, and accessibility
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Descriptive alt text for accessibility and SEO
 * @param {string} className - Additional CSS classes
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} loading - Loading strategy ('lazy' | 'eager')
 * @param {string} decoding - Decoding strategy ('async' | 'sync' | 'auto')
 * @param {string} sizes - Responsive image sizes attribute
 * @param {string} srcSet - Responsive image srcset attribute
 * @param {boolean} priority - Whether to prioritize loading this image
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    decoding = 'async',
    sizes,
    srcSet,
    priority = false,
    placeholderColor = '#e6f2f2',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        // If priority or eager loading, don't use intersection observer
        if (priority || loading === 'eager') {
            setIsInView(true);
            return;
        }

        // Use Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsInView(true);
                            observerRef.current?.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '50px 0px', // Start loading 50px before it enters viewport
                    threshold: 0.01,
                }
            );

            if (imgRef.current) {
                observerRef.current.observe(imgRef.current);
            }
        } else {
            // Fallback for browsers without IntersectionObserver
            setIsInView(true);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [priority, loading]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    // Determine actual loading strategy
    const actualLoading = priority ? 'eager' : loading;

    // Generate srcSet if not provided but width is available
    const actualSrcSet = srcSet || (width ? generateSrcSet(src, width) : undefined);

    return (
        <div
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{
                backgroundColor: placeholderColor,
                aspectRatio: width && height ? `${width}/${height}` : undefined,
            }}
        >
            {/* Placeholder / Skeleton */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                    style={{
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Error state */}
            {hasError && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400"
                    role="img"
                    aria-label={`Failed to load image: ${alt}`}
                >
                    <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            )}

            {/* Actual image */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={actualLoading}
                    decoding={decoding}
                    sizes={sizes}
                    srcSet={actualSrcSet}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
                    {...props}
                />
            )}
        </div>
    );
};

/**
 * Generate srcSet for responsive images
 * @param {string} src - Base image URL
 * @param {number} originalWidth - Original image width
 * @returns {string} - SrcSet string
 */
function generateSrcSet(src, originalWidth) {
    // Common responsive widths
    const widths = [320, 640, 960, 1280, 1920];

    // Filter widths that are smaller than original
    const validWidths = widths.filter(w => w <= originalWidth);

    // If no valid widths, return undefined
    if (validWidths.length === 0) return undefined;

    // Generate srcSet entries
    // Note: This assumes the server supports width parameters
    // Adjust the URL pattern based on your image CDN or server configuration
    return validWidths
        .map(w => {
            // Check if URL already has query parameters
            const separator = src.includes('?') ? '&' : '?';
            return `${src}${separator}w=${w} ${w}w`;
        })
        .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * @param {object} breakpoints - Breakpoint width mapping
 * @returns {string} - Sizes attribute string
 */
export function generateSizes(breakpoints = {}) {
    const defaultBreakpoints = {
        sm: '100vw',    // Mobile: full width
        md: '50vw',     // Tablet: half width
        lg: '33vw',     // Desktop: third width
        xl: '25vw',     // Large desktop: quarter width
    };

    const bp = { ...defaultBreakpoints, ...breakpoints };

    return `
    (max-width: 640px) ${bp.sm},
    (max-width: 768px) ${bp.md},
    (max-width: 1024px) ${bp.lg},
    ${bp.xl}
  `.trim();
}

export default OptimizedImage;
