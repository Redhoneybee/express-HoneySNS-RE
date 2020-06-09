const express = require('express');

const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/', (req, res, next) => {
  var username;
  if(req.user === undefined){
    // user is not...
    username = undefined;
  }else{
    // user is...
    username = req.user.username;
  }
  console.log(username);
  res.render('index',{
    username
  });
});

router.get('/signup-page', isNotLoggedIn, (req, res, next) =>{
  res.render('signup');
});
module.exports = router;
