import type { Comment, Post, User } from "../types";

const userCount = 12;
const postCount = 60;
const now = Date.now();

const baseUsers: User[] = Array.from({ length: userCount }, (_, index) => {
  const id = `u${index + 1}`;

  return {
    id,
    username: `user${index + 1}`,
    fullName: `User ${index + 1}`,
    avatar: `https://picsum.photos/seed/avatar${index + 1}/100/100`,
    bio: `Bio for user ${index + 1}`,
    followers: [],
    following: [],
    posts: []
  };
});

const usersWithRelations: User[] = baseUsers.map((user, index) => {
  const nextUser = baseUsers[(index + 1) % userCount];
  const prevUser = baseUsers[(index - 1 + userCount) % userCount];

  return {
    ...user,
    following: [nextUser.id],
    followers: [prevUser.id]
  };
});

const commentTemplates = [
  "Love this shot!",
  "Amazing colors.",
  "Where was this taken?",
  "Great vibe.",
  "So clean."
];

const buildComments = (postIndex: number): Comment[] => {
  const count = postIndex % 3;

  return Array.from({ length: count }, (_, commentIndex) => {
    const commenter = usersWithRelations[(postIndex + commentIndex + 1) % userCount];

    return {
      id: `c${postIndex + 1}-${commentIndex + 1}`,
      userId: commenter.id,
      text: commentTemplates[(postIndex + commentIndex) % commentTemplates.length],
      timestamp: new Date(now - (postIndex * 5 + commentIndex) * 60000).toISOString()
    };
  });
};

const postsData: Post[] = Array.from({ length: postCount }, (_, index) => {
  const user = usersWithRelations[index % userCount];
  const likes = [usersWithRelations[(index + 2) % userCount].id];

  if (index % 4 === 0) {
    likes.push(usersWithRelations[(index + 3) % userCount].id);
  }

  return {
    id: `p${index + 1}`,
    userId: user.id,
    image: `https://picsum.photos/seed/post${index + 1}/800/800`,
    caption: `Caption ${index + 1}`,
    likes,
    comments: buildComments(index),
    timestamp: new Date(now - index * 60000).toISOString()
  };
});

export const posts: Post[] = postsData;

export const users: User[] = usersWithRelations.map((user) => ({
  ...user,
  posts: postsData.filter((post) => post.userId === user.id).map((post) => post.id)
}));
