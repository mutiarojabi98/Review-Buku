import { Book } from './types';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    price: 98000,
    category: "Self Improvement",
    rating: 4.8,
    reviewCount: 3240,
    isPopular: true,
    description: "Sebuah pengantar populer tentang filsafat Stoisisme. Buku ini menjelaskan bagaimana pola pikir Stoic dapat membantu kita mengatasi emosi negatif dan menghasilkan mental yang tangguh di masa kini.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      shopee: "https://shopee.co.id",
      tokopedia: "https://tokopedia.com",
    }
  },
  {
    id: 2,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    price: 115000,
    category: "Fiksi Sejarah",
    rating: 4.9,
    reviewCount: 5102,
    isPopular: true,
    description: "Novel yang mengangkat tema persahabatan, cinta, keluarga, dan kehilangan di era reformasi 1998. Kisah yang mengharukan tentang mereka yang hilang dan mereka yang ditinggalkan.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      shopee: "https://shopee.co.id",
      lazada: "https://lazada.co.id",
      tiktok: "https://tiktok.com"
    }
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 108000,
    category: "Self Improvement",
    rating: 4.7,
    reviewCount: 8900,
    isPopular: true,
    description: "Perubahan kecil yang memberikan hasil luar biasa. Buku ini menawarkan kerangka kerja terbukti untuk menjadi 1% lebih baik setiap hari.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      tokopedia: "https://tokopedia.com",
      tiktok: "https://tiktok.com"
    }
  },
  {
    id: 4,
    title: "Dunia Sophie",
    author: "Jostein Gaarder",
    price: 145000,
    category: "Filsafat",
    rating: 4.5,
    reviewCount: 1200,
    description: "Novel misteri tentang sejarah filsafat. Sophie Amundsen, seorang gadis berusia 14 tahun, mendapat surat misterius yang menanyakan 'Siapa kamu?' dan 'Dari mana dunia berasal?'.",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      shopee: "https://shopee.co.id",
      tokopedia: "https://tokopedia.com",
      lazada: "https://lazada.co.id"
    }
  },
  {
    id: 5,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    price: 135000,
    category: "Sastra Klasik",
    rating: 4.9,
    reviewCount: 4500,
    description: "Kisah Minke, pribumi di zaman kolonial Belanda, yang berjuang melawan ketidakadilan hukum dan adat istiadat. Bagian pertama dari Tetralogi Buru.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      shopee: "https://shopee.co.id",
      tokopedia: "https://tokopedia.com"
    }
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    price: 85000,
    category: "Keuangan",
    rating: 4.6,
    reviewCount: 3100,
    description: "Apa yang diajarkan orang kaya pada anak-anak mereka tentang uang yang tidak diajarkan oleh orang miskin dan kelas menengah.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
    affiliateLinks: {
      lazada: "https://lazada.co.id",
      tiktok: "https://tiktok.com"
    }
  }
];

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};