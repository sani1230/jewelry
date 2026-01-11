import React from 'react';
import { JewelryItem } from '../types';

interface JewelryCardProps {
  item: JewelryItem;
  isActive: boolean;
  onClick: () => void;
}

export const JewelryCard: React.FC<JewelryCardProps> = ({ item, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer transition-all duration-500 ease-in-out group
        flex flex-row md:flex-col items-center gap-4 p-4 border-b border-zinc-800/50 hover:bg-zinc-900/50
        ${isActive ? 'opacity-100 bg-zinc-900' : 'opacity-60 hover:opacity-100'}
      `}
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-full md:rounded-lg border border-zinc-700 group-hover:border-amber-200/50 transition-colors">
        <img 
          src={`https://picsum.photos/seed/${item.imageSeed}/200/200`} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="flex-1 text-left md:text-center">
        <h4 className="font-serif text-sm md:text-base text-zinc-200 group-hover:text-amber-200 transition-colors">{item.name}</h4>
        <p className="text-xs text-zinc-500 font-sans mt-1 line-clamp-1">{item.quote}</p>
      </div>
    </div>
  );
};