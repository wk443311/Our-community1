export interface CommunityConfig {
  communityName: string;
  tagline: string;
  telegramChannelUrl: string;
  telegramChannelHandle: string;
  telegramShareText: string;
  facebookGroupUrl: string;
  facebookGroupHandle: string;
  facebookShareText: string;
  shareUrl: string;
}

export interface ButtonStats {
  telegramJoinClicks: number;
  telegramShareClicks: number;
  facebookJoinClicks: number;
  facebookShareClicks: number;
}
