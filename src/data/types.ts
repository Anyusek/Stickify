export type TabId = 'home' | 'collection' | 'tops' | 'stats' | 'profile';

export type StickerPack = {
  id: number;
  title: string;
  priceVotes: number;
  priceRub: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owners: number;
  isFree: boolean;
  coverUrl: string;
  accent: string;
  releasedAt: string;
};

export type CollectorProfile = {
  id: number;
  name: string;
  link: string;
  avatarUrl: string;
  level: string;
};

export type CollectionStats = {
  totalPacks: number;
  rarePacks: number;
  freePacks: number;
  paidPacks: number;
  spentVotes: number;
  spentRub: number;
};

export type AnalysisResult = {
  profile: CollectorProfile;
  packs: StickerPack[];
  stats: CollectionStats;
  updatedAt: string;
};

export type LeaderboardUser = {
  id: number;
  name: string;
  avatarUrl: string;
  totalPacks: number;
  rarePacks: number;
  spentVotes: number;
  rank: number;
};
