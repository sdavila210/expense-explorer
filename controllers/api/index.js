const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
//const itineraryRoutes = require('./itineraryRoutes');
//const budgetRoutes = require('./budgetRoutes');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
//router.use('/itinerary', itineraryRoutes);
//router.use('/budget', budgetRoutes);





module.exports = router;
