//process.env.DEBUG = '*'
const session = require('express-session');
const express = require('express');
//let data = require('./info')
const { lookup } = require('geoip-lite');
const app = express();
const Users = require('./Users')
const usersSystem = new Users()
const passport = require('passport');
usersSystem.getUsers().forEach(u => {
if(!u.ip_info) u.ip_info = {}
  usersSystem.saveUser(u)
})
app.set('view engine', 'ejs')
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET
}));
let AuthEnabled = true;
let requests = 0;
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/');
  });
app.use('*', (req, res, next) => {
   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!req.session.requests) req.session.requests = 0;
  if (!req.session.authreq) req.session.authreq = 0;
  req.session.requests++
  if (req.user) req.session.authreq++
  requests++;
  if(req.user && usersSystem.getUser(req.user.email)) {
    let user = usersSystem.getUser(req.user.email)
    user.requests = req.session.authreq;
    user.last_request_url = req.originalUrl;
    user.last_request_timestamp = Date.now()
  if(!user.request_pages) user.request_pages = {}
  if(!user.request_pages[req.originalUrl]) user.request_pages[req.originalUrl] = 0;
  //console.log(req.headers)
  user.ip = ip;
  user.ip_info = lookup(ip)
  user.request_pages[req.originalUrl]++ 
  console.log(user)
  usersSystem.saveUser(user)
  }
  next()
})
app.get('/palm', (req,res) => {
  res.render('palm')
})
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
const auth = (req, res, next) => {
  //  console.log(req.user)
  if (AuthEnabled) {
    if (!req.user) return res.render('login')
    if (req.user.hd && req.user.hd === 'stfrancisschool.org') {
      next()
    } else {
      res.send('You are not a member of the SaintFrancis community!')
      req.session.destroy()
    }
  } else {
    next()
  }
}
app.use(auth)
app.get('/', (req, res) => {
  res.render('index', {
    // data,
    req,
    res
  })
});
app.get('/goto', (req, res) => {
  const url = req.query.path
  res.redirect(url.replace(/ +/, ''))
})
app.get('/area51', (req, res) => {
  res.render('area51', {})
})
app.get('/flatearth', (req, res) => {
  res.render('flatearth')
})
app.get('/pizzaflu', (req, res) => {
  res.render('michaljordan')
})
app.get('/contributors', (_,res) => {
  res.render('contibutors', { users: usersSystem })
})
// setInterval(()=>{
// data.reload()
// data = require('./info')
// },1000)
const server = app.listen(3000, () => {
  console.log('server started on port ::3000\n https://LASS-SITE.neonwefokwaf.repl.co \n or \n http://localhost:3000');
});
; (() => {
  function close() {
    server.close(() => console.log('Exit'))
  }
  process.on('beforeExit', close)
  process.on('SIGINT', close)
  process.on('SIGTERM', close)
})()
var userProfile;
app.get('/dashboard', (req, res, next) => {
  if (!req.user) return res.redirect('/')
  if (!req.user.email.startsWith('saahildutta'))
    return res.status(403).json({ message: 'Who are you?' })

  res.render('dash', {
    users: usersSystem.getUsers(),
    requests,
    Myrequests: {
      authed: req.session.authreq,
      total: req.session.requests
    }
  })
})
app.get('/home', (_,res) => { res.redirect('/')})
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://LASS-SITE.neonwefokwaf.repl.co/auth/google/callback"
},
  function(accessToken, refreshToken, profile, done) {
    // userProfile=profile;
    profile._json.lastlogin = Date.now()
    let PulledUser = usersSystem.getUser(profile._json.email)
    if (!PulledUser) PulledUser = profile._json
    if (!PulledUser.logins) PulledUser.logins = 0;
    profile._json.logins = (PulledUser.logins++) + 1
if(!usersSystem.getUser(profile._json.email)) profile._json.firstloginstamp = Date.now()
if(profile._json.hd) usersSystem.saveUser(profile._json)

    return done(null, profile._json);
  }
));


app.use('*', (req, res) => {
  res.render('404', { req })
});
"LOADED SCRIPTS";