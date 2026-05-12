import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState('aura'); // 'aura' or 'wedding'

  // Transition state for cinematic brand switching
  const [transition, setTransition] = useState({
    isActive: false,
    target: null, // 'aura' or 'wedding'
  });

  // Update body class and data attribute when brand changes
  useEffect(() => {
    document.body.dataset.brand = brand;
    if (brand === 'wedding') {
      document.body.classList.add('wedding-theme');
      document.body.classList.remove('aura-theme');
    } else {
      document.body.classList.add('aura-theme');
      document.body.classList.remove('wedding-theme');
    }
  }, [brand]);

  // Start a cinematic transition to the target brand
  const startTransition = useCallback((target) => {
    if (target === brand || transition.isActive) return; // Guard against duplicate or concurrent transitions
    setTransition({ isActive: true, target });
  }, [brand, transition.isActive]);

  // Complete the transition (called by BrandTransition component)
  const completeTransition = useCallback(() => {
    setTransition({ isActive: false, target: null });
  }, []);

  return (
    <BrandContext.Provider value={{ brand, setBrand, transition, startTransition, completeTransition }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
