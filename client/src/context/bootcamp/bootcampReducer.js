import {
  GET_ALL_BOOTCAMPS,
  SIGNLE_BOOTCAMP,
  BOOTCAMPS_FAIL,
  ADD_BOOTCAMP,
  UPDATE_BOOTCAMP,
  UPLOAD_PHOTO,
  CLEAR_CURRENT,
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data,
        loading: false,
        error: null,
      };

    case SIGNLE_BOOTCAMP:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case ADD_BOOTCAMP:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case UPDATE_BOOTCAMP:
    case UPLOAD_PHOTO:
      return {
        ...state,
        current: {...state.current, photo:action.payload},
        // photo_name: action.payload,
        loading: false,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
        error: null,
      };
    case BOOTCAMPS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
