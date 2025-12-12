import React from 'react';
import { Game } from '../types';
import { Star, Gamepad2, Zap } from 'lucide-react';

const GAMES_DATA: Game[] = [
  {
    id: '1',
    title: 'Excel Math Racer',
    genre: 'Edu-Racing',
    rating: 4.9,
    image: 'https://picsum.photos/400/300?random=10',
    description: 'Solve complex equations at lightspeed to power your cyber-sleigh through the neon track.',
    price: 'Free'
  },
  {
    id: '2',
    title: 'Cherry Code Breaker',
    genre: 'Logic Puzzle',
    rating: 4.7,
    image: 'https://picsum.photos/400/300?random=11',
    description: 'Hack the naughty list mainframe using Python algorithms before time runs out.',
    price: 'Free'
  },
  {
    id: '3',
    title: 'Forte Physics Flight',
    genre: 'Simulation',
    rating: 4.8,
    image: 'https://picsum.photos/400/300?random=12',
    description: 'Master aerodynamics and gravity vectors to guide the reindeer team safely.',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Holiday History Warp',
    genre: 'Adventure',
    rating: 4.5,
    image: 'https://picsum.photos/400/300?random=13',
    description: 'Travel back in time to discover the true origins of holiday traditions globally.',
    price: 'Free'
  },
    {
    id: '5',
    title: 'Bio-Frost Lab',
    genre: 'Science',
    rating: 4.6,
    image: 'https://picsum.photos/400/300?random=14',
    description: 'Experiment with cryogenics and magical plant life in the North Pole greenhouse.',
    price: 'Free'
  },
  {
    id: '6',
    title: 'Spelling Bee RPG',
    genre: 'Word Game',
    rating: 4.8,
    image: 'https://picsum.photos/400/300?random=15',
    description: 'Cast powerful spells by completing complex vocabulary challenges against frost giants.',
    price: 'Free'
  }
];

const GameGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {GAMES_DATA.map((game) => (
        <div key={game.id} className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-neon-red transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,0,60,0.3)]">
          <div className="relative h-48 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-1 text-yellow-400">
               <Star size={16} fill="currentColor" />
               <span className="text-sm font-bold">{game.rating}</span>
            </div>
            <div className="absolute top-3 right-3 z-20 bg-neon-green/90 text-black text-xs font-bold px-2 py-1 rounded">
              {game.genre}
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-cyber text-white mb-2 truncate">{game.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">{game.description}</p>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-neon-green font-cyber">{game.price}</span>
              <button className="flex items-center space-x-2 bg-white/10 hover:bg-neon-red text-white px-3 py-2 rounded-lg transition-colors text-sm font-semibold group-hover:bg-neon-red">
                <Gamepad2 size={16} />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameGrid;