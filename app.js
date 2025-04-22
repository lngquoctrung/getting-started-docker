const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const responseHelper = require("./helpers/responseHelper");
const connectDB = require("./config/database");

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    res.json(responseHelper.success(
        200,
        "Server is running"
    ));
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/products/:id", (req, res) => {
    res.render("products");
})

app.listen(process.env.PORT, process.env.HOST, async () => {
    console.clear();
    console.log("Starting server...");
    await connectDB();
    console.log(`The server start on http://${process.env.HOST}:${process.env.PORT}`);
});