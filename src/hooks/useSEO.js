import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Configuration Object
 * Define meta tags for each route
 */
export const seoConfig = {
    home: {
        title: 'Aura Pixel | Premium Digital Marketing Agency | SEO & Performance Marketing',
        description: 'Transform your business with Aura Pixel\'s intelligent digital marketing strategies. Expert SEO, performance marketing, social media & branding that turns traffic into revenue. Get your free growth blueprint today!',
        keywords: 'digital marketing agency, SEO services, performance marketing, social media marketing, branding agency, web development, conversion optimization, Google Ads, Meta Ads, PPC management, content marketing, marketing automation',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/',
    },
    about: {
        title: 'About Us | Aura Pixel Digital Marketing Agency',
        description: 'Learn about Aura Pixel, a premium digital marketing agency dedicated to transforming businesses through innovative SEO, performance marketing, and branding strategies.',
        keywords: 'about aura pixel, digital marketing team, marketing experts, agency story, marketing professionals',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/about',
    },
    services: {
        title: 'Our Services | SEO, Social Media & Performance Marketing | Aura Pixel',
        description: 'Explore our comprehensive digital marketing services: SEO, social media marketing, performance marketing, branding, web development, and conversion optimization.',
        keywords: 'digital marketing services, SEO agency, social media management, performance marketing, branding services, web development, conversion rate optimization, PPC management',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services',
    },
    blog: {
        title: 'Marketing Blog | Digital Marketing Insights & Tips | Aura Pixel',
        description: 'Stay ahead with the latest digital marketing trends, SEO tips, social media strategies, and industry insights from the experts at Aura Pixel.',
        keywords: 'digital marketing blog, SEO tips, social media strategy, marketing trends, content marketing tips, marketing insights',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/blog',
    },
    serviceSeo: {
        title: 'SEO Services | Search Engine Optimization | Aura Pixel',
        description: 'Dominate search rankings with our expert SEO services. Technical SEO, on-page optimization, link building, and local SEO strategies that drive organic traffic.',
        keywords: 'SEO services, search engine optimization, technical SEO, on-page SEO, link building, local SEO, organic traffic, SEO agency',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/seo',
    },
    serviceSocialMedia: {
        title: 'Social Media Marketing | SMM Services | Aura Pixel',
        description: 'Build your brand presence with our social media marketing services. Strategy, content creation, community management, and paid social campaigns.',
        keywords: 'social media marketing, SMM services, social media management, Instagram marketing, Facebook marketing, LinkedIn marketing, social media strategy',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/social-media',
    },
    servicePerformance: {
        title: 'Performance Marketing | PPC & Paid Ads | Aura Pixel',
        description: 'Maximize ROI with our performance marketing services. Google Ads, Meta Ads, programmatic advertising, and conversion-focused campaigns.',
        keywords: 'performance marketing, PPC advertising, Google Ads management, Meta Ads, paid advertising, programmatic marketing, ROAS optimization',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/performance-marketing',
    },
    serviceBranding: {
        title: 'Branding Services | Brand Strategy & Identity | Aura Pixel',
        description: 'Create a memorable brand with our branding services. Brand strategy, visual identity, brand guidelines, and brand positioning.',
        keywords: 'branding services, brand strategy, brand identity, logo design, brand guidelines, brand positioning, visual identity',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/branding',
    },
    serviceWebDev: {
        title: 'Web Development | Custom Websites & Apps | Aura Pixel',
        description: 'Build high-performing websites with our web development services. Custom websites, e-commerce, web applications, and CMS solutions.',
        keywords: 'web development, custom websites, e-commerce development, web applications, CMS development, responsive design, website development agency',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/web-development',
    },
    serviceConversion: {
        title: 'CRO Services | Conversion Rate Optimization | Aura Pixel',
        description: 'Turn more visitors into customers with our conversion rate optimization services. A/B testing, UX optimization, and landing page design.',
        keywords: 'conversion rate optimization, CRO services, A/B testing, landing page optimization, UX optimization, conversion funnel, CRO agency',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/conversion-optimization',
    },
    serviceAutomation: {
        title: 'Marketing Automation | Workflow Automation | Aura Pixel',
        description: 'Scale your marketing with automation. Email automation, lead nurturing, CRM integration, and marketing workflow optimization.',
        keywords: 'marketing automation, email automation, lead nurturing, CRM integration, marketing workflows, automation tools, drip campaigns',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/marketing-automation',
    },
    serviceGoogleAds: {
        title: 'Google Ads Management | PPC Services | Aura Pixel',
        description: 'Drive qualified traffic with our Google Ads management services. Search ads, display ads, shopping ads, and remarketing campaigns.',
        keywords: 'Google Ads management, PPC services, Google search ads, Google display ads, shopping ads, remarketing, Google Ads agency',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/google-ads',
    },
    serviceMetaAds: {
        title: 'Meta Ads Management | Facebook & Instagram Ads | Aura Pixel',
        description: 'Reach your audience on social with our Meta Ads management. Facebook ads, Instagram ads, Messenger ads, and audience targeting.',
        keywords: 'Meta Ads management, Facebook ads, Instagram ads, Messenger ads, social media advertising, Meta advertising, Facebook ad agency',
        ogImage: 'https://aurapixel.com/AURA-PIXEL.PNG',
        canonical: 'https://aurapixel.com/services/meta-ads',
    },
};

/**
 * Custom hook for updating SEO meta tags
 * @param {string} pageKey - Key from seoConfig object
 * @param {object} customData - Optional custom data to override defaults
 */
export const useSEO = (pageKey, customData = {}) => {
    const location = useLocation();

    useEffect(() => {
        const config = seoConfig[pageKey] || seoConfig.home;
        const data = { ...config, ...customData };

        // Update document title
        document.title = data.title;

        // Helper function to update or create meta tag
        const updateMetaTag = (name, content, property = false) => {
            if (!content) return;

            const selector = property
                ? `meta[property="${name}"]`
                : `meta[name="${name}"]`;

            let metaTag = document.querySelector(selector);

            if (!metaTag) {
                metaTag = document.createElement('meta');
                if (property) {
                    metaTag.setAttribute('property', name);
                } else {
                    metaTag.setAttribute('name', name);
                }
                document.head.appendChild(metaTag);
            }

            metaTag.setAttribute('content', content);
        };

        // Update meta tags
        updateMetaTag('title', data.title);
        updateMetaTag('description', data.description);
        updateMetaTag('keywords', data.keywords);

        // Update Open Graph tags
        updateMetaTag('og:title', data.title, true);
        updateMetaTag('og:description', data.description, true);
        updateMetaTag('og:image', data.ogImage, true);
        updateMetaTag('og:url', data.canonical || window.location.href, true);
        updateMetaTag('og:type', 'website', true);

        // Update Twitter tags
        updateMetaTag('twitter:title', data.title);
        updateMetaTag('twitter:description', data.description);
        updateMetaTag('twitter:image', data.ogImage);

        // Update canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', data.canonical || window.location.href);

        // Update robots meta
        updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // Cleanup function
        return () => {
            // Meta tags are preserved for SEO - no cleanup needed
        };
    }, [pageKey, customData, location]);
};

/**
 * Generate structured data for services
 * @param {object} service - Service object with name, description, etc.
 * @returns {object} Structured data object
 */
export const generateServiceSchema = (service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
        '@type': 'Organization',
        name: 'Aura Pixel',
        url: 'https://aurapixel.com',
    },
    areaServed: 'Worldwide',
    serviceType: service.category || 'Digital Marketing',
});

/**
 * Generate breadcrumb structured data
 * @param {array} items - Array of {name, url} objects
 * @returns {object} Breadcrumb structured data
 */
export const generateBreadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});

/**
 * Generate FAQ structured data
 * @param {array} faqs - Array of {question, answer} objects
 * @returns {object} FAQ structured data
 */
export const generateFAQSchema = (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});

export default useSEO;
