const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const itineraryRoutes = require('./itineraryRoutes');
const budgetRoutes = require('./budgetRoutes');

router.use('/user', userRoutes);
router.use('/home', homeRoutes);
router.use('/trip', tripRoutes);
router.use('/itinerary', itineraryRoutes);
router.use('/budget', budgetRoutes);





module.exports = router;
