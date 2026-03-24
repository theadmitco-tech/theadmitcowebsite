import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Layout, BookOpen, Star, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const resourceCards = [
    {
      id: 'tracker',
      title: 'MBA College Tracker',
      badge: 'Start here',
      badgeIcon: <Zap size={10} />,
      description: 'Track deadlines, GMAT targets, and school profiles for your entire list.',
      hint: '50+ schools • Filters',
      cta: 'Open tracker',
      link: '/tracker',
      icon: <Layout className="text-blue-600" size={24} />,
      type: 'internal',
      isRecommended: false
    },
    {
      id: 'interview',
      title: 'Interview Prep Kit',
      badge: 'Flagship Resource',
      badgeIcon: <Sparkles size={12} />,
      description: 'The definitive storytelling framework used by successful ISB admissions candidates.',
      hint: 'Storytelling • Real questions • STAR',
      cta: 'Access full kit',
      link: '/interview-prep',
      icon: <FileText className="text-blue-700" size={28} />,
      type: 'internal',
      isRecommended: true
    },
    {
      id: 'gmat',
      title: 'GMAT Strategy Guide',
      badge: null,
      description: 'The discipline roadmap to cracking the GMAT with focused strategy.',
      hint: 'Scoring guides • Roadmaps',
      cta: 'Explore guide',
      link: 'https://calendar.app.google/vC5Rx3vFJmPktLKu8',
      icon: <BookOpen className="text-blue-600" size={24} />,
      type: 'external',
      isRecommended: false
    }
  ];

  return (
    <section id="resources" className="relative py-24 px-6 bg-gradient-to-b from-white to-blue-50/20">
      <div className="max-w-6xl mx-auto">
        {/* Header - Compact & Clean */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-light mb-4 tracking-tight text-gray-900"
          >
            Resources
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-500 font-light max-w-lg mx-auto leading-relaxed"
          >
            Tools and frameworks to help you at every stage of your MBA journey.
          </motion.p>
        </div>

        {/* Balanced 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {resourceCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: card.isRecommended ? 1.03 : 1.01 }}
              className={`
                group relative bg-white rounded-[32px] p-8 md:p-10 transition-all duration-300 flex flex-col border
                shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-black/5
                ${card.isRecommended 
                  ? 'border-blue-200 bg-blue-50/5 z-10' 
                  : 'border-gray-100 hover:border-blue-100'
                }
              `}
            >
              <div className="flex flex-col h-full">
                {/* Badge Container */}
                <div className="mb-10 flex justify-between items-start min-h-[32px]">
                  {card.badge ? (
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider
                      ${card.isRecommended ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-500'}
                    `}>
                      {card.badgeIcon}
                      {card.badge}
                    </div>
                  ) : <div />}
                  
                  <div className={`
                    rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110
                    ${card.isRecommended ? 'w-14 h-14 bg-blue-100/50 p-3.5' : 'w-12 h-12 bg-gray-50 p-3'}
                  `}>
                    {card.icon}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-serif font-medium text-gray-900 mb-4 leading-tight text-2xl">
                    {card.title}
                  </h3>
                  
                  <p className="font-light leading-relaxed mb-8 text-sm text-gray-600">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest mb-10 text-gray-400">
                      <div className={`w-1 h-1 rounded-full ${card.isRecommended ? 'bg-blue-400' : 'bg-gray-300'}`} />
                      {card.hint}
                  </div>
                </div>
                
                <div className="mt-auto">
                  {card.type === 'internal' ? (
                    <Link 
                      to={card.link}
                      className="inline-flex items-center gap-2 transition-all group/btn text-sm font-bold text-blue-700"
                    >
                      <span className="pb-0.5 border-b-2 border-blue-700/10 group-hover/btn:border-blue-700 transition-all">
                        {card.cta}
                      </span>
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  ) : (
                    <a 
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-all group/btn text-sm font-bold text-blue-700"
                    >
                      <span className="pb-0.5 border-b-2 border-blue-700/10 group-hover/btn:border-blue-700 transition-all">
                        {card.cta}
                      </span>
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
