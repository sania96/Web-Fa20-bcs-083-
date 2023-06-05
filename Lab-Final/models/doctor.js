const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  speciality: {
    type: String,
  },
  hospital: {
    type: String,
  },
});

module.exports = mongoose.model('Doctor', doctorSchema);
