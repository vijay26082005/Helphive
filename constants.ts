import { User, Post, Category } from './types';

export const USERS: User[] = [
  { id: 'u1', name: 'Aarav Sharma', avatar: 'https://picsum.photos/seed/aarav/100/100', bio: 'Chasing horizons and hidden trails in the Himalayas. 🏔️', followers: 1250, following: 320, postsCount: 15, badges: [{ name: 'Top Contributor', icon: '🏆', description: 'Awarded for most posts in a month.' }, { name: 'Pioneer', icon: '🧭', description: 'First to post in 5 new locations.' }] },
  { id: 'u2', name: 'Priya Singh', avatar: 'https://picsum.photos/seed/priya/100/100', bio: 'Finding beauty in the unseen corners of India. ✨', followers: 2300, following: 450, postsCount: 22, badges: [{ name: 'Gem Hunter', icon: '💎', description: 'Posted 10+ gems with 4+ avg rating.' }] },
  { id: 'u3', name: 'Rohan Patel', avatar: 'https://picsum.photos/seed/rohan/100/100', bio: 'Local flavors, global stories.', followers: 800, following: 150, postsCount: 8, badges: [] },
];

export const CURRENT_USER_ID = 'u1';

export const POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    title: 'Sunrise at Vivekananda Rock',
    description: 'A breathtaking confluence of three seas. You have to take a ferry, but the sunrise view is absolutely divine.',
    imageUrl: 'https://picsum.photos/seed/kanyakumari/800/600',
    location: 'Kanyakumari, Tamil Nadu',
    category: Category.Sunrise,
    ratings: [{ userId: 'u2', count: 5 }, { userId: 'u3', count: 4 }],
    comments: [{ id: 'c1', userId: 'u2', text: 'Wow, incredible shot!', createdAt: '2 days ago' }],
    createdAt: '3 days ago',
    coords: { lat: 8.0883, lng: 77.5385 }
  },
  {
    id: 'p2',
    userId: 'u2',
    title: 'Dudhsagar Falls Trek',
    description: 'A majestic waterfall hidden in the Western Ghats. The railway track trek is challenging but rewarding.',
    imageUrl: 'https://picsum.photos/seed/dudhsagar/800/600',
    location: 'Sonaulim, Goa',
    category: Category.Waterfall,
    ratings: [{ userId: 'u1', count: 5 }, { userId: 'u3', count: 5 }],
    comments: [],
    createdAt: '1 week ago',
    coords: { lat: 15.3144, lng: 74.3142 }
  },
  {
    id: 'p3',
    userId: 'u3',
    title: 'Amrik Sukhdev Dhaba',
    description: 'An iconic dhaba on the highway to Punjab. Famous for its delicious parathas with white butter.',
    imageUrl: 'https://picsum.photos/seed/dhaba/800/600',
    location: 'Murthal, Haryana',
    category: Category.Food,
    ratings: [{ userId: 'u1', count: 4 }],
    comments: [{ id: 'c2', userId: 'u1', text: 'Their aloo paratha is a must-try!', createdAt: '5 days ago' }],
    createdAt: '10 days ago',
    coords: { lat: 29.1557, lng: 77.0195 }
  },
  {
    id: 'p4',
    userId: 'u2',
    title: 'The Johri Jaipur',
    description: 'A boutique hotel inside a restored haveli. Each suite is named after a different gemstone.',
    imageUrl: 'https://picsum.photos/seed/jaipurhotel/800/600',
    location: 'Johri Bazaar, Jaipur',
    category: Category.Hotel,
    ratings: [{ userId: 'u1', count: 5 }, { userId: 'u2', count: 4 }, { userId: 'u3', count: 5 }],
    comments: [{ id: 'c3', userId: 'u3', text: 'Such a royal experience!', createdAt: '1 day ago' }],
    createdAt: '2 days ago',
    coords: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'p5',
    userId: 'u1',
    title: 'Ruins of Bhangarh Fort',
    description: 'An abandoned 17th-century fort, famously known as one of India\'s most haunted places. Eerily beautiful.',
    imageUrl: 'https://picsum.photos/seed/bhangarh/800/600',
    location: 'Bhangarh, Rajasthan',
    category: Category.Historic,
    ratings: [{ userId: 'u3', count: 4 }],
    comments: [],
    createdAt: '2 weeks ago',
    coords: { lat: 27.0967, lng: 76.2872 }
  },
  {
    id: 'p6',
    userId: 'u2',
    title: 'Kolukkumalai Tea Estate',
    description: 'The world\'s highest organic tea plantation. The jeep ride up is an adventure in itself, and the views are serene.',
    imageUrl: 'https://picsum.photos/seed/munnar/800/600',
    location: 'Munnar, Kerala',
    category: Category.Nature,
    ratings: [{ userId: 'u1', count: 5 }, { userId: 'u3', count: 5 }],
    comments: [{ id: 'c4', userId: 'u1', text: 'Felt like I was in the clouds.', createdAt: '4 days ago' }],
    createdAt: '6 days ago',
    coords: { lat: 10.0889, lng: 77.0595 }
  },
];