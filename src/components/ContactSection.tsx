import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Building,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';
import { useCompany } from '../context/CompanyContext';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const { companyInfo } = useCompany();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeBranch, setActiveBranch] = useState<'riyadh' | 'jeddah' | 'dammam'>('riyadh');

  const branches = {
    riyadh: {
      titleAr: 'الفرع الرئيسي - الرياض',
      titleEn: 'Main Headquarters - Riyadh',
      addressAr: 'طريق الملك فهد، حي الملقا، الرياض 13524',
      addressEn: 'King Fahd Road, Al Malqa, Riyadh 13524',
      mapQuery: 'Riyadh+Al+Malqa+King+Fahd+Rd',
      embedSrc: 'https://maps.google.com/maps?q=King%20Fahd%20Road,%20Al%20Malqa,%20Riyadh&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    jeddah: {
      titleAr: 'فرع المنطقة الغربية - جدة',
      titleEn: 'Western Branch - Jeddah',
      addressAr: 'طريق الملك عبدالعزيز، حي الروضة، جدة 23432',
      addressEn: 'King Abdulaziz Road, Al Rawdah, Jeddah 23432',
      mapQuery: 'Jeddah+Al+Rawdah+King+Abdulaziz',
      embedSrc: 'https://maps.google.com/maps?q=Al%20Rawdah,%20Jeddah,%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    dammam: {
      titleAr: 'فرع المنطقة الشرقية - الدمام والخبر',
      titleEn: 'Eastern Province - Dammam & Khobar',
      addressAr: 'طريق الأمير محمد بن فهد، حي الشاطئ، الدمام 32414',
      addressEn: 'Prince Mohammed bin Fahd Rd, Al Shati, Dammam 32414',
      mapQuery: 'Dammam+Al+Shati+Prince+Mohammed',
      embedSrc: 'https://maps.google.com/maps?q=Al%20Shati,%20Dammam,%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(companyInfo.phoneClean);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const currentBranch = branches[activeBranch];

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3">
            <Phone className="w-3.5 h-3.5 text-cyan-700" />
            <span>{lang === 'ar' ? 'خدمة عملاء على مدار الساعة' : '24/7 Dedicated Support'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
            {lang === 'ar' ? 'تواصل معنا واحصل على الدعم الفوري' : 'Contact Us & Immediate Support'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'ar'
              ? 'فريق خدمة العملاء ومشرفو الصيانة جاهزون لتلقي بلاغاتكم وحجز المواعيد على مدار 24 ساعة.'
              : 'Our customer support coordinators and dispatch managers are available around the clock.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Call, WhatsApp & Working Hours Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Call Action Card (Number hidden, click to call only) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400">
                    {lang === 'ar' ? 'الاتصال المباشر / الخط الساخن' : 'Direct Call / Hotline'}
                  </h3>
                  <div className="text-base sm:text-lg font-black text-[#0B1B3D]">
                    {lang === 'ar' ? 'فريق خدمة العملاء متاح 24/7' : '24/7 Customer Support Team'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {lang === 'ar'
                  ? 'اضغط على زر الاتصال للتحدث مباشرة مع مشرف الصيانة وتحديد موعد حضور الفني.'
                  : 'Click the call button below to speak directly with our service dispatch team.'}
              </p>

              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="w-full py-3.5 bg-gradient-to-r from-[#0B1B3D] to-[#122A5E] hover:from-[#122A5E] hover:to-[#0B1B3D] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'اتصل الآن مباشرة' : 'Call Directly Now'}</span>
              </a>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="bg-emerald-50 rounded-3xl p-6 sm:p-7 shadow-md border border-emerald-200/90">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-emerald-800">
                    {lang === 'ar' ? 'المحادثة الفورية' : 'Live Instant Chat'}
                  </h3>
                  <div className="text-lg sm:text-xl font-black text-emerald-950">
                    {lang === 'ar' ? `واتساب ${companyInfo.nameAr}` : 'WhatsApp Support'}
                  </div>
                </div>
              </div>

              <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                {lang === 'ar'
                  ? 'أرسل موقع منزلك وتفاصيل العطل عبر الواتساب لتلقي الرد الفوري وتأكيد حضور الفني.'
                  : 'Send your live GPS pin and appliance photos via WhatsApp for immediate dispatch confirmation.'}
              </p>

              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                  lang === 'ar' 
                    ? 'السلام عليكم ورحمة الله، أود الاستفسار وحجز موعد صيانة'
                    : 'Hello, I want to inquire and book a maintenance appointment'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat via WhatsApp'}</span>
              </a>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 space-y-3">
              <div className="flex items-center gap-3 text-[#0B1B3D] font-bold text-sm sm:text-base">
                <Clock className="w-5 h-5 text-cyan-600" />
                <span>{lang === 'ar' ? 'أوقات وساعات العمل بالمملكة' : 'Working & Dispatch Hours'}</span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100 font-medium">
                  <span className="text-slate-500">{lang === 'ar' ? 'طوارئ التكييف والغسالات:' : 'Emergency Dispatch:'}</span>
                  <span className="font-bold text-emerald-600">{lang === 'ar' ? '24 ساعة / 7 أيام' : '24/7 Around the clock'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 font-medium">
                  <span className="text-slate-500">{lang === 'ar' ? 'الفترة الصباحية:' : 'Morning Shift:'}</span>
                  <span className="font-bold text-slate-800">08:00 ص - 12:00 م</span>
                </div>
                <div className="flex justify-between py-1.5 font-medium">
                  <span className="text-slate-500">{lang === 'ar' ? 'الفترة المسائية:' : 'Evening Shift:'}</span>
                  <span className="font-bold text-slate-800">04:00 م - 11:00 م</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                {lang === 'ar' ? 'السجل التجاري المعتمد: ' : 'Commercial Registration: '}
                <span className="font-mono font-bold text-slate-600">{companyInfo.crNumber}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Location View & Branch Picker */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 flex flex-col justify-between">
            <div>
              {/* Branch Selector Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-base sm:text-lg font-black text-[#0B1B3D]">
                    {lang === 'ar' ? 'مواقع الفروع بالمملكة' : 'Our Branch Locations'}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['riyadh', 'jeddah', 'dammam'] as const).map((branchKey) => (
                    <button
                      key={branchKey}
                      onClick={() => setActiveBranch(branchKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeBranch === branchKey
                          ? 'bg-[#0B1B3D] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {branchKey === 'riyadh' ? (lang === 'ar' ? 'الرياض' : 'Riyadh') :
                       branchKey === 'jeddah' ? (lang === 'ar' ? 'جدة' : 'Jeddah') :
                       (lang === 'ar' ? 'الدمام' : 'Dammam')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Branch Information Banner */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-black text-slate-900 text-sm">
                    {lang === 'ar' ? currentBranch.titleAr : currentBranch.titleEn}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {lang === 'ar' ? currentBranch.addressAr : currentBranch.addressEn}
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentBranch.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-700 hover:text-cyan-800 font-bold bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
                </a>
              </div>

              {/* Google Maps iFrame */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                <iframe
                  title={`Google Map - ${currentBranch.titleEn}`}
                  src={currentBranch.embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{lang === 'ar' ? 'نغطي كافة أحياء المدينة مع خدمة الوصول للمنازل' : 'Doorstep dispatch covering all city sectors'}</span>
              <span className="font-semibold text-emerald-600">✓ {lang === 'ar' ? 'متاح الآن' : 'Available Now'}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
