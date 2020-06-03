const express = require('express');
const Bootcamp = require('./../models/Bootcamp');
const advancedResult = require('./../middleware/advancedREsult');
const { protect, authorize } = require('./../middleware/auth');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampUplodPhoto,
} = require('./../controllers/bootcamps');

// Include other ressource routers

const courseRouter = require('./courses');
const router = express.Router();

// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampUplodPhoto);
router
  .route('/')
  .get(advancedResult(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
