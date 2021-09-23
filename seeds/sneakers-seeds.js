// For future development

const { Sneakers } = require('../models');

const SneakersData = [{
        name: 'Air Jordan X OG',
        type: 'Jordan',
        created_at: new Date(),
        // comments: [{}, {}],
        // user: {
        //     username: 'test_user'
        // }
    },
    {
        name: 'Chuck Taylor All Star ',
        type: 'Converse',
        created_at: new Date(),
        // comments: [{}, {}],
        // user: {
        //     username: 'test_user'
        // }
    },
    {
        name: 'Air Jordan 1',
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