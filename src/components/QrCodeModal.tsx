import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { TelegramIcon, FacebookIcon } from './SocialIcons';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  telegramUrl: string;
  facebookUrl: string;
  communityName: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  telegramUrl,
  facebookUrl,
  communityName,
}) => {
  const [activeTab, setActiveTab] = useState<'telegram' | 'facebook'>('telegram');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const activeUrl = activeTab === 'telegram' ? telegramUrl : facebookUrl;
  const isTelegram = activeTab === 'telegram';

  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(activeUrl, {
      width: 380,
      margin: 2,
      color: {
        dark: isTelegram ? '#0284c7' : '#1877f2',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [activeUrl, isTelegram, isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${communityName.toLowerCase().replace(/\s+/g, '-')}-${activeTab}-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Scan to Join Channel</h3>
            <p className="text-xs text-slate-400 mt-0.5">Point your mobile camera to open instantly</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl mt-5 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              isTelegram
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TelegramIcon className="w-4 h-4" />
            <span>Telegram Channel</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('facebook')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isTelegram
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FacebookIcon className="w-4 h-4" />
            <span>Facebook Group</span>
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-xl border border-slate-800/80 mt-5">
          <div className="bg-white p-3.5 rounded-xl shadow-lg">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`${activeTab} QR code`}
                className="w-56 h-56 object-contain rounded"
              />
            ) : (
              <div className="w-56 h-56 bg-slate-200 animate-pulse rounded" />
            )}
          </div>
          <div className="mt-3.5 text-center">
            <span className="text-xs font-mono text-slate-400 break-all px-2 select-all">
              {activeUrl}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>Download PNG</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 text-white rounded-xl transition-colors ${
              isTelegram ? 'bg-sky-500 hover:bg-sky-400' : 'bg-blue-600 hover:bg-blue-500'
            }`}
            title="Open link directly"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
