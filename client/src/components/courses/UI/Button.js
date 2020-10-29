import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'


const Button = ({bootcampId,course}) => {
    return (
            <Link to={`/add/${bootcampId}/course?course_id=${course._id}&title=${course.title}`} 
                  title={course.title}
                  className="btn btn-secondary">
                  
                <i className="fas fa-pencil-alt" aria-hidden="true" />
            </Link>
    )
}

export default Button
