const router = require('express').Router();
const models = require('../../models');


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



module.exports = router;