if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const dbUrl = process.env.DB_URL
const userRouter = require("./routes/user")


app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get("/", (req, res) => {
    res.send("welcome to FormJs website")
})
app.use("/api", userRouter)







main()
    .then(() => { console.log("Database connected") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

app.listen("8000", () => {
    console.log("server listining from port 8000")
})
