import {
    GET_COURSES_BY_BOOTCAMP,
    COURSES_FAIL,
    ADD_COURSE

} from './../types';

export default (state, action) => {
    switch (action.type) {
        case GET_COURSES_BY_BOOTCAMP:
            return {
                ...state,
                courses:action.payload,
                loading:false
            }
        case COURSES_FAIL:
            return {
                ...state,
                error:action.payload,
                loading:true
            }
        
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