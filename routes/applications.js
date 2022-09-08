const express = require("express");

// applicationRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /applications.
const applicationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Get all applications
applicationRoutes.route("/applications").get(function (req, res) {
  let db_connect = dbo.getDb("jobhunt");
  db_connect
    .collection("applications")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get a single application
applicationRoutes.route("/applications/:id").get(function (req, res) {
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
applicationRoutes.route("/applications/add").post((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    company: req.body.company,
    position: req.body.position,
    website: req.body.website,
    location: req.body.location,
    applied: req.body.applied,
    comments: req.body.comments,
    status: req.body.status,
  };
  db_connect.collection("applications").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// Update an application
applicationRoutes.route("/update/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("applications")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete an application
applicationRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("applications").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = applicationRoutes;
