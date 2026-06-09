import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../../App";
import currentUserReducer from "../../store/slices/currentUserSlice";
import postsReducer from "../../store/slices/postsSlice";
import uiReducer from "../../store/slices/uiSlice";
import usersReducer from "../../store/slices/usersSlice";

function renderAppAtRoute(route: string) {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      posts: postsReducer,
      currentUser: currentUserReducer,
      ui: uiReducer
    }
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe("create post flow", () => {
  it("creates a new post from modal and shows it in feed", async () => {
    renderAppAtRoute("/");
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /create post/i }));

    await user.type(screen.getByLabelText(/image url/i), "https://picsum.photos/seed/new/800/800");
    await user.type(screen.getByLabelText(/caption/i), "My new post");
    await user.click(screen.getByRole("button", { name: /publish/i }));

    expect(screen.getByText("My new post")).toBeTruthy();
  });
});
