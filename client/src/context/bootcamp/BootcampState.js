import React, { useReducer } from 'react';
import axios from 'axios';
import {
  GET_ALL_BOOTCAMPS,
  SIGNLE_BOOTCAMP,
  BOOTCAMPS_FAIL,
  ADD_BOOTCAMP,
  UPLOAD_PHOTO,
  UPDATE_BOOTCAMP,
  CLEAR_CURRENT,
} from './../types';

import BootcampContext from './bootcampContext';
import bootcampreducer from './bootcampReducer';

const BootcampState = (props) => {
  const initialState = {
    bootcamps: null,
    current: null,
    filtered: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(bootcampreducer, initialState);

  // get All bootcamps
  const getAllBootcamps = async () => {
    try {
      const res = await axios.get(`/api/v1/bootcamps`);
      dispatch({
        type: GET_ALL_BOOTCAMPS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOTCAMPS_FAIL,
        payload: 'Error to load Bootcmaps',
      });
    }
  };

  // get single bootcamp
  const getSingleBootcamp = async (id) => {
    try {
      const res = await axios.get(`/api/v1/bootcamps/${id}`);
      dispatch({
        type: SIGNLE_BOOTCAMP,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: CLEAR_CURRENT,
        payload: error.response.data.success,
      });
    }
  };

  // get Single Bootcamp by User
  const getManageBootcamp = async () => {
    try {
      const res = await axios.get(`/api/v1/bootcamps/user`);
      dispatch({
        type: SIGNLE_BOOTCAMP,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: CLEAR_CURRENT,
        payload: error.response.data.msg,
      });
    }
  };

  // add a bootcamp
  const addCootcamp = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/api/v1/bootcamps`, formData, config);
      dispatch({
        type: ADD_BOOTCAMP,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: BOOTCAMPS_FAIL,
        payload: 'error',
      });
    }
  };
  // update a bootcamp
  const updateBootcamp = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/v1/bootcamps/${id}`, formData, config);
      dispatch({
        type: UPDATE_BOOTCAMP,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOTCAMPS_FAIL,
        payload: 'error',
      });
    }
  };

  // upload photo
  const uploadPhoto = async (id, formData) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await axios.put(
        `/api/v1/bootcamps/${id}/photo`,
        formData,
        config
      );
      dispatch({
        type: UPLOAD_PHOTO,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOTCAMPS_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  return (
    <BootcampContext.Provider
      value={{
        bootcamps: state.bootcamps,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        getAllBootcamps,
        getSingleBootcamp,
        addCootcamp,
        updateBootcamp,
        getManageBootcamp,
        uploadPhoto,
      }}
    >
      {props.children}
    </BootcampContext.Provider>
  );
};

export default BootcampState;
