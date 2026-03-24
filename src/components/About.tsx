import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Timer, Zap } from 'lucide-react';

const About: React.FC = () => {
  const points = [
    {
      title: 'Built like a project',
      description: 'We don’t "edit essays". We run your application like a project — with timelines, accountability, and structure.',
      icon: <Timer size={24} className="text-blue-600" />
    },
    {
      title: 'Real operator experience',
      description: 'Everything we use — from worksheets to interview prep — comes from what actually worked for us in our own journeys.',
      icon: <ShieldCheck size={24} className="text-blue-600" />
    },
    {
      title: 'Small, high-touch',
      description: 'We work with a limited number of applicants to ensure depth, not volume. You get thinkers, not template-readers.',
      icon: <Zap size={24} className="text-blue-600" />
    }
  ];

  const schools = ['ISB', 'INSEAD', 'LBS', 'M7'];

  return (
    <section id="about" className="relative py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section 1: Hook */}
        <div className="max-w-4xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-light mb-8 tracking-tight leading-[1.1] text-gray-900"
          >
            Built by applicants who’ve <br />
            <span className="italic">been through it</span> — not consultants reading from a playbook.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed"
          >
            We’ve navigated GMAT prep, essays, and interviews ourselves — and now help you do it better.
          </motion.p>
        </div>

        {/* Section 2: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Founders Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 border border-gray-100"
              >
                <img 
                  src="/founders/founder-1.png" 
                  alt="Founder A" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden translate-y-12 shadow-2xl shadow-black/5 border border-gray-100"
              >
                <img 
                  src="/founders/founder-2.png" 
                  alt="Founder B" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -right-8 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl" />
          </div>

          {/* Story Text */}
          <div className="space-y-10 lg:pl-10">
            <div className="space-y-6">
              <p className="small-caps text-blue-600 font-bold mb-4">Our Story</p>
              <h3 className="text-3xl font-serif text-gray-900 leading-snug">
                "We built the system <br /> we wish we had."
              </h3>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                <p>
                  AdmitCo started as a way to help friends navigate MBA applications without guesswork. 
                  What began with sharing timelines and interview prep frameworks quickly grew — because the problem was real.
                </p>
                <p>
                  Most applicants don’t fail because they lack ability. They fail because they lack structure. 
                  In a process that feels like a black box, structure is the only thing that provides clarity.
                </p>
                <p className="text-gray-900 font-medium">
                  That’s what we fix.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: How we're different */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                {point.icon}
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-4">{point.title}</h4>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section 4: Credibility Strip */}
        <div className="py-12 border-y border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 mb-32">
          <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Helped across</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {schools.map(school => (
              <span key={school} className="text-2xl md:text-3xl font-serif text-gray-300 hover:text-gray-900 transition-colors cursor-default">
                {school}
              </span>
            ))}
          </div>
          <p className="text-gray-400 font-light text-xs hidden lg:block">Starts with structure. Ends with admits.</p>
        </div>

        {/* Section 5: CTA */}
        <div className="text-center">
          <motion.div 
            whileHover={{ y: -5 }} 
            className="inline-block"
          >
            <p className="text-gray-400 mb-6 font-light">Not sure where you stand?</p>
            <a 
              href="https://calendar.app.google/vC5Rx3vFJmPktLKu8" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group flex items-center gap-3 px-10 py-5 text-lg"
            >
              <span>Get your profile reviewed →</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
