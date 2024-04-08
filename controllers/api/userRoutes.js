const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');
// Get user profile by user_id
router.get('/user', withAuth, (req, res) => {
    User.findByPk(req.session.user_id, {
        attributes: ['id', 'name', 'email'],
        include: [
            {
                model: user,
                attributes: ['id', 'name', 'email']
            }
        ]
    })
        .then(dbUserData => {
            if (dbUserData) {
                const user = dbUserData.get({ plain: true });
                res.render('profile', { user, loggedIn: true });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
// Update user profile
router.post('/user', withAuth, (req, res) => {
    User.update(
        {
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                id: req.session.user_id
            }
        }
    )
        .then(updatedUser => {
            if (updatedUser[0] === 1) {
                res.status(200).json({ message: 'User profile updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found or you are not authorized to update the profile' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
// Delete user account
router.delete('/user/delete', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.session.user_id
        }
    })
        .then(numRowsDeleted => {
            if (numRowsDeleted === 1) {
                res.status(200).json({ message: 'User account deleted successfully' });
            } else {
                res.status(404).json({ message: 'User account not found or you are not authorized to delete it' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
module.exports = router;