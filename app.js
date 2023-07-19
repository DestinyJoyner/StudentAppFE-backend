// DEPENDENCIES
const express = require("express")
const cors = require("cors")

// CONTROLLERS
const studentController =require("./controllers/StudentController.js") 

// CONFIGURE
const app = express()

// MIDLEWARE
app.use(express.json())
app.use(cors())
app.use("/students", studentController)

// ROUTE
app.get('/', (req, res) => {
    res.status(200).send("<h1>Student App Server</h1>")
})

app.get("/test", (req, res) => {
    res.status(200).json({
        test: 'success',
        time: '1pm'
    })
})


// not-found / wildcard(not defined) paths
app.get("/not-found", (req, res) => {
    res.status(400).json({Error : "Page Not Found"})
})

app.get("*", (req,res) => {
    res.redirect("/not-found")
})


module.exports = app