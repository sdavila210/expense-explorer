const router = require('express').Router();
const { Budget, Expense } = require('../models');
const withAuth = require('../utils/auth');

// Get all budgets for a user
router.get('/Budget', withAuth, (req, res) => {
    Budget.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'category_cost', 'total_amount', 'date_created'],
        include: [
            {
                model: Expense,
                attributes: ['id', 'category_cost', 'total_amount', 'date_created']
            }
        ]
    })
        .then(dbBudgetData => {
            const budgets = dbBudgetData.map(budget => budget.get({ plain: true }));
            res.render('budgets', { budgets, loggedIn: true, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit a specific budget
router.get('/Budget/edit/:id', withAuth, (req, res) => {
    Budget.findByPk(req.params.id, {
        attributes: ['id', 'category_cost', 'total_amount', 'date_created'],
        include: [
            {
                model: Expense,
                attributes: ['id', 'category_cost', 'total_amount', 'date_created']
            }
        ]
    })
        .then(dbBudgetData => {
            if (dbBudgetData) {
                const budget = dbBudgetData.get({ plain: true });
                res.render('edit-budget', { budget, loggedIn: true, username: req.session.username });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Create a new budget
router.post('/Budget', withAuth, (req, res) => {
    Budget.create({
        budget_name: req.body.budget_name,
        total_amount: req.body.total_amount,
        user_id: req.session.user_id
    })
        .then(newBudget => {
            res.status(200).json(newBudget);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Delete a specific budget
router.delete('/Budget/:id', withAuth, (req, res) => {
    Budget.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    })
        .then(numRowsDeleted => {
            if (numRowsDeleted === 1) {
                res.status(200).json({ message: 'Budget deleted successfully' });
            } else {
                res.status(404).json({ message: 'Budget not found or you are not authorized to delete it' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;

