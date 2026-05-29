import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = '' }: Props) {
  return (
    <motion.section
      className={`glass-card ${className}`}
      whileHover={{ y: -3, borderColor: 'rgba(77, 163, 255, 0.42)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.section>
  );
}
