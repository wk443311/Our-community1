import React, { useState } from 'react';
import { X, RotateCcw, Save, Sparkles } from 'lucide-react';
import { CommunityConfig } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CommunityConfig;
  onSave: (newConfig: CommunityConfig) => void;
  onReset: () => void;
}

const PRESETS: Record<string, Partial<CommunityConfig>> = {
  'Tech Innovators': {
    communityName: 'Tech Innovators Guild',
    tagline: 'Connecting software engineers, founders, and creators worldwide.',
    telegramChannelUrl: 'https://t.me/techinnovators',
    telegramChannelHandle: '@techinnovators',
    facebookGroupUrl: 'https://www.facebook.com/groups/techinnovators',
    facebookGroupHandle: 'techinnovators',
    telegramShareText: '🚀 Join the Tech Innovators community! Daily engineering discussions, startup alpha, and expert AMAs.',
    facebookShareText: 'Discover the Tech Innovators community. Connect with engineers and creators.',
  },
  'Crypto & Web3 Alpha': {
    communityName: 'AlphaSignals Hub',
    tagline: 'Real-time market insights, on-chain analytics, and developer alpha.',
    telegramChannelUrl: 'https://t.me/alphasignalshub',
    telegramChannelHandle: '@alphasignalshub',
    facebookGroupUrl: 'https://www.facebook.com/groups/alphasignals',
    facebookGroupHandle: 'alphasignals',
    telegramShareText: '⚡ Join AlphaSignals Hub on Telegram & Facebook for daily market alpha and breaking news alerts!',
    facebookShareText: 'Join our decentralized community of builders, researchers, and traders.',
  },
  'Creator & Design Collective': {
    communityName: 'Creator Collective',
    tagline: 'Design reviews, creator drops, resource sharing, and weekly show-and-tell.',
    telegramChannelUrl: 'https://t.me/creatorcollective',
    telegramChannelHandle: '@creatorcollective',
    facebookGroupUrl: 'https://www.facebook.com/groups/creatorcollective',
    facebookGroupHandle: 'creatorcollective',
    telegramShareText: '🎨 Join Creator Collective on Telegram and Facebook! Weekly design feedback, assets, and collaborations.',
    facebookShareText: 'Check out Creator Collective! A community for UI designers, artists, and digital creators.',
  },
};

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<CommunityConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const applyPreset = (presetName: string) => {
    const preset = PRESETS[presetName];
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        ...preset,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white">Channel & Share Configuration</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize links and sharing copy for your own community
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Template Preset:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map((presetKey) => (
                <button
                  type="button"
                  key={presetKey}
                  onClick={() => applyPreset(presetKey)}
                  className="px-3 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
                >
                  {presetKey}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Community / Brand Name
              </label>
              <input
                type="text"
                value={formData.communityName}
                onChange={(e) =>
                  setFormData({ ...formData, communityName: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tagline / Value Proposition
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
                Telegram Settings (Buttons 1 & 2)
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telegram Channel / Group Link (Join Target)
                  </label>
                  <input
                    type="url"
                    value={formData.telegramChannelUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, telegramChannelUrl: e.target.value })
                    }
                    placeholder="https://t.me/yourchannel"
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telegram Share Pre-filled Text
                  </label>
                  <textarea
                    rows={2}
                    value={formData.telegramShareText}
                    onChange={(e) =>
                      setFormData({ ...formData, telegramShareText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                Facebook Settings (Buttons 3 & 4)
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Facebook Group / Page Link (Join Target)
                  </label>
                  <input
                    type="url"
                    value={formData.facebookGroupUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, facebookGroupUrl: e.target.value })
                    }
                    placeholder="https://www.facebook.com/groups/yourgroup"
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Facebook Share Pre-filled Copy / Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.facebookShareText}
                    onChange={(e) =>
                      setFormData({ ...formData, facebookShareText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target URL to Share (Website URL)
              </label>
              <input
                type="url"
                value={formData.shareUrl}
                onChange={(e) =>
                  setFormData({ ...formData, shareUrl: e.target.value })
                }
                placeholder="https://yourdomain.com"
                className="w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 font-mono text-xs"
                required
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg transition-all active:scale-95 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
