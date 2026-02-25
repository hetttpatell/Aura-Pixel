import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import LeadCapture from './components/LeadCapture';
import Footer from './components/Footer';

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
    <div className="min-h-screen bg-bg-main">
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

        {/* Portfolio Section */}
        <Portfolio />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Blog Section */}
        <Blog />

        {/* Lead Capture Section */}
        <LeadCapture />
      </main>

      {/* Footer */}
      <Footer />

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
