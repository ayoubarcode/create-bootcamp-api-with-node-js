import React, { useContext, useEffect, useRef } from 'react';
import ReviewItem from './ReviewItem';
import ReviewContext from './../../context/reviews/reviewContext';
import BootcampContext from './../../context/bootcamp/bootcampContext';
import { MDBLink } from 'mdbreact';

import My404Component from './../pages/My404Component';
import Preload from './../pages/Preload';

const ReviewBootcamp = (props) => {
  const reviewContext = useContext(ReviewContext);
  const bootcampContext = useContext(BootcampContext);
  const { getReviewByBootcamp, current, error } = reviewContext;
  const {
    getSingleBootcamp,
    current: currentBootcamp,
    loading,
  } = bootcampContext;
  const id = useRef(props.match.params.id);
  useEffect(() => {
    getSingleBootcamp(id.current);
    getReviewByBootcamp(id.current);
  }, []);

  if (loading) {
    return <Preload />;
  }
  if (!currentBootcamp) {
    return <My404Component />;
  }

  if (!current || current.length === 0) {
    return <h1 className="mt-5 py-5 text-center">No reviews found </h1>;
  }

  return (
    <section className="bootcamp mt-5 py-5 ">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <MDBLink
              to={`/bootcamp/${props.match.params.id}`}
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>{' '}
              Bootcamp Info
            </MDBLink>
            <h1 className="mb-4">WHAT </h1>

            {current && current.map((review) => <ReviewItem review={review} />)}
          </div>
          <div className="col-md-4">
            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                8.8
              </span>
              Rating
            </h1>
            <a
              href="add-review.html"
              className="btn btn-primary btn-block my-3"
            >
              <i className="fas fa-pencil-alt" aria-hidden="true"></i> Review
              This Bootcamp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewBootcamp;
