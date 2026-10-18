import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { CommunityConfig } from '../types';

interface EmbedKitProps {
  config: CommunityConfig;
  onToast: (msg: string) => void;
}

export const EmbedKit: React.FC<EmbedKitProps> = ({ config, onToast }) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'html' | 'markdown' | 'links'>('html');
  const [copied, setCopied] = useState(false);

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(config.shareUrl)}&text=${encodeURIComponent(config.telegramShareText)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.shareUrl)}&quote=${encodeURIComponent(config.facebookShareText)}`;

  const htmlSnippet = `<!-- CommUnity Action Buttons: 2 Telegram + 2 Facebook -->
<div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
  <!-- Telegram Button 1: Join -->
  <a href="${config.telegramChannelUrl}" target="_blank" rel="noopener" style="background:#229ED9; color:#fff; padding:10px 18px; border-radius:8px; text-decoration:none; font-family:sans-serif; font-weight:600; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
    ✈️ Join Telegram Channel
  </a>

  <!-- Telegram Button 2: Share -->
  <a href="${telegramShareUrl}" target="_blank" rel="noopener" style="background:#0284c7; color:#fff; padding:10px 18px; border-radius:8px; text-decoration:none; font-family:sans-serif; font-weight:600; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
    🚀 Share on Telegram
  </a>

  <!-- Facebook Button 1: Join -->
  <a href="${config.facebookGroupUrl}" target="_blank" rel="noopener" style="background:#1877F2; color:#fff; padding:10px 18px; border-radius:8px; text-decoration:none; font-family:sans-serif; font-weight:600; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
    👥 Join Facebook Group
  </a>

  <!-- Facebook Button 2: Share -->
  <a href="${facebookShareUrl}" target="_blank" rel="noopener" style="background:#1d4ed8; color:#fff; padding:10px 18px; border-radius:8px; text-decoration:none; font-family:sans-serif; font-weight:600; font-size:14px; display:inline-flex; align-items:center; gap:8px;">
    📢 Share on Facebook
  </a>
</div>`;

  const markdownSnippet = `<!-- Telegram Buttons -->
[![Join Telegram](https://img.shields.io/badge/Join-Telegram_Channel-229ED9?logo=telegram&logoColor=white)](${config.telegramChannelUrl})
[![Share on Telegram](https://img.shields.io/badge/Share-on_Telegram-0284C7?logo=telegram&logoColor=white)](${telegramShareUrl})

<!-- Facebook Buttons -->
[![Join Facebook](https://img.shields.io/badge/Join-Facebook_Community-1877F2?logo=facebook&logoColor=white)](${config.facebookGroupUrl})
[![Share on Facebook](https://img.shields.io/badge/Share-on_Facebook-1D4ED8?logo=facebook&logoColor=white)](${facebookShareUrl})`;

  const rawLinksSnippet = `Telegram Join Channel:
${config.telegramChannelUrl}

Telegram Share Dialog:
${telegramShareUrl}

Facebook Join Group:
${config.facebookGroupUrl}

Facebook Share Dialog:
${facebookShareUrl}`;

  const currentCode =
    activeSnippetTab === 'html'
      ? htmlSnippet
      : activeSnippetTab === 'markdown'
      ? markdownSnippet
      : rawLinksSnippet;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      onToast(`Copied ${activeSnippetTab.toUpperCase()} snippet!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast('Failed to copy.');
    }
  };

  return (
    <section id="embed-kit" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
              <span>Developer & Webmaster Export</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Embed Anywhere</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Embed Buttons in Your Site or Docs
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Copy ready-made code snippets containing your 2 Telegram and 2 Facebook buttons to insert directly into GitHub READMEs, newsletters, or web footers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveSnippetTab('html')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeSnippetTab === 'html'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                HTML Buttons
              </button>
              <button
                type="button"
                onClick={() => setActiveSnippetTab('markdown')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeSnippetTab === 'markdown'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown Badges
              </button>
              <button
                type="button"
                onClick={() => setActiveSnippetTab('links')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeSnippetTab === 'links'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Raw URLs
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-xl border border-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code container */}
        <div className="relative bg-slate-950 border border-slate-800/90 rounded-2xl p-4 font-mono text-xs overflow-x-auto shadow-xl">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800/80 text-slate-500 text-[11px]">
            <Code className="w-3.5 h-3.5" />
            <span>snippet.{activeSnippetTab === 'html' ? 'html' : activeSnippetTab === 'markdown' ? 'md' : 'txt'}</span>
          </div>
          <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
            {currentCode}
          </pre>
        </div>
      </div>
    </section>
  );
};
