import React, { useEffect, useContext} from 'react';
import CourseContext  from './../../context/courses/courseContext'
import BootcampContext from './../../context/bootcamp/bootcampContext'
import Preload from './../pages/Home'
import{ Link } from 'react-router-dom'
const ManageCourse = (props) => {


  const courseContext = useContext(CourseContext)
  const bootcampContext = useContext(BootcampContext)

  const { current ,getManageBootcamp }  = bootcampContext
  const { getCourses, courses,loading }  = courseContext
  
  const id = props.match.params.bootcampId;


  useEffect(() => {
      getManageBootcamp()
      getCourses(id)
   
    
   
    console.log('this is id', id)

  },[id])


  if(loading) {
    return <Preload />;
  }

  return (
    <section className="container mt-5 py-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
              to="/bootcamps/manage"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i> Manage
                Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={current&& `/uploads/${current.photo}`} className="card-img" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href="bootcamp.html">
                          {current && current.name}
                          <span className="float-right badge badge-success">
                            4.9
                          </span>
                        </a>
                      </h5>
                      <span className="badge badge-dark mb-2">
                      {current && current.location.city ? current.location.city : null},{' '}
                        {current && current.location.state ? current.location.state : null}
                      </span>
                      <p className="card-text">
                      {current && current.careers.map((c) => `${c},`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link to ={`/add/${id}/course`}  className="btn btn-primary btn-block mb-4">
                Add Bootcamp Course
              </Link>
              {courses && courses.count > 0 ? ( 
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                {courses.data.map((course)  => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>
                      <a href="add-course.html" className="btn btn-secondary">
                        <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                      </a>
                      <button className="btn btn-danger">
                        <i className="fas fa-times" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                  ))
                }
                  
                </tbody>
                <caption>
                <p> Total {courses.count > 1 ? `courses` : `course`}: {courses.count}</p>
                </caption>
              </table>) : 
                (
                  <p  className="mb-4">
                  No courses ! 
              </p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCourse;
