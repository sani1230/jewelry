import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Showcase } from './components/Showcase';
import { jewelryItems } from './data';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Total "virtual" pages: 1 (Hero) + Number of items
  const totalPages = jewelryItems.length + 1;
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - windowHeight;
      
      // Calculate progress simply by viewport heights
      const currentStep = scrollY / windowHeight;
      setScrollProgress(currentStep);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active index based on scroll
  // 0 to 0.99 -> Hero (Index -1 in Showcase logic to separate it)
  // 1.0 to 1.99 -> Item 0
  // 2.0 to 2.99 -> Item 1
  // etc.
  
  // We use a slight offset (0.5) to trigger transition midway through scroll for smoother feel, 
  // or floor for strict sectioning. Let's use a threshold.
  const activeStep = Math.floor(scrollProgress + 0.2); 
  const activeItemIndex = activeStep - 1; // -1 is hero

  return (
    <>
      <Navbar />
      
      {/* 
        The Fixed Viewport 
        This container stays fixed and renders the current state based on scroll.
      */}
      <main className="fixed inset-0 w-full h-screen z-0">
        <Showcase 
          items={jewelryItems} 
          activeIndex={activeItemIndex} 
          totalSteps={totalPages} 
        />
      </main>

      {/* 
        The Scroll Spacer
        This invisible div gives the body height so the user can actually scroll.
      */}
      <div 
        style={{ height: `${totalPages * 100}vh` }} 
        className="relative w-full z-10 pointer-events-none"
      >
        {/* We can add invisible markers here if we needed IntersectionObserver, but raw scroll math is fine for this effect */}
      </div>

      {/* 
        Scroll Indicator / Footer Info (Fixed at bottom)
      */}
      <footer className="fixed bottom-6 right-6 z-50 mix-blend-difference text-white text-xs font-sans tracking-widest hidden md:block">
        SCROLL TO EXPLORE
        <span className="block h-px w-full bg-white mt-1"></span>
        <span className="block mt-1">
            {Math.max(0, Math.min(activeItemIndex + 1, jewelryItems.length))} / {jewelryItems.length}
        </span>
      </footer>
    </>
  );
};

export default App;