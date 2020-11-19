module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // req.isAuthenticated attached to passport

    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to continue...");
    res.redirect("/users/login");
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  }
};
