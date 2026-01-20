export const Services = () => {
  const pricePlans = [
    {
      title: "INDIVIDUAL",
      price: "15 000",
      duration: "1.5 - 2 часа",
      features: [
        "Помощь в подборе образа и локации",
        "50+ фотографий в авторской ретуши",
        "Закрытая онлайн-галерея на 3 месяца",
        "Готовность снимков до 14 дней"
      ]
    },
    {
      title: "WEDDING & LOVE",
      price: "20 000",
      duration: "2 часа",
      features: [
        "Консультация по позированию",
        "70+ фотографий в авторской ретуши",
        "Видео-backstage для Reels в подарок",
        "Готовность снимков до 10 дней"
      ]
    },
    {
      title: "EVENT",
      price: "25 000",
      duration: "3 часа",
      features: [
        "Разработка визуальной стратегии",
        "100+ исходников в день съемки",
        "30 готовых фото для ленты",
        "Срок хранения в облаке — 1 год"
      ]
    },
    {
      title: "FAMILY",
      price: "25 000",
      duration: "3 часа",
      features: [
      "Помощь в подборе образа и локации",
        "50+ фотографий в авторской ретуши",
        "Закрытая онлайн-галерея на 3 месяца",
        "Готовность снимков до 14 дней"
      ]
    },
    {
      title: "KIDS BIRTHDAY",
      price: "25 000",
      duration: "3 часа",
      features: [
       "Разработка визуальной стратегии",
        "100+ исходников в день съемки",
        "30 готовых фото для ленты",
        "Срок хранения в облаке — 1 год"
      ]
    }
  ];

  return (
    <section className="w-full bg-[#FDFCF8] min-h-screen pb-20">
      <div className="h-[80px] w-full"></div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Заголовок страницы */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">Услуги и стоимость</h2>
          <div className="w-12 h-[1px] bg-stone-400 mx-auto"></div>
        </div>

        {/* Сетка тарифов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pricePlans.map((plan) => (
            <div 
              key={plan.title} 
              className="flex flex-col border-t border-stone-200 pt-8 group hover:border-stone-800 transition-colors duration-500 text-center md:text-left"
            >
              {/* Название и цена */}
              <div className="mb-8">
                <h3 className="font-serif text-2xl text-stone-800 mb-2">{plan.title}</h3>
                <p className="text-stone-400 text-sm tracking-widest uppercase mb-4">{plan.duration}</p>
                <p className="text-2xl text-stone-800 font-light italic">от {plan.price} ₽</p>
              </div>

              {/* Список опций */}
              <ul className="flex-grow space-y-4 mb-10 flex flex-col items-center md:items-start">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-stone-600 font-light leading-relaxed flex items-start ">
                    <span className="mr-2 text-stone-300">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Кнопка записи (пока просто ссылка) */}
              <button className="w-full py-4 border border-stone-800 text-xs uppercase tracking-[0.2em] hover:bg-stone-800 hover:text-white transition-all duration-300">
                Забронировать
              </button>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-24 text-center border-t border-stone-100 pt-12">
          <p className="text-stone-400 text-xs uppercase tracking-widest">
            Аренда студии и услуги визажиста оплачиваются отдельно
          </p>
        </div>
      </div>
    </section>
  );
};
