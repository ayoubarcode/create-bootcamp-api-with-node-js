import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './../../context/auth/authContext';

const ManageAccount = () => {
  const authContext = useContext(AuthContext);
  const { user, updateDetail } = authContext;

  useEffect(() => {
    if (user !== null) {
      setUser({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const [account, setUser] = useState({
    name: '',
    email: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      console.log('Error submit');
    } else {
      updateDetail({ name, email });
    }
  };

  const { email, name } = account;
  return (
    <section className="container mt-5 py-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    onChange={onChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={onChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <a
                        href="update-password.html"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
