import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  Globe, 
  Wrench, 
  Sparkles,
  ChevronDown,
  Lock,
  Bell,
  Zap,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { useCompany } from '../context/CompanyContext';
import { getAdminNotifications } from '../utils/bookingStore';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBooking: (serviceName?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenBooking, onOpenAdmin }) => {
  const { companyInfo } = useCompany();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Cycling announcement ticker for top bar
  const topAnnouncements = [
    {
      icon: Clock,
      ar: 'خدمة طوارئ 24/7 متوفرة الآن — وصول الفني خلال 45-60 دقيقة',
      en: '24/7 Emergency Service Active — Rapid Dispatch in 45-60 Mins',
      highlightAr: 'متاح الآن',
      highlightEn: 'Available Now'
    },
    {
      icon: ShieldCheck,
      ar: 'ضمان معتمد حتى 6 أشهر على كافة قطع الغيار الأصلية والإصلاحات',
      en: 'Certified 6-Month Warranty on Genuine Parts & Repairs',
      highlightAr: 'ضمان رسمي',
      highlightEn: 'Official Warranty'
    },
    {
      icon: Tag,
      ar: 'خصم خاص 20% عند طلب صيانة وغسيل 3 مكيفات أو أكثر',
      en: 'Special 20% Discount for 3+ AC cleaning & servicing orders',
      highlightAr: 'عرض الموسم',
      highlightEn: 'Season Offer'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % topAnnouncements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [topAnnouncements.length]);

  useEffect(() => {
    const updateUnread = () => {
      const notifs = getAdminNotifications();
      setUnreadNotifsCount(notifs.filter(n => !n.read).length);
    };
    updateUnread();
    window.addEventListener('notifications_updated', updateUnread);
    window.addEventListener('bookings_updated', updateUnread);
    return () => {
      window.removeEventListener('notifications_updated', updateUnread);
      window.removeEventListener('bookings_updated', updateUnread);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', labelAr: 'الرئيسية', labelEn: 'Home' },
    { href: '#services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { href: '#ac-maintenance', labelAr: 'صيانة المكيفات', labelEn: 'AC Maintenance' },
    { href: '#washing-machine', labelAr: 'إصلاح الغسالات', labelEn: 'Washer Repair' },
    { href: '#ac-cleaning', labelAr: 'تنظيف المكيفات', labelEn: 'AC Cleaning' },
    { href: '#ac-installation', labelAr: 'تركيب المكيفات', labelEn: 'AC Installation' },
    { href: '#about', labelAr: 'من نحن', labelEn: 'About Us' },
    { href: '#contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CurrentIcon = topAnnouncements[tickerIndex].icon;

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Top Utility Announcement Bar with Live Ticker Animation */}
      <div className="bg-[#050D1D] text-slate-300 text-xs py-1.5 px-4 border-b border-cyan-900/40 relative overflow-hidden">
        {/* Animated Aurora sweep across top bar background */}
        <motion.div 
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none"
        />

        {/* Animated ambient shimmer line across top */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 relative z-10">
          
          {/* Animated Announcement Ticker */}
          <div className="flex items-center gap-2 overflow-hidden py-0.5 min-h-[24px] max-w-[58%] sm:max-w-none">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] sm:text-[11px] font-bold text-cyan-300 shadow-xs flex-shrink-0">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
              </span>
              <span>{lang === 'ar' ? topAnnouncements[tickerIndex].highlightAr : topAnnouncements[tickerIndex].highlightEn}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tickerIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px] sm:text-xs truncate"
              >
                <CurrentIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="truncate">
                  {lang === 'ar' ? topAnnouncements[tickerIndex].ar : topAnnouncements[tickerIndex].en}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right utility items: Phone, Lang, Admin */}
          <div className="flex items-center gap-1.5 sm:gap-3 ml-auto flex-shrink-0">
            {/* Direct Call Button (No raw phone number displayed) */}
            <motion.a 
              href={`tel:${companyInfo.phoneClean}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 text-white hover:text-cyan-300 transition-colors font-bold text-[11px] sm:text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-3 py-1 rounded-full border border-cyan-400/40 shadow-sm cursor-pointer"
              title={lang === 'ar' ? 'اتصل بنا الآن مباشرة' : 'Call Directly Now'}
            >
              <Phone className="w-3 h-3 text-white animate-pulse" />
              <span>{lang === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
            </motion.a>

            {/* Language Switcher */}
            <motion.button
              onClick={onToggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 hover:text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-cyan-500/30 transition-all cursor-pointer shadow-sm"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>

            {/* Admin Portal Button with glowing bounce on alert */}
            <motion.button
              onClick={onOpenAdmin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border border-cyan-500/40 transition-all cursor-pointer shadow-sm"
              title={lang === 'ar' ? 'لوحة تحكم الإدارة' : 'Admin Portal'}
            >
              <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
              <span className="hidden xs:inline sm:inline">{lang === 'ar' ? 'الإدارة' : 'Admin'}</span>
              {unreadNotifsCount > 0 && (
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center gap-0.5 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full shadow-sm"
                >
                  <Bell className="w-2 h-2" />
                  <span>{unreadNotifsCount}</span>
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className={`transition-all duration-300 relative overflow-hidden ${
        isScrolled 
          ? 'glass-nav py-2.5 shadow-2xl border-b border-cyan-500/30 backdrop-blur-md bg-[#071329]/95' 
          : 'bg-[#0B1B3D]/95 py-3.5 border-b border-white/10'
      }`}>
        {/* Continuous Animated Top Ambient Laser Stream across Navbar */}
        <motion.div 
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[0.5px] pointer-events-none"
        />

        {/* Subtle moving radial glow behind navigation links */}
        <motion.div 
          animate={{
            x: ['-20%', '80%', '-20%'],
            opacity: [0.08, 0.18, 0.08]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-10 left-1/4 w-96 h-24 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <motion.a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30"
              >
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  {lang === 'ar' ? companyInfo.nameAr : companyInfo.nameEn}
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                </span>
                <span className="text-[10px] sm:text-xs text-cyan-300 font-medium">
                  {lang === 'ar' ? 'صيانة المكيفات والغسالات بالمملكة' : 'Saudi AC & Appliance Care'}
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  whileHover={{ y: -1.5 }}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 rounded-lg hover:bg-white/5 transition-all cursor-pointer whitespace-nowrap"
                >
                  {lang === 'ar' ? link.labelAr : link.labelEn}
                </motion.button>
              ))}
            </div>

            {/* Action Buttons with Interactive Motion */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                  lang === 'ar' 
                    ? 'السلام عليكم، أود الاستفسار عن خدمات صيانة وإصلاح المكيفات والغسالات'
                    : 'Hello, I would like to inquire about AC and washing machine maintenance services'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </motion.a>

              <motion.button
                onClick={() => onOpenBooking()}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                <span>{lang === 'ar' ? 'احجز خدمة الآن' : 'Book Service'}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <motion.button
                onClick={() => onOpenBooking()}
                whileTap={{ scale: 0.95 }}
                className="sm:hidden text-xs bg-cyan-400 text-slate-950 font-black px-2.5 py-1.5 rounded-lg shadow-sm"
              >
                {lang === 'ar' ? 'احجز الآن' : 'Book'}
              </motion.button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-cyan-500/20 relative cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="xl:hidden bg-[#071329]/98 border-t border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 gap-1 py-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-right py-2.5 px-3 text-sm font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors flex items-center justify-between"
                    style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                  >
                    <span>{lang === 'ar' ? link.labelAr : link.labelEn}</span>
                    <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90 rtl:rotate-90" />
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl text-center shadow-lg cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز خدمة الآن' : 'Book a Service Now'}
                </button>

                <a
                  href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                    lang === 'ar' 
                      ? 'السلام عليكم، أود حجز موعد لصيانة أجهزة التكييف / الغسالة'
                      : 'Hello, I want to book an appointment for AC/Appliance repair'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat via WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="w-full py-2.5 bg-slate-800 text-cyan-300 font-bold rounded-xl flex items-center justify-center gap-2 border border-cyan-500/30 hover:bg-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'ar' ? 'اتصل بنا هاتفياً الآن' : 'Call Directly Now'}</span>
                </a>

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="w-full py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'ar' ? 'لوحة تحكم الإدارة' : 'Admin Portal'}</span>
                  {unreadNotifsCount > 0 && (
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {unreadNotifsCount} {lang === 'ar' ? 'جديد' : 'New'}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
