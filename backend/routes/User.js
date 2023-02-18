const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const Individual = require('../models/individualModel');

// Route for user sign-up
router.post('/signup', async (req, res) => {
  try {
    console.log("req.body: " + JSON.stringify(req.body));
    const { email, password} = req.body;

    console.log("email: " + email + ", password: " + password);
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ message: 'User sign up successfully', uid: userRecord.uid });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to sign up user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log("req.body: " + JSON.stringify(req.body));
    const { email, password} = req.body;
    console.log("email: " + email + ", password: " + password);
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);
    const { uid } = userRecord;
    console.log()
    res.status(200).json({ message: 'User login successful', uid });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Failed to log in user' });
  }
});

router.post('/create', async (req, res) => {
    try {
      console.log("req.body: " + JSON.stringify(req.body));
      const { name, member, techStack, description, interests, contacts} = req.body;
      const size = await Individual.countDocuments();
      id = size + 1; searching = true; matched = [];
      console.log("name: " + name + ", member: " + member);
      // Create user in Firebase Authentication

      const result = await Individual.create({
          "id": id,
          "name": name,
          "member": member,
          "techStack": techStack,
          "description": description,
          "interests": interests,
          "searching": searching,
          "matched": matched,
          "contacts": contacts
      });

      console.log("result: " + result);
      res.status(201).json({ message: 'User profile created successfully'});
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to create user' });
    }
  });
  

module.exports = router;