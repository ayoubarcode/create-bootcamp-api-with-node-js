// extern
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ManageAccount from './components/auth/ManageAccount';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Bootcamps from './components/bootcamps/Bootcamps';
import AddBootcamp from './components/bootcamps/bootcamp/AddBootcmap';
import Bootcamp from './components/bootcamps/bootcamp/Bootcamp';
import ManageBootcmap from './components/bootcamps/bootcamp/ManageBootcmap';
import ReviewForm from './components/reviews/ReviewForm';
import PrivateRoute from './components/routing/PrivateRoute';
import My404Component from './components/pages/My404Component';
import Alert from './components/alert/Alert';
// utils
import setTokenAuth from './utils/setTokenAuth';
// Context State
import AuthState from './context/auth/AuthState';
import BootcampState from './context/bootcamp/BootcampState';
import ReviewState from './context/reviews/ReviewState';
import AlertState from './context/alert/AlertState';

import { ToastContainer } from 'mdbreact';
import './App.css';

if (localStorage.token) {
  setTokenAuth(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BootcampState>
        <ReviewState>
          <AlertState>
            <Alert />
            <Router>
              <Navbar />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute
                  exact
                  path="/manage-account"
                  component={ManageAccount}
                />
                <PrivateRoute
                  exact
                  path="/bootcamps/:zipcode/:miles"
                  component={Bootcamps}
                />
                <PrivateRoute
                  exact
                  path="/bootcamps/add"
                  component={AddBootcamp}
                />
                <PrivateRoute
                  exact
                  path="/bootcamps/manage"
                  component={ManageBootcmap}
                />

                <PrivateRoute
                  exact
                  path="/add-review/:id"
                  component={ReviewForm}
                />
                <Route exact path="/bootcamp/:id" component={Bootcamp} />
                <Route path="*" exact={true} component={My404Component} />
              </Switch>
            </Router>
            <ToastContainer
              hideProgressBar={true}
              newestOnTop={true}
              autoClose={5000}
              icon="envelope"
            />
          </AlertState>
        </ReviewState>
      </BootcampState>
    </AuthState>
  );
};

export default App;
