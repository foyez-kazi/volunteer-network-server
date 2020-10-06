require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const Event = require('./models/event')
const Volunteer = require('./models/volunteer')

const app = express()

// middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/api/events', (req, res) => {
  Event.find({}).then((events) => {
    res.json(events)
  })
})

app.post('/api/events', (req, res) => {
  const eventTitle = req.body.eventTitle.trim()
  const description = req.body.description.trim()
  const eventDate = req.body.eventDate.trim()
  const bannerUrl = req.body.bannerUrl.trim()

  if (!eventTitle || !eventDate) {
    return res.status(400).json({
      error: 'Title or Date is missing',
    })
  }

  const event = new Event({
    eventTitle,
    description,
    eventDate,
    banner: bannerUrl,
  })

  event.save().then((savedEvent) => {
    res.json(savedEvent)
  })
})

app.get('/api/volunteers', (req, res) => {
  Volunteer.find({}).then((volunteers) => {
    res.json(volunteers)
  })
})

app.get('/api/volunteers/:email', (req, res) => {
  Volunteer.find({ email: req.params.email }).then((volunteers) => {
    res.json(volunteers)
  })
})

app.delete('/api/volunteers/:id', (req, res) => {
  Volunteer.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).end()
  })
})

app.post('/api/volunteers', (req, res) => {
  const name = req.body.fullName.trim()
  const email = req.body.email.trim()
  const date = req.body.date.trim()
  const volunteerList = req.body.volunteerList.trim()
  const bannerUrl = req.body.bannerUrl

  if (!name || !email || !volunteerList) {
    return res.status(400).json({
      error: 'Name or Email or Volunteer list is missing',
    })
  }

  const volunteer = new Volunteer({
    name,
    email,
    date,
    volunteerList,
    bannerUrl,
  })

  volunteer.save().then((savedVolunteer) => {
    res.json(savedVolunteer)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server starts on ${PORT}`))
