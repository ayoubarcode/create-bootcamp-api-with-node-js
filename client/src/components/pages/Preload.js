import React from 'react';
import { MDBContainer } from 'mdbreact';

const Preload = () => {
  return (
    <MDBContainer className="py-5 mt-5 text-center">
      <div className="preloader-wrapper big active crazy">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Preload;
