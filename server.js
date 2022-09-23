const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const cors = require("cors");

// heroku will assign an env var port.
const port = process.env.PORT || 5000;

// set up server
const app = express();
app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://client-apply-yourself.netlify.app",
    ],
    credentials: true,
  })
);

// connect to mongoDB
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

// set up routes
app.use("/auth", require("./routes/userRouter"));
app.use("/applications", require("./routes/applicationRouter"));
