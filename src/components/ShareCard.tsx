import { forwardRef } from 'react';
import type { AnalysisResult } from '../data/types';
import { buildShareStats } from '../utils/shareStats';
import stickifyLogo from '../../icons/Stickify.png';
import shareCharacter from '../../Stickers/Stickify_character1.png';

type Props = {
  analysis: AnalysisResult;
};

export const ShareCard = forwardRef<HTMLDivElement, Props>(({ analysis }, ref) => {
  const stats = buildShareStats(analysis);

  return (
    <div className="share-card" ref={ref}>
      <div className="share-card__bg" aria-hidden />
      <div className="share-card__glow share-card__glow--one" aria-hidden />
      <div className="share-card__glow share-card__glow--two" aria-hidden />

      <header className="share-card__header">
        <div className="share-card__brand">
          <img src={stickifyLogo} alt="" />
          <span>Stickify</span>
        </div>
        <div className="share-card__profile">
          <div className="share-card__avatar">
            <img
              src={analysis.profile.avatarUrl}
              alt=""
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(event) => {
                const img = event.currentTarget;
                const fallback = 'https://vk.com/images/camera_200.png';
                if (img.src !== fallback) {
                  img.onerror = null;
                  img.src = fallback;
                }
              }}
            />
          </div>
          <div className="share-card__identity">
            <h2>{analysis.profile.name}</h2>
            <p>{analysis.profile.level}</p>
          </div>
        </div>
      </header>

      <div className="share-card__stats">
        {stats.map((stat) => (
          <article className="share-card__stat" key={stat.label}>
            <span className="share-card__stat-icon" aria-hidden>
              {stat.icon}
            </span>
            <div className="share-card__stat-copy">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          </article>
        ))}
      </div>

      <img className="share-card__character" src={shareCharacter} alt="" aria-hidden />
    </div>
  );
});

ShareCard.displayName = 'ShareCard';
