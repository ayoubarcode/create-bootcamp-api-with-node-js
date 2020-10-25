import React, { useContext, useEffect, useState, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;


  useEffect(() => {
    
  }, []);

  return (
    <Route
      {...rest}
      render={ props => 
        !isAuthenticated && !loading ? (
          // not logged in so redirect to login page with the return url
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
            // authorised so return component
            : (<Component {...props} />)
        }
      
    />
  );
};
export default PrivateRoute;
