const express = require("express")
const router = express.Router()
const Individual = require("../models/individualModel")
const Team = require("../models/teamModel")
const admin = require("../fb")

router.post("/interest", async (req, res) => {
    const teamID = req.body.teamID
    const individualID = req.body.individualID
    const userType = req.body.userType

    try {
        let fromObj = await Individual.findOne({ id: individualID })
        let toObj = await Team.findOne({ id: teamID })

        if (userType === "Team") {
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

            const toUser = await admin.auth().getUser(toObj.id)
            const fromUser = await admin.auth().getUser(fromObj.id)

            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)

            const msg1 = {
                to: toUser.email, // Change to your recipient
                from: 'lkuroshirol123@gmail.com', // Change to your verified sender
                subject: 'New Match',
                text: 'You got a new match',
                html: '<strong>You got a new match</strong>',
            }

            const msg2 = {
                to: fromUser.email, // Change to your recipient
                from: 'lkuroshirol123@gmail.com', // Change to your verified sender
                subject: 'New Match',
                text: 'You got a new match',
                html: '<strong>You got a new match</strong>',
            }

            sgMail
                .send(msg1)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                })
                .catch((error) => {
                    console.error(error)
                })

            sgMail
                .send(msg2)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                })
                .catch((error) => {
                    console.error(error)
                })

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
    const userType = req.body.userType

    try {
        let fromObj = await Individual.findOne({ id: individualID })
        let toObj = await Team.findOne({ id: teamID })

        if (userType === "Team") {
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