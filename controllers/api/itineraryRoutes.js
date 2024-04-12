/*const router = require('express').Router();
const { Itinerary } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newItinerary = await Itinerary.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItinerary);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ItineraryData = await Itinerary.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!ItineraryData) {
      res.status(404).json({ message: 'No itinerary found!' });
      return;
    }

    res.status(200).json(ItineraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
*/