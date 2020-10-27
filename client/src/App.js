// extern
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//  ********************** Components *************************

import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';

// Authentication  & User
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ManageAccount from './components/auth/ManageAccount';

// Bootcamps
import Bootcamps from './components/bootcamps/Bootcamps';
import AddBootcamp from './components/bootcamps/bootcamp/AddBootcmap';
import Bootcamp from './components/bootcamps/bootcamp/Bootcamp';
import ManageBootcmap from './components/bootcamps/bootcamp/ManageBootcmap';

// Coures
import ManageCourse from './components/courses/ManageCourse';
import CourseForm from './components/courses/CourseForm';
// Reviews
import ReviewForm from './components/reviews/ReviewForm';
import ReviewBootcamp from './components/reviews/ReviewBootcamp';

// Alert
import Alert from './components/alert/Alert';

// private Route
import PrivateRoute from './components/routing/PrivateRoute';

// 404 Component
import My404Component from './components/pages/My404Component';

// utils
import setTokenAuth from './utils/setTokenAuth';

// Context State
import AuthState from './context/auth/AuthState';
import BootcampState from './context/bootcamp/BootcampState';
import ReviewState from './context/reviews/ReviewState';
import AlertState from './context/alert/AlertState';
import CourseState from './context/courses/CourseState'

import './App.css';

if (localStorage.token) {
  setTokenAuth(localStorage.token);
}

// const history = createBrowserHistory();

const App = () => {
  return (
    <AuthState>
      <BootcampState>
      <CourseState>
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

                {/* Manage Bootcamps */}
                <PrivateRoute
                  exact
                  path="/bootcamps/:zipcode/:miles"
                  component={Bootcamps}
                />
                <PrivateRoute
                  path="/bootcamps/add"
                  component={AddBootcamp}
                  exact
                />
                <PrivateRoute
                  exact
                  path="/bootcamps/manage"
                  component={ManageBootcmap}
                />

                <Route exact path="/bootcamp/:id" component={Bootcamp} />

                {/* Manage Reviews */}
                <PrivateRoute
                  path="/add-review/:id"
                  component={ReviewForm}
                  exact
                />
                <PrivateRoute
                  path="/read-reviews/:id"
                  component={ReviewBootcamp}
                  exact
                />
                <PrivateRoute
                  path="/bootcamps/manage"
                  component={ReviewBootcamp}
                  exact
                />
                {/*  Courses */}

                <PrivateRoute exact path='/add/:bootcampId/course' component={CourseForm} />
                <PrivateRoute
                  path="/courses/:bootcampId/manage"
                  component={ManageCourse}
                  exact
                />
                <Route path="*" exact={true} component={My404Component} />
              </Switch>
            </Router>
          </AlertState>
        </ReviewState>
        </CourseState>
      </BootcampState>
    </AuthState>
  );
};

export default App;
