
export enum Category {
  Sunrise = "Sunrise",
  Waterfall = "Waterfall",
  Hotel = "Hotel",
  Food = "Food",
  Historic = "Historic",
  Nature = "Nature",
  Art = "Art",
}

export interface Badge {
  name: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  badges: Badge[];
  postsCount: number;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  category: Category;
  ratings: { userId: string; count: number }[];
  comments: Comment[];
  createdAt: string;
  coords?: { lat: number; lng: number };
}
