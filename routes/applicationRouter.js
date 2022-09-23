const router = require("express").Router();
const Application = require("../models/applicationModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//-------------------
// CREATE NEW APPLICAITON
//-------------------
router.post("/", auth, async (req, res) => {
  console.log("hit route to create new application");
  try {
    // get mongodb _id from user (added to req object from cookie in auth middleware)
    const user = req.user;
    // get remaining properties from req body
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
    // create new application
    const newApplication = new Application({
      user,
      company,
      position,
      website,
      location,
      applied,
      response,
      comments,
      status,
    });
    // save to db
    const savedApplication = await newApplication.save();
    // Find user in db
    const foundUser = await User.findById(user);
    // Push new app into the user's applications array.
    foundUser.applications.push(savedApplication);
    await foundUser.save();

    res.json(savedApplication);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//-------------------
// GET ALL APPLICATIONS
//-------------------

router.get("/", auth, async (req, res) => {
  const id = req.user;
  console.log("id:", id);
  try {
    const existingUser = await User.find({ id });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
