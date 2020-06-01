const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const geocoder = require('./../utils/geoCoder');
const Bootcamp = require('./../models/Bootcamp');

// todo @desc  Get All bootcamps
//? @route  GET /api/v1/bootcamps
//* @access Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  console.log(req.query);

  //Copy req.query
  const reqQuery = { ...req.query };

  // fields to excludes
  const removeFields = ['select', 'sort', 'limit', 'page'];

  // Loop over removeFields and delete them from req query
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query String
  let queryStr = JSON.stringify(reqQuery);

  // Create operators like ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.perv = {
      page: page - 1,
      limit: limit,
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination: pagination,
    data: bootcamps,
  });
});

// todo @desc  Create  new  bootcamp
//? @route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// todo @desc  Get single bootcamp
//? @route  GET /api/v1/bootcamps/i:id
//* @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const single_bootcamp = await Bootcamp.findById(req.params.id);

  if (!single_bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    data: single_bootcamp,
    success: true,
  });
});

// todo @desc  Update    bootcamp
//? @route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  console.log(bootcamp);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// todo @desc  Delete bootcamp
//? @route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const delete_bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  if (!delete_bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  delete_bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

// todo @desc  GET bootcamps within a radius
//? @route  DELETE /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divid distance by raius of Earth
  // Earth Radiu = 3,963 miles

  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
