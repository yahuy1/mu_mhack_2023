const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Team = require("../models/teamModel")
const Individual = require("../models/individualModel");

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Route for user sign-up
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({ email, password });
    let uid = userRecord.uid;
    res
      .status(201)
      .json({ message: "User sign up successfully", uid });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to sign up user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);
    const { uid } = userRecord;
    res
      .status(200)
      .json({ message: "User login successful", uid });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to log in user" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { uid, userType, name, member, techStack, description, interests, contacts } = req.body;
    const id = uid
    const searching = true;
    const matched = [];
    // Create user in Firebase Authentication

    let fromCollection = (userType === "Team") ? Team : Individual
    const user = new fromCollection({
      id: id,
      name: name,
      member: member,
      techStack: techStack,
      description: description,
      interests: interests,
      searching: searching,
      matched: matched,
      contacts: contacts,
    });
    user.save()

    res
      .status(201)
      .json({ message: "User profile created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { uid, userType, name, member, techStack, description, interests, contacts } = req.body;
    const id = uid
    const searching = true;
    const matched = [];
    // Create user in Firebase Authentication

    let fromCollection = (userType === "Team") ? Team : Individual
    let user = await fromCollection.findOne({id : id})

    user = {
      id: id,
      name: name,
      member: member,
      techStack: techStack,
      description: description,
      interests: interests,
      searching: searching,
      matched: matched,
      contacts: contacts,
    }
    user.save()
    
    res
      .status(201)
      .json({ message: "User profile updated successfully" });
  } catch (error) {
    res
    .status(400)
    .json({ message: "Failed to update user" });
  }
});

router.get("/info", async (req, res) => {
  const id = req.body.id
  const fromCollection = (req.body.userType === "Team") ? Team : Individual
  
  try {
    const user = await (fromCollection.findOne({ id: id }))
    res
      .status(201)
      .json(user)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
