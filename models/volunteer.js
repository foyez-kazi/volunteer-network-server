const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  volunteerList: String,
  bannerUrl: String,
})

module.exports = mongoose.model('Volunteer', volunteerSchema)
