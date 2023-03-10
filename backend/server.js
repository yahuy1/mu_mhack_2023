const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(cors({origin: true}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Xin chao cac ban nho be!");
})

const interactRouter = require("./routes/interactRouter");
app.use("/api/interact", interactRouter);

const userRouter = require("./routes/userRouter")
app.use("/api/user", userRouter);

const feedRouter = require("./routes/feedRouter")
app.use("/api/feed", feedRouter)


mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err));
