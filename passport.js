const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CustomerModel = require('./models/customer')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { Customer, Blog, Tag } = require('./sequelize')

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        console.log("llegue",email,password)
        return Customer.findAll({
            where: {
              email: email,
              password: password
            },
            raw: true 
          }).then(user => {
               console.log("User",user)
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'});
               }
               return cb(null, JSON.stringify(user[0]), {message: 'Logged In Successfully'});
          })
          .catch(err => console.log("Error",err) );
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'asdbdbjDFSDLSFKdksalflkdsaFLjsdDLFSPFRMrknjvnakdvZXs'
},
function (jwtPayload, cb) {
    console.log("jwtPayload",jwtPayload)
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return Customer.findById(jwtPayload.id, {raw: true})
        .then(user => {
            console.log("User",user)
            return cb(null, user);
        })
        .catch(err => {
            console.log("Error",err)
            return cb(err);
        });
}
));