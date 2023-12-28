const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetechuser");

const bcrypt = require("bcrypt");

const User = require("../models/User");

const JWT_SECRET = "thisisabhayjwtsecretkey";

const jwt = require("jsonwebtoken");

// create a user using post "/api/auth"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ err: " Sorry a user already exists with this email " });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // send the jwt token to the user
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("some error occured");
    }
  }
);

// login a user using email and password and send authtokern

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ err: "Bad credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ err: "Bad credentials" });
      }

      // send the jwt token to the user
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Internal Server error");
    }
  }
);

//get user endpoint

router.post(
  "/getuser",
  fetchuser,

  async (req, res) => {
    try {
      userId = req.user.id;
      const user  = await User.findById(userId).select("-password");
      console.log(user);
      res.send(user);
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Internal Server error");
    }
  }
);
module.exports = router;
