export interface Game {
  id: string;
  title: string;
  genre: string;
  rating: number;
  image: string;
  description: string;
  price: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  GAMES = 'GAMES',
  CHAT = 'CHAT'
}