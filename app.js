const express = require("express");
const app = express();
const path = require("path")

const PORT = process.env.PORT || 3800;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//js path
app.use("/js", express.static(path.join(__dirname, "./js")));

//css path
app.use("/assets", express.static(path.join(__dirname, "./assets")));

//Routes
app.use("/",require("./routes/routes"))


app.listen(PORT, () => {
    console.log("Aplikacja działa na porcie", PORT)
})