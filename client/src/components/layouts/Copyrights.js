import React, { Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

const ButtonPage = () => {
  return (
    <Fragment>
      <MDBBtn color="primary" rounded>
        Primary
      </MDBBtn>
      <MDBBtn rounded>Default</MDBBtn>
      <MDBBtn rounded color="secondary">
        Secondary
      </MDBBtn>
      <MDBBtn rounded color="success">
        Success
      </MDBBtn>
      <MDBBtn rounded color="info">
        Info
      </MDBBtn>
      <MDBBtn rounded color="warning">
        Warning
      </MDBBtn>
      <MDBBtn rounded color="danger">
        Danger
      </MDBBtn>
    </Fragment>
  );
};

export default ButtonPage;
