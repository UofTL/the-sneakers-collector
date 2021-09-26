const router = require('express').Router();
const sequelize = require('../config/connection');
const { Sneakers, User, Vote, Comment } = require('../models');

// Get all Sneakers render homepage
router.get('/', (req, res) => {
    Sneakers.findAll({
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
            res.render('homepage', {
                sneakers,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup
// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('signup');
// });

// Get all Sneakers for /Sneakers extension 
// router.get('/sneakers', (req, res) => {
//   Sneakers.findAll({
//       attributes: [
//           'id',
//           'name',
//           'sneakers_size',
//           'price_paid',
//           'resell_value',
//           'user_id',
//           'notes',
//           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE sneakers.id = vote.sneakers_id)'), 'vote_count']
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'sneakers_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbSneakersData => {
//         const sneakers = dbSneakersData.map(sneakers => sneakers.get({ plain: true }));
//         res.render('sneakers', {
//             sneakers,
//             loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// Get all Sneakers for /browse (for future development)
// router.get('/browse', (req, res) => {
//   Sneakers.findAll({
//       attributes: [
//         'id',
//         'name',
//         'sneakers_size',
//         'price_paid',
//         'resell_value',
//         'user_id',
//         'notes',
//         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE sneakers.id = vote.sneakers_id)'), 'vote_count']
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'sneakers_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbSneakersData => {
//         const sneakers = dbSneakersData.map(sneakers => sneakers.get({ plain: true }));
//         res.render('browse', {
//             sneakers,
//             loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });


// Get sneakers by ID
router.get('/sneakers/:id', (req, res) => {
    sneakers.findOne({
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