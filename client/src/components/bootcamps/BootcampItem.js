import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MDBLink } from 'mdbreact';
import Preload from '../pages/Preload';
import BootcampContext from '../../context/bootcamp/bootcampContext';

const BootcampItem = ({
  bootcamp: { name, _id, careers, location, averageRating, photo },
  loading,
}) => {
  if (loading) {
    return <Preload />;
  }
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={
              photo !== 'no-photo.jpg'
                ? `http://localhost:5000/uploads/${photo}`
                : 'http://localhost:5000/uploads/no-photo.jpg'
            }
            //
            className="card-img"
            height="100%"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <MDBLink to={`/bootcamp/${_id}`}>
                {name}
                <span className="float-right badge badge-success">
                  {averageRating && Math.ceil(averageRating)}
                </span>
              </MDBLink>
            </h5>
            <span className="badge badge-dark mb-2">
              {location.city}, {location.state}
            </span>
            <p className="card-text">{careers.map((c) => `${c}, `)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BootcampItem.propTypes = {
  bootcamp: PropTypes.object.isRequired,
  //   name: PropTypes.string.isRequired,
  //   _id: PropTypes.string.isRequired,
};

export default BootcampItem;
