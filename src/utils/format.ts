export const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);

export const rarityLabel: Record<string, string> = {
  common: 'обычный',
  rare: 'редкий',
  epic: 'эпический',
  legendary: 'легендарный'
};
