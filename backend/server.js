const express = require('express');
const app = express();

const admin = require('firebase-admin');

// this is used for accepting json data in the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require('./routes/User');

app.use('/user', User);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);    
});
