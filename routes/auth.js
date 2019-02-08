const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var customer = require('../models/customer');
const { Customer, Blog, Tag } = require('../sequelize')
/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'asdbdbjDFSDLSFKdksalflkdsaFLjsdDLFSPFRMrknjvnakdvZXs');
           return res.json({user, token});
        });
    })(req, res);
});

router.post('/register', function (req, res, next) {
    console.log("REQ",req.body);
    console.log("REQ",req.params);
    Customer.create(req.body)
     .then(customer => res.render('customer',{ user: customer}))
})

module.exports = router;