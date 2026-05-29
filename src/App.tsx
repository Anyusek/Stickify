import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon28HomeOutline, Icon28StatisticsOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CrownOutline, Icon28GridLayoutOutline } from '@vkontakte/icons';
import { BottomNav } from './components/BottomNav';
import { LoadingScreen } from './components/LoadingScreen';
import { demoAnalysis } from './data/demo';
import type { AnalysisResult, TabId } from './data/types';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { TopsPage } from './pages/TopsPage';
import { StatsPage } from './pages/StatsPage';
import { ProfilePage } from './pages/ProfilePage';
import { authorizeVk, initVk } from './services/vk';
import { completeOnboarding, hasCompletedOnboarding } from './services/onboarding';
import { Onboarding } from './components/Onboarding';

const tabs = [
  { id: 'home', label: 'Главная', icon: Icon28HomeOutline },
  { id: 'collection', label: 'Коллекция', icon: Icon28GridLayoutOutline },
  { id: 'tops', label: 'Топы', icon: Icon28CrownOutline },
  { id: 'stats', label: 'Статистика', icon: Icon28StatisticsOutline },
  { id: 'profile', label: 'Профиль', icon: Icon28UserCircleOutline }
] satisfies Array<{ id: TabId; label: string; icon: typeof Icon28HomeOutline }>;

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [analysis, setAnalysis] = useState<AnalysisResult>(demoAnalysis);
  const [isBooting, setIsBooting] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => !hasCompletedOnboarding());

  useEffect(() => {
    let isMounted = true;

    async function boot() {
      try {
        await initVk();
        const vkProfile = await authorizeVk();
        if (vkProfile && isMounted) {
          setAnalysis((current) => ({ ...current, profile: vkProfile }));
        }
      } finally {
        window.setTimeout(() => {
          if (isMounted) {
            setIsBooting(false);
          }
        }, 600);
      }
    }

    boot();

    return () => {
      isMounted = false;
    };
  }, []);

  const page = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return <HomePage analysis={analysis} onAnalyzed={setAnalysis} onOpenCollection={() => setActiveTab('collection')} />;
      case 'collection':
        return <CollectionPage analysis={analysis} />;
      case 'tops':
        return <TopsPage />;
      case 'stats':
        return <StatsPage analysis={analysis} />;
      case 'profile':
        return <ProfilePage analysis={analysis} />;
    }
  }, [activeTab, analysis]);

  if (isBooting) {
    return <LoadingScreen />;
  }

  if (showOnboarding) {
    return (
      <Onboarding
        onFinish={() => {
          completeOnboarding();
          setActiveTab('home');
          setShowOnboarding(false);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      <div className="bg-aurora" />
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav items={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
