const router = require("express").Router();
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//-------------------
// CREATE NEW APPLICAITON
//-------------------
router.post("/", async (req, res) => {
  try {
    const {
      company,
      position,
      website,
      location,
      applied,
      response,
      comments,
      status,
    } = req.body;

    const newApplication = new Application({
      company,
      position,
      website,
      location,
      applied,
      response,
      comments,
      status,
    });

    const savedApplication = await newApplication.save();

    res.json(savedApplication);
  } catch (error) {
    console.error(err);
    res.status(500).send();
  }
});

//-------------------
// GET ALL APPLICATIONS
//-------------------
router.get("/", async (req, res) => {
  try {
    const { username, email, password, passwordVerify } = req.body;

    // Validate user input
    // 1. Must have all required fields
    if (!username || !email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    // 2. Password has at least 6 characters
    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });
    // 3. Password and verification match
    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage:
          "Passwords do not match.  Please enter the same password twice.",
      });
    // 4. Email is not already in user
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });
    // 5. Username is not already in user
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({
        errorMessage: "An account with this username already exists.",
      });
    console.log("Salt & hash the password");
    // Salt & hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Add new user to the db
    const newUser = await new User({
      username,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    // Create token and sign with the secret
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in an http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
