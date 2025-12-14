import React, { useState, useRef } from 'react';
import { Book } from '../types';
import { X, Upload, Plus } from 'lucide-react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('4.5');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isPopular, setIsPopular] = useState(false);
  
  // Links
  const [shopee, setShopee] = useState('');
  const [tokopedia, setTokopedia] = useState('');
  const [lazada, setLazada] = useState('');
  const [tiktok, setTiktok] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new book object
    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      price: Number(price),
      description,
      category,
      rating: Number(rating) || 0,
      reviewCount: 0,
      isPopular: isPopular,
      image: imagePreview || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800", // Fallback image
      affiliateLinks: {
        shopee: shopee || undefined,
        tokopedia: tokopedia || undefined,
        lazada: lazada || undefined,
        tiktok: tiktok || undefined,
      }
    };

    onAddBook(newBook);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setDescription('');
    setCategory('');
    setRating('4.5');
    setIsPopular(false);
    setImageFile(null);
    setImagePreview('');
    setShopee('');
    setTokopedia('');
    setLazada('');
    setTiktok('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl font-bold text-emerald-950">Tambah Review Buku Baru</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div 
              className="w-40 h-60 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors overflow-hidden relative"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 text-center px-2">Klik untuk upload cover buku</span>
                </>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
              <input required value={author} onChange={e => setAuthor(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <input required value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
              <input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating Awal</label>
              <input type="number" step="0.1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox"
                        checked={isPopular}
                        onChange={(e) => setIsPopular(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Tandai Paling Banyak Dibaca</span>
                </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review / Deskripsi</label>
            <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Tulis review menarik tentang buku ini..." />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Link Affiliate (Opsional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={shopee} onChange={e => setShopee(e.target.value)} placeholder="Link Shopee" className="p-2 border rounded text-sm" />
              <input value={tokopedia} onChange={e => setTokopedia(e.target.value)} placeholder="Link Tokopedia" className="p-2 border rounded text-sm" />
              <input value={lazada} onChange={e => setLazada(e.target.value)} placeholder="Link Lazada" className="p-2 border rounded text-sm" />
              <input value={tiktok} onChange={e => setTiktok(e.target.value)} placeholder="Link TikTok Shop" className="p-2 border rounded text-sm" />
            </div>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md">
            <Plus className="w-5 h-5" /> Publikasikan Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;