// For future development

const { Sneakers } = require('../models');

const SneakersData = [{
        name: 'solid-gold-OVO',
        type: 'Jordan',
        created_at: new Date(),
        // comments: [{}, {}],
        // user: {
        //     username: 'test_user'
        // }
    },
    {
        name: 'MJ-JO1984-signed',
        type: 'Jordan',
        created_at: new Date(),
        // comments: [{}, {}],
        // user: {
        //     username: 'test_user'
        // }
    },
    {
        name: 'buscemi-100-MM-diamond',
        type: 'Jordan',
        created_at: new Date(),
        // comments: [{}, {}],
        // user: {
        //     username: 'test_user'
        // }
    },

];

const seedSneakers = () => Sneakers.bulkCreate(SneakersData);

module.exports = seedSneakers;