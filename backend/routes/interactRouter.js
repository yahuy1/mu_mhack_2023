const express = require("express")
const router = express.Router()
const Individual = require("../models/individualModel")
const Team = require("../models/teamModel")

router.post("/interest", async (req, res) => {
    const teamID = req.body.teamID
    const individualID = req.body.individualID
    const source = req.body.source

    try {
        let fromObj = await Individual.findOne({ id: individualID })
        let toObj = await Team.findOne({ id: teamID })

        if (source === "Team") {
            swap(fromObj, toObj)
        }

        if (toObj.interests.find((id) => {id === fromObj.id}) !== undefined) {
            toObj.matched.push(fromObj.id)
            fromObj.matched.push(toObj.id)

            toObj.interests.find            

            res
                .status(201)
                .json({ action: "match" })
        } else {
            fromObj.interests.push(toObj.id)
            res
                .status(201)
                .json({ action: "new interest" })
        }
    } catch (err) {
        res
            .status(400)
            .json({ message: err.message })
    }
})