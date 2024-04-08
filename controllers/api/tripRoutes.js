const router = require('express').Router();
const { Trip } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const { location, travel_dates, user_id } = req.body;

        const trip = await Trip.create({
            location,
            travel_dates,
            user_id
        });

        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;