"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    // Applied the gradient background here
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-black to-[#4a0000] p-6 text-white">
      
      {/* Logo Placement */}
      <div className="mb-2"> 
        <Image 
          src="/Logo_12_Bgd_v2.png" 
          alt="12 Bgd Logo" 
          width={120} 
          height={120} 
          priority 
          className="object-contain"
        />
      </div>

      {/* Branding */}
      <h2 className="text-lg md:text-xl font-medium opacity-90 text-center">
        Briged Kedua Belas Infantri Malaysia
      </h2>
      <h1 className="text-5xl md:text-6xl font-bold mb-8">SPAQ</h1>
      
      {/* Buttons */}
      <button 
        onClick={() => router.push('/skala1?page=1')}
        className="w-full max-w-xs px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xl hover:bg-white/20 transition-all"
      >
        Skala 1
      </button>

      <button className="w-full max-w-xs px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xl opacity-50 cursor-not-allowed">
        Skala 2 (Coming Soon)
      </button>

      <button className="w-full max-w-xs px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xl opacity-50 cursor-not-allowed">
        Skala 3 (Coming Soon)
      </button>
    </main>
  );
}