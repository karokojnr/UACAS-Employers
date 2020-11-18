const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model("courses", CourseSchema);