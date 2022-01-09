//jshint esversion:6
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;;
const findOrCreate = require('mongoose-findorcreate');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
// const router = express.Router();

const app = express();

var corsOption = {
  origin: 'http://localhost:8080',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Origin, Content-Type, X-Auth-Token"
 };

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(session({
  secret: "fjdlafndlfdklfaj",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/recipeuserDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  googleId: String,
  profileName: String
});

userSchema.plugin(findOrCreate);

userSchema.plugin(passportLocalMongoose);

const RecipeUser = new mongoose.model("recipeUser", userSchema);

//module.exports = RecipeUser;

passport.use(RecipeUser.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  RecipeUser.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/redirect"
},
function(accessToken, refreshToken, profile, done) {
     RecipeUser.findOrCreate({ googleId: profile.id, profileName: profile.displayName }, function (err, user) {
       console.log(profile);
       return done(err, user);
     });
  }
));

// To return the user data to the client
app.get("/auth/check", (req, res) => {
  console.log("user - " + req.user);
  // console.log(req.session.passport);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user
    });
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect("http://localhost:8080/search");
  });

  // The API to log out, it clears req.user
app.get('/logout', function(req, res, next) {
    req.logout();
    res.json({ msg: "Logged out" });
  });

app.post('/register', function(req, res){
  
  console.log(req.body);
  console.log("username ", req.body.username);
  RecipeUser.register({username:req.body.username}, req.body.password, function(err, user){
    if (err) {
       res.send(err);
    } else {
        passport.authenticate("local")(req, res, function(){
          res.send("Success");
        });
    }
  })
});

app.listen(3000, function(){
  console.log("Server started on port 3000.")
});
