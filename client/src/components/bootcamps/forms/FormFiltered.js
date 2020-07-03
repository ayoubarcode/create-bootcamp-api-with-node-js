import React from 'react';

const FormFiltered = () => {
  return (
    <div className="card card-body mb-4">
      <form>
        <div className="form-group">
          <label> Career</label>
          <select className="custom-select mb-2">
            <option defaultValue="any">Any</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>{' '}
        <div className="form-group">
          <label> Rating</label>
          <select className="custom-select mb-2">
            <option defaultValue="any">Any</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
        </div>
        <div className="form-group">
          <label> Budget</label>
          <select className="custom-select mb-2">
            <option defaultValue="any">Any</option>
            <option value="20000">$20,000</option>
            <option value="15000">$15,000</option>
            <option value="10000">$10,000</option>
            <option value="8000">$8,000</option>
            <option value="6000">$6,000</option>
            <option value="4000">$4,000</option>
            <option value="2000">$2,000</option>
          </select>
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

export default FormFiltered;
