import { createSlice } from "@reduxjs/toolkit";
import { apiServices } from "./createApis";
export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, expires_at: null },
  reducers: {
    removeAuth: (state) => {
      state.token = null;
      state.user = null;
      state.expires_at = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiServices.contactApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.expires_at = payload.expires_at || 30;
      }
    );
  },
});

export const { removeAuth } = authSlice.actions;
export default authSlice.reducer;
