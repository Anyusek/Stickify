import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { StickerPack } from '../data/types';
import { rarityLabel } from '../utils/format';

type Props = {
  packs: StickerPack[];
};

export function StickerGrid({ packs }: Props) {
  return (
    <div className="sticker-grid">
      {packs.map((pack, index) => (
        <motion.article
          className={`sticker-card sticker-card--${pack.rarity}`}
          key={pack.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.045 }}
          style={{ '--accent': pack.accent } as CSSProperties}
        >
          <div className="sticker-card__image">
            <img src={pack.coverUrl} alt={pack.title} loading="lazy" />
          </div>
          <div>
            <h3>{pack.title}</h3>
            <p>{rarityLabel[pack.rarity]}</p>
          </div>
          <span>{pack.isFree ? 'free' : `${pack.priceVotes} голосов`}</span>
        </motion.article>
      ))}
    </div>
  );
}
