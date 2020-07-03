import React from 'react';

const FormLocation = () => {
  return (
    <div className="card card-body mb-4">
      <h4 className="mb-3">By Location</h4>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="miles"
                placeholder="Miles From"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="zipcode"
                placeholder="Enter Zipcode"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Find Bootcamps"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default FormLocation;
