import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      id: 'gmat',
      tag: 'Early-stage prep',
      title: 'Tight GMAT Batch',
      who: 'Learn from 98 and 99%ilers to get your GMAT score in 3 months',
      includes: [
        'Weekend batches',
        'Small cohorts',
        'Carefully crafted question bank',
        'Mock Analysis',
        '4 extra sessions on your weaker topics'
      ],
      primaryCTA: {
        label: 'Learn more →',
        link: '/resources?source=gmat'
      },
      secondaryCTA: {
        label: 'Learn more about next GMAT batch',
        link: 'https://wa.me/917689992562?text=Hi, I want to know more about the GMAT batch.'
      },
      type: 'entry'
    },
    {
      id: 'mentorship',
      tag: 'Most comprehensive',
      title: 'Full Application Mentorship',
      who: 'Applying this year and want end-to-end guidance',
      includes: [
        'Strategy & timelines',
        'CV building',
        'Essays & storytelling',
        'LOR guidance',
        'Interview prep'
      ],
      primaryCTA: {
        label: 'Get your profile reviewed →',
        link: 'https://calendar.app.google/vC5Rx3vFJmPktLKu8'
      },
      secondaryCTA: {
        label: 'Chat on WhatsApp',
        link: 'https://wa.me/917689992562?text=Hi, I’m interested in Full Application Mentorship. Can you guide me?'
      },
      type: 'primary'
    },
    {
      id: 'interview',
      tag: 'Focused support',
      title: 'Interview Preparation',
      who: 'Have interview calls and want to convert',
      includes: [
        'Mock interviews',
        'Feedback sessions',
        'Coaching sessions',
        'Alum from your background as an add on service'
      ],
      primaryCTA: {
        label: 'Book interview prep session →',
        link: 'https://calendar.app.google/vC5Rx3vFJmPktLKu8'
      },
      secondaryCTA: {
        label: 'Quick chat on WhatsApp',
        link: 'https://wa.me/917689992562?text=Hi, I need help with interview preparation. Can we discuss?'
      },
      type: 'secondary'
    }
  ];

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden" style={{
      background: 'radial-gradient(circle at 50% 50%, rgba(2,47,135,0.03), transparent 70%), #F7F6F3'
    }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-light mb-6 tracking-tight"
          >
            Start where you are
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Whether you're preparing for the GMAT or converting interview calls — we work with you at every stage.
            </p>
            <p className="text-sm text-gray-400 italic font-light">
              Start early to get ahead of the competition.
            </p>
          </motion.div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`
                relative rounded-3xl p-10 flex flex-col transition-all duration-300
                ${service.type === 'primary'
                  ? 'bg-white shadow-[0_30px_70px_rgba(2,47,135,0.12)] z-10 md:scale-105 border border-blue-50'
                  : service.type === 'secondary'
                    ? 'bg-white shadow-xl shadow-black/5 border border-gray-100'
                    : 'bg-[#FAFAFA] border border-gray-200 shadow-sm'
                }
              `}
            >
              <div className="space-y-3 mb-10">
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400 font-bold block">
                  {service.tag}
                </span>
                <h3 className="text-3xl font-serif font-medium text-gray-900 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {service.who}
                </p>
              </div>

              <div className="space-y-5 mb-12 flex-grow">
                {service.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-brand-blue/5 flex items-center justify-center">
                      <Check size={12} className="text-brand-blue" />
                    </div>
                    <span className="text-sm text-gray-600 font-light leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Dual CTAs */}
              <div className="mt-auto flex flex-col gap-3">
                {service.primaryCTA.link.startsWith('http') ? (
                  <a
                    href={service.primaryCTA.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold tracking-wide text-sm
                      ${service.type === 'primary'
                        ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                      }
                    `}
                  >
                    <span>{service.primaryCTA.label}</span>
                  </a>
                ) : (
                  <Link
                    to={service.primaryCTA.link}
                    className={`
                      w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold tracking-wide text-sm
                      ${service.type === 'primary'
                        ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                      }
                    `}
                  >
                    <span>{service.primaryCTA.label}</span>
                  </Link>
                )}

                <a
                  href={service.secondaryCTA.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-1 text-blue-700 text-sm font-medium hover:text-blue-800 transition-colors group"
                >
                  <MessageSquare size={14} className="opacity-70 group-hover:opacity-100" />
                  <span>{service.secondaryCTA.label}</span>
                </a>
              </div>

              {service.type === 'primary' && (
                <div className="absolute top-4 right-10 bg-brand-blue/10 text-brand-blue text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full font-bold">
                  Recommended
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Secondary Bottom Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 py-8 border-t border-gray-100/60 max-w-2xl mx-auto"
        >
          <p className="text-gray-500 mb-4 font-light italic">
            "We focus on quality, not quantity. We only work with a handful of applicants each cycle."
          </p>
          <a href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-blue text-sm border-b border-brand-blue/20 pb-0.5 hover:border-brand-blue transition-all font-medium group">
            <span>Learn how we work in detail</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
