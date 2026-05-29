import { motion } from 'framer-motion';

type Props = {
  mood?: 'happy' | 'wow' | 'empty';
  role?: 'hero' | 'sheep' | 'blue';
};

export function Mascot({ mood = 'happy', role = 'hero' }: Props) {
  return (
    <motion.div
      className={`mascot mascot--${mood} mascot--${role}`}
      animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <div className="mascot__hair" />
      <div className="mascot__face">
        <span />
        <span />
        <b />
      </div>
      <div className="mascot__hood" />
      <div className="mascot__spark mascot__spark--one" />
      <div className="mascot__spark mascot__spark--two" />
    </motion.div>
  );
}
