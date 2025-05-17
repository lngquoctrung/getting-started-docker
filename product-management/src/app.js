const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const connectDB = require("./config/database");
const productMiddleware = require("./middlewares/productMiddlewares");
const authMiddleware = require("./middlewares/authMiddlewares");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    return res.json({
        status: 200,
        statusText: "OK",
        message: "Server is running"
    });
});

app.get(
    "/",
    authMiddleware.verifyToken,
    productMiddleware.getAllProducts, 
    (req, res) => {
    return res.render("index", {
        products: res.locals.products,
        authPayload: res.locals.authPayload,
    });
});

app.get("/login", (req, res) => {
    const isError = !!req.flash("isError")[0];
    const errorMessage = req.flash("errorMessage")[0] || "";
    return res.render("login", {
        isError: isError,
        errorMessage: errorMessage,
        ...req.flash("formData")[0]
    });
});

app.get("/register", (req, res) => {
    const isError = !!req.flash("isError")[0];
    const errorMessage = req.flash("errorMessage")[0] || "";
    return res.render("register", {
        isError: isError,
        errorMessage: errorMessage,
        ...req.flash("formData")[0]
    });
});

app.get(
    "/add", 
    authMiddleware.verifyToken,
    authMiddleware.isAuthenticated,
    (req, res) => {
    const isError = !!req.flash("isError")[0];
    const errorMessage = req.flash("errorMessage")[0] || "";
    return res.render("add", {
        isError: isError,
        errorMessage: errorMessage,
        ...req.flash("formData")[0]
    });
});

app.get(
    "/products/:id",
    productMiddleware.getProductById,
    (req, res) => {
        return res.render("products");
    }
);

app.get("/error", (req, res) => {
    const errorStatus = req.flash("errorStatus") || 500;
    const errorMessage = req.flash("errorMessage") || "Internal server error";
    return res.render("error", {
        errorStatus: errorStatus,
        errorMessage: errorMessage,
    });
});

app.use("/products", require("./routers/productRouter"));
app.use("/users", require("./routers/userRouter"));
app.use("/public", express.static(path.join(__dirname, "/public")));

app.use((req, res) => {
    return res.render("error", {
        errorStatus: 404,
        errorMessage: "Page not found",
    });
});

app.listen(process.env.PORT, process.env.HOST, async () => {
    console.clear();
    console.log("Starting server...");
    await connectDB();
    console.log(`The server start on http://${process.env.HOST}:${process.env.PORT}`);
});