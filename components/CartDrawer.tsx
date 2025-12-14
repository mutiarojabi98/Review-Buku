import React from 'react';
import { Book } from '../types';
import { formatRupiah } from '../constants';
import { X, Trash2, ExternalLink } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedBooks: Book[];
  onRemoveBook: (id: number) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ 
  isOpen, 
  onClose, 
  savedBooks, 
  onRemoveBook 
}) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#fdfbf7] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-[#e5e0d8] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e5e0d8] bg-white">
            <h2 className="font-serif text-2xl font-bold text-emerald-950">Daftar Keinginan</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {savedBooks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <BookmarkIcon className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-600">Belum ada buku disimpan</p>
                <p className="text-sm mt-2">Simpan buku favoritmu untuk dibeli nanti.</p>
                <button 
                  onClick={onClose} 
                  className="mt-6 text-emerald-600 font-semibold hover:underline"
                >
                  Cari Buku
                </button>
              </div>
            ) : (
              savedBooks.map((book) => (
                <div key={book.id} className="flex gap-4 group">
                  <div className="w-16 h-24 bg-gray-200 shadow-md flex-shrink-0">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">{book.title}</h3>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-semibold text-emerald-700 text-sm">{formatRupiah(book.price)}</p>
                      
                      <div className="flex items-center gap-2">
                        {/* Just a quick link to the first available store logic or just remove icon */}
                        <button 
                          onClick={() => onRemoveBook(book.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors bg-white border border-gray-200 rounded shadow-sm"
                          title="Hapus"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-6 bg-emerald-50 border-t border-emerald-100">
             <p className="text-xs text-emerald-700 text-center">
               Klik buku untuk melihat pilihan toko online.
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  );
}

export default WishlistDrawer;