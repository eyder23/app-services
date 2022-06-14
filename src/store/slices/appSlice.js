import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAppState: null,
};

export const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setCurrentAppState: (state, action) => {
      state.currentAppState = action.payload;
    },
  },
});
// Setters
export const { setCurrentAppState } = appSlice.actions;
//Selectors
export const selectCurrentAppState = (state) => state.appState.currentAppState;

export default appSlice.reducer;
