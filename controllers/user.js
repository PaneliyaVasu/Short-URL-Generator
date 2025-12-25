const User = require("../model/user");
const { setUser } = require('../service/auth');
const { randomUUID } = require("crypto");


async function HandleSignUpPage(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    });

    return res.redirect("/");
}


async function HandleLoginPage(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    });
    if (!user) return res.render("login");

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}


module.exports = {
    HandleSignUpPage,
    HandleLoginPage
}