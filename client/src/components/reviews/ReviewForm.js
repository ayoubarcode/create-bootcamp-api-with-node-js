import React, { useState, useContext, useEffect } from 'react';
import ReviewContext from './../../context/reviews/reviewContext';
import AlertContext from './../../context/alert/alertContext';
import AuthContext from './../../context/auth/authContext';
import BootcmapContext from './../../context/bootcamp/bootcampContext';

import My404Component from './../pages/My404Component';
import Preload from './../pages/Preload';
const ReviewForm = (props) => {
  const reviewContext = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const bootcampContext = useContext(BootcmapContext);

  const { loadUser } = authContext;
  const { addReview, error } = reviewContext;
  const { setAlert } = alertContext;
  const { current, getSingleBootcamp, loading } = bootcampContext;

  const bootcampId = props.match.params.id;

  useEffect(() => {
    getSingleBootcamp(bootcampId);
    loadUser();
    if (error) {
      setAlert(error, 'error', 'danger', 6000);
    }
  }, [loading, error]);
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: '0',
  });
  const { title, text, rating } = review;

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '' || text === '' || rating === '') {
      setAlert('you Must fill all fields', 'error', 'danger', 5000);
    } else {
      addReview(review, bootcampId);
    }

    if (error !== null) {
      setAlert(
        'Erroor to added',
        'error',
        'danger',
        'exclamation-triangle',
        5000
      );
    } else {
      setAlert(
        'Successfully added',
        'success',
        'success',
        'circle-check',
        2000
      );
    }
  };

  if (loading) {
    return <Preload />;
  }

  if (!current) {
    // props.history.push('/');
    return <My404Component />;
  }

  return (
    <div className="mt-5 py-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <a
                href="bootcamp.html"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i>{' '}
                Bootcamp Info
              </a>
              <h1 className="mb-2">{current && current.name}</h1>
              <h3 className="text-primary mb-4">Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>
              <form className="range-field" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="rating">
                    Rating: <span className="text-primary">{rating}</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range border-0"
                    id="customRange1"
                    name="rating"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Review title"
                    value={title}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="text"
                    rows="10"
                    className="form-control"
                    placeholder="Your review"
                    value={text}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit Review"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
