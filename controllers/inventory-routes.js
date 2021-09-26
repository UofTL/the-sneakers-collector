const router = require('express').Router();
const sequelize = require('../config/connection');
const { Sneakers, User, Vote, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all sneakers for /inventory
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Sneakers.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'name',
                'sneakers_size',
                'price_paid',
                'resell_value',
                'notes', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE sneakers.id = vote.sneakers_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'sneakers_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbSneakersData => {
            const sneakers = dbSneakersData.map(sneakers => sneakers.get({ plain: true }));
            res.render('inventory', { sneakers, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get sneakers by ID
router.get('/sneakers/:id', (req, res) => {
    Sneakers.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                'sneakers_size',
                'price_paid',
                'resell_value',
                'notes', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE sneakers.id = vote.sneakers_id)'), 'vote_count']
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'sneakers_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbSneakersData => {
            if (!dbSneakersData) {
                res.status(404).json({ message: 'No sneakers found with this id' });
                return;
            }

            const sneakers = dbSneakersData.get({ plain: true });

            res.render('single-sneakers', {
                sneakers,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;