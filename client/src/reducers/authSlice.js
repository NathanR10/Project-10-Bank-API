import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../services/api';

const initialState = {
  isLogged: false,
  firstName: '',
  lastName: '',
}

const getToken = createAsyncThunk(
  'auth/getToken',
  async ({ username, password, remember }) => {
    try {
      const response = await API.getToken({
        email: username,
        password: password
      })

      remember
        ? localStorage.setItem('token', JSON.stringify(response.data.body.token))
        : sessionStorage.setItem('token', JSON.stringify(response.data.body.token))

      return { succes: true }
    } catch (err) {
      console.log('Connection failed: ' + err)
      return { succes: false }
    }
  }
);

const getUserData = createAsyncThunk(
  'auth/getUserData',
  async () => {
    var token = JSON.parse(sessionStorage.getItem('token'))
    token === null && (token = JSON.parse(localStorage.getItem('token')))

    try {
      const response = await API.getUserData(token)
      if (response.data.status === 200) {
        return {
          succes: response.data.status === 200,
          data: response.data
        }
      } else {
        return { succes: false }
      }
    } catch (err) {
      return { succes: false }
    }
  }
);

const editUserName = createAsyncThunk(
  'auth/editUserName',
  async ({ firstName, lastName }) => {
    var token = JSON.parse(sessionStorage.getItem('token'))
    token === null && (token = JSON.parse(localStorage.getItem('token')))

    try {
      const response = await API.editUserName({
        firstName: firstName,
        lastName: lastName
      }, token)
      return { succes: true, data: response.data };
    } catch (err) {
      console.log('Connection failed: ' + err);
      return { succes: false };
    }
  }
);

const logout = createAsyncThunk('auth/logout', async () => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
  return true
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      if (action.payload.succes) {
        state.isLogged = true;
      }
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (action.payload.succes === false) {
        state.isLogged = false;
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
      } else {
        state.isLogged = true;
        state.firstName = action.payload.data.body.firstName;
        state.lastName = action.payload.data.body.lastName;
      }
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLogged = false;
    });

    builder.addCase(editUserName.fulfilled, (state, action) => {
      if (action.payload.succes) {
        state.firstName = action.payload.data.body.firstName;
        state.lastName = action.payload.data.body.lastName;
      }
    });
  },
});

export { getToken, getUserData, logout, editUserName };
export default authSlice.reducer;