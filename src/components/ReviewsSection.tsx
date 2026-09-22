import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { REVIEWS } from '../data/content';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="reviews" className="py-20 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{lang === 'ar' ? 'تقييم 4.9 من 5 بناءً على +12,000 عميل' : 'Rated 4.9/5 by 12,000+ Verified Clients'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1B3D] tracking-tight">
            {lang === 'ar' ? 'آراء وتجارب عملائنا الكرام بالمملكة' : 'Client Testimonials Across Saudi Arabia'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'ar'
              ? 'نفخر بثقة أصحاب المنازل والفلل والمشاريع في خدماتنا لجودة الصيانة والالتزام الدقيق بالمواعيد.'
              : 'We take immense pride in the trust placed in us by homeowners, villa managers, and businesses across the Kingdom.'}
          </p>
        </motion.div>

        {/* Reviews Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="text-slate-300 mb-3">
                <Quote className="w-7 h-7 text-cyan-500/40" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal flex-1">
                "{lang === 'ar' ? review.commentAr : review.commentEn}"
              </p>

              {/* User info & service tag */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.avatar}
                    alt={lang === 'ar' ? review.nameAr : review.nameEn}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{lang === 'ar' ? review.nameAr : review.nameEn}</span>
                      {review.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-600 fill-cyan-100" />
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {lang === 'ar' ? review.cityAr : review.cityEn}
                    </span>
                  </div>
                </div>

                <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 text-[10px] sm:text-[11px] text-cyan-800 font-semibold truncate">
                  🛠️ {lang === 'ar' ? review.serviceTypeAr : review.serviceTypeEn}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
