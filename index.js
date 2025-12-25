const express = require("express");
const path = require("path");
const { restrictedTologgedinUserOnly, checkAuth } = require("./middlewares/auth");
const { dbconnection } = require("./connection");
const { URL } = require("./model/url");
const cookieParser = require("cookie-parser");


const urlRoutes = require("./routers/url");
const staticRoute = require("./routers/staticrouter");
const userRoute = require("./routers/user");

const app = express();
const PORT = 8001;

dbconnection("mongodb://localhost:27017/short_url")
    .then(() => { console.log("Connection Successfull!") })
    .catch((err) => console.log("Error: ", err));

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, staticRoute);
app.use("/url", restrictedTologgedinUserOnly, urlRoutes);
app.use("/user", userRoute);



app.listen(PORT, () => {
    console.log("Server is started.. at port:", PORT);
});
