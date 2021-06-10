const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
//import routes
const authroute = require("./routes/auth");
const userroute = require("./routes/user");
const productroute = require("./routes/product");
//.env in use
require("dotenv").config();
//default/obvious middleware

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieparser());
app.use(cors());
//routes
app.use("/api", authroute);
app.use("/api", userroute);
app.use("/api", productroute);

//DB connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
//port
const PORT = process.env.PORT || 8000;
app.listen(PORT);
