import React from 'react';
import { 
  Wrench, 
  Wind, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Gauge, 
  Check, 
  Zap, 
  PhoneCall, 
  CalendarCheck 
} from 'lucide-react';
import { Language } from '../types';
import { ASSETS, COMPANY_INFO } from '../data/content';

interface ServiceDeepDivesProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServiceDeepDives: React.FC<ServiceDeepDivesProps> = ({ lang, onOpenBooking }) => {
  return (
    <div className="space-y-0">
      
      {/* 1. صيانة المكيفات (AC Maintenance & Repair) */}
      <section id="ac-maintenance" className="py-20 bg-white border-t border-sky-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                <Wind className="w-3.5 h-3.5 text-cyan-700" />
                <span>{lang === 'ar' ? 'صيانة وإصلاح التكييف الاحترافي' : 'Professional HVAC Care'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
                {lang === 'ar' ? 'صيانة المكيفات السبليت والمركزية' : 'Split & Central AC Repair & Diagnostics'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'نعالج كافة أعطال التكييف بأسلوب هندسي دقيق: توقف الكومبروسر، ضعف الهواء البارد، صدور روائح كريهة، ارتفاع صوت المروحة، أو احتراق كارت التحكم الإلكتروني. نوفر شحن غاز الفريون الأصلي (أمريكي R410A / R22) مع ضمان عدم التسريب.'
                  : 'We resolve all air conditioning failures with engineering precision: compressor burnout, lack of cold airflow, musty odors, fan vibration, or burnt PCB control boards. We refill genuine American R410A / R22 refrigerant with guaranteed zero-leak certification.'}
              </p>

              {/* Technical Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { ar: 'فحص ضغط الغاز بالمانيفولد الرقمي', en: 'Digital manifold pressure test' },
                  { ar: 'تغيير كابستور المكثف والمروحة', en: 'Capacitor & fan motor repair' },
                  { ar: 'كشف تسريب النحاس بالنيتروجين', en: 'Nitrogen gas pressure leak test' },
                  { ar: 'ضمان كتابي معتمد حتى 6 أشهر', en: 'Certified 6-month written warranty' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span>{lang === 'ar' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>

              {/* Price and CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                  <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'سعر الكشف والإصلاح:' : 'Inspection & Repair from:'}</span>
                  <span className="text-xl font-black text-[#0B1B3D]">149 <span className="text-xs font-semibold text-cyan-700">{lang === 'ar' ? 'ر.س' : 'SAR'}</span></span>
                </div>

                <button
                  onClick={() => onOpenBooking(lang === 'ar' ? 'صيانة المكيفات' : 'AC Maintenance')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز صيانة مكيف الآن' : 'Book AC Repair Now'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={ASSETS.acMaintenanceImage}
                  alt={lang === 'ar' ? 'فني يشحن غاز الفريون لمكيف سبليت' : 'Technician refilling freon in split AC'}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 left-5 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'فريون أصلي نقي 100%' : '100% Pure US Freon'}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {lang === 'ar' ? 'أجهزة كشف الأعطال الرقمية المعتمدة' : 'Certified Digital Diagnostic Equipment'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'ar' ? 'نحدد العطل فوراً لتوفير وقتك وتكلفة الإصلاح دون تخمين' : 'Pinpointing root causes accurately without guesswork'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. إصلاح الغسالات (Washing Machine Repair) */}
      <section id="washing-machine" className="py-20 bg-gradient-to-b from-sky-50/70 via-sky-50/30 to-white border-t border-sky-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={ASSETS.washingMachineImage}
                  alt={lang === 'ar' ? 'فني يصلح غسالة أوتوماتيك رقمية بالمنزل' : 'Technician repairing digital automatic washer'}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 left-5 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'صيانة فورية بمنزلك' : 'Instant In-Home Repair'}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {lang === 'ar' ? 'جميع ماركات الغسالات الأوتوماتيك والنشافات' : 'All Automatic Washers & Dryers Brands'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    LG, Samsung, Whirlpool, Bosch, Daewoo, Ariston, Mabe, Toshiba
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-blue-700" />
                <span>{lang === 'ar' ? 'صيانة الأجهزة المنزلية الذكية' : 'Smart Home Appliance Service'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
                {lang === 'ar' ? 'إصلاح وصيانة الغسالات الأوتوماتيك والنشافات' : 'Automatic Washing Machine & Dryer Repairs'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'لا داعي لنقل الغسالة الثقيلة؛ فنيونا يصلون إلى باب منزلك مع حقيبة قطع الغيار الأصلية. نحل مشاكل تسريب الماء، توقف دورة التنشيف والعصر، الاهتزاز العنيف، قفل الباب العالق، واحتراق طلمبة سحب أو تصريف المياه في نفس الجلسة.'
                  : 'No need to transport heavy appliances. Our certified technicians arrive at your home fully equipped with genuine spare parts. We fix water leaks, spin cycle failures, shaking, locked doors, and drainage pumps in a single visit.'}
              </p>

              {/* Troubleshooting items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { ar: 'حل رموز الأعطال الرقمية (OE, UE, E4, LE)', en: 'Clearing digital error codes (OE, UE, LE)' },
                  { ar: 'تغيير رمان البلي والسيور الأصلية', en: 'Drum bearings & OEM belts replacement' },
                  { ar: 'إصلاح كروت الإنفرتر الإلكترونية', en: 'Inverter PCB board troubleshooting' },
                  { ar: 'ضمان 90 يوماً معتمد على قطع الغيار', en: '90-Day warranty on all replaced parts' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{lang === 'ar' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                  <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'زيارة وكشف منزلي يبدأ من:' : 'Home visit & inspection from:'}</span>
                  <span className="text-xl font-black text-[#0B1B3D]">129 <span className="text-xs font-semibold text-cyan-700">{lang === 'ar' ? 'ر.س' : 'SAR'}</span></span>
                </div>

                <button
                  onClick={() => onOpenBooking(lang === 'ar' ? 'إصلاح الغسالات' : 'Washing Machine Repair')}
                  className="bg-[#0B1B3D] hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز صيانة غسالة الآن' : 'Book Washer Repair Now'}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. تنظيف المكيفات (AC Cleaning & Sanitization) */}
      <section id="ac-cleaning" className="py-20 bg-white border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                <Droplets className="w-3.5 h-3.5 text-cyan-700" />
                <span>{lang === 'ar' ? 'غسيل عميق وحماية الأثاث' : 'Deep Wash & Furniture Protection'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
                {lang === 'ar' ? 'تنظيف وغسيل المكيفات بالضغط والجراب العازل' : 'Deep AC Cleaning with Protective Catchment Bags'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'غسيل شامل دون إحداث أي فوضى في الغرفة. نستخدم جراباً بلاستيكياً مخصصاً يحيط بالمكيف بالكامل مع خرطوم تصريف خارجي، ونقوم بضخ رغوة كيميائية آمنة تزيل الأتربة المتكلسة والعفن والروائح المكتومة، تليها مياه مضغوطة تنظف شفرات المبخر ومجرى الصرف.'
                  : 'Deep pressure washing with zero mess. We install a specialized waterproof catchment bag completely around the indoor unit with a direct drain hose, applying certified foaming cleaners to dissolve compacted dust, mold, and trapped odors, followed by high-pressure rinsing.'}
              </p>

              {/* 4 Step Process */}
              <div className="space-y-3 pt-2">
                {[
                  { step: '01', titleAr: 'عزل الجدران والأثاث', titleEn: 'Wall & Furniture Waterproof Shielding', descAr: 'تركيب الجراب المخصص مع تغطية المفروشات', descEn: 'Waterproof bag installation and furniture covers' },
                  { step: '02', titleAr: 'حقن الفوم الكيميائي المنظف', titleEn: 'Antibacterial Foam Injection', descAr: 'تفتيت الدهون والأوساخ المتراكمة بالرديتر الداخلي', descEn: 'Dissolving built-up grease and coils contamination' },
                  { step: '03', titleAr: 'غسيل مضغوط وتسليك الصرف', titleEn: 'Pressure Wash & Drain Flush', descAr: 'تسليك مجرى المياه لمنع التنقيط الداخلي نهائياً', descEn: 'Flushing condensate line preventing future water leaks' },
                  { step: '04', titleAr: 'تعطير وتعقيم طبي', titleEn: 'Medical Sanitization & Refreshing', descAr: 'القضاء على الجراثيم والفطريات المسببة للربو', descEn: 'Eradicating 99.9% of bacteria and allergens' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-xs font-black text-cyan-600 bg-cyan-100 px-2 py-1 rounded-md">{item.step}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{lang === 'ar' ? item.titleAr : item.titleEn}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500">{lang === 'ar' ? item.descAr : item.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
                  <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'سعر الغسيل الشامل للمكيف:' : 'Full wash per unit from:'}</span>
                  <span className="text-xl font-black text-[#0B1B3D]">99 <span className="text-xs font-semibold text-cyan-700">{lang === 'ar' ? 'ر.س (خصم للكميات)' : 'SAR (Discounts for 3+)'}</span></span>
                </div>

                <button
                  onClick={() => onOpenBooking(lang === 'ar' ? 'تنظيف وغسيل المكيفات' : 'AC Cleaning')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز غسيل مكيفات الآن' : 'Book AC Cleaning Now'}
                </button>
              </div>

            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={ASSETS.acCleaningImage}
                  alt={lang === 'ar' ? 'غسيل مكيف سبليت بجراب الحماية ومسدس الرش' : 'AC Cleaning with catchment bag and pressure washer'}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 left-5 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                    <span>{lang === 'ar' ? 'حماية تامة للجدران والفرش 100%' : '100% Mess-Free Protection'}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {lang === 'ar' ? 'تنظيف يعيد تبريد المكيف بنسبة 100%' : 'Restores Factory Cooling Efficiency'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'ar' ? 'يوفر حتى 25% من فاتورة الكهرباء الشهرية' : 'Lowers energy bills by up to 25%'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. تركيب المكيفات (AC Installation & Piping) */}
      <section id="ac-installation" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={ASSETS.acInstallationImage}
                  alt={lang === 'ar' ? 'فني يثبت وحدة مكيف خارجية مع تمديد مواسير النحاس' : 'Technician installing outdoor split AC compressor'}
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 right-5 left-5 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'نحاس مولر أمريكي أصلي' : 'Original US Mueller Copper'}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {lang === 'ar' ? 'تركيب هندسي بميزان ليزر لمنع التنقيط' : 'Laser-Leveled Zero-Drip Installation'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {lang === 'ar' ? 'تفريغ الهواء بمضخة فاكيوم لحماية الكومبروسر' : 'Vacuum dehydration ensuring compressor longevity'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold">
                <Wrench className="w-3.5 h-3.5 text-sky-700" />
                <span>{lang === 'ar' ? 'فك وتركيب وتمديد احترافي' : 'Professional Dismantling & Installation'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
                {lang === 'ar' ? 'فك وتركيب المكيفات وتمديد مواسير النحاس' : 'AC Installation, Relocation & Copper Piping'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'سواء كنت تنتقل لمنزل جديد أو تشتري مكيفاً حديثاً، فريقنا يتولى المهمة بالكامل: فك آمن مع حبس الفريون داخل الكومبروسر، تمديد خطوط النحاس الأمريكي بالعزل الحراري المزدوج، تثبيت حوامل حديدية قوية مقاومة للصدأ، واختبار التبريد لمدة 30 دقيقة قبل التسليم.'
                  : 'Whether moving to a new villa or upgrading units, our team handles the entire process: safe gas pump-down, premium Mueller copper tubing extension with dual UV insulation, rust-proof mounting brackets, and a mandatory 30-minute operational test.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { ar: 'حبس الغاز لتفادي فقدان شحنة الفريون', en: 'Refrigerant pump-down preservation' },
                  { ar: 'عزل حراري إيطالي مقاوم لحرارة الصيف', en: 'Italian heat & UV proof insulation' },
                  { ar: 'قواعد حديدية سميكة مع ربلات مانعة للاهتزاز', en: 'Heavy-duty brackets with vibration pads' },
                  { ar: 'ضمان سنة كاملة على التركيب والتمديد', en: 'Full 1-year installation warranty' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{lang === 'ar' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                  <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'سعر فك أو تركيب الوحدة يبدأ من:' : 'Installation/relocation per unit from:'}</span>
                  <span className="text-xl font-black text-[#0B1B3D]">180 <span className="text-xs font-semibold text-cyan-700">{lang === 'ar' ? 'ر.س' : 'SAR'}</span></span>
                </div>

                <button
                  onClick={() => onOpenBooking(lang === 'ar' ? 'فك وتركيب المكيفات' : 'AC Installation')}
                  className="bg-[#0B1B3D] hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'احجز موعد تركيب الآن' : 'Book Installation Now'}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
