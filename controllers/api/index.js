const router = require('express').Router();

const userRoutes = require('./user-routes');
const sneakersRoutes = require('./sneakers-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/sneakers', sneakersRoutes);

module.exports = router;