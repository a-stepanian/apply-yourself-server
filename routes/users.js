const express = require("express");
const app = express();
const userRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const session = require("express-session");
app.use(session({ secret: "notagoodsecret" }));

// Log In User
userRoutes.route("/login").post(async (req, response) => {
  const { username, password } = req.body;
  let db_connect = dbo.getDb();
  let myquery = { username: username };
  const user = await db_connect.collection("users").findOne(myquery);
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    console.log("Logged In");
    response.session.test = "test";
  } else {
    console.log("Try Again");
  }
});

// Create new user
userRoutes.route("/users/new").post(async (req, response) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const newUser = {
    username,
    password: hash,
    applications: [],
  };
  let db_connect = dbo.getDb();
  db_connect.collection("users").insertOne(newUser, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// Create a new application => find user and push the application object into the applications array.
userRoutes.route("/users/:id/applications/new").put((req, response) => {
  let db_connect = dbo.getDb();
  let newApplication = {
    company: req.body.company,
    position: req.body.position,
    website: req.body.website,
    location: req.body.location,
    applied: req.body.applied,
    response: req.body.response,
    comments: req.body.comments,
    status: req.body.status,
  };
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("users")
    .updateOne(
      myquery,
      { $push: { applications: newApplication } },
      (err, res) => {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      }
    );
});

// Get user info
userRoutes.route("/users/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = userRoutes;
