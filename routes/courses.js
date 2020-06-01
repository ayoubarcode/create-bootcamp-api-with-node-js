const express = require('express');

const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
} = require('./../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);

router.route('/:id').get(getSingleCourse).put(updateCourse);

module.exports = router;
