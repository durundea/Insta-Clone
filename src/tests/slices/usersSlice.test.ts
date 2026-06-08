import { describe, expect, it } from "vitest";
import type { UsersState } from "../../store/slices/usersSlice";
import {
  addUser,
  followUser,
  setUsers,
  unfollowUser,
  updateUser
} from "../../store/slices/usersSlice";
import usersReducer from "../../store/slices/usersSlice";
import type { User } from "../../types";

const user1: User = {
  id: "u1",
  username: "user1",
  fullName: "User One",
  avatar: "https://example.com/u1.jpg",
  bio: "Bio one",
  followers: [],
  following: [],
  posts: []
};

const user2: User = {
  id: "u2",
  username: "user2",
  fullName: "User Two",
  avatar: "https://example.com/u2.jpg",
  bio: "Bio two",
  followers: [],
  following: [],
  posts: []
};

const makeState = (): UsersState => ({
  ids: [user1.id, user2.id],
  entities: {
    [user1.id]: { ...user1 },
    [user2.id]: { ...user2 }
  }
});

describe("usersSlice", () => {
  it("replaces all users with setUsers", () => {
    const nextState = usersReducer(makeState(), setUsers([user1]));

    expect(nextState.ids).toEqual(["u1"]);
    expect(nextState.entities.u1.username).toBe("user1");
    expect(nextState.entities.u2).toBeUndefined();
  });

  it("adds a new user with addUser", () => {
    const newUser: User = {
      id: "u3",
      username: "user3",
      fullName: "User Three",
      avatar: "https://example.com/u3.jpg",
      bio: "Bio three",
      followers: [],
      following: [],
      posts: []
    };

    const nextState = usersReducer(makeState(), addUser(newUser));

    expect(nextState.ids).toContain("u3");
    expect(nextState.entities.u3).toEqual(newUser);
  });

  it("updates an existing user with updateUser", () => {
    const nextState = usersReducer(
      makeState(),
      updateUser({ id: "u1", changes: { bio: "Updated bio", fullName: "Updated User" } })
    );

    expect(nextState.entities.u1.bio).toBe("Updated bio");
    expect(nextState.entities.u1.fullName).toBe("Updated User");
    expect(nextState.entities.u1.id).toBe("u1");
  });

  it("follows and unfollows another user", () => {
    const followedState = usersReducer(
      makeState(),
      followUser({ userId: "u1", targetUserId: "u2" })
    );

    expect(followedState.entities.u1.following).toContain("u2");
    expect(followedState.entities.u2.followers).toContain("u1");

    const unfollowedState = usersReducer(
      followedState,
      unfollowUser({ userId: "u1", targetUserId: "u2" })
    );

    expect(unfollowedState.entities.u1.following).not.toContain("u2");
    expect(unfollowedState.entities.u2.followers).not.toContain("u1");
  });
});