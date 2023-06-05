const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// New doctor form route
router.get('/new', (req, res) => {
  res.render('doctor-form', { doctor: null });
});

// Edit doctor form route
router.get('/:id/edit', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.render('doctor-form', { doctor });
  } catch (error) {
    console.error('Error fetching Doctor Details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new doctor entry
router.post('/', async (req, res) => {
  try {
    const { name, speciality,hospital } = req.body;
    const doctor = new Doctor({ name, speciality,hospital });
    await doctor.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  try {
    const {  name, speciality,hospital  } = req.body;
    await Doctor.findByIdAndUpdate(req.params.id, { name, speciality,hospital });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
