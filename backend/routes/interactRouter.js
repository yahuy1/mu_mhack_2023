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
            let temp = fromObj
            fromObj = toObj
            toObj = temp
        }

        if (toObj.interests.findIndex((id) => {return id === fromObj.id}) !== -1) {
            toObj.matched.push(fromObj.id)
            fromObj.matched.push(toObj.id)

            let index = toObj.interests.findIndex((id) => {return id === fromObj.id}) 
            toObj.interests.splice(index, 1)

            await fromObj.save()
            await toObj.save()

            res
                .status(201)
                .json({ action: "match" })
        } else if (toObj.interacted.findIndex((id) => {return id === fromObj.id}) !== -1) {
            fromObj.interacted.push(toObj.id)
            await fromObj.save()

            res
                .status(201)
                .json({ action: "uninterested" })
        } else {
            fromObj.interests.push(toObj.id)
            await fromObj.save()

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

router.post("/uninterest", async (req, res) => {
    const teamID = req.body.teamID
    const individualID = req.body.individualID
    const source = req.body.source

    try {
        let fromObj = await Individual.findOne({ id: individualID })
        let toObj = await Team.findOne({ id: teamID })

        if (source === "Team") {
            let temp = fromObj
            fromObj = toObj
            toObj = temp
        }

        if (toObj.interests.findIndex((id) => {return id === fromObj.id}) !== -1) {
            toObj.interacted.push(fromObj.id)
            fromObj.interacted.push(toObj.id)

            let index = toObj.interests.findIndex((id) => {return id === fromObj.id}) 
            toObj.interests.splice(index, 1)

            await fromObj.save()
            await toObj.save()

            res
                .status(201)
                .json({ action: "both uninterested" })
        } else {
            fromObj.interacted.push(toObj.id)
            await fromObj.save()

            res
                .status(201)
                .json({ action: "uninterested" })
        }
    } catch (err) {
        res
            .status(400)
            .json({ message: err.message })
    }
})

module.exports = router