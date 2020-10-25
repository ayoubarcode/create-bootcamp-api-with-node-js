import React from 'react';

const ReviewItem = ({ review }) => {
  const { title, text, rating } = review;
  return (
    <div>
      <div className="card mb-3">
        <h5 className="card-header bg-dark text-white">{title}</h5>
        <div className="card-body">
          <h5 className="card-title">
            Rating: <span className="text-success">{rating}</span>
          </h5>
          <p className="card-text">{text}</p>
          <p className="text-muted">Writtern By Kevin Smith</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
