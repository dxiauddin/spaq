"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect, useMemo } from 'react';
import HarfButton from '../../components/HarfButton';

function Skala1Content() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = 21;

  // Exact mapping based on your requirements
  const charPageMap: Record<string, number> = {
    "أ": 1, "ب": 1,
    "ت": 2, "ث": 2,
    "ج": 3, "ح": 3, "خ": 3,
    "د": 4, "ذ": 4,
    "ر": 5, "ز": 5,
    "س": 6, "ش": 6,
    "ص": 7, "ض": 7,
    "ط": 8, "ظ": 8,
    "ع": 9, "غ": 9,
    "ف": 10, "ق": 10,
    "ك": 11, "ل": 12, "م": 13, "ن": 14, "و": 15, "هـ": 16, "لا": 17, "ء": 18, "ي": 19
  };

  const arabicAlphabet = Object.keys(charPageMap);
  const [charIndex, setCharIndex] = useState(0);

  const displayedChars = useMemo(() => {
    return arabicAlphabet.slice(charIndex, charIndex + 5).map(char => ({
      char,
      page: charPageMap[char]
    }));
  }, [charIndex]);

  // ... [Keep pageConfigs, useEffect, etc. as they were] ...
  const pageConfigs: Record<number, { incentive: string[], others: string[] }> = {
    1: { incentive: ["بَ","أَ"], others: ["أَ", "بَ"] },
    2: { incentive: ["ثَ","تَ"], others: ["أَ", "بَ"] },
    3: { incentive: ["خَ", "حَ","جَ"], others: ["أَ", "بَ", "تَ", "ثَ"] },
    4: { incentive: ["ذَ","دَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ"] },
    5: { incentive: ["زَ","رَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ"] },
    6: { incentive: ["شَ","سَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ"] },
    7: { incentive: [ "ضَ","صَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ"] },
    8: { incentive: ["ظَ","طَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ"] },
    9: { incentive: ["غَ","عَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ"] },
    10: { incentive: ["قَ","فَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ"] },
    11: { incentive: ["كَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ"] },
    12: { incentive: ["لَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ"] },
    13: { incentive: ["مَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ"] },
    14: { incentive: ["نَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ"] },
    15: { incentive: ["وَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ"] },
    16: { incentive: ["هَـ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "وَ"] },
    17: { incentive: ["لَا"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "وَ", "هَـ"] },
    18: { incentive: ["ءَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "وَ", "هَـ", "لَا"] },
    19: { incentive: ["يَ"], others: ["أَ", "بَ", "تَ", "ثَ", "جَ", "حَ", "خَ", "دَ", "ذَ", "رَ", "زَ", "سَ", "شَ", "صَ", "ضَ", "طَ", "ظَ", "عَ", "غَ", "فَ", "قَ", "كَ", "لَ", "مَ", "نَ", "وَ", "هَـ", "لَا", "ءَ"] },
    20: { incentive: [""], others: ["أ", "ب","ت", "ث","ج", "ح", "خ","د", "ذ","ر", "ز","س", "ش","ص", "ض","ط", "ظ","ع", "غ","ف", "ق","ك", "ل","م", "ن","و", "هـ","لا","ء"] },
  };

  const config = useMemo(() => pageConfigs[currentPage] || pageConfigs[1], [currentPage]);
  const [groups, setGroups] = useState<string[][]>([]);

  useEffect(() => {
    let mainGrid: string[] = [];
    if (currentPage === 20) {
      mainGrid = Array(63).fill(0).map(() => config.others[Math.floor(Math.random() * config.others.length)]);
    } else {
      mainGrid = [
        ...Array(16).fill(0).map(() => config.incentive[Math.floor(Math.random() * config.incentive.length)]),
        ...Array(47).fill(0).map(() => config.others[Math.floor(Math.random() * config.others.length)])
      ];
    }
    mainGrid.sort(() => Math.random() - 0.5);
    const newGroups = [];
    for (let i = 0; i < mainGrid.length; i += 3) {
      newGroups.push(mainGrid.slice(i, i + 3));
    }
    setGroups(newGroups);
  }, [currentPage, config]); 

  if (groups.length === 0) return <div className="min-h-screen bg-black" />;

  const sideButtonStyle = "fixed top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-[#062e03]/80 border border-white/20 rounded-full transition-all disabled:opacity-30 z-10 text-2xl font-bold shadow-xl hover:bg-[#084004]";
  const circleBaseStyle = "w-12 h-12 flex items-center justify-center bg-[#062e03]/80 border border-white/20 rounded-full text-xl font-bold text-white shadow-xl hover:bg-[#084004] cursor-pointer";

  return (
    <main className="min-h-screen flex flex-col items-center bg-[radial-gradient(circle_at_center,_#062e03,_black)] text-white">
      {/* ... [Keep navigation buttons and UI structure same as previous block] ... */}
      <button disabled={currentPage === 1} onClick={() => router.push(`?page=${currentPage - 1}`)} className={`${sideButtonStyle} left-4`}>{"<"}</button>
      <button disabled={currentPage === totalPages} onClick={() => router.push(`?page=${currentPage + 1}`)} className={`${sideButtonStyle} right-4`}>{">"}</button>

      <div className="sticky top-0 z-50 w-full bg-[#062e03]/80 backdrop-blur-md border-b border-white/10 flex flex-col items-center pt-3 pb-3">
        <img src="/Logo_12_Bgd_v2.png" alt="Home" onClick={() => router.push('/')} className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity mb-2" />
        <div dir="rtl" className="flex justify-center gap-2">
          <button disabled={charIndex === 0} onClick={() => setCharIndex(prev => prev - 1)} className={circleBaseStyle}>{"<"}</button>
          {displayedChars.map((item, i) => (
            <div key={i} onClick={() => router.push(`?page=${item.page}`)} className={circleBaseStyle}>
              {item.char}
            </div>
          ))}
          <button disabled={charIndex >= arabicAlphabet.length - 5} onClick={() => setCharIndex(prev => prev + 1)} className={circleBaseStyle}>{">"}</button>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2 mb-10">
        {currentPage !== 20 && config.incentive.map((harf, i) => <HarfButton key={i} harf={harf} />)}
      </div>

      <div className="flex flex-col items-center pb-20">
        <div dir="rtl" className="flex flex-col items-center gap-2 max-w-5xl">
          {groups.map((group, i) => (
            <div key={i} className="flex justify-center gap-2">
              {group.map((harf, j) => <HarfButton key={j} harf={harf} />)}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#062e03]/80 backdrop-blur-md border-t border-white/10 text-center py-2 z-50 text-xs text-white/60">
        Briged Kedua Belas Infantri Malaysia
      </div>
    </main>
  );
}

export default function Skala1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Skala1Content />
    </Suspense>
  );
}