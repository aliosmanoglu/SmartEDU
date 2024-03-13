const mongoose = require('mongoose');
const slugify = require('slugify');


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category',
    required : true
  },
  slug : {
    type : String,
    unique : true
  }
});

CourseSchema.pre('validate',function(next) {
  this.slug = slugify(this.name,{
    lower : true,
    strict : true
  });
  next();
})

const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;