import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    rememberMe: localStorage.getItem('rememberMe'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      // TODO: rememberMe ? localStore : sessionStorage
      const { token, rememberMe } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('rememberMe', rememberMe);
      state.token = token;
      state.rememberMe = rememberMe;
    },
    logoutSuccess: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      state.token = null;
      state.rememberMe = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
