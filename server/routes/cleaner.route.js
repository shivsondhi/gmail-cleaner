const express = require('express');
const cleanerRoute = express.Router(); 


// ROUTES 
// sign into gmail 
cleanerRoute.route(
    '/auth/google', 
    passport.authenticate('google', {
        scope: deleter.scopes
    })
).get();

cleanerRoute.route('/auth/error').get((req, res, next) => {
    res.send('Error')
});

cleanerRoute.route(
    '/auth/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/error' })).get((req, res, next) => {
    req.session.token = req.user.token;
    res.redirect('/authorized');
});


cleanerRoute.route('/authorized').get((req, res, next) => {
    // load new page with query field
    // and sample queries 
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.send({
            message: 'Signed in'
        });
    } else {
        res.cookie('token', '');
        res.send('Not signed in!')
    }
});


cleanerRoute.route('/authorized').post((req, res, next) => {
    if (req.session.token) {
        // get entered query 
        console.log("query: ");
        // delete email 
        if (req.body.query) {
            deleter.cleanInbox(req.body.query, 'trash');
            // success message with number deleted 
            request = JSON.stringify(req.body);
            res.contentType('application/json');
            res.send(request);
        }
    } else {
        console.log('Not signed in!');
        res.cookie('token', '');
        res.send('Not signed in!');
    }
});

// callback after gmail login 
app.get(, (req,res) => {}
);
