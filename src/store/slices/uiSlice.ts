import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  isCreatePostModalOpen: boolean;
}

const initialState: UiState = {
  isCreatePostModalOpen: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCreatePostModal: (state) => {
      state.isCreatePostModalOpen = !state.isCreatePostModalOpen;
    },
    setCreatePostModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModalOpen = action.payload;
    }
  }
});

export const { toggleCreatePostModal, setCreatePostModalOpen } = uiSlice.actions;

export default uiSlice.reducer;