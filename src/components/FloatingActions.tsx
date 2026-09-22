import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, Calendar, Zap, X, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { useCompany } from '../context/CompanyContext';

interface FloatingActionsProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ lang, onOpenBooking }) => {
  const { companyInfo } = useCompany();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(companyInfo.phoneClean || companyInfo.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed bottom-6 left-6 rtl:left-6 ltr:right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top with AnimatePresence */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full bg-slate-900/90 text-white hover:bg-cyan-600 flex items-center justify-center shadow-lg transition-colors cursor-pointer border border-white/20"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Fast Booking Pill Button */}
      <motion.button
        onClick={onOpenBooking}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-full shadow-xl border border-cyan-300 cursor-pointer mb-0.5"
      >
        <Zap className="w-3.5 h-3.5 fill-slate-950" />
        <span>{lang === 'ar' ? 'حجز سريع' : 'Fast Book'}</span>
      </motion.button>

      {/* Interactive Floating Call Button & Admin Number Display Card */}
      <div className="relative">
        <motion.button
          onClick={() => setShowPhonePopup(!showPhonePopup)}
          whileHover={{ scale: 1.12, rotate: -5 }}
          whileTap={{ scale: 0.92 }}
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all cursor-pointer relative ${
            showPhonePopup 
              ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-400/30' 
              : 'bg-[#0B1B3D] text-cyan-400 hover:text-white hover:bg-blue-900 border-cyan-400/50'
          }`}
          aria-label="Show Contact Number"
          title={lang === 'ar' ? 'عرض رقم الاتصال المباشر' : 'View Contact Number'}
        >
          {showPhonePopup ? (
            <X className="w-6 h-6 animate-in spin-in-90 duration-200" />
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-25 pointer-events-none" />
              <Phone className="w-6 h-6 animate-pulse" />
            </>
          )}
        </motion.button>

        {/* Popover showing the exact number configured by Admin */}
        <AnimatePresence>
          {showPhonePopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-16 rtl:left-0 ltr:right-0 w-72 sm:w-80 bg-[#071329]/95 backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-4 shadow-2xl text-white z-50 overflow-hidden"
            >
              {/* Subtle top cyan line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500" />

              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Phone className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-cyan-300">
                      {lang === 'ar' ? 'رقم الاتصال المعتمد من الإدارة' : 'Official Hotline Number'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {lang === 'ar' ? 'متاح على مدار 24 ساعة للخدمة الفورية' : 'Available 24/7 for instant service'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPhonePopup(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Display Box for the Admin-set Phone Number */}
              <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-3 mb-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {lang === 'ar' ? 'الرقم المباشر:' : 'Direct Phone:'}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-cyan-300 font-mono tracking-wider" dir="ltr">
                    {companyInfo.phone}
                  </span>
                </div>
                <motion.button
                  onClick={copyPhoneNumber}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title={lang === 'ar' ? 'نسخ الرقم' : 'Copy Number'}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </div>

              {copied && (
                <div className="text-[11px] text-emerald-400 font-bold mb-3 text-center animate-in fade-in">
                  {lang === 'ar' ? '✓ تم نسخ الرقم بنجاح إلى الحافظة' : '✓ Number copied to clipboard'}
                </div>
              )}

              {/* Action Buttons: Direct Call & Direct WhatsApp */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{lang === 'ar' ? 'اتصال الآن' : 'Call Now'}</span>
                </a>

                <a
                  href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                    lang === 'ar'
                      ? 'السلام عليكم، أود حجز موعد صيانة مكيفات / غسالات'
                      : 'Hello, I want to book an AC/Washer maintenance appointment'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating WhatsApp Button with pulse physics */}
      <div className="relative group">
        <motion.a
          href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
            lang === 'ar'
              ? 'السلام عليكم، أود حجز موعد صيانة مكيفات / غسالات'
              : 'Hello, I want to book an AC/Washer maintenance appointment'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-colors relative"
          aria-label="WhatsApp Us"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
          <MessageCircle className="w-7 h-7 relative z-10" />
        </motion.a>

        {/* Tooltip on hover */}
        <div className="absolute bottom-full mb-2 hidden sm:group-hover:flex items-center bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none -translate-x-1/2 left-1/2">
          <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat via WhatsApp'}</span>
        </div>
      </div>
    </div>
  );
};
