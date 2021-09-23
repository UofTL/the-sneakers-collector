const router = require('express').Router();
const models = require('../../models');

//get all products on home page
router.get('/', (req, res) => {
    //add user authentication logic here:

    //Product Model reference here:
    Product.findAll({
        //ensure it matches product model fields
        attributes: ['id', 'name', 'description', 'price', 'SKU'],
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
    })
})

//login route
router.post('/login', (req, res) => {
    // expects {email: 'string', password: 'string'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      //runs password validator method via bcrypt
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      } 
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });

//get individual products based on product ID
router.get('/products/:product_id', (req, res) => {
    Product.findOne({
        //search by product ID
        where: {
           product_id: req.params.product_id
        }
    }).then(dbProductData => {
        if(!dbProductData) {
            res.status(400).json({ message: 'No such product exists!'});
            return;
        }
        //returns product data
        res.json(dbProductData);
    });
});


module.exports = router;