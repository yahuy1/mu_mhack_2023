const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Individual = require("../models/individualModel")
const Team = require("../models/teamModel")

router.get("/", async (req, res) => {
    const id = req.body.id
    const userType = req.body.userType
    
    let fromObj;
    let toObj;

    if (userType === "Team") {
        fromObj = await Team.findOne({ id: id })
        if (!fromObj.searching) {
            res
                .status(201)
                .json({ action: "searching mode off" })
            return
        }
        toObj = await Individual.find({
            "id": {
                $nin: fromObj.interests,
                $nin: fromObj.interacted,
                $nin: fromObj.matched,
            },
            "techStack": {
                $in: fromObj.techStack
            }
        }).limit(10)
    } else {
        fromObj = await Individual.findOne({ id: id })
        if (!fromObj.searching) {
            res
                .status(201)
                .json({ action: "searching mode off" })
            return
        }
        toObj = await Team.find({
            "id": {
                $nin: fromObj.interests,
                $nin: fromObj.interacted,
                $nin: fromObj.matched,
            },
            "techStack": {
                $in: fromObj.techStack
            }
        }).limit(10)
    }

    res
        .status(201)
        .json(toObj)
})

module.exports = router