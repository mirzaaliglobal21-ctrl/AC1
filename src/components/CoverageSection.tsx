import React, { useState } from 'react';
import { MapPin, Clock, Users, CheckCircle2, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { CITIES_COVERAGE } from '../data/content';

interface CoverageSectionProps {
  lang: Language;
  onOpenBooking: (cityName?: string) => void;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({ lang, onOpenBooking }) => {
  const [activeCityId, setActiveCityId] = useState<string>('riyadh');

  const activeCity = CITIES_COVERAGE.find(c => c.id === activeCityId) || CITIES_COVERAGE[0];

  return (
    <section id="coverage" className="py-20 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-cyan-700" />
            <span>{lang === 'ar' ? 'تغطية جغرافية شاملة' : 'Kingdom-Wide Coverage'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
            {lang === 'ar' ? 'مناطق وفروع الخدمة في المملكة' : 'Service Areas Across Saudi Arabia'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'ar'
              ? 'سيارات مجهزة وورش متنقلة متمركزة في أهم أحياء المملكة لضمان سرعة الوصول خلال أقل من 60 دقيقة.'
              : 'Fully equipped mobile service workshops stationed across key Saudi districts for under 60-minute arrival.'}
          </p>
        </motion.div>

        {/* City Switcher Tabs with Motion */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {CITIES_COVERAGE.map((city) => (
            <motion.button
              key={city.id}
              onClick={() => setActiveCityId(city.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCityId === city.id
                  ? 'bg-gradient-to-r from-[#0B1B3D] to-[#122A5E] text-white shadow-lg shadow-blue-950/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${activeCityId === city.id ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{lang === 'ar' ? city.nameAr : city.nameEn}</span>
            </motion.button>
          ))}
        </div>

        {/* Active City Details Card with AnimatePresence */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0B1B3D] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-cyan-500/20">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10"
            >
              
              {/* Left Column: Metrics & City Info */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                    {lang === 'ar' ? activeCity.regionAr : activeCity.regionEn}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {lang === 'ar' ? `خدمات الصيانة في ${activeCity.nameAr}` : `Maintenance Services in ${activeCity.nameEn}`}
                  </h3>
                </div>

                {/* Stats badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'سرعة الاستجابة' : 'Response Time'}</span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {lang === 'ar' ? activeCity.responseTimeAr : activeCity.responseTimeEn}
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                      <Users className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'فريق فني متواجد' : 'Active Technicians'}</span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {activeCity.techniciansCount} {lang === 'ar' ? 'فني معتمد' : 'Certified Techs'}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    onClick={() => onOpenBooking(lang === 'ar' ? activeCity.nameAr : activeCity.nameEn)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? `طلب فني في ${activeCity.nameAr} الآن` : `Request Technician in ${activeCity.nameEn}`}
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Covered Districts List */}
              <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'أبرز الأحياء المشمولة بالخدمة السريعة:' : 'Key Serviced Districts & Neighborhoods:'}</span>
                </h4>

                <div className="flex flex-wrap gap-2">
                  {(lang === 'ar' ? activeCity.districtsAr : activeCity.districtsEn).map((district, dIdx) => (
                    <motion.span
                      key={dIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: dIdx * 0.03 }}
                      className="text-xs bg-slate-900/90 text-cyan-200 px-3 py-1.5 rounded-lg border border-cyan-500/20 font-medium"
                    >
                      {district}
                    </motion.span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  {lang === 'ar'
                    ? '* تشمل الخدمة جميع المجمعات السكنية، الفلل، الشقق، الشركات، والمكاتب داخل المدينة وضواحيها.'
                    : '* Service covers all residential villas, compounds, commercial towers, and offices.'}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
