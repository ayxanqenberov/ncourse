export interface User {
  id?: string;

  name: string;
  username: string;
  email: string;
  password: string;

  avatar: string;
  bio: string;

  followers: string[];
  following: string[];

  favoriteCourses: string[];
  basket: string[];

  createdAt: string;
}