import React, { useEffect, useContext } from 'react';

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import BootcampLocation from './BootcampLocation';
import BootcampItem from './BootcampItem';
import BootcampContext from './../../context/bootcamp/bootcampContext';
import AuthContext from './../../context/auth/authContext';

import Preload from './../pages/Preload';
const Bootcamps = (props) => {
  const bootcampContext = useContext(BootcampContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;
  const { bootcamps, loading, getAllBootcamps } = bootcampContext;
  useEffect(() => {
    loadUser();
    getAllBootcamps();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preload />;
  }
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="4" className="mt-5">
          <BootcampLocation />
        </MDBCol>
        <MDBCol md="8" className="mt-5">
          {bootcamps &&
            bootcamps.map((bootcamp) => (
              <BootcampItem
                key={bootcamp._id}
                bootcamp={bootcamp}
                loading={loading}
              />
            ))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Bootcamps;
