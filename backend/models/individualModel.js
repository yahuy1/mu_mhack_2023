const mongoose = require("mongoose");

const individualSchema = mongoose.Schema({
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
    }
    
})

module.exports = mongoose.model("Individual", individualSchema);
 