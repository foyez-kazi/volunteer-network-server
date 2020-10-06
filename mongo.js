const mongoose = require('mongoose')

const url = ``

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const eventSchema = new mongoose.Schema({
  eventTitle: String,
  description: String,
  eventDate: String,
  banner: String,
})

const Event = mongoose.model('Event', eventSchema)

const event = new Event({
  eventTitle: 'Animal Shelter',
  description: '',
  eventDate: '23-10-2020',
  banner:
    'https://raw.githubusercontent.com/foyez-kazi/volunteer-network-client/main/src/assets/images/animalShelter.png',
})

event.save().then((result) => {
  console.log(result)
  mongoose.connection.close()
})
