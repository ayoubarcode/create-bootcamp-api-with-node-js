import React, { Fragment } from 'react';
import { MBContainer, MDBRow, MDBCol, MDBCard } from 'mdbreact';
import FormFiltered from './forms/FormFiltered';
import FormLocation from './forms/FormLocation';
const BootcampLocation = () => {
  return (
    <Fragment>
      <FormLocation />
      <FormFiltered />
    </Fragment>
  );
};

export default BootcampLocation;
