const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")

const app = express()
const User = require("./routes/User")
app.use(cors({origin: true}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Xin chao cac ban nho be!");
})

<<<<<<< HEAD
app.use("/user", User);
=======
const interactRouter = require("./routes/interactRouter");
app.use("/api/interact", interactRouter);
>>>>>>> backend


mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err));