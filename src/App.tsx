import React, { useState, useEffect } from 'react';
import { Language, ServiceItem, AdminNotification, AdminBooking } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDeepDives } from './components/ServiceDeepDives';
import { CoverageSection } from './components/CoverageSection';
import { BookingForm } from './components/BookingForm';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Bell, X, Shield, MessageCircle } from 'lucide-react';
import { getAdminWhatsAppNotificationUrl } from './utils/bookingStore';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [bookingPreselectedService, setBookingPreselectedService] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [liveToast, setLiveToast] = useState<{ booking: AdminBooking; notification: AdminNotification } | null>(null);

  // Synchronize document dir and lang attributes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Listen to new booking notifications for real-time alert
  useEffect(() => {
    const handleNewBooking = (event: Event) => {
      const customEvent = event as CustomEvent<{ booking: AdminBooking; notification: AdminNotification }>;
      if (customEvent.detail) {
        setLiveToast(customEvent.detail);
        // Auto dismiss after 10 seconds
        setTimeout(() => {
          setLiveToast((prev) => (prev?.notification.id === customEvent.detail.notification.id ? null : prev));
        }, 10000);
      }
    };

    window.addEventListener('new_booking_notification', handleNewBooking);
    return () => window.removeEventListener('new_booking_notification', handleNewBooking);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setBookingPreselectedService(serviceName);
    }
    const bookingElement = document.getElementById('booking-section');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-50/70 text-slate-800 ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}>
      
      {/* 1. Header & Navigation */}
      <Navbar 
        lang={lang} 
        onToggleLang={toggleLanguage} 
        onOpenBooking={handleOpenBooking} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Headline: "خدمات صيانة وإصلاح المكيفات والغسالات" & Buttons) */}
        <HeroSection 
          lang={lang} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 3. خدماتنا (Our Services Overview Cards with AI images and "احجز الآن" buttons) */}
        <ServicesSection 
          lang={lang} 
          onOpenBooking={handleOpenBooking}
          onSelectServiceModal={(service) => setSelectedServiceForModal(service)}
        />

        {/* 4. Dedicated Sections: صيانة المكيفات, إصلاح الغسالات, تنظيف المكيفات, تركيب المكيفات */}
        <ServiceDeepDives 
          lang={lang} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 5. Service Areas & Coverage Across Saudi Arabia */}
        <CoverageSection 
          lang={lang} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 6. Simple Booking Form */}
        <BookingForm 
          lang={lang} 
          initialService={bookingPreselectedService} 
        />

        {/* 7. من نحن (About Us & Certifications) */}
        <AboutSection 
          lang={lang} 
        />

        {/* 8. Customer Reviews across Saudi Arabia */}
        <ReviewsSection 
          lang={lang} 
        />

        {/* 9. تواصل معنا (Contact Us, WhatsApp, Phone call button, Google Maps, Working hours) */}
        <ContactSection 
          lang={lang} 
        />
      </main>

      {/* 10. Footer */}
      <Footer 
        lang={lang} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 11. Floating Quick Actions (WhatsApp, Phone Call, Back to Top) */}
      <FloatingActions 
        lang={lang} 
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* 12. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        lang={lang}
        onClose={() => setSelectedServiceForModal(null)}
        onBook={(title) => {
          setSelectedServiceForModal(null);
          handleOpenBooking(title);
        }}
      />

      {/* 13. Admin Management Portal (Protected by Password: 444123) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />

      {/* 14. Real-Time Admin Booking Alert Toast */}
      {liveToast && (
        <div className="fixed top-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#071329] text-white p-4 rounded-2xl shadow-2xl border-2 border-cyan-400/50 flex flex-col gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md animate-bounce">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-300">
                    {lang === 'ar' ? '🔔 إشعار حجز جديد!' : '🔔 New Booking Alert!'}
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                    {liveToast.booking.id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {liveToast.booking.customerName} - {liveToast.booking.service}
                </h4>
              </div>
            </div>

            <button
              onClick={() => setLiveToast(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <span>📍 {liveToast.booking.city}</span>
            <span>📅 {liveToast.booking.preferredDate}</span>
            <span dir="ltr" className="font-mono text-cyan-400">{liveToast.booking.phone}</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                setLiveToast(null);
                setIsAdminOpen(true);
              }}
              className="flex-1 py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'عرض في لوحة الإدارة' : 'Open Admin Panel'}</span>
            </button>

            <a
              href={getAdminWhatsAppNotificationUrl(liveToast.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
              title={lang === 'ar' ? 'إرسال التنبيه لواتساب الإدارة' : 'WhatsApp Admin Alert'}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'واتساب الإدارة' : 'Admin WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

