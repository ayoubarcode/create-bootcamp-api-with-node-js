import React, { useReducer } from 'react';
import { ADD_REVIEW } from './../types';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';

const ReviewState = (props) => {
  const initialState = {
    reviews: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  // add A review

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
