import { Hero } from '../components/section/hero';
import { FeaturedWorks } from '../components/section/FeaturedWorks';

export const Home = () => {
  return (
    <main>
      {/*блоки сайта*/}
      <Hero />
      <FeaturedWorks />
      {/* <PortfolioPreview /> */}
    </main>
  );
};
