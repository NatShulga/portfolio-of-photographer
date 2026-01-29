import { Link } from 'react-router-dom';

export const FeaturedWorks = () => {
  // Выносим данные в массив
  const featuredItems = [
    {
      id: '01',
      category: 'wedding & love-story',
      title: 'WEDDING & LOVE',
      src: '/wedding.jpg',
      gridClass: 'md:col-span-1 md:row-span-2', // Высокое фото
    },
    {
      id: '02',
      category: 'individual',
      title: 'INDIVIDUAL',
      src: '/individual.jpg',
      gridClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: '03',
      category: 'event',
      title: 'EVENTS',
      src: '/event.jpg',
      gridClass: 'md:col-span-2 md:row-span-1', // Широкое фото
    },
    {
      id: '04',
      category: 'family',
      title: 'FAMILY',
      src: '/family.jpg',
      gridClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: '05',
      category: "children's birthday party",
      title: 'KIDS BIRTHDAY',
      src: '/kids-b.jpg',
      gridClass: 'md:col-span-2 md:row-span-1',
    },
  ];

  return (
    <section className="md: bg-[#FDFCF8] px-4 py-5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 mb-10 text-center md:mb-10">
          <h2 className="text-[15px] tracking-[0.4em] text-stone-400 uppercase">Gallery</h2>
        </div>

        {/* Сетка */}
        <div className="grid auto-rows-[250px] grid-cols-1 gap-2 md:grid-cols-4 md:gap-4">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              to={`/portfolio?category=${item.category}`}
              className={`group flex flex-col ${item.gridClass}`}
            >
              {/* Контейнер для фото */}
              <div className="mb-2 flex-grow overflow-hidden bg-stone-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Подпись под фото */}
              <div className="flex items-baseline justify-between border-b border-stone-100 pb-2">
                <span className="text-[10px] font-light text-stone-600">{item.id}</span>
                <h3 className="text-[12px] tracking-[0.2em] text-stone-600 uppercase transition-colors group-hover:text-black">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-13 text-center">
          <Link
            to="/portfolio"
            className="inline-block border border-stone-200 px-12 py-4 text-[13px] tracking-[0.3em] text-stone-500 uppercase transition-all duration-500 hover:bg-stone-800 hover:text-white"
          >
            View all works
          </Link>
        </div>
      </div>
    </section>
  );
};
