import { describe, expect, it } from "vitest";
import type { PostsState } from "../../store/slices/postsSlice";
import postsReducer, { addComment, toggleLike } from "../../store/slices/postsSlice";
import type { Comment } from "../../types";

const makeState = (): PostsState => ({
  ids: ["p1"],
  entities: {
    p1: {
      id: "p1",
      userId: "u1",
      image: "https://example.com/p1.jpg",
      caption: "A post",
      likes: ["u2"],
      comments: [],
      timestamp: "2026-01-01T00:00:00.000Z"
    }
  }
});

describe("postsSlice", () => {
  it("adds a like when user has not liked the post", () => {
    const nextState = postsReducer(makeState(), toggleLike({ postId: "p1", userId: "u3" }));

    expect(nextState.entities.p1.likes).toEqual(["u2", "u3"]);
  });

  it("removes a like when user already liked the post", () => {
    const nextState = postsReducer(makeState(), toggleLike({ postId: "p1", userId: "u2" }));

    expect(nextState.entities.p1.likes).toEqual([]);
  });

  it("adds a comment to the targeted post", () => {
    const comment: Comment = {
      id: "c1",
      userId: "u2",
      text: "Nice photo",
      timestamp: "2026-01-01T00:01:00.000Z"
    };

    const nextState = postsReducer(makeState(), addComment({ postId: "p1", comment }));

    expect(nextState.entities.p1.comments).toHaveLength(1);
    expect(nextState.entities.p1.comments[0]).toEqual(comment);
  });
});