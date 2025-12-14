import React, { useState } from 'react';
import { User } from '../types';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  onLogin: (user: User) => void;
}

const ADMIN_EMAILS = [
  "mutiarojabifiyani20@guru.smp.belajar.id",
  "mutiasaqueena@gmail.com",
  "mutiabackup317@gmail.com"
];
const ADMIN_PASSWORD = "Rojabi98";

const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for Admin
    if (ADMIN_EMAILS.includes(email)) {
      if (password === ADMIN_PASSWORD) {
        onLogin({
          email,
          name: "Admin Bukukula",
          role: 'admin'
        });
        return;
      } else {
        setError("Password salah untuk akun Admin.");
        return;
      }
    }

    // Regular User Logic
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    // Simulate Login/Register success for regular users
    onLogin({
      email,
      name: name || email.split('@')[0],
      role: 'user'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2c3e50]">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 overflow-hidden">
         <img 
          src="https://images.unsplash.com/photo-1507842217121-9e93ca04f866?auto=format&fit=crop&q=80&w=1920" 
          alt="Books Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-fadeIn border border-gray-100">
        <div className="p-8 text-center bg-emerald-50 border-b border-emerald-100">
          <div className="mx-auto bg-white p-3 rounded-full w-fit shadow-sm mb-4">
             <BookOpen className="w-8 h-8 text-emerald-700" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-emerald-950">
            {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan Bukukula'}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin ? 'Masuk untuk melihat review buku terbaik.' : 'Daftar untuk mulai menjelajah katalog.'}
          </p>
        </div>

        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nama Anda"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg mt-2"
            >
              {isLogin ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
              }}
              className="text-emerald-700 font-bold hover:underline"
            >
              {isLogin ? 'Daftar disini' : 'Masuk disini'}
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400">
               © 2025 Bukukula Book Reviews. All rights reserved.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;