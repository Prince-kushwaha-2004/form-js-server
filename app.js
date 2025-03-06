if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const dbUrl = process.env.ATLAS_URL
const userRouter = require("./routes/user")
const formRouter = require("./routes/form")
const projectRouter = require("./routes/project")
const ExpressError = require("./utils/ExpressError")

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get("/", (req, res) => {
    res.send("welcome to FormJs website")
})
app.use("/api", userRouter)
app.use("/api/form", formRouter)
app.use("/api/project", projectRouter)




//error route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Invalid Url!!"));
})
//error handling middleware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Some thing went wrong!" } = err;
    res.status(statusCode).json({ "error": message });
})



main()
    .then(() => { console.log("Database connected") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

app.listen("8000", () => {
    console.log("server listining from port 8000")
})
