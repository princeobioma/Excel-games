import React, { useState, useEffect } from 'react';
import { X, Trophy, Plus, User, Trash2, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardEntry {
  name: string;
  score: number;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([
    { name: "Santa_Claus_99", score: 99999 },
    { name: "Rudolph_Red", score: 85000 },
    { name: "Frosty_The_Snowman", score: 72000 },
    { name: "Elf_On_Shelf", score: 68000 },
    { name: "Grinch_Gamer", score: 54000 },
  ]);
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('excel_cherry_leaderboard');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleAdd = () => {
    if (!newName.trim()) return;
    
    // Use provided score or generate random if empty
    let scoreVal = newScore.trim() ? parseInt(newScore.replace(/,/g, '')) : 0;
    if (!scoreVal || isNaN(scoreVal)) {
       scoreVal = Math.floor(Math.random() * 59000) + 1000;
    }
    
    const newEntry = {
      name: newName.trim(),
      score: scoreVal
    };
    
    // Add new entry, sort by score descending
    const updated = [...entries, newEntry].sort((a, b) => b.score - a.score);
    
    setEntries(updated);
    localStorage.setItem('excel_cherry_leaderboard', JSON.stringify(updated));
    setNewName('');
    setNewScore('');
  };

  const handleDelete = (indexToDelete: number) => {
    const updated = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updated);
    localStorage.setItem('excel_cherry_leaderboard', JSON.stringify(updated));
  };

  const getRankColor = (index: number) => {
    switch(index) {
      case 0: return "text-yellow-400";
      case 1: return "text-gray-300";
      case 2: return "text-amber-600";
      default: return "text-neon-green";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[95%] md:w-full max-w-md outline-none"
          >
            <div className="bg-deep-space border border-neon-green/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,102,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-black via-neon-green/10 to-black p-4 md:p-6 border-b border-neon-green/20 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-400 animate-pulse w-6 h-6 md:w-7 md:h-7" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-cyber font-bold text-white tracking-wider">LEADERBOARD</h2>
                    <p className="text-[10px] md:text-xs text-neon-green uppercase tracking-widest">Top Cyber Elves</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
                  <X size={24} />
                </button>
              </div>

              {/* List */}
              <div className="overflow-y-auto p-3 md:p-4 space-y-2 custom-scrollbar flex-1 min-h-0">
                {entries.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 font-cyber text-sm">No scores yet. Be the first!</div>
                ) : (
                    entries.map((entry, index) => (
                    <div key={`${entry.name}-${index}-${entry.score}`} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-neon-green/50 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4 overflow-hidden flex-1">
                        <span className={`font-cyber font-bold w-6 text-center shrink-0 ${getRankColor(index)}`}>
                            {index + 1}
                        </span>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-white group-hover:text-neon-red transition-colors text-sm md:text-base truncate">{entry.name}</span>
                            <span className="text-[10px] md:text-xs text-gray-500">Rank {index + 1}</span>
                        </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="font-cyber text-neon-green text-sm md:text-base">{entry.score.toLocaleString()}</span>
                            <button 
                                onClick={() => handleDelete(index)}
                                className="text-gray-600 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                aria-label="Delete score"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-black/40 border-t border-white/10 shrink-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-[2]">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                      placeholder="Name / Alias" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-neon-green transition-colors placeholder-gray-600"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <input 
                      type="number" 
                      value={newScore}
                      onChange={(e) => setNewScore(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                      placeholder="Score (Opt)" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-neon-green transition-colors placeholder-gray-600"
                    />
                  </div>
                  <button 
                    onClick={handleAdd}
                    className="bg-neon-green hover:bg-green-500 text-black font-bold px-3 py-2 rounded-lg transition-colors shrink-0 flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center">
                  Leave score empty to auto-generate based on skill level.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardModal;