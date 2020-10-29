import React from 'react'
import Button from './UI/Button'

const SingleCourse = ({course, bootcampId, onCancel}) => {
    return (
        <tr>
            <td>{course.title}</td>
            <td >
                <Button course={course} bootcampId={bootcampId} />
            </td>

            <td>
            <button className="btn btn-danger" 
                onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onCancel(course._id) } }
            >
                <i className="fas fa-times" aria-hidden="true"></i>
                </button>
            </td>
         </tr>
    )
}

export default SingleCourse
