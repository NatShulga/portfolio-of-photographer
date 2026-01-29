export const Hero = () => {
  return (
    <section className="w-full bg-[#FDFCF8]">
      {/* Вместо mt-[80px] используем блок-распорку, чтобы фото не гуляло */}
      <div className="h-[80px] w-full"></div>
      
      {/* Контейнер-ограничитель (max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
        
        {/* меняем формат: 
            Вместо aspect-[16/9] ставим md:aspect-[21/9] (более узкое) 
            Либо h-[400px] md:h-[550px] для жесткого контроля высоты */}
        <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden shadow-sm">
          <img 
            src="/hero-photo-desktop.jpg" 
            alt="Денис Блэк" 
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] hidden md:block"
          />
        
        <img 
            src="/hero-photo-desktop — vertical.jpg" 
            alt="Денис Блэк" 
            className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
            //<div className="relative w-full h-[450px] landscape:h-[80vh] md:h-[600px] overflow-hidden shadow-sm"> раскомментить на этапе проверки адаптива на телефоне
        />
        
          {/* Привязка текста в контейнеру фото, чтобы не гулял*/}
          <div className="absolute inset-0 flex items-end justify-start p-8 md:p-16">
            <div className="text-left">
              <h1 className="mb-2 font-serif text-3xl md:text-5xl text-white drop-shadow-md">
                Денис Блэк
              </h1>
              <div className="mb-3 h-[2px] w-12 bg-white/40"></div>
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-white/90 uppercase font-light">
                Фотограф | Эстетика | Память
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
