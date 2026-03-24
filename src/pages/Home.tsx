import { Hero } from '../components/Hero';
import { HexDecoder } from '../components/HexDecoder';

export const Home = () => {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-700">
      <Hero />
      <div className="my-8">
        <HexDecoder />
      </div>
    </div>
  );
};
