import React, { useEffect, useContext, useState } from 'react';
import BootcampContext from './../../../context/bootcamp/bootcampContext';
import AuthContext from './../../../context/auth/authContext';
import AlertContext from './../../../context/alert/alertContext';
import Preload from './../../pages/Preload';
import { ToastContainer, toast, MDBLink, MDBIcon } from 'mdbreact';
const ManageBootcmap = () => {
  const authContext = useContext(AuthContext);
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  const { user } = authContext;
  const {
    current,
    loading,
    getManageBootcamp,
    uploadPhoto,
  } = bootcampContext;

  const { setAlert } = alertContext;

  const [selectedFile, SetSelectedFile] = useState(null);
  useEffect(() => {
    getManageBootcamp();

  }, []);

  const onChangeFile = (e) => {
    let file = e.target.files[0];
    SetSelectedFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedFile === null) {
      toast.error('missing file', { closeButton: true });
    } else {
      const data = new FormData();
      data.append('file', selectedFile);
      
      uploadPhoto(current.id, data);
      SetSelectedFile(data.name);

      setAlert(
        'successfully uploaded',
        'success',
        'success',
        'check-circle',
        5000
      );

    }
  };

  
  if (user) {
    if (user.role === 'user') {
      return (
        <h1 className="py-5 mt-5 text-center">
          {' '}
          YOU CANNOT ADD A BOOTCAMP <MDBIcon far icon="frown" />{' '}
          <p>
            <MDBLink type="button" rounded color="success" to="/">
              BACK
            </MDBLink>
          </p>
        </h1>
      );
    }
  }
  if (loading) {
    return <Preload />;
  }

  if (!current) {
    return (
      <h1 className="py-5 mt-5 text-center">
        {' '}
        YOU DON'T HAVE A BOOTCAMP <MDBIcon far icon="frown" />{' '}
        <p>
          <MDBLink type="button" rounded color="success" to="/bootcamps/add">
            ADD A BOOTCAMP
          </MDBLink>
        </p>
      </h1>
    );
  }

  return (
    <section className="container mt-5 py-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4 text-center">Manage Bootcamp</h1>
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={`/uploads/${current.photo}`}
                      className="card-img h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <MDBLink to={`/bootcamp/${current.id}`}>
                          {current && current.name}
                          <span className="float-right badge badge-success">
                            8.8
                          </span>
                        </MDBLink>
                      </h5>
                      <span className="badge badge-dark mb-2">
                        {current.location.city ? current.location.city : null},{' '}
                        {current.location.state ? current.location.state : null}
                      </span>
                      <p className="card-text">
                        {current && current.careers.map((c) => `${c},`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="mb-4" onSubmit={onSubmit}>
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="photo"
                      className="custom-file-input"
                      id="photo"
                      onChange={onChangeFile}
                    />
                    <label className="custom-file-label" htmlFor="photo">
                      Add Bootcamp Image
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-light btn-block"
                  value="Upload Image"
                />
              </form>
              <MDBLink
                to="/bootcamps/add"
                className="btn btn-primary btn-block mb-2"
              >
                Edit Bootcamp Details
              </MDBLink>
              <MDBLink
                to={current && `/courses/${current.id}/manage`}
                className="btn btn-secondary btn-block mb-2"
              >
                Manage Courses
              </MDBLink>
              <a href="#" className="btn btn-danger btn-block">
                Remove Bootcamp
              </a>
              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
        icon="envelope"
      />
    </section>
  );
};

export default ManageBootcmap;
