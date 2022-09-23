const router = require("express").Router();
const Application = require("../models/applicationModel");
const auth = require("../middleware/auth");

//-------------------
// CREATE NEW APPLICAITON
//-------------------
router.post("/", auth, async (req, res) => {
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

module.exports = router;
