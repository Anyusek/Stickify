import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import type { TabId } from '../data/types';

type NavItem = {
  id: TabId;
  label: string;
  icon: ComponentType<{ width?: number; height?: number }>;
};

type Props = {
  items: NavItem[];
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export function BottomNav({ items, activeTab, onChange }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            className={`bottom-nav__item ${isActive ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => onChange(item.id)}
            type="button"
          >
            {isActive && <motion.span className="bottom-nav__glow" layoutId="active-tab" />}
            <Icon width={25} height={25} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
