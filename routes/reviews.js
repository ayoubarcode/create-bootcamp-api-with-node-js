const express = require('express');

// controller functions
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('./../controllers/reviews');

//Model
const Review = require('./../models/Review');

// middlewares
const advancedResult = require('./../middleware/advancedREsult');
const { protect, authorize } = require('./../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResult(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
