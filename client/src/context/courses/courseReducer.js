import {
    GET_COURSES_BY_BOOTCAMP,
    COURSES_FAIL,
    ADD_COURSE,
    SET_CURRENT_COURSE,
    GET_SINGLE_COURSE,
    CLEAR_CURRENT_COURSE,
    DELTE_COURSE

} from './../types';

export default (state, action) => {
    switch (action.type) {
        case GET_COURSES_BY_BOOTCAMP:
            return {
                ...state,
                courses:action.payload.data,
                error:null,
                current:null,
                count:action.payload.count,
                loading:false
            }
        
        case SET_CURRENT_COURSE:
            return {
                ...state,
                current: action.payload,
                loading:true
            }
        case GET_SINGLE_COURSE:
            return {
                ...state,
                current:action.payload,
                error:null,
                loading:false,
            }
        case COURSES_FAIL:
            return {
                ...state,
                error:action.payload,
                // loading:true
            }
        
        case DELTE_COURSE:
            console.log('payload', action.payload);
            return {
                ...state, 
                courses:state.courses.filter((course)=> course._id !== action.payload),
                loading:false
            } 
        case CLEAR_CURRENT_COURSE:
            return {
                ...state,
                current: null,
                loading: true,
                error: null,
            };
        
        
        case ADD_COURSE:
            return {
                ...state,
                courses:{...state.course, courses:action.payload }
            }
        default:
            return  {
                ...state
            }

    }
}