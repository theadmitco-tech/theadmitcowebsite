import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, Check, Rocket, Zap, MessageCircle, Layout } from 'lucide-react';
import Navbar from '../components/Navbar';
import { AnimatePresence } from 'motion/react';

const InterviewPrepPage: React.FC = () => {
  const benefits = [
    '50+ Mock interview questions from ISB, INSEAD, and M7s',
    'Structured STAR framework worksheets',
    'Behavioral interview cheat sheet',
    'Post-interview checklist and feedback templates',
    'Updated for the 2024-25 application cycle'
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-3 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="small-caps text-brand-blue mb-4 block">Free Resource</span>
              <h1 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-tight leading-tight">
                Interview <br />
                <span className="italic">Preparation Kit</span>
              </h1>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
                Structured worksheets and frameworks to help you prepare for and convert your MBA interviews with confidence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3 inline-block">
                What’s included
              </h3>
              <ul className="space-y-5">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-brand-blue/5 flex items-center justify-center">
                      <Check size={12} className="text-brand-blue" />
                    </div>
                    <span className="text-sm text-gray-600 font-light leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <a 
                href="https://www.notion.so/The-Admit-Co-Interview-Toolkit-2d2e9744253f80d2bfd0c0a0eb5be8e3?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-3 px-10 py-5 text-lg group shadow-xl shadow-brand-blue/20"
              >
                <span>Access Worksheet →</span>
                <Zap size={20} className="transition-transform group-hover:scale-110" />
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400 font-light">
                <Layout size={16} />
                <span>Hosted in Notion for easy editing</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Element */}
          <div className="lg:col-span-2 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[40px] shadow-2xl shadow-brand-blue/10 border border-white"
            >
              <img 
                src="/interview-kit-preview.png" 
                alt="MBA Interview Prep Kit Preview" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-brand-blue text-white p-6 rounded-3xl shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-2">
                  <AnimatePresence>
                    <motion.div 
                      key="stars"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-1"
                    >
                      {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />)}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-1">Total Mentorship View</p>
                <p className="text-sm font-medium">95%+ Admit Rate in ISB/INSEAD</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lead Capture Footer */}
        <section className="mt-40 pt-20 border-t border-gray-200 text-center">
          <h2 className="text-3xl font-serif mb-6">Need help preping for ISB/INSEAD?</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light">
            Book a 1:1 strategy session to go through your profile and prepare a custom interview strategy.
          </p>
          <a 
            href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" 
            className="inline-flex items-center gap-3 text-brand-blue font-semibold text-lg border-b border-brand-blue/20 pb-1 hover:border-brand-blue transition-all"
          >
            <span>Book Strategy Session →</span>
          </a>
        </section>
      </main>

      <footer className="py-20 bg-white border-t border-gray-100 flex items-center justify-center">
        <p className="small-caps text-gray-400">© 2026 The Admit Co. Premium Consulting</p>
      </footer>
    </div>
  );
};

export default InterviewPrepPage;
