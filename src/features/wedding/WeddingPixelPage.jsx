import { useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import SmoothScroll from './SmoothScroll';
import WeddingNavbar from './WeddingNavbar';
import WeddingHero from './WeddingHero';
import WeddingShowcase from './WeddingShowcase';
import WeddingWork from './WeddingWork';
import WeddingBTS from './WeddingBTS';
import WeddingTools from './WeddingTools';
import WeddingInquiry from './WeddingInquiry';

const WeddingPixelPage = () => {
  const { brand, setBrand } = useBrand();

  // Set brand to wedding on mount, clean up background on unmount
  // Brand switching is handled by BrandTransition component
  useEffect(() => {
    setBrand('wedding');
    document.body.style.backgroundColor = '#FFF3E3';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [setBrand]);

  return (
    <div className="wedding-page text-[#2B0F0F]" style={{ background: '#FFF3E3' }}>
      <WeddingNavbar />
      <SmoothScroll>
        <main id="main-content" role="main" style={{ overflow: 'visible' }}>
          <WeddingHero />
          <WeddingShowcase />
          <WeddingWork />
          <WeddingBTS />
          <WeddingTools />
          <WeddingInquiry />
        </main>
      </SmoothScroll>
    </div>
  );
};

export default WeddingPixelPage;
