import { useMemo, useState } from 'react';
import { Input, SegmentedControl } from '@vkontakte/vkui';
import { Icon24Search } from '@vkontakte/icons';
import { motion } from 'framer-motion';
import { leaderboard } from '../data/demo';
import { formatNumber } from '../utils/format';

type TopMode = 'packs' | 'votes' | 'rare';

export function TopsPage() {
  const [mode, setMode] = useState<TopMode>('packs');
  const [query, setQuery] = useState('');

  const users = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => {
      if (mode === 'votes') return b.spentVotes - a.spentVotes;
      if (mode === 'rare') return b.rarePacks - a.rarePacks;
      return b.totalPacks - a.totalPacks;
    });

    return sorted.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
  }, [mode, query]);

  return (
    <div className="page">
      <div className="page-title">
        <span>TOP-1000</span>
        <h1>Рейтинги коллекционеров</h1>
      </div>
      <div className="tops-controls">
        <SegmentedControl
          name="tops"
          value={mode}
          onChange={(value) => setMode(value as TopMode)}
          options={[
            { label: 'Наборы', value: 'packs' },
            { label: 'Голоса VK', value: 'votes' },
            { label: 'Редкие', value: 'rare' }
          ]}
        />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по пользователям" after={<Icon24Search />} />
      </div>
      <div className="leaderboard">
        {users.map((user, index) => {
          const value = mode === 'votes' ? user.spentVotes : mode === 'rare' ? user.rarePacks : user.totalPacks;
          return (
            <motion.article
              className={`leader-card ${index < 3 ? 'is-top' : ''}`}
              key={user.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.025 }}
            >
              <div className="leader-card__rank">{index < 3 ? '♕' : user.rank}</div>
              <img src={user.avatarUrl} alt="" />
              <div>
                <h3>{user.name}</h3>
                <p>id{user.id}</p>
              </div>
              <strong>{formatNumber(value)}</strong>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
