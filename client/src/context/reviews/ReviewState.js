import React, { useReducer } from 'react';
import axios from 'axios';
import ReviewContext from './reviewContext';
import reviewReducer from './reviewReducer';

import { ADD_REVIEW, REVIEW_FAILED, GET_CURRENT } from './../types';

const ReviewState = (props) => {
  const initialState = {
    reviews: null,
    current: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);

  // add A review
  const addReview = async (review, bootcampId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `/api/v1/bootcamps/${bootcampId}/reviews`,
        review,
        config
      );
      dispatch({
        type: ADD_REVIEW,
        payload: res.data.data,
      });
    } catch (error) {
      console.log(`this is error from review ${error.response.data.error}`);
      dispatch({
        type: REVIEW_FAILED,
        payload: error.response.data.error,
      });
    }
  };

  // Get Review By bootcamp
  const getReviewByBootcamp = async (id) => {
    try {
      const res = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
      dispatch({
        type: GET_CURRENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REVIEW_FAILED,
        payload: error.response,
      });
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
        error: state.error,
        loading: state.loading,
        addReview,
        getReviewByBootcamp,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
