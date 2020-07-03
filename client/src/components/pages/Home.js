import React, { useState, useContext, useEffect } from 'react';
import viewImage from './../../static/images/2389282-min.jpg';
import PropTypes from 'prop-types';
import AuthContext from './../../context/auth/authContext';

import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  toast,
  ToastContainer,
} from 'mdbreact';

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const [radius, setRadius] = useState({
    zipcode: '',
    miles: '',
  });

  const { zipcode, miles } = radius;

  // capture the values of the inputs
  const onChange = (e) => {
    setRadius({ ...radius, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(radius);

    if (zipcode === '' || miles === '') {
      toast.warn('must fill all fields', { closeButton: true });
    } else {
      props.history.push(`/bootcamps/${zipcode}/${miles}`);
    }
  };

  return (
    <MDBView src={viewImage} className="warning-color-dark">
      <MDBMask className="rgba-black-light d-flex justify-content-center align-items-center">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="mb-4 white-text text-center">
              <h1 className="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 ">
                Find a Code Bootcamp
              </h1>
              <hr className="hr-light my-4" />
              <h6 className="text-uppercase mb-4 white-text ">
                <strong>Find, rate and read reviews on coding bootcamps</strong>
              </h6>
            </MDBCol>
          </MDBRow>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md="6">
                <div className="form-group">
                  <input
                    onChange={onChange}
                    type="text"
                    name="miles"
                    className="form-control"
                    placeholder="Miles from"
                    value={miles}
                  />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="form-group">
                  <input
                    onChange={onChange}
                    type="text"
                    name="zipcode"
                    className="form-control"
                    placeholder="Enter zipcode"
                    value={zipcode}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBBtn
              type="submit"
              gradient="peach"
              className="btn Ripple-parent peach-gradient  btn-block"
            >
              <strong> Find bootcamps</strong>
            </MDBBtn>
          </form>
        </MDBContainer>
      </MDBMask>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
        icon="envelope"
      />
    </MDBView>
  );
};

Home.propTypes = {};
export default Home;
