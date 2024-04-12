const router = require('express').Router();
const exceljs = require('exceljs');
const { Trip, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tripData = await Trip.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      trips,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/trip/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    res.render('trip', {
      ...trip,
      tripId: req.params.id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});









router.get('/trips/export/:tripId', async (req, res) => {
  try {
    // Retrieves trip data from the database based on tripId
    const trip = await Trip.findOne({
      where: { id: req.params.tripId },
      include: [{ model: User, attributes: ['name'] }]
    });

    // Creates a new Excel workbook
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Trip Details');

    // Adds trip data to the worksheet
    worksheet.addRow(['Name', trip.name]);
    worksheet.addRow(['Description', trip.description]);
    worksheet.addRow(['Created By', trip.user.name]);
    worksheet.addRow(['Date Created', trip.date_created]);
    worksheet.addRow(['Hotel Cost', trip.needed_funding_hotel]);
    worksheet.addRow(['Transportation Cost', trip.needed_funding_transportation]);
    worksheet.addRow(['Food Cost', trip.needed_funding_food]);
    worksheet.addRow(['Attractions Cost', trip.needed_funding_attractions]);
    worksheet.addRow(['Total Needed for trip', trip.needed_funding_total]);

    // Generates Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers to indicate that a file attachment is being sent
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="trip_${trip.id}.xlsx"`);

    // Send the Excel file buffer as the response
    res.send(buffer);
  } catch (err) {
    console.error('Error exporting trip data:', err);
    res.status(500).send('Error exporting trip data');
  }
});










// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Trip }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;