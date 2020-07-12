import React, { useState } from 'react';

const ReviewForm = () => {
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
      console.log('NO');
    } else {
      console.log('YES');
    }
  };
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
              <h1 className="mb-2">DevWorks Bootcamp</h1>
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
