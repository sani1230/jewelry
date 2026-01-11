import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">
          Miroha
        </div>
        <div className="hidden md:flex space-x-8 font-sans text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-amber-200 transition-colors">Collections</a>
          <a href="#" className="hover:text-amber-200 transition-colors">Atelier</a>
          <a href="#" className="hover:text-amber-200 transition-colors">Contact</a>
        </div>
        <div className="md:hidden">
            <span className="text-sm uppercase tracking-widest">Menu</span>
        </div>
      </div>
    </nav>
  );
};