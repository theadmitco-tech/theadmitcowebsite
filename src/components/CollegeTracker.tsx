import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useFirebase } from './FirebaseProvider';
import { Application, ApplicationStatus } from '../types';
import { Plus, Trash2, Edit3, CheckCircle2, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const CollegeTracker: React.FC = () => {
  const { user, isAuthReady } = useFirebase();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApp, setNewApp] = useState({
    schoolName: '',
    round: 'Round 1',
    deadline: '',
    status: 'not-started' as ApplicationStatus,
    notes: ''
  });

  const handleFirestoreError = (error: any, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: user?.uid,
        email: user?.email,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  useEffect(() => {
    if (!isAuthReady || !user) return;

    const path = 'applications';
    const q = query(collection(db, path), where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps: Application[] = [];
      snapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(apps.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user, isAuthReady]);

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const path = 'applications';
    try {
      await addDoc(collection(db, path), {
        ...newApp,
        userId: user.uid,
        updatedAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewApp({ schoolName: '', round: 'Round 1', deadline: '', status: 'not-started', notes: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleUpdateStatus = async (id: string, status: ApplicationStatus) => {
    const path = `applications/${id}`;
    try {
      await updateDoc(doc(db, 'applications', id), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleDelete = async (id: string) => {
    const path = `applications/${id}`;
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted': return 'text-emerald-400';
      case 'rejected': return 'text-red-400';
      case 'submitted': return 'text-blue-400';
      case 'interview-invite': return 'text-purple-400';
      default: return 'text-white/60';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <AlertCircle size={48} className="text-white/20 mb-4" />
        <h2 className="text-2xl mb-2">Sign in to track your applications</h2>
        <p className="text-white/50 mb-8">Keep all your MBA applications organized in one place.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="small-caps mb-2 block">Application Tracker</span>
          <h2 className="text-4xl">Your College List</h2>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add School</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl">{app.schoolName}</h3>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/10">
                      {app.round}
                    </span>
                    {app.deadline && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/10 flex items-center gap-1">
                        <Clock size={10} />
                        {app.deadline}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="small-caps">Status</span>
                      <select 
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                        className={`bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer ${getStatusColor(app.status)}`}
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="submitted">Submitted</option>
                        <option value="interview-invite">Interview Invite</option>
                        <option value="accepted">Accepted</option>
                        <option value="waitlisted">Waitlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    {app.notes && (
                      <p className="text-sm text-white/40 italic">"{app.notes}"</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">
                    Last updated: {app.updatedAt?.toDate().toLocaleDateString()}
                  </span>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <Edit3 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {applications.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card border-dashed">
              <p className="text-white/40">No schools added yet. Start by adding your first target school.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 glass-card max-w-lg w-full"
          >
            <h3 className="text-2xl mb-6">Add Target School</h3>
            <form onSubmit={handleAddApplication} className="space-y-4">
              <div>
                <label className="small-caps mb-2 block">School Name</label>
                <input 
                  required
                  type="text"
                  value={newApp.schoolName}
                  onChange={(e) => setNewApp({...newApp, schoolName: e.target.value})}
                  className="input-field w-full"
                  placeholder="e.g. Harvard Business School"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="small-caps mb-2 block">Round</label>
                  <select 
                    value={newApp.round}
                    onChange={(e) => setNewApp({...newApp, round: e.target.value})}
                    className="input-field w-full"
                  >
                    <option>Round 1</option>
                    <option>Round 2</option>
                    <option>Round 3</option>
                    <option>Rolling</option>
                  </select>
                </div>
                <div>
                  <label className="small-caps mb-2 block">Deadline</label>
                  <input 
                    type="date"
                    value={newApp.deadline}
                    onChange={(e) => setNewApp({...newApp, deadline: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
              </div>
              <div>
                <label className="small-caps mb-2 block">Notes</label>
                <textarea 
                  value={newApp.notes}
                  onChange={(e) => setNewApp({...newApp, notes: e.target.value})}
                  className="input-field w-full h-24 resize-none"
                  placeholder="Any specific thoughts or reminders..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">Add to List</button>
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

export default CollegeTracker;
