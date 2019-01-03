const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load profile model
const Profile = require("../../models/Profile");

//Load user model
const User = require("../../models/User");

// @route   GET api/proflie/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile file" }));

// @route   GET api/proflie
// @desc    Get current user profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => console.log(err));
  }
);
module.exports = router;
