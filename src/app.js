const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const User = require("./models/post");
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

//로컬 서버 잘 돌아가는지 테스트 코드 
const gossipMiddleware = (req, res, next) =>{
  console.log(`Someone is going to: ${req.url}`);
  next();
};
const handleHome = (req, res, next) => {
  return res.send("I love middleware")
};
app.get("/", gossipMiddleware, handleHome);