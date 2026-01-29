import { Instagram, Send, Mail } from 'lucide-react';

export const Contacts = () => {
  return (
    <section className="w-full bg-[#FDFCF8] min-h-screen">
      {/* Отступ под хедер */}
      <div className="h-[80px] w-full"></div>

      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-stone-800 mb-8 tracking-tight">
          Связаться со мной
        </h2>

        <p className="text-stone-500 font-light leading-relaxed mb-16 max-w-xl mx-auto text-sm md:text-base">
          Я всегда открыт для новых проектов и творческих съемок. 
          Напишите мне в удобном для вас мессенджере, и мы обсудим вашу идею.
        </p>

        {/* Сетка контактов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Email */}
          <a 
            href="mailto:DenisBl@yandex.ru" 
            className="group flex flex-col items-center"
          >
            <div className="mb-4 p-4 rounded-full border border-stone-100 bg-white shadow-sm transition-all duration-500 group-hover:border-stone-800 group-hover:shadow-md">
              <Mail size={22} strokeWidth={1} className="text-stone-400 transition-colors group-hover:text-stone-800" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Email</p>
            <span className="text-stone-800 font-light tracking-wide group-hover:text-stone-500 transition-colors">
              DenisBl@yandex.ru
            </span>
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/DenBlack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="mb-4 p-4 rounded-full border border-stone-100 bg-white shadow-sm transition-all duration-500 group-hover:border-stone-800 group-hover:shadow-md">
              <Send size={22} strokeWidth={1} className="text-stone-400 transition-colors group-hover:text-stone-800" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Telegram</p>
            <span className="text-stone-800 font-light tracking-wide group-hover:text-stone-500 transition-colors">
              @DenBlack
            </span>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="mb-4 p-4 rounded-full border border-stone-100 bg-white shadow-sm transition-all duration-500 group-hover:border-stone-800 group-hover:shadow-md">
              <Instagram size={22} strokeWidth={1} className="text-stone-400 transition-colors group-hover:text-stone-800" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">Instagram</p>
            <span className="text-stone-800 font-light tracking-wide group-hover:text-stone-500 transition-colors">
              @Den_Photo
            </span>
          </a>

        </div>

        {/* Дополнительная фраза внизу */}
        <div className="mt-24 pt-12 border-t border-stone-100">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300">
            Based in Moscow & Worldwide
          </p>
        </div>
      </div>
    </section>
  );
};
