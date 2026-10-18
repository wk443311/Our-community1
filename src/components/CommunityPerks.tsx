import React from 'react';
import { Bell, MessageSquare, Zap, ShieldCheck, Users2, CalendarDays } from 'lucide-react';
import { TelegramIcon, FacebookIcon } from './SocialIcons';

interface CommunityPerksProps {
  onJoinTelegram: () => void;
  onJoinFacebook: () => void;
}

export const CommunityPerks: React.FC<CommunityPerksProps> = ({
  onJoinTelegram,
  onJoinFacebook,
}) => {
  return (
    <section id="channels" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold mb-2">
            <span>Synchronized Ecosystem</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Zero Noise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Join Both Channels?
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Each platform is tailored for a specific type of engagement. Join Telegram for instant breaking alerts and voice AMAs; join Facebook for in-depth showcases and forum discussions.
          </p>
        </div>

        {/* 2 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Channel Column */}
          <div className="bg-slate-900 border border-sky-900/30 rounded-2xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center">
                    <TelegramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Telegram Channel & Chat</h3>
                    <div className="text-xs text-sky-400 font-mono">@official_telegram_channel</div>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <span className="text-slate-200 font-semibold">14,800+</span> subs
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Instant Flash Announcements</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Get immediate push notifications on releases, server alerts, and alpha drops before anyone else.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bell className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Live Voice AMAs & Streams</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Join weekly audio sessions with core builders, team leads, and special guest speakers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Verified Admin Badges</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Spam-free moderated group with anti-phishing safeguards and automated scam blockers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onJoinTelegram}
                className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-sky-500/20"
              >
                Join Telegram Channel
              </button>
            </div>
          </div>

          {/* Facebook Group Column */}
          <div className="bg-slate-900 border border-blue-900/30 rounded-2xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Facebook Community Group</h3>
                    <div className="text-xs text-blue-400 font-mono">fb.com/groups/official</div>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <span className="text-slate-200 font-semibold">28,400+</span> members
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Long-Form Threads & Case Studies</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Structured topic threads, tutorials, community feedback polls, and comprehensive Q&A archives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Member Showcases & Networking</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Showcase your work, find co-founders or clients, and connect with peers across regions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Official Events & Meetups</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      RSVP to virtual town halls, local city chapters, and live collaborative workshops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onJoinFacebook}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/20"
              >
                Join Facebook Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
