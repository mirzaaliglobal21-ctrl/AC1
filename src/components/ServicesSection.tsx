import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  CalendarCheck, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ServiceItem } from '../types';
import { SERVICES } from '../data/content';

interface ServicesSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
  onSelectServiceModal?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  lang, 
  onOpenBooking,
  onSelectServiceModal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelAr: 'جميع الخدمات', labelEn: 'All Services' },
    { id: 'ac-maintenance', labelAr: 'صيانة المكيفات', labelEn: 'AC Repair' },
    { id: 'washing-machine', labelAr: 'إصلاح الغسالات', labelEn: 'Washer Repair' },
    { id: 'ac-cleaning', labelAr: 'تنظيف المكيفات', labelEn: 'AC Cleaning' },
    { id: 'ac-installation', labelAr: 'تركيب وتمديد', labelEn: 'Installation' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white via-sky-50/80 to-white relative overflow-hidden">
      {/* Subtle decorative sky blue & white background elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3">
            <Wrench className="w-3.5 h-3.5 text-cyan-700" />
            <span>{lang === 'ar' ? 'حلول منزلية متكاملة ومعتمدة' : 'Comprehensive & Certified Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
            {lang === 'ar' ? 'خدماتنا الاحترافية في المملكة' : 'Our Professional Services in KSA'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {lang === 'ar' 
              ? 'نقدم خدمات صيانة فورية بأحدث المعدات الألمانية والأمريكية مع كشف مجدول أو طارئ وقطع غيار أصلية بالكرتون.'
              : 'Prompt repairs powered by cutting-edge diagnostic equipment, emergency dispatch, and guaranteed OEM replacement parts.'}
          </p>
        </motion.div>

        {/* Filter Pills with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0B1B3D] text-white shadow-md shadow-blue-950/20'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Cards Grid with AnimatePresence & layout transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                id={`service-card-${service.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {/* Realistic AI Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={lang === 'ar' ? service.titleAr : service.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Gradient & Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {service.badgeAr && (
                    <motion.div 
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>{lang === 'ar' ? service.badgeAr : service.badgeEn}</span>
                    </motion.div>
                  )}

                  {/* Price starting chip in SAR */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                    <span className="text-slate-400">{lang === 'ar' ? 'يبدأ من: ' : 'From: '}</span>
                    <span className="text-cyan-400 font-extrabold text-sm mx-1">{service.priceFrom}</span>
                    <span className="font-semibold text-slate-200">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </div>

                  {/* Warranty period badge */}
                  <div className="absolute bottom-4 right-4 bg-emerald-950/85 backdrop-blur-sm text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold">{lang === 'ar' ? service.warrantyPeriodAr : service.warrantyPeriodEn}</span>
                  </div>
                </div>

                {/* Service Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B1B3D] mb-3 group-hover:text-cyan-600 transition-colors">
                      {lang === 'ar' ? service.titleAr : service.titleEn}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {lang === 'ar' ? service.shortDescAr : service.shortDescEn}
                    </p>

                    {/* Key Features Bullets */}
                    <div className="space-y-2.5 mb-6">
                      {(lang === 'ar' ? service.featuresAr : service.featuresEn).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <div className="w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-600">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <motion.button
                      onClick={() => onOpenBooking(lang === 'ar' ? service.titleAr : service.titleEn)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-gradient-to-r from-[#0B1B3D] to-[#122A5E] hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'ar' ? 'احجز الآن' : 'Book Now'}</span>
                    </motion.button>

                    {onSelectServiceModal && (
                      <motion.button
                        onClick={() => onSelectServiceModal(service)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        title={lang === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}
                        aria-label="Service Details"
                      >
                        <Info className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
