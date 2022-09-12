const { Post, User } = require('../models');
const sessionCheck = require('../utils/session-check')
const router = require('express').Router();


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    Post.findAll({
      include: [
        {
          model: User
        }
      ]
    })
    .then(postData => {
      const post = postData.map(post => post.get({plain: true}))
      res.render('homepage', {
        logged_in: req.session.logged_in,
        post
      });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard',sessionCheck, async (req, res) => {
    try {
      Post.findAll({
        where: {user_id: req.session.user_id},
        include: [
          {
            model: User
          }
        ]
      })
      .then(postData => {
        const post = postData.map(post => post.get({plain: true}))
        res.render('dashboard', {
          logged_in: req.session.logged_in,
          post
        });
      })
    } catch (err) {
      res.status(500).json(err);
      res.render('dashboard')
    }
  
});

router.get('/logout', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

