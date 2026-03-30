import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorks from './HowItWorks';
import SuccessStories from './SuccessStories';
import Services from './Services';
import Resources from './Resources';
import About from './About';

const Hero: React.FC = () => {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6ceaa]/40 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h1 className="title-text mb-8">
            Get Into <span className="italic font-serif text-brand-blue">ISB, M7s, or INSEAD</span> <br />
            - Plan your journey
          </h1>
          <p className="text-lg md:text-xl text-text-dark/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            From GMAT prep to interview strategy — we help with everything.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 group">
              <span>Get Your Profile Reviewed</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link to="/resources" className="btn-secondary">
              Start your GMAT journey
            </Link>
          </div>

          <p className="mt-8 text-sm text-text-dark/80 max-w-lg mx-auto font-light">
            Built by two ISB alums who've been through the process. <br />
            Limited cohorts. Personalised guidance.
          </p>
        </motion.div>
      </section>

      <HowItWorks />

      <SuccessStories />

      <Services />

      <Resources />

      <About />
    </>
  );
};

export default Hero;
