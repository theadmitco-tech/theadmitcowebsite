import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowUp, ArrowDown, ExternalLink, Calendar, Calculator, Sparkles, X, Heart, HeartOff } from 'lucide-react';
import Navbar from '../components/Navbar';

interface School {
  id: string;
  name: string;
  region: string;
  deadline: string;
  avgGmat: string;
  notes: string;
}

const schoolData: School[] = [
  { id: 'isb', name: 'ISB', region: 'India', deadline: 'Sep 15 (R1)', avgGmat: '710', notes: 'Best for India-focused careers' },
  { id: 'insead', name: 'INSEAD', region: 'Global', deadline: 'Jul 15 (R1)', avgGmat: '710', notes: 'Top choice for consulting' },
  { id: 'hbs', name: 'Harvard Business School', region: 'USA', deadline: 'Sep 05 (R1)', avgGmat: '730', notes: 'Legacy and global reach' },
  { id: 'stanford', name: 'Stanford GSB', region: 'USA', deadline: 'Sep 12 (R1)', avgGmat: '737', notes: 'Highly selective, growth-mindset' },
  { id: 'wharton', name: 'Wharton', region: 'USA', deadline: 'Sep 06 (R1)', avgGmat: '733', notes: 'Top finance and quantitative school' },
  { id: 'lbs', name: 'London Business School', region: 'Europe', deadline: 'Sep 10 (R1)', avgGmat: '708', notes: 'Strong London financial network' },
  { id: 'iima', name: 'IIM A PGPX', region: 'India', deadline: 'Oct 30 (R1)', avgGmat: '705', notes: 'Executive program for experienced pros' },
  { id: 'mit', name: 'MIT Sloan', region: 'USA', deadline: 'Sep 29 (R1)', avgGmat: '730', notes: 'Tech and innovation leader' }
];

const CollegeTrackerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortField, setSortField] = useState<keyof School>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const filteredSchools = useMemo(() => {
    return schoolData
      .filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = activeFilter === 'All' || s.region === activeFilter;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        return a[sortField].toString().localeCompare(b[sortField].toString()) * factor;
      });
  }, [searchTerm, activeFilter, sortField, sortOrder]);

  const toggleSort = (field: keyof School) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const toggleShortlist = (id: string) => {
    setShortlisted(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Navbar />
      
      <main className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span className="small-caps text-brand-blue">Active Research Tool</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                MBA College <span className="italic">Tracker</span>
              </h1>
            </motion.div>
            <p className="text-xl text-gray-500 font-light max-w-xl">
              Compare deadlines, GMAT targets, and school profiles. Add them to your shortlist to plan your journey.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <a 
              href="https://calendar.app.google/vC5Rx3vFJmPktLKu8"
              className="btn-primary inline-flex items-center gap-2 shadow-xl shadow-brand-blue/20"
            >
              <span>Need help choosing? Get profile reviewed →</span>
            </a>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-black/5 border border-white mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search schools (e.g. INSEAD, Wharton)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-brand-blue/20 focus:ring-4 focus:ring-brand-blue/5 rounded-2xl py-4 pl-12 pr-4 transition-all text-sm outline-none"
              />
            </div>

            {/* Region Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100/50">
              {['All', 'USA', 'India', 'Europe', 'Global'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    activeFilter === filter 
                      ? 'bg-white text-brand-blue shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 cursor-pointer hover:bg-gray-100/50 transition-colors" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-2">
                       <span className="small-caps text-xs">School Name</span>
                       {sortField === 'name' && (sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </div>
                  </th>
                  <th className="px-8 py-6 cursor-pointer hover:bg-gray-100/50 transition-colors" onClick={() => toggleSort('deadline')}>
                    <div className="flex items-center gap-2">
                      <span className="small-caps text-xs">Deadline</span>
                      {sortField === 'deadline' && (sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </div>
                  </th>
                  <th className="px-8 py-6 cursor-pointer hover:bg-gray-100/50 transition-colors" onClick={() => toggleSort('avgGmat')}>
                    <div className="flex items-center gap-2">
                      <span className="small-caps text-xs">Avg GMAT</span>
                      {sortField === 'avgGmat' && (sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </div>
                  </th>
                  <th className="px-8 py-6">
                    <span className="small-caps text-xs">Notes</span>
                  </th>
                  <th className="px-8 py-6 text-center">
                    <span className="small-caps text-xs">Shortlist</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredSchools.map((school, i) => (
                    <motion.tr 
                      key={school.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`group hover:bg-gray-50/30 transition-colors border-b border-gray-100 last:border-0 ${shortlisted.includes(school.id) ? 'bg-brand-blue/[0.01]' : ''}`}
                    >
                      <td className="px-8 py-8">
                        <div className="font-serif text-lg text-gray-900 group-hover:text-brand-blue transition-colors">
                          {school.name}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">
                          {school.region}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                         <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                           <Calendar className="text-brand-blue/30" size={14} />
                           {school.deadline}
                         </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-700">{school.avgGmat}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-400">Target</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 max-w-xs">
                        <p className="text-sm text-gray-500 font-light italic truncate group-hover:whitespace-normal transition-all duration-300">
                          {school.notes}
                        </p>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <button 
                          onClick={() => toggleShortlist(school.id)}
                          className={`p-3 rounded-full transition-all duration-300 ${
                            shortlisted.includes(school.id) 
                              ? 'bg-red-50 text-red-500 scale-110' 
                              : 'bg-gray-50 text-gray-300 hover:text-red-400 hover:bg-red-50/50'
                          }`}
                        >
                          {shortlisted.includes(school.id) ? <Heart size={18} fill="currentColor" /> : <Heart size={18} />}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredSchools.length === 0 && (
            <div className="py-20 text-center">
              <Search className="mx-auto text-gray-200 mb-4" size={48} />
              <h3 className="text-lg font-serif">No schools found</h3>
              <p className="text-sm text-gray-400 font-light">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                className="mt-6 text-brand-blue text-xs font-bold uppercase tracking-widest border-b border-brand-blue/20 hover:border-brand-blue transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Counter Widget */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <AnimatePresence>
            {shortlisted.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                className="bg-brand-blue text-white px-8 py-4 rounded-full shadow-2xl shadow-brand-blue/40 flex items-center gap-6"
              >
                <div className="flex items-center gap-3 border-r border-white/20 pr-6">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {shortlisted.length}
                  </div>
                  <span className="text-sm font-medium">Schools Shortlisted</span>
                </div>
                <a 
                  href="https://calendar.app.google/vC5Rx3vFJmPktLKu8"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm font-bold">Plan your journey →</span>
                </a>
                <button onClick={() => setShortlisted([])} className="hover:opacity-50 transition-opacity pl-2">
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="py-20 bg-white border-t border-gray-100 flex items-center justify-center">
        <p className="small-caps text-gray-400">© 2026 The Admit Co. Premium Consulting</p>
      </footer>
    </div>
  );
};

export default CollegeTrackerPage;
