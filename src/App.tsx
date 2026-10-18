/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ExternalLink, Copy, Check, Users, Bot, Radio, BellRing, Link2 } from 'lucide-react';
import { TelegramIcon, FacebookIcon } from './components/SocialIcons';

// ============================================================================
// 👇 আপনার ৪টি লিংক এখানে এডিট করুন / EDIT YOUR 4 LINKS HERE 👇
// ============================================================================
export const COMMUNITY_CONFIG = {
  // কমিউনিটির নাম (Community Name)
  communityName: 'Our Community',

  // সংক্ষিপ্ত বিবরণী (Short Description / Tagline)
  description: 'Welcome! Access our official bots, channels, and social pages below.',

  // 👉 ১. [বাটন ১] Telegram Bot Link (টেলিগ্রাম বটের লিংক)
  telegramBotUrl: 'https://t.me/final_hub_bot?startapp
',

  // 👉 ২. [বাটন ২] Telegram Channel Link (টেলিগ্রাম চ্যানেলের লিংক)
  telegramChannelUrl: 'https://t.me/addlist/-7nJq2JudL8yNTQ9
',

  // 👉 ৩. [বাটন ৩] Follow Facebook For More Update (ফেসবুক পেইজ/প্রোফাইল ফলো করার লিংক)
  facebookFollowUrl: 'https://www.facebook.com/profile.php?id=61594788757116',

  // 👉 ৪. [বাটন ৪] Facebook Link (ফেসবুক গ্রুপ বা মূল লিংক)
  facebookLinkUrl: 'https://www.facebook.com/profile.php?id=61594788757116',
};
// ============================================================================

export default function App() {
  const [toast, setToast] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => (current === msg ? null : current));
    }, 2500);
  };

  // ১. Telegram Bot Link
  const handleOpenTelegramBot = () => {
    window.open(COMMUNITY_CONFIG.telegramBotUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Telegram Bot...');
  };

  // ২. Telegram Channel Link
  const handleOpenTelegramChannel = () => {
    window.open(COMMUNITY_CONFIG.telegramChannelUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Telegram Channel...');
  };

  // ৩. Follow Facebook For More Update
  const handleOpenFacebookFollow = () => {
    window.open(COMMUNITY_CONFIG.facebookFollowUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Facebook for Updates...');
  };

  // ৪. Facebook Link
  const handleOpenFacebookLink = () => {
    window.open(COMMUNITY_CONFIG.facebookLinkUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Facebook Link...');
  };

  // পেইজের লিংক কপি করার ফাংশন
  const handleCopyPage = async () => {
    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
      await navigator.clipboard.writeText(pageUrl);
      setCopiedLink(true);
      showToast('Page link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast('Failed to copy link');
    }
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

      {/* Main Centered Card with exactly 4 buttons */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        {/* Top Status */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Verified Channels</span>
          </div>
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
            {COMMUNITY_CONFIG.communityName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            {COMMUNITY_CONFIG.description}
          </p>
        </div>

        {/* The 4 Action Buttons */}
        <div className="space-y-3.5">
          {/* বাটন ১: Telegram Bot Link */}
          <button
            type="button"
            onClick={handleOpenTelegramBot}
            className="w-full p-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-lg shadow-sky-500/20 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <TelegramIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  <span>Telegram Bot Link</span>
                  <Bot className="w-3.5 h-3.5 text-sky-200 inline" />
                </div>
                <div className="text-[11px] text-sky-100 font-normal">Start official automated assistant</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* বাটন ২: Telegram Channel Link */}
          <button
            type="button"
            onClick={handleOpenTelegramChannel}
            className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-sky-900/60 text-slate-100 font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <TelegramIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight text-white flex items-center gap-1.5">
                  <span>Telegram Channel Link</span>
                  <Radio className="w-3.5 h-3.5 text-sky-400 inline" />
                </div>
                <div className="text-[11px] text-slate-400 font-normal">Join official broadcast channel</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* বাটন ৩: Follow Facebook For More Update */}
          <button
            type="button"
            onClick={handleOpenFacebookFollow}
            className="w-full p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-lg shadow-blue-600/20 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <FacebookIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  <span>Follow Facebook For More Update</span>
                  <BellRing className="w-3.5 h-3.5 text-blue-200 inline" />
                </div>
                <div className="text-[11px] text-blue-100 font-normal">Follow for daily posts & alerts</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* বাটন ৪: Facebook Link */}
          <button
            type="button"
            onClick={handleOpenFacebookLink}
            className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-blue-900/60 text-slate-100 font-semibold flex items-center justify-between transition-all duration-150 active:scale-[0.98] shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight text-white flex items-center gap-1.5">
                  <span>Facebook Link</span>
                  <Link2 className="w-3.5 h-3.5 text-blue-400 inline" />
                </div>
                <div className="text-[11px] text-slate-400 font-normal">Official group & community page</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Bar: Copy Link */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Direct Community Access</span>
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
    </div>
  );
}
