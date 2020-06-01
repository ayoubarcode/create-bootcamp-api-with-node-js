const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title'],
  },

  description: {
    type: String,
    required: [true, 'please add a description'],
  },
  weeks: {
    type: Number,
    required: [true, 'please add a number of '],
  },

  tuition: {
    type: Number,
    required: [true, 'please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
