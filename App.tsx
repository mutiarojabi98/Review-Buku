import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import BookModal from './components/ProductModal';
import WishlistDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AddBookModal from './components/AddBookModal';
import About from './components/About';
import Footer from './components/Footer';
import { Book, User } from './types';
import { BOOKS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  // Authentication Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedBooks([]); // Optional: clear session data
    setIsWishlistOpen(false);
    setIsModalOpen(false);
    setIsAddBookModalOpen(false);
  };

  // Toggle Save to Wishlist
  const toggleSaved = (book: Book) => {
    setSavedBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id: number) => {
    setSavedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Handle opening product detail
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Update book data (Admin feature - Edit existing)
  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    setSelectedBook(updatedBook); 
  };

  // Delete book data (Admin feature)
  const handleDeleteBook = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini dari katalog?")) {
      setBooks(prev => prev.filter(b => b.id !== id));
      setSavedBooks(prev => prev.filter(b => b.id !== id));
      if (selectedBook?.id === id) {
        setIsModalOpen(false);
        setSelectedBook(null);
      }
    }
  };

  // Handle User Rating
  const handleRateBook = (bookId: number, rating: number) => {
    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        // Simple logic to simulate rating update:
        // Weighted average calculation simulation
        const newCount = book.reviewCount + 1;
        const newRating = ((book.rating * book.reviewCount) + rating) / newCount;
        const updated = {
            ...book,
            rating: newRating,
            reviewCount: newCount
        };
        // Also update selected book to show changes immediately in modal
        setSelectedBook(updated);
        return updated;
      }
      return book;
    }));
  };

  // Add new book (Admin feature)
  const handleAddBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
  };

  // If not logged in, show Auth Modal covering everything
  if (!currentUser) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        savedCount={savedBooks.length} 
        onOpenSaved={() => setIsWishlistOpen(true)} 
        user={currentUser}
        onLogout={handleLogout}
        onOpenAddBook={() => setIsAddBookModalOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero />
        <ProductList 
          books={books}
          onBookClick={handleBookClick}
          isAdmin={currentUser.role === 'admin'}
          onDeleteBook={handleDeleteBook}
        />
        <About />
      </main>

      <Footer />

      {/* Book Detail Modal */}
      <BookModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleSaved={toggleSaved}
        isSaved={selectedBook ? savedBooks.some(b => b.id === selectedBook.id) : false}
        isAdmin={currentUser.role === 'admin'}
        onUpdateBook={handleUpdateBook}
        onRateBook={handleRateBook}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedBooks={savedBooks}
        onRemoveBook={removeFromWishlist}
      />

      {/* Add Book Modal (Admin Only) */}
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
};

export default App;