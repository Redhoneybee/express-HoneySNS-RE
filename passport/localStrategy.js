const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) =>{
  passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password'
  }, async (username, password, done) => {
    try{
      const exUser = await User.findOne({ where : { username }});
      if(exUser){
        // user is...
        const ret = await bcrypt.compare(password, exUser.password);
        if(ret){
          // password matching is Okay
          done(null, exUser);
        }else{
          // no matching
          done(null, false, { message : 'no matched password' });
        }
      }else{
        // Not user
        done(null, false, { message : 'no matched user' });
      }
    }catch(err){
      console.error(err);
      done(err);
    }
  }));
}
