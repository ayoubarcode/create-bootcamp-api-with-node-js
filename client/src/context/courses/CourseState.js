import React , { useReducer } from 'react';
import axios from 'axios'

import {
    GET_COURSES_BY_BOOTCAMP,
    COURSES_FAIL,
    ADD_COURSE,
    GET_SINGLE_COURSE,
    SET_CURRENT_COURSE,
    CLEAR_CURRENT_COURSE,
    DELTE_COURSE
} from './../types';


import CourseContext from './courseContext';
import courseReducer from './courseReducer';


const CourseState = (props) => {
    const initialState  = {
        courses:null,
        loading:true,
        current:null,
        count:null,
        error:null,
    }


    const [state, dispatch] = useReducer(courseReducer, initialState);


    // load courses by bootcamp
    const getCourses = async(bootcampId) => {
        try {
            const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses`);
            dispatch({
                type:GET_COURSES_BY_BOOTCAMP,
                payload:res.data
            });
        } catch (error) {
                dispatch({
                    type:COURSES_FAIL,
                    payload:error.response
                });
        }
    }

    



    // Get Single Course

    const getSingleCourse = async (courseId) => {
        try {
            const res = await axios.get(`/api/v1/courses/${courseId}`)
            dispatch({
                type:GET_SINGLE_COURSE,
                payload:res.data.data
            })
        } catch (error) {
            dispatch({
                type:CLEAR_CURRENT_COURSE,
                payload:error.response
            });
            
        }
    }



    const deleteCourse = async(courseId)=> {
        
        try {
            const res = await axios.delete(`/api/v1/courses/${courseId}`)
            const data = await res.data
            dispatch({
                type:DELTE_COURSE,
                payload:courseId
            })
        } catch (error) {

            dispatch({
                type:COURSES_FAIL,
                paylaod:error.response
            })
            
        }
    }

     // ?  Set Current Contact

     const setCurrentContact = contact => {
        dispatch({
            type: SET_CURRENT_COURSE,
            payload: contact
        })
    }

    // Add Course

    const addCourse = async(bootcampId, formData) => {

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

        try {
            const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/courses`,formData);

            dispatch({
                type:ADD_COURSE,
                payload:res.data.data
            })
            
        } catch (error) {
            dispatch({
                type:COURSES_FAIL,
                payload:error.response.data.error
            });

            return error;
            
        }
    }


    return(
        <CourseContext.Provider
            value={{
                courses:state.courses,
                loading:state.loading,
                current:state.current,
                error:state.error,
                getCourses,
                addCourse,
                getSingleCourse,
                setCurrentContact,
                deleteCourse

            }}
        >
            {props.children}
        </CourseContext.Provider>
    );

}

export default CourseState