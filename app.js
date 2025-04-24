const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const flash = require("express-flash")
const connectDB = require("./config/database");
const productMiddleware = require("./middlewares/productMiddlewares");

const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    res.json({
        status: 200,
        statusText: "OK",
        message: "Server is running"
    });
});

app.get("/", productMiddleware.getAllProducts, (req, res) => {
    res.render("index", {
        products: res.locals.products
    });
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
});

app.use((req, res) => {
    res.render("404");
});

app.listen(process.env.PORT, process.env.HOST, async () => {
    console.clear();
    console.log("Starting server...");
    await connectDB();
    console.log(`The server start on http://${process.env.HOST}:${process.env.PORT}`);
});