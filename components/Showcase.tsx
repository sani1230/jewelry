import React from 'react';
import { JewelryItem } from '../types';
import { JewelryCard } from './JewelryCard';
import { ArrowDown } from 'lucide-react';

interface ShowcaseProps {
  items: JewelryItem[];
  activeIndex: number; // -1 means Hero, 0+ means items
  totalSteps: number;
}

export const Showcase: React.FC<ShowcaseProps> = ({ items, activeIndex }) => {
  
  // Calculate which item is currently "on stage"
  // If activeIndex is -1, we are at Hero.
  // If activeIndex is 0, we show first item.
  // If activeIndex is >= items.length, we show the last item or a footer (clamped).
  
  const clampedIndex = Math.max(0, Math.min(activeIndex, items.length - 1));
  const showHero = activeIndex < 0;
  
  // Items that have been "passed" or are currently active become cards on the left
  // But strictly, the prompt says "scroll more... placed left side".
  // So:
  // Active Item: Large, Center.
  // Previous Items: Stacked Left.
  // Next Items: Hidden / Below.

  const currentItem = items[clampedIndex];

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
      
      {/* LEFT PANEL - History / Collection List */}
      <div className={`
        absolute md:relative z-20 top-0 left-0 w-full md:w-1/3 h-24 md:h-full 
        bg-zinc-950/90 md:bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800 
        transition-transform duration-700 ease-in-out
        flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar
        ${showHero ? '-translate-y-full md:translate-y-0 md:-translate-x-full' : 'translate-y-0 md:translate-x-0'}
      `}>
        {/* Mobile Header Placeholder in List */}
        <div className="md:hidden flex items-center justify-center min-w-[100px] p-4 text-xs tracking-widest text-zinc-500 uppercase border-r border-zinc-800">
           Collection
        </div>

        {items.map((item, idx) => {
             // Only show items that are equal to or less than the current active index (plus maybe one for preview if desired, but strict requirment is "become card")
             // Actually, showing all is better for navigation, but highlighting active.
             // Requirement: "jewelery will up ... become a card and placed left side" implies it moves there.
             // We can simulate this by always having the list, but it enters the viewport when we leave hero.
             return (
               <div key={item.id} className={`${idx > activeIndex ? 'hidden' : 'block'}`}>
                 <JewelryCard 
                   item={item} 
                   isActive={idx === activeIndex} 
                   onClick={() => {
                     // In a real app, this would smooth scroll to the target section
                     const targetScroll = (idx + 1) * window.innerHeight;
                     window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                   }}
                 />
               </div>
             )
        })}
        
        {/* Placeholder if no items in history yet (e.g. at first item) */}
        {activeIndex === 0 && (
           <div className="hidden md:flex flex-1 items-center justify-center p-8 text-center opacity-30">
              <p className="font-serif italic">Discover the collection...</p>
           </div>
        )}
      </div>

      {/* RIGHT PANEL - Main Stage */}
      <div className="relative flex-1 h-full w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 opacity-50 pointer-events-none" />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/10 blur-[120px] rounded-full transition-opacity duration-1000 ${showHero ? 'opacity-0' : 'opacity-100'}`} />

        {/* HERO SECTION OVERLAY */}
        <div className={`
          absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-950 text-center px-4
          transition-all duration-1000 ease-in-out
          ${showHero ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-20'}
        `}>
             <div className="relative w-full max-w-4xl">
                <h1 className="font-serif text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 mb-6 tracking-tighter animate-pulse">
                  MIROHA
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl font-light tracking-widest uppercase mb-12 max-w-lg mx-auto">
                  Where timeless beauty meets modern soul
                </p>
                <div className="animate-bounce text-amber-200/50 flex justify-center">
                  <ArrowDown size={32} />
                </div>
             </div>
             {/* Decorative Background Image for Hero */}
             <div className="absolute inset-0 -z-10 opacity-20">
                 <img src="https://picsum.photos/seed/hero/1920/1080" alt="background" className="w-full h-full object-cover grayscale" />
             </div>
        </div>

        {/* ACTIVE ITEM DISPLAY */}
        <div className={`
          relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12
          transition-all duration-1000 ease-out
          ${!showHero ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}
        `}>
           {/* Image Side */}
           <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-[4/5] max-h-[70vh]">
              {items.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`
                    absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out
                    ${idx === activeIndex 
                      ? 'opacity-100 z-10 scale-100 rotate-0 grayscale-0' 
                      : idx < activeIndex 
                        ? 'opacity-0 z-0 scale-90 -rotate-6 grayscale' // Passed items fade out/shrink
                        : 'opacity-0 z-0 scale-110 rotate-6' // Future items wait
                    }
                  `}
                >
                  <img 
                    src={`https://picsum.photos/seed/${item.imageSeed}/800/1000`} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-sm shadow-2xl shadow-black/50" 
                  />
                  {/* Decorative Border */}
                  <div className="absolute inset-4 border border-amber-200/20 pointer-events-none" />
                </div>
              ))}
           </div>

           {/* Content Side (Quote) */}
           <div className="w-full md:w-1/2 text-center md:text-left relative h-[300px] flex items-center">
             {items.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`
                    absolute top-0 left-0 w-full transition-all duration-1000 delay-300 ease-out flex flex-col justify-center h-full
                    ${idx === activeIndex 
                      ? 'opacity-100 translate-y-0 blur-0' 
                      : idx < activeIndex
                        ? 'opacity-0 -translate-y-10 blur-sm' 
                        : 'opacity-0 translate-y-10 blur-sm'
                    }
                  `}
                >
                  <h2 className="text-3xl md:text-5xl font-serif text-amber-100 mb-6 leading-tight">
                    {item.name}
                  </h2>
                  <div className="w-12 h-0.5 bg-amber-500 mb-6 mx-auto md:mx-0" />
                  <blockquote className="text-lg md:text-2xl font-serif italic text-zinc-400 mb-8 leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                  <p className="font-sans text-amber-300/80 tracking-widest text-sm uppercase">
                    {item.price} — <span className="text-zinc-500">{item.description}</span>
                  </p>
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};