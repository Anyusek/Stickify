import type { AnalysisResult } from '../data/types';
import { formatCurrency, formatNumber } from './format';

export type ShareStatItem = {
  icon: string;
  value: string;
  label: string;
};

export function buildShareStats(analysis: AnalysisResult): ShareStatItem[] {
  const premium100 = Math.max(
    analysis.packs.filter((pack) => pack.priceVotes >= 100).length,
    analysis.stats.rarePacks
  );

  return [
    { icon: '📦', value: formatNumber(analysis.stats.totalPacks), label: 'Всего наборов' },
    { icon: '💎', value: formatNumber(analysis.stats.paidPacks), label: 'Платные' },
    { icon: '🎁', value: formatNumber(analysis.stats.freePacks), label: 'Бесплатные' },
    { icon: '👑', value: formatNumber(premium100), label: 'Премиум 100+' },
    { icon: '💸', value: `${formatCurrency(analysis.stats.spentRub)} ₽`, label: 'Потрачено' },
    { icon: '⚡', value: formatNumber(analysis.stats.spentVotes), label: 'Голоса VK' }
  ];
}
