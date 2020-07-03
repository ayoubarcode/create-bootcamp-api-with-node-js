import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './../../context/auth/authContext';
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
  MDBInput,
  toast,
  ToastContainer,
} from 'mdbreact';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { loading, register, isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'user',
  });

  const { name, email, password, password2, role } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || role === '') {
      toast.error('please fit all fields', { closeButton: true });
    } else if (password !== password2) {
      toast.error('password must matches', { closeButton: true });
    } else {
      register({
        name,
        email,
        password,
        role,
      });
    }
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  if (loading) {
    console.log('loading...');
  }
  return (
    <main style={{ marginTop: '10rem' }}>
      <MDBContainer className="mt-5 py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header peach-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Register:
                  </h3>
                </MDBCardHeader>

                <form onSubmit={onSubmit}>
                  <label
                    htmlFor="defaultFormNameEx"
                    className="grey-text font-weight-light"
                  >
                    Your Name
                  </label>
                  <input
                    onChange={onChange}
                    type="text"
                    id="defaultFormNameEx"
                    className="form-control"
                    name="name"
                    value={name}
                  />

                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  >
                    Your Email
                  </label>
                  <input
                    onChange={onChange}
                    type="email"
                    id="defaultFormEmailEx"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                  />

                  <label
                    htmlFor="password"
                    className="grey-text font-weight-light"
                  >
                    password
                  </label>
                  <input
                    onChange={onChange}
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={password}
                  />
                  <label
                    htmlFor="password2"
                    className="grey-text font-weight-light"
                  >
                    confirm password
                  </label>
                  <input
                    onChange={onChange}
                    type="password"
                    id="password2"
                    className="form-control"
                    name="password2"
                    value={password2}
                  />

                  <MDBRow className="justify-content-center mt-5">
                    <MDBInput
                      onClick={(e) => setUser({ ...user, role: 'user' })}
                      checked={role === 'user' ? true : false}
                      label="user"
                      type="radio"
                      id="radio1"
                      containerClass="mr-5"
                      value={role}
                    />
                    <MDBInput
                      onClick={() => setUser({ ...user, role: 'publisher' })}
                      checked={role === 'publisher' ? true : false}
                      label="publisher"
                      type="radio"
                      id="radio2"
                      containerClass="mr-5"
                      value={role}
                    />
                  </MDBRow>

                  <div className="text-center mt-4">
                    <MDBBtn color="deep-orange" className="mb-3" type="submit">
                      Register
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                  </div>
                </form>

                <MDBModalFooter></MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </MDBContainer>
    </main>
  );
};

export default Register;
