import type { CSSProperties } from 'react';
import { GlassCard } from '../components/GlassCard';
import { StickerGrid } from '../components/StickerGrid';
import type { AnalysisResult } from '../data/types';
import { formatNumber, rarityLabel } from '../utils/format';

type Props = {
  analysis: AnalysisResult;
};

export function CollectionPage({ analysis }: Props) {
  const rarePacks = analysis.packs.filter((pack) => pack.rarity !== 'common');

  return (
    <div className="page">
      <div className="page-title">
        <span>Коллекция</span>
        <h1>Последние наборы</h1>
      </div>
      <StickerGrid packs={analysis.packs} />

      <GlassCard className="rare-block">
        <div className="section-head">
          <div>
            <span>Premium</span>
            <h2>Редкие наборы</h2>
          </div>
          <b>{rarePacks.length}</b>
        </div>
        <div className="rare-list">
          {rarePacks.map((pack) => (
            <article className="rare-item" key={pack.id} style={{ '--accent': pack.accent } as CSSProperties}>
              <img src={pack.coverUrl} alt={pack.title} />
              <div>
                <h3>{pack.title}</h3>
                <p>{rarityLabel[pack.rarity]} · {formatNumber(pack.owners)} владельцев</p>
              </div>
            </article>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
