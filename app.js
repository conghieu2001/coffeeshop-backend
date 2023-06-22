const express = require("express");
const cors = require("cors");
const itemsRouter = require("./app/routes/item.route");
const adminsRouter = require("./app/routes/admin.route");
const postRouter = require("./app/routes/post.route");
const tuyendungRouter = require("./app/routes/tuyendung.route");
const storeRouter = require("./app/routes/store.route");
const userRouter = require("./app/routes/user.route");
const payRouter = require("./app/routes/pay.route");
const cmtRouter = require("./app/routes/cmt.route");
const promoRouter = require("./app/routes/promo.route");
const ApiError = require("./app/api-error");
const Login = require("./login");
const session = require('express-session');
const app = express();

app.use(cors());
app.use(express.json());
// app.set('view engine', 'ejs');

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'SECRET' 
//   }));
//   app.get('/', function(req, res) {
//     res.render('pages/auth');
//   });
//   const passport = require('passport');
// var userProfile;
// app.use(passport.initialize());
// app.use(passport.session());
// app.get('/success', (req, res) => res.send(userProfile));
// app.get('/error', (req, res) => res.send("error logging in"));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });
// /*  Google AUTH  */
 
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = '756357518863-0f0rgukj77trs4am8fq7u98ovh0ihh5t.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = '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';
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/user/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       userProfile=profile;
//       return done(null, userProfile);
//   }
// ));
 
// app.get('/auth/google', 
//   passport.authenticate('google', { scope : ['profile', 'email'] }));
 
// app.get('/user/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     // Successful authentication, redirect success.
//     res.redirect('/success');
//   });
app.use("/api/items", itemsRouter);
app.use("/admin", adminsRouter);
app.use("/posts", postRouter);
app.use("/tuyendung", tuyendungRouter);
app.use("/cuahang", storeRouter);
app.use("/user", userRouter);
app.use("/pay", payRouter);
app.use("/cmt", cmtRouter);
app.use("/promo", promoRouter);
app.use("/", Login);
// app.get("/", (req, res) => {
//     res.json({message: "Welcome to coffee shop applicaton"});
// });
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
    
    

module.exports = app;