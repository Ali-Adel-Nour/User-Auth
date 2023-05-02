const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User


const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
}


const verifyCallback = (username,password,done)=>{
  User.findOne({username:username})
      .then((user)=>{
        if(!user){return cb(null,false)}

        //function defined at bottom of app.js
        const isVaild = validPassword(password,user.hash,user.salt)
        if(isVaild){
          return done (null,user)
        }else{
          return done (null,false)
        }
        })
        .catch((err)=>{
          done(err)
        })

}

const strategy = new LocalStrategy(customFields, veryifyCallback)
 passport.use(strategy);