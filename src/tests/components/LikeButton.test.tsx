import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { LikeButton } from "../../components/molecules/LikeButton";
import currentUserReducer from "../../store/slices/currentUserSlice";
import postsReducer from "../../store/slices/postsSlice";
import uiReducer from "../../store/slices/uiSlice";
import usersReducer from "../../store/slices/usersSlice";

describe("LikeButton", () => {
  it("dispatches toggleLike and updates post likes in state", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
        posts: postsReducer,
        currentUser: currentUserReducer,
        ui: uiReducer
      }
    });

    const postId = "p1";
    const userId = "u1";
    const initialLikes = store.getState().posts.entities[postId]?.likes ?? [];

    render(
      <Provider store={store}>
        <LikeButton postId={postId} userId={userId} likes={initialLikes} />
      </Provider>
    );

    await userEvent.click(screen.getByRole("button", { name: /like/i }));

    expect(store.getState().posts.entities[postId]?.likes).toContain(userId);
  });
});
