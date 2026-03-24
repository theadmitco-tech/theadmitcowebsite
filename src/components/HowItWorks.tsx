import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Map, BookOpen, PenTool, FileText, Trophy, ChevronRight } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Map size={24} />,
    title: 'Strategy & Timeline',
    description:
      'Define your target schools, application rounds, and a detailed timeline — down to test scores, recommendations, and deadlines.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'GMAT & Profile Foundation',
    description:
      'Structured GMAT support combined with building a strong, reusable CV that positions you effectively across applications.',
  },
  {
    icon: <PenTool size={24} />,
    title: 'Story & Essays',
    description:
      'Through guided brainstorming and structured exercises, we help craft a compelling narrative that stands out.',
  },
  {
    icon: <FileText size={24} />,
    title: 'Applications & Recommendations',
    description:
      'Execute every application detail with precision — from forms to guiding recommenders and ensuring consistency.',
  },
  {
    icon: <Trophy size={24} />,
    title: 'Interviews & Admit',
    description:
      'Prepare with mock interviews and coaching, plus optional connects with similar profiles — leading to final admits.',
  },
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      className="relative min-h-screen flex flex-col items-center justify-center py-36 px-6"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(2,47,135,0.04), transparent 40%),
          radial-gradient(circle at 80% 50%, rgba(2,47,135,0.03), transparent 50%),
          #F7F6F3
        `,
      }}
    >
      {/* Top section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-36 max-w-md"
      >
        <span className="text-[10px] uppercase tracking-[3px] text-text-dark/20 mb-5 block font-medium">
          Our Process
        </span>
        <h2 className="font-serif text-5xl md:text-6xl font-light mb-6">How it works</h2>
        <p className="text-text-dark/55 text-lg font-light leading-relaxed">
          A structured, end-to-end process — from GMAT to final admit.
        </p>
      </motion.div>

      {/* ─── Desktop: Zigzag journey ─── */}
      <div className="w-full max-w-5xl hidden md:block">
        <div className="relative">
          {/* ── Animated spine with glow ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-[6%] right-[6%] h-[3px] z-10 origin-left rounded-full"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              background:
                'linear-gradient(to right, rgba(2,47,135,0.08), rgba(2,47,135,0.6), rgba(2,47,135,0.6), rgba(2,47,135,0.08))',
              boxShadow: '0 0 28px rgba(2,47,135,0.18), 0 0 10px rgba(2,47,135,0.12)',
              filter: 'blur(0.2px)',
            }}
          />

          {/* ── Steps grid ── */}
          <div className="grid grid-cols-5 gap-10 relative z-20">
            {steps.map((step, i) => {
              const isOdd = i % 2 === 1;
              const isCenter = i === 2;
              const isFirst = i === 0;
              const isActive = activeStep === i;
              const isDimmed = activeStep !== null && activeStep !== i;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: isOdd ? -25 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  onHoverStart={() => setActiveStep(i)}
                  onHoverEnd={() => setActiveStep(null)}
                  className={`flex flex-col items-center cursor-default transition-opacity duration-300 ${
                    isOdd ? 'flex-col-reverse' : ''
                  } ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
                >
                  {/* Card */}
                  <div
                    className={`rounded-2xl w-full transition-all duration-300 text-left relative
                      ${isCenter ? 'p-7' : 'p-6'}
                      ${isOdd ? 'mt-5' : 'mb-5'}
                      ${isCenter ? 'scale-[1.03]' : ''}
                    `}
                    style={{
                      background: isFirst
                        ? 'linear-gradient(135deg, #e8eef8 0%, #ffffff 55%)'
                        : 'linear-gradient(180deg, #ffffff 0%, #fafaf8 100%)',
                      borderLeft: isActive ? '3px solid #022f87' : isFirst ? '3px solid rgba(2,47,135,0.25)' : '3px solid transparent',
                      boxShadow: isActive
                        ? '0 20px 50px rgba(2,47,135,0.14), 0 8px 20px rgba(0,0,0,0.06)'
                        : isFirst
                          ? '0 10px 35px rgba(2,47,135,0.10), 0 4px 12px rgba(0,0,0,0.04)'
                          : '0 10px 30px rgba(0,0,0,0.08)',
                      transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                    }}
                  >
                    <p className="text-[8px] uppercase tracking-[3px] text-text-dark/25 mb-3 font-semibold">
                      Step {i + 1}
                    </p>
                    <h3
                      className={`text-[15px] font-serif font-medium mb-2.5 leading-snug transition-colors duration-300 flex items-center gap-1.5 ${
                        isActive ? 'text-brand-blue' : 'text-text-dark/90'
                      }`}
                    >
                      {step.title}
                      <ChevronRight
                        size={13}
                        className={`transition-all duration-300 flex-shrink-0 ${
                          isActive
                            ? 'opacity-100 translate-x-0 text-brand-blue'
                            : 'opacity-0 -translate-x-1'
                        }`}
                      />
                    </h3>
                    <p className="text-[11.5px] text-text-dark/55 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon milestone — ON the spine */}
                  <div
                    className="relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? '#022f87' : 'rgba(2,47,135,0.08)',
                      color: isActive ? '#ffffff' : 'rgba(2,47,135,0.6)',
                      borderWidth: '2.5px',
                      borderColor: isActive ? '#022f87' : '#ffffff',
                      borderStyle: 'solid',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: isActive
                        ? '0 10px 30px rgba(2,47,135,0.3)'
                        : '0 2px 10px rgba(0,0,0,0.06)',
                    }}
                  >
                    {step.icon}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tagline — below steps */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-28 text-[10px] text-text-dark/18 tracking-[2px] uppercase font-medium"
        >
          We don't just edit — we build your application like a project.
        </motion.p>
      </div>

      {/* ─── Mobile: Vertical timeline ─── */}
      <div className="flex flex-col gap-0 md:hidden relative w-full max-w-md mx-auto">
        {/* Vertical spine with glow */}
        <div
          className="absolute top-8 bottom-8 left-7 w-[3px] z-0 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(2,47,135,0.05), rgba(2,47,135,0.4), rgba(2,47,135,0.05))',
            boxShadow: '0 0 16px rgba(2,47,135,0.1)',
          }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex gap-6 items-start pb-10 last:pb-0"
          >
            {/* Icon anchor */}
            <div
              className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(2,47,135,0.08)',
                color: 'rgba(2,47,135,0.6)',
                borderWidth: '2.5px',
                borderColor: '#ffffff',
                borderStyle: 'solid',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              }}
            >
              {step.icon}
            </div>

            {/* Content card */}
            <div
              className="rounded-2xl p-5 flex-1"
              style={{
                background: i === 0
                  ? 'linear-gradient(135deg, #eef3fb 0%, #ffffff 60%)'
                  : 'linear-gradient(180deg, #ffffff 0%, #fafaf8 100%)',
                borderLeft: i === 0 ? '3px solid rgba(2,47,135,0.25)' : '3px solid transparent',
                boxShadow: i === 0
                  ? '0 10px 35px rgba(2,47,135,0.10), 0 4px 12px rgba(0,0,0,0.04)'
                  : '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <p className="text-[8px] uppercase tracking-[3px] text-text-dark/25 mb-2 font-semibold">
                Step {i + 1}
              </p>
              <h3 className="text-base font-serif font-medium text-text-dark/90 mb-1.5 flex items-center gap-1.5">
                {step.title}
                <ChevronRight size={13} className="text-text-dark/25 flex-shrink-0" />
              </h3>
              <p className="text-sm text-text-dark/55 leading-relaxed font-light">{step.description}</p>
            </div>
          </motion.div>
        ))}

        <p className="text-center mt-14 text-[10px] text-text-dark/18 tracking-[2px] uppercase font-medium">
          We don't just edit — we build your application like a project.
        </p>
      </div>

      {/* Bottom section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
    </section>
  );
};

export default HowItWorks;
