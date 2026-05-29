import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@vkontakte/vkui';
import {
  Icon24ArrowDownOutline,
  Icon24CameraOutline,
  Icon24CrownOutline,
  Icon24CubeBoxOutline,
  Icon24StatisticsOutline,
  Icon24UsersOutline,
  Icon28DiamondOutline,
  Icon28ChevronLeftOutline,
  Icon28ChevronRightOutline
} from '@vkontakte/icons';
import { Mascot } from './Mascot';
import welcomeCharacter from '../../Stickers/Stickify_character4.png';
import featuresCharacter from '../../Stickers/Stickify_character5.png';
import howItWorksCharacter from '../../Stickers/Stickify_character6.png';
import finalCharacter from '../../Stickers/Stickify_character7.png';

type Props = {
  onFinish: () => void;
};

const features = [
  { title: 'Анализ коллекции', icon: Icon24CubeBoxOutline },
  { title: 'Premium наборы', icon: Icon28DiamondOutline },
  { title: 'TOP-1000 коллекционеров', icon: Icon24CrownOutline },
  { title: 'Share-карточки', icon: Icon24CameraOutline },
  { title: 'Голоса VK', icon: Icon24UsersOutline },
  { title: 'Красивая статистика', icon: Icon24StatisticsOutline }
];

const previews = [
  { title: 'Главная', metric: '186 наборов', note: 'анализ по ссылке' },
  { title: 'Топы', metric: 'TOP-1000', note: 'рейтинги коллекционеров' },
  { title: 'Профиль', metric: 'Neon Collector', note: 'уровень и прогресс' },
  { title: 'Share Cards', metric: '1080x1920', note: 'истории и PNG' }
];

export function Onboarding({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);
  const maxStep = 4;

  const progress = useMemo(() => ((step + 1) / (maxStep + 1)) * 100, [step]);

  function next() {
    if (step === maxStep) {
      onFinish();
      return;
    }
    setStep((current) => current + 1);
  }

  function prevPreview() {
    setPreviewIndex((current) => (current === 0 ? previews.length - 1 : current - 1));
  }

  function nextPreview() {
    setPreviewIndex((current) => (current + 1) % previews.length);
  }

  return (
    <div className="onboarding">
      <div className="onboarding__orb onboarding__orb--one" />
      <div className="onboarding__orb onboarding__orb--two" />
      <FloatingStickers />
      <div className="onboarding__progress" aria-hidden>
        <motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          className="onboarding__screen"
          key={step}
          initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {step === 0 && (
            <div className="onboarding-hero">
              <motion.img
                className="onboarding-hero__character"
                src={welcomeCharacter}
                alt=""
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { duration: 0.42 }, scale: { duration: 0.42 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
              />
              <h1>Добро пожаловать в Stickify</h1>
              <p>Приложение для анализа коллекции стикеров ВКонтакте</p>
            </div>
          )}

          {step === 1 && (
            <div className="onboarding-stack">
              <motion.img
                className="onboarding-stack__character"
                src={featuresCharacter}
                alt=""
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { duration: 0.42 }, scale: { duration: 0.42 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
              />
              <div className="onboarding-title">
                <span>Возможности</span>
                <h2>Всё для коллекционера</h2>
              </div>
              <div className="feature-grid">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.article
                      className="feature-card"
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.9, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.055 }}
                    >
                      <Icon />
                      <span>{feature.title}</span>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="onboarding-stack">
              <motion.img
                className="onboarding-stack__character"
                src={howItWorksCharacter}
                alt=""
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { duration: 0.42 }, scale: { duration: 0.42 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
              />
              <div className="onboarding-title">
                <span>Как это работает</span>
                <h2>Три простых шага</h2>
              </div>
              <div className="how-list">
                {['Вставь ссылку VK', 'Мы анализируем коллекцию', 'Получай красивую статистику'].map((item, index) => (
                  <div className="how-step" key={item}>
                    <motion.div
                      className="how-step__badge"
                      animate={{ boxShadow: ['0 0 14px rgba(77,163,255,.3)', '0 0 30px rgba(77,163,255,.58)', '0 0 14px rgba(77,163,255,.3)'] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {index + 1}
                    </motion.div>
                    <strong>{item}</strong>
                    {index < 2 && (
                      <motion.div className="how-step__arrow" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                        <Icon24ArrowDownOutline />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="onboarding-stack">
              <div className="onboarding-title">
                <span>Preview</span>
                <h2>Экраны приложения</h2>
              </div>
              <div className="preview-carousel">
                <button type="button" onClick={prevPreview} aria-label="Предыдущий экран">
                  <Icon28ChevronLeftOutline />
                </button>
                <AnimatePresence mode="wait">
                  <motion.article
                    className="preview-card"
                    key={previewIndex}
                    initial={{ opacity: 0, x: 48, rotateY: 18 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -48, rotateY: -18 }}
                    transition={{ duration: 0.28 }}
                  >
                    <span>{previews[previewIndex].title}</span>
                    <strong>{previews[previewIndex].metric}</strong>
                    <p>{previews[previewIndex].note}</p>
                    <div className="preview-card__mock">
                      <i />
                      <i />
                      <i />
                    </div>
                  </motion.article>
                </AnimatePresence>
                <button type="button" onClick={nextPreview} aria-label="Следующий экран">
                  <Icon28ChevronRightOutline />
                </button>
              </div>
              <div className="preview-dots">
                {previews.map((preview, index) => (
                  <button
                    className={index === previewIndex ? 'is-active' : ''}
                    key={preview.title}
                    onClick={() => setPreviewIndex(index)}
                    type="button"
                    aria-label={preview.title}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="onboarding-hero onboarding-hero--final">
              <motion.img
                className="onboarding-hero__character"
                src={finalCharacter}
                alt=""
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { duration: 0.42 }, scale: { duration: 0.42 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
              />
              <h1>Всё готово</h1>
              <p>Начни анализ своей коллекции стикеров VK</p>
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      <div className="onboarding__footer">
        <div className="onboarding__steps">
          {Array.from({ length: maxStep + 1 }).map((_, index) => (
            <span className={index === step ? 'is-active' : ''} key={index} />
          ))}
        </div>
        <Button size="l" stretched onClick={next}>
          {step === maxStep ? 'Приступить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}

function FloatingStickers() {
  return (
    <div className="floating-stickers" aria-hidden>
      {[1, 64, 125, 318].map((id, index) => (
        <motion.img
          src={`https://vk.com/sticker/1-${id}-128`}
          alt=""
          key={id}
          className={`floating-stickers__item floating-stickers__item--${index + 1}`}
          animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3.4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
