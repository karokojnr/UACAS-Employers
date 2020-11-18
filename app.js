const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');



const app = express();

dotenv.config();

//Passport config
require("./config/passport")(passport);
// DB config
const db = require("./config/keys").MongoURI;

const PORT = process.env.PORT || 3500;

//DB Config
//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.blue("MongoDB Connected...")))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/assets"));
//Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
  })
);
//Passport middleware --- location important
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
const homeRoutes = require("./routes/index.js");
const userRoutes = require("./routes/users.js");

app.use("/", homeRoutes);
app.use("/users", userRoutes);

app.listen(PORT, (req, res, next) =>
  console.log("App running on PORT:" + chalk.green(`${PORT}`))
);
