import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <motion.img
        src="/icons/Stickify.png"
        alt="Stickify"
        className="loading-logo"
        animate={{
          scale: [1, 1.06, 1],
          filter: [
            'drop-shadow(0 0 18px #0077ff)',
            'drop-shadow(0 0 36px #4da3ff)',
            'drop-shadow(0 0 18px #0077ff)'
          ]
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="loading-title">Stickify</div>
      <div className="loading-bar">
        <motion.span animate={{ x: ['-100%', '120%'] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
    </div>
  );
}
