const express = require("express");
const { HandleLoginPage, HandleSignUpPage } = require("../controllers/user");


const router = express.Router();

router.post("/", HandleSignUpPage);

router.post("/login", HandleLoginPage);

module.exports = router;