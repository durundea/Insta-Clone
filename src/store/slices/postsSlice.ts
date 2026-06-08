import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment, Post } from "../../types";
import { posts as mockPosts } from "../../utils/mockData";

export interface PostsState {
  ids: string[];
  entities: Record<string, Post>;
}

const toPostsState = (posts: Post[]): PostsState => ({
  ids: posts.map((post) => post.id),
  entities: posts.reduce<Record<string, Post>>((accumulator, post) => {
    accumulator[post.id] = post;
    return accumulator;
  }, {})
});

const initialState: PostsState = toPostsState(mockPosts);

export interface ToggleLikePayload {
  postId: string;
  userId: string;
}

export interface AddCommentPayload {
  postId: string;
  comment: Comment;
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      const nextState = toPostsState(action.payload);
      state.ids = nextState.ids;
      state.entities = nextState.entities;
    },
    toggleLike: (state, action: PayloadAction<ToggleLikePayload>) => {
      const { postId, userId } = action.payload;
      const post = state.entities[postId];

      if (!post) {
        return;
      }

      const hasLiked = post.likes.includes(userId);

      if (hasLiked) {
        post.likes = post.likes.filter((id) => id !== userId);
        return;
      }

      post.likes.push(userId);
    },
    addComment: (state, action: PayloadAction<AddCommentPayload>) => {
      const { postId, comment } = action.payload;
      const post = state.entities[postId];

      if (!post) {
        return;
      }

      post.comments.push(comment);
    }
  }
});

export const { setPosts, toggleLike, addComment } = postsSlice.actions;

export default postsSlice.reducer;