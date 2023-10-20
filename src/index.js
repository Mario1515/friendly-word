const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware");

const { PORT } = require("./constants");
const routes = require("./router");

const app = express();

//express configuration
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(auth);


//handlebars configuration
app.engine("hbs", handlebars.engine({extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", "src/views");

//DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/friendly-world")
.then(() => console.log("DB Connected Succesfully"))
.catch(error => console.log("DB Error: " + error));

app.use(routes);

//server start
app.listen(PORT, () => console.log(`Server is listening on ${PORT} ...`));