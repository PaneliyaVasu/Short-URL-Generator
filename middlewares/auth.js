const { getUser } = require("../service/auth");

async function restrictedTologgedinUserOnly(req, res, next) {

    const token = req.cookies.token;   // or whatever cookie name you're setting

    if (!token) return res.redirect("/login");
    const user = getUser(token);
    console.log(user);
    if (!user) return res.redirect("/login");
    req.user = user;
    next();

}

async function checkAuth(req, res, next) {
    const token = req.cookies.token;

    const user = getUser(token);

    req.user = user;
    next();

}

module.exports = { restrictedTologgedinUserOnly, checkAuth }