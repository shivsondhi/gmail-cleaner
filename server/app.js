/*
Express App - entry point. 
*/

// imports 
const fs = require('fs'); 
const http = require('http');
// const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const deleter = require('./deleter.js')



// express app
const app = express(); 
const server = http.createServer(app); 
// const servers = https.createServer({ key:key, cert:cert }, app);
const port = process.env.port || 4000; 

app.use(morgan('tiny'));
app.use(cors()); 
app.use(bodyParser.json()); 



//authorization for Gmail API 
async function auth (passport) {
	const { client_id,client_secret,redirect_uris } = JSON.parse(fs.readFileSync('api-access/web_credentials.json', 'utf-8')).web 
	await passport.use(new GoogleStrategy({
		clientID: client_id,
		clientSecret: client_secret,
		callbackURL: '/auth/callback/'
	}, 
	(accessToken, refreshToken, profile, done) => {
		return done(null, profile);
	}));
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((user, done) => {
		done(null, user);
	});
}

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
	name:'session',
	keys: ['key-1', 'key-2'],
	maxAge: 3 * 60 * 60 * 1000
}));
app.use(cookieParser());
app.use(passport.session());




// ROUTES 
// sign into gmail 
app.get('/auth/google', 
	passport.authenticate('google', {
		scope: deleter.scopes
}));

app.get('/auth/error', (req,res) => {
	res.send('Error')
});

// callback after gmail login 
app.get('/auth/callback', 
	passport.authenticate('google', { failureRedirect: '/auth/error' }), 
	(req,res) => {
		req.session.token = req.user.token;
		res.redirect('/authorized');
	}
);

// app functions once authorized
app.get('/authorized', (req, res) => {
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

app.post('/authorized', (req, res) => {
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





// listen
server.listen(port, () => {
	console.log('Listening on ', port);
});

// servers.listen(port, function () {
// 	console.log(`Listening on ${port} with https`);
// });
