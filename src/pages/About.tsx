export const About = () => {
  return (
    <section className="w-full bg-[#FDFCF8] min-h-screen">
      {/*Отступ под хедер (пустой блок высотой 80px) */}
      <div className="h-[80px] w-full"></div>

      {/*Основной контейнер с ограничением ширины и центровкой */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-20">
        
        {/* Сетка: на мобильном в один столбец, на ПК — в два */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* ЛЕВАЯ КОЛОНКА: Фото автора */}
          <div className="relative aspect-[3/4] w-full overflow-hidden shadow-sm">
            <img 
              src="/about-me.jpg" 
              alt="Денис Блэк"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* ПРАВАЯ КОЛОНКА: Текст */}
          <div className="flex flex-col space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800">
              Денис Блэк
            </h2>
            
            {/* Тонкая разделительная линия */}
            <div className="h-[1px] w-16 bg-stone-300"></div>
            
            {/* Блок с текстом*/}
            <div className="font-light text-stone-600 leading-relaxed space-y-4">
              <p>
                Фотография для меня — это не просто нажатие кнопки затвора. Это способ остановить мгновение, поймать свет и сохранить те чувства, которые мы проживаем здесь и сейчас.
              </p>
              <p>
                Я верю в искренность, естественность и эстетику повседневности. Мой стиль — это сочетание мягкого света, минимализма и глубоких эмоций.
              </p>
              <p>
                Более 5 лет я помогаю людям увидеть свою красоту через объектив камеры, создавая историю, которую хочется пересматривать.
              </p>
            </div>

            {/* Ссылки на соцсети */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                Следите за мной в соцсетях
              </p>
              <div className="flex gap-6 text-stone-600">
                <a href="#" className="hover:text-stone-400 transition-colors">Instagram</a>
                <a href="" target="_blank" rel="noopener noreferrer"className="hover:text-stone-400 transition-colors">
                    VK
                </a>
                <a href="#" className="hover:text-stone-400 transition-colors">Pinterest</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
