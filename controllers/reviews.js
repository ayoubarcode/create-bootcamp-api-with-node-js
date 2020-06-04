const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const Review = require('./../models/Review');

const Bootcamp = require('./../models/Bootcamp');

// todo @desc  Get reviews
//? @route  GET /api/v1/reviews
//? @route  GET /api/v1/bootcamps/:bootcampsId/reviews
//* @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResult);
  }
});

// todo @desc  Get single review
//? @route  GET /api/v1/reviews/:id
//* @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!review) {
    return next(
      new ErrorResponse(`no reviews found with the id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// todo @desc  Add review
//? @route  POST /api/v1/bootcamps/:bootcampId/reviews
//* @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  console.log(req.body);
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `no bootcamp found with id ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: review,
  });
});

// todo @desc  Update review
//? @route  PUT /api/v1/reviews/:id
//* @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`no review found with id ${req.params.id}`, 404)
    );
  }
  // make sure review belongs to user or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// todo @desc  Delete review
//? @route  Delete /api/v1/reviews/:id
//* @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`no review found with id ${req.params.id}`, 404)
    );
  }
  // make sure review belongs to user or user is an admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`not authorized to delete review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
