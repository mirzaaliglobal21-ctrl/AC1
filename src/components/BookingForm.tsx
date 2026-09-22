import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Wrench, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Copy, 
  Check, 
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Language, BookingFormData } from '../types';
import { CITIES_COVERAGE, SERVICES } from '../data/content';
import { addBooking } from '../utils/bookingStore';
import { useCompany } from '../context/CompanyContext';

interface BookingFormProps {
  lang: Language;
  initialService?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ lang, initialService }) => {
  const { companyInfo } = useCompany();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    service: initialService || (lang === 'ar' ? 'صيانة وإصلاح المكيفات' : 'AC Repair & Diagnostics'),
    city: lang === 'ar' ? 'الرياض' : 'Riyadh',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: lang === 'ar' ? 'الفترة المسائية (04:00 م - 08:00 م)' : 'Evening (04:00 PM - 08:00 PM)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingFormData | null>(null);
  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);

  const serviceOptions = [
    { ar: 'صيانة وإصلاح المكيفات', en: 'AC Repair & Diagnostics' },
    { ar: 'إصلاح وصيانة الغسالات', en: 'Washing Machine Repair' },
    { ar: 'تنظيف وغسيل المكيفات بالضغط', en: 'Deep AC Cleaning' },
    { ar: 'فك وتركيب ونقل المكيفات', en: 'AC Installation & Relocation' },
    { ar: 'شحن غاز فريون أمريكي R410A / R22', en: 'US Freon Gas Recharge' },
    { ar: 'فحص إلكتروني شامل وصيانة وقائية', en: 'Comprehensive Inspection' },
  ];

  const cityOptions = [
    { ar: 'الرياض', en: 'Riyadh' },
    { ar: 'جدة', en: 'Jeddah' },
    { ar: 'الدمام', en: 'Dammam' },
    { ar: 'الخبر والظهران', en: 'Khobar & Dhahran' },
    { ar: 'مكة المكرمة', en: 'Makkah' },
    { ar: 'المدينة المنورة', en: 'Madinah' },
    { ar: 'القصيم (بريدة وعنيزة)', en: 'Al-Qassim' },
    { ar: 'مدينة أخرى بالمملكة', en: 'Other Saudi City' },
  ];

  const timeSlots = [
    { ar: 'الفترة الصباحية (08:00 ص - 12:00 م)', en: 'Morning (08:00 AM - 12:00 PM)' },
    { ar: 'فترة الظهيرة (12:00 م - 04:00 م)', en: 'Afternoon (12:00 PM - 04:00 PM)' },
    { ar: 'الفترة المسائية (04:00 م - 08:00 م)', en: 'Evening (04:00 PM - 08:00 PM)' },
    { ar: 'الفترة الليلية / طوارئ (08:00 م - 11:00 م)', en: 'Night / Emergency (08:00 PM - 11:00 PM)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique Saudi Booking ID
    const refNum = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(refNum);

    // Save into centralized Admin Booking Store
    addBooking({
      customerName: formData.name,
      phone: formData.phone,
      service: formData.service,
      city: formData.city,
      preferredDate: formData.preferredDate,
      timeSlot: formData.timeSlot,
      notes: formData.message,
    }, refNum);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed({ ...formData });
    }, 600);
  };

  const getWhatsAppMessage = (data: BookingFormData, id: string) => {
    return lang === 'ar'
      ? `*طلب حجز خدمة جديد (رقم: ${id})*
📌 *الاسم:* ${data.name}
📱 *الجوال:* ${data.phone}
🛠️ *نوع الخدمة:* ${data.service}
📍 *المدينة:* ${data.city}
📅 *التاريخ المفضل:* ${data.preferredDate}
⏰ *الفترة:* ${data.timeSlot}
📝 *ملاحظات أو وصف العطل:* ${data.message || 'لا توجد ملاحظات إضافية'}

يرجى تأكيد موعد وصول الفني، شكراً لكم.`
      : `*New Service Booking (Ref: ${id})*
📌 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
🛠️ *Service:* ${data.service}
📍 *City:* ${data.city}
📅 *Preferred Date:* ${data.preferredDate}
⏰ *Time Slot:* ${data.timeSlot}
📝 *Notes:* ${data.message || 'None'}

Please confirm the technician dispatch, thank you.`;
  };

  const copyBookingDetails = () => {
    if (!bookingConfirmed) return;
    const text = getWhatsAppMessage(bookingConfirmed, bookingId);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="booking-section" className="py-20 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 scroll-mt-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-3">
            <Calendar className="w-3.5 h-3.5 text-cyan-700" />
            <span>{lang === 'ar' ? 'حجز فوري ومؤكد' : 'Fast & Confirmed Booking'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
            {lang === 'ar' ? 'احجز موعد الصيانة الآن' : 'Schedule Your Repair Visit'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {lang === 'ar' 
              ? 'املأ البيانات البسيطة وسيتواصل معك مشرف الخدمة خلال 15 دقيقة لتأكيد الموعد وإرسال الفني'
              : 'Complete this quick form and our service coordinator will contact you within 15 minutes to confirm.'}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 relative overflow-hidden">
          
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-600 to-cyan-500" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* 1. Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'ar' ? 'مثال: محمد بن عبدالله' : 'e.g., Mohammed Al-Otaibi'}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'رقم الجوال (سعودي) *' : 'Phone Number (Saudi) *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all text-left"
                  />
                </div>
              </div>

              {/* 3. Service */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'نوع الخدمة المطلوبة *' : 'Service Required *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 focus:outline-none transition-all cursor-pointer"
                  >
                    {serviceOptions.map((opt, idx) => (
                      <option key={idx} value={lang === 'ar' ? opt.ar : opt.en}>
                        {lang === 'ar' ? opt.ar : opt.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. City */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'المدينة *' : 'City *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 focus:outline-none transition-all cursor-pointer"
                  >
                    {cityOptions.map((city, idx) => (
                      <option key={idx} value={lang === 'ar' ? city.ar : city.en}>
                        {lang === 'ar' ? city.ar : city.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 5. Preferred Date */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'تاريخ الزيارة المفضل *' : 'Preferred Date *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 6. Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'ar' ? 'الوقت المناسب *' : 'Preferred Time Slot *'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 focus:outline-none transition-all cursor-pointer"
                  >
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={lang === 'ar' ? slot.ar : slot.en}>
                        {lang === 'ar' ? slot.ar : slot.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* 7. Message / Description */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                {lang === 'ar' ? 'ملاحظات إضافية أو وصف العطل' : 'Notes or Issue Description'}
              </label>
              <div className="relative">
                <div className="absolute top-3.5 right-0 rtl:right-0 ltr:left-0 pr-3.5 rtl:pr-3.5 ltr:pl-3.5 pointer-events-none text-slate-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ar' 
                    ? 'مثال: المكيف يخرج هواء حار منذ أمس، أو الغسالة تعطي رمز خطأ OE...' 
                    : 'e.g., AC blowing warm air, or washer showing OE error code...'}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:bg-white rounded-xl py-3 px-4 rtl:pr-10 ltr:pl-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Trust highlights banner */}
            <div className="bg-cyan-50/70 border border-cyan-200/70 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-cyan-950 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                <span>{lang === 'ar' ? 'ضمان رسمي معتمد على قطع الغيار والصيانة' : 'Official certified warranty on parts & labor'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                <span>{lang === 'ar' ? 'فحص إلكتروني دقيق مع إيصال رسمي' : 'Precise digital diagnostic & official VAT receipt'}</span>
              </div>
            </div>

            {/* Form Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#0B1B3D] via-[#122A5E] to-cyan-600 hover:from-cyan-600 hover:to-blue-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-300" />
                    <span>{lang === 'ar' ? 'تأكيد وحفظ موعد الحجز' : 'Confirm & Submit Booking'}</span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp shortcut button */}
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                  getWhatsAppMessage(formData, 'DIRECT')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>{lang === 'ar' ? 'الحجز السريع عبر واتساب' : 'Quick WhatsApp Booking'}</span>
              </a>
            </div>

          </form>

        </div>

      </div>

      {/* Confirmation Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setBookingConfirmed(null)}
              className="absolute top-5 left-5 rtl:left-5 ltr:right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {lang === 'ar' ? 'تم استلام طلب الحجز بنجاح!' : 'Booking Request Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {lang === 'ar' ? 'رقم الحجز المرجعي الخاص بك:' : 'Your Reference Booking Number:'}
              </p>
              <span className="inline-block mt-2 px-3.5 py-1.5 bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono font-black text-base rounded-lg">
                {bookingId}
              </span>
            </div>

            {/* Receipt Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2.5 border border-slate-200/80 mb-6">
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-500">{lang === 'ar' ? 'الاسم:' : 'Name:'}</span>
                <span className="font-bold text-slate-800">{bookingConfirmed.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-500">{lang === 'ar' ? 'الجوال:' : 'Phone:'}</span>
                <span className="font-bold text-slate-800" dir="ltr">{bookingConfirmed.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-500">{lang === 'ar' ? 'الخدمة:' : 'Service:'}</span>
                <span className="font-bold text-slate-800">{bookingConfirmed.service}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span className="text-slate-500">{lang === 'ar' ? 'المدينة والوقت:' : 'City & Time:'}</span>
                <span className="font-bold text-slate-800">{bookingConfirmed.city} - {bookingConfirmed.preferredDate}</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                  getWhatsAppMessage(bookingConfirmed, bookingId)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 text-sm transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{lang === 'ar' ? 'إرسال الحجز فوراً لمشرف الواتساب' : 'Send via WhatsApp to Team'}</span>
              </a>

              <div className="flex gap-2">
                <button
                  onClick={copyBookingDetails}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (lang === 'ar' ? 'تم نسخ التفاصيل' : 'Copied!') : (lang === 'ar' ? 'نسخ بيانات الحجز' : 'Copy Details')}</span>
                </button>

                <button
                  onClick={() => setBookingConfirmed(null)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
