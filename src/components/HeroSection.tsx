import React from 'react';
import { 
  ShieldCheck, 
  CalendarCheck, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Wrench,
  Flame,
  Snowflake,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { ASSETS, TRUST_STATS } from '../data/content';
import { useCompany } from '../context/CompanyContext';
import { AnimatedWorkerBadge } from './AnimatedWorkerBadge';

interface HeroSectionProps {
  lang: Language;
  onOpenBooking: (serviceName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenBooking }) => {
  const { companyInfo } = useCompany();
  const quickProblems = [
    { ar: 'ضعف التبريد وخروج هواء حار', en: 'Low cooling & warm air flow' },
    { ar: 'تسريب وتنقيط ماء من المكيف', en: 'Water leaking / dripping from unit' },
    { ar: 'صوت عالي أو عدم عصر الغسالة', en: 'Washer noise & spin cycle failure' },
    { ar: 'تعبئة فريون أصلي مع كشف تهريب', en: 'Original freon recharge & leak check' },
  ];

  return (
    <section id="hero" className="relative pt-36 sm:pt-40 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#02406a] via-[#0369a1] to-[#075985] text-white">
      {/* Dynamic Animated Ambient Background Layer with Sky Blue & Pure White Glow Blend */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        
        {/* Animated Moving Gradient Fluid Canvas Background with Sky Blue and Luminous White */}
        <motion.div 
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0%, rgba(56,189,248,0.45) 25%, rgba(2,132,199,0.3) 50%, rgba(2,64,106,0.1) 85%)',
              'radial-gradient(circle at 75% 25%, rgba(186,230,253,0.35) 0%, rgba(14,165,233,0.4) 35%, rgba(3,105,161,0.25) 60%, rgba(2,64,106,0.1) 90%)',
              'radial-gradient(circle at 45% 65%, rgba(255,255,255,0.25) 0%, rgba(56,189,248,0.45) 30%, rgba(2,132,199,0.25) 65%, rgba(2,64,106,0.1) 85%)',
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0%, rgba(56,189,248,0.45) 25%, rgba(2,132,199,0.3) 50%, rgba(2,64,106,0.1) 85%)'
            ]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Pulsing Luminous White & Sky Blue Backlight Glow directly behind the main Title */}
        <motion.div
          animate={{
            scale: [0.95, 1.25, 0.95],
            opacity: [0.45, 0.85, 0.45],
            x: [-15, 20, -15],
            y: [-10, 15, -10]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 sm:top-36 left-4 sm:left-24 w-80 sm:w-[500px] h-64 sm:h-80 bg-sky-200/40 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Large Floating Glowing Nebula 1 - Top Right (Sky Blue & White Mix) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.35, 1],
            opacity: [0.45, 0.85, 0.45],
            x: [0, 45, -30, 0],
            y: [0, -35, 25, 0]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 right-0 sm:right-1/4 w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] bg-gradient-to-br from-white/35 via-sky-300/40 to-cyan-500/35 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Large Floating Glowing Nebula 2 - Left side behind text (Sky Blue & Crisp White Glow) */}
        <motion.div 
          animate={{ 
            scale: [1.1, 0.9, 1.3, 1.1],
            opacity: [0.4, 0.75, 0.4],
            x: [0, -35, 45, 0],
            y: [0, 40, -25, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-1/4 -left-20 sm:-left-16 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-gradient-to-tr from-white/30 via-sky-200/40 to-sky-500/35 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Deep Bottom Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35],
            y: [0, -20, 0]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-10 left-1/4 w-[420px] sm:w-[680px] h-[360px] bg-sky-300/30 rounded-full blur-[90px] pointer-events-none" 
        />

        {/* Flowing Animated Cybernetic Tech Grid in Sky Blue */}
        <motion.div 
          animate={{ 
            backgroundPosition: ['0px 0px', '96px 96px'] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe30_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe30_1px,transparent_1px)] bg-[size:36px_36px] sm:bg-[size:48px_48px] opacity-85 pointer-events-none" 
        />

        {/* Concentric Pulsing Radar Waves from Center-Left in Sky-White */}
        {[0, 2, 4].map((delay, idx) => (
          <motion.div
            key={`wave-${idx}`}
            animate={{
              scale: [0.8, 2.4],
              opacity: [0.75, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeOut',
              delay: delay
            }}
            className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 rounded-full border border-sky-200/50 pointer-events-none"
          />
        ))}

        {/* Animated Floating HVAC Air Flow / Particle Dots with Bright White & Sky Glow */}
        {[
          { top: '12%', left: '10%', size: 'w-3 h-3', delay: 0, duration: 3.5, y: -45, x: 20 },
          { top: '22%', left: '80%', size: 'w-3.5 h-3.5', delay: 0.8, duration: 4.2, y: -55, x: -15 },
          { top: '38%', left: '18%', size: 'w-3 h-3', delay: 1.6, duration: 4.8, y: -50, x: 25 },
          { top: '52%', left: '88%', size: 'w-3 h-3', delay: 0.4, duration: 3.9, y: -40, x: -20 },
          { top: '32%', left: '46%', size: 'w-4 h-4', delay: 2.1, duration: 4.5, y: -55, x: 15 },
          { top: '68%', left: '22%', size: 'w-2.5 h-2.5', delay: 1.2, duration: 3.8, y: -35, x: -10 },
          { top: '16%', left: '36%', size: 'w-3 h-3', delay: 2.5, duration: 4.0, y: -45, x: 20 },
          { top: '62%', left: '68%', size: 'w-3.5 h-3.5', delay: 1.5, duration: 5.0, y: -60, x: -25 },
          { top: '44%', left: '32%', size: 'w-3 h-3', delay: 0.7, duration: 3.6, y: -40, x: 18 },
          { top: '78%', left: '50%', size: 'w-3 h-3', delay: 2.8, duration: 4.4, y: -50, x: -15 },
        ].map((pt, i) => (
          <motion.div
            key={`pt-${i}`}
            animate={{
              y: [0, pt.y, 0],
              x: [0, pt.x, 0],
              opacity: [0.5, 1, 0.5],
              scale: [0.85, 1.6, 0.85]
            }}
            transition={{
              duration: pt.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pt.delay
            }}
            style={{ top: pt.top, left: pt.left }}
            className={`absolute ${pt.size} rounded-full bg-white shadow-[0_0_18px_#ffffff,0_0_10px_#38bdf8] pointer-events-none z-0`}
          />
        ))}

        {/* Animated Tech HVAC Turbine Rings in Sky-Blue */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -right-24 sm:-top-32 sm:-right-32 w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] rounded-full border-2 border-sky-300/40 border-dashed pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-14 -right-14 sm:-top-20 sm:-right-20 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full border border-white/35 border-dotted pointer-events-none"
        />
        
        {/* Horizontal Laser Scanning Line in Pure White & Sky Blue */}
        <motion.div 
          animate={{ 
            top: ['0%', '100%', '0%'],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px] pointer-events-none shadow-[0_0_12px_#ffffff]"
        />

        {/* Diagonal Glowing Shooting Light Beams */}
        <motion.div
          animate={{
            x: ['-30%', '140%'],
            y: ['-30%', '140%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 2
          }}
          className="absolute -top-10 left-1/5 w-64 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45 blur-[0.5px] pointer-events-none shadow-[0_0_12px_#ffffff]"
        />

        <motion.div
          animate={{
            x: ['140%', '-40%'],
            y: ['-30%', '140%'],
            opacity: [0, 0.95, 0]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 2.5,
            delay: 1.2
          }}
          className="absolute -top-10 right-1/4 w-72 h-[2.5px] bg-gradient-to-r from-transparent via-sky-200 to-transparent -rotate-45 blur-[0.5px] pointer-events-none shadow-[0_0_12px_#38bdf8]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text & Action Column with Motion */}
          <div className="lg:col-span-7 flex flex-col justify-center text-right rtl:text-right ltr:text-left">
            {/* Top Pill Badge with spring entrance */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 self-start bg-slate-800/95 border border-cyan-400/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 shadow-md mb-6 relative z-10 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{lang === 'ar' ? 'الشركة الأولى المعتمدة بالمملكة العربية السعودية' : 'Top Certified HVAC & Appliance Service in KSA'}</span>
            </motion.div>

            {/* Main Headline (Exact Required Text) with motion */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight mb-6"
            >
              {lang === 'ar' ? (
                <>
                  خدمات صيانة وإصلاح <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-300 drop-shadow-sm">
                    المكيفات والغسالات
                  </span>
                </>
              ) : (
                <>
                  Air Conditioner & <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-300 drop-shadow-sm">
                    Washing Machine Services
                  </span>
                </>
              )}
            </motion.h1>

            {/* Interactive Animated Technician / Worker Status Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <AnimatedWorkerBadge lang={lang} />
            </motion.div>

            {/* Subtitle / Value Proposition with motion */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal"
            >
              {lang === 'ar' 
                ? 'فريق من أمهر المهندسين والفنيين المعتمدين لخدمة المنازل والفلل والمنشآت في الرياض، جدة، الدمام، ومكة. كشف إلكتروني متطور، قطع غيار أصلية 100%، وضمان معتمد يصل إلى 6 أشهر على كافة الإصلاحات.'
                : 'Certified master technicians serving modern residences and businesses across Riyadh, Jeddah, Dammam, and Makkah. Advanced digital diagnostics, 100% genuine spare parts, and up to 6 months comprehensive warranty on all jobs.'}
            </motion.p>

            {/* Exact Required CTA Buttons with animated interaction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <motion.button
                onClick={() => onOpenBooking()}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5 text-slate-950" />
                <span>{lang === 'ar' ? 'احجز خدمة الآن' : 'Book a Service Now'}</span>
              </motion.button>

              <motion.a
                href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'السلام عليكم، أود التواصل بشأن صيانة مكيفات / غسالات في منزلي'
                    : 'Hello, I want to book AC / Washing machine repair service'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all border border-emerald-400/30 shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact Us via WhatsApp'}</span>
              </motion.a>
            </motion.div>

            {/* Quick Problem Diagnostic Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="border-t border-slate-800/80 pt-6"
            >
              <p className="text-xs text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'ar' ? 'أعطال شائعة نقوم بإصلاحها فوراً في نفس اليوم:' : 'Common issues we fix on the same day:'}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {quickProblems.map((prob, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => onOpenBooking(lang === 'ar' ? prob.ar : prob.en)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-xs bg-slate-800/60 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>{lang === 'ar' ? prob.ar : prob.en}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Realistic AI Image & Floating Badges Column with Motion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Decorative Gradient Border */}
              <div className="p-1 rounded-3xl bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent shadow-2xl cyan-glow">
                
                {/* Main Image Container */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <img
                    src={ASSETS.heroImage}
                    alt={lang === 'ar' ? 'فني صيانة مكيفات معتمد في منزل حديث بالمملكة' : 'Certified AC Technician servicing in a modern Saudi home'}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Brand Stamp with spinning animation */}
                  <div className="absolute top-4 right-4 bg-slate-950/75 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs text-white">
                    <Snowflake className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="font-bold">{lang === 'ar' ? 'تبريد فائق وضمان' : 'Super Cool & Warranty'}</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 24/7 Fast Dispatch (Smooth Infinite Floating Physics) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-3 sm:-right-6 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'وصول سريع' : 'Fast Response'}</div>
                  <div className="text-sm font-black text-white">{lang === 'ar' ? 'خلال 45 - 60 دقيقة' : '45 - 60 Minutes'}</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: 100% Genuine Parts (Smooth Infinite Counter-Floating Physics) */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -top-5 -left-3 sm:-left-6 bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 p-3.5 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'ضمان كتابي' : 'Official Warranty'}</div>
                  <div className="text-sm font-black text-white">{lang === 'ar' ? 'قطع غيار أصلية 100%' : '100% Genuine Parts'}</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Live Trust Metrics Bar with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {TRUST_STATS.map((stat, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center transition-transform"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
