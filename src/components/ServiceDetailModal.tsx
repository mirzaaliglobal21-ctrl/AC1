import React from 'react';
import { X, CheckCircle2, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { Language, ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  lang: Language;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  lang,
  onClose,
  onBook,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 rtl:left-4 ltr:right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900">
          <img
            src={service.image}
            alt={lang === 'ar' ? service.titleAr : service.titleEn}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <span className="text-xs bg-cyan-600 font-bold px-2.5 py-1 rounded-md mb-2 inline-block">
              {lang === 'ar' ? service.warrantyPeriodAr : service.warrantyPeriodEn}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              {lang === 'ar' ? service.titleAr : service.titleEn}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-slate-700 leading-relaxed">
            {lang === 'ar' ? service.fullDescAr : service.fullDescEn}
          </p>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>{lang === 'ar' ? 'ما يشمله هذا العمل:' : 'What This Service Covers:'}</span>
            </h4>
            <div className="space-y-2">
              {(lang === 'ar' ? service.featuresAr : service.featuresEn).map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'السعر التقديري:' : 'Starting Price:'}</span>
              <span className="text-lg font-black text-[#0B1B3D]">
                {service.priceFrom} <span className="text-xs font-semibold text-cyan-700">{lang === 'ar' ? service.priceUnitAr : service.priceUnitEn}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'ضمان رسمي' : 'Warranty'}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBook(lang === 'ar' ? service.titleAr : service.titleEn);
            }}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'احجز هذه الخدمة الآن' : 'Book This Service Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
