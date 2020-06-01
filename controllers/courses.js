const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const Course = require('./../models/Course');
const Bootcamp = require('./../models/Bootcamp');

// todo @desc  Get Courses
//? @route  GET /api/v1/courses
//? @route  GET /api/v1/bootcamps/:bootcampsId/courses
//* @access Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// todo @desc  Get single  Course
//? @route  GET /api/v1/courses/:id
//* @access Public

exports.getSingleCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// todo @desc  Add a  Course
//? @route  POST /api/v1/bootcamp/:bootcampId/courses
//* @access Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`)
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// todo @desc  Update a  Course
//? @route  PUT /api/v1/courses/:id
//* @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`no course found with id ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});
