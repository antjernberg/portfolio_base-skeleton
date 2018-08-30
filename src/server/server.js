const express = require("express");
const assets = require("../../dist/assets.json");

const app = express();

//app.use(cors());
app.use(express.static("dist"));
app.set("view engine", "ejs");
app.set("views", "./src/server");

app.get("/health", (req, res) => {
    res.send("UP");
});

app.get("/", (req, res, next) => {
    res.render(
        "index", {
            baseHtml: "",
            title: "Anton Jernberg",
            assets
        }
    );
    next();
});
app.use(express.static(__dirname + "/dist"));
const port = process.env.PORT || 9999;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});