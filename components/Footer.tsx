import React, { useState, useEffect } from 'react';
import { BOOKS, formatRupiah } from '../constants';
import { X, Star, Clock, Calendar } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Update clock every second (Indonesia Time - WIB)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter books for "Weekly Recommendations" (Simulated by isPopular flag)
  const recommendedBooks = BOOKS.filter(book => book.isPopular).slice(0, 4);

  const handleRecClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRecommendations(true);
  };

  return (
    <>
      <footer className="bg-[#2c3e50] text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">Bukukula</h3>
              <p className="max-w-xs leading-relaxed text-sm">
                Platform review dan kurasi buku terbaik untuk menemani perjalanan literasi Anda. Temukan wawasan baru di setiap halaman.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Eksplorasi</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Beranda</a></li>
                <li><a href="#catalog" className="hover:text-emerald-400 transition-colors">Katalog Buku</a></li>
                <li>
                  <button 
                    onClick={handleRecClick}
                    className="hover:text-emerald-400 transition-colors text-left focus:outline-none"
                  >
                    Rekomendasi Minggu Ini
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-sm">
                <li>Email : bukukulaid@gmail.com</li>
                <li>Instagram: @bukukula.id</li>
                <li>Bandung Barat, Indonesia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Bukukula Book Reviews. All rights reserved.</p>
            
            {/* Digital Clock */}
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span className="font-mono text-emerald-100 font-medium tracking-wide">
                {time} WIB
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Recommendations Modal */}
      {showRecommendations && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowRecommendations(false)}
          />
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-50/50">
              <div>
                <h2 className="font-serif text-xl font-bold text-emerald-950 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Rekomendasi Minggu Ini
                </h2>
                <div className="flex items-center gap-1 text-xs text-emerald-700 mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Senin - Minggu (Paling Banyak Dilihat)</span>
                </div>
              </div>
              <button 
                onClick={() => setShowRecommendations(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid gap-4">
                {recommendedBooks.map((book, index) => (
                  <div key={book.id} className="flex gap-4 bg-white border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="relative w-16 h-24 flex-shrink-0">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded shadow-sm" />
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 font-serif mb-1">{book.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{book.author}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-700">{book.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-gray-400">({book.reviewCount} views)</span>
                      </div>
                      <p className="text-sm font-bold text-emerald-700">{formatRupiah(book.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
              <button 
                onClick={() => {
                  setShowRecommendations(false);
                  const catalog = document.getElementById('catalog');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Lihat Katalog Lengkap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;