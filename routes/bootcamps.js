const express = require('express');
const Bootcamp = require('./../models/Bootcamp');
const advancedResult = require('../middleware/advancedResult');
const { protect, authorize } = require('./../middleware/auth');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampUplodPhoto,
  getBootcampByUser,
} = require('./../controllers/bootcamps');

// Include other ressource routers

const courseRouter = require('./courses');
const reviewsRouter = require('./reviews');
const router = express.Router();

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewsRouter);

router
  .route('/')
  .get(advancedResult(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampUplodPhoto);

router
  .route('/user')
  .get(
    protect,
    authorize('publisher', 'admin'),
    advancedResult(Bootcamp, 'courses'),
    getBootcampByUser
  );

router
  .route('/:id')
  .get(protect, getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
