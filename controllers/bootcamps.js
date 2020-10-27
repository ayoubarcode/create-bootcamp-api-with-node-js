const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const geocoder = require('./../utils/geoCoder');
const Bootcamp = require('./../models/Bootcamp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// todo @desc  Get All bootcamps
//? @route  GET /api/v1/bootcamps
//* @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// todo @desc  Create  new  bootcamp
//? @route  POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to body req.body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // if the user is not an admin, they can only add one bootcamp

  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }

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
  const single_bootcamp = await Bootcamp.findById(req.params.id).populate(
    'courses'
  );

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
  let bootcamp = await Bootcamp.findById(req.params.id);

  //Copy req.query
  const reqQuery = { ...req.query };

  // fields to excludes
  const removeFields = ['select', 'sort', 'limit', 'page'];

  // Loop over removeFields and delete them from req query
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query String
  let queryStr = JSON.stringify(reqQuery);

  console.log(queryStr);
  query = Bootcamp.find(JSON.parse(queryStr));

  console.log(bootcamp);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this boootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

// todo @desc  Delete bootcamp
//? @route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const delete_bootcamp = await Bootcamp.findById(req.params.id);

  // check if return a bootcamp or not
  if (!delete_bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is bootcamp owner
  if (
    delete_bootcamp.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this boootcamp`,
        401
      )
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

// todo @desc get bootcamp by user
//? @route GET /api/v1/bootcamp/:id/user
//@access Private

exports.getBootcampByUser = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ user: req.user.id });
  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp for id ${req.user.id}`, 404));
  }

  if (bootcamp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to get this boootcamp`,
        401
      )
    );
  }

  res.status(200).json({
    data: bootcamp,
    success: true,
  });
});

// todo @desc  Upload photo got the bootcamp
//? @route  PUT /api/v1/bootcamps/:id/photo
//@access Private
exports.bootcampUplodPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`no bootcamp for id ${req.params.id}`), 404);
  }

  //Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this boootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('pelase ! upload a file', 400));
  }

  const file = req.files.file;

  console.log(`this is headers`);
  console.log(JSON.stringify(req.headers));
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`please upload an image file`, 400));
  }

  // Check file size

  if (!file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.enc.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create Custom filename
  file.name = `photo_${bootcamp._id}${uuidv4()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  // res.status(200).json({
  //   success: true,
  //   count: bootcamps.length,
  //   data: bootcamps,
  // });
});
