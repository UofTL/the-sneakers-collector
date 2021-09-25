const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Product, User } = require('../../models');

//get all products
router.get('/', (req, res) => {
    //add user authentication logic here:

    //Product Model reference here:
    Product.findAll({
        //ensure it matches product model fields
        attributes: ['id', 'name', 'description'],
        include: [
            {
            model: Product,
            attributes: ['name', 'description']
            }
        ]
    })
    //confirm db naming convention here:
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get individual products based on product ID
router.get('/products/:id', (req, res) => {
    Product.findOne({
        //search by product ID
        where: {
           id: req.params.product_id
        },
        attributes: [
            'id',
            'name',
            'description'
        ]
    }).then(dbProductData => {
        if(!dbProductData) {
            res.status(400).json({ message: 'No such product exists!'});
            return;
        }
        //returns product data
        res.json(dbProductData);
    });
});

router.post('/products', (req, res) => {
    Product.create({
        name: req.body.name,
        description: req.body.description
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
