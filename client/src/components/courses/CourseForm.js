import React,{ useState, useContext, useEffect, useRef} from 'react'
import AlertContext from './../../context/alert/alertContext'
import CourseContext from './../../context/courses/courseContext'
import { useLocation, Link }  from 'react-router-dom';
import Preload from '../pages/Preload';
const CourseForm = (props) => {

    const search  = useLocation().search;
    const course_id = new URLSearchParams(search).get('course_id')
    

    const [course,setCourse] = useState({
        title: '',
        description: '',
        weeks: '',
        tuition: '',
        minimumSkill: '',
        bootcamp:'',
        scholarhipsAvailable:false

    })

    const alertContext = useContext(AlertContext)
    const courseContext = useContext(CourseContext)
    const { setAlert }  = alertContext
    const { addCourse, error ,getSingleCourse, current, loading}  = courseContext

    const bootcampId = props.match.params.bootcampId;

    useEffect(() => {
        if(course_id) {
            getSingleCourse(course_id)
        }  
        
        if(current) {
            const obj = { ...current}
            delete obj.user
            delete obj.createdAt
            delete obj.__v
            setCourse(obj)
        }
        
    }, [loading,course_id])



    // if(loading) {
    //     return <Preload />
    // }



    const  isAllfill = () => {
        if(title === '' || description  === '' || weeks === '' ||
            tuition === '' || minimumSkill  === '' || scholarhipsAvailable === ''
        ) { 
            return false 
        }
        return true

    }

    const { title, description, weeks, tuition, minimumSkill, scholarhipsAvailable, bootcamp} = course;
    
    const handleChange  =  (e) => {
        setCourse({...course, [e.target.name]: e.target.value})
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!isAllfill) {
            console.log('NO')
        } else {
             addCourse(bootcampId,course)
             .then((res) => {
                 if(res) {
                if(res.response.data.error) {
                    setAlert(
                        res.response.data.error,
                        'error',
                        'error',
                        'check-circle',
                        5000
                      );
                 } 
                } else {
                    setAlert(
                        'added successufully',
                        'success',
                        'success',
                        'check-circle',
                        5000
                      );
                }
             })  
        }


    }

    


  
    return (
        <div>
            <section className="container mt-5 py-5" style={{width:'50wv'}}>
			<div className="row">
				<div className="col-md-8 m-auto">
					<div className="card bg-white py-2 px-4">
						<div className="card-body">
							<Link to={`/courses/${bootcampId}/manage`} className="btn btn-link text-secondary my-3">
                            <i className="fas fa-chevron-left" aria-hidden="true"></i> Manage Courses
                            </Link>
							<h1 className="mb-2">
                                {bootcamp ? bootcamp.name :  null}
                            </h1>
							<h3 className="text-primary mb-4">{!course_id ? "Add Course": "Edit Course" }</h3>
							<form onSubmit={handleSubmit} >
								<div className="form-group">
									<label>Course Title</label>
									<input type="text" 
                                            name="title" 
                                            className="form-control" 
                                            placeholder="Title" 
                                            value={current ?current.title : title}
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
                                        value={current ?current.weeks : weeks}
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
                                            value={current ?current.tuition : tuition}
                                            onChange={handleChange}
                                            />
									<small className="form-text text-muted">USD Currency</small>
								</div>
								<div className="form-group">
									<label>Minimum Skill Required</label>
									<select name="minimumSkill" className="form-control" 
                                            value={current ?current.minimumSkill : minimumSkill} 
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
                                    value={current ? current.description: description}
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
									<input type="submit" 
                                           value={!course_id ? "Add Course": "Edit course"  } 
                                           className={!course_id? `btn btn-dark btn-block`: `btn btn-orange btn-block` } />
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
