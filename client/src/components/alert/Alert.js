import React, { useContext } from 'react';
import AlertContext from './../../context/alert/alertContext';
import { MDBNotification, MDBContainer } from 'mdbreact';
const Alert = () => {
  const alertContext = useContext(AlertContext);

  //   const setupNotification = (alert) => {
  //       switch(alert.type)
  //       {

  //       }
  //     toast.warn('must fill all fields', { closeButton: true });
  //   };
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <MDBNotification
        show
        fade
        icon="exclamation-triangle"
        iconClassName="text-danger"
        title={alert.type}
        message={alert.msg}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
        }}
      />
    ))
  );
};

export default Alert;
