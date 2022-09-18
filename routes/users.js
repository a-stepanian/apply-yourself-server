const express = require("express");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// apply-yourself.com/users/new POST
// apply-yourself.com/users/userid GET,PUT,DELETE

// apply-yourself.com/users/userid/applications   GET
// apply-yourself.com/users/userid/applications/appid GET, PUT, DELETE
// apply-yourself.com/users/userid/applications/new POST

// apply-yourself.com/users/userid/dashboard

// Create new user
userRoutes.route("/users").post((req, res) => {
  let db_connect = dbo.getDb();
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    applications: [],
  };
  db_connect.collection("applications").insertOne(newUser, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// Get a single application
userRoutes.route("/applications/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("applications")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new application
userRoutes.route("/applications/new").post((req, response) => {
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
  db_connect
    .collection("applications")
    .insertOne(newApplication, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

// Update an application
userRoutes.route("/applications/:id").put((req, response) => {
  let db_connect = dbo.getDb();
  let foundApplication = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      company: req.body.company,
      position: req.body.position,
      website: req.body.website,
      location: req.body.location,
      applied: req.body.applied,
      response: req.body.response,
      comments: req.body.comments,
      status: req.body.status,
    },
  };
  db_connect
    .collection("applications")
    .updateOne(foundApplication, newvalues, (err, res) => {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete an application
userRoutes.route("/applications/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("applications").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = userRoutes;
