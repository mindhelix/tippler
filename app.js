
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , config = require('./config/config')
  , user = require('./routes/user')
  , compose = require('./routes/compose')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || config.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'Tippler is a non-stop flying homing pigeon' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/*
 * Optinal Passport Local strategy
 * 
 * Extend and make your own strategy, this just include a sample static auth strategy. 
 * Ya, I know, very bad ethics! - @jinmatt
 */

passport.use(new LocalStrategy(
  function(username, password, done) {
    var user = { id: 123, username: "admin@tippler.com", password: "letmein" };
    
    if(user.username != username) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if(user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var user = { id: 123, username: "admin@tippler.com", password: "letmein" };
  done(null, user);
});


/*
 * Passport auth ensure call fn
 *
 * Call this as middleware for a route if you need to authenticate  
 */

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}



/*
 * routes
 */

app.get('/outbox', routes.outbox); // outbox - index.js
app.get('/', compose.index);
app.post('/compose', compose.compose);

app.get('/login', user.login);

// POST login
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
// Logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});



/*
 * Create Server
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
