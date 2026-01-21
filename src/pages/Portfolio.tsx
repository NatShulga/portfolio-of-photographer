import { useState, useEffect, useRef } from 'react';
import { portfolioData, type Category } from '../data/photos';
import { motion, AnimatePresence } from 'framer-motion';

export const Portfolio = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Хранилище ссылок на галереи
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Эффект появления секций при скролле (Fade-in)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.portfolio-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Кнопка "Вверх"
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleManualScroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category];
    if (container) {
      const amount = direction === 'left' ? -500 : 500;
      container.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const categories: Category[] = [
    'wedding & love-story',
    'individual',
    'family',
    'event',
    "children's birthday party",
    'street-style',
  ];

  return (
    <main className="relative min-h-screen bg-[#FDFCF8] pt-32 pb-20">
      {/*скролл вверх */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-10 bottom-10 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm transition-all duration-500 ${
          showScrollTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      <div className="mx-auto max-w-[1800px] px-8 md:px-24 lg:px-36">
        <h1 className="mb-8 text-center font-serif text-3xl tracking-[0.3em] text-stone-800 uppercase">
          Portfolio
        </h1>

        {/* НАВИГАЦИЯ */}
        <nav className="mb-24 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="text-[11px] tracking-[0.2em] text-stone-400 uppercase transition-colors hover:text-stone-800"
            >
              {cat.replace(/-/g, ' ')}
            </a>
          ))}
        </nav>

        <div className="space-y-16 md:space-y-32">
          {categories.map((cat) => {
            const categoryPhotos = portfolioData.filter((p) => p.category === cat);

            return (
              <section
                key={cat}
                id={cat}
                className="portfolio-section translate-y-10 scroll-mt-32 opacity-0 transition-all duration-[1000ms] ease-out"
              >
                {/* заголовок и кнопки */}
                <div className="mx-4 mb-8 border-b border-stone-200 pb-2">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    {/* Группа кнопок для мобильных будет в одной строке под/над заголовком */}
                    <div className="order-2 flex items-center justify-between md:order-none md:contents">
                      <button
                        onClick={() => handleManualScroll(cat, 'left')}
                        className="cursor-pointer text-[10px] font-medium tracking-widest text-stone-500 uppercase hover:text-stone-900"
                      >
                        ← Prev
                      </button>

                      <h2 className="mx-4 hidden flex-1 text-center font-serif text-xl tracking-widest text-stone-800 uppercase md:block">
                        {cat.replace(/-/g, ' ')}
                      </h2>

                      <button
                        onClick={() => handleManualScroll(cat, 'right')}
                        className="cursor-pointer text-[10px] font-medium tracking-widest text-stone-500 uppercase hover:text-stone-900"
                      >
                        Next →
                      </button>
                    </div>

                    {/* Заголовок для мобильных (центрированный) */}
                    <h2 className="order-1 text-center font-serif text-lg tracking-[0.2em] text-stone-800 uppercase md:hidden">
                      {cat.replace(/-/g, ' ')}
                    </h2>
                  </div>
                </div>

                {/* галерея */}
                <div
                  ref={(el) => {
                    scrollRefs.current[cat] = el;
                  }}
                  className="no-scrollbar flex flex-nowrap gap-8 overflow-x-auto scroll-smooth px-4 pb-4"
                >
                  {categoryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative w-[260px] flex-shrink-0 cursor-zoom-in"
                      onClick={() => setSelectedPhoto(photo.src)}
                    >
                      <div className="relative isolate aspect-[4/5] overflow-hidden rounded-sm bg-stone-100">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="smooth-zoom h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-white/0 transition-colors duration-[2000ms] group-hover:bg-white/10" />
                      </div>
                      <div className="mt-4 flex items-center justify-between px-1 text-[10px] tracking-widest text-stone-500 uppercase">
                        <p>{photo.alt || cat.replace(/-/g, ' ')}</p>
                        <span className="text-stone-300">2026</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* реализация LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // размытие с прозрачностью
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#FDFCF8]/10 p-4 backdrop-blur-[8px]"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="relative flex max-w-[75vw] md:max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()} // Чтобы клик по фото не закрывал его
            >
              <div className="group relative">
                <img
                  src={selectedPhoto}
                  alt="Full size"
                  className="max-h-[80vh] w-auto rounded-sm border-[12px] border-white object-contain shadow-[0_40px_100px_rgba(0,0,0,0.15)] md:border-[16px]"
                />

                {/* Кнопка закрытия прямо на фото (как на референсе) */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 rounded-sm border border-stone-100 bg-white/100 px-3 py-1 text-[9px] tracking-widest text-stone-500 uppercase shadow-sm backdrop-blur-md transition-all hover:bg-white"
                >
                  Close [×]
                </button>
              </div>

              {/* Дополнительная подпись под рамкой (опционально) */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-[10px] tracking-[0.4em] text-stone-400 uppercase"
              ></motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
