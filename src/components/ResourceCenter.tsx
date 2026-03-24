import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from './FirebaseProvider';
import { Resource, ResourceCategory } from '../types';
import { BookOpen, Search, Filter, Plus, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const ResourceCenter: React.FC = () => {
  const { user, userProfile, isAuthReady } = useFirebase();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ResourceCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'GMAT' as ResourceCategory,
    content: '',
    author: ''
  });

  useEffect(() => {
    if (!isAuthReady) return;

    const path = 'resources';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const res: Resource[] = [];
      snapshot.forEach((doc) => {
        res.push({ id: doc.id, ...doc.data() } as Resource);
      });
      setResources(res);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching resources:', error);
    });

    return () => unsubscribe();
  }, [isAuthReady]);

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile?.role !== 'admin') return;

    try {
      await addDoc(collection(db, 'resources'), {
        ...newResource,
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewResource({ title: '', description: '', category: 'GMAT', content: '', author: '' });
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const filteredResources = resources.filter(r => {
    const matchesFilter = filter === 'All' || r.category === filter;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                         r.description?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <span className="small-caps mb-2 block">Resource Center</span>
          <h2 className="text-4xl">Expert MBA Insights</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12 w-full md:w-64"
            />
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Filter size={14} className="text-white/30" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-transparent border-none text-xs uppercase tracking-widest focus:ring-0 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="GMAT">GMAT</option>
              <option value="Essays">Essays</option>
              <option value="Interviews">Interviews</option>
              <option value="Networking">Networking</option>
            </select>
          </div>
          {userProfile?.role === 'admin' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              <span>Add Resource</span>
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card flex flex-col h-full group cursor-pointer hover:border-white/30 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/10">
                      {resource.category}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">
                      {resource.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl mb-3 group-hover:text-white transition-colors">{resource.title}</h3>
                  <p className="text-sm text-white/50 line-clamp-3 mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40 italic">By {resource.author || 'AdmitCo Expert'}</span>
                  <div className="flex items-center gap-2 text-xs font-medium group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredResources.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card border-dashed">
              <p className="text-white/40">No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl mb-6">Create New Resource</h3>
            <form onSubmit={handleAddResource} className="space-y-4">
              <div>
                <label className="small-caps mb-2 block">Title</label>
                <input 
                  required
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g. Mastering the HBS Essay"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="small-caps mb-2 block">Category</label>
                  <select 
                    value={newResource.category}
                    onChange={(e) => setNewResource({...newResource, category: e.target.value as ResourceCategory})}
                    className="input-field w-full"
                  >
                    <option value="GMAT">GMAT</option>
                    <option value="Essays">Essays</option>
                    <option value="Interviews">Interviews</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>
                <div>
                  <label className="small-caps mb-2 block">Author</label>
                  <input 
                    type="text"
                    value={newResource.author}
                    onChange={(e) => setNewResource({...newResource, author: e.target.value})}
                    className="input-field w-full"
                    placeholder="Expert Name"
                  />
                </div>
              </div>
              <div>
                <label className="small-caps mb-2 block">Description</label>
                <textarea 
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  className="input-field w-full h-20 resize-none"
                  placeholder="Short summary for the card..."
                />
              </div>
              <div>
                <label className="small-caps mb-2 block">Content (Markdown)</label>
                <textarea 
                  required
                  value={newResource.content}
                  onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                  className="input-field w-full h-48 font-mono text-sm"
                  placeholder="# Your resource content here..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">Publish Resource</button>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResourceCenter;
