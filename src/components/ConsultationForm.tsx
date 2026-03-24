import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from './FirebaseProvider';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Mail, User } from 'lucide-react';

const ConsultationForm: React.FC = () => {
  const { user } = useFirebase();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'consultationRequests'), {
        id: crypto.randomUUID(),
        userId: user.uid,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting consultation request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-3xl mb-4">Request Received</h2>
          <p className="text-white/60 mb-8">
            Thank you for your interest. One of our senior consultants will reach out to you within 24-48 hours to schedule your free consultation.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary w-full"
          >
            Send Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <span className="small-caps mb-4 block">Expert Guidance</span>
          <h2 className="title-text mb-8">Let's Build Your <br />Elite Profile.</h2>
          <p className="text-lg text-white/60 mb-12 leading-relaxed">
            Our free 30-minute consultation is designed to understand your profile, 
            identify your strengths, and provide an initial roadmap for your MBA journey.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MessageSquare className="text-white/80" size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Profile Evaluation</h4>
                <p className="text-sm text-white/40">A deep dive into your academic and professional background.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="text-white/80" size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Strategy Session</h4>
                <p className="text-sm text-white/40">Initial thoughts on your school list and storytelling strategy.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
        >
          <h3 className="text-2xl mb-8">Request a Free Consultation</h3>
          {!user ? (
            <div className="text-center py-12">
              <p className="text-white/50 mb-6">Please sign in to request a consultation.</p>
              <button className="btn-primary">Sign In with Google</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="small-caps mb-2 block">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field w-full pl-12"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="small-caps mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field w-full pl-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="small-caps mb-2 block">Tell us about your goals</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="input-field w-full h-40 resize-none"
                  placeholder="Target schools, GMAT score, work experience, or specific questions..."
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Request</span>
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-white/30 uppercase tracking-widest">
                No commitment required. We respect your privacy.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationForm;
