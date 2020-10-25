import { ADD_REVIEW, REVIEW_FAILED, GET_CURRENT } from './../types';
export default (state, action) => {
  switch (action.type) {
    case GET_CURRENT:
      return {
        ...state,
        reviews: [1, 2, 3],
        current: action.payload.data,
        loading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
      };
    case REVIEW_FAILED:
      return {
        ...state,
        error: action.payload,
        reviews: null,
        current: null,
      };

    default:
      return {
        ...state,
      };
  }
};
