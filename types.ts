
export type Gender = 'homme' | 'femme' | 'non-binaire' | 'autre';
export type Goal = 'mariage' | 'relation-serieuse' | 'amitié' | 'recherche-ouverte';

export interface User {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  bio: string;
  location: string;
  photos: string[];
  goal: Goal;
  interests: string[];
  job?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  user: User;
  lastMessage?: string;
  messages: Message[];
}

export enum AppTab {
  DISCOVER = 'discover',
  MATCHES = 'matches',
  AI_WINGMAN = 'ai_wingman',
  PROFILE = 'profile'
}
