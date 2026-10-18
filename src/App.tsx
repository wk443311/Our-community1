/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Users,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Settings2,
  X,
  RotateCcw,
} from 'lucide-react';
import { TelegramIcon, FacebookIcon } from './components/SocialIcons';

interface SimpleConfig {
  communityName: string;
  description: string;
  telegramJoinUrl: string;
  telegramShareUrl: string;
  telegramShareText: string;
  facebookJoinUrl: string;
  facebookShareUrl: string;
  facebookShareQuote: string;
}

const DEFAULT_CONFIG: SimpleConfig = {
  communityName: 'Our Community',
  description: 'Welcome! Join our official channels or share them with your friends.',
  telegramJoinUrl: 'https://t.me/final_hub_bot?startapp
',
  telegramShareUrl: 'https://t.me/addlist/-7nJq2JudL8yNTQ9
',
  telegramShareText: 'Join our community on Telegram & Facebook!',
  facebookJoinUrl: 'https://www.facebook.com/groups/community',
  facebookShareUrl: 'https://www.facebook.com/sharer/sharer.php',
  facebookShareQuote: 'Join our community!',
};

export default function App() {
  const [config, setConfig] = useState<SimpleConfig>(() => {
    try {
      const saved = localStorage.getItem('simple_community_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form state for settings
  const [formConfig, setFormConfig] = useState<SimpleConfig>(config);

  useEffect(() => {
    localStorage.setItem('simple_community_config', JSON.stringify(config));
  }, [config]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2500);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';

  // 1. Telegram Button 1: Join
  const handleJoinTelegram = () => {
    window.open(config.telegramJoinUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Telegram Channel...');
  };

  // 2. Telegram Button 2: Share
  const handleShareTelegram = () => {
    const shareUrl = `${config.telegramShareUrl}?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(config.telegramShareText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Telegram Share...');
  };

  // 3. Facebook Button 1: Join
  const handleJoinFacebook = () => {
    window.open(config.facebookJoinUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Facebook Group...');
  };

  // 4. Facebook Button 2: Share
  const handleShareFacebook = () => {
    const shareUrl = `${config.facebookShareUrl}?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(config.facebookShareQuote)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Facebook Share...');
  };

  const handleCopyPage = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      showToast('Page link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast('Failed to copy link');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(formConfig);
    setIsSettingsOpen(false);
    showToast('Buttons updated successfully!');
  };

  const handleResetSettings = () => {
    setConfig(DEFAULT_CONFIG);
    setFormConfig(DEFAULT_CONFIG);
    localStorage.removeItem('simple_community_config');
    setIsSettingsOpen(false);
    showToast('Reset to default buttons');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 z-50 px-4 py-2 bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Centered Simple Card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Top bar controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Community Channels</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormConfig(config);
              setIsSettingsOpen(true);
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Edit button links"
            aria-label="Edit button links"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>

        {/* Profile / Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <div className="flex items-center -space-x-1.5">
                <span className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white shadow">
                  <TelegramIcon className="w-4 h-4" />
                </span>
                <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                  <FacebookIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            {config.communityName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* The 4 Action Buttons */}
        <div className="space-y-3.5">
          {/* 1. Telegram Button 1: Join Channel */}
          <button
            type="button"
            onClick={handleJoinTelegram}
            className="w-full p-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-lg shadow-sky-500/20 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <TelegramIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">Join Telegram Channel</div>
                <div className="text-[11px] text-sky-100 font-normal">Official community announcements</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* 2. Telegram Button 2: Share to Telegram */}
          <button
            type="button"
            onClick={handleShareTelegram}
            className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-sky-900/60 text-slate-100 font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <TelegramIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight text-white">Share on Telegram</div>
                <div className="text-[11px] text-slate-400 font-normal">Send link to contacts or groups</div>
              </div>
            </div>
            <Share2 className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3. Facebook Button 1: Join Group */}
          <button
            type="button"
            onClick={handleJoinFacebook}
            className="w-full p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-lg shadow-blue-600/20 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <FacebookIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">Join Facebook Group</div>
                <div className="text-[11px] text-blue-100 font-normal">Member discussions & network</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* 4. Facebook Button 2: Share on Facebook */}
          <button
            type="button"
            onClick={handleShareFacebook}
            className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-blue-900/60 text-slate-100 font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight text-white">Share on Facebook</div>
                <div className="text-[11px] text-slate-400 font-normal">Post to your feed or story</div>
              </div>
            </div>
            <Share2 className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Utility: Quick Copy Link */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Quick Community Access</span>
          </div>

          <button
            type="button"
            onClick={handleCopyPage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Page Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Modal (Clean and Simple) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Button Links</h3>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Community Name
                </label>
                <input
                  type="text"
                  value={formConfig.communityName}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, communityName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formConfig.description}
                  onChange={(e) =>
                    setFormConfig({ ...formConfig, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 text-sm"
                  required
                />
              </div>

              {/* Telegram settings */}
              <div className="pt-2 border-t border-slate-800">
                <span className="font-bold text-sky-400 block mb-2">Telegram Links</span>
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-400 mb-0.5">1. Join Channel URL</label>
                    <input
                      type="url"
                      value={formConfig.telegramJoinUrl}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, telegramJoinUrl: e.target.value })
                      }
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-0.5">2. Share Text</label>
                    <input
                      type="text"
                      value={formConfig.telegramShareText}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, telegramShareText: e.target.value })
                      }
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-sky-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Facebook settings */}
              <div className="pt-2 border-t border-slate-800">
                <span className="font-bold text-blue-400 block mb-2">Facebook Links</span>
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-400 mb-0.5">3. Join Group URL</label>
                    <input
                      type="url"
                      value={formConfig.facebookJoinUrl}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, facebookJoinUrl: e.target.value })
                      }
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-0.5">4. Share Quote</label>
                    <input
                      type="text"
                      value={formConfig.facebookShareQuote}
                      onChange={(e) =>
                        setFormConfig({ ...formConfig, facebookShareQuote: e.target.value })
                      }
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg shadow cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
