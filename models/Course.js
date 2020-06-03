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

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Static mehtod to get avergae of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: { _id: '$bootcamp', averageCost: { $avg: '$tuition' } },
    },
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverage Cost after save
CourseSchema.post('save', function (next) {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverage Cost before remove
CourseSchema.pre('remove', function (next) {
  this.constructor.getAverageCost(this.bootcamp);
});
module.exports = mongoose.model('Course', CourseSchema);
