import React from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessStories: React.FC = () => {
  const stories = [
    {
      type: 'Full Mentorship',
      tag: 'End-to-end guidance',
      outcome: 'Admit: ISB',
      profile: '3rd ISB attempt | 5 yrs exp | GMAT FE 655',
      quote: '“The boost of confidence I got through the mentorship was immense”',
      highlight: true
    },
    {
      type: 'Targeted Help',
      tag: 'Focused interview prep',
      outcome: 'Admit: ISB',
      profile: 'Consultant',
      quote: '“I’d say 70-80% of the interview was from what I had prepared.”',
      highlight: false,
      isElevated: true // Raised for asymmetry
    },
    {
      type: 'Free Resources',
      tag: 'Self-serve resources',
      outcome: 'Cleared ISB interview',
      profile: 'Program Manager | Engineer',
      quote: '“And thanks for the notion worksheet - I think thats gonna be my last minute cheatsheet”',
      highlight: false,
      muted: true
    }
  ];

  return (
    <section id="success-stories" className="relative py-32 px-6 overflow-hidden" style={{
      background: `
        radial-gradient(circle at 15% 40%, rgba(2,47,135,0.06), transparent 35%),
        radial-gradient(circle at 85% 65%, rgba(2,47,135,0.04), transparent 45%),
        #F7F6F3
      `
    }}>
      {/* Top Divider */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-light mb-6 tracking-tight"
          >
            Success stories
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Different starting points. One outcome — admits.
            </p>
            <p className="text-sm text-gray-400 mt-4 italic font-light tracking-wide">
              Whether you’re just starting or need immediate guidance for a last minute interview call — we’ve helped at every stage.
            </p>
          </motion.div>
        </div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch mb-28">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`
                relative rounded-3xl p-10 flex flex-col transition-all duration-300
                ${story.highlight 
                  ? 'bg-gradient-to-br from-white to-blue-50/30 shadow-[0_30px_70px_rgba(2,47,135,0.12)] z-10 md:scale-105 border-t-2 border-brand-blue/20' 
                  : story.muted
                    ? 'bg-[#FAFAFA]/80 border border-gray-200/50 shadow-sm'
                    : 'bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)]'
                }
                ${story.isElevated ? 'md:-translate-y-6' : ''}
              `}
            >
              {story.highlight && (
                <div className="absolute top-6 right-8 flex items-center gap-1">
                  <Sparkles size={14} className="text-brand-blue/40" />
                  <span className="text-[9px] uppercase tracking-[2px] text-brand-blue font-bold">Featured</span>
                </div>
              )}

              <div className="mb-8">
                <span className="text-[9px] uppercase tracking-[3px] text-gray-400 font-medium block mb-3">
                  {story.tag}
                </span>
                <h3 className="text-3xl font-serif font-medium text-gray-900 leading-tight">
                  {story.outcome}
                </h3>
              </div>
              
              <div className="flex-grow mb-10">
                <p className="text-lg md:text-xl text-gray-800 leading-[1.6] font-light italic">
                  {story.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100/10">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[2px]">
                  {story.profile}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Quote Highlight Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative text-center max-w-xl mx-auto mb-24 py-12 px-8 border-y border-gray-100/60"
        >
          <Quote className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-blue/10" size={64} fill="currentColor" />
          <p className="text-2xl md:text-3xl text-gray-900 italic font-light leading-snug mb-8 relative z-10">
            “I got into IIM A PGPX. THANKYOU guys! Calms my nerves a little bit for ISB interview.”
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="h-px w-8 bg-brand-blue/30 mb-2" />
            <span className="text-[11px] text-gray-500 uppercase tracking-[3px] font-semibold">
              — Admits from IIM A PGPX & ISB PGP
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SuccessStories;
