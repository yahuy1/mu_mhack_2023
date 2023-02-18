const mongoose = require("mongoose");

const individualSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Account", accountSchema);
 