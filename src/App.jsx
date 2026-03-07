import { useEffect, lazy, Suspense, memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';

// Layout Components
import { Navbar, Footer } from './components/layout';

// Common Components
import { SkipToContent, ErrorBoundary } from './components/common';

// Section Components - Import critical above-the-fold components eagerly
import { Hero, Services, WhyChooseUs } from './components/sections';

// Lazy load feature pages for better code splitting
const AboutUs = lazy(() => import('./features/about/AboutUs'));
const ServicesDetail = lazy(() => import('./features/services/ServicesDetail'));
const BlogPage = lazy(() => import('./features/blog/BlogPage'));

// Hooks
import { useSEO } from './hooks';

// Lazy load below-the-fold section components
const Portfolio = lazy(() => import('./components/sections/Portfolio'));
const ScrollingCompany = lazy(() => import('./components/sections/ScrollingCompany'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Blog = lazy(() => import('./components/sections/Blog'));
const LeadCapture = lazy(() => import('./components/sections/LeadCapture'));

// Memoized loader component for better performance
const SectionLoader = memo(() => (
  <div className="w-full h-64 flex items-center justify-center bg-bg-soft/30 rounded-3xl border-2 border-dashed border-primary-teal/20">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary-teal/30 border-t-primary-teal rounded-full animate-spin" />
      <span className="text-sm font-medium text-primary-teal/60">Loading experience...</span>
    </div>
  </div>
));
SectionLoader.displayName = 'SectionLoader';

// Minimal fallback for page transitions
const PageLoader = memo(() => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary-teal/30 border-t-primary-teal rounded-full animate-spin" />
  </div>
));
PageLoader.displayName = 'PageLoader';

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for lazy-loaded components to render before scrolling to hash target
      // Use multiple attempts for lazy-loaded sections
      let attempts = 0;
      const maxAttempts = 5;

      const scrollToElement = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(scrollToElement, 200);
        }
      };

      const timer = setTimeout(scrollToElement, 100);
      return () => clearTimeout(timer);
    } else {
      // For page navigation without hash, scroll to top instantly first
      // then apply a subtle entrance transition
      // Only scroll to top for non-service routes (ServicesDetail handles its own scroll)
      if (!pathname.startsWith('/services')) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// SEO wrapper for Home page
const HomeSEO = () => {
  useSEO('home');
  return (
    <main id="main-content" role="main">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
        <ScrollingCompany />
        <Testimonials />
        <Blog />
        <LeadCapture />
      </Suspense>
    </main>
  );
};

// SEO wrapper for About page
const AboutSEO = () => {
  useSEO('about');
  return (
    <Suspense fallback={<PageLoader />}>
      <AboutUs />
    </Suspense>
  );
};

// SEO wrapper for Services page with dynamic service detection
const ServicesSEOWrapper = () => {
  const { serviceId } = useParams();

  // Map service IDs to SEO keys
  const serviceSeoMap = {
    'seo': 'serviceSeo',
    'social-media': 'serviceSocialMedia',
    'performance-marketing': 'servicePerformance',
    'branding': 'serviceBranding',
    'web-development': 'serviceWebDev',
    'conversion-optimization': 'serviceConversion',
    'marketing-automation': 'serviceAutomation',
    'google-ads': 'serviceGoogleAds',
    'meta-ads': 'serviceMetaAds',
  };

  const seoKey = serviceId && serviceSeoMap[serviceId] ? serviceSeoMap[serviceId] : 'services';
  useSEO(seoKey);

  return (
    <Suspense fallback={<PageLoader />}>
      <ServicesDetail />
    </Suspense>
  );
};

// SEO wrapper for Blog page
const BlogSEOWrapper = () => {
  useSEO('blog');
  return (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  );
};

function App() {
  useEffect(() => {
    // Meta Pixel Initialization
    const initMetaPixel = () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        fbq('init', 'YOUR_PIXEL_ID');
        // eslint-disable-next-line no-undef
        fbq('track', 'PageView');
      }
    };

    // Google Ads Initialization
    const initGoogleAds = () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        gtag('config', 'AW-XXXXX');
      }
    };

    // Init tracking here if needed

    // Preload critical resources
    const preloadResources = () => {
      // Preload critical fonts
      const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap'
      ];

      fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    preloadResources();
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SkipToContent />
        <ScrollToHash />
        <div className="min-h-[100dvh] bg-bg-main font-body text-text-body antialiased">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeSEO />} />
            <Route path="/about" element={<AboutSEO />} />
            <Route path="/blog" element={<BlogSEOWrapper />} />
            <Route path="/services" element={<ServicesSEOWrapper />} />
            <Route path="/services/:serviceId" element={<ServicesSEOWrapper />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Suspense fallback={<div className="h-64 bg-bg-soft" />}>
            <Footer />
          </Suspense>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;