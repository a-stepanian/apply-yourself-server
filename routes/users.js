const express = require("express");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Create new user
userRoutes.route("/users/new").post((req, response) => {
  let db_connect = dbo.getDb();
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    applications: [],
  };
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
    .updateOne(myquery, { $push: { applications: newApplication } });
});

// Get single user info
userRoutes.route("/users/:id").get((req, res) => {
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = userRoutes;
