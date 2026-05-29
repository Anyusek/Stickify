import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '@vkontakte/vkui';
import { Icon24ArrowUpRightOutline, Icon24Link, Icon24Users, Icon28ChevronRightOutline } from '@vkontakte/icons';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import type { AnalysisResult } from '../data/types';
import { analyzeCollection, pickFriend } from '../services/vk';
import heroCharacter from '../../Stickers/Stickify_character3.png';

type Props = {
  analysis: AnalysisResult;
  onAnalyzed: (analysis: AnalysisResult) => void;
  onOpenCollection: () => void;
};

export function HomePage({ analysis, onAnalyzed, onOpenCollection }: Props) {
  const [profileUrl, setProfileUrl] = useState('https://vk.com/id123456');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  async function runAnalysis(nextUrl = profileUrl) {
    setIsAnalyzing(true);
    const result = await analyzeCollection(nextUrl);
    onAnalyzed({
      ...result,
      profile: {
        ...result.profile,
        avatarUrl: analysis.profile.avatarUrl
      }
    });
    setHasAnalyzed(true);
    setIsAnalyzing(false);
  }

  async function handleFriendPick() {
    const friendUrl = await pickFriend();
    if (friendUrl) {
      setProfileUrl(friendUrl);
      await runAnalysis(friendUrl);
    }
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__copy">
          <motion.img
            src="/icons/Stickify.png"
            alt=""
            className="hero__logo"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <h1>Узнай коллекцию стикеров ВКонтакте у своего друга</h1>
          <p>Вставь ссылку на профиль или добавь друга, и мы соберём всю статистику</p>
          <div className="hero__input">
            <Input
              aria-label="Ссылка на профиль VK"
              value={profileUrl}
              onChange={(event) => setProfileUrl(event.target.value)}
              placeholder="https://vk.com/id123456"
              after={
                <button
                  className="input-action-button"
                  type="button"
                  aria-label="Запустить анализ"
                  disabled={isAnalyzing}
                  onClick={() => runAnalysis()}
                >
                  <Icon24ArrowUpRightOutline />
                </button>
              }
            />
          </div>
          <div className="hero__actions">
            <Button size="l" mode="primary" before={<Icon24Link />} loading={isAnalyzing} onClick={() => runAnalysis()}>
              Вставить ссылку
            </Button>
            <Button size="l" mode="secondary" before={<Icon24Users />} onClick={handleFriendPick}>
              Добавить друга
            </Button>
          </div>
        </div>
        <motion.img
          className="hero__character"
          src={heroCharacter}
          alt=""
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ opacity: { duration: 0.45 }, scale: { duration: 0.45 }, y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } }}
        />
      </section>

      <GlassCard className={`analysis-panel ${isAnalyzing ? 'is-loading' : ''}`}>
        <div className="section-head">
          <div>
            <span>После анализа</span>
            <h2>{hasAnalyzed ? 'Коллекция собрана' : 'Быстрый превью-отчёт'}</h2>
          </div>
          <button className="icon-link" type="button" onClick={onOpenCollection} aria-label="Открыть коллекцию">
            <Icon28ChevronRightOutline />
          </button>
        </div>
        <div className="stats-grid">
          <StatCard label="Количество наборов" value={analysis.stats.totalPacks} />
          <StatCard label="Редкие наборы" value={analysis.stats.rarePacks} />
          <StatCard label="Бесплатные" value={analysis.stats.freePacks} />
          <StatCard label="Платные" value={analysis.stats.paidPacks} />
          <StatCard label="Потрачено рублей" value={analysis.stats.spentRub} suffix=" ₽" />
          <StatCard label="Голоса VK" value={analysis.stats.spentVotes} />
        </div>
      </GlassCard>
    </div>
  );
}
