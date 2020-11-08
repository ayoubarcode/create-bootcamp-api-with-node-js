import React, { useEffect, useContext } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { useParams } from 'react-router-dom'; 
import BootcampLocation from './BootcampLocation';
import BootcampItem from './BootcampItem';
import BootcampContext from './../../context/bootcamp/bootcampContext';
import AuthContext from './../../context/auth/authContext';

import Preload from './../pages/Preload';
const Bootcamps = () => {
  const bootcampContext = useContext(BootcampContext);
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  const { bootcamps, loading, getAllBootcamps, error } = bootcampContext;

  const { zipcode, miles } = useParams();
  useEffect(() => {
    loadUser();
    zipcode !== undefined  && miles !== undefined
      ? getAllBootcamps(zipcode, miles)
      : getAllBootcamps();
    //eslint-disable-next-line
  }, [loading]);

  if(error) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height:'90vh'}}>
              <h1 className="mt-5">{String(error)} <MDBIcon icon="frown" /></h1> 
        </div>)
  }
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
          {bootcamps ? 
            bootcamps.map((bootcamp) => (
              <BootcampItem
                key={bootcamp._id}
                bootcamp={bootcamp}
                loading={loading}
              />
            )): (<h1> results not Found</h1>) }
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Bootcamps;
