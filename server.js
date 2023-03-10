const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "hpnyfe", "static")))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "hpnyfe", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running")
})