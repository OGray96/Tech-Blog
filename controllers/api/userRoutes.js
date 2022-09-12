const router = require('express').Router();
const {User} = require('../../models/index');

router.post('/login',  (req, res) => {
    try {
      User.findOne({ 
        where: { email: req.body.email } 
      })
        .then(data => {
          const password = data.checkPassword(req.body.password)

          
          
          if (!password) {
            return res.status(400).json({ message: 'Incorrect Email or Password!' })
          }
        
          req.session.save(() => {
            req.session.user_id = data.id;
            req.session.logged_in = true;
            res.json(data);
          });
        
        })

  
    } catch (err) {
      res.status(400).json({ message: 'Route not working' });
    }
});

router.post('/', async (req, res) => {
    try {
      await User.create(req.body)
      .then(data =>{
        req.session.save(() => {
          req.session.user_id = data.id;
          req.session.logged_in = true;
          res.status(200).json(data);
        });
      })

  
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/', async (req,res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
  
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;