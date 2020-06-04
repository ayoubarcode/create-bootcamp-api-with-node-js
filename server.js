const express = require('express');
const helmet = require('helmet');
var xss = require('xss-clean');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const colors = require('colors');
const errorHandler = require('./middleware/errors');
const path = require('path');

const connectDB = require('./config/db');

// Load env file
dotenv.config({ path: './config/config.env' });

// Connect To Database
connectDB();

const app = express();

// body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev Logging middlware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// prevent XSS attacks
app.use(xss());

// set scuroty headers
app.use(helmet());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode at port  ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
