const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sania:12345@cluster0.tygobp8.mongodb.net/doctors', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//static folder 
app.use(express.static('public'));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/doctors', doctorRoutes);

//model
const Doctor = require('./models/doctor');


// Render index.ejs as the homepage
app.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('index', { doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
