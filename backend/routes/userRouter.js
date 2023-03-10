const express = require("express");
const router = express.Router();
const Team = require("../models/teamModel")
const Individual = require("../models/individualModel");
const admin = require("../fb")

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

router.post("/create", async (req, res) => {
  try {
    const { id, userType, name, member, techStack, description, contacts } = req.body;
    const searching = true
    const interests = []
    const matched = []
    const interacted = []
    // Create user in Firebase Authentication

    let fromCollection = (userType === "Team") ? Team : Individual
    const user = new fromCollection({
      id: id,
      name: name,
      techStack: techStack,
      description: description,
      interests: interests,
      searching: searching,
      matched: matched,
      contacts: contacts,
      interacted: interacted
    });

    if (userType === "Team") {
      user.member = member
    }

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
    const { id, userType, name, member, techStack, description, contacts, searching, interests, matched, interacted } = req.body;
    // Create user in Firebase Authentication

    let fromCollection = (userType === "Team") ? Team : Individual
    let user = await fromCollection.findOne({id : id})

    user.name = name
    user.techStack = techStack
    user.description = description
    user.interests = interests
    user.searching = searching
    user.matched = matched
    user.contacts = contacts
    user.interacted = interacted

    if (userType === "Team") {
      user.member = member
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

router.post("/info", async (req, res) => {
  const id = req.body.id
  try {
    let user = await (Team.findOne({ id: id }))

    if (user !== null) {
      res.status(201).json({user, userType: "Team"})
      return
    } 
    
    user = await (Individual.findOne({ id: id }))

    if (user !== null) {
      res.status(201).json({user, userType: "Individual"})
    } else {
      res.status(204).json({message: "Invalid ID"})
    }

  } catch (err) {
    res
      .status(400)
      .json({ message: err.message });
  }
});

router.post("/matched", async (req, res) => {
  const id = req.body.id
  const fromCollection = (req.body.userType === "Team") ? Team : Individual
  const toCollection = (req.body.userType === "Individual") ? Team : Individual

  try {
    const user = await fromCollection.findOne({ id: id })
    const matches = await toCollection.find({
      "id": {
        $in: user.matched
      }
    })
    res
      .status(201)
      .json(matches)
  } catch (err) {
    res
      .status(400)
      .json({ message: err.message });
  }
})

module.exports = router;
