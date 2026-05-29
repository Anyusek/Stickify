import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { dynamics } from '../data/demo';
import type { AnalysisResult } from '../data/types';

type Props = {
  analysis: AnalysisResult;
};

export function StatsPage({ analysis }: Props) {
  return (
    <div className="page">
      <div className="page-title">
        <span>Статистика</span>
        <h1>Динамика коллекции</h1>
      </div>
      <div className="stats-grid">
        <StatCard label="Количество наборов" value={analysis.stats.totalPacks} />
        <StatCard label="Потраченные голоса" value={analysis.stats.spentVotes} />
        <StatCard label="Потраченные рубли" value={analysis.stats.spentRub} suffix=" ₽" />
      </div>
      <GlassCard className="chart-card">
        <h2>Рост наборов</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={dynamics}>
            <defs>
              <linearGradient id="packGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DA3FF" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#0077FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
            <XAxis dataKey="month" stroke="#8fb7ff" tickLine={false} axisLine={false} />
            <YAxis stroke="#8fb7ff" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: '#101938', border: '1px solid rgba(77,163,255,.25)', borderRadius: 16 }} />
            <Area type="monotone" dataKey="packs" stroke="#4DA3FF" strokeWidth={3} fill="url(#packGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
      <GlassCard className="chart-card">
        <h2>Голоса и рубли</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={dynamics}>
            <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
            <XAxis dataKey="month" stroke="#8fb7ff" tickLine={false} axisLine={false} />
            <YAxis stroke="#8fb7ff" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: '#101938', border: '1px solid rgba(77,163,255,.25)', borderRadius: 16 }} />
            <Bar dataKey="votes" fill="#0077FF" radius={[10, 10, 0, 0]} />
            <Bar dataKey="rub" fill="#4DA3FF" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
