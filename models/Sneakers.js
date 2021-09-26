const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Sneakers extends Model {
    static upVote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            sneakers_id: body.sneakers_id
        }).then(() => {
            return Sneakers.findOne({
                where: {
                    id: body.sneakers_id
                },
                attributes: [
                    'id',
                    'name',
                    'sneakers_size',
                    'price_paid',
                    'resell_value',
                    'user_id', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE sneakers.id = vote.sneakers_id)'), 'vote_count']
                ]
            });
        });
    }
}

// create fields/columns for Post model
Sneakers.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // limiting the number of preselected...will need to work in to code
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sneakers_size: {
        type: DataTypes.TEXT,
        allowNull: truncate
    },
    price_paid: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    resell_value: {
        type: DataTypes.FLOAT,
        alllowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'sneakers'
});

module.exports = Sneakers;