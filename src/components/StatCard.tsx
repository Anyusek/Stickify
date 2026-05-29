import { AnimatedCounter } from './AnimatedCounter';

type Props = {
  label: string;
  value: number;
  suffix?: string;
};

export function StatCard({ label, value, suffix }: Props) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>
        <AnimatedCounter value={value} suffix={suffix} />
      </strong>
    </div>
  );
}
