import React from 'react';
import { BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Mencegah perubahan hash URL (#)
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#2c3e50] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1920" 
          alt="Library Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50] via-transparent to-transparent"></div>
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-100">Baca Bersama</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Temukan Jendela <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Dunia Barumu</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
          Review mendalam dan rekomendasi buku terbaik dari berbagai genre. Bandingkan harga dan beli langsung dari e-commerce favoritmu.
        </p>
        <a 
          href="#catalog"
          onClick={handleScrollToCatalog}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20 flex items-center gap-2 cursor-pointer"
        >
          Mulai Menjelajah
        </a>
      </div>
    </div>
  );
};

export default Hero;