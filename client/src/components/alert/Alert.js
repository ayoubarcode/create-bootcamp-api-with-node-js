import React, { useContext } from 'react';
import AlertContext from './../../context/alert/alertContext';
import { MDBNotification } from 'mdbreact';
const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <MDBNotification
        key={alert.id}
        show
        fade
        icon={alert.icon}
        iconClassName={`text-${alert.textcolor}`}
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
