import React,{ useState, useContext, useEffect} from 'react'
import AlertContext from './../../context/alert/alertContext'
import CourseContext from './../../context/courses/courseContext'
const CourseForm = (props) => {

    const [course,setCourse] = useState({
        title: '',
        description: '',
        weeks: '',
        tuition: '',
        minimumSkill: '',
        scholarhipsAvailable:'false'

    })

    const alertContext = useContext(AlertContext)
    const courseContext = useContext(CourseContext)
    const { setAlert }  = alertContext
    const { addCourse }  = courseContext

    const bootcampId = props.match.params.bootcampId;

    useEffect(() => {

    }, [])

    const  isAllfill = () => {
        if(title === '' || description  === '' || weeks === '' ||
            tuition === '' || minimumSkill  === '' || scholarhipsAvailable === ''
        ) { 
            return false 
        }
        return true

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        !isAllfill ?  console.log('NO') : console.log('YES')
        if(!isAllfill) {
            console.log('NO')
        } else {
             addCourse(bootcampId,course)
             .then((res) => {
                 if(res.response.status != 201) {

                        setAlert(res.response.data.error,
                                'error',
                                'error',
                                'check-circle',
                                5000
                        );
                 }
               
             })
             
             
        }


    }



    const { title, description, weeks, tuition, minimumSkill, scholarhipsAvailable} = course;
    
    const handleChange  =  (e) => {
        console.log(e.target.name);
        setCourse({...course, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <section className="container mt-5 py-5" style={{width:'50wv'}}>
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<a href="manage-courses.html" className="btn btn-link text-secondary my-3">
                            <i className="fas fa-chevron-left" aria-hidden="true"></i> Manage Courses</a>
							<h1 className="mb-2">DevWorks Bootcamp</h1>
							<h3 className="text-primary mb-4">Add Course</h3>
							<form onSubmit={handleSubmit} >
								<div className="form-group">
									<label>Course Title</label>
									<input type="text" 
                                            name="title" 
                                            className="form-control" 
                                            placeholder="Title" 
                                            value={title}
                                            onChange={handleChange}
                                    />
								</div>
								<div className="form-group">
									<label>Duration</label>
									<input 
                                        type="number" 
                                        name="weeks" 
                                        placeholder="Duration" 
                                        className="form-control"
                                        value={weeks}
                                        onChange={handleChange}
                                     />
									<small className="form-text text-muted">Enter number of weeks course lasts</small>
								</div>
								<div className="form-group">
									<label>Course Tuition</label>
									<input type="number" 
                                           name="tuition" 
                                           placeholder="Tuition" 
                                           className="form-control"
                                            value={tuition}
                                            onChange={handleChange}
                                            />
									<small className="form-text text-muted">USD Currency</small>
								</div>
								<div className="form-group">
									<label>Minimum Skill Required</label>
									<select name="minimumSkill" className="form-control" 
                                            value={minimumSkill} 
                                            onChange={handleChange}>

										<option value="beginner">Beginner (Any)</option>
										<option value="intermediate">Intermediate</option>
										<option value="advanced">Advanced</option>
									</select>
								</div>

								<div className="form-group">
									<textarea name="description" 
                                    rows="5" className="form-control" 
                                    placeholder="Course description summary" 
                                    maxLength="500"
                                    value={description}
                                    onChange={handleChange} >

                                    </textarea>
									<small className="form-text text-muted">No more than 500 characters</small>
								</div>

								<div className="form-check">
									<input className="form-check-input" 
                                           type="checkbox" 
                                           name="scholarhipsAvailable" 
                                           id="scholarhipsAvailable" 
                                           checked={scholarhipsAvailable} 
                                           onChange={() => setCourse({...course,scholarhipsAvailable: !scholarhipsAvailable })}  
                                           />
									<label className="form-check-label" htmlFor="scholarhipsAvailable">
										Scholarship Available
									</label>
								</div>


								<div className="form-group mt-4">
									<input type="submit" value="Add Course" className="btn btn-dark btn-block" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
        </div>
    )
}

export default CourseForm
