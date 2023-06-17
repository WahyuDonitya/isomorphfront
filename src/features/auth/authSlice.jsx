import { createSlice } from "@reduxjs/toolkit";

const initialState = { pengguna: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { pengguna, access_token } = action.payload;
      state.pengguna = pengguna;
      state.token = access_token;
    },
    logout: (state, action) => {
      state.pengguna = null;
      state.token = null;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
