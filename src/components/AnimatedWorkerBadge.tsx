import React from 'react';
import { motion } from 'motion/react';
import { Wrench, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AnimatedWorkerBadgeProps {
  lang: Language;
}

export const AnimatedWorkerBadge: React.FC<AnimatedWorkerBadgeProps> = ({ lang }) => {
  return (
    <div className="relative my-4 inline-block max-w-full">
      {/* Outer ambient glow pulse */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-sky-400/20 to-blue-600/30 blur-md pointer-events-none animate-pulse" />

      {/* Main Container Card */}
      <div className="relative flex items-center gap-3.5 bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-[#07152e] border border-cyan-400/50 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md">
        
        {/* Animated Worker Avatar / Character Vector with Tools */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
          
          {/* Radial animated ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed"
          />

          {/* Worker SVG Graphic */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-900 via-blue-950 to-slate-900 border-2 border-cyan-400/70 flex items-center justify-center overflow-hidden shadow-inner">
            
            {/* Technician Helmet & Uniform Illustration */}
            <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-10 sm:h-10 text-cyan-300" fill="none">
              {/* Uniform / Shoulders */}
              <path d="M12 56 C12 44 20 40 32 40 C44 40 52 44 52 56" fill="#0284c7" />
              {/* Collar detail */}
              <path d="M26 40 L32 46 L38 40" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
              
              {/* Head / Face */}
              <circle cx="32" cy="27" r="10" fill="#fcd34d" />
              
              {/* Safety Goggles / Mask */}
              <rect x="25" y="25" width="14" height="5" rx="2.5" fill="#082f49" />
              <rect x="26.5" y="26" width="4.5" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="33" y="26" width="4.5" height="3" rx="1.5" fill="#38bdf8" />

              {/* Safety Hard Hat (Yellow / Cyan) */}
              <path d="M20 22 C20 12 44 12 44 22 Z" fill="#eab308" />
              <rect x="18" y="21" width="28" height="3" rx="1.5" fill="#ca8a04" />
              {/* Helmet Emblem */}
              <circle cx="32" cy="17" r="2" fill="#0284c7" />
            </svg>

            {/* Live animated diagnostic laser beam from goggles */}
            <motion.div 
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-300 blur-[1px]"
            />
          </div>

          {/* Animated Wrench tool moving/repairing */}
          <motion.div 
            animate={{ 
              rotate: [0, 25, -15, 20, 0],
              y: [0, -3, 2, -2, 0]
            }}
            transition={{ 
              duration: 2.2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg border border-white"
          >
            <Wrench className="w-3.5 h-3.5" />
          </motion.div>

          {/* Electronic spark animation */}
          <motion.div
            animate={{ 
              scale: [0.6, 1.3, 0.6],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1 -left-1 text-yellow-400"
          >
            <Sparkles className="w-3.5 h-3.5 fill-yellow-400" />
          </motion.div>
        </div>

        {/* Worker Info & Live Status Banner */}
        <div className="flex flex-col text-right rtl:text-right ltr:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black text-cyan-300">
              {lang === 'ar' ? 'فنيون ومهندسون متاحون الآن' : 'Technicians Available Now'}
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-800">
              {lang === 'ar' ? 'جاهزون للانطلاق' : 'Ready to Dispatch'}
            </span>
          </div>

          <div className="text-xs sm:text-sm font-black text-white mt-0.5">
            {lang === 'ar' ? 'فحص إلكتروني دقيق وإصلاح فوري بنفس الزيارة' : 'Digital Diagnostics & Same-Visit Fix'}
          </div>

          <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>
              {lang === 'ar' 
                ? 'فريق خبير مع حقيبة كشف أعطال وقطع غيار أصلية' 
                : 'Equipped with digital gauges & authentic OEM parts'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
