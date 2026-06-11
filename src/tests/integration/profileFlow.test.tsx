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
      <MemoryRouter
        initialEntries={[route]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe("profile flow", () => {
  it("loads current user profile on /profile/me", () => {
    renderAppAtRoute("/profile/me");

    expect(screen.queryByText(/user not found/i)).toBeNull();
    expect(screen.getByRole("heading", { name: "Aarav Sharma" })).toBeTruthy();
    expect(screen.getByTestId("profile-post-grid")).toBeTruthy();
  });

  it("switches active profile from sidebar", async () => {
    renderAppAtRoute("/profile/me");
    const user = userEvent.setup();

    await user.selectOptions(screen.getByLabelText(/switch profile/i), "u3");

    expect(screen.getByRole("heading", { name: "Rohan Mehta" })).toBeTruthy();
    expect(screen.getByDisplayValue(/Rohan Mehta \(@user3\)/i)).toBeTruthy();
  });
});
