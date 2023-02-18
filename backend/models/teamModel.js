const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    id: {
        type: Number,
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
    ideas: {
        type: Array,
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
    contact: {
        type: Array,
        require: true
    },
    interacted: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("Team", teamSchema);
 