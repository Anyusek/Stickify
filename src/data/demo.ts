import type { AnalysisResult, LeaderboardUser, StickerPack } from './types';

export const stickerPacks: StickerPack[] = [
  {
    id: 1,
    title: 'Спотти',
    priceVotes: 9,
    priceRub: 63,
    rarity: 'legendary',
    owners: 1280,
    isFree: false,
    coverUrl: 'https://vk.com/sticker/1-1-512',
    accent: '#4DA3FF',
    releasedAt: '2014-06-10'
  },
  {
    id: 2,
    title: 'Персик',
    priceVotes: 0,
    priceRub: 0,
    rarity: 'common',
    owners: 892000,
    isFree: true,
    coverUrl: 'https://vk.com/sticker/1-64-512',
    accent: '#FFB86C',
    releasedAt: '2016-02-18'
  },
  {
    id: 3,
    title: 'Корги',
    priceVotes: 7,
    priceRub: 49,
    rarity: 'rare',
    owners: 48200,
    isFree: false,
    coverUrl: 'https://vk.com/sticker/1-125-512',
    accent: '#63E6BE',
    releasedAt: '2018-11-04'
  },
  {
    id: 4,
    title: 'VK Fest',
    priceVotes: 0,
    priceRub: 0,
    rarity: 'epic',
    owners: 9200,
    isFree: true,
    coverUrl: 'https://vk.com/sticker/1-318-512',
    accent: '#B197FC',
    releasedAt: '2020-07-21'
  },
  {
    id: 5,
    title: 'Космо',
    priceVotes: 12,
    priceRub: 84,
    rarity: 'legendary',
    owners: 610,
    isFree: false,
    coverUrl: 'https://vk.com/sticker/1-493-512',
    accent: '#00D4FF',
    releasedAt: '2022-03-15'
  },
  {
    id: 6,
    title: 'Музыка',
    priceVotes: 5,
    priceRub: 35,
    rarity: 'rare',
    owners: 18100,
    isFree: false,
    coverUrl: 'https://vk.com/sticker/1-767-512',
    accent: '#7CFFCB',
    releasedAt: '2023-08-01'
  }
];

export const demoAnalysis: AnalysisResult = {
  profile: {
    id: 123456,
    name: 'Алексей Стикеров',
    link: 'vk.com/id123456',
    avatarUrl: 'https://vk.com/images/camera_200.png',
    level: 'Neon Collector'
  },
  packs: stickerPacks,
  stats: {
    totalPacks: 186,
    rarePacks: 23,
    freePacks: 58,
    paidPacks: 128,
    spentVotes: 846,
    spentRub: 5922
  },
  updatedAt: new Date().toISOString()
};

const leaderboardNames = [
  'Милана Волкова',
  'Даня Смирнов',
  'Кира Орлова',
  'Артур Соколов',
  'Соня Лебедева',
  'Илья Морозов',
  'Милана Кузнецова',
  'Даня Павлов',
  'Кира Новикова',
  'Артур Виноградов',
  'Соня Белова',
  'Илья Егоров'
];

export const leaderboard: LeaderboardUser[] = Array.from({ length: 24 }).map((_, index) => ({
  id: 5000 + index,
  name: leaderboardNames[index % leaderboardNames.length],
  avatarUrl: `https://i.pravatar.cc/160?img=${(index % 60) + 1}`,
  totalPacks: 420 - index * 7,
  rarePacks: 96 - index * 2,
  spentVotes: 2400 - index * 53,
  rank: index + 1
}));

export const dynamics = [
  { month: 'Янв', packs: 124, votes: 520, rub: 3640 },
  { month: 'Фев', packs: 136, votes: 590, rub: 4130 },
  { month: 'Мар', packs: 148, votes: 655, rub: 4585 },
  { month: 'Апр', packs: 159, votes: 704, rub: 4928 },
  { month: 'Май', packs: 173, votes: 778, rub: 5446 },
  { month: 'Июн', packs: 186, votes: 846, rub: 5922 }
];
