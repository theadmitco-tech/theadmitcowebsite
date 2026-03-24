import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './components/FirebaseProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import CollegeTrackerPage from './pages/CollegeTrackerPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-bg-light text-text-dark font-sans selection:bg-brand-blue selection:text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/tracker" element={<CollegeTrackerPage />} />
                <Route path="/interview-prep" element={<InterviewPrepPage />} />
                <Route path="/consultation" element={<ConsultationForm />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
