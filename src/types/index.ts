export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: string;
}
