import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  onOpenConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfig }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
          CommUnity Connect
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#buttons"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Action Hub
          </a>
          <a
            href="#share-preview"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Share Studio
          </a>
          <a
            href="#channels"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Channel Perks
          </a>
          <a
            href="#embed-kit"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Embed Kit
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenConfig}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-100 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-all active:scale-95 whitespace-nowrap shrink-0 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
            <span>Customize Channels</span>
          </button>
        </div>
      </div>
    </header>
  );
};
