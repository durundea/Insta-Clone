import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { users } from "../../utils/mockData";

export interface CurrentUserState {
  id: string | null;
}

const initialState: CurrentUserState = {
  id: users[0]?.id ?? null
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    }
  }
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;