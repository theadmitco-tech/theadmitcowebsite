import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white pt-32 pb-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">





        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 space-y-8">
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
