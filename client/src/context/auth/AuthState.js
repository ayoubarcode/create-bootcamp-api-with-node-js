import React, { useReducer } from 'react';
import axios from 'axios';
import setTokenAuth from './../../utils/setTokenAuth';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  UPDATE_DETAIL,
  LOGOUT
} from './../types';

import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    role: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setTokenAuth(localStorage.token);
    }
    try {
      const res = await axios.get(`/api/v1/auth/me`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/v1/auth/login`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error,
      });

      // return error
    }
  };

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/v1/auth/register`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  // update user detail
  const updateDetail = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/v1/auth/updatedetails`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data,
      });
    }
  };


  // Logout
  const logout = async () =>  {
        const res = await axios.get(`/api/v1/auth/logout`)
        dispatch({
          type: REGISTER_FAIL,
          payload: res.data,
        });    
      
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        role: state.role,
        register,
        loadUser,
        login,
        updateDetail,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
