// 1. Тип для отдельной фотографии
export interface Photo {
  id: string;
  url: string;
  alt?: string;      // Опционально: описание для SEO и доступности
  width?: number;    // Для правильного отображения в сетке (Masonry)
  height?: number;
}

// 2. Тип для Альбома (категории в портфолио)
export interface Album {
  id: string;
  title: string;
  description: string;
  coverUrl: string;       // Обложка альбома
  category: 'family' | 'individual' | 'wedding & love story' | "children's birthday party" | 'event' ; // Строгие категории
  photos: Photo[]; // Массив фоточек
}

// 3. Тип для Пакета услуг (Pricing)
export interface PricePackage {
  id: string;
  name: string;
  price: string;          // Можно строкой (напр. "15 000 ₽")
  duration: string;       // Напр. "2 часа съемки"
  features: string[];     // Список того, что входит (ретушь, количество фото и т.д.)
  isPopular?: boolean;    // Для выделения карточки визуально
}

// 4. Тип для Отзыва
export interface Review {
  id: string;
  author: string;
  text: string;
  date: string;
  avatarUrl?: string;
}
