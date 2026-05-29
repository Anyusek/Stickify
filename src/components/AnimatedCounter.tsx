import { animate, useMotionValue, useTransform, motion } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
  value: number;
  suffix?: string;
};

export function AnimatedCounter({ value, suffix = '' }: Props) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => `${Math.round(latest).toLocaleString('ru-RU')}${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.9, ease: 'easeOut' });
    return controls.stop;
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}
