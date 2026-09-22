import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  Building2, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { COMPANY_INFO, BRANDS_SERVICED } from '../data/content';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Bento with Motion */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 transition-shadow hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-[#0B1B3D]">
                  {lang === 'ar' ? 'اعتماد وجودة سعودية' : 'Saudi Quality Certified'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'ar' ? 'سجل تجاري نظامي وعقود صيانة معتمدة لضمان حقوق العميل.' : 'Fully licensed commercial registry and guaranteed service SLAs.'}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-[#0B1B3D] text-white p-6 rounded-2xl shadow-xl border border-cyan-500/20 transition-shadow hover:shadow-2xl"
              >
                <div className="text-3xl font-black text-cyan-400 mb-1">
                  100%
                </div>
                <h4 className="text-sm font-bold text-slate-100">
                  {lang === 'ar' ? 'قطع غيار أصلية بالكرتون' : 'Genuine Boxed Parts'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'ar' ? 'توفير قطع الغيار مباشرة من الوكلاء المعتمدين مع الفاتورة الضريبية.' : 'Sourced straight from authorized agents with official tax invoice.'}
                </p>
              </motion.div>
            </div>

            <div className="space-y-4 pt-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl transition-shadow hover:shadow-2xl"
              >
                <div className="text-3xl font-black text-white mb-1">
                  +45K
                </div>
                <h4 className="text-sm font-bold">
                  {lang === 'ar' ? 'صيانة منجزة بنجاح' : 'Successful Repairs'}
                </h4>
                <p className="text-xs text-cyan-100 mt-1">
                  {lang === 'ar' ? 'ثقة آلاف الأسر والشركات في الرياض وجدة والشرقية ومكة.' : 'Trusted by thousands of Saudi families and corporations.'}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 transition-shadow hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-[#0B1B3D]">
                  {lang === 'ar' ? 'ضمان كتابي معتمد' : 'Written Warranty'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'ar' ? 'في حال عودة العطل خلال فترة الضمان تتم الصيانة مجاناً تماماً.' : 'Zero-cost re-service guarantee if issue reoccurs within warranty.'}
                </p>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Narrative with Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-cyan-700" />
              <span>{lang === 'ar' ? 'من نحن' : 'About Us'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
              {lang === 'ar' ? COMPANY_INFO.fullNameAr : COMPANY_INFO.fullNameEn}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {lang === 'ar'
                ? 'تأسست شركتنا بهدف إعادة تعريف خدمات صيانة المكيفات والأجهزة المنزلية في المملكة العربية السعودية. نؤمن بأن راحة عائلتك داخل المنزل تعتمد على هواء نقي وتبريد متواصل وأجهزة تعمل بكفاءة قصوى في ظل الأجواء الصيفية الحارة.'
                : 'Founded to set a new benchmark for HVAC and home appliance maintenance across Saudi Arabia. We believe family home comfort depends on clean, crisp airflow and reliable appliances running seamlessly through high summer temperatures.'}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {lang === 'ar'
                ? 'نمتلك طاقماً هندسياً معتمداً ومدرّباً على أحدث موديلات التكييف الموفر للطاقة (Inverter) والغسالات الرقمية الذكية، مع أسطول سيارات صيانة مجهز بكافة أجهزة الفحص الرقمية وأسطوانات غاز الفريون الأصلي وقطع الغيار.'
                : 'Our certified engineering crew is trained on the latest energy-saving Inverter AC systems and smart digital appliances, backed by a dedicated mobile fleet outfitted with precision electronic diagnostic instruments and genuine OEM spare components.'}
            </p>

            {/* Supported Brands Marquee Grid */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-400 block mb-3">
                {lang === 'ar' ? 'نصون ونعتمد كبرى العلامات التجارية العالمية بالمملكة:' : 'Authorized & Experienced with Major Saudi Brands:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {BRANDS_SERVICED.map((brand, bIdx) => (
                  <motion.span
                    key={bIdx}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="text-xs bg-white text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-bold shadow-xs cursor-default"
                  >
                    {brand}
                  </motion.span>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
