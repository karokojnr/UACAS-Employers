const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isEmployer: {
    type: String,
    default: "NO",
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Employer = mongoose.model("Employer", EmployerSchema);
module.exports = Employer;
