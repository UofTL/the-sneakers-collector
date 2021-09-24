//Placeholders...
const seedSnakers = require('./sneakers-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedSneakers();
    console.log('\n----- SNEAKERS SEEDED -----\n');

    process.exit(0);
};

seedAll();
