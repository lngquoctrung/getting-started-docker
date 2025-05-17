const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`The server is running on http://${HOST}:${PORT}`);
});