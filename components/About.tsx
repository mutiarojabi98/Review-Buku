import React from 'react';
import { Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="flex flex-col gap-10 items-center text-center">
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="h-0.5 w-12 bg-emerald-600 rounded-full"></div>
                    <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm">Tentang Kami</span>
                    <div className="h-0.5 w-12 bg-emerald-600 rounded-full"></div>
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight">
                    Lahir dari <span className="text-emerald-700 italic">Keheningan</span>
                </h2>

                <p>
                    Website ini lahir dari keheningan—dari waktu-waktu sunyi ketika dunia terasa bising, dan hanya buku yang mampu berbicara dengan lembut kepada hati.
                    Ia tercipta dari cinta yang tumbuh perlahan, dari halaman ke halaman, dari kata ke kata, hingga akhirnya menemukan bentuknya di sini.
                </p>

                <p>
                    Bagi penciptanya, buku bukan sekadar bacaan. Buku adalah pelukan saat lelah, cahaya saat gelap, dan teman setia yang tak pernah pergi. 
                    Di dalam buku, ada kehidupan lain yang bisa dijalani, luka yang bisa dipahami, dan harapan yang diam-diam tumbuh. 
                    Dari sanalah keinginan ini muncul: untuk berbagi rasa setelah membaca, bukan hanya menceritakan isi, tetapi juga menyampaikan getaran yang tertinggal di jiwa.
                </p>

                <p>
                    Website ini dibuat sebagai ruang kecil untuk merayakan buku—tempat di mana setiap cerita diberi suara, setiap penulis dihormati, dan setiap pembaca diajak untuk berhenti sejenak, lalu merasakan. 
                    Setiap ulasan yang ditulis di sini lahir dari ketulusan, dari hati seorang pecinta buku yang percaya bahwa satu buku bisa mengubah cara seseorang memandang dunia.
                </p>

                <p>
                    Didirikan pada 2025, oleh seseorang yang jatuh cinta pada buku sejak lama, website ini hadir bukan untuk menjadi yang paling sempurna, tetapi untuk menjadi yang paling jujur. 
                    Jujur dalam rasa, jujur dalam kesan, dan jujur dalam kecintaan pada literasi.
                </p>

                <div className="bg-[#f8f5f2] p-8 md:p-10 rounded-2xl border border-[#e5e0d8] mt-12 relative shadow-sm">
                    <Quote className="w-10 h-10 text-emerald-200 absolute -top-4 -left-4 fill-current" />
                    <div className="space-y-4 relative z-10">
                        <p className="font-serif text-xl md:text-2xl text-emerald-950 italic">
                            "Semoga website ini menjadi tempat pulang—bagi mereka yang mencintai buku, yang rindu pada cerita, dan yang percaya bahwa kata-kata memiliki kekuatan untuk menyembuhkan, menguatkan, dan menemani kita tumbuh."
                        </p>
                        <p className="font-serif text-lg text-emerald-800 font-medium mt-4">
                            Karena pada akhirnya, membaca bukan hanya tentang memahami cerita,
                            tetapi tentang menemukan diri sendiri di antara baris-baris kata.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;