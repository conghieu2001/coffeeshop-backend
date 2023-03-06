const express = require("express");
const cors = require("cors");
const itemsRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
    res.json({message: "Welcome to coffee shop applicaton"});
})

module.exports = app;