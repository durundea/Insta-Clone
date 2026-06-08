import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";
import { users as mockUsers } from "../../utils/mockData";

export interface UsersState {
  ids: string[];
  entities: Record<string, User>;
}

const toUsersState = (users: User[]): UsersState => ({
  ids: users.map((user) => user.id),
  entities: users.reduce<Record<string, User>>((accumulator, user) => {
    accumulator[user.id] = user;
    return accumulator;
  }, {})
});

const initialState: UsersState = toUsersState(mockUsers);

export interface UpdateUserPayload {
  id: string;
  changes: Partial<Omit<User, "id">>;
}

export interface FollowUserPayload {
  userId: string;
  targetUserId: string;
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      const nextState = toUsersState(action.payload);
      state.ids = nextState.ids;
      state.entities = nextState.entities;
    },
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;

      if (!state.entities[user.id]) {
        state.ids.push(user.id);
      }

      state.entities[user.id] = user;
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      const { id, changes } = action.payload;
      const existingUser = state.entities[id];

      if (!existingUser) {
        return;
      }

      state.entities[id] = {
        ...existingUser,
        ...changes,
        id
      };
    },
    followUser: (state, action: PayloadAction<FollowUserPayload>) => {
      const { userId, targetUserId } = action.payload;

      if (userId === targetUserId) {
        return;
      }

      const user = state.entities[userId];
      const targetUser = state.entities[targetUserId];

      if (!user || !targetUser) {
        return;
      }

      if (!user.following.includes(targetUserId)) {
        user.following.push(targetUserId);
      }

      if (!targetUser.followers.includes(userId)) {
        targetUser.followers.push(userId);
      }
    },
    unfollowUser: (state, action: PayloadAction<FollowUserPayload>) => {
      const { userId, targetUserId } = action.payload;
      const user = state.entities[userId];
      const targetUser = state.entities[targetUserId];

      if (!user || !targetUser) {
        return;
      }

      user.following = user.following.filter((id) => id !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id) => id !== userId);
    }
  }
});

export const { setUsers, addUser, updateUser, followUser, unfollowUser } = usersSlice.actions;

export default usersSlice.reducer;