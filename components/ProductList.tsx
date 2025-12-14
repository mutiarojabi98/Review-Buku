import React, { useState, useMemo } from 'react';
import { Book } from '../types';
import { formatRupiah } from '../constants';
import { BookOpen, User, Star, TrendingUp, Trash2, Pencil, LayoutGrid, List, AlignJustify, ArrowUpDown, ChevronDown } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  isAdmin?: boolean;
  onDeleteBook?: (id: number) => void;
}

type SortOrder = 'default' | 'asc' | 'desc';
type ViewMode = 'grid' | 'list' | 'minimal';

const ProductList: React.FC<BookListProps> = ({ books, onBookClick, isAdmin, onDeleteBook }) => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category));
    return ["Semua", ...Array.from(cats)];
  }, [books]);

  // Filter and Sort Logic
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // Filter by Category
    if (activeCategory !== "Semua") {
      result = result.filter(book => book.category === activeCategory);
    }

    // Sort
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [books, activeCategory, sortOrder]);

  return (
    <section id="catalog" className="py-20 bg-[#f8f5f2] scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-emerald-950 mb-4">Katalog Pilihan</h2>
          <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Daftar buku best-seller dan rekomendasi kurator kami. Gunakan filter di bawah untuk menemukan buku favorit Anda.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full xl:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
            {/* Sorting */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-emerald-500 transition-colors">
                <ArrowUpDown className="w-4 h-4" />
                {sortOrder === 'default' ? 'Rekomendasi' : sortOrder === 'asc' ? 'Judul (A-Z)' : 'Judul (Z-A)'}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-30 overflow-hidden animate-fadeIn">
                <button onClick={() => setSortOrder('default')} className="w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-700">Rekomendasi</button>
                <button onClick={() => setSortOrder('asc')} className="w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-700">Judul (A-Z)</button>
                <button onClick={() => setSortOrder('desc')} className="w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 hover:text-emerald-700">Judul (Z-A)</button>
              </div>
            </div>

            {/* View Modes */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Tampilan Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Tampilan List dengan Gambar"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('minimal')}
                className={`p-2 rounded-md transition-all ${viewMode === 'minimal' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="Tampilan List Teks"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredAndSortedBooks.map((book) => (
              <div 
                key={book.id} 
                className="group cursor-pointer perspective"
                onClick={() => onBookClick(book)}
              >
                <div className="relative aspect-[2/3] mb-4 bg-gray-200 rounded-lg shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {book.isPopular && (
                    <div className="absolute top-2 left-2 bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                      <TrendingUp className="w-3 h-3" />
                      Populer
                    </div>
                  )}

                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); onBookClick(book); }}
                        className="p-1.5 bg-white/90 text-emerald-600 rounded-full shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteBook?.(book.id); }}
                        className="p-1.5 bg-white/90 text-red-500 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Lihat Detail
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">{book.category}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-600">{book.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <User className="w-3 h-3" />
                    <span>{book.author}</span>
                  </div>
                  <p className="text-emerald-900 font-semibold pt-2">{formatRupiah(book.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View (With Image) */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <div 
                key={book.id} 
                className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-4 flex gap-4 transition-all"
                onClick={() => onBookClick(book)}
              >
                <div className="relative w-24 h-36 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  {book.isPopular && (
                     <div className="absolute top-0 left-0 bg-amber-400 text-amber-950 text-[8px] font-bold px-1.5 py-0.5 rounded-br">
                       Populer
                     </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{book.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-600">{book.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><User className="w-3 h-3"/> {book.author}</p>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{book.description}</p>
                  </div>

                  <div className="flex items-end justify-between mt-3">
                    <p className="text-lg font-bold text-emerald-900">{formatRupiah(book.price)}</p>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onBookClick(book); }}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors bg-gray-50 rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDeleteBook?.(book.id); }}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Minimal View (Text Only) */}
        {viewMode === 'minimal' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Judul Buku</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Penulis</th>
                    <th className="px-6 py-4 text-center">Rating</th>
                    <th className="px-6 py-4 text-right">Harga</th>
                    {isAdmin && <th className="px-6 py-4 text-center">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAndSortedBooks.map((book) => (
                    <tr 
                      key={book.id} 
                      className="hover:bg-emerald-50/50 cursor-pointer transition-colors group"
                      onClick={() => onBookClick(book)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           {book.isPopular && <TrendingUp className="w-4 h-4 text-amber-500" />}
                           <span className="font-bold text-gray-900 font-serif text-base group-hover:text-emerald-700">{book.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">{book.category}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{book.author}</td>
                      <td className="px-6 py-4 text-center">
                         <div className="flex items-center justify-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold text-gray-700">{book.rating.toFixed(1)}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-900">{formatRupiah(book.price)}</td>
                      {isAdmin && (
                        <td className="px-6 py-4 text-center">
                           <div className="flex justify-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onBookClick(book); }}
                                className="text-gray-400 hover:text-emerald-600"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); onDeleteBook?.(book.id); }}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>
          </div>
        )}

        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Tidak ada buku yang ditemukan untuk kategori ini.</p>
            <button 
              onClick={() => setActiveCategory("Semua")}
              className="mt-4 text-emerald-600 font-bold hover:underline"
            >
              Lihat Semua Buku
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;