const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Certificate = require("../models/Certificate")
const Course = require("../models/Course")
const Institution = require("../models/Institution")
// Welcome Page
router.get("/", (req, res) => res.render("welcome"));

// Welcome Page
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    //user accessed after login
    name: req.user.name
  })
);
router.get("/verify", ensureAuthenticated, (req, res) => {
  res.render("verify", {
    name: req.user.name
  })
})
router.post("/verify-certificate", ensureAuthenticated, (req, res) => {
  const { certificateNumber } = req.body;
  let errors = [];

  if (!certificateNumber) {
    errors.push({ msg: 'Please enter the certificate number' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      certificateNumber,
    });
  } else {
    Certificate.findOne({ certificateNumber: certificateNumber }).populate("institution").populate("course").then(certificate => {
      if (!certificate) {
        res.render("results", {
          certificateNumber: certificate.certificateNumber,
          certificate: certificate
        })
      }
      res.render("results", {
        certificateNumber: certificate.certificateNumber,
        certificate: certificate
      })
    }).catch(err => {
      res.render("results", { certificate: false })
      // console.log(err);
    })
  }

})
module.exports = router;
