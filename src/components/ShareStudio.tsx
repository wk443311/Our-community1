import React, { useState } from 'react';
import { Send, Share2, Copy, Check, MessageSquareText, Sparkles } from 'lucide-react';
import { TelegramIcon, FacebookIcon } from './SocialIcons';

interface ShareStudioProps {
  shareUrl: string;
  telegramText: string;
  facebookText: string;
  communityName: string;
  onUpdateShareText: (type: 'telegram' | 'facebook', text: string) => void;
  onToast: (msg: string) => void;
  onActionClick: (type: 'telegram' | 'facebook') => void;
}

export const ShareStudio: React.FC<ShareStudioProps> = ({
  shareUrl,
  telegramText,
  facebookText,
  communityName,
  onUpdateShareText,
  onToast,
  onActionClick,
}) => {
  const [activePlatform, setActivePlatform] = useState<'telegram' | 'facebook'>('telegram');
  const [copied, setCopied] = useState(false);

  const currentText = activePlatform === 'telegram' ? telegramText : facebookText;
  const isTelegram = activePlatform === 'telegram';

  const shareEndpoint = isTelegram
    ? `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(telegramText)}`
    : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(facebookText)}`;

  const handleShareNow = () => {
    onActionClick(activePlatform);
    window.open(shareEndpoint, '_blank', 'noopener,noreferrer,width=600,height=500');
    onToast(`Launching ${isTelegram ? 'Telegram' : 'Facebook'} share dialog...`);
  };

  const handleCopyFormatted = async () => {
    const fullMessage = `${currentText}\n\n👉 Join here: ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      onToast('Full message + link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast('Failed to copy text.');
    }
  };

  return (
    <section id="share-preview" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
              <span>Interactive Quick-Share Suite</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Preview & Dispatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Instant Share Message Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Craft and preview custom invitations before sharing directly to your Telegram circles or Facebook feed.
            </p>
          </div>

          {/* Platform segmented control */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setActivePlatform('telegram')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                isTelegram
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TelegramIcon className="w-4 h-4" />
              <span>Telegram Format</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('facebook')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                !isTelegram
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FacebookIcon className="w-4 h-4" />
              <span>Facebook Format</span>
            </button>
          </div>
        </div>

        {/* 2-column Studio Editor + Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Editor Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquareText className="w-4 h-4 text-sky-400" />
                Customize Share Copy
              </span>
              <span className="text-xs text-slate-500">Live synchronized</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Pre-filled Headline & Message
                </label>
                <textarea
                  rows={4}
                  value={currentText}
                  onChange={(e) => onUpdateShareText(activePlatform, e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors leading-relaxed resize-none"
                  placeholder="Enter custom share text..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Appended Destination URL
                </label>
                <div className="px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl text-slate-400 truncate">
                  {shareUrl}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleShareNow}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold rounded-xl text-white shadow-md transition-all active:scale-95 ${
                    isTelegram
                      ? 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/20'
                      : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Launch {isTelegram ? 'Telegram' : 'Facebook'} Share</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyFormatted}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live Mock Social Card Preview */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Card Preview as Received by Friends
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {isTelegram ? 'Telegram Message Bubble' : 'Facebook Post Feed'}
                </span>
              </div>

              {isTelegram ? (
                /* Telegram Chat Bubble Preview */
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xs">
                      TG
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Community Ambassador</div>
                      <div className="text-[11px] text-slate-400">via Telegram Share</div>
                    </div>
                  </div>

                  <div className="p-3 bg-sky-950/40 border border-sky-800/30 rounded-xl text-xs text-sky-100 leading-relaxed whitespace-pre-wrap">
                    {telegramText}
                  </div>

                  {/* Link preview card */}
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1">
                    <span className="text-xs font-bold text-sky-400 truncate">{communityName}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{shareUrl}</span>
                    <span className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                      Join our official channels on Telegram and Facebook to access verified announcements and members.
                    </span>
                  </div>
                </div>
              ) : (
                /* Facebook Feed Post Preview */
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      FB
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Community Member</div>
                      <div className="text-[11px] text-slate-400">Just now · Public</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-200 leading-relaxed mb-3 whitespace-pre-wrap">
                    {facebookText}
                  </div>

                  {/* Facebook OpenGraph Card */}
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <div className="h-28 bg-gradient-to-br from-blue-900/60 to-slate-950 flex items-center justify-center p-4">
                      <div className="text-center">
                        <span className="text-sm font-bold text-white block">{communityName}</span>
                        <span className="text-xs text-blue-300">Official Community Channel</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900">
                      <span className="text-[11px] text-slate-400 uppercase font-mono block">
                        COMMUNITYCONNECT.ORG
                      </span>
                      <span className="text-xs font-bold text-white block truncate">
                        {communityName} - Join our Network
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                1-Click Native Forwarding
              </span>
              <button
                type="button"
                onClick={handleShareNow}
                className="text-sky-400 hover:text-sky-300 font-semibold"
              >
                Test Share →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
