import React from 'react';
import { BookOpen, Bookmark, Menu, LogOut, PlusCircle } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  user: User | null;
  onLogout: () => void;
  onOpenAddBook: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  savedCount, 
  onOpenSaved, 
  user,
  onLogout,
  onOpenAddBook
}) => {
  const isAdmin = user?.role === 'admin';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8f5f2]/90 backdrop-blur-md border-b border-[#e5e0d8]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-800 text-white p-2 rounded-lg shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif font-bold text-2xl tracking-tight text-emerald-950 block leading-none">Bukukula</span>
            <span className="text-xs text-emerald-700 font-medium tracking-widest uppercase">Book Reviews</span>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-emerald-900/70">
          <a 
            href="#" 
            onClick={handleHomeClick}
            className="hover:text-emerald-800 transition-colors"
          >
            Beranda
          </a>
          <a 
            href="#catalog" 
            onClick={(e) => handleScroll(e, 'catalog')}
            className="hover:text-emerald-800 transition-colors"
          >
            Katalog Buku
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, 'about')}
            className="hover:text-emerald-800 transition-colors"
          >
            Tentang
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={onOpenAddBook}
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors font-medium text-sm"
            >
              <PlusCircle className="w-4 h-4" /> Tambah Buku
            </button>
          )}

          <button 
            onClick={onOpenSaved}
            className="relative p-2 text-emerald-900 hover:text-emerald-700 transition-colors group"
            title="Wishlist"
          >
            <Bookmark className="w-6 h-6 group-hover:fill-current" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-[#f8f5f2]">
                {savedCount}
              </span>
            )}
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-1"></div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-gray-900">{user?.name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.role}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          <button className="md:hidden p-2 text-emerald-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {isAdmin && (
        <div className="bg-emerald-600 text-white text-xs font-bold text-center py-1 shadow-inner">
          ADMIN MODE ACTIVE - You can add & edit reviews
        </div>
      )}
    </header>
  );
};

export default Header;