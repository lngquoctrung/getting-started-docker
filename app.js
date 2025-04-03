const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/health-check", (req, res) => {
    return res.json({
        status: 200,
        message: "The service UP"
    })
});

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000, () => {
    console.clear();
    console.log("The server start on http://localhost:3000");
});