import type { RootState } from "./store";

export const selectUsersState = (state: RootState) => state.users;
export const selectUserIds = (state: RootState) => state.users.ids;
export const selectUsers = (state: RootState) => state.users.ids.map((id) => state.users.entities[id]);
export const selectUserById = (state: RootState, userId: string) => state.users.entities[userId];

export const selectPostsState = (state: RootState) => state.posts;
export const selectPostIds = (state: RootState) => state.posts.ids;
export const selectPosts = (state: RootState) => state.posts.ids.map((id) => state.posts.entities[id]);
export const selectPostById = (state: RootState, postId: string) => state.posts.entities[postId];

export const selectCurrentUserId = (state: RootState) => state.currentUser.id;
export const selectCurrentUser = (state: RootState) => {
  const currentUserId = state.currentUser.id;

  if (!currentUserId) {
    return undefined;
  }

  return state.users.entities[currentUserId];
};

export const selectIsCreatePostModalOpen = (state: RootState) => state.ui.isCreatePostModalOpen;