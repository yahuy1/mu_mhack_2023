const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Route for user sign-up
router.post('/signup', async (req, res) => {
  try {
    console.log("req.body: " + JSON.stringify(req.body));
    const { email, password, members, techStack, description } = req.body;

    console.log("email: " + email + ", password: " + password + 
                ", members: " + members + ", techStack: " + techStack + ", description: " + description);
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create user' });
  }
});

module.exports = router;