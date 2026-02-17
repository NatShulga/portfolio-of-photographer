# Portfolio of Photographer.

Fullstack-приложение (фронтенд + бэкенд + база данных).

Современное минималистичное портфолио для профессионального фотографа.
Сайт спроектирован так, чтобы максимально эффектно демонстрировать фотоработы,
сохраняя при этом высокую скорость загрузки и удобство навигации.

Portfolio of Photographer

A modern, minimalist portfolio for a professional photographer.
The website is designed to showcase photographic work with maximum impact
while maintaining high performance and intuitive navigation.

## Технологический стек

- **Framework:** [React 18](https://reactjs.org/) (с использованием TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/) — для мгновенной сборки.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — для кастомного дизайна.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) — для плавных переходов.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting:** ESLint + Prettier — для чистоты кода.Tech Stack

**Особенности проекта**

- [ ] **Lightbox:** Просмотр фотографий во весь экран.
- [ ] **Адаптивность:** Сайт идеально выглядит на смартфонах и десктопах.
- [ ] **Разделение по категориям:** Свадьбы, Love Story, Индивидуальная, Стрит- Стаил.
- [ ] **Форма обратной связи:** Интеграция для записи на съемку.

## Быстрый старт

1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/NatShulga/portfolio-of-photographer-Vera-Andreeva.git](https://github.com/NatShulga/portfolio-of-photographer-Vera-Andreeva.git)
   ```

Установите зависимости: npm install

Запустите проект в режиме разработки: npm run dev

### Бэкенд часть (Сервер)

Серверная часть отвечает за работу с базой данных и хранение информации о фотоработах.

#### Стек:

* **Node.js + Express** (Серверная логика)
* **MongoDB** (База данных в Docker)
* **Mongoose** (Взаимодействие с БД)

Запуск внутри папки cd backend.

node server.js

Доступен по адресу: `http://localhost:5000`

**Проект переведен в инфраструктуру: «React + Node.js + PostgreSQL(Render) + Яндекс Облако».**

## Безопасность

Для защиты приложения используется **Helmet**, который настраивает Content Security Policy (CSP). Это позволяет безопасно загружать медиа-контент из внешних источников, таких как **Yandex Cloud Object Storage**, и блокирует попытки внедрения вредоносных скриптов. **Скрывает**, что сервер работает на Express (заголовок `X-Powered-By`)

**Helmet** — настройка защитных HTTP-заголовков (CSP, HSTS и др.) для защиты от XSS, кликджекинга и других атак.
