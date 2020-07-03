import React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ManageAccount from './components/auth/ManageAccount';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Bootcamps from './components/bootcamps/Bootcamps';
import AddBootcamp from './components/bootcamps/bootcamp/AddBootcmap';
import Bootcamp from './components/bootcamps/bootcamp/Bootcamp';
import ManageBootcmap from './components/bootcamps/bootcamp/ManageBootcmap';
import PrivateRoute from './components/routing/PrivateRoute';
import My404Component from './components/pages/My404Component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setTokenAuth from './utils/setTokenAuth';
import AuthState from './context/auth/AuthState';
import BootcampState from './context/bootcamp/BootcampState';
import './App.css';

if (localStorage.token) {
  setTokenAuth(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BootcampState>
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
            <PrivateRoute exact path="/bootcamps/add" component={AddBootcamp} />
            <PrivateRoute
              exact
              path="/bootcamps/manage"
              component={ManageBootcmap}
            />
            <Route exact path="/bootcamp/:id" component={Bootcamp} />

            <Route path="*" exact={true} component={My404Component} />
          </Switch>
        </Router>
      </BootcampState>
    </AuthState>
  );
};

export default App;
