import { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
import express from "express";
const router = express.Router();
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth";

// Create User
router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, email, password, passwordVerify } = req.body;
    // Validate user input
    // 1. Must have all required fields
    if (!username || !email || !password || !passwordVerify)
      return res.status(400).json({ errorMessage: "Please enter all required fields." });
    // 2. Password has at least 6 characters
    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters."
      });
    // 3. Password and verification match
    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Passwords do not match.  Please enter the same password twice."
      });
    // 4. Email is not already in user
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({
        errorMessage: "An account with this email already exists."
      });
    // 5. Username is not already in user
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({
        errorMessage: "An account with this username already exists."
      });
    // Salt & hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Add new user to the db
    const newUser = await new User({
      username,
      email,
      passwordHash,
      applications: []
    });
    const savedUser = await newUser.save();
    // Create token and sign with the secret
    const token = jwt.sign(
      {
        user: savedUser._id
      },
      process.env.JWT_SECRET ?? ""
    );

    // Send the token in an http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//-------------------
// LOG IN USER
//-------------------
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate user input
    // 1. Ensure required fields are filled out
    if (!username || !password) return res.status(400).json({ errorMessage: "Please enter all required fields." });
    // 2. Confirm user with that username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(401).json({ errorMessage: "Wrong username or password." });
    // 3. Compare password with db hashed password
    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect) return res.status(401).json({ errorMessage: "Wrong username or password." });

    // Create token and sign with the secret
    const token = jwt.sign(
      {
        user: existingUser._id
      },
      process.env.JWT_SECRET ?? ""
    );

    // Send the token in an http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//-------------------
// LOG OUT USER
//-------------------
router.get("/logout", (req: Request, res: Response) => {
  //  Set token to empty string and make it expired
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    })
    .send();
});

//-------------------
// VERIFY USER HAS TOKEN AND SECRET MATCHES
//-------------------
router.get("/loggedIn", (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET ?? "");

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

//-------------------
// GET SINGLE USER
//-------------------
router.get("/", auth, async (req: IRequestWithUser, res: Response) => {
  const id = req.user;
  try {
    const foundUser = await User.findById(id);
    const justTheName = { username: foundUser?.username ?? "" };
    res.json(justTheName);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
