import { useRef, useState } from 'react';
import { Button } from '@vkontakte/vkui';
import { Icon24DownloadOutline, Icon24ShareOutline } from '@vkontakte/icons';
import { GlassCard } from '../components/GlassCard';
import { ShareCard } from '../components/ShareCard';
import { StatCard } from '../components/StatCard';
import type { AnalysisResult } from '../data/types';
import { downloadDataUrl, renderCollectorCardToPng } from '../services/share';
import { shareToStory } from '../services/vk';

type Props = {
  analysis: AnalysisResult;
};

export function ProfilePage({ analysis }: Props) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [shareStatus, setShareStatus] = useState<string>('');

  async function exportCard(share = false) {
    if (!shareRef.current) {
      setShareStatus('Карточка ещё не загрузилась');
      return;
    }

    setIsExporting(true);
    setShareStatus('');
    try {
      const dataUrl = await renderCollectorCardToPng(shareRef.current);
      if (share) {
        const shared = await shareToStory(dataUrl);
        setShareStatus(shared ? 'Открываем VK Stories' : 'В браузере Stories недоступны, PNG скачан');
      } else {
        downloadDataUrl(dataUrl, 'stickify-card.png');
        setShareStatus('PNG сохранён');
      }
    } catch {
      setShareStatus('Не удалось собрать PNG. Попробуй обновить страницу');
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="page">
      <GlassCard className="profile-card">
        <div className="profile-card__avatar">
          <img src={analysis.profile.avatarUrl} alt={analysis.profile.name} />
        </div>
        <h1>{analysis.profile.name}</h1>
        <p>{analysis.profile.link}</p>
        <strong>{analysis.profile.level}</strong>
      </GlassCard>

      <div className="stats-grid">
        <StatCard label="Всего наборов" value={analysis.stats.totalPacks} />
        <StatCard label="Редкие наборы" value={analysis.stats.rarePacks} />
        <StatCard label="Потрачено ₽" value={analysis.stats.spentRub} />
        <StatCard label="Бесплатные" value={analysis.stats.freePacks} />
        <StatCard label="Платные" value={analysis.stats.paidPacks} />
        <StatCard label="Голоса ВКонтакте" value={analysis.stats.spentVotes} />
      </div>

      <GlassCard className="share-panel">
        <div className="section-head">
          <div>
            <span>Share system</span>
            <h2>Карточка коллекционера</h2>
          </div>
        </div>
        <div className="share-actions">
          <Button size="l" before={<Icon24ShareOutline />} loading={isExporting} onClick={() => exportCard(true)}>
            VK Stories
          </Button>
          <Button size="l" mode="secondary" before={<Icon24DownloadOutline />} loading={isExporting} onClick={() => exportCard(false)}>
            PNG
          </Button>
        </div>
        {shareStatus && <p className="share-status">{shareStatus}</p>}
        <div className="share-preview">
          <ShareCard analysis={analysis} ref={shareRef} />
        </div>
      </GlassCard>
    </div>
  );
}
