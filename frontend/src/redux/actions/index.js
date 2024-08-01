// src/redux/actions/authActions.js
import axios from 'axios';
import { BASE_URL } from '../../utils/baseEndpoint';

// Action Creator for login success
export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

// Action Creator for login failure
export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

// Action Creator for logout success
export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

// Action Creator for logout failure
export const logoutFailure = (error) => ({
  type: 'LOGOUT_FAILURE',
  payload: error,
})

// Action Creator for register success
export const registerSuccess = (userData) => ({
  type: 'REGISTER_SUCCESS',
  payload: userData
});

//Action Creator for register failure
export const registerFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

// Async action creator for login
export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        username,
        password,
      }, {
        withCredentials: true, // Ensure cookies are included
      });
      console.log(response);
      dispatch(loginSuccess(response?.data));
    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message || 'Login failed'));
    }
  };
};

// Async action creator for login
export const logout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/logout`, 
        {},
        {
        withCredentials: true, // Ensure cookies are included
      });
      console.log(response);
      dispatch(logoutSuccess());
      return response.data;
    } catch (error) {
      dispatch(logoutFailure(error?.response?.data?.message || 'Logout failed'));
    }
  };
};


export const register = (username, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        username,
        email,
        password
      },
    {
      withCredentials: true
    });
    dispatch(registerSuccess(response?.data));
    } catch (error) {
      dispatch(registerFailure(error?.response?.data?.message || 'Register failed'));
    }
  }
}

export const checkAuthStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/checkauthenticated`, {
        withCredentials: true
      });
      dispatch({
        type: 'SET_AUTH',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'SET_AUTH_ERROR',
        payload: error.message
      });
    }
  };
};