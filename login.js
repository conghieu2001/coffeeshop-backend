const express = require("express");
const session = require("express-session");
// const { ObjectId } = require("mongodb");
// const bcrypt = require('bcryptjs');
const UserService = require("./app/services/user.service2");
const MongoDB = require("./app/utils/mongodb.util");
const appB = express();

appB.set("view engine", "ejs");

appB.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
appB.get("/", function (req, res) {
  res.render("pages/auth");
});
const passport = require("passport");
var userProfile;
appB.use(passport.initialize());
appB.use(passport.session());
appB.get("/success", (req, res) => res.send(userProfile));
appB.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "756357518863-0f0rgukj77trs4am8fq7u98ovh0ihh5t.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

appB.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

appB.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  async (req, res) => {
    const name = userProfile._json.name;
    const email = userProfile._json.email;
    const picture = userProfile._json.picture;
    const userService = new UserService(MongoDB.client);
    const document = userService.create({ name, email, picture });
    req.session.auth = {
      ...req.user._json,
    };
    // console.log(req.user)
    // console.log(req.session.auth)
    res.redirect("http://localhost:3001/");
    // return document;
  }
);

module.exports = appB;
