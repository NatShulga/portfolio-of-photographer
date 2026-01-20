import { useState, useEffect, useRef } from 'react';
import { portfolioData, type Category } from '../data/photos';

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
    'wedding & love-story', 'individual', 'family', 'event', "children's birthday party", 'street-style'
  ];

  return (
    <main className="min-h-screen bg-[#FDFCF8] pt-32 pb-20 relative">
      {/*скролл вверх */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm transition-all duration-500 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m18 15-6-6-6 6"/></svg>
      </button>

      <div className="mx-auto max-w-[1800px] px-8 md:px-24 lg:px-36">
        <h1 className="mb-8 text-center font-serif text-3xl tracking-[0.3em] text-stone-800 uppercase">Portfolio</h1>

        {/* НАВИГАЦИЯ */}
        <nav className="mb-24 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <a key={cat} href={`#${cat}`} className="text-[11px] tracking-[0.2em] text-stone-400 uppercase hover:text-stone-800 transition-colors">
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
                className="portfolio-section opacity-0 translate-y-10 transition-all duration-[1000ms] ease-out scroll-mt-32"
              >
                {/* заголовок и кнопки */}
                <div className="mx-4 mb-8 border-b border-stone-200 pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Группа кнопок для мобильных будет в одной строке под/над заголовком */}
                  <div className="flex items-center justify-between md:contents order-2 md:order-none">
                    <button 
                      onClick={() => handleManualScroll(cat, 'left')}
                      className="text-[10px] tracking-widest text-stone-500 font-medium uppercase hover:text-stone-900 cursor-pointer"
                    >
                      ← Prev
                    </button>

                    <h2 className="hidden md:block font-serif text-xl tracking-widest text-stone-800 uppercase text-center flex-1 mx-4">
                      {cat.replace(/-/g, ' ')}
                    </h2>

                    <button 
                      onClick={() => handleManualScroll(cat, 'right')}
                      className="text-[10px] tracking-widest text-stone-500 font-medium uppercase hover:text-stone-900 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>

                  {/* Заголовок для мобильных (центрированный) */}
                  <h2 className="md:hidden font-serif text-lg tracking-[0.2em] text-stone-800 uppercase text-center order-1">
                    {cat.replace(/-/g, ' ')}
                  </h2>

                </div>
              </div>

                {/* галерея */}
                <div 
                  ref={(el) => { scrollRefs.current[cat] = el; }}
                  className="no-scrollbar flex flex-nowrap gap-8 overflow-x-auto scroll-smooth px-4 pb-4"
                >
                  {categoryPhotos.map((photo) => (
                    <div 
                      key={photo.id} 
                      className="group relative w-[260px] flex-shrink-0 cursor-zoom-in"
                      onClick={() => setSelectedPhoto(photo.src)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-100 isolate">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="h-full w-full object-cover smooth-zoom"
                        />
                        <div className="absolute inset-0 bg-white/0 transition-colors duration-[2000ms] group-hover:bg-white/10" />
                      </div>
                      <div className="mt-4 flex items-center justify-between px-1 text-[10px] uppercase tracking-widest text-stone-500">
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
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-xl bg-stone-900/95 backdrop-blur-md p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-h-full max-w-full flex flex-col items-center">
            <img 
              src={selectedPhoto} 
              alt="Full size" 
              className="max-h-[85vh] w-auto object-contain shadow-[0_20px_50px_rgba(0,0,0,0.1)] shadow-2xl rounded-sm transition-transform duration-500" 
            />
            <button className="mt-4 text-stone-400 text-white/50 hover:text-white uppercase text-[10px] tracking-[0.2em]">
            [×]
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
