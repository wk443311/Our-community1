import React from 'react';
import { TelegramIcon, FacebookIcon } from './SocialIcons';

interface FooterProps {
  onJoinTelegram: () => void;
  onJoinFacebook: () => void;
  onShareTelegram: () => void;
  onShareFacebook: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onJoinTelegram,
  onJoinFacebook,
  onShareTelegram,
  onShareFacebook,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              CommUnity Connect
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Empowering communities with high-conversion action portals, 1-click Telegram and Facebook integration buttons, QR scan gateways, and instant sharing.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Telegram Actions
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onJoinTelegram}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Join Official Channel</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onShareTelegram}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Share on Telegram</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Facebook Actions
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onJoinFacebook}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Join Community Group</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onShareFacebook}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Share on Facebook</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} CommUnity Connect. Built for instant community growth.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500">100% Free & Open Community Sharing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
