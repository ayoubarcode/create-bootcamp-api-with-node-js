import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
  UPDATE_DETAIL,
  LOGOUT
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data,
        role: action.payload.data.role,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error:null
      };

    case UPDATE_DETAIL:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        loading: false,
        user: null,
        error: action.payload,
        role:null
      };
    default:
      return state;
  }
};
