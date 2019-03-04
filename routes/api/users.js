const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const email_address = require("../../config/email").EMAIL_ADDRESS;
const email_password = require("../../config/email").EMAIL_PASSWORD;

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "User file" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign token
        jwt.sign(
          payload,
          keys.secretToken,
          // { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   GET api/users/forgotPassword
// @desc    Forgot password
// @access  Public
router.post("/forgotPassword", (req, res) => {
  if (req.body.email === "") {
    return res.status(200).json("Email is required");
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user === null) {
      return res.status(200).json("Email is not in database");
    } else {
      const token = crypto.randomBytes(20).toString("hex");

      User.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpiration: Date.now() + 3600000
          }
        },
        (err, something) => {
          console.log(err);
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email_address,
          pass: email_password
        }
      });

      const mailOptions = {
        from: "",
        to: `${user.email}`,
        subject: "Link to reset password",
        text:
          `Hi ${user.name}\n\n` +
          "Someone recently requested a password change for your account. If this was you, you can set a new password here: \n\n" +
          `http://localhost:3000/reset-password/${token}\n\n` +
          "If you don't want to change your password or didn't request this, just ignore and delete this message."
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
          return res.status(200).json("Recovery mail sent");
        } else {
          return res.status(400).json("Didn't send");
        }
      });
    }
  });
});

router.get("/reset", (req, res) => {
  User.findOne({
    $and: [
      { resetPasswordToken: req.query.resetPasswordToken },
      { resetPasswordExpiration: { $gt: Date.now() } }
    ]
  }).then(user => {
    if (user == null) {
      res.status(400).json("Password reset link is invalid or expired");
    } else {
      res.status(200).json({
        id: user._id,
        message: "Password reset link is ok"
      });
    }
  });
});

router.put("/updatePassword", (req, res) => {
  User.findOne({ _id: req.body.id }).then(user => {
    if (
      user.resetPasswordToken === req.body.resetPasswordToken &&
      user.resetPasswordExpiration > Date.now()
    ) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt).then(hash => {
          user
            .update({
              password: hash,
              resetPasswordToken: null,
              resetPasswordExpiration: null
            })
            .then(user => res.status(200).json("Password updated"))
            .catch(err => console.log(err));
        });
      });
    } else {
      res.status(404).json("User doesn't exist in database");
    }
  });
});

module.exports = router;
