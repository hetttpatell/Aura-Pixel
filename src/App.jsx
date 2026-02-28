import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs/AboutUs';

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

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

const Home = () => (
  <main>
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
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-bg-main font-body text-text-body antialiased">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>

        <Suspense fallback={<div className="h-64 bg-bg-soft" />}>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
