import React, { useContext, useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import AuthContext from './../../../context/auth/authContext';
import AlertContext from './../../../context/alert/alertContext';
import BootcampContext from './../../../context/bootcamp/bootcampContext';
import Preload from './../../pages/Preload';

// utils
import useLocalStorage from './../../../utils/useLocalStorage';


const options = [
  {value:'Web Development', label:"Web Development" },
  {value:'Mobile Development' , label:"Mobile Development"},
  {value:'UI/UX' , label:"UI/UX"},
  {value:'Data Science' , label:"Data Science"},
  {value:'Business' , label:"Business"},
  {value:'Other' , label:"Other"},
]


const AddBootcmap = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const bootcampContext = useContext(BootcampContext);
  const { user } = authContext;
  const { setAlert } = alertContext;
  const {
    addCootcamp,
    updateBootcamp,
    getManageBootcamp,
    current,
    error,
    loading,
  } = bootcampContext;
  // const { loadUser } = authContext;

  useEffect(() => {
    getManageBootcamp();
    if (current !== null) {
      setBootcamp(current);
    }
    
  }, [loading]);

  const [bootcamp, setBootcamp] = useState({
    name: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    careers: '',
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
  });

 

  const {
    name,
    description,
    website,
    phone,
    email,
    address,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
    acceptGi,
  } = bootcamp;

  const onChange = (e) => {
    //{ ...radius, [e.target.name]: e.target.value }
    setBootcamp({ ...bootcamp, [e.target.name]: e.target.value });
  };

  // validate phone
  const justNumber = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) {
      e.preventDefault();
    }
  };

  // valduate URL Website
  const urlValidation = (url) => {
    const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return re.test(url) === false ? false : true;
  };


  const onOptionClicked = (value) => {
    setBootcamp({ ...bootcamp, careers: value });
  };
  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.role === 'publisher') {
      if (current === null) {
        addCootcamp(bootcamp);

        if (error) {
          setAlert(error, 'error', 'danger', 'exclamation-triangle', 5000);
        } else {
          setAlert(
            'Added successfully',
            'success',
            'success',
            'check-circle',
            5000
          );
        }
        // alertContext;
      } else {
        updateBootcamp(current.id, bootcamp);
        if (error) {
          setAlert(error, 'error', 'danger', 'exclamation-triangle', 5000);
        } else {
          setAlert(
            'updated successfully',
            'success',
            'success',
            'check-circle',
            5000
          );
        }
      }
    } else {
      setAlert(
        'you are not publisher ',
        'error',
        'danger',
        'exclamation-triangle',
        5000
      );
    }
  };

  if (loading) {
    return <Preload />;
  }
  return (
    <MDBContainer className="py-5 mt-5">
      <h1 className="mb-2">{current ? 'Edit Bootcamp' : 'Add Bootcamp'}</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>

      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="card bg-white py-2 px-4">
              <MDBCardBody>
                <h3>Location & contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Bootcamp Name"
                    required={true}
                    value={name}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  
                  <input type="text"
                  
                    name="address"
                    id="address"
                    className="form-control"
                    placeholder="Full Address"
                    value={address}
                    
                    onChange={onChange}
                    required={true}
                  />
                  
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onKeyPress={justNumber}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Contact Email"
                    value={email}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="Website URL"
                    value={website}
                    onChange={onChange}
                  />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    maxLength="500"
                    value={description}
                    onChange={onChange}
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-group">
                  <label>Careers</label>
                  <select
                    name="careers"
                    className="custom-select"
                    value={options[0].label}
                    onChange={onChange}
                   
                  >
                    {options.map((option) => (
                      <option
                              value={option.value}
                              key={Math.random()}
                      
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="housing"
                    id="housing"
                    checked={housing}
                    onChange={() =>
                      setBootcamp({
                        ...bootcamp,
                        housing: !housing,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="housing">
                    Housing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobAssistance"
                    id="jobAssistance"
                    checked={jobAssistance}
                    onChange={() =>
                      setBootcamp({
                        ...bootcamp,
                        jobAssistance: !jobAssistance,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="jobAssistance">
                    Job Assistance
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobGuarantee"
                    id="jobGuarantee"
                    checked={jobGuarantee}
                    onChange={() =>
                      setBootcamp({
                        ...bootcamp,
                        jobGuarantee: !jobGuarantee,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="jobGuarantee">
                    Job Guarantee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="acceptGi"
                    id="acceptGi"
                    checked={acceptGi}
                    onChange={() =>
                      setBootcamp({
                        ...bootcamp,
                        acceptGi: !acceptGi,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="acceptGi">
                    Accepts GI Bill
                  </label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="form-group">
          <input
            type="submit"
            value={current ? 'Edit Bootcamp' : 'Add Bootcamp'}
            className={
              !current
                ? 'btn btn-success btn-block my-4'
                : 'btn btn-warning btn-block my-4'
            }
          />
        </div>
      </form>
    </MDBContainer>
  );
};

export default AddBootcmap;
