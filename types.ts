export interface AffiliateLinks {
  shopee?: string;
  tokopedia?: string;
  lazada?: string;
  tiktok?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;      // 0 to 5
  reviewCount: number; // Total number of reviews
  isPopular?: boolean; // Badge for "Paling Banyak Dibaca"
  affiliateLinks: AffiliateLinks;
}

// Reusing CartItem structure for "Wishlist" logic
export interface CartItem extends Book {
  quantity: number; 
}

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
}