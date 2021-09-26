const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const collectionRoutes = require('./collection-routes.js');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/collection', collectionRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;