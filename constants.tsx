
import React from 'react';
import { User, Goal } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Amélie',
    age: 28,
    gender: 'femme',
    bio: 'Passionnée d\'architecture et de cuisine italienne. Je cherche quelqu\'un pour construire un futur stable et joyeux.',
    location: 'Paris',
    photos: ['https://picsum.photos/seed/amelie/600/800'],
    goal: 'mariage',
    interests: ['Cuisine', 'Voyages', 'Design', 'Yoga'],
    job: 'Architecte'
  },
  {
    id: '2',
    name: 'Thomas',
    age: 32,
    gender: 'homme',
    bio: 'Ingénieur le jour, photographe la nuit. J\'aime les randonnées en montagne et les discussions profondes autour d\'un café.',
    location: 'Lyon',
    photos: ['https://picsum.photos/seed/thomas/600/800'],
    goal: 'relation-serieuse',
    interests: ['Photo', 'Rando', 'Tech', 'Café'],
    job: 'Ingénieur Logiciel'
  },
  {
    id: '3',
    name: 'Sasha',
    age: 25,
    gender: 'non-binaire',
    bio: 'Artiste multidisciplinaire. La créativité est mon moteur. Je cherche une connexion authentique sans étiquette.',
    location: 'Nantes',
    photos: ['https://picsum.photos/seed/sasha/600/800'],
    goal: 'recherche-ouverte',
    interests: ['Peinture', 'Musique', 'Nature', 'Cinéma'],
    job: 'Artiste'
  },
  {
    id: '4',
    name: 'Clara',
    age: 30,
    gender: 'femme',
    bio: 'Médecin, j\'aime prendre soin des autres. Je cherche mon partenaire pour la vie, quelqu\'un de drôle et bienveillant.',
    location: 'Bordeaux',
    photos: ['https://picsum.photos/seed/clara/600/800'],
    goal: 'mariage',
    interests: ['Lecture', 'Vin', 'Vélo', 'Piano'],
    job: 'Cardiologue'
  }
];

export const GOAL_LABELS: Record<Goal, string> = {
  'mariage': '💍 Mariage',
  'relation-serieuse': '❤️ Relation Sérieuse',
  'amitié': '🤝 Amitié',
  'recherche-ouverte': '✨ Recherche Ouverte'
};
