const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  eventTitle: String,
  description: String,
  eventDate: String,
  banner: String,
})

module.exports = mongoose.model('Event', eventSchema)
