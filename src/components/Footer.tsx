import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CreditCard,
  Heart,
  Lock
} from 'lucide-react';
import { Language } from '../types';
import { useCompany } from '../context/CompanyContext';

interface FooterProps {
  lang: Language;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAdmin }) => {
  const { companyInfo } = useCompany();
  const quickLinks = [
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
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#071329] text-slate-300 pt-16 pb-12 border-t border-cyan-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Company Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  {lang === 'ar' ? companyInfo.nameAr : companyInfo.nameEn}
                </span>
                <span className="block text-[11px] text-cyan-400">
                  {lang === 'ar' ? 'صيانة وإصلاح المكيفات والغسالات' : 'AC & Appliance Care KSA'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {lang === 'ar'
                ? 'الشركة الرائدة والمعتمدة في المملكة لتقديم حلول التكييف وصيانة الأجهزة المنزلية بأعلى معايير الجودة والضمان الرسمي المعتمد في كافة مدن المملكة.'
                : 'Leading certified company across Saudi Arabia providing premier HVAC engineering and home appliance repairs with certified warranties.'}
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-400">
              <div>
                <span className="text-slate-500">{lang === 'ar' ? 'السجل التجاري:' : 'CR No:'} </span>
                <span className="font-mono text-slate-300 font-semibold">{companyInfo.crNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">{lang === 'ar' ? 'الرقم الضريبي (VAT):' : 'VAT No:'} </span>
                <span className="font-mono text-slate-300 font-semibold">{companyInfo.vatNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'أقسام الموقع' : 'Quick Navigation'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-right rtl:text-right ltr:text-left text-slate-400 hover:text-cyan-400 py-1 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? link.labelAr : link.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Key Services in Saudi Arabia */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'الخدمات المعتمدة' : 'Certified Services'}
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>{lang === 'ar' ? 'صيانة مكيفات سبليت ودكت' : 'Split & Duct AC Repair'}</li>
              <li>{lang === 'ar' ? 'غسيل مكيفات بالجراب العازل' : 'Deep Wash with Shield'}</li>
              <li>{lang === 'ar' ? 'شحن فريون أمريكي أصلي' : 'Genuine US Freon Refill'}</li>
              <li>{lang === 'ar' ? 'صيانة غسالات أوتوماتيك' : 'Auto Washer Repair'}</li>
              <li>{lang === 'ar' ? 'تمديد وتركيب مواسير النحاس' : 'Copper Piping Extension'}</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'بيانات التواصل' : 'Contact Info'}
            </h4>
            <div className="space-y-3 text-xs">
              <a 
                href={`tel:${companyInfo.phoneClean}`}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
                <span>{lang === 'ar' ? 'اتصل بخدمة العملاء مباشرة' : 'Call Customer Care Directly'}</span>
              </a>

              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{companyInfo.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? companyInfo.addressAr : companyInfo.addressEn}</span>
              </div>
            </div>

            {/* Payment methods */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block mb-2">
                {lang === 'ar' ? 'طرق الدفع المعتمدة:' : 'Accepted Payment Methods:'}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {['مدى (Mada)', 'Apple Pay', 'Visa / Master', 'STC Pay', 'Cash'].map((m, idx) => (
                  <span key={idx} className="bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md text-[10px] border border-slate-700">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {lang === 'ar' ? companyInfo.nameAr : companyInfo.nameEn}. {lang === 'ar' ? 'جميع الحقوق محفوظة بالمملكة العربية السعودية.' : 'All rights reserved in the Kingdom of Saudi Arabia.'}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>{lang === 'ar' ? 'ضمان رسمي معتمد' : 'Certified Official Warranty'}</span>
            <span>•</span>
            <span>{lang === 'ar' ? 'أسعار شاملة ضريبة القيمة المضافة' : 'Prices Include VAT'}</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-medium"
                >
                  <Lock className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'بوابة الإدارة' : 'Admin Portal'}</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
