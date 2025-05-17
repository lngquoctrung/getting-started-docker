const userHelper = require('../helpers/userHelper');
const tokenHelper = require('../helpers/tokenHelper');
const cookieConfig = require('../config/cookieConfig');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await userHelper.getUser({ email: email });
        if(!user) {
            req.flash("isError", true);
            req.flash("errorMessage", "Invalid email or password");
            req.flash("formData", req.body);
            return res.redirect('/login');
        }
        // Validate password
        const isValidPassword = password === user.password;
        if(!isValidPassword) {
            req.flash("isError", true);
            req.flash("errorMessage", "Invalid email or password");
            req.flash("formData", req.body);
            return res.redirect('/login');
        }
        // Generate token
        const token = tokenHelper.sign({ user: user.username });
        // Set cookie
        res.cookie("token", token, cookieConfig);
        return res.redirect('/');
    } catch(error) {
        req.flash("errorStatus", 500);
        req.flash("errorMessage", "Internal server error");
        return res.redirect("/error");
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const user = await userHelper.getUser({ email: email });
        if(user) {
            req.flash("isError", true);
            req.flash("errorMessage", "Email already exists");
            req.flash("formData", req.body);
            return res.redirect('/register');
        }
        // Create new user
        const newUser = await userHelper.createUser({ username, email, password });
        if(!newUser) {
            req.flash("isError", true);
            req.flash("errorMessage", "Failed to create user");
            req.flash("formData", req.body);
            return res.redirect('/register');
        }
        // Generate token
        const token = tokenHelper.sign({ user: newUser.username });
        // Set cookie
        res.cookie("token", token, cookieConfig);
        return res.redirect('/');
    } catch(error) {
        req.flash("errorStatus", 500);
        req.flash("errorMessage", "Internal server error");
        return res.redirect("/error");
    }
}

const logout = (req, res) => {
    // Clear cookie
    res.clearCookie("token");
    return res.redirect('/');
}

module.exports = {
    login,
    register,
    logout
}