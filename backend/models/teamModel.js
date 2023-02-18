const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    member: {
        type: Array,
        required: true
    },
    techStack: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    interests: {
        type: Array,
        required: true
    },
    searching: {
        type: Boolean,
        required: true
    }, 
    matched: {
        type: Array,
        required: true
    }, 
    contacts: {
        type: Array,
        required: true
    },
    interacted: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("Team", teamSchema);
 