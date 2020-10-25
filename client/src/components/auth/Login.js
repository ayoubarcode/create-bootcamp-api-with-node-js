import React, { useContext, useEffect, useState } from 'react';
import AlertContext from './../../context/alert/alertContext';
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
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { loading, login, isAuthenticated, error } = authContext;
  const { setAlert } = alertContext;
  // const errorMemo = useMemo(() => {
  //   return errorLogin()
  // })

  useEffect( () => {
    document.title = 'Login';
    //eslint-disable-next-line
  }, [isAuthenticated, error, loading, props.history]);

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
      setAlert(
        'Pleae fill all fields',
        'error',
        'danger',
        'exclamation-triangle',
        5000
      );
    } 
    if(error ) {
      console.log("yes to error")
      setAlert(
        error,
        'error',
        'danger',
        'exclamation-triangle',
        5000
      );

    }
    
    login({
      email,
      password,
    }).then((res) => {
      if(res) {
          if(res.response.status === 401 ) {
            setAlert(res.response.data.error,'error','danger','exclamation-triangle',5000)
          }
    }
    })
     

   
  }


  if(isAuthenticated) {
    return <Redirect to="/" />
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
                      <MDBIcon icon="sign-in-alt" className="ml-2" />
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
