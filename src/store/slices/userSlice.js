import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
// Setters
export const { setCurrentUser } = userSlice.actions;
//Selectors
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
