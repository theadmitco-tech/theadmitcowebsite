import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white pt-32 pb-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section: Final Persuasion Layer */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight max-w-2xl mx-auto">
              We build your MBA application like a <span className="italic">project</span> — not a checklist.
            </h2>
          </motion.div>

          {/* Strong CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-gray-500 font-light text-lg">Not sure where you stand?</p>
            <Link 
              to="/consultation" 
              className="btn-primary inline-flex items-center gap-3 px-12 py-5 text-xl group shadow-xl shadow-brand-blue/10"
            >
              <span>Get your profile reviewed →</span>
            </Link>
          </motion.div>
        </div>

        {/* Subtle Divider Text */}
        <div className="flex items-center gap-8 mb-20 opacity-20">
          <div className="h-[1px] flex-grow bg-gray-900" />
          <span className="text-[10px] uppercase tracking-[4px] font-bold text-gray-900 whitespace-nowrap">
            For applicants who take this seriously
          </span>
          <div className="h-[1px] flex-grow bg-gray-900" />
        </div>

        {/* Columnar Structure */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src="/Main%20logo.svg" alt="AdmitCo Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-xs">
              Built by applicants who’ve been through it. Designed for those who want to get in — without guesswork.
            </p>
          </div>

          {/* Programs Col */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Programs</span>
            <div className="flex flex-col gap-4 text-sm text-gray-600 font-light">
              <Link to="/consultation" className="hover:text-blue-600 transition-colors">Full Application Mentorship</Link>
              <Link to="/interview-prep" className="hover:text-blue-600 transition-colors">Interview Preparation</Link>
              <a href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" target="_blank" className="hover:text-blue-600 transition-colors">GMAT Batch</a>
            </div>
          </div>

          {/* Company Col */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Company</span>
            <div className="flex flex-col gap-4 text-sm text-gray-600 font-light">
              <Link to="/" className="hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/" className="hover:text-blue-600 transition-colors">Success Stories</Link>
              <Link to="/consultation" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Legal</span>
            <div className="flex flex-col gap-4 text-sm text-gray-600 font-light">
              <Link to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 space-y-8">
          {/* Credibility Micro-line */}
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[1px] font-bold text-gray-400">
              Trusted by applicants across ISB, INSEAD, LBS, and M7 schools.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
              © 2026 The Admit Co. Premium Consulting.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href="https://www.linkedin.com/company/theadmitco" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all group"
              >
                <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-bold">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
