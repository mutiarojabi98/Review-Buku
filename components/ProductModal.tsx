import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { formatRupiah } from '../constants';
import { X, Bookmark, Save, ExternalLink, Star } from 'lucide-react';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSaved: (book: Book) => void;
  isSaved: boolean;
  isAdmin: boolean;
  onUpdateBook: (updatedBook: Book) => void;
  onRateBook: (bookId: number, rating: number) => void;
}

const BookModal: React.FC<BookModalProps> = ({ 
  book, 
  isOpen, 
  onClose, 
  onToggleSaved, 
  isSaved,
  isAdmin,
  onUpdateBook,
  onRateBook
}) => {
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setEditedBook(book);
    setUserRating(0); // Reset user rating when book changes
  }, [book]);

  if (!isOpen || !book || !editedBook) return null;

  const handleSave = () => {
    if (editedBook) {
      onUpdateBook(editedBook);
    }
  };

  const handleChange = (field: keyof Book, value: string | number | boolean) => {
    setEditedBook(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  const handleRate = (star: number) => {
    setUserRating(star);
    onRateBook(book.id, star);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#fdfbf7] rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fadeIn border border-[#e5e0d8]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors border border-gray-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/5 bg-[#ebe6df] relative flex items-center justify-center p-8 md:p-12">
          <div className="relative aspect-[2/3] w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-r-md">
            <img 
              src={editedBook.image} 
              alt={editedBook.title}
              className="w-full h-full object-cover rounded-r-md"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
          {isAdmin ? (
            <div className="space-y-4 mb-6 border-b pb-6 border-gray-200 bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-xs font-bold text-yellow-800 uppercase">Edit Book Details</h3>
              <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Judul Buku</label>
                    <input 
                      className="w-full p-2 border rounded font-serif text-lg font-bold"
                      value={editedBook.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                     <label className="block text-xs font-semibold text-gray-600 mb-1">Rating</label>
                     <input 
                      type="number"
                      step="0.1"
                      max="5"
                      className="w-full p-2 border rounded"
                      value={editedBook.rating}
                      onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
                    />
                  </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1 cursor-pointer">
                    <input 
                        type="checkbox"
                        checked={editedBook.isPopular || false}
                        onChange={(e) => handleChange('isPopular', e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Tandai sebagai "Paling Banyak Dibaca"
                </label>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">URL Gambar</label>
                <input 
                  className="w-full p-2 border rounded text-sm"
                  value={editedBook.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Penulis</label>
                   <input 
                    className="w-full p-2 border rounded"
                    value={editedBook.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
                   <input 
                    className="w-full p-2 border rounded"
                    value={editedBook.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Harga (Angka saja)</label>
                <input 
                  type="number"
                  className="w-full p-2 border rounded"
                  value={editedBook.price}
                  onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Deskripsi</label>
                <textarea 
                  className="w-full p-2 border rounded h-32"
                  value={editedBook.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
              
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full justify-center font-bold"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-2 py-1 rounded inline-block">
                    {editedBook.category}
                    </span>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                         <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                         <span className="font-bold text-gray-700">{editedBook.rating.toFixed(1)}</span>
                         <span className="text-xs text-gray-400">({editedBook.reviewCount})</span>
                    </div>
                </div>
                <h2 className="font-serif text-4xl font-bold text-gray-900 mb-2 leading-tight">{editedBook.title}</h2>
                <p className="text-lg text-gray-600 font-medium italic">by {editedBook.author}</p>
              </div>

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimasi Harga</p>
                  <p className="text-3xl font-bold text-emerald-900">{formatRupiah(editedBook.price)}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Review Singkat</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {editedBook.description}
                </p>
              </div>

              {/* User Rating Section */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                 <p className="text-sm font-bold text-gray-700 mb-2">Beri Rating Buku Ini</p>
                 <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="transition-transform hover:scale-110 focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRate(star)}
                        >
                            <Star 
                                className={`w-8 h-8 ${
                                    (hoverRating || userRating) >= star 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'
                                } transition-colors`} 
                            />
                        </button>
                    ))}
                 </div>
                 {userRating > 0 && (
                     <p className="text-xs text-emerald-600 mt-2 font-medium animate-fadeIn">
                         Terima kasih atas rating Anda!
                     </p>
                 )}
              </div>
            </>
          )}

          <div className="mt-auto">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Beli Original di E-Commerce</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {book.affiliateLinks.shopee && (
                <a href={book.affiliateLinks.shopee} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#EE4D2D] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" /> Shopee
                </a>
              )}
              {book.affiliateLinks.tokopedia && (
                <a href={book.affiliateLinks.tokopedia} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#03AC0E] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" /> Tokopedia
                </a>
              )}
              {book.affiliateLinks.lazada && (
                <a href={book.affiliateLinks.lazada} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#0F146D] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" /> Lazada
                </a>
              )}
              {book.affiliateLinks.tiktok && (
                <a href={book.affiliateLinks.tiktok} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#000000] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <ExternalLink className="w-4 h-4" /> TikTok Shop
                </a>
              )}
            </div>

            <button
              onClick={() => onToggleSaved(book)}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all border ${
                isSaved
                  ? 'bg-gray-100 text-gray-900 border-gray-200'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-600 hover:text-emerald-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Disimpan di Wishlist' : 'Simpan ke Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;