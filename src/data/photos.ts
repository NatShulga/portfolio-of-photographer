// 1. Определяем категорий
export type Category = 
  | 'wedding & love-story' 
  | 'individual' 
  | 'family' 
  | 'event' 
  | "children-birthday" 
  | "street-style";

// 2. Описываем структуру одной фотографии
export interface Photo {
  id: number;
  src: string; // Путь к файлу
  category: Category; // Категория из списка выше
  alt?: string;         // Описание (необязательно)
}

// 3. Создаем сам массив данных
export const portfolioData: Photo[] = [
  {
    id: 1,
    src: '/assets/portfolio/wedding & love-story/ls1.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 11,
    src: '/assets/portfolio/wedding & love-story/ls2.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 111,
    src: '/assets/portfolio/wedding & love-story/wed.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 1111,
    src: '/assets/portfolio/wedding & love-story/wed1.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 11111,
    src: '/assets/portfolio/wedding & love-story/wed2.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 111111,
    src: '/assets/portfolio/wedding & love-story/wed3.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 2,
    src: '/assets/portfolio/individual/girls.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 22,
    src: '/assets/portfolio/individual/kid.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 222,
    src: '/assets/portfolio/individual/medium-shot-woman-with-delicious-food.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 2222,
    src: '/assets/portfolio/individual/port mmen.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 22222,
    src: '/assets/portfolio/individual/portrait-smiley-woman-posing-outdoors.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 222222,
    src: '/assets/portfolio/individual/1.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 3,
    src: '/assets/portfolio/event/dev.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 33,
    src: '/assets/portfolio/event/hb.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 333,
    src: '/assets/portfolio/event/hb1.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 3333,
    src: '/assets/portfolio/event/side-view-kids-learning-sunday-school.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 33333,
    src: '/assets/portfolio/event/www.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 333333,
    src: '/assets/portfolio/event/1.jpg',
    category: 'event',
    alt: 'event'
  },
  {
    id: 4,
    src: '/assets/portfolio/family/1.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 44,
    src: '/assets/portfolio/family/2.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 444,
    src: '/assets/portfolio/family/3.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 4444,
    src: '/assets/portfolio/family/4.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 44444,
    src: '/assets/portfolio/family/5.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 444444,
    src: '/assets/portfolio/family/6.jpg',
    category: 'family',
    alt: 'family'
  },
  {
    id: 5,
    src: '/assets/portfolio/children-birthday/1.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 55,
    src: '/assets/portfolio/children-birthday/2.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 555,
    src: '/assets/portfolio/children-birthday/3.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 5555,
    src: '/assets/portfolio/children-birthday/4.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 55555,
    src: '/assets/portfolio/children-birthday/5.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 555555,
    src: '/assets/portfolio/children-birthday/6.jpg',
    category: "children-birthday",
    alt: "children-birthday",
  },
  {
    id: 6,
    src: '/assets/portfolio/street-style/1.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 66,
    src: '/assets/portfolio/street-style/2.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 666,
    src: '/assets/portfolio/street-style/3.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 6666,
    src: '/assets/portfolio/street-style/4.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 66666,
    src: '/assets/portfolio/street-style/5.jpg',
    category: "street-style",
    alt: "street-style",
  },
    {
    id: 666666,
    src: '/assets/portfolio/street-style/6.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 6666666,
    src: '/assets/portfolio/street-style/7.jpg',
    category: "street-style",
    alt: "street-style",
  },
];
