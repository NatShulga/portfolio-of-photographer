export const Contacts = () => {
  return (
    <section className="w-full bg-[#FDFCF8] min-h-screen">
      {/*Отступ под хедер*/}
      <div className="h-[80px] w-full"></div>

      {/*Основной контейнер — делаем его уже (max-w-3xl), чтобы текст не расплывался */}
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        
        <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-8">
          Связаться со мной
        </h2>

        <p className="text-stone-600 font-light leading-relaxed mb-12">
          Я всегда открыт для новых проектов и творческих съемок. 
          Напишите мне в удобном для вас мессенджере, и мы обсудим вашу идею.
        </p>

        {/*Список контактов */}
        <div className="flex flex-col space-y-8 items-center">
          
          {/* Email */}
          <div className="group">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Email</p>
            <a href="mailto:karuna@yandex.ru" className="text-xl text-stone-800 hover:text-stone-400 transition-colors">
              DenisBl@yandex.ru
            </a>
          </div>

          {/* телега */}
          <div className="group">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Telegram</p>
            <a href="https://t.me/yourname" target="_blank" className="text-xl text-stone-800 hover:text-stone-400 transition-colors">
              @DenBlack
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
