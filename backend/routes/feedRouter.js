const express = require("express")
const router = express.Router()
const Individual = require("../models/individualModel")
const Team = require("../models/teamModel")

router.post("/", async (req, res) => {
    const id = req.body.id
    const userType = req.body.userType
    
    let fromCollection = Team;
    let toCollection = Individual;

    let fromObj;
    let toObj;

    if (userType === "Individual") {
        fromCollection = Individual
        toCollection = Team
    }

    fromObj = await fromCollection.findOne({ id: id })
    if (!fromObj.searching) {
        res
            .status(400)
            .json({ action: "searching mode off" })
        return
    }
    toObj = await toCollection.find({
        "id": {
            $nin: fromObj.interests,
            $nin: fromObj.interacted,
            $nin: fromObj.matched,
        },
        // "techStack": {
            // $in: fromObj.techStack
        // }
    }).limit(10)

    if (toObj === null) {
        res.status(204).json({message: "Out of candidates"})
    }

    res
        .status(201)
        .json(toObj)
})

module.exports = router