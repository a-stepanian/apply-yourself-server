const router = require("express").Router();
const Application = require("../models/applicationModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

//-----------------------
// CREATE NEW APPLICATION
//-----------------------
router.post("/", auth, async (req, res) => {
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

//-----------------------
// GET ALL APPLICATIONS
//-----------------------
router.get("/", auth, async (req, res) => {
  const id = req.user; //req.user added in auth middleware
  try {
    const foundApplications = await Application.find({ user: id });
    res.json(foundApplications);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//-----------------------
// GET SINGLE APPLICATION
//-----------------------
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const foundApplication = await Application.findById(id);
    res.json(foundApplication);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//-----------------------
// EDIT SINGLE APPLICATION
//-----------------------
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updatedApp = req.body;

  //Update application
  try {
    const application = await Application.findByIdAndUpdate(id, updatedApp);
    await application.save();
    // Respond with old values
    res.json(application);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
