import React, { useState } from 'react';
import { Copy, Check, QrCode, ExternalLink, Share2, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TelegramIcon, FacebookIcon } from './SocialIcons';

interface ActionCardProps {
  type: 'telegram-join' | 'telegram-share' | 'facebook-join' | 'facebook-share';
  title: string;
  subtitle: string;
  targetUrl: string;
  clickCount: number;
  onActionClick: () => void;
  onOpenQr?: () => void;
  onToast: (msg: string) => void;
  badgeLabel: string;
  previewText?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  type,
  title,
  subtitle,
  targetUrl,
  clickCount,
  onActionClick,
  onOpenQr,
  onToast,
  badgeLabel,
  previewText,
}) => {
  const [copied, setCopied] = useState(false);

  const isTelegram = type.startsWith('telegram');
  const isJoin = type.includes('join');

  const handlePrimaryClick = () => {
    onActionClick();

    if (isJoin) {
      // Fire celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: isTelegram
          ? ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff']
          : ['#1877f2', '#3b82f6', '#93c5fd', '#ffffff'],
      });
    }

    // Open target in new tab safely
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onToast(isJoin ? `Opening ${title}... Welcome!` : `Opening ${title}...`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      onToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast('Failed to copy link.');
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 border ${
        isTelegram
          ? 'bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-900 border-sky-900/40 hover:border-sky-500/60 shadow-lg shadow-sky-950/20'
          : 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-blue-900/40 hover:border-blue-500/60 shadow-lg shadow-blue-950/20'
      }`}
    >
      {/* Top Meta info following zero-pill discipline */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
          <div className="flex items-center gap-2">
            <span className={isTelegram ? 'text-sky-400' : 'text-blue-400'}>
              {isTelegram ? 'Telegram Network' : 'Facebook Network'}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{badgeLabel}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 font-mono text-xs tabular-nums">
            <span className="text-slate-500">Clicks:</span>
            <span className="font-semibold text-slate-200">{clickCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Header with Brand Icon & Action Title */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
              isTelegram
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
            }`}
          >
            {isTelegram ? (
              <TelegramIcon className="w-6 h-6" />
            ) : (
              <FacebookIcon className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Preview box if sharing or handle if joining */}
        {previewText && (
          <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 font-mono line-clamp-2">
            "{previewText}"
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
        {/* Main CTA Button */}
        <button
          type="button"
          onClick={handlePrimaryClick}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer ${
            isTelegram
              ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
          }`}
        >
          {isJoin ? (
            <Users className="w-4 h-4" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          <span>{title}</span>
          <ExternalLink className="w-4 h-4 opacity-75 ml-0.5" />
        </button>

        {/* Secondary utilities (Copy Link + QR Code) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/70 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {isJoin && onOpenQr && (
            <button
              type="button"
              onClick={onOpenQr}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/70 transition-colors cursor-pointer"
              title="Show mobile QR code"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-400" />
              <span>QR Code</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
