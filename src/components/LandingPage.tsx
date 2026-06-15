import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#F4F1EA] flex flex-col items-center justify-center p-6 text-[#1A1A1A] font-serif z-50">
      <div className="max-w-2xl w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight mb-4">
            Selamat Datang di Rapor<br/>Guru Mengaji
          </h1>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#1A1A1A]/80 border-b-2 border-[#1A1A1A] inline-block pb-2">
            Kabupaten Bandung
          </h2>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
           <button 
             onClick={onEnter}
             className="bg-[#1A1A1A] text-white px-8 py-3 text-sm font-sans font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
           >
             Masuk ke Aplikasi
           </button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="mt-16 text-xs font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/60 flex flex-col gap-2"
        >
           <p>Developer Aplikasi : Miftah Sidik</p>
           <p>SDN: Sukatinggal</p>
           <p>15 Juni 2026</p>
        </motion.div>
      </div>
    </div>
  );
}
