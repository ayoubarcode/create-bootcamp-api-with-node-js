import React, { useEffect } from 'react';
import { MDBLink } from 'mdbreact';
const My404Component = () => {
  useEffect(() => {
    document.title = 'Not Found';
  });
  return (
    <div className="mt-5 py-5">
      <div className="d-flex flex-column text-center ">
        <h2 className="font-weight-bold">Sorry, this page isn't available.</h2>
        <p className="text-muted">
          The link you followed may be broken, or the page may have been
          removed. Go back to <MDBLink to="/"> Devcamper</MDBLink>.
        </p>
      </div>
    </div>
  );
};

export default My404Component;
