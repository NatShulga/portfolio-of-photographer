import { useState, useEffect, useRef } from 'react';
import { type Category } from '../data/photos';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface DBPhoto {
  id: string;
  title: string;
  category: string;
  image_url: string;
  date?: string;
}

export const Portfolio = () => {
  const [dbPhotos, setDbPhotos] = useState<DBPhoto[]>([]); // Инициализация пустым массивом
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = !!localStorage.getItem('token');
    setIsAdmin(!!token);
  }, []);

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        // Указываем полный путь для локальной разработки, если нужно
        const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
        const res = await axios.get(`${API_URL}/api/photos`);
        
        // КРИТИЧЕСКАЯ ПРАВКА: проверяем, что пришел именно массив
        if (Array.isArray(res.data)) {
          setDbPhotos(res.data);
        } else {
          console.error('Сервер вернул не массив:', res.data);
          setDbPhotos([]); 
        }
      } catch (err) {
        console.error('Ошибка загрузки из БД:', err);
        setDbPhotos([]); // В случае ошибки сохраняем пустой массив, чтобы .filter не падал
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Intersection Observer (плавное появление)
  useEffect(() => {
    if (isLoading) return;
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
  }, [isLoading]);

  // Скролл вверх
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
    'wedding & love story',
    'individual',
    'family',
    'event',
    "children birthday",
    'street style',
  ];

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить это фото?')) return;
    
    const token = localStorage.getItem('token');
    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

    try {
      await axios.delete(`${API_URL}/api/photos/${id}`, {
        headers: {
          // ПЕРЕДАЕМ ТОКЕН ДЛЯ checkAuth
          'Authorization': token || ''
        }
      });
      setDbPhotos(prev => prev.filter(photo => photo.id !== id));
    } catch (err) {
      console.error('Ошибка удаления:', err);
      alert('Не удалось удалить фото. Возможно, сессия истекла.');
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FDFCF8] pt-32 pb-20">
      {/* Кнопка скролла */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-10 bottom-10 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm transition-all duration-500 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      <div className="mx-auto max-w-[1800px] px-8 md:px-24 lg:px-36">
        <h1 className="mb-8 text-center font-serif text-3xl tracking-[0.3em] text-stone-800 uppercase">
          Portfolio
        </h1>

        <nav className="mb-24 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <a key={cat} href={`#${cat}`} className="text-[11px] tracking-[0.2em] text-stone-400 uppercase transition-colors hover:text-stone-800">
              {cat.replace(/-/g, ' ')}
            </a>
          ))}
        </nav>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-stone-800"></div>
            <p className="mt-6 font-serif text-[10px] tracking-[0.3em] text-stone-400 uppercase">Loading Gallery...</p>
          </div>
        ) : (
          <div className="space-y-16 md:space-y-32">
            {categories.map((cat) => {
              // ПРОВЕРКА: Если dbPhotos не массив (защита от TypeError), возвращаем пустой массив
              const categoryPhotos = Array.isArray(dbPhotos) ? dbPhotos.filter((p) => p.category === cat) : [];

              return (
                <section key={cat} id={cat} className="portfolio-section translate-y-10 scroll-mt-32 opacity-0 transition-all duration-[1000ms] ease-out">
                  <div className="mx-4 mb-8 border-b border-stone-200 pb-2">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="order-2 flex items-center justify-between md:order-none md:contents">
                        <button onClick={() => handleManualScroll(cat, 'left')} className="cursor-pointer text-[10px] font-medium tracking-widest text-stone-500 uppercase hover:text-stone-900">← Prev</button>
                        <h2 className="mx-4 hidden flex-1 text-center font-serif text-xl tracking-widest text-stone-800 uppercase md:block">{cat.replace(/-/g, ' ')}</h2>
                        <button onClick={() => handleManualScroll(cat, 'right')} className="cursor-pointer text-[10px] font-medium tracking-widest text-stone-500 uppercase hover:text-stone-900">Next →</button>
                      </div>
                      <h2 className="order-1 text-center font-serif text-lg tracking-[0.2em] text-stone-800 uppercase md:hidden">{cat.replace(/-/g, ' ')}</h2>
                    </div>
                  </div>

                  <div ref={(el) => { scrollRefs.current[cat] = el; }} className="no-scrollbar flex flex-nowrap gap-8 overflow-x-auto scroll-smooth px-4 pb-4">
                    {categoryPhotos.map((photo) => (
                      <div key={photo.id} className="group relative w-[260px] flex-shrink-0">
                        <div onClick={() => setSelectedPhoto(photo.image_url)} className="relative isolate aspect-[4/5] overflow-hidden rounded-sm bg-stone-50 cursor-zoom-in">
                          <img src={photo.image_url} alt={photo.title} className="smooth-zoom h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-white/0 transition-colors duration-[2000ms] group-hover:bg-white/10" />
                        </div>
                        <div className="mt-4 flex items-center justify-between px-1 text-[10px] tracking-widest text-stone-500 uppercase">
                          <span className="text-stone-300">2026</span>
                          
                          {/* КНОПКА УДАЛЕНИЯ: видна только админу */}
                          {isAdmin && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(photo.id);
                              }}
                              className="cursor-pointer text-red-300 hover:text-red-500 transition-colors"
                            >
                              
                            </button>
                          )}
                        </div>   
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#FDFCF8]/10 p-4 backdrop-blur-[8px]"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="relative flex max-w-[75vw] md:max-w-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="group relative">
                <img src={selectedPhoto} alt="Full size" className="max-h-[80vh] w-auto rounded-sm border-[12px] border-white object-contain shadow-[0_40px_100px_rgba(0,0,0,0.15)] md:border-[16px]" />
                <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 rounded-sm border border-stone-100 bg-white px-3 py-1 text-[9px] tracking-widest text-stone-500 uppercase shadow-sm transition-all hover:bg-stone-50">Close [×]</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
