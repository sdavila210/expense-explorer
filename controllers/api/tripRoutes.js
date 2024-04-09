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

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trip.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!tripData) {
            res.status(404).json({ message: 'No trip found with this id!' });
            return;
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;