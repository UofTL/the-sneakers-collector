const router = require('express').Router();
const { User, Sneakers, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all sneakers
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
                },
            ]
        })
        .then(dbSneakersData => res.json(dbSneakersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get sneakers by ID
router.get('/:id', (req, res) => {
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
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'sneakers_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]

        })
        .then(dbSneakersData => {
            if (!dbSneakersData) {
                res.status(404).json({ message: 'No sneakers found with this id' });
                return;
            }
            res.json(dbSneakersData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post sneakers
router.post('/', withAuth, (req, res) => {
    Sneakers.create({
            name: req.body.name,
            sneakers_size: req.body.sneakers_size,
            price_paid: req.body.price_paid,
            resell_value: req.body.resell_value,
            notes: req.body.notes,
            user_id: req.session.user_id
        })
        .then(dbSneakersData => res.json(dbSneakersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//sneakers voting route
router.put('/upvote', withAuth, (req, res) => {
    if (req.session) {
        Sneakers.upVote({...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// Update Sneakers
// router.put('/:id', withAuth, (req, res) => {
//     Sneakers.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//       }
//     })
//       .then(dbSneakersData => {
//         if (!dbSneakersData[0]) {
//           res.status(404).json({ message: 'No sneakers found with this id' });
//           return;
//         }
//         res.json(dbSneakersData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// Delete sneakers
router.delete('/:id', withAuth, (req, res) => {
    sneakers.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbSneakersData => {
            if (!dbSneakersData) {
                res.status(404).json({ message: 'No sneakers found with this id' });
                return;
            }
            res.json(dbSneakersData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;