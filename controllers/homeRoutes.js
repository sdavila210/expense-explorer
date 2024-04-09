const router = require('express').Router();
const { trip, user, budget, itinerary} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tripData = await trip.findAll({
      include: [
        {
          model: user,
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
    const tripData = await trip.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    res.render('trip', {
      ...trip,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const budgetData = await budget.findAll({
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const budgets = budgetData.map((trip) => budget.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      budgets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/budget/:id', async (req, res) => {
  try {
    const budgetData = await budget.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    const budget = budgetData.get({ plain: true });

    res.render('budget', {
      ...budget,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const itineraryData = await itinerary.findAll({
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const itinerary = itineraryData.map((itinerary) => itinerary.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      itinerary, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/itinerary/:id', async (req, res) => {
  try {
    const itineraryData = await itinerary.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    const itinerary = itineraryData.get({ plain: true });

    res.render('itinerary', {
      ...itinerary,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await user.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
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
