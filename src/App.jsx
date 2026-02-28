import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';

// Lazy load below-the-fold components
const Portfolio = lazy(() => import('./components/Portfolio'));
const ScrollingCompany = lazy(() => import('./components/ScrollingCompany'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const LeadCapture = lazy(() => import('./components/LeadCapture'));
const Footer = lazy(() => import('./components/Footer'));

// Simple loader for lazy sections
const SectionLoader = () => (
  <div className="w-full h-64 flex items-center justify-center bg-bg-soft/30 rounded-3xl border-2 border-dashed border-primary-teal/20 animate-pulse">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary-teal/30 border-t-primary-teal rounded-full animate-spin" />
      <span className="text-sm font-medium text-primary-teal/60">Loading experience...</span>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Meta Pixel Initialization
    // Replace 'YOUR_PIXEL_ID' with actual Meta Pixel ID
    const initMetaPixel = () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        fbq('init', 'YOUR_PIXEL_ID');
        // eslint-disable-next-line no-undef
        fbq('track', 'PageView');
      }
    };

    // Google Ads Initialization
    // Replace 'AW-XXXXX' with actual Google Ads ID
    const initGoogleAds = () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        gtag('config', 'AW-XXXXX');
      }
    };

    // Initialize tracking (uncomment and add actual IDs in production)
    // initMetaPixel();
    // initGoogleAds();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      // Cleanup event listeners if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg-main font-body text-text-body antialiased">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        <Suspense fallback={<SectionLoader />}>
          {/* Portfolio Section */}
          <Portfolio />

          {/* Scrolling Company Logos Section */}
          <ScrollingCompany />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Blog Section */}
          <Blog />

          {/* Lead Capture Section */}
          <LeadCapture />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-64 bg-bg-soft" />}>
        <Footer />
      </Suspense>

      {/* Meta Pixel & Google Ads Scripts (add to index.html in production) */}
      {/* 
      <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      </script>
      */}
    </div>
  );
}

export default App;
