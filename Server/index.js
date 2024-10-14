const express = require("express");
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const Tok = require("./pass")
const app = express();
mongoose.connect(Tok)
app.use(bodyparser.json());
app.use("/api", require("./api"));
app.listen(4000, ()=>{
	console.log("Сервер запущено");
})