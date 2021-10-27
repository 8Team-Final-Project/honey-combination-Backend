const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const User = require("./models/post"); //post스키마를 쓰겠다.
const router = require("./routes/post")(app, User);

app.listen(port, function () {
  console.log("Express server has started on port " + port);
});

// mongo DB connect
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error);
  db.once("open", function () {
    //몽고디비 서버에 연결
    console.log("Connected to mongod server");
  });
} catch (error) {
  console.log("mongo connect error : ", error);
}

// module.exports = app;
