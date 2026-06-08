import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  isCreatePostModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  isCreatePostModalOpen: false,
  isLoading: false,
  error: null
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
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { toggleCreatePostModal, setCreatePostModalOpen, setLoading, setError } = uiSlice.actions;

export default uiSlice.reducer;