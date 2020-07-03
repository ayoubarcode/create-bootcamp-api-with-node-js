import React, { useContext, useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  toast,
} from 'mdbreact';

import AuthContext from './../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { loading, login, isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Pleae fill all fields', { closeButton: true });
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <main style={{ marginTop: '10rem' }}>
      <MDBContainer className="mt-5 py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header peach-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login:
                  </h3>
                </MDBCardHeader>
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="defaultFormEmailEx"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />

                  <label
                    htmlFor="defaultFormPasswordEx"
                    className="grey-text font-weight-light"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    id="defaultFormPasswordEx"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />

                  <div className="text-center mt-4">
                    <MDBBtn color="deep-orange" className="mb-3" type="submit">
                      Login
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter></MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </main>
  );
};

export default Login;
