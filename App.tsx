import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import GameGrid from './components/GameGrid';
import SantaChat from './components/SantaChat';
import LeaderboardModal from './components/LeaderboardModal';
import { Gamepad2, Gift, Snowflake, Menu, X } from 'lucide-react';
import { ViewState } from './types';
import { motion } from 'framer-motion';

// Typing effect component
const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-1 md:w-2 h-8 md:h-12 bg-neon-green ml-1 animate-pulse align-bottom" />
    </span>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  return (
    <div className="min-h-screen relative text-white font-sans selection:bg-neon-red selection:text-white">
      {/* 3D Background - Persistent */}
      <ThreeScene />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setView(ViewState.HOME)}
            >
              <Gamepad2 className="text-neon-red group-hover:rotate-12 transition-transform duration-300" size={32} />
              <div className="flex flex-col">
                <span className="font-cyber text-sm md:text-xl font-bold tracking-wider leading-none">EXCEL CHERRY FORTE</span>
                <span className="font-holiday text-neon-green text-lg leading-none -mt-1">Coding</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => setView(ViewState.HOME)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === ViewState.HOME ? 'text-neon-red bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setView(ViewState.GAMES)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${view === ViewState.GAMES ? 'text-neon-red bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                >
                  Games
                </button>
                <button 
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Leaderboards
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => { setView(ViewState.HOME); setMobileMenuOpen(false); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Home</button>
              <button onClick={() => { setView(ViewState.GAMES); setMobileMenuOpen(false); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Games</button>
              <button onClick={() => { setIsLeaderboardOpen(true); setMobileMenuOpen(false); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Leaderboards</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-16 min-h-screen flex flex-col">
        {view === ViewState.HOME && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-3xl bg-black/20 border border-white/5 shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-green to-white drop-shadow-[0_0_10px_rgba(0,255,102,0.5)] leading-tight">
                <TypingText text="LEVEL UP YOUR CHRISTMAS" /> <br /> 
                <span className="text-xl md:text-2xl block mt-4 mb-2 text-white font-sans tracking-widest font-light">WITH</span>
                <motion.span 
                  animate={{ 
                    filter: [
                      "drop-shadow(0 0 10px rgba(255,0,60,0.4))", 
                      "drop-shadow(0 0 25px rgba(255,0,60,1))", 
                      "drop-shadow(0 0 10px rgba(255,0,60,0.4))"
                    ],
                    textShadow: [
                      "0 0 10px rgba(255,0,60,0.4)",
                      "0 0 20px rgba(255,0,60,0.8)",
                      "0 0 10px rgba(255,0,60,0.4)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="font-holiday text-neon-red text-4xl md:text-6xl block mt-2 leading-tight"
                >
                  EXCEL CHERRY FORTE <br className="hidden md:block" /> GROUP OF SCHOOLS
                </motion.span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-light">
                Welcome to the 3D project of the Programming/Coding class of the students of Excel Cherry Forte Group of Schools.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => setView(ViewState.GAMES)}
                  className="px-8 py-4 bg-neon-red hover:bg-red-600 text-white rounded-full font-bold font-cyber tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,0,60,0.4)] hover:shadow-[0_0_30px_rgba(255,0,60,0.6)] hover:scale-105 flex items-center"
                >
                  <Gamepad2 className="mr-2" /> PLAY NOW
                </button>
                <button className="px-8 py-4 bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10 rounded-full font-bold font-cyber tracking-wide transition-all duration-300 flex items-center">
                  <Gift className="mr-2" /> DAILY LOOT
                </button>
              </div>

              {/* Stats / Features */}
              <div className="grid grid-cols-3 gap-4 mt-12 border-t border-white/10 pt-8">
                <div className="flex flex-col items-center">
                   <span className="text-3xl font-bold font-cyber text-white">4K</span>
                   <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Resolution</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-white/10">
                   <span className="text-3xl font-bold font-cyber text-white">120</span>
                   <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">FPS</span>
                </div>
                <div className="flex flex-col items-center">
                   <span className="text-3xl font-bold font-cyber text-white">∞</span>
                   <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Cheer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === ViewState.GAMES && (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center space-x-4 mb-8">
               <Snowflake className="text-neon-green animate-spin-slow" size={32} />
               <h2 className="text-3xl md:text-4xl font-cyber font-bold text-white">Excel Cherry Forte Arcade</h2>
            </div>
            <GameGrid />
          </div>
        )}
      </main>

      {/* Floating Elements */}
      <SantaChat />
      
      {/* Modals */}
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </div>
  );
};

export default App;