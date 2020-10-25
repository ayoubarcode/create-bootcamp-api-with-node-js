import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from 'mdbreact';

import AuthContext from './../../context/auth/authContext';
import BootcampContext from './../../context/bootcamp/bootcampContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bootcampContext = useContext(BootcampContext);
  const { isAuthenticated, loadUser, user, logout } = authContext;
  const { current } = bootcampContext;
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);



  const disconnected = () =>  {
    logout()
  }

  const toggleCollapse = () => {
    setisOpen(!isOpen);
  };

  const isConnected = () => {
    return (
      <Fragment>
        <MDBNavItem active>
          <MDBNavLink to="/" className="text-dark">
            Home
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <span className="mr-2">Account</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {user && user.role === 'publisher' ? (
                <MDBDropdownItem to="/bootcamps/add">
                  <Link to="/bootcamps/manage">Manage Bootcamp</Link>
                </MDBDropdownItem>
              ) : null}
              {user && user.role === 'publisher' ? (
                <MDBDropdownItem to="/bootcamps/add">
                  <Link to="/bootcamps/add">
                    {' '}
                    {!current ? 'Add Bootcamp' : 'Edit Bootcamp'}
                  </Link>
                </MDBDropdownItem>
              ) : null}
              <MDBDropdownItem>
                <Link to="/">Manage Reviews</Link>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <Link to="/manage-account">Manage Account</Link>
              </MDBDropdownItem>
              <hr />
              <MDBDropdownItem href="#!" onClick={disconnected}>
                <MDBIcon icon="sign-out-alt mr-2" />
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink to="/" className="text-dark">
            <MDBIcon far icon="grin ml-2" />
            Hello {user && user.name}
          </MDBNavLink>
        </MDBNavItem>
      </Fragment>
    );
  };

  const isNotConnected = () => {
    return (
      <Fragment>
        <MDBNavItem active>
          <MDBNavLink to="/login" className="text-dark">
            <MDBIcon icon="sign-in-alt mr-2" />
            Login
          </MDBNavLink>
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink to="/register" className="text-dark">
            <MDBIcon icon="user-plus mr-2" />
            register
          </MDBNavLink>
        </MDBNavItem>
      </Fragment>
    );
  };
  return (
    <MDBNavbar color="peach-gradient" expand="md" scrolling fixed="top">
      <MDBNavbarBrand>
        <strong className="text-dark">
          <MDBIcon fab icon="accusoft" className="mr-2" />
          Bootcamp
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          {!isAuthenticated ? isNotConnected() : isConnected()}

          <MDBNavItem>
            <MDBNavLink to="/" className="text-dark">
              {/* <MDBIcon far icon="th-list" /> */}| Browse bootcamps
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Navbar;
