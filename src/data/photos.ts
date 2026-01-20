// 1. Определяем категорий
export type Category = 
  | 'wedding & love-story' 
  | 'individual' 
  | 'family' 
  | 'event' 
  | "children's birthday party" 
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
    src: '/assets/portfolio/wedding/ls1.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 11,
    src: '/assets/portfolio/wedding/ls2.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 111,
    src: '/assets/portfolio/wedding/wed.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 1111,
    src: '/assets/portfolio/wedding/wed1.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 11111,
    src: '/assets/portfolio/wedding/wed2.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 111111,
    src: '/assets/portfolio/wedding/wed3.jpg',
    category: 'wedding & love-story',
    alt: 'wedding & love-story'
  },
  {
    id: 2,
    src: '/assets/portfolio/individ/girls.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 22,
    src: '/assets/portfolio/individ/kid.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 222,
    src: '/assets/portfolio/individ/medium-shot-woman-with-delicious-food.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 2222,
    src: '/assets/portfolio/individ/port mmen.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 22222,
    src: '/assets/portfolio/individ/portrait-smiley-woman-posing-outdoors.jpg',
    category: 'individual',
    alt: 'individual'
  },
  {
    id: 222222,
    src: '/assets/portfolio/individ/1.jpg',
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
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 55,
    src: '/assets/portfolio/children-birthday/2.jpg',
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 555,
    src: '/assets/portfolio/children-birthday/3.jpg',
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 5555,
    src: '/assets/portfolio/children-birthday/4.jpg',
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 55555,
    src: '/assets/portfolio/children-birthday/5.jpg',
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 555555,
    src: '/assets/portfolio/children-birthday/6.jpg',
    category: "children's birthday party",
    alt: "children's birthday party",
  },
  {
    id: 6,
    src: '/assets/portfolio/street/1.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 66,
    src: '/assets/portfolio/street/2.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 666,
    src: '/assets/portfolio/street/3.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 6666,
    src: '/assets/portfolio/street/4.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 66666,
    src: '/assets/portfolio/street/5.jpg',
    category: "street-style",
    alt: "street-style",
  },
    {
    id: 666666,
    src: '/assets/portfolio/street/6.jpg',
    category: "street-style",
    alt: "street-style",
  },
  {
    id: 6666666,
    src: '/assets/portfolio/street/7.jpg',
    category: "street-style",
    alt: "street-style",
  },
];
