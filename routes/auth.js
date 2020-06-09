const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();


router.post('/login', isNotLoggedIn, async (req, res, next) =>{
  passport.authenticate('local', (authError, user, info) => {
    if(authError){
      console.error(authError);
      return next(authError);
    }

    if(!user){
      console.log(info.message);
      req.flash('loginError', info.message);
      return res.redirect('/');
    }

    return req.login(user, (loginError) =>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post('/join', isNotLoggedIn, async (req, res, next) =>{
  const { email, username, password } = req.body;
  try{
    const exEmail = await User.findOne({
      where : { email }
    });
    if(exEmail) {
      req.flash('joinError', 'Already Email');
      return res.redirect('/signup-page');
    }
    const exUser = await User.findOne({
      where : { username }
    });
    if(exUser){
      req.flash('joinError', 'Already User');
      return res.redirect('/signup-page');
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      email,
      username,
      password : hashPassword
    });

    return res.redirect('/');
  }catch(err){
    console.error(err);
    return next(err);
  }
});

router.get('/logout', isLoggedIn, (req, res, next) =>{
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
